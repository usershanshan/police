<?php
namespace Home\Controller;
use Home\Logic\SendCodeLogic;
use Home\Api\ShareApi;
class IndexController extends AfterLandingController {
    private $SendCode_Login;
    private $shares;
    public function __construct(){
        $this->shares = new ShareApi();
        parent::__construct();
        $this->SendCode_Login = new SendCodeLogic(C('PHONE_USER'),C('PHONE_PASS'),C('PHONE_SEND_NAME'));

    }

    //首页      高风险提示    停牌价格   颜色  1- 白色  2-红色 3-绿色


    /**
     * 首页   阿里云的接口
     * @param $gid 股票编码   例如 sh601668
     * @return $gid 股票编码
     * @return  $name 股票名称
     * @return $status 股票状态   0-普通股票  1-高风险股票（需要有标识） 2-停牌-（没数的就不用显示了，或者全部不显示）
     * @return $nowPri 当前价格
     * @return $increase 涨跌额
     * @return $increPer 涨跌百分比
     * @return $pri_color 当前价格这一块的颜色
     * @return $todayStartPri 今日开盘价格
     * @return $to_pri_color 今日开盘价格——颜色
     * @return $yestodEndPri 昨日收盘价 ——默认白色
     * @return $y
     *
     */
    public function shares(){
        $gid = I('gid');//股票编码
        if(!$gid){
            $this->ajaxError('参数错误');
        }
        error_reporting(0);//关闭错误报告
        $host = "http://stock.api51.cn/real";//如需https请修改为 https://smsapi51.cn
        $path = "";//path为 single_sms_get 时为GET请求
        $method = "0";//post=1 get=0
        $url = $host . $path;

        $data = array(
            'en_prod_code'=>$gid,//产品代码
            'fields'=>'prod_name,open_px,high_px,low_px,last_px,preclose_px,px_change,px_change_rate,trade_status,up_px,down_px',//交易所识别码集合	多个交易所识别码,逗号(,)分割。 如： finance_mic=SS,SZ表示优先查询上交所和深交所的代码，且按照参数的先后顺序优先查找 注：返回结果不按查找的市场顺序排序
        );


        $data = http_build_query($data);//参数构建


        $result = $this->shares->api51_curl($url,$data,$method);
        
        $data = [];
        if(!$result){
            $this->ajaxError('网络繁忙');
        }
        $result = json_decode($result,true);

        foreach($result['data']['snapshot']['fields'] as $k=>$v){
            $res[$v] = $result['data']['snapshot'][$gid][$k];
        }
    	$arr_set = M('setting')->field(['price','multiple'])->where(['display'=>1])->find();//倍数 点卖金额数组
    	$arr_set['price'] = json_decode($arr_set['price'],true);
    	$arr_set['multiple'] = json_decode($arr_set['multiple'],true);


        $data['gid'] = $gid;//股票编码
        $data['name'] = $res['prod_name'];//股票名称

        if(substr($data['name'],0,2) =='ST' || substr($data['name'],0,2) =='st'){
            $data['status'] = 1;// 1 高风险
            $ban = 0.05;
        }elseif(substr($data['name'],0,3 )== '*ST' || substr($data['name'],0,3 )== '*st'){
            $data['status'] = 1;//1 高风险
        }else{
            $data['status'] = 0;//普通股票
        }


        $data['todayStartPri'] =$res['open_px'];//今日开盘价
        $data['nowPri'] = $res['last_px'];//当前价格
        if($res['trade_status'] == 'STOPT'){//
            $data['status'] = 2;//停牌
        }


        $data['increase'] = $res['px_change'];//涨跌额
        $data['increPer'] = $res['px_change_rate'];//涨跌百分比
        if($data['increase'] > 0){
            $data['pri_color'] = 2;//红色
        }elseif($data['increase'] < 0){
             $data['pri_color'] = 3;//绿色
        }else{
            $data['pri_color'] = 1;//白色
        }



        $data['yestodEndPri'] = $res['preclose_px'];//昨日收盘价   ——————白色
        if($data['yestodEndPri'] > $data['todayStartPri']){
            $data['to_pri_color'] = 3;//绿色
        }elseif($data['yestodEndPri'] < $data['todayStartPri']){
            $data['to_pri_color'] = 2;//红色
        }else{
            $data['to_pri_color'] = 1;//白色
        }

        $data['inc'] = $res['up_px'];//涨停
        $data['dec'] = $res['down_px'];//跌停

        $data['todayMax'] =$res['high_px'];//今日最高
        $data['todayMin'] =$res['low_px'];//今日最低
        if($data['yestodEndPri'] > $data['todayMax']){
            $data['to_max_color'] = 3;//绿色
        }elseif($data['yestodEndPri'] < $data['todayMax']){
            $data['to_max_color'] = 2;//红色
        }else{
            $data['to_max_color'] = 1;//白色
        }
        if($data['yestodEndPri'] > $data['todayMin']){
            $data['to_min_color'] = 3;//绿色
        }elseif($data['yestodEndPri'] < $data['todayMin']){
            $data['to_min_color'] = 2;//红色
        }else{
            $data['to_min_color'] = 1;//白色
        }

        $arr = $this->setting();

        //分时
        $config = C();
        list($year,$month,$day) = explode('-',date('Y-m-d',time()));
        $today = mktime(23, 59, 59, $month, $day-1, $year);
        $time_s_s = strtotime($config['WEB_TIME_S_S']);
        if($time_s_s > time() ||D('time')->worktime()['error'] ){//开盘时间大于当前时间  或非点卖时段
            $today = M('time')->where(['type'=>0,'inpputtime'=>['ELT',$today]])->order(['inputtime'=>'desc'])->find()['inputtime'];
            $fs_date = date('Ymd',$today);
        }else{
            $field['date'] = '';
        }

        $url =  "http://stock.api51.cn/trend";
        $field = array(
            'prod_code'=>$gid,//产品代码
            'fields'=>'last_px,avg_px,business_amount,business_balance',
            'crc'=>I('crc'),//循环冗余校验码
            'date'=>$fs_date,//	日期
            'min_time'=>I('min_time'),//	分时分钟时间
        );

        $field = http_build_query($field);


        do{
            $fenshi = $this->shares->api51_curl($url,$field,$method);
        }while(!$fenshi);


        $fenshi = json_decode($fenshi,true);

        foreach($fenshi['data']['trend'][$gid] as $k=>$v){
            $fenshi['data']['trend'][$gid][$k][5] = round($v[1] - $data['yestodEndPri'],2);//现价-昨日收盘价
            $fenshi['data']['trend'][$gid][$k][6] = round(($v[1] - $data['yestodEndPri'])/$data['yestodEndPri'] * 100,2);
        }




        //K线
        $url = "http://stock.api51.cn/kline";
        $field = array(
            'prod_code'=>$gid,//产品代码	有且仅能有 1 个代码；证券代码包含交易所代码做后缀，作为该代码的唯一标识。如：600570.SS
            'fields'=>'open_px,high_px,low_px,close_px,business_amount,business_balance,turnover_ratio',//字段集合	允许的字段： 开盘价：open_px 最高价：high_px 最低价：low_px 收盘价：close_px 成交量：business_amount 成交额：business_balance 如果没有指定任何有效的字段，则返回所有字段
            'candle_mode'=>1,//K线模式	0：原始K线 1：前复权K线 2：后复权K线
            'candle_period'=>6,//K线周期	取值可以是数字1-9，表示含义如下： 1：1分钟K线 2：5分钟K线 3：15分钟K线 4：30分钟K线 5：60分钟K线 6：日K线 7：周K线 8：月K线 9：年K线
            'get_type'=>'offset',//查找类别	offset 按偏移查找；range 按日期区间查找；必须输入其中一个值
            'data_count'=>200,//数据个数	需要取得的 K 线的根数，如果该字段不存在，取值范围[1, 1000]，默认为 10 个。 仅在 get_type=offset 时有效。
            'search_direction'=>$_GET['search_direction'],//	搜索方向	1 表示向前查找（默认值） ，2 表示向后查找。 仅在 get_type=offset 时有效。
            //'date'=>$_GET['date'],//	日期	不输入默认为当前日期；请求日K线时，如果输入日期，不返回该日期的K线 get_type=offset时有效
            'min_time'=>$_GET['min_time'],//分时分钟时间(HHMM)	分钟 K 线的时间 HHMM,对于 短 周期 K 线 类型 使用(1min,5min 等)，不填写表示最新的市场时间，若填写必须同时填写 date 字段。请求分钟K线时，如果输入该字段，不返回输入分钟的K线 仅在 get_type=offset 且candle_period=1~5（分钟 K线）时有效。
            'start_date'=>$_GET['start_date'],//开始日期	1、 start_date 和 end_date 均不填， 返回距离当前日期的1000 根 K 线； 2、 仅填 start_date， 当 start_date和最新日期之间的数据不足1000 根，返回 start_date 和最新日期之间的数据；如果数据超过 1000 根 K 线， 则返回距离当前日期的 1000 根 K线； 3、 仅填 end_date ， 返 回end_date 之前存在的的最多1000 根 K 线； 4、 start_date 和 end_date 均填充，返回该日期区间（闭区间）的数据，最多 1000 根。 仅在 get_type=range 时有效。
            'end_date'=>$_GET['end_date'],//截止日期	默认为当前日期； 1、 start_date 和 end_date 均不填， 返回距离当前日期的1000 根 K 线； 2、 仅填 start_date， 当 start_date和最新日期之间的数据不足1000 根，返回 start_date 和最新日期之间的数据；如果数据超过 1000 根 K 线， 则返回距离当前日期的 1000 根 K线； 3、 仅填 end_date ， 返 回end_date 之前存在的的最多1000 根 K 线； 4、 start_date 和 end_date 均填充，返回该日期区间（闭区间）的数据，最多 1000 根。 仅在 get_type=range 时有效。

        );
        $field = http_build_query($field);
        do{
            $kline = $this->shares->api51_curl($url,$field,$method);
        }while(!$kline);

        $kline = json_decode($kline,true);



        $this->ajaxSuccess('数据获取成功',['share'=>$data,'setting'=>$arr,'arr'=>$arr_set,'fenshi'=>$fenshi,'kline'=>$kline]);





    }
    //取banner图信息并存入缓存
    public function getBannerList(){
//    	if(S('WEB_BANNER')){
//            return S('WEB_BANNER');
//        }
    	$where = ['status'=>'on'];
    	$banner_info = M('Banner')->where($where)->order('sort desc,id desc')->select(); 
    	//S('WEB_BANNER',$banner_info);
    	$this->ajaxSuccess('数据获取成功',$banner_info);
    }

