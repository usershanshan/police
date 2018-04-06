<?php
namespace Home\Controller;
use Home\Logic\SendCodeLogic;

use Home\Api\InPayApi;
use Home\Api\OutPayApi;
class UserController extends AfterLandingController {
    private $SendCode_Login;
    private $PHONE_SAVE_NAME;
    private $PHONE_SAVE_MSG;
    
	public function __construct()
	{
		parent::__construct();
		$this->SendCode_Login = new SendCodeLogic(C('PHONE_USER'),C('PHONE_PASS'),C('PHONE_SEND_NAME'));
		$this->checkInLogin();//给$this->USER_INFO赋值
	}
	//个人中心  V
	public function index(){
	    $qiandao = '';
        $user_id = $this->userId();
        if(!$user_id){
            $this->ajaxError('请先登陆');
        }
        $user_arr = M('user')->where(['id'=>$user_id])->find();

        $time = gettime();
        if($user_arr['qiandao_time'] >=$time['day']){
            $qiandao = 0;//不能签到
        }else{
            $qiandao = 1;//可以签到
        }
        $this->ajaxSuccess('数据获取成功',['phone'=>$user_arr['phone'],'money'=>$user_arr['money'],'red'=>$user_arr['red'],'status'=>$user_arr['name']?1:0,'qiandao'=>$qiandao,'day'=>$user_arr['qiandao']]);//1=>绑定了身份证 0=>未绑定身份证
    }
    //签到
    public function qiandao(){
	    $user_id = $this->userId();
	    $user=M('user')->field(['id','qiandao_time'])->where(['id'=>$user_id])->find();
        $time = gettime();
        if($user['qiandao_time'] >=$time['day']){
            $this->ajaxError('今日已签到');
        }else{
            M('user')->where(['id'=>$user_id])->setInc('qiandao',1);//签到次数加一
            M('user')->where(['id'=>$user_id])->save(['qiandao_time'=>time()]);//更新时间
            $this->ajaxSuccess('签到成功');
        }

    }

    //实名认证   V
    public function idCard(){
        $user_id = $this->USER_INFO['id'];
        $user_arr = M('user')->where(['id'=>$user_id])->find();
        if($user_arr['name']){
            $this->ajaxError('不能重复认证');
        }
        $name = I('post.name');//真实姓名
        $idcard = I('post.idcard');//身份证号
        if(!$name){
            $this->ajaxError('请输入姓名');
        }
        if(num_str($name,'name')){
            $this->ajaxError('请输入中文姓名');
        }
        if(!$idcard){
            $this->ajaxError('请输入身份证号');
        }
        if(num_str($idcard,'idcard')){
            $this->ajaxError('请正确输入身份证号');
        }
        $update['name'] = $name;
        $update['idcard'] = $idcard;
        $r = M('user')->where(['id'=>$user_id])->save($update);
        if($r){
            $this->ajaxSuccess('认证成功');
        }else{
            $this->ajaxError('认证失败');
        }

    }

    //认证状态  V
    public function identify(){
	    $user_id = $this->USER_INFO['id'];
	    $user_arr = M('user')->where(['id'=>$user_id])->find();

        if($user_arr['name']){

            $str = mb_substr($user_arr['name'],0,3);
            $info['name'] = str_replace($str,'*',$user_arr['name']);
            $str = substr($user_arr['idcard'],2,-2);
            //$info['name'] .= '('.str_replace($str,str_repeat('*',strlen($str)),$user_arr['idcard']).')';
            $info['name'] .= '('.str_replace($str,'**** **** **** **',$user_arr['idcard']).')';//只有18位的

        }else{
            $info['name'] = 0;
        }

        $info['bank'] = $user_arr['bank_info']?1:0;//1已绑定   0 未绑定
        $this->ajaxSuccess('数据获取成功',$info);
	}


	public function log(){
	    $count      = M('Users_log')->where(['uid'=>$this->USER_INFO['id']])->count();
	    $Page       = new \Think\Page($count,20);
	    $show       = $Page->show();
	    $list = M('Users_log')->where(['uid'=>$this->USER_INFO['id']])->order('add_time desc')->limit($Page->firstRow.','.$Page->listRows)->select();
	    foreach ($list as $k=>$v){
	        $Ip = new \Org\Net\IpLocation('UTFWry.dat'); // 实例化类 参数表示IP地址库文件
	        $list[$k]['ip_ut'] = $Ip->getlocation($v['ip'])['country']; // 获取某个IP地址所在的位置
	    }
	    $this->assign('list',$list);
	    $this->assign('page',$show);
	    $this->display();
	}


	/**
	 * 发送短信验证码====更改密码
	 * @author		JiangPeng <867633862@qq.com>
	 * @version		v1.0.0
	 * @copyright	2017-3-17 下午2:46:21
	 */
	public function updatePasswordSend(){
	    if(IS_POST){
	        $phone = I('post.phone');
	        if(empty($phone)){
	            $this->ajaxError('请输入手机号码');
	        }
	        if(num_str($phone,'phone')){
	            $this->ajaxError('请填写正确的电话号码');
	        }
            if($phone != $this->USER_INFO['phone']){//判断是否是当前用户
                $this->ajaxError('手机号与当前登陆用户不符');
            }
	        $u = M('User')->where(['phone'=>$phone,'display'=>1])->find();
	        if(!$u){
	            $this->ajaxError('用户不存在或已被禁用');
            }
	        $result = $this->SendCode_Login->sandHuaXinCode($u['phone'],C('PHONE_RESET_PWD_NAME'),C('PHONE_RESET_PWD_MSG'));//给第一次提交上的手机号发送信息
	        if(!$result){
	            $this->ajaxError('发送失败');
	        }
	        $this->ajaxSuccess('发送成功');
	    }
	}

