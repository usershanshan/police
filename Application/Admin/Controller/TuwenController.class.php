<?php
/**
 * Created by PhpStorm.
 * User: zty
 * Date: 2018/1/22
 * Time: 13:57
 */

namespace Admin\Controller;


class TuwenController extends AdminBaseController
{
    //分类  无分页  V
    public function typeList($key=false){//取值时全真
        $tuwen_type  = M('tuwen_type');
        $list = $tuwen_type->where(['display'=>1])->order(['orders'=>'desc','inputtime'=>'desc'])->select();
        if($list){
            foreach($list as $k=>$v){
                $v['do_type'] = $v['type']==1?'单条':'列表';
                $list_arr[$v['identy']]=$v;
            }
        }
        if($key){
            return $list_arr;
        }
        $this->assign('list',$list_arr);
        $this->display();
    }
    //分类编辑  V
    public function typeEdit(){
        $tuwen_type = M('tuwen_type');
        if(IS_POST){
            $id = I('post.id');
            $title = I('post.title');
            $orders = I('post.orders')?I('post.orders'):0;
            if(!$title){
                $this->ajaxError('请填写分类名称');
            }

            $r = $tuwen_type->where(['id'=>$id])->save(['title'=>$title,'orders'=>$orders]);
            if($r){
                $this->ajaxSuccess('修改成功');
            }else{
                $this->ajaxError('修改失败');
            }
        }else{
            $id = I('get.id');
            $this->assign('id',$id);
            $info = $tuwen_type->where(['display'=>1,'id'=>$id])->find();
            $this->assign('info',$info);
            $this->display();
        }
    }
    //图文列表
    public function listList(){

        $page = I('get.p')?I('get.p'):1;
        $pagesize = I('get.pagesize')?I('get.pagesize'):10;
        $where['display'] = 1;
        //搜索
        $type = I('get.type');
        if($type){
            $where['type'] = $type;
        }
        $type_list = $this->typeList(true);
        if($type){
            foreach( $type_list as $k=>$v){
                if(in_array($type,$v)){
                    $type_list[$k]['selected'] = 'selected';
                }
            }
        }


        $data = getlist('tuwen_list',$page,$pagesize,$where,['orders'=>'asc','inputtime'=>'desc']);
        if($data['count']){
            foreach($data['list'] as $k=>$v){
                $data['list'][$k]['inputtime'] = date('y-m-d H:i:s',$v['inputtime']);
                $data['list'][$k]['do_type'] = $type_list[$v['type']]['title'];
                $data['list'][$k]['type_type'] = $type_list[$v['type']]['do_type'];
            }
        }
        $this->assign('type',$type_list);
        $this->assign('list',$data['list']);
        $this->assign('page',$data['page']);
        $this->display();

    }
    //图文添加
    public function listAdd(){
        $type_list = $this->typeList(true);
        $tuwen = M('tuwen_list');
        if(IS_POST){
            $type = I('post.type');
            $title = I('post.title');
            $img = I('post.img');
            $note = I('post.note');
            $text = I('post.text');
            $orders = I('post.orders');
            if(!$type){
                $this->ajaxError('请选择图文分类');
            }
            if($type_list[$type]['type'] == 1){ //分类为单条
                if($tuwen->where(['display'=>1,'type'=>$type])->count()){
                    $this->ajaxError('该图文分类为单条，请修改指定图文，不能再次添加');
                }
            }
            $insert['display'] = 1;
            $insert['inputtime'] = time();
            $insert['type'] = $type;
            $insert['title'] = $title;
            $insert['img'] = $img;
            $insert['note'] = $note;
            $insert['text'] = $text;
            $insert['orders'] = $orders;
            $r = $tuwen->add($insert);
            if($r){
                $this->ajaxSuccess('添加成功');
            }else{
                $this->ajaxError('添加失败');
            }

        }else{
            $this->assign('type_list',$type_list);
            $this->assign('title','添加图文');
            $this->display();
        }
    }
    //图文编辑
    public function listEdit(){
        $type_list = $this->typeList(true);
        $tuwen = M('tuwen_list');
        if(IS_POST){
            $id = I('post.id');
            $type = I('post.type');
            $title = I('post.title');
            $img = I('post.img');
            $note = I('post.note');
            $text = I('post.text');
            $orders = I('post.orders');
            if(!$type){
                $this->ajaxError('请选择图文分类');
            }
//            if($type_list[$type]['type'] == 1){ //分类为单条
//                if($tuwen->where(['display'=>1,'type'=>$type])->count()){
//                    $this->ajaxError('该图文分类为单条，请修改指定图文');
//                }
//            }
            $update['updatetime'] = time();
            $update['type']= $type;
            $update['title'] = $title;
            $update['img'] = $img;
            $update['note'] = $note;
            $update['text'] = $text;
            $update['orders'] = $orders;

            $r = $tuwen->where(['id'=>$id])->save($update);
            if($r){
                $this->ajaxSuccess('修改成功');
            }else{
                $this->ajaxError('修改失败');
            }


        }else{
            $this->assign('title','图文修改');
            $id = I('get.id');
            $this->assign('id',$id);
            $info = $tuwen->where(['id'=>$id])->find();
            $type_list[$info['type']]['selected'] = 'selected';
            $this->assign('info',$info);
            $this->assign('type_list',$type_list);
            $this->display('listAdd');
        }


    }
    //图文删除
    public function listDel(){
        $id = I('post.id');
        $r = M('tuwen_list')->where(['id'=>$id])->save(['display'=>0]);
        if($r){
            $this->ajaxSuccess('删除成功');
        }else{
            $this->ajaxError('删除失败');
        }
    }
}