    //获取设置数组（纯）
    private function setting(){
        if(S('WEB_SETTING')){
            return S('WEB_SETTING');
        }
        $arr = [];
        $setting = M('setting');
        $info = $setting->where(['display'=>1])->find();
        $info['price'] = json_decode($info['price'],true);
        $info['multiple'] = json_decode($info['multiple'],true);
        if($info['price']){
            foreach($info['price'] as $k=>$v){//点买金额
                if($info['multiple']){
                    foreach($info['multiple'] as $kk=>$vv){//！！！点买金额  和 倍数要唯一
                        $arr[$v][$vv['times']]['profit'] =round($v * $info['e_profit']/100,0) ;//出发止盈
                        $arr[$v][$vv['times']]['bond'] = round($v / $vv['times'],0);//保证金
                        $arr[$v][$vv['times']]['loss'] = round($arr[$v][$vv['times']]['bond'] * $vv['e_loss']/100,0);//触发止损
                        $arr[$v][$vv['times']]['routine'] = $v/10000 * $info['routine'];
                        $arr[$v][$vv['times']]['delay_loss'] = round($v * $vv['delay_loss']/100,0);
                        $arr[$v][$vv['times']]['delay_price_z'] = $v/10000*$info['delay_price'];//递延费用
                        $arr[$v][$vv['times']]['delay_price'] = $info['delay_price'];
                    }
                }
            }
        }
        S('WEB_SETTING',$arr);
        return $arr;
    }

    //首页用户信息
    public function user(){
        $user_id = session('USER_INFO')['id'];
        if($user_id){
            $user_arr = M('user')->field(['id','phone','money','red','mark','nickname'])->where(['id'=>$user_id])->find();
            $user_arr['count'] = M('order')->where(['user_id'=>$user_id,'status_q'=>1,'status_h'=>['IN',[1,2]]])->count();
            if(!$user_arr['nickname']){
                $user_arr['nickname'] = '91ng_'.$user_arr['id'];
            }
        }
        $this->ajaxSuccess('数据获取成功',$user_arr);

    }