    //添加银行卡
    public function addBank(){
	    $user = M('user');
	    $user_id = $this->USER_INFO['id'];
	    $user_arr = $user->where(['id'=>$user_id])->find();
	    $bank_info = json_decode($user_arr['bank_info'],true);
	    if(!$user_arr['name']){
	        $this->ajaxError('请先进行实名认证');
        }
	    if(count($bank_info) >= 3){
	        $this->ajaxError('最多只能添加3张银行卡');
        }
        $info = I('post.');
        $require = [
            'bank_name'=>'请选择银行名称',
            'bank_number'=>'请填写银行卡号'
        ];
        $res = required($require,$info);
        if($res['Error']){
            $this->ajaxError($res['Msg']);
        }
        if(num_str($info['bank_number'],'bank')){
            $this->ajaxError('请正确输入银行卡号');
        }
        foreach($bank_info as $k=>$v){
            if($v['bank_number'] == $info['bank_number']){
                $this->ajaxError('该银行卡已绑定');
            }
        }
        $bank_info[] = ['bank_name'=>$info['bank_name'],'bank_number'=>$info['bank_number'],'id'=>date('YmdHis',time()).rand(100,999)];
        $bank_info = json_encode($bank_info);
        $r = $user->where(['id'=>$user_id])->save(['bank_info'=>$bank_info]);
        if($r){
            $this->ajaxSuccess('绑定成功');
        }else{
            $this->ajaxError('绑定失败');
        }

    }
    //银行卡列表
    public function bankList(){
	    $user = M('user');
	    $user_id = $this->USER_INFO['id'];
	    $user_arr = $user->where(['id'=>$user_id])->find();
	    $bank_info = $user_arr['bank_info'];
	    if($bank_info){
            $bank_info = json_decode($user_arr['bank_info'],true);
            foreach($bank_info as $k=>$v){
                $str1 = substr($v['bank_number'],0,-4);

                $str2 = substr($v['bank_number'],-4,4);
                $bank_info[$k]['bank_number'] = str_repeat('*',strlen($str1)).$str2;
                $str='';
                for($i=1;$i<=ceil(strlen($v['bank_number'])/4);$i++){
                    $str .= substr($bank_info[$k]['bank_number'],4*($i-1),4).' ';

                }
                $bank_info[$k]['bank_number'] = $str;

            }
        }

        $this->ajaxSuccess('获取数据成功',$bank_info);
	}












