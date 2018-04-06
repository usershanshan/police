<?php
namespace Home\Model;
use Home\Model\BaseModel;
class UsersModel extends BaseModel{
	/**  
	 * 获取用户信息
	 * @author		JiangPeng <867633862@qq.com>
	 * @version		v1.0.0 
	 * @copyright	2017-3-16 下午1:30:55
	*/
	public function getUserByUid($uid){
		$field = '*';
		$where = ['id'=>$uid,'status'=>0];
		$info = $this
					->field($field)
					->where($where)
					->find();
		unset($field);
		unset($where);
		return $info;
	}
	/**
	 * 获取用户信息根据pid
	 * @author		JiangPeng <867633862@qq.com>
	 * @version		v1.0.0
	 * @copyright	2017-3-16 下午1:30:55
	 */
	public function getUserByPid($pid){
		$field = 'id,phone,addTime';
		$where = ['pid'=>$pid,'status'=>0];
		$info = $this
					->field($field)
					->where($where)
					->select();
		unset($field);
		unset($where);
		return $info;
	}
	/**
	 * 根据电话获取用户信息
	 * @author		JiangPeng <867633862@qq.com>
	 * @version		v1.0.0
	 * @copyright	2017-3-16 下午1:30:55
	 */
	public function getUserByPhone($phone){
		$field = '*';
		$where = ['phone'=>$phone];
		$info = $this
					->field($field)
					->where($where)
					->find();
		unset($field);
		unset($where);
		return $info;
	}
	/**
	 * 检测用户是否第一次登陆
	 * @author		JiangPeng <867633862@qq.com>
	 * @version		v1.0.0
	 * @copyright	2017-3-16 下午1:30:55
	 */
	public function getLoginOneSub($phone){
		$field = 'checkSendPhone';
		$where = ['phone'=>$phone];
		$info = $this
				->field($field)
				->where($where)
				->find();
		unset($field);
		unset($where);
		return $info;
	}
	/**
	 * 检测用户是否实名认证
	 * @author		JiangPeng <867633862@qq.com>
	 * @version		v1.0.0
	 * @copyright	2017-3-16 下午1:30:55
	 */
	public function getCheckIdCard($uid){
		$field = 'checkIdCard';
		$where = ['id'=>$uid];
		$info = $this
				->field($field)
				->where($where)
				->find();
		unset($field);
		unset($where);
		return $info;
	}
	/**  
	 * 新增用户
	 * @author		JiangPeng <867633862@qq.com>
	 * @version		v1.0.0 
	 * @copyright	2017-3-17 下午2:13:39
	*/
	public function setUser($data){
		$info = $this->addData($data);
		return $info;
	}
	
	
	public function increaseUsersMoney($uid,$money,$type) {
		$map = ['id'=>$uid];
		return $this->where($map)->setInc($type,$money);
	}
	
	public function decreaseUsersMoney($uid,$money,$type) {
		$map = ['id'=>$uid];
		return $this->where($map)->setDec($type,$money);
	}
	
	
	public function editUser($map,$data){
		$info = $this->editData($map,$data);
		return $info;
	}
}