    //流程   聚合接口(已转换)
    //订单预览   不登录不让  非点卖时段，也可以预览
    public function preview(){

        $arr = [];//返回数组
        $user = M('user');
        $user_id = $this->userId();
        if($user_id){
            $user_arr = $user->field(['id','money','red'])->where(['id'=>$user_id])->find();//钱
        }else{
            $this->ajaxError('请先登陆');
        }
        $gid = I('post.gid');
        $gid = D('time')->gid($gid);
        $res = $this->shares->oneInfo($gid);
        if($res['error'] == 0 ) {
            if($res['data']['error_code']=='0'){
                $setting = $this->setting();
                foreach($setting as $k=>$v){
                    foreach($v as $kk=>$vv){
                        $setting[$k][$kk]['al_price'] = $setting[$k][$kk]['bond'] +$setting[$k][$kk]['routine'];

                        if($user_arr['red'] <= $setting[$k][$kk]['al_price']){
                            $setting[$k][$kk]['red']['use']  = $user_arr['red'];//红包使用多少
                            $setting[$k][$kk]['red']['rest'] = 0;//红包剩余
                            $setting[$k][$kk]['ac_price'] = $setting[$k][$kk]['al_price'] - $user_arr['red'];//实际价格
                            if($setting[$k][$kk]['ac_price'] <= $user_arr['money']){
                                $setting[$k][$kk]['buy'] = 1;//可以购买
                            }else{
                                $setting[$k][$kk]['buy'] = 0;//余额不足
                            }

                        }else{
                            $setting[$k][$kk]['red']['use'] = $setting[$k][$kk]['al_price'];
                            $setting[$k][$kk]['red']['rest'] = $user_arr['red'] -  $setting[$k][$kk]['red']['use'];
                            $setting[$k][$kk]['ac_price'] = 0;
                            $setting[$k][$kk]['buy'] = 1;//可以购买
                        }


                    }

                    $setting[$k]['multiple'] = $setting[$k];
                    $setting[$k]['num'] = floor($k/($res['data']['result'][0]['data']['nowPri']*100))*100;
                    $setting[$k]['buy'] = $res['data']['result'][0]['data']['name'].' '.$setting[$k]['num'].'股';
                    $setting[$k]['use'] = $res['data']['result'][0]['data']['nowPri']*$setting[$k]['num']/$k*100 . '%';//价格*数量*100.加百分号

                    foreach($setting[$k] as $kk=>$vv){
                        if(!in_array($kk,['multiple','num','buy','use'])){
                            unset($setting[$k][$kk]);
                        }
                    }




                }
                $st = D('time')->share_st($res['data']['result'][0]['data']['name']);
                if($st){
                    $data['shares']['st'] = 1;//高风险股票
                }else{
                    $data['shares']['st'] = 0;//非高风险股票
                }
                $tingpai = D('time')->tingpai($res['data']['result'][0]['data']['todayStartPri'],$res['data']['result'][0]['data']['traNumber']);
                if($tingpai){
                   $data['shares']['tingpai'] = 1;//停牌股票
                }else{
                    $data['shares']['tingpai'] = 0;//非停牌股票
                }


                $data['shares']['name'] = $res['data']['result'][0]['data']['name'];
                $data['shares']['nowPri'] = number_format($res['data']['result'][0]['data']['nowPri'],2);
                $data['shares']['gid'] = $res['data']['result'][0]['data']['gid'];
                if($res['data']['result'][0]['data']['increase'] >0){
                    $data['shares']['color'] = 2;//红色
                }elseif($res['data']['result'][0]['data']['increase'] >0){
                    $data['shares']['color'] = 3;//绿色
                }else{
                    $data['shares']['color'] = 1;//白色
                }


                $data['shares']['time'] = date('Y-m-d H:i:s',time());
                $data['setting'] = $setting;


                $rr = M('setting')->field(['price','multiple'])->where(['display'=>1])->find();
                $data['price']['price'] = json_decode($rr['price'],true);
                $rr['multiple'] = json_decode($rr['multiple'],true);

                foreach($rr['multiple'] as $k=>$v){
                    $data['price']['multiple'][] = $v['times'];
                }
                $this->ajaxSuccess('获取数据成功',$data);

            }else{
                $this->ajaxError($res['data']['result']['error_code'].":".$res['data']['reason']);
            }

        }else{
            $this->ajaxError('网络繁忙，请稍后再试');
        }




    }