    //充值第一次   ==菜单
    public function payFast(){
	    $user = M('user');
	    $user_id = $this->USER_INFO['id'];
	    $user_arr = $user->where(['id'=>$user_id,'display'=>1])->find();
	    if(IS_POST){
            if(!$user_arr){
                $this->ajaxError('用户不存在或已禁用，请重新登陆');
            }
	        $info = I('post.');
            $require= [
                'accountNo'=>'请输入银行卡号',
                'accountName'=>'请输入开户名称',
                'bankName'=>'请选择开户银行',
                'mobile'=>'请填写手机号',
                'idNumber'=>'请输入身份证号',
                'totalFee'=>'请填写充值金额'

            ];

            $res = required($require,$info);
            if($res['Error']){
                $this->ajaxError($res['Msg']);
            }
            if(num_str($info['mobile'],'phone')){
                $this->ajaxError('请正确填写手机号');
            }
            if(num_str($info['totalFee'],'price')){
                $this->ajaxError('请正确填写充值金额');
            }


            //TODO 数据前台传入后台加入判断条件,下方为模拟数据


            //卡号
            $accountNo = $info['accountNo'];//设置
            //手机号码
            $mobile = $info['mobile'];//前台获取
            //姓名
            $accountName = $info['accountName'];
            //身份证号码
            $idNumber = $info['idNumber'];//前台获取
            //银行名称
            $bankName = $info['bankName'];//设置
            //金额(分)
            $totalFee = $info['totalFee']*100;//前台获取*100//=====================================================
            $Pay = new InPayApi($accountNo,$mobile,$accountName, $idNumber,$bankName,$totalFee);
            //发送短信验证码
            $result = $Pay->payFast();
            if($result['status'] != 'success'){
                //保存短信验证码
                $this->ajaxError($result['msg']);
            }
            session('SEND_'.$mobile.'_PAY_CODE',$result['data']) ;//存信息
            $this->ajaxSuccess($result['msg'],$result['data']);//为什么要把datachuanguoqu
        }else{
	        $page = I('get.page')?I('get.page'):1;
	        $pagesize = I('get.pagesize')?I('get.pagesize'):10;
            $data = getlist('input',$page,$pagesize,['user_id'=>$user_id],['inputtime'=>'desc']);
            if($data['count']){
                foreach($data['list'] as $k=>$v){
                    $data['list'][$k]['inputtime']=date('Y-m-d H:i:s',$v['inputtime']);
                    $data['list'][$k]['bank_info'] = $v['bankname'].'/尾号'.substr ($v['accountno'], -4);

                    switch($v['status']){
                        case 1:
                            $data['list'][$k]['status']  = '下单中';
                            break;
                        case 2:
                            $data['list'][$k]['status']  = '等待支付';
                            break;
                        case 3:
                            $data['list'][$k]['status'] = '支付成功';
                            break;
                        case 4:
                            $data['list'][$k]['status'] = '支付失败';
                            break;
                        case 6:
                            $data['list'][$k]['status'] = '用户未支付 ';
                            break;

                    }

                }
            }
            $this->assign('user_arr',$user_arr);
            $this->assign('list',$data['list']);
            $this->assign('page',$data['page']);
	        $this->display('recharge');

        }


    }
    //充值第二步
    public function tradePau(){
        $user = M('user');
        $user_id = $this->USER_INFO['id'];
        $user_arr = $user->where(['id'=>$user_id,'display'=>1])->find();
	    if(IS_POST){
            if(!$user_arr){
                $this->ajaxError('用户不存在或已禁用，请重新登陆');
            }
            $info = I('post.');
            $require= [
                'accountNo'=>'请输入银行卡号',
                'accountName'=>'请输入开户名称',
                'bankName'=>'请选择开户银行',
                'mobile'=>'请填写手机号',
                'idNumber'=>'请输入身份证号',
                'totalFee'=>'请填写充值金额',
                'code'=>'请填写手机验证码'

            ];

            $res = required($require,$info);
            if($res['Error']){
                $this->ajaxError($res['Msg']);
            }
            if(num_str($info['mobile'],'phone')){
                $this->ajaxError('请正确填写手机号');
            }
            if(num_str($info['totalFee'],'price')){
                $this->ajaxError('请正确填写充值金额');
            }
            //TODO 数据前台传入后台加入判断条件,下方为模拟数据
            //卡号
            $accountNo = $info['accountNo'];
            //手机号码
            $mobile = $info['mobile'];//设置==账号
            //姓名
            $accountName = $info['accountName'];
            //身份证号码
            $idNumber = $info['idNumber'];//前台获取
            //银行名称
            $bankName = $info['bankName'];
            //金额(分)
            $totalFee = $info['totalFee']*100;//前台获取*100============================================
            //短信验证码
            $code = $info['code'];//前台获取
            //执行payFast方法时存入(TODO 自行判断是否存在如不存在弹出)
            $signSn = session('SEND_'.$mobile.'_PAY_CODE');
            $Pay = new InPayApi($accountNo,$mobile,$accountName, $idNumber,$bankName,$totalFee);
            //发送短信验证码
            $result = $Pay->tradePay($signSn,$code);
            if($result['status'] != 'success'){
                //保存短信验证码
                $this->ajaxError($result['msg']);
            }
            //TODO  根据返回信息以及当前信息存入数据库==================================================================================
            $insert['user_id'] = $user_id;
            $insert['inputtime'] = time();
            $insert['display'] = 1;
            $insert['accountNo'] = $accountNo;
            $insert['mobile'] = $mobile;
            $insert['accountName'] = $accountName;
            $insert['idNumber'] =$idNumber;
            $insert['bankName'] = $bankName;
            $insert['totalFee'] = $result['data']['total_fee'] / 100;//==============================
            $insert['status'] = $result['data']['order_status'];

            M('input')->add($insert);
            //=========================================================
            if($result['data']['order_status'] == 3){//支付成功??会直接成功么？？
                 $user->where(['id'=>$user_id])->setInc('money',$insert['totalFee']);//加钱
            }
            //=========================================================

            session('SEND_'.$mobile.'_PAY_CODE',null);
            $this->ajaxSuccess($result['msg'],$result['data']);
        }else{
	        $this->display();//用不上
        }

    }

