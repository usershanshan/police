<?php
namespace Home\Controller;
use Home\Logic\SendCodeLogic;
use Home\Model;
class RegController extends HomeController {
    
    private $SendCode_Login;
    private $PHONE_REG_NAME;
    private $PHONE_REG_MSG;
    
	public function __construct()
	{
		parent::__construct();
		$this->SendCode_Login = new SendCodeLogic(C('PHONE_USER'),C('PHONE_PASS'),C('PHONE_SEND_NAME'));
		$this->PHONE_REG_NAME = C('PHONE_REG_NAME');
		$this->PHONE_REG_MSG  = C('PHONE_REG_MSG');
	}
	
	//注册、
	public function reg_up()
	{
        $phone = I('post.phone');
        $password = I('post.password');
        $password1 = I('post.password1');
        $referee_id = I('post.referee_id')?I('post.referee_id'):0;//推荐人
        $moble_verify = I('moble_verify');//手机验证码
        $setting = M('setting')->field(['new_key','new_value'])->where(['display'=>1])->find();
        if (empty($phone)) {
            $this->ajaxError('电话号码不能为空！');
        }
        if (!regex($phone,'phone')) {
            $this->ajaxError('请输入正确的电话号码！');
        }
        if (empty($moble_verify)) {
            $this->ajaxError('请输入手机验证码！');
        }
        // 密码不能为空
        if (empty($password)) {
            $this->ajaxError('密码不能为空');
        }
        if(empty($password1)){
            $this->ajaxError('确认密码不能为空');
        }
        // 正则判断密码格式
        if (! regex($password, 'password')) {
            $this->ajaxError('密码必须由6-18位字母和数字组成');
        }
        if($password != $password1){
            $this->ajaxError('两次密码不相同');
        }
        $check_code =  $this->SendCode_Login->checkHuaXinPhoneCode($phone, $moble_verify, $this->PHONE_REG_NAME);
        if(!$check_code){
            $this->ajaxError('您输入的手机验证码有误请重新输入');
        }
        $user_arr = M('user')->where(['phone'=>$phone])->find();
        if($user_arr){
            $this->ajaxError('该手机号已被注册');
        }


        $data['inputtime'] = time();
        $data['display'] = 1;
        $data['phone'] = $phone;
        $data['password'] = md5($password);
        $data['referee_id'] = $referee_id;
        $data['mark'] = 1;//新手光环
        M()->startTrans();//事务开始
        $user_id = $r[] = M('User')->add($data);
        if($data['referee_id'] && $setting['new_key']){
            $referee_arr = M('user')->field(['id','phone'])->where(['id'=>$referee_id,'display'=>1])->find();
            if($referee_arr){
                $res =  D('Input')->addInput($data['referee_id'],1,$setting['new_value'],'money',$referee_arr['phone']);//分钱
                $r = array_merge($r,$res);
            }

        }

        if(in_array(false,$r)){
            M()->rollback();
            $this->ajaxError('抱歉,服务器繁忙,请稍后重试');
        }
        M()->commit();
        $this->setUserLog($user_id, '用户注册');
        $this->ajaxSuccess('注册成功');

	}
	

	
    /**
     * 发送短信验证码
     * @author		JiangPeng <867633862@qq.com>
     * @version		v1.0.0
     * @copyright	2017-3-17 下午2:46:21
    */
    public function sendRegPhoneCode(){
    	if(IS_POST){
    		$phone = I('post.phone');//电话
            $captcha = I('post.verify');//验证码

        	if(empty($phone)){
    	        $this->ajaxError('请输入手机号码');
    	    }
    	    if(num_str($phone,'phone')){
    	        $this->ajaxError('请填写正确的电话号码');
    	    }
    	    $u = M('User')->where(['phone'=>$phone])->getField('id');
    	    if($u){
    	        $this->ajaxError('当前手机号码已被注册');
    	    }
            $verify = new \Think\Verify();//验证码
            if(!$verify->check($captcha, '')){
                $this->ajaxError('验证码不正确，请重新输入！');
            }
    		$result = $this->SendCode_Login->sandHuaXinCode($phone,$this->PHONE_REG_NAME,$this->PHONE_REG_MSG);
    		if(!$result){
    		    $this->ajaxError('发送失败');
    		}
    		$this->ajaxSuccess('发送成功');
    	}
    } 
    

	
}