    //流程
    //立即购买接口   需登陆  非点卖时段，不让买  聚合接口。未转换   （老gid）
    //线下也先扣钱
    public function buy(){
        //购买时间判断
        $worktime = D('time')->worktime();
        if($worktime['error']){
            $this->ajaxError($worktime['msg']);
        }

        $line = M('setting')->field(['line'])->where(['display'=>1])->find()['line'];



        //用户id   禁用的不行
        $user = M('user');
        $insert['user_id'] = $this->userId();
        if(!$insert['user_id']){
            $this->ajaxError('请先登陆');
        }
        $user_arr = $user->field(['id','money','red','phone','referee_id'])->where(['id'=>$insert['user_id'],'display'=>1])->find();//已被屏蔽的不让购买
        $insert['phone'] = $user_arr['phone'];
        $insert['display'] = 1;
        $insert['inputtime'] = time();
        $insert['gid'] =  D('time')->gid(I('post.gid'));//股票编码
        $insert['referee_id'] = $user_arr['referee_id'];
        $insert['id'] =date('YmdHis',time()).rand(1000,9999);//订单id
        $insert['day'] = 1;//持仓日
        $insert['d_price'] = I('post.price');//点买价格
        $insert['times'] = I('post.times');//倍数

        //阿里数组
        $host = "http://stock.api51.cn/real";//如需https请修改为 https://smsapi51.cn
        $path = "";//path为 single_sms_get 时为GET请求
        $method = "0";//post=1 get=0
        $url = $host . $path;

        $data = array(
            'en_prod_code'=>I('post.gid'),//产品代码
            'fields'=>'issue_date',//交易所识别码集合	多个交易所识别码,逗号(,)分割。 如： finance_mic=SS,SZ表示优先查询上交所和深交所的代码，且按照参数的先后顺序优先查找 注：返回结果不按查找的市场顺序排序
        );


        $data = http_build_query($data);//参数构建


        $result = $this->shares->api51_curl($url,$data,$method);

        $data = [];
        if(!$result){
            $this->ajaxError('网络繁忙');
        }
        $result = json_decode($result,true);

        foreach($result['data']['snapshot']['fields'] as $k=>$v){
            $ress[$v] = $result['data']['snapshot'][I('post.gid')][$k];
        }

        $issue_time = strtotime($ress['issue_date']);
        list($year,$month,$day) = explode('-',date('Y-m-d',$issue_time));
        $isss_date = mktime (null, null,null, $month, $day, $year+1);

        $res = $this->shares->oneInfo($insert['gid']);
        if($res['error'] == 0 ) {
            if($res['data']['error_code']=='0'){
                $setting = $this->setting();

                //高风险股票不能购买
                $st = D('time')->share_st($res['data']['result'][0]['data']['name']);
                if($st){
                    $this->ajaxError('不能购买高风险股票');
                }


                //停牌股票
                $tingpai = D('time')->tingpai($res['data']['result'][0]['data']['todayStartPri'],$res['data']['result'][0]['data']['traNumber']);
                if($tingpai){
                    $this->ajaxError('不能购买停牌股票');
                }

                //涨跌幅超过8% 不能购买
                $zhangdie = ($res['data']['result'][0]['data']['increPer'] > 8) || ($res['data']['result'][0]['data']['increPer'] <-8);
                if($zhangdie){
                    $this->ajaxError('不能购买涨跌幅超过8%的股票');
                }

                //次新股
                if($isss_date >= time() ){
                    $this->ajaxError('不能购买次新股');
                }




                $insert['name'] = $res['data']['result'][0]['data']['name'];//股票名称
                $insert['profit'] = $setting[$insert['d_price']][$insert['times']]['profit'];//止盈价格
                $insert['loss'] = $setting[$insert['d_price']][$insert['times']]['loss'];//止损价格
                $insert['bond'] = $setting[$insert['d_price']][$insert['times']]['bond'];//保证金
                $insert['routine'] = $setting[$insert['d_price']][$insert['times']]['routine'];//交易综合费
                $insert['delay_price'] = $setting[$insert['d_price']][$insert['times']]['delay_price'];//递延费用  每万
                $insert['delay_loss'] = $setting[$insert['d_price']][$insert['times']]['delay_loss'];//递延条件
                $insert['al_price'] = $setting[$insert['d_price']][$insert['times']]['bond'] +$setting[$insert['d_price']][$insert['times']]['routine'];//总价
                $insert['status_q'] = 1;//已付款  持仓中
                $insert['buy_price'] =round($res['data']['result'][0]['data']['nowPri'],2);//股票购买价格
                $insert['num'] =  floor($insert['d_price']/($insert['buy_price']*100))*100;//购买股票数
                if($line == 1){//线上
                    $insert['status_h'] = 2;//后台已购买
                    //=============================================================================================================
                        //对接股市购买接口


                    //==============================================================================================================

                }else{//线下
                    $insert['status_h'] = 1;//未购买
                }


                if($user_arr['red'] +$user_arr['money'] >= $insert['al_price'] ){//够付款

                        //占比===============================================================================================
                        $output['1']['red'] = $user_arr['red'] < $insert['routine']?$user_arr['red']:$insert['routine'];//如果红包大于管理费，全额付，如果红包小于管理费，输入红包数量
                        $user_arr['red'] -= $output['1']['red'];//剩余红包
                        $output['1']['money'] = $insert['routine'] - $output['1']['red'];//剩余未交管理费

                        $output['2']['red'] = $user_arr['red']<$insert['bond']?$user_arr['red']:$insert['bond'];
                        $output['2']['money'] = $insert['bond'] - $output['2']['red'];

                        $insert['ac_routine'] = json_encode($output['1']);
                        $insert['ac_bond'] = json_encode($output['2']);
                        //====================================================================================================
                        if($user_arr['red'] <=  $insert['al_price']){//红包不足付
                            $insert['red']  = $user_arr['red'];//红包使用多少
                            $insert['ac_price']= $insert['al_price'] - $user_arr['red'];//实际价格
                        }else{
                            $insert['red'] = $setting[$insert['d_price']][$insert['times']]['al_price'];
                            $insert['ac_price'] = 0;
                        }



                }else{
                    $this->ajaxError('余额不足');
                }

            }else{
                $this->ajaxError($res['data']['result']['error_code'].":".$res['data']['reason']);
            }

        }else{
            $this->ajaxError('网络繁忙，请稍后再试');
        }




        //买入备注================================================================================
        if($line == 1){
            $insert['buy_note'] = '即时买入';
        }else{
            $insert['buy_note'] = '后台审核买入';
        }


        //=======================================================================================

        if($line == 1){
            //止盈价格================================================================================
            $insert['profit_price'] = round(($insert['buy_price']*$insert['num'] +$insert['profit'])/$insert['num'],2);//股票价格*股票数量+止盈价格（点买金额*止盈率）  除以  购买股票数

            //=======================================================================================

            //止损价格================================================================================
            $insert['loss_price'] = round(($insert['buy_price']*$insert['num'] - $insert['loss'])/$insert['num'],2);//股票价格*股票数量-止损价格（保证金*止损率  不同倍数不同） 除以 购买股票数

            //=======================================================================================


            //递延股票单价============================================================================
            $insert['delay_loss_price'] = round(($insert['buy_price']*$insert['num'] - $insert['delay_loss'])/$insert['num'],2);//股票价格*股票数量-递延条件（浮动盈亏）  除以  股票购买数量

            //======================================================================================
        }






        $out = D('Output');
        M()->startTrans();
        $r[] = M('order')->add($insert);

            foreach($output as $k=>$v){
                $pid = date('YmdHis',time()).rand(1000,9999);
                foreach($v as $kk=>$vv){
                    if($vv>0){//生成记录
                        $rr[] =  $out->addOutput($insert['user_id'],$pid,$k,$vv,$kk,$user_arr['phone'], $insert['id']);
                    }

                }
            }



        if(in_array(false,$r)){
            M()->rollback();
            $this->ajaxError('点买失败');
        }else{
            M()->commit();
            $this->ajaxSuccess('点买成功');
        }


    }
    //持仓   已购买的
    public function chicang(){
        $shares=[];
        $page = I('post.page')?I('post.page'):1;
        $pagesize = I('post.pagesize')?I('post.pagesize'):10;

        $user = M('user');
        $user_id = $this->userId();
        if(!$user_id){
            $this->ajaxError('请先登陆');
        }
        $gid_arr=[];
        $data = getlist('order',$page,$pagesize,['user_id'=>$user_id,'status_q' =>1,'status_h'=>['IN',[1,2]]],['inputtime'=>'desc'],['day','inputtime','id','user_id','buy_price','num','bond','loss','name','gid','d_price','status_h']);
        if($data['count']){
            foreach($data['list'] as $k=>$v){
                $gid_arr[$v['gid']] = $v['gid'];
                $data['list'][$k]['inputtime'] = date('Y-m-d H:i:s',$v['inputtime']);
                if($data['list'][$k]['status_h'] == 1){
                    $data['list'][$k]['buy_price'] = 0;

                }
            }
            $res = $this->shares->batchList($gid_arr);

            if($res){
                foreach($res as $k=>$v){
                    if($res[$k]['error_code'] == 0) {
                        $shares[$v['result'][0]['data']['gid']] =  round($v['result'][0]['data']['nowPri'],2);
                    }
                }

            }
            foreach($data['list'] as $k=>$v){
                if($shares[$v['gid']] != null){
                    $data['list'][$k]['sel_price'] = $shares[$v['gid']];
                    if($data['list'][$k]['status_h'] == 1){
                        $data['list'][$k]['al_balance'] = 0;
                    }else{
                        $data['list'][$k]['al_balance'] = round($data['list'][$k]['sel_price']*$v['num'] - $v['num']*$v['buy_price'],2);
                    }

                }else{
                    $data['list'][$k]['sel_price'] = '网络繁忙';
                    $data['list'][$k]['al_balance'] = '网络繁忙';
                }

                if($data['list'][$k]['al_balance']<0){
                    $data['list'][$k]['color'] = 3;//绿色
                }elseif($data['list'][$k]['al_balance']>0){
                    $data['list'][$k]['color'] = 2;//红色
                }else{
                    $data['list'][$k]['color'] = 1;//白色
                }
            }



        }
        unset($data['page']);
        $this->ajaxSuccess('获取数据成功',$data);


    }

