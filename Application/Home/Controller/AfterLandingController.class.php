<?php
namespace Home\Controller;

use Think\Controller;
use Home\Model\IndexDao;
use Common\Controller\CommonController;

class AfterLandingController extends HomeController
{

    protected $USER_INFO;

    public function __construct()
    {
        parent::__construct();
    }
    //检查是否登陆，未登陆跳转，登陆取出用户信息。
    protected function checkInLogin()
    {
        $r = $this->checkLogin();
        if (! $r) {
           $this->ajaxError('请先登陆');
        } else {

            $this->USER_INFO = $r;//将缓存里的存入变量
        }
    }

    protected function userId(){
        $r = $this->checkLogin();
        if(!$r){
            return false;  //未登陆
        }else{
            return $r['id'];//返回用户id
        }
    }

}