    //提现
    public function outPay(){
        //TODO 数据前台传入后台加入判断条件,下方为模拟数据
        $user = M('user');
        $user_id = $this->USER_INFO['id'];
        $user_arr = $user->where(['id'=>$user_id,'display'=>1])->find();
        if(IS_POST){
            $output = M('output');
            if(!$user_arr){
                $this->ajaxError('该用户已被禁用');
            }
            if(!$user_arr['bank']){
                $this->ajaxError('请前往个人中心设置银行卡相关信息');
            }
            $info=I('post.');
            $require= [
                'amt'=>'请输入提现金额',
                'paypassword'=>'请填写二级密码'
            ];

            $res = required($require,$info);
            if($res['Error']){
                $this->ajaxError($res['Msg']);
            }
            if(num_str($info['amt'],'price')){
                $this->ajaxError('请正确填写提现金额');
            }
            if(md5($info['paypassword']) != $user_arr['paypassword']){
                $this->ajaxError('二级密码错误');
            }
            //卡号
            $accountNo = $user_arr['bank_number'];//设置
            //姓名
            $accountName = $user_arr['bank_user'];//设置
            //身份证号码
            $idNumber = '';//用不上
            //银行名称
            $bankName = $user_arr['bank'];//设置
            //金额(分)

            if($info['amt']>$user_arr['money']){
                $this->ajaxError('余额不足');
            }
            $amt = $info['amt']*100;//前台取     单位分======================
            $api = new OutPayApi($accountNo, $accountName, $idNumber, $bankName, $amt);
            $r = $api -> payFast();
            if($r['code'] == -1){
                $this->ajaxError($r['msg']);//发送错误信息
            }else{
                //==============================信息审核已通过===================提现成功？？

                //存表
                $insert['user_id'] = $user_id;
                $insert['inputtime'] = time();
                $insert['amt'] = $info['amt'];
                $insert['accountNo'] = $accountNo;
                $insert['accountName'] = $accountName;
                $insert['bankName'] = $bankName;
                $insert['phone'] = $user_arr['phone'];//存电话号
                $insert['display'] = 1;

                $output->add($insert);//添加提现记录

                //=================================================
                $user->where(['id'=>$user_id])->setDec('money',$info['amt']);//减钱
                $this->ajaxSuccess($r['msy']);
                //$this->ajaxSuccess(111);


            }
        }else{
            $this->assign('user_arr',$user_arr);
            $page = I('get.page')?I('get.page'):1;
            $pagesize = I('get.pagesize')?I('get.pagesize'):10;
            $data = getlist('output',$page,$pagesize,['user_id'=>$user_id],['inputtime'=>'desc']);
            if($data['count']){
                foreach($data['list'] as $k=>$v){
                    $data['list'][$k]['inputtime']=date('Y-m-d H:i:s',$v['inputtime']);
                    $data['list'][$k]['bank_info'] = $v['bankname'].'/尾号'.substr ($v['accountno'], -4);
                }
            }
            $this->assign('list',$data['list']);
            $this->assign('page',$data['page']);

            $this->display('cash');

        }

    }

    //推荐人——二维码
    public function referee_erweima(){
        $user_id = $this->USER_INFO['id'];
	    $text = 'http://'.$_SERVER['SERVER_NAME'].':'.$_SERVER["SERVER_PORT"].'/#/register?referee_id='.$user_id;
	    //$text = 'http://192.168.1.126:8080/#/register?referee_id='.$user_id;
        $erweima=qrcode($text);
	}


	//我的推荐
	public function referee(){
	    $order_z = [];
	    $order = M('order');
	    $user_id = $this->USER_INFO['id'];

	    $url = 'http://'.$_SERVER['SERVER_NAME'].':'.$_SERVER["SERVER_PORT"].'/#/register?referee_id='.$user_id;
	    $user = M('user');
	    $count = $user->where(['referee_id'=>$user_id,])->count();//推荐人个数
        $page = I('post.page')?I('post.page'):1;
        $pagesize = I('post.pagesize')?I('post.pagesize'):10;
        $input = M('input');
        $where_y['type'] = ['in',['推荐用户注册，获得奖励','推荐用户持仓，获得佣金']];
        $where_y['user_id'] = $user_id;
        $yongjin = $input->field(['SUM(price)'])->where($where_y)->find();
        if(!$yongjin['sum(price)']){
            $yongjin = 0;
        }else{
            $yongjin = $yongjin['sum(price)'];
        }



        //算不算推荐注册====算
        $data = getlist('user',$page,$pagesize,['referee_id'=>$user_id],['inputtime'=>'desc'],['id','inputtime','phone']);
        $ids = [];
        if($data['count']){
            foreach($data['list'] as $k=>$v){//取id一维数组
                $ids[] = $v['id'];
                $data['list'][$k]['z_price'] = 0;
                $data['list'][$k]['inputtime'] = date('Y/m/d',$v['inputtime']);
                $data['list'][$k]['phone'] = onPhone($v['phone']);
            }

            $order_arr = $order->field(['user_id','d_price'])->where(['user_id'=>['in',$ids],'status_q'=>1])->select();//对应用户，持仓订单
            if($order_arr){
                foreach($order_arr as $k=>$v){
                    $order_z[$v['user_id']] += $v['d_price'];
                }
            }
            if($order_z){
                foreach($data['list'] as $k=>$v){
                    $data['list'][$k]['z_price'] = $order_z[$v['id']]?$order_z[$v['id']]:0;
                }
            }



        }

        $this->ajaxSuccess('数据获取成功',['list'=>$data['list'],'count'=>$data['count'],'maxpage'=>$data['maxpage'],'url'=>$url,'yongjin'=>$yongjin,'count_user'=>$count]);







    }

    //支出列表
    public function report(){
	    $type = I('post.type');
	    switch($type){
            case 'input':
                $mod = 'input';
                break;
            case 'output':
                $mod = 'output';
                break;
            default:
                $this->ajaxError('参数错误');
                break;
        }
        $user_id = $this->USER_INFO['id'];
        $page = I('post.page')?I('post.page'):1;
        $pagesize = I('post.pagesize')?I('post.pagesize'):10;
        $where['user_id'] = $user_id;
        $data = getlist($mod,$page,$pagesize,$where,$order = ['inputtime'=>'desc'],['inputtime','type','price','account']);
        if($data['count']){
            foreach($data['list'] as $k=>$v){
                if($mod == 'input'){
                    $data['list'][$k]['color'] = 1;//红色
                    $data['list'][$k]['price'] = $v['price'].'元';
                }else{
                    $data['list'][$k]['color'] = 2;//绿色
                    $data['list'][$k]['price'] = -$v['price'].'元';
                }
                $data['list'][$k]['inputtime'] = date('Y-m-d H:i:s',$v['inputtime']);
                $data['list'][$k]['account'] = $v['account'] == 1?'余额':'红包';
            }
        }

        $this->ajaxSuccess('数据获取成功',['list'=>$data['list'],'count'=>$data['count'],'maxpage'=>$data['maxpage']]);
    }