    //点卖确认      停牌和st未处理
    //算利润   合计到实付金额里    递延费在定时里扣
    public function sel(){
        $line = M('setting')->field(['line'])->where(['display'=>1])->find()['line'];
        $worktime = D('time')->worktime();
        if($worktime['error']){
            $this->ajaxError($worktime['msg']);
        }


        //用户确认
        $user_id = $this->userId();
        if(!$user_id){
            $this->ajaxError('请先登陆');
        }
        $input = D('Input');

        //取收益设置
        $setting = M('setting')->field(['allot_profit','allot_loss'])->where(['display'=>1])->find();
        $order_id = I('post.order_id');
        $order = M('order');

        //获取订单详情
        $order_arr = $order->field(['id','buy_price','d_price','num','day','gid','ac_price','bond','status_q','phone','user_id','buy_note','status_h'])->where(['id'=>$order_id,'status_q'=>1,'status_h'=>2])->find();
        if($order_arr['day']<2){
            $this->ajaxError('持仓天数小于T+1，不可进行点卖');
        }
        if($order_arr['status_q'] != 1){
            $this->ajaxError('不能重复点卖');
        }
        if($order_arr['status_h'] != 2){
            $this->ajaxError('该订单暂未通过后台审核');
        }
        if($order_arr['user_id'] != $user_id){
            $this->ajaxError('请勿进行非法操作');
        }

        //获取股票最新信息
        $res = $this->shares->oneInfo($order_arr['gid']);
        $update['sel_note'] = '客户申请平仓';
        $update['updatetime'] = time();
        $update['status_q'] = 2;//已结算
        if($line == 1 || $order_arr['buy_note'] == '新手点买体验'){//线上  新手点买 线上
            if($res['error'] == 0){
                if($res['data']['error_code']=='0'){
                    $update['sel_price'] = round($res['data']['result'][0]['data']['nowPri'],2);
                }else{
                    $this->ajaxError($res['data']['result']['error_code'].":".$res['data']['reason']);
                }

            }else{
                $this->ajaxError('网络繁忙，请稍后再试');
            }
            $update['status_h'] = 2;//已支付
        }else{
            $update['status_h'] = 1;//未填写价格
        }

        //后-先
        if($line == 1 || $order_arr['buy_note'] == '新手点买体验'){
            $update['al_balance'] = $update['sel_price']*$order_arr['num'] - $order_arr['buy_price']*$order_arr['num'];
            if($update['al_balance'] >=0){//总收益大于0
                $update['ac_balance']  = $update['al_balance'] * $setting['allot_profit'];//盈利分配系数
                $update['ac_price'] = $order_arr['ac_price'] - ($order_arr['bond'] + $update['ac_balance']);//减少客户实际支出，后台算账
                $update['j_bond'] = $order_arr['bond'];//解冻保证金
            }else{
                $update['ac_balance'] = $update['al_balance'] * $setting['allot_loss'];//乘系数了
                if( $order_arr['bond'] + $update['ac_balance'] < 0){
                    $update['ac_balance'] = -$order_arr['bond'];//损失以保障金为底
                }
                $update['j_bond'] = $order_arr['bond'] +$update['ac_balance'];

                //=================================================================================================================
                $update['ac_price'] = $order_arr['ac_price'] - $update['j_bond'];
            }
        }



        M()->startTrans();
        $r[] = $order->where(['id'=>$order_id])->save($update);//更新订单状态
        if($line == 1 || $order_arr['buy_note'] == '新手点买体验'){//线上给钱
            if($order_arr['buy_note'] == '新手点买体验'){
                $account = 'red';
            }else{
                $account = 'money';
            }
            if($update['j_bond']>0){
                $r[] = $input->addInput($user_id,2,$update['j_bond'],$account,$order_arr['phone'],$order_arr['id']);
            }
            if($update['ac_balance']>0){
                $r[] = $input->addInput($user_id,3,$update['ac_balance'],$account,$order_arr['phone'],$order_arr['id']);
            }
        }

        if(in_array(false,$r)){
            M()->rollback();
            $this->ajaxError('点卖成功');
        }else{
            M()->commit();
            $this->ajaxSuccess('点卖成功');
        }
    }


    //交易动态
    public function sel_list(){
        $page   = I('post.page')?I('post.page'):1;
        $pagesize = I('post.pagesize')?I('post.pagesize'):10;

        $data = getlist('order',$page,$pagesize,['display'=>1],['inputtime'=>'desc'],['name','gid','phone','inputtime']);
        if($data['count']){
            $times = time();
            foreach($data['list'] as $k=>$v){
                $data['list'][$k]['time'] = secsToStr($times - $v['inputtime']);
                $data['list'][$k]['phone'] = onPhone($v['phone']);
            }
        }

        $this->ajaxSuccess('获取数据成功',['list'=>$data['list'],'maxpage'=>$data['maxpage'],'count'=>$data['count']]);
    }

