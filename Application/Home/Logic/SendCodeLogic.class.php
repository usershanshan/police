<?php
namespace Home\Logic;
/**
 * 短信
 * @author Administrator
 *
 */
class SendCodeLogic
{  
	protected  $user;
	protected  $password;
	protected  $sandName;
	private    $HUAXIN_URL = "http://dx.ipyy.net/smsJson.aspx";
	
	public function __construct($user,$password,$sandName)
	{
		$this->user 	= $user;
		$this->password = $password;
		$this->sandName = $sandName;
	}
	
	/**
	 * 发送短信(华信)
	 */
	public function sandHuaXinCode($phone,$code_name,$get_content){
		$smsapi = $this->HUAXIN_URL;
		$pass = md5($pass);
		$time=session('time'.$code_name.$phone);
// 		if (time()-$time<60&&!empty($time)){
// 			return false;
// 		}
		$code=rand(1000, 9999);
		session('code'.$code_name.$phone,$code);
		session('time'.$code_name.$phone,time(),1800);
		$content="【".$this->sandName."】您的验证码为".$code.','.date('Y-m-d').'申请用于'.$this->sandName.$get_content.'，30分钟内有效，请勿告诉他人';
		$sendurl = $smsapi.'?action=send&userid=&account='.$this->user.'&password='.$this->password.'&mobile='.$phone.'&content='.$content.'&sendTime=&extno=';
		$result =file_get_contents($sendurl) ;
//		dump($result);
//		die;
		$result = json_decode($result);
		if($result->successCounts){
			return true;
		}
		return false;
	}
	/**
	 * 华信验证短信
	 */
	public function checkHuaXinPhoneCode($phone,$code,$code_name){
		if(session('code'.$code_name.$phone) == $code){
			session('code'.$code_name.$phone,null);//检测一次就清零
			return true;
		}
		return false;
	}


    public function sandHuaXinCode1($phone,$get_content){
        $smsapi = $this->HUAXIN_URL;
        $content="【".$this->sandName."】".$get_content;
        $sendurl = $smsapi.'?action=send&userid=&account='.$this->user.'&password='.$this->password.'&mobile='.$phone.'&content='.$content.'&sendTime=&extno=';
        $result =file_get_contents($sendurl) ;

        $result = json_decode($result);
        if($result->successCounts){
            return true;
        }
        return false;
    }
}

