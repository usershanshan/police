<?php
/**
 * Created by PhpStorm.
 * User: zty
 * Date: 2018/4/6
 * Time: 22:01
 */

namespace Admin\Controller;


class NetController extends AdminBaseController
{
    public function add(){
        if(IS_POST){
            $info = I('post.');
            $info['display']  = 1;
            $info['inputtime'] = time();

            $r = M('net')->add($info);
            if($r){
                $this->ajaxSuccess('添加成功');
            }else{
                $this->ajaxError('添加失败');
            }

        }else{
          $this->assign('title','添加营销网络');
          $this->display();
        }
    }

    public function edit(){
        if(IS_POST){
            $info = I('post.');
            $info['updatetime'] = time();
            $r = M('net')->save($info);
            if($r){
                $this->ajaxSuccess('修改成功');
            }else{
                $this->ajaxError('修改失败');
            }

        }else{
            $id = I('get.id');
            $this->assign('id',$id);
            $this->assign('title','修改营销网络');
            $info = M('net')->where(['display'=>1,'id'=>$id])->find();
            $this->assign('info',$info);
            $this->display('add');

        }
    }

    public function lists(){

        $page = I('get.p')?I('get.p'):1;
        $pagesize = I('get.pagesize')?I('get.pagesize'):10;
        $where['display'] = 1;
        $data = getlist('net',$page,$pagesize,$where,['orders'=>'asc','inputtime'=>'desc']);
        if($data['count']){
            foreach($data['list'] as $k=>$v){

            }
        }
        $this->assign('list',$data['list']);
        $this->assign('page',$data['page']);
        $this->display();

    }

    public function del(){
        $id = I('post.id');
        $r = M('net')->where(['id'=>$id])->save(['display'=>0]);
        if($r){
            $this->ajaxSuccess('删除成功');
        }else{
            $this->ajaxError('删除失败');
        }
    }
}