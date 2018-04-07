<?php
namespace Admin\Controller;

use Admin\Model\ArtistUserModel;
use Admin\Model\ArtistDictionaryModel;
class ArtistUserController extends AdminBaseController
{
    public function __construct()
    {
        parent::__construct();
    }
    /**  
     * 艺术家列表
     * @author		JiangPeng <867633862@qq.com>
     * @version		v1.0.0 
     * @copyright	2017-7-12 下午5:43:22
    */
    public function showArtistUserList()
    {
        $artist_info = $this->ArtistUser_model->selectAllArtistUser(10);
        
        $this->assign('artist_info',$artist_info['list']);
        $this->assign('page',$artist_info['page']);
        $this->display();
    }
    
    /**  
     * 添加艺术家信息 
     * @author		JiangPeng <867633862@qq.com>
     * @version		v1.0.0 
     * @copyright	2017-7-12 下午5:43:46
    */
    public function addArtistUser()
    {
        if(IS_POST){
            $info = array(
                'username'      => I('post.username','','trim'),
            	'simple'		=> I('post.simple','','trim'),
                'name'      	=> I('post.name','','trim'),
                'password'      => md5(I('post.password','','trim')),
            	'head_img'      => I('post.head_img','','trim'),
            	'present'       => I('post.present','','trim'),
            	'type_1'      	=> rtrim(implode(',',I('type1')),','),
            	'type_2'      	=> rtrim(implode(',',I('type2')),','),
            	'type_3'      	=> rtrim(implode(',',I('type3')),','),
            	'type_4'      	=> rtrim(implode(',',I('type4')),','),
            	'type_5'      	=> rtrim(implode(',',I('type5')),','),
            	'sort'			=> I('post.sort')?I('post.sort'):'10',
            	'status'		=> I('post.status')?I('post.status'):'off',
            	'fcbl'			=> I('post.fcbl')?I('post.fcbl'):$this->config['ALL_FCBL'],
                'add_time'		=> time(),
            );
           if($this->ArtistUser_model->findArtistUserByName($info['username'])){
               $this->ajaxError('该用户已经被占用');
           }
           if($this->ArtistUser_model->addArtistUser($info)){
               $this->ajaxSuccess('添加成功');
           }else{
              $this->ajaxError('添加失败');
           }
        }else{
        	$type1 = $this->ArtistDictionary_model->getDictionartListByPid(1);
        	$type2 = $this->ArtistDictionary_model->getDictionartListByPid(2);
        	$type3 = $this->ArtistDictionary_model->getDictionartListByPid(3);
        	$type4 = $this->ArtistDictionary_model->getDictionartListByPid(4);
        	$type5 = $this->ArtistDictionary_model->getDictionartListByPid(5);
        	$this->assign([
            	'type1'=>$type1,
            	'type2'=>$type2,
            	'type3'=>$type3,
            	'type4'=>$type4,
            	'type5'=>$type5
        	]);
            $this->display();
        }
    }
    /**  
     * 编辑艺术家
     * @author		JiangPeng <867633862@qq.com>
     * @version		v1.0.0 
     * @copyright	2017-7-13 上午10:01:08
    */
    public function editArtistUser()
    {            
        if(IS_POST){
            $save_info = array(
                'id' 	=> I('post.id','','trim'),
                'name'      	=> I('post.name','','trim'),
            	'simple'		=> I('post.simple','','trim'),
            	'head_img'      => I('post.head_img','','trim'),
            	'present'       => I('post.present','','trim'),
            	'type_1'      	=> rtrim(implode(',',I('type1')),','),
            	'type_2'      	=> rtrim(implode(',',I('type2')),','),
            	'type_3'      	=> rtrim(implode(',',I('type3')),','),
            	'type_4'      	=> rtrim(implode(',',I('type4')),','),
            	'type_5'      	=> rtrim(implode(',',I('type5')),','),
            	'sort'			=> I('post.sort')?I('post.sort'):'10',
            	'status'		=> I('post.status')?I('post.status'):'off',
            	'fcbl'			=> I('post.fcbl'),
            );
           if(I('post.password')){
               $save_info['password'] = md5(I('post.password','','trim'));
           }

           if($this->ArtistUser_model->editArtistUser($save_info) !== false){
               $this->ajaxSuccess('更新成功');
           }else{
              $this->ajaxError('更新失败');
           }
        }else{
            $ar_id = I('get.id','','intval');
            $ar_info = $this->ArtistUser_model->findArtistUserById($ar_id);
            $type1 = $this->ArtistDictionary_model->getDictionartListByPid(1);
            $type2 = $this->ArtistDictionary_model->getDictionartListByPid(2);
            $type3 = $this->ArtistDictionary_model->getDictionartListByPid(3);
            $type4 = $this->ArtistDictionary_model->getDictionartListByPid(4);
            $type5 = $this->ArtistDictionary_model->getDictionartListByPid(5);
            $this->assign([
            		'type1'=>$type1,
            		'type2'=>$type2,
            		'type3'=>$type3,
            		'type4'=>$type4,
            		'type5'=>$type5
            		]);
            $this->assign('ar_info',$ar_info);
            $this->display();
        }
    }
	/**  
	 * 禁用艺术家 
	 * @author		JiangPeng <867633862@qq.com>
	 * @version		v1.0.0 
	 * @copyright	2017-7-13 上午10:00:51
	*/
    public function delArtistUser()
    {
    	if(IS_POST){
    		if(I('post.status') == 'on'){
    			$status = 'off';
    		}else{
    			$status = 'on';
    		}
    		$user_info = array(
    				'id'        => I('post.id','','intval'),
    				'status'    => $status,
    		);
    		if($this->ArtistUser_model->editArtistUser($user_info) !== false){
    			$this->ajaxSuccess('更新成功');
    		}else{
    			$this->ajaxError('更新失败');
    		}
    	}
    }
    