    //已结算列表
    public function settledList(){
        $user_id = $this->USER_INFO['id'];
        $order = M('order');
        $page = I('post.page')?I('post.page'):1;
        $pagesize = I('post.pagesize')?I('post.pagesize'):10;
        $data = getlist('order',$page,$pagesize,['user_id'=>$user_id,'status_q'=>2,'status_h'=>['IN',[1,2,4,5,6]]],['inputtime'=>'desc'],['id','name','gid','al_balance','ac_balance','inputtime','status_h']);
        if($data['count']){
            foreach($data['list'] as $k=>$v){
                $data['list'][$k]['inputtime'] = date('Y-m-d H:i:s',$v['inputtime']);
                $data['list'][$k]['ac_balance'] = $v['ac_balance']>0?$v['ac_balance']:0;
                $data['list'][$k]['zhuangtai'] = $v['status_h'] == 1?'结算中':'结算成功';
            }
        }
        $this->ajaxSuccess('数据获取成功',['list'=>$data['list'],'count'=>$data['count'],'maxpage'=>$data['maxpage']]);
    }

    //已结算具体信息
    public function settledInfo(){
	    $user_id = $this->USER_INFO['id'];
	    $order = M('order');
	    $order_id = I('post.order_id');
	    $info = $order->field(['id','name','gid','d_price','num','buy_price','buy_note','inputtime','sel_price','sel_note','updatetime','routine','day','delay_price','bond','ac_balance','j_bond','al_balance'])->where(['user_id'=>$user_id,'id'=>$order_id])->find();
        $info['delay_day'] = (($info['day'] - 2)>0)?$info['day']-2:0;//递延天数  一天不让买，其实不写也可以
        $info['delay_price_z'] = $info['d_price'] /10000 *$info['delay_day'] *$info['delay_price'];//总递延费
        $info['k_bond'] = $info['bond']-$info['j_bond'];
        $info['inputtime'] = date('Y-m-d H:i:s',$info['inputtime']);
        $info['updatetime'] = date('Y-m-d H:i:s',$info['updatetime']);
        if($info['al_balance']<0){
            $info['ac_balance'] = 0;//===========================
        }

        $this->ajaxSuccess('数据获取成功',$info);


    }


    //提现第一步
    public function cashFirst(){
	    $user = M('user');
        $user_id = $this->USER_INFO['id'];
        $user_arr = $user->field(['id','money','name','idcard','bank_info'])->where(['id'=>$user_id])->find();
        if(!$user_arr['name']){
            $this->ajaxError('请先进行身份认证',['bank_info'=>[]]);
        }
        $user_arr['bank_info'] = json_decode($user_arr['bank_info'],true);
        if(!$user_arr['bank_info']){
            $this->ajaxError('请先绑定银行卡',['bank_info'=>[]]);
        }
        foreach($user_arr['bank_info'] as $k=>$v){
            $user_arr['bank_info'][$k]['bank_number'] = bankcard($v['bank_number']);
        }
        $this->ajaxSuccess('获取数据成功',$user_arr);
    }