    //盈利分配
    public function balance_list(){
        $page   = I('post.page')?I('post.page'):1;
        $pagesize = I('post.pagesize')?I('post.pagesize'):10;

        $data = getlist('order',$page,$pagesize,['status_q'=>2,'ac_balance'=>['GT',0]],['inputtime'=>'desc'],['name','gid','phone','inputtime','ac_balance']);
        if($data['count']){
            $times = time();
            foreach($data['list'] as $k=>$v){
                $data['list'][$k]['time'] = secsToStr($times - $v['inputtime']);
                $data['list'][$k]['phone'] = onPhone($v['phone']);
            }
        }

        $this->ajaxSuccess('获取数据成功',['list'=>$data['list'],'maxpage'=>$data['maxpage'],'count'=>$data['count']]);
    }



    public function search(){
        error_reporting(0);
        $host = "http://stock.api51.cn/wizard";//如需https请修改为 https://smsapi51.cn
        $path = "";//path为 single_sms_get 时为GET请求
        $path = "";//path为 single_sms_get 时为GET请求
        $method = "0";//post=1 get=0
        $url = $host . $path;
        if($_GET){
            $data = array(
                'prod_code'=>$_GET['prod_code'],//产品代码
                'en_finance_mic'=>'SS,SZ',//交易所识别码集合	多个交易所识别码,逗号(,)分割。 如： finance_mic=SS,SZ表示优先查询上交所和深交所的代码，且按照参数的先后顺序优先查找 注：返回结果不按查找的市场顺序排序
                'data_count'=>$_GET['data_count'],//产品代码



            );
        }
        if($_POST){
            $data = array(
                'prod_code'=>$_POST['prod_code'],//产品代码
                'en_finance_mic'=>$_POST['en_finance_mic'],//产品代码
                'data_count'=>$_POST['data_count'],//产品代码
            );
        }

        $data = http_build_query($data);

        $result = $this->shares->api51_curl($url,$data,$method);
        if(!$result){
            $this->ajaxError('网络繁忙');
        }
        $result = json_decode($result,true);
//        foreach($result as $k=>$v){
//            $result[$k]['prod_code'] = substr($v['prod_code'],0,6);
//        }
        $this->ajaxSuccess('数据获取成功',['list'=>$result]);

    }

