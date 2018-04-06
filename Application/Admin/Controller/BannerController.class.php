<?php
namespace Admin\Controller;

class BannerController extends AdminBaseController
{
    
    public function __construct()
    {
        parent::__construct();
    }
    /**
    *2017-8-31 10:58:52
    * XX
    * 追加查询条件，描述模糊查询 $alt_like
    */
    public function index()
    { 
    	//追加模糊查询
    	$alt_like = I('alt');
    	if($alt_like){
    		$where['alt'] = array('like','%'.$alt_like.'%');
    	}
    	//结束
        $banner_info = M('Banner')->where($where)->order('sort desc,id desc')->select(); 
        $this->assign('banner_info',$banner_info);
        $this->display();
    }
    
    public function addBanner()
    {
        if(IS_POST){
            $data = I('post.');
            $data['sort'] =  $data['sort']? $data['sort']:10;
            $data['status'] =  $data['status']?$data['status']:'off'; 
            if(empty($data['img'])){
            	$this->ajaxerror("请上传图片");
            }
            if(empty($data['alt'])){
            	$this->ajaxerror("请填写标题");
            }
            $r = M('Banner')->add($data);
            if($r){
            	S('WEB_BANNER',null);
                $this->ajaxSuccess("广告轮播添加成功");
            }else{
                $this->ajaxError("广告轮播添加失败");
            }
        }else{
            $this->display();
        }
    }
    
    public function editBanner()
    {
        if(IS_POST){
            $data = I('post.'); 
            if(empty($data['img'])){
            	$this->ajaxerror("请上传图片");
            }
            if(empty($data['alt'])){
            	$this->ajaxerror("请填写标题");
            }
            $data['status'] =  $data['status']?$data['status']:'off';
            $r = M('Banner')->save($data);
            if($r !== false){
            	S('WEB_BANNER',null);
                $this->ajaxSuccess('广告轮播修改成功');
            }else{
                $this->ajaxError('广告轮播修改失败');
            }
        }else{
            $id = I('get.id','','intval');
            $banner_list = M('Banner')->where(['id'=>$id])->find();
            if(!$banner_list){
            	$this->error('参数错误');
            }
            $this->assign('banner_list',$banner_list);
            $this->display();
        }
    }
    
    public function deleteBanner()
    {
    	if(IS_POST){
    		if(I('post.status') == 'on'){
    			$status = 'off';
    		}else{
    			$status = 'on';
    		}
    		$info = array(
    				'id'        => I('post.id','','intval'),
    				'status'    => $status,
    		);
    		$r = M('Banner')->save($info);
    		if($r !== false){
    			S('WEB_BANNER',null);
    			$this->ajaxSuccess('更新成功');
    		}else{
    			$this->ajaxError('更新失败');
    		}
    	}
    }
}