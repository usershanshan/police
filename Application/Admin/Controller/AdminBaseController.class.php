<?php
namespace Admin\Controller;
use Think\Controller;
use Think\Auth;
use Common\Controller\CommonController;

class AdminBaseController extends CommonController {
    
    
    /**
     * 构造函数
     */
    public function __construct()
    {
        parent::__construct();
        $user_info = session('user_info');
        if(!$user_info['id']){
            $this->redirect('Login/login');
        } 
            $name = CONTROLLER_NAME . '/' . ACTION_NAME;
            if(CONTROLLER_NAME != 'Index'){
            
            $auth = new Auth();
            $auth_result = $auth->check($name, $user_info['id']);
            
            if($auth_result === false){
                if(IS_AJAX){
                    $this->ajaxError('没有权限!');
                }else{
                    $this->error('没有权限!');
                }
                
            } 
        } 
    }
    /**
     * @description:错误返回
     * @param string $msg
     * @param unknown $fields
     */
    protected function ajaxError($msg='', $fields=array())
    {
        header('Content-Type:application/json; charset=utf-8');
        $data = array('status'=>'error', 'msg'=>$msg, 'fields'=>$fields);
        echo json_encode($data);
        exit;
    }
    
    protected function ajaxSuccess($msg, $_data=array())
    {
        header('Content-Type:application/json; charset=utf-8');
        $data = array('status'=>'success', 'msg' => $msg ,'data'=>$_data);
        echo json_encode($data);
        exit;
    }
    protected function uploadOne()
    {
    	$upload = new \Think\Upload(); // 实例化上传类
    	$upload->maxSize = 3145728; // 设置附件上传大小
    	$upload->exts = array(
    			'jpg',
    			'gif',
    			'png',
    			'jpeg'
    	); // 设置附件上传类型
    	// $upload->mimes = array('jpg', 'gif', 'png', 'jpeg');// 设置附件上传类型
    	$upload->rootPath = './Uploads/'; // 设置附件上传根目录
    	$upload->saveName = 'up_img'. '_' . time() . '_' . rand(100000, 999999);
    	// 上传单个文件
    	$info = $upload->uploadOne($_FILES['file']);
    	if (! $info) { // 上传错误提示错误信息
    		return ['code'=>-1,'msg'=>$upload->getError(),'data'=>['src'=>'']];
    		//return ['status'=>'error','msg'=>$upload->getError()];
    	} else { // 上传成功 获取上传文件信息
    		$file_name = '/Uploads/' . $info['savepath'] . $info['savename'];
    		return ['code'=>0,'msg'=>'上传成功','data'=>['src'=>$file_name]];
    		//return ['status'=>'success','msg'=>'上传成功','data'=>$file_name];
    	}
    }


    protected function uploadFileOne()
    {
        $upload = new \Think\Upload(); // 实例化上传类
//        $upload->maxSize = 3145728; // 设置附件上传大小
//        $upload->exts = array(
//            'jpg',
//            'gif',
//            'png',
//            'jpeg'
//        ); // 设置附件上传类型
        // $upload->mimes = array('jpg', 'gif', 'png', 'jpeg');// 设置附件上传类型
        $upload->rootPath = './Uploads/'; // 设置附件上传根目录
        $upload->saveName = 'up_video'. '_' . time() . '_' . rand(100000, 999999);

        // 上传单个文件
        $info = $upload->uploadOne($_FILES['file']);
        if (! $info) { // 上传错误提示错误信息
            return ['code'=>-1,'msg'=>$upload->getError(),'data'=>['src'=>'']];
            //return ['status'=>'error','msg'=>$upload->getError()];
        } else { // 上传成功 获取上传文件信息
            $file_name = '/Uploads/' . $info['savepath'] . $info['savename'];
            return ['code'=>0,'msg'=>'上传成功','data'=>['src'=>$file_name]];
            //return ['status'=>'success','msg'=>'上传成功','data'=>$file_name];
        }
    }
    
    protected function setAdminLog($contetn,$type,$uid){
        $date = [
            'content'=>$contetn,
            'ip'=> $_SERVER['REMOTE_ADDR'],
            'admin_id'=>$_SESSION['user']['username'],
            'time'=>time(),
            'uid'=>$uid,
            'type'=>$type
        ];
        M('AdminLog')->add($date);
    }
    
    
}