    //提现第二步
    public function cashSecond(){

	    $setting = M('setting')->field(['cash_day','cash_month','cash_charge','cash_key'])->where(['display'=>1])->find();
	    $user = M('user');
	    $user_id = $this->USER_INFO['id'];
	    $user_arr = $user->field(['id','money','name','idcard','bank_info','phone'])->where(['id'=>$user_id])->find();
        if(!$user_arr['name']){
            $this->ajaxError('请先进行身份认证');
        }
        $user_arr['bank_info'] = json_decode($user_arr['bank_info'],true);
        if(!$user_arr['bank_info']){
            $this->ajaxError('请先绑定银行卡');
        }
        $bank_info = [];
        foreach($user_arr['bank_info'] as $k=>$v){
            $bank_info[$v['id']] = $v;
        }
        $user_arr['bank_info'] = $bank_info;


        $bank_id = I('post.bank_id');//银行卡键
        $price = I('post.price');//提现金额
        if(!$bank_id){
            $this->ajaxError('参数错误');
        }
        if(!$user_arr['bank_info'][$bank_id]){
            $this->ajaxError('参数错误');
        }
        if(!$price){
            $this->ajaxError('请填写提现金额');
        }
        if(num_str($price,'price')){
            $this->ajaxError('请正确填写提现金额');
        }
        $cash = M('cash');
        $time_arr = gettime();
        $insert['charge'] = 0;


        //每天提现    限制============================================================================//
        $count = $cash->where(['user_id'=>$user_id,'status'=>2,'inputtime'=>['EGT',$time_arr['day']]])->count();
        $sum = $cash->field(['SUM(price)'])->where(['user_id'=>$user_id,'status'=>2,'inputtime'=>['EGT',$time_arr['month']]])->find();
        if(!$sum['sum(price)']){
            $sum = 0;
        }else{
            $sum = $sum['sum(price)'];
        }
        if($count >= $setting['cash_day']){//大于每天，收手续费
            $insert['charge'] = $price * ($setting['cash_charge']/1000);
        }elseif(($sum['sum(price)'] + $price)>$setting['cash_month']){//每月提现限制===============================//
            $insert['charge'] = ($sum + $price - $setting['cash_month'])*$setting['cash_charge']/1000;
        }
        $insert['price'] = $price;
        $insert['ac_price'] = $insert['price'] +$insert['charge'];

        if($user_arr['money'] <$insert['ac_price']){
            $this->ajaxError('余额不足,需'.$insert['ac_price'].'元');
        }


        $insert['inputtime'] = time();
        $insert['display'] = 1;

        $insert['bank_user'] = $user_arr['name'];
        $insert['idcard'] = $user_arr['idcard'];
        $insert['bank_name'] = $user_arr['bank_info'][$bank_id]['bank_name'];
        $insert['bank_number'] = $user_arr['bank_info'][$bank_id]['bank_number'];
        $insert['phone'] = $user_arr['phone'];
        $insert['user_id'] = $user_id;
        $insert['type'] = $setting['cash_key'];
        $insert['status'] = 1;//申请中

        if($insert['type'] ==2 ){//走银行卡接口
            //============================================================================================//


            //接口预留






            //============================================================================================//

        }







        M()->startTrans();
        if($setting['cash_key'] == 1 ){//线下
            $r['list_id'] = $cash->add($insert);//加记录
            $insert_report['user_id'] = $user_id;
            $insert_report['display'] = 1;
            $insert_report['inputtime'] =  $insert['inputtime'];
            $insert_report['list_id'] = $r['list_id'];
            $insert_report['type'] = 3;
            $r[] = M('report')->add($insert_report);
            $r[] = $user->where(['id'=>$user_id])->setDec('money',$insert['ac_price']);//加钱
        }
        if(in_array(false,$r)){
            M()->rollback();

            $this->ajaxError('提现失败');
        }else{
            M()->commit();
            $this->ajaxSuccess('提现成功');
        }





    }



    //提现列表
    public function cashList(){
	    $user_id = $this->USER_INFO['id'];
        $page = I('post.page')?I('post.page'):1;
        $pagesize = I('post.pagesize')?I('post.pagesize'):10;
        $data = getlist('cash',$page,$pagesize,['display'=>1,'user_id'=>$user_id], ['inputtime'=>'desc'],['id','inputtime','status','price','ac_price','charge']);
        if($data['count']){
            foreach($data['list'] as $k=>$v){
                $data['list'][$k]['color'] = 2;//绿色
                switch($v['status']){
                    case 1:
                        $data['list'][$k]['type'] = '提现到银行卡——申请中';
                        break;
                    case 2:
                        $data['list'][$k]['type'] = '提现到银行卡——已通过';
                        break;
                    case 3:
                        $data['list'][$k]['type'] = '提现到银行卡——已驳回';
                        break;
                }
                $data['list'][$k]['inputtime'] = date('Y-m-d H:i:s',$v['inputtime']);
                $data['list'][$k]['price'] = -$v['price'].'元'.($v['charge']==0?'':-$v['charge'].'元');


            }
        }

        $this->ajaxSuccess('数据获取成功',['list'=>$data['list'],'maxpage'=>$data['maxpage'],'count'=>$data['count']]);

    }


    //充值支付宝
    public function deposit_bao(){
	    $user = M('user');
	    $user_id = $this->USER_INFO['id'];
	    $user_arr = $user->field(['id','name','idcard','bank_info','phone'])->where(['id'=>$user_id])->find();
	    $bao = I('post.bao');//支付宝账户
        if(!$bao){
            $this->ajaxError('请输入支付宝账户');
        }
        if(!$user_arr['name']){
            $this->ajaxError('请先进行实名认证');
        }

        $insert['inputtime'] = time();
        $insert['display'] = 1;
        $insert['user_id'] = $user_id;
        $insert['phone'] = $user_arr['phone'];
        $insert['bao'] = $bao;
        $insert['status'] = 1;
        $insert['type'] = 3;//支付宝
        $insert['bank_user'] = $user_arr['name'];

        M()->startTrans();
        $r['deposit'] = M('deposit')->add($insert);
        $r[] = D('Report')->add($r['deposit'],$insert['inputtime'],4,$user_id);


        if(in_array(false,$r)){
            M()->rollback();
            $this->ajaxError('充值失败');
        }else{
            M()->commit();
            $this->ajaxSuccess('充值成功,等待管理员确认');
        }
	}


