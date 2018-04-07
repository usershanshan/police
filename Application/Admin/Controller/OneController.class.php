<?php
/**
 * Created by PhpStorm.
 * User: zty
 * Date: 2018/4/7
 * Time: 20:47
 */

namespace Admin\Controller;


class OneController extends AdminBaseController
{
    public function type_add(){
        if(IS_POST){
            $info = I('post.');
            $require = [
                'title'=>'请输入分类标题',
                'title_en'=>'请输入分类英文标题',
            ];
            $res = required($require,$info);
            if($res['Error']){
                $this->ajaxError($res['Msg']);
            }
            $info['inputtime'] = time();
            $info['display'] = 1;
            $r = M('one_type')->add($info);
            if($r){
                $this->ajaxSuccess('添加成功');
            }else{
                $this->ajaxError('添加失败');
            }


        }else{
            $this->assign('title','添加一站式服务分类');
            $this->display();
        }
    }


    public function type_list(){
        $list = M('one_type')->where(['display'=>1])->order(['orders'=>'asc'])->select();
        foreach($list as $k=>$v){
            $list[$k]['inputtime'] = date('Y-m-d H:i:s',$v['inputtime']);
        }
        $this->assign('list',$list);
        $this->display();
    }


    //分类编辑
    public function type_edit(){
        if(IS_POST){
            $info = I('post.');
            $require = [
                'title'=>'请输入分类标题',
                'title_en'=>'请输入分类英文标题',
            ];
            $res = required($require,$info);
            if($res['Error']){
                $this->ajaxError($res['Msg']);
            }

            $info['updatetime'] = time();



            $r = M('one_type')->save($info);

            if($r){
                $this->ajaxSuccess('修改成功');
            }else{
                $this->ajaxError('修改失败');
            }
        }else{
            $id = I('get.id');
            $this->assign('id',$id);
            //信息
            $info = M('one_type')->where(['id'=>$id])->find();
            $this->assign('info',$info);

            $this->assign('title','分类编辑');
            $this->display('type_add');



        }
    }
    //分类删除
    public function type_del(){
        $id = I('post.id');
        $r = M('one_type')->where(['id'=>$id])->save(['display'=>0]);
        if($r){
            $this->ajaxSuccess('删除成功');
        }else{
            $this->ajaxError('删除失败');
        }
    }
    //==============================================================================

    public function one_list_list(){
        $type_id = I('get.type_id');//分类
        $this->assign('type_id',$type_id);
        $page = I('get.p')?I('get.p'):1;
        $pagesize = I('get.pagesize')?I('get.pagesize'):10;



        $where['display'] = 1;
        $where['type_id'] = $type_id;
        $data = getlist('one_list',$page,$pagesize,$where,['inputtime'=>'desc']);
        if($data['count']){
            foreach($data['list'] as $k=>$v){
                $data['list'][$k]['inputtime'] = date('Y-m-d H:i:s',$v['inputtime']);
            }
        }


        $this->assign('list',$data['list']);
        $this->assign('page',$data['page']);
        $this->display();
    }

    public function one_list_add(){
        if(IS_POST){
            //取分类id
            $info = I('post.');
            $require = [
                'title'=>'请输入标题',
                'title_en'=>'请输入英文标题',
            ];
            $res = required($require,$info);
            if($res['Error']){
                $this->ajaxError($res['Msg']);
            }
            $info['inputtime'] = time();
            $info['display'] = 1;
            $r = M('one_list')->add($info);
            if($r){
                $this->ajaxSuccess('添加成功');
            }else{
                $this->ajaxError('添加失败');
            }


        }else{
            $type_id = I('get.type_id');
            $this->assign('type_id',$type_id);
            $this->assign('title','添加');
            $this->display();
        }
    }

    public function one_list_edit(){
        if(IS_POST){
            $info = I('post.');
            unset($info['type_id']);
            $require = [
                'title'=>'请输入标题',
                'title_en'=>'请输入新闻呢标题',
            ];
            $res = required($require,$info);
            if($res['Error']){
                $this->ajaxError($res['Msg']);
            }

            $info['updatetime'] = time();



            $r = M('one_list')->save($info);

            if($r){
                $this->ajaxSuccess('修改成功');
            }else{
                $this->ajaxError('修改失败');
            }
        }else{
            $id = I('get.id');
            $this->assign('id',$id);
            //信息
            $info = M('one_list')->where(['id'=>$id])->find();
            $this->assign('info',$info);

            $this->assign('title','编辑');
            $this->display('one_list_add');



        }
    }


    public function one_list_del(){
        $id = I('post.id');
        $r = M('one_list')->where(['id'=>$id])->save(['display'=>0]);
        if($r){
            $this->ajaxSuccess('删除成功');
        }else{
            $this->ajaxError('删除失败');
        }
    }

    //==================================================================================
    public function one_content_list(){
        $pid = I('get.id');//分类
        $this->assign('pid',$pid);
        $page = I('get.p')?I('get.p'):1;
        $pagesize = I('get.pagesize')?I('get.pagesize'):10;



        $where['display'] = 1;
        $where['pid'] = $pid;
        $data = getlist('one_content',$page,$pagesize,$where,['inputtime'=>'desc']);
        if($data['count']){
            foreach($data['list'] as $k=>$v){
                $data['list'][$k]['inputtime'] = date('Y-m-d H:i:s',$v['inputtime']);
            }
        }


        $this->assign('list',$data['list']);
        $this->assign('page',$data['page']);
        $this->display();
    }

    public function one_content_add(){
        if(IS_POST){
            //取分类id
            $info = I('post.');
            $require = [
                'title'=>'请输入标题',
                'title_en'=>'请输入英文标题',
            ];
            $res = required($require,$info);
            if($res['Error']){
                $this->ajaxError($res['Msg']);
            }
            $info['inputtime'] = time();
            $info['display'] = 1;
            $r = M('one_content')->add($info);
            if($r){
                $this->ajaxSuccess('添加成功');
            }else{
                $this->ajaxError('添加失败');
            }


        }else{
            $pid = I('get.pid');
            $this->assign('pid',$pid);
            $this->assign('title','添加');
            $this->display();
        }
    }

    public function one_content_edit(){
        if(IS_POST){
            $info = I('post.');
            unset($info['pid']);
            $require = [
                'title'=>'请输入标题',
                'title_en'=>'请输入新闻呢标题',
            ];
            $res = required($require,$info);
            if($res['Error']){
                $this->ajaxError($res['Msg']);
            }

            $info['updatetime'] = time();



            $r = M('one_content')->save($info);

            if($r){
                $this->ajaxSuccess('修改成功');
            }else{
                $this->ajaxError('修改失败');
            }
        }else{
            $id = I('get.id');
            $this->assign('id',$id);
            //信息
            $info = M('one_content')->where(['id'=>$id])->find();
            $this->assign('info',$info);

            $this->assign('title','编辑');
            $this->display('one_content_add');



        }
    }

    public function one_content_del(){
        $id = I('post.id');
        $r = M('one_content')->where(['id'=>$id])->save(['display'=>0]);
        if($r){
            $this->ajaxSuccess('删除成功');
        }else{
            $this->ajaxError('删除失败');
        }
    }








}