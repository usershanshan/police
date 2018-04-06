<?php
namespace Home\Controller;
use Home\Logic\SendCodeLogic;
class LoginController extends HomeController {
    private $SendCode_Login;
	public function __construct()
	{
		parent::__construct();
        $this->SendCode_Login = new SendCodeLogic(C('PHONE_USER'),C('PHONE_PASS'),C('PHONE_SEND_NAME'));
	}
	
	
/**
     * 登录操作  V
     */
    public function doLogin()
    {
        $strName = I('phone');//手机号
        $pwd = I('password');//密码

        if(!$strName){
            $this->ajaxError('请输入手机号！');
        }
        if(num_str($strName,'phone')){
            $this->ajaxError('请输入正确的手机号!');
        }
        if(!$pwd){
            $this->ajaxError('请输入密码！');
        }
        $where['phone'] = $strName;
        $where['password']=md5($pwd);

        $user_info=M('User')->where($where)->find();
        if(!$user_info){
            $this->ajaxError('用户名或密码不正确，请重新输入！');
        }
        if($user_info['display'] == 0){
            $this->ajaxError('当前用户已被禁用');
        }
        $this->setUserLog($user_info['id'], '用户登录');//写日志
        session('USER_INFO', $user_info);//存session
        $this->USER_INFO = $user_info;//赋值
        $this->ajaxSuccess('登录成功！');


    }
	 /**
     * 退出登录
     */
    public function logout()
    {
        session_unset();
        session_destroy();
        $this->USER_INFO=[];
        $this->ajaxSuccess('退出成功');
    }

    //找回密码  V
    public function password(){

        $phone = I('post.phone');//手机号
        $newPass = I('post.password');//密码
        $newPass1 = I('post.password1');//确认密码
        $captcha = I('post.verify');//手机验证码
        if(empty($phone)){
            $this->ajaxError('请填写手机号');
        }
        if(num_str($phone,'phone')){
            $this->ajaxError('请输入正确的手机号!');
        }
        if(empty($newPass)){
            $this->ajaxError('请填写新密码');
        }
        if(empty($newPass1)){
            $this->ajaxError('请输入确认密码');
        }
        if(!regex($newPass,'password')){
            $this->ajaxError('请输入正确密码');
        }
        if($newPass !=$newPass1){
            $this->ajaxError('两次密码输入不一致');
        }
        if(!$captcha){
            $this->ajaxError('请输入手机验证码！');
        }
        $user =  M('User')->where(['phone'=>$phone,'display'=>1])->find();//未被禁用的
        if(!$user){
            $this->ajaxError('该用户不存在或已禁用');
        }

        //验证手机验证码
        $check_code =  $this->SendCode_Login->checkHuaXinPhoneCode($phone, $captcha,  C('PHONE_RESET_PWD_NAME'));
        if(!$check_code){
            $this->ajaxError('您输入的手机验证码有误请重新输入');
        }


        if($user['password'] == md5($newPass)){
            $this->ajaxError('您新的密码不可和原密码一致');
        }
        $r = M('User')->where(['phone'=>$phone])->save(['password'=>md5($newPass)]);
        if(!$r){
            $this->ajaxError('服务器繁忙,请稍后重试');
        }
        $this->setUserLog($user['id'], '修改密码');
        $this->ajaxSuccess('修改密码成功');


    }

    /**
     * 发送短信验证码====找回密码  V
     * @author		JiangPeng <867633862@qq.com>
     * @version		v1.0.0
     * @copyright	2017-3-17 下午2:46:21
     */
    public function updatePasswordSend(){
        if(IS_POST){
            $phone = I('post.phone');//手机号
            $captcha = I('post.verify');//验证码
            if(empty($phone)){
                $this->ajaxError('请输入手机号码');
            }
            if(num_str($phone,'phone')){
                $this->ajaxError('请填写正确的电话号码');
            }
            if(!$captcha){
                $this->ajaxError('请填写验证码');
            }
            $u = M('User')->where(['phone'=>$phone,'display'=>1])->find();
            if(!$u){
                $this->ajaxError('用户不存在或已被禁用');
            }
            $verify = new \Think\Verify();//验证码
            if(!$verify->check($captcha, '')){
                $this->ajaxError('验证码不正确，请重新输入！');
            }
            $result = $this->SendCode_Login->sandHuaXinCode($u['phone'],C('PHONE_RESET_PWD_NAME'),C('PHONE_RESET_PWD_MSG'));//给第一次提交上的手机号发送信息
            if(!$result){
                $this->ajaxError('发送失败');
            }
            $this->ajaxSuccess('发送成功');
        }
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

        //==============成功还调用么？？？
        $info = I('post.');
        $user = M('user');
        $input = M('input');
        $arr = $input->where(['out_trade_no'=>$info['out_trade_no']])->find();
        if($arr['totalFee'] *100 == $info['totalFee'] ){
            if($info['order_status'] == 3 && $arr['status'] == 3){
                echo 'SUCCESS';
            }elseif($info['order_status'] == 3 && $arr['status'] !=3){
                $input->where(['out_trade_no'=>$info['out_trade_no']])->save(['status'=>3]);//修改状态
                $user->where(['id'=>$arr['user_id']])->setInc('money',$arr['totalFee']);
                echo 'SUCCESS';
            }
        }
    }
}