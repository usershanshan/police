<?php
/**
 * Created by PhpStorm.
 * User: zty
 * Date: 2018/4/6
 * Time: 10:01
 */

namespace Admin\Controller;


class CaseController extends AdminBaseController
{
    //添加分类列表
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
            $r = M('case_type')->add($info);
            if($r){
                $this->ajaxSuccess('添加成功');
            }else{
                $this->ajaxError('添加失败');
            }


        }else{
            $this->assign('title','添加经典案例分类');
            $this->display();
        }
    }


    //分类列表
    public function type_list(){
        $list = M('case_type')->where(['display'=>1])->order(['orders'=>'asc'])->select();
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



            $r = M('case_type')->save($info);

            if($r){
                $this->ajaxSuccess('修改成功');
            }else{
                $this->ajaxError('修改失败');
            }
        }else{
            $id = I('get.id');
            $this->assign('id',$id);
            //信息
            $info = M('case_type')->where(['id'=>$id])->find();
            $this->assign('info',$info);

            $this->assign('title','分类编辑');
            $this->display('type_add');
        }
    }

    //待修改
    public function type_del(){
        $id = I('post.id');
        $r = M('case_type')->where(['id'=>$id])->save(['display'=>0]);
        if($r){
            $this->ajaxSuccess('删除成功');
        }else{
            $this->ajaxError('删除失败');
        }
    }

    //案列内容列表
    public function case_list(){
        $type_id = I('get.type_id');
        $this->assign('type_id',$type_id);
        $page = I('get.p')?I('get.p'):1;
        $pagesize = I('get.pagesize')?I('get.pagesize'):10;



        $where['display'] = 1;
        $where['type_id'] = $type_id;
        $data = getlist('case_content',$page,$pagesize,$where,['orders'=>'asc','inputtime'=>'desc']);
        if($data['count']){
            foreach($data['list'] as $k=>$v){
                $data['list'][$k]['inputtime'] = date('Y-m-d H:i:s',$v['inputtime']);
            }
        }


        $this->assign('list',$data['list']);
        $this->assign('page',$data['page']);
        $this->display();
    }

    //添加内容
    public function case_add(){
        if(IS_POST){
            //取分类id
            $info = I('post.');
            $require = [
                'title'=>'请输入标题',
                'title_en'=>'请输入英文标题',
                'img'=>'请上传图片',
            ];
            $res = required($require,$info);
            if($res['Error']){
                $this->ajaxError($res['Msg']);
            }
            $info['inputtime'] = time();
            $info['display'] = 1;
            $r = M('case_content')->add($info);
            if($r){
                $this->ajaxSuccess('添加成功');
            }else{
                $this->ajaxError('添加失败');
            }


        }else{
            $type_id = I('get.type_id');
            $this->assign('type_id',$type_id);
            $this->assign('title','内容添加');
            $this->display();
        }
    }


    public function case_edit(){
        if(IS_POST){
            $info = I('post.');
            unset($info['type_id']);
            $require = [
                'title'=>'请输入标题',
                'title_en'=>'请输入英文标题',
            ];
            $res = required($require,$info);
            if($res['Error']){
                $this->ajaxError($res['Msg']);
            }

            $info['updatetime'] = time();



            $r = M('case_content')->save($info);

            if($r){
                $this->ajaxSuccess('修改成功');
            }else{
                $this->ajaxError('修改失败');
            }
        }else{
            $id = I('get.id');
            $this->assign('id',$id);
            //信息
            $info = M('case_content')->where(['id'=>$id])->find();
            $this->assign('info',$info);

            $this->assign('title','内容编辑');
            $this->display('case_add');



        }
    }

    //新闻1删除
    public function case_del(){
        $id = I('post.id');
        $r = M('case_content')->where(['id'=>$id])->save(['display'=>0]);
        if($r){
            $this->ajaxSuccess('删除成功');
        }else{
            $this->ajaxError('删除失败');
        }
    }







}