    //新手点卖(预览) ，买之后给45元红包
    public function new_start(){
        $worktime = D('time')->worktime();
        if($worktime['error']){
            $set['time'] = 0;//0不能点买  1可以点买
        }else{
            $set['time'] = 1;
        }

        $gid = I('post.gid');//股票编码
        if(!$gid){
            $this->ajaxError('参数错误');
        }
        $user_id = $this->userId();
        if(!$user_id){
            $this->ajaxError('请先登陆');
        }
        $user = M('user');
        $user_arr = $user->field(['mark'])->where(['display'=>1,'id'=>$user_id])->find();
        if(!$user_arr['mark']){
            $this->ajaxError('您已参加过新手体验活动，不可重复参加');
        }

        error_reporting(0);
        $host = "http://stock.api51.cn/real";//如需https请修改为 https://smsapi51.cn
        $path = "";//path为 single_sms_get 时为GET请求
        $method = "0";//post=1 get=0
        $url = $host . $path;

        $data = array(
            'en_prod_code'=>$gid,//产品代码
            'fields'=>'prod_name,open_px,high_px,low_px,last_px,preclose_px,px_change,px_change_rate,trade_status,up_px,down_px',//交易所识别码集合	多个交易所识别码,逗号(,)分割。 如： finance_mic=SS,SZ表示优先查询上交所和深交所的代码，且按照参数的先后顺序优先查找 注：返回结果不按查找的市场顺序排序
        );



        $data = http_build_query($data);

        $result = $this->shares->api51_curl($url,$data,$method);

        $data = [];
        if(!$result){
            $this->ajaxError('网络繁忙');
        }
        $result = json_decode($result,true);

        foreach($result['data']['snapshot']['fields'] as $k=>$v){
            $res[$v] = $result['data']['snapshot'][$gid][$k];
        }



        $data['gid'] = $gid;//股票编码
        $data['name'] = $res['prod_name'];//股票名称

        if(substr($data['name'],0,2) =='ST' || substr($data['name'],0,2) =='st'){
            $data['status'] = 1;// 1 高风险
            $ban = 0.05;
        }elseif(substr($data['name'],0,3 )== '*ST' || substr($data['name'],0,3 )== '*st'){
            $data['status'] = 1;//1 高风险
        }else{
            $data['status'] = 0;//普通股票
        }
        $data['todayStartPri'] =$res['open_px'];//今日开盘价
        $data['nowPri'] = $res['last_px'];//当前价格
        if($res['trade_status'] == 'STOPT'){//开盘价格 为0   成交量为0 确定为 停牌
            $data['status'] = 2;//停牌
        }


        $data['increase'] = $res['px_change'];//涨跌额
        $data['increPer'] = $res['px_change_rate'];//涨跌百分比
        if($data['increase'] > 0){
            $data['pri_color'] = 2;//红色
        }elseif($data['increase'] < 0){
            $data['pri_color'] = 3;//绿色
        }else{
            $data['pri_color'] = 1;//白色
        }



        $data['yestodEndPri'] = $res['preclose_px'];//昨日收盘价   ——————白色
        if($data['yestodEndPri'] > $data['todayStartPri']){
            $data['to_pri_color'] = 3;//绿色
        }elseif($data['yestodEndPri'] < $data['todayStartPri']){
            $data['to_pri_color'] = 2;//红色
        }else{
            $data['to_pri_color'] = 1;//白色
        }

        $data['inc'] = $res['up_px'];//涨停
        $data['dec'] = $res['down_px'];//跌停

        $data['todayMax'] =$res['high_px'];//今日最高
        $data['todayMin'] =$res['low_px'];//今日最低
        if($data['yestodEndPri'] > $data['todayMax']){
            $data['to_max_color'] = 3;//绿色
        }elseif($data['yestodEndPri'] < $data['todayMax']){
            $data['to_max_color'] = 2;//红色
        }else{
            $data['to_max_color'] = 1;//白色
        }
        if($data['yestodEndPri'] > $data['todayMin']){
            $data['to_min_color'] = 3;//绿色
        }elseif($data['yestodEndPri'] < $data['todayMin']){
            $data['to_min_color'] = 2;//红色
        }else{
            $data['to_min_color'] = 1;//白色
        }

        //分时
        $config = C();
        list($year,$month,$day) = explode('-',date('Y-m-d',time()));
        $today = mktime(23, 59, 59, $month, $day-1, $year);
        $time_s_s = strtotime($config['WEB_TIME_S_S']);
        if($time_s_s > time() ||D('time')->worktime()['error'] ){//开盘时间大于当前时间  或非点卖时段
            $today = M('time')->where(['type'=>0,'inpputtime'=>['ELT',$today]])->order(['inputtime'=>'desc'])->find()['inputtime'];
            $fs_date = date('Ymd',$today);
        }else{
            $field['date'] = '';
        }

        $url =  "http://stock.api51.cn/trend";
        $field = array(
            'prod_code'=>$gid,//产品代码
            'fields'=>'last_px,avg_px,business_amount,business_balance',
            'crc'=>I('post.crc'),//循环冗余校验码
//            'date'=>$_GET['date'],//	日期
            'min_time'=>I('post.min_time'),//	分时分钟时间
        );

        $field = http_build_query($field);

        do{
            $fenshi = $this->shares->api51_curl($url,$field,$method);
        }while(!$fenshi);

        $fenshi = json_decode($fenshi,true);

        foreach($fenshi['data']['trend'][$gid] as $k=>$v){
            $fenshi['data']['trend'][$gid][$k][5] = round($v[1] - $data['yestodEndPri'],2);//现价-昨日收盘价
            $fenshi['data']['trend'][$gid][$k][6] = round(($v[1] - $data['yestodEndPri'])/$data['yestodEndPri'] * 100,2);
        }


        //K线
        $url = "http://stock.api51.cn/kline";
        $field = array(
            'prod_code'=>$gid,//产品代码	有且仅能有 1 个代码；证券代码包含交易所代码做后缀，作为该代码的唯一标识。如：600570.SS
            'fields'=>'open_px,high_px,low_px,close_px,business_amount,business_balance,turnover_ratio',//字段集合	允许的字段： 开盘价：open_px 最高价：high_px 最低价：low_px 收盘价：close_px 成交量：business_amount 成交额：business_balance 如果没有指定任何有效的字段，则返回所有字段
            'candle_mode'=>1,//K线模式	0：原始K线 1：前复权K线 2：后复权K线
            'candle_period'=>6,//K线周期	取值可以是数字1-9，表示含义如下： 1：1分钟K线 2：5分钟K线 3：15分钟K线 4：30分钟K线 5：60分钟K线 6：日K线 7：周K线 8：月K线 9：年K线
            'get_type'=>'offset',//查找类别	offset 按偏移查找；range 按日期区间查找；必须输入其中一个值
            'data_count'=>200,//数据个数	需要取得的 K 线的根数，如果该字段不存在，取值范围[1, 1000]，默认为 10 个。 仅在 get_type=offset 时有效。
            'search_direction'=>$_GET['search_direction'],//	搜索方向	1 表示向前查找（默认值） ，2 表示向后查找。 仅在 get_type=offset 时有效。
            'date'=>$fs_date,//	日期	不输入默认为当前日期；请求日K线时，如果输入日期，不返回该日期的K线 get_type=offset时有效
            'min_time'=>$_GET['min_time'],//分时分钟时间(HHMM)	分钟 K 线的时间 HHMM,对于 短 周期 K 线 类型 使用(1min,5min 等)，不填写表示最新的市场时间，若填写必须同时填写 date 字段。请求分钟K线时，如果输入该字段，不返回输入分钟的K线 仅在 get_type=offset 且candle_period=1~5（分钟 K线）时有效。
            'start_date'=>$_GET['start_date'],//开始日期	1、 start_date 和 end_date 均不填， 返回距离当前日期的1000 根 K 线； 2、 仅填 start_date， 当 start_date和最新日期之间的数据不足1000 根，返回 start_date 和最新日期之间的数据；如果数据超过 1000 根 K 线， 则返回距离当前日期的 1000 根 K线； 3、 仅填 end_date ， 返 回end_date 之前存在的的最多1000 根 K 线； 4、 start_date 和 end_date 均填充，返回该日期区间（闭区间）的数据，最多 1000 根。 仅在 get_type=range 时有效。
            'end_date'=>$_GET['end_date'],//截止日期	默认为当前日期； 1、 start_date 和 end_date 均不填， 返回距离当前日期的1000 根 K 线； 2、 仅填 start_date， 当 start_date和最新日期之间的数据不足1000 根，返回 start_date 和最新日期之间的数据；如果数据超过 1000 根 K 线， 则返回距离当前日期的 1000 根 K线； 3、 仅填 end_date ， 返 回end_date 之前存在的的最多1000 根 K 线； 4、 start_date 和 end_date 均填充，返回该日期区间（闭区间）的数据，最多 1000 根。 仅在 get_type=range 时有效。

        );
        $field = http_build_query($field);

        do{
            $kline = $this->shares->api51_curl($url,$field,$method);
        }while(!$kline);

        $kline = json_decode($kline,true);
        $setting = M('setting')->field(['new_dprice','new_profit'])->where(['display'=>1])->find();
        $set['num'] = floor($setting['new_dprice']/($data['nowPri']*100))*100;//可购入多少股
        $set['d_price'] = $setting['new_dprice'];//新手红包金额
        $set['profit'] = $setting['new_profit'].'%';//触发止盈

        $config = C();

        $set['WEB_TIME_S_S'] = substr($config['WEB_TIME_S_S'],0,5);
        $set['WEB_TIME_S_E'] = substr($config['WEB_TIME_S_E'],0,5);
        $set['WEB_TIME_X_S'] =  substr($config['WEB_TIME_X_S'],0,5);
        $set['WEB_TIME_X_E'] = substr($config['WEB_TIME_X_E'],0,5);







        $this->ajaxSuccess('数据获取成功',['share'=>$data,'fenshi'=>$fenshi,'kline'=>$kline,'set'=>$set]);



    }

