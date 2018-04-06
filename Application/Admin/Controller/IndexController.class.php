<?php
namespace Admin\Controller;

class IndexController extends AdminBaseController {
    public function index()
    {
        $user_info = session('user_info');
        /* @var $admin_auth_group_access_model \Admin\Model\AdminAuthGroupAccessModel */
        $admin_auth_group_access_model = D('AdminAuthGroupAccess');
        $menus = $admin_auth_group_access_model->getUserRules($user_info['id']);
        
        $this->assign('menus', $menus);
        $this->display();
    }
    
    public function nav()
    {
        $this->display();
    } 
    public function login()
    {
       $this->display();
    }
    
    public function form()
    {
        $this->display();
    }
    
    
    public function table()
    {
       $this->display();
       
    }
    
    public function main()
    {
        $this->display();
    }
 
    //验证码
    public function verify(){
        $Verify = new \Think\Verify();   
        $Verify->codeSet = '0123456789';// 设置验证码字符为纯数字   
        $Verify->length = 4;
        $Verify->imageH = 37;
        $Verify->imageW = 120;
        $Verify->fontSize = 18;
        $Verify->useNoise = true;
        $Verify->useCurve = true;
        $Verify->fontttf = "5.ttf";
        $Verify->bg = array(196,223,246);    
        $Verify->entry();    
    }
    
    //检测最新订单
    public function getNewOrders(){
    	$info = M('Orders')->field('id,order_no')->where(array('foreach_status'=>0))->select();
    	foreach($info as $k=>$v){
    		M('Orders')->where(array('id'=>$v['id']))->setField('foreach_status',1);
    	}
    	if(empty($info)){
    		$data['status'] = -1;
    		$this->ajaxReturn($data);
    	}else{
    		$data['status'] = 1;
    		$data['order_no'] = $info[0]['order_no'];
    		$data['href'] = U('Orders/ordersList',['id'=>$info[0]['id'],'order_no'=>$info[0]['order_no']]);
    		$this->ajaxReturn($data);
    	}
    }
    
   public function uploadAllImg()
    {
    	$r = $this->uploadOne();
    	$this->ajaxReturn($r);
    } 
}