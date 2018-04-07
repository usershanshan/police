<?php
namespace Admin\Controller;
class ConfigController extends AdminBaseController {
	
	public function index(){
		$list=M('Config')->select();
		foreach ($list as $k=>$v){
			$config[$v['key']]=$v['value'];
		}
		$this->assign('config',$config);
		$this->display();
	}
	
	public function changeConfig(){
		if($_POST){
			$arr=I('post.','','trim');
			if(!isset($arr['WEB_STATUS'])){
				$arr['WEB_STATUS'] = 'off';
			}
//			echo json_encode($arr);
//			die;
			foreach ($arr as $k=>$v){
				$where['key']=$k;
				M('Config')->where($where)->setField('value',$v);
				unset($where);
			}
			S('HOME_CONFIG',null);
		 	parent::ajaxSuccess('更新成功!');
		}
	}
	
	public function uploadConfigLogo()
	{
		$r = $this->uploadOne('logo');	
		if ($r['status'] == 'error') { // 上传错误提示错误信息
			$this->ajaxError($r['msg']);
		} else { // 上传成功 获取上传文件信息
			$this->ajaxSuccess($r['msg'],$r['data']);
		}
	}
}