    public function followArtistList(){
    	$map = [];
    	$on_user_id = I('on_user_id');
    	$ar_name  	= I('ar_name');
    	$add_time 	= I('add_time');
    	$cancel_time= I('cancel_time');
    	$browse_count_up = I('browse_count_up');
    	$browse_count_on = I('browse_count_on');
    	if(!empty($on_user_id)){
    		$map['F.on_user_id'] = $on_user_id;
    	}
    	if(!empty($ar_name)){
    		$map['AR.name'] = ['LIKE','%'.$ar_name.'%'];
    	}
    	if(!empty($browse_count_up)){
    		$map['F.browse_count'] = ['ELT',$browse_count_up];
    	}
    	if(!empty($browse_count_on)){
    		$map['F.browse_count'] = ['EGT',$browse_count_up];
    	}
    	if(!empty($add_time)){
    		$map['F.add_time'] 	   = strtotime($add_time);
    	}
    	if(!empty($cancel_time)){
    		$map['F.cancel_time']  = strtotime($cancel_time);
    	}
    	if(isset($_REQUEST['type']) && $_REQUEST['type']!=''){
    		$map['F.type'] = $_REQUEST['type'];
    	}
    	$FollowArtistModel = M('FollowArtist');
    	$order		= 'browse_count desc,in_artist_id desc,id desc';
    	$field		= 'F.*,AR.name AS ar_name,U.nickname AS u_name';
    	$count      =  $FollowArtistModel
    					->alias('F')
    					->field($field)
    					->join('__ARTIST_USER__ AS AR ON F.in_artist_id = AR.id','LEFT')
    					->join('__USERS__ AS U ON F.on_user_id = U.id','LEFT')
    					->where($map)
    					->count();
    	$page       = new \Think\Page($count,10);
    	$show       = $page->show();
    	$follow_info= $FollowArtistModel
    					->alias('F')
    					->field($field)
    					->join('__ARTIST_USER__ AS AR ON F.in_artist_id = AR.id','LEFT')
    					->join('__USERS__ AS U ON F.on_user_id = U.id','LEFT')
    					->where($map)
    					->limit($page->firstRow.','.$page->listRows)
    					->order($order)
    					->select();
    	$this->assign(['page' => $show , 'follow_info' => $follow_info]);
    	$this->display();
    }
}