	//银行卡充值
	public function deposit_bank(){
	    $bank_info = [];
        $setting = M('setting')->field(['cash_key','deposit_day','deposit_month'])->where(['display'=>1])->find();
        $user = M('user');
        $user_id = $this->USER_INFO['id'];
        $user_arr = $user->field(['id','name','idcard','bank_info','phone'])->where(['id'=>$user_id])->find();
        $user_arr['bank_info'] = json_decode($user_arr['bank_info'],true);
        foreach($user_arr['bank_info'] as $k=>$v){
            $bank_info[$v['id']] = $v;
        }
        $user_arr['bank_info'] = $bank_info;
        $bank_id = I('post.bank_id');
        $price = I('post.price');
        if(!$bank_id){
            $this->ajaxError('参数错误');
        }
        if(!$user_arr['name']){
            $this->ajaxError('请先进行实名认证');
        }
        if(!$user_arr['bank_info']){
            $this->ajaxError('请先绑定银行卡');
        }
        if(!$user_arr['bank_info'][$bank_id]){
            $this->ajaxError('参数错误');
        }

        if(!$price){
            $this->ajaxError('请填写充值金额');
        }
        if(num_str($price,'price')){
            $this->ajaxError('请正确填写充值金额');
        }





        $insert['inputtime'] = time();
        $insert['display'] = 1;
        $insert['user_id'] = $user_id;
        $insert['phone'] = $user_arr['phone'];
        $insert['status'] = 1;
        $insert['type'] = $setting['cash_key'];//线上，线下
        $insert['bank_user'] = $user_arr['name'];
        $insert['idcard'] = $user_arr['idcard'];
        $insert['bank_name'] = $user_arr['bank_info'][$bank_id]['bank_name'];
        $insert['bank_number'] = $user_arr['bank_info'][$bank_id]['bank_number'];
        $insert['price'] = $price;

        //充值判断=========================================================================================
        if($insert['price'] >$setting['deposit_day']){//单卡单笔
            $this->ajaxError('单卡单笔充值金额达到上限');
        }
        list($year,$month,$day) = explode('-',date('Y-m-d',time()));
        $today = mktime($hour = null, $minute = null, $second = null, $month, $day, $year);
        $to_month = mktime($hour = null, $minute = null, $second = null, $month, 1, $year);
        $count_day = M('deposit')->field(['SUM(price)'])->where(['display'=>1,'inputtime'=>['EGT',$today],'status'=>2])->find();
        $count_month = M('deposit')->field(['SUM(price)'])->where(['display'=>1,'inputtime'=>['EGT',$to_month],'status'=>2])->find();
        if(!$count_day['sum(price)']){
            $count_day = $setting['deposit_day'] -  0;
        }else{
            $count_day = $setting['deposit_day'] - $count_day['sum(price)'];
        }
        if(!$count_month['sum(price)']){
            $count_month = $setting['deposit_month'] - 0;
        }else{
            $count_month = $setting['deposit_month'] - $count_month['sum(price)'];
        }
        if($insert['price']>$count_day){//每日
            $this->ajaxError('每日充值金额达到上限');
        }
        if($insert['price']>$count_month){//每月
            $this->ajaxError('每月充值金额达到上限');
        }


        if($insert['type'] == 2){
            //=============================================================================================
            //线上接口




            //==============================================================================================
        }

        M()->startTrans();
        $r['deposit'] = M('deposit')->add($insert);
        $r[] = D('Report')->add($r['deposit'],$insert['inputtime'],4,$user_id);


        if(in_array(false,$r)){
            M()->rollback();
            $this->ajaxError('充值失败');
        }else{
            M()->commit();
            $this->ajaxSuccess('充值成功,等待管理员确认');
        }
    }

    //充值列表
    public function deposit_list(){
        $user_id = $this->USER_INFO['id'];
        $page = I('post.page')?I('post.page'):1;
        $pagesize = I('post.pagesize')?I('post.pagesize'):10;
        $data = getlist('deposit',$page,$pagesize,['display'=>1,'user_id'=>$user_id], ['inputtime'=>'desc'],['id','inputtime','status','price','type']);

        if($data['count']){
            foreach($data['list'] as $k=>$v){
                $data['list'][$k]['color'] = 1;//红色
                switch($v['status']){
                    case 1:
                        switch($v['type']){
                            case 1:
                                $data['list'][$k]['type'] = '线下充值——申请中';
                                break;
                            case 2:
                                $data['list'][$k]['type'] = '线上充值——申请中';
                                break;
                            case 3:
                                $data['list'][$k]['type'] = '支付宝充值——申请中';
                                break;
                        }

                        break;
                    case 2:
                        switch($v['type']){
                            case 1:
                                $data['list'][$k]['type'] = '线下充值——已通过';
                                break;
                            case 2:
                                $data['list'][$k]['type'] = '线上充值——已通过';
                                break;
                            case 3:
                                $data['list'][$k]['type'] = '支付宝充值——已通过';
                                break;
                        }
                        break;
                    case 3:
                        switch($v['type']){
                            case 1:
                                $data['list'][$k]['type'] = '线下充值——已驳回';
                                break;
                            case 2:
                                $data['list'][$k]['type'] = '线上充值——已驳回';
                                break;
                            case 3:
                                $data['list'][$k]['type'] = '支付宝充值——已驳回';
                                break;
                        }
                        break;
                }
                $data['list'][$k]['inputtime'] = date('Y-m-d H:i:s',$v['inputtime']);
                $data['list'][$k]['price'] = $v['price']?$v['price'].'元':'';

            }
        }

        $this->ajaxSuccess('数据获取成功',['list'=>$data['list'],'maxpage'=>$data['maxpage'],'count'=>$data['count']]);
    }

