<?php
namespace Home\Model;
/***
 * 用户表的常用操作，包括了角色的操作都在这里
 * 时间：2017-1-11
*/
class IndexDao{
	/**
	 * 查询轮播图表
	 * 返回按条件查询的数据
	 *@return 查询结果，查到了返回数组，查不到返回空
	 * */
	public function carouselSelect($where='',$page=0){
		$pad=new DbManager('banner');
		$rs=$pad->field("*")
				->where($where)
				->order("sort desc")
				->select($page);
		return $rs;
	}
	/**
	 * 查用新闻信息
	 * 返回按主键查询的数据
	 *@return 查询结果，查到了返回单条数据，查不到返回空
	 * */
	public function newsSelect($where){
		$pad=new DbManager('news');
		$rs=$pad->field('fhg_news.*,A.newslb,A.lbabs')
				->join('fhg_newscit as A on A.id=fhg_news.id')
				->where($where)
				->order('A.sort desc')
				->select();
		return $rs;
	}
	
	/***
	 *添加新闻分类
	 *@param $data  数组，放的是要添加的内容，key和列名相同
	 *@return 添加成功返回主键的值，失败返回false
	 */
	public function userscitSelect($data){
		$pdb=new DbManager('newscit');
		$where['status']='on';
		$rs=$pdb->where($where)->select();		
		return $rs;
	}
	/***
	 *删除用户表表
	 *@param $where  删除条件
	 *@return 删除成功返回删除的行数，失败返回false
	 */
	public function delUsers($where){
		$pdb=new DbManager('users');
		$data['delstate']=0;
		$rs=$pdb->where($where)->save($data);
		return $rs;
	}
	/***
	 *删除用户表表
	 *@param $where  删除条件
	 *@return 删除成功返回删除的行数，失败返回false
	 */
	public function rdelUsers($where){
		$pdb=new DbManager('users');
		$rs=$pdb->where($where)->del();
		return $rs;
	}
	/***
	 *修改用户表表
	 *@param $where  修改条件
	 *@param $data  数组，放的是要添加的内容，key和列名相同
	 *@return 修改成功返回修改影响的行数，失败返回false
	 */
	public function saveUsers($where,$data){
		$pdb=new DbManager('users');
		if(isset($data['userpwd'])){
			$data['userpwd']=md5($data['userpwd']);
		}

		if(isset($data['invite'])&&trim($data['invite'])){
			$invite=trim($data['invite']);
			$where2['invite']=$data['invite'];//这里放你自己的条件

			$rs2=$pdb->where($where2)->find();

			if($rs2){
				return false;
			}
		}
		$rs=$pdb->where($where)->save($data);
		return $rs;
	}
	/***
	 *增加用户表表指定的列的值，这里的增加是在原来的基础上增加
	 *@param $where  修改条件
	 *@param $name 要增长的列名
	 *@param $value 要增长的值
	 *@return 修改成功返回修改影响的行数，失败返回false
	 */
	public function usersInc($where='',$name='',$value=1){
		$pdb=new DbManager('users');
		$rs=$pdb->setInc($where,$name,$value);
		return $rs;
	}
	/***
	 *减少用户表表指定的列的值，这里的减少是在原来的基础上减少
	 *@param $where  修改条件
	 *@param $name 要减少的列名
	 *@param $value 要减少的值
	 *@return 修改成功返回修改影响的行数，失败返回false
	 */
	public function usersDec($where='',$name='',$value=1){
		$pdb=new DbManager('users');
		$rs=$pdb->setDec($where,$name,$value);
		return $rs;
	}
	//////////////////邀请码
	public function yqmAjaxSelect(){
		$pdb=new DbManager('users');
		$rs=$pdb->field("*")->select();
		return $rs;
	}
	public function yqmAjax($where=""){
		$pdb=new DbManager('users');
		$rs=$pdb->field("*")->where($where)->find();
		if($rs){
			return '邀请码填写错误';
		}else{
			return '邀请码填写正确';
		}
	}
}
?>