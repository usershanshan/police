<?php
namespace Home\Controller;
use Home\Api\InPayApi;
use Home\Api\OutPayApi;
class PayController extends HomeController {
    
    
    public function payFast(){
        //TODO 数据前台传入后台加入判断条件,下方为模拟数据
        //卡号
        $accoutNo = '6222021001107455229';
        //手机号码
        $mobile = '15900831111';
        //姓名
        $accountName = '阿比石西';
        //身份证号码
        $idNumber = '513436198201081626';
        //银行名称
        $bankName = '工商银行';
        //金额(分)
        $totalFee = '300';
        $Pay = new InPayApi($accoutNo,$mobile,$accountName, $idNumber,$bankName,$totalFee);
        //发送短信验证码
        $result = $Pay->payFast();
        if($result['status'] != 'success'){
            //保存短信验证码
            $this->ajaxError($result['msg']);
        }
        session('SEND_'.$mobile.'_PAY_CODE',$result['data']) ;
        $this->ajaxSuccess($result['msg'],$result['data']);
    }
    
    public function tradePau(){
        //TODO 数据前台传入后台加入判断条件,下方为模拟数据
        //卡号
        $accoutNo = '6222021001107455229';
        //手机号码
        $mobile = '15900831111';
        //姓名
        $accountName = '阿比石西';
        //身份证号码
        $idNumber = '513436198201081626';
        //银行名称
        $bankName = '工商银行';
        //金额(分)
        $totalFee = '300';
        //短信验证码
        $code = '564146';
        //执行payFast方法时存入(TODO 自行判断是否存在如不存在弹出)
        $signSn = session('SEND_'.$mobile.'_PAY_CODE');
        $Pay = new InPayApi($accoutNo,$mobile,$accountName, $idNumber,$bankName,$totalFee);
        //发送短信验证码
        $result = $Pay->tradePay($signSn,$code);
        if($result['status'] != 'success'){
            //保存短信验证码
            $this->ajaxError($result['msg']);
        }
        //TODO  根据返回信息以及当前信息存入数据库
        
        session('SEND_'.$mobile.'_PAY_CODE',null);
        $this->ajaxSuccess($result['msg'],$result['data']);
    }
    
    /**
    * 回调地址(放入登录控制器之前,无需认证也可访问的方法)
    * @date: 2018年1月12日
    * @author: [姜鹏]867633862@qq.com
    * @return:
    */
    public function notify(){
//         trade_no=20170511138748353&trade_type=80103&time_start=20170525020002&
//         pay_time=&goods_name=快捷支付&goods_detail=&fee_type=CNY&orig_trade_no=
//         &mchid=138886&src_code=123456abcdef&total_fee=1200&out_mchid=&cancel=1
//         &order_status=3&sign=07C492064C3A5B0E9CE4D7F1B7CBA184&time_expire=2017
//         0511190738&out_trade_no=121231&order_type=1
        //TODO 返回参数
        //对照 total_fee 
        //对照数据库内out_trade_no 和接口内的 out_trade_no
        //修改状态加钱 echo SUCCESS 否则不处理
    }
    
   
    public function outPay(){
        //TODO 数据前台传入后台加入判断条件,下方为模拟数据
        //卡号
        $accoutNo = '6222021001107455229';
        //手机号码
        $mobile = '15900831111';
        //姓名
        $accountName = '阿比石西';
        //身份证号码
        $idNumber = '513436198201081626';
        //银行名称
        $bankName = '工商银行';
        //金额(分)
        $amt = '100';
        $api = new OutPayApi($accoutNo, $accountName, $idNumber, $bankName, $amt);
        $api -> payFast();
    }
    
    
}