    //全部列表
    public function all_list(){
	    $input_arr = [];
	    $output_arr = [];
	    $cash_arr = [];
	    $deposit_arr = [];
	    $list_list = [];
        $user_id = $this->USER_INFO['id'];
        $page = I('post.page')?I('post.page'):1;
        $pagesize = I('post.pagesize')?I('post.pagesize'):10;
        $data = getlist('report',$page,$pagesize,['display'=>1,'user_id'=>$user_id], ['inputtime'=>'desc'],['id','list_id','type']);

        if($data['count']){
            foreach ($data['list'] as $k=>$v){
                $list_list[$v['type']][] = $v['list_id'];
            }


            if($list_list[1]){
                $input = M('output')->where(['id'=>['IN',$list_list[1]]])->select();
                foreach($input as $k=>$v){
                    $input_arr[$k]['type'] =  $v['type'];
                    $input_arr[$k]['price'] = -$v['price'].'元';
                    $input_arr[$k]['inputtime'] = $v['inputtime'];
                    $inputtime[] = $v['inputtime'];
                    $input_arr[$k]['account'] = $v['account'] == 1?'余额':'红包';
                    $input_arr[$k]['color'] = 2;//红色
                }
            }


            if($list_list[2]){
                $output = M('input')->where(['id'=>['IN',$list_list[2]]])->select();
                foreach($output as $k=>$v){
                    $output_arr[$k]['type'] =  $v['type'];
                    $output_arr[$k]['price'] = $v['price'].'元';
                    $output_arr[$k]['inputtime'] = $v['inputtime'];
                    $inputtime[] = $v['inputtime'];
                    $output_arr[$k]['account'] = $v['account'] == 1?'余额':'红包';
                    $output_arr[$k]['color'] = 1;//绿色
                }
            }

            if($list_list[3]){
                $cash = M('cash')->where(['id'=>['IN',$list_list[3]]])->select();
                foreach($cash as $k=>$v){
                    switch($v['status']){
                        case 1:
                            $cash_arr[$k]['type'] = '提现到银行卡——申请中';
                            break;
                        case 2:
                            $cash_arr[$k]['type'] = '提现到银行卡——已通过';
                            break;
                        case 3:
                            $cash_arr[$k]['type'] = '提现到银行卡——已驳回';
                            break;
                    }

                    $cash_arr[$k]['price'] = -$v['price'].'元'.($v['charge']==0?'':-$v['charge']."元");
                    $cash_arr[$k]['inputtime'] = $v['inputtime'];
                    $cash_arr[$k]['color'] = 2;//绿色
                    $inputtime[] = $v['inputtime'];
                    $cash_arr[$k]['account'] ='';

                }


            }
            if($list_list[4]){
                $deposit = M('deposit')->where(['id'=>['IN',$list_list[4]]])->select();
                foreach($deposit as $k=>$v){
                    $deposit_arr[$k]['color'] = 1;//红色
                    switch($v['status']){
                        case 1:
                            switch($v['type']){
                                case 1:
                                    $deposit_arr[$k]['type'] = '线下充值——申请中';
                                    break;
                                case 2:
                                    $deposit_arr[$k]['type'] = '线上充值——申请中';
                                    break;
                                case 3:
                                    $deposit_arr[$k]['type'] = '支付宝充值——申请中';
                                    break;
                            }

                            break;
                        case 2:
                            switch($v['type']){
                                case 1:
                                    $deposit_arr[$k]['type'] = '线下充值——已通过';
                                    break;
                                case 2:
                                    $deposit_arr[$k]['type'] = '线上充值——已通过';
                                    break;
                                case 3:
                                    $deposit_arr[$k]['type'] = '支付宝充值——已通过';
                                    break;
                            }
                            break;
                        case 3:
                            switch($v['type']){
                                case 1:
                                    $deposit_arr[$k]['type'] = '线下充值——已驳回';
                                    break;
                                case 2:
                                    $deposit_arr[$k]['type'] = '线上充值——已驳回';
                                    break;
                                case 3:
                                    $deposit_arr[$k]['type'] = '支付宝充值——已驳回';
                                    break;
                            }
                            break;
                    }
                    $deposit_arr[$k]['price'] = $v['price']?$v['price'].'元':'';
                    $deposit_arr[$k]['inputtime'] = $v['inputtime'];
                    $inputtime[] = $v['inputtime'];
                    $deposit_arr[$k]['account'] ='';
                }


            }

            $arr = array_merge($input_arr,$output_arr,$cash_arr,$deposit_arr);
            array_multisort($inputtime,SORT_DESC,$arr);
            foreach($arr as $k=>$v){
                $arr[$k]['inputtime'] = date('Y-m-d H:i:s',$v['inputtime']);
            }

        }
        if(!$arr){
            $arr = [];
        }
        $this->ajaxSuccess('获取数据成功',['list'=>$arr,'count'=>$data['count'],'maxpage'=>$data['maxpage']]);



    }


    public function nickname(){
        $user_id = $this->USER_INFO['id'];
	    $nickname = I('nickname');
	    $r = M('user')->where(['id'=>$user_id])->save(['nickname'=>$nickname]);
	    if($r){
	        $this->ajaxSuccess('修改成功');
        }else{
	        $this->ajaxError('修改失败');
        }
    }
}