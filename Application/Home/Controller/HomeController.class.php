<?php
namespace Home\Controller;
use Think\Controller;
use Home\Model\IndexDao;
use Common\Controller\CommonController;
use Home\Logic\CurrencyLogic;
class HomeController extends CommonController {
	
	protected $WEB_CONFIG;
	
// 	protected $USER_INFO;
	public function __construct()
	{
	    header("Content-type: text/html; charset=utf-8");
		parent::__construct();
		$this->WEB_CONFIG = $this->getConfig();
	}
	
	//获取配置项，并存入缓存
    private function getConfig()
    {
        if(S('WEB_CONFIG')){
            return S('WEB_CONFIG');
        }
        $config = M('Config')->select();
        foreach ($config as $k => $v) {
            $config[$v['key']] = $v['value'];
        }
        S('WEB_CONFIG',$config);
        return $config;
    }

    
    //用户登陆记录
    protected function setUserLog($uid,$content){
        $data = [
            'uid' => $uid,
            'ip'  => get_client_ip(),
            'content' => $content,
            'add_time' => time()
        ];
        M('Users_log')->add($data);
    }
    
   //检查用户是否登陆
    protected function checkLogin(){
        if(!session('USER_INFO')){
            return false ;
        }
        return session('USER_INFO');
    }
    
    
    /**
     * 生成验证码
     */
    public function verify()
    {
        $verify = new \Think\Verify();
        $verify->length   = 4;
        $verify->codeSet = '0123456789';
        $verify->fontttf = '5.ttf';
        $verify->imageW = 130;
        $verify->imageH = 37;
        $verify->fontSize = 16;
        $verify->bg = array(220,220,220);
        $verify->entry();

    }
    
}