    //新手点买 只有线上
    public function new_buy(){
        $worktime = D('time')->worktime();
        if($worktime['error']){
            $this->ajaxError($worktime['msg']);
        }
        $set_arr = M('setting')->field(['new_dprice','new_profit','new_red'])->where(['display'=>1])->find();
        $gid = I('post.gid');//股票编码
        if(!$gid){
            $this->ajaxError('参数错误');
        }
        $gid = D('time')->gid($gid);
        $user_id = $this->userId();
        if(!$user_id){
            $this->ajaxError('请先登陆');
        }
        $user = M('user');
        $user_arr = $user->field(['mark','phone',])->where(['display'=>1,'id'=>$user_id])->find();

        if(!$user_arr['mark']){
            $this->ajaxError('您已体验过新手点买');
        }


        //阿里数组
        $host = "http://stock.api51.cn/real";//如需https请修改为 https://smsapi51.cn
        $path = "";//path为 single_sms_get 时为GET请求
        $method = "0";//post=1 get=0
        $url = $host . $path;

        $data = array(
            'en_prod_code'=>I('post.gid'),//产品代码
            'fields'=>'issue_date',//交易所识别码集合	多个交易所识别码,逗号(,)分割。 如： finance_mic=SS,SZ表示优先查询上交所和深交所的代码，且按照参数的先后顺序优先查找 注：返回结果不按查找的市场顺序排序
        );


        $data = http_build_query($data);//参数构建


        $result = $this->shares->api51_curl($url,$data,$method);

        $data = [];
        if(!$result){
            $this->ajaxError('网络繁忙');
        }
        $result = json_decode($result,true);

        foreach($result['data']['snapshot']['fields'] as $k=>$v){
            $ress[$v] = $result['data']['snapshot'][I('post.gid')][$k];
        }

        $issue_time = strtotime($ress['issue_date']);
        list($year,$month,$day) = explode('-',date('Y-m-d',$issue_time));
        $isss_date = mktime (null, null,null, $month, $day, $year+1);



        $insert['phone'] = $user_arr['phone'];
        $insert['display'] = 1;
        $insert['inputtime'] = time();
        $insert['gid'] =  $gid;//股票编码
        $insert['referee_id'] = 0;//新手点卖，分级不享受分成
        $insert['id'] =date('YmdHis',time()).rand(1000,9999);//订单id
        $insert['day'] = 1;//持仓日
        $insert['d_price'] = $set_arr['new_dprice'];//点买价格
        $insert['times'] = 1;//新手体验，没有倍数
        $insert['new'] = 1;//新手订单
        $insert['user_id'] = $user_id;
        $res = $this->shares->oneInfo($insert['gid']);
        if($res['error'] == 0 ) {
            if($res['data']['error_code']=='0'){


                $st = D('time')->share_st($res['data']['result'][0]['data']['name']);
                if($st){
                    $this->ajaxError('不能购买高风险股票');
                }
                $tingpai = D('time')->tingpai($res['data']['result'][0]['data']['todayStartPri'],$res['data']['result'][0]['data']['traNumber']);
                if($tingpai){
                    $this->ajaxError('不能购买停牌股票');
                }
                //涨跌幅超过8% 不能购买
                $zhangdie = ($res['data']['result'][0]['data']['increPer'] > 8) || ($res['data']['result'][0]['data']['increPer'] <-8);
                if($zhangdie){
                    $this->ajaxError('不能购买涨跌幅超过8%的股票');
                }

                //次新股
                if($isss_date >= time() ){
                    $this->ajaxError('不能购买次新股');
                }





                $insert['profit'] = $insert['d_price']*$set_arr['new_profit']/100;//止盈价格
                $insert['name'] = $res['data']['result'][0]['data']['name'];//股票名称
                $insert['loss'] = 0;//止损价格
                $insert['bond'] = 0;//保证金
                $insert['routine'] = 0;//交易综合费
                $insert['delay_price'] = 0;//递延费用  每万
                $insert['delay_loss'] = 0;//递延条件
                $insert['al_price'] = 0;//总价
                $insert['status_q'] = 1;//已付款  持仓中
                //递延股票单价============================================================================
                $insert['delay_loss_price'] = 0;//股票价格*股票数量-递延条件（浮动盈亏）  除以  股票购买数量

                //======================================================================================
                //止损价格================================================================================
                $insert['loss_price'] = 0;//股票价格*股票数量-止损价格（保证金*止损率  不同倍数不同） 除以 购买股票数

                //=======================================================================================
                $insert['buy_price'] =round($res['data']['result'][0]['data']['nowPri'],2);//股票购买价格
                $insert['num'] =  floor($insert['d_price']/($insert['buy_price']*100))*100;//购买股票数
                $insert['status_h'] = 2;//后台已购买



            }else{
                $this->ajaxError($res['data']['result']['error_code'].":".$res['data']['reason']);
            }

        }else{
            $this->ajaxError('网络繁忙，请稍后再试');
        }




        //买入备注================================================================================

            $insert['buy_note'] = '新手点买体验';



        //=======================================================================================


            //止盈价格================================================================================
            $insert['profit_price'] = round(($insert['buy_price']*$insert['num'] +$insert['profit'])/$insert['num'],2);//股票价格*股票数量+止盈价格（点买金额*止盈率）  除以  购买股票数

            //=======================================================================================








        M()->startTrans();
        $r[] = M('order')->add($insert);
        $r[] = M('user')->where(['id'=>$user_id])->save(['mark'=>0]);//改状态
        //$r[] = M('user')->where(['id'=>$user_id])->setInc('red',$set_arr['new_red']);//加红包
        $r[] = D('input')->addInput($user_id,8,$set_arr['new_red'],'red',$user_arr['phone']);

        if(in_array(false,$r)){
            M()->rollback();
            $this->ajaxError('点买失败');
        }else{
            M()->commit();
            $this->ajaxSuccess('点买成功');
        }
    }

    //协议获取
    public function xieyi(){
        $data = M('config')->where(['key'=>'WEB_REG_CONTENT'])->find();
        $this->ajaxSuccess('获取数据成功',['xieyi'=>$data['value']]);
    }
    //客户电话
    public function phone(){
        $data = M('config')->where(['key'=>'WEB_PHONE'])->find();
        $this->ajaxSuccess('获取数据成功',['phone'=>$data['value']]);
    }
    //支付宝账号
    public function zhifubao(){
        $data = M('config')->where(['key'=>'WEB_ZFB'])->find();
        $this->ajaxSuccess('获取数据成功',['zhifubao'=>$data['value']]);
    }


    //排行榜
    public function paihang(){
        $order = 1;
        $data = M('paihang')->where(['display'=>1])->order(['balance'=>'desc'])->select();
        foreach($data as $k=>$v){
            $data[$k]['inputtime'] = date('Y-m-d H:i:s',$v['inputtime']);
            $data[$k]['order'] = $order;
            $data[$k]['balance'] = number_format($v['balance'],2);
            $order ++;
        }
        $this->ajaxSuccess('数据获取成功',['list'=>$data]);
    }

    public function user_id(){
        $this->ajaxSuccess('获取数据成功',['user_id'=>$this->userId()]);
    }









}