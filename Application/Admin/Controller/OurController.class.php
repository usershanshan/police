<?php
/**
 * Created by PhpStorm.
 * User: zty
 * Date: 2018/4/3
 * Time: 0:24
 */

namespace Admin\Controller;


class OurController extends AdminBaseController
{
    public function type_add(){
        if(IS_POST){
            $info = I('post.');
            $require = [
                'title'=>'请输入分类标题',
                'title_en'=>'请输入分类英文标题',
                'type'=>'请选择分类'
            ];
            $res = required($require,$info);
            if($res['Error']){
                $this->ajaxError($res['Msg']);
            }
            $info['inputtime'] = time();
            $info['display'] = 1;
            $r = M('our_type')->add($info);
            if($info['type'] == 1){
                $r = M('our1')->add(['inputtime'=>$info['inputtime'],'display'=>1,'type_id'=>$r]);
            }
            if($r){
                $this->ajaxSuccess('添加成功');
            }else{
                $this->ajaxError('添加失败');
            }


        }else{
            $this->assign('title','添加新闻分类');
            $this->display();
        }
    }


    public function type_list(){
        $list = M('our_type')->where(['display'=>1])->select();
        foreach($list as $k=>$v){
            $list[$k]['inputtime'] = date('Y-m-d H:i:s',$v['inputtime']);
            switch($v['type']){
                case 1:
                    $list[$k]['do_type'] = '单条';
                    break;
                case 2:
                    $list[$k]['do_type'] = '列表';
                    break;
            }
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



            $r = M('our_type')->save($info);

            if($r){
                $this->ajaxSuccess('修改成功');
            }else{
                $this->ajaxError('修改失败');
            }
        }else{
            $id = I('get.id');
            $this->assign('id',$id);
            //信息
            $info = M('our_type')->where(['id'=>$id])->find();
            switch($info['type']){
                case 1:
                    $info['do_type'][1] = 'selected';
                    break;
                case 2:
                    $info['do_type'][2] = 'selected';
                    break;
            }
            $info['disabled'] = 'disabled';
            $this->assign('info',$info);

            $this->assign('title','分类编辑');
            $this->display('type_add');



        }
    }
    //分类删除
    public function type_del(){
        $id = I('post.id');
        $r = M('our_type')->where(['id'=>$id])->save(['display'=>0]);
        if($r){
            $this->ajaxSuccess('删除成功');
        }else{
            $this->ajaxError('删除失败');
        }
    }


    //编辑图文
    public function our1_edit(){
        if(IS_POST){
            $info = I('post.');
            $require = [
                'title'=>'请输入标题',
                'title_en'=>'请输入新闻呢标题',
            ];
            $res = required($require,$info);
            if($res['Error']){
                $this->ajaxError($res['Msg']);
            }

            $info['updatetime'] = time();



            $r = M('our1')->where(['type_id'=>$info['type_id']])->save($info);


            if($r){
                $this->ajaxSuccess('修改成功');
            }else{
                $this->ajaxError('修改失败');
            }
        }else{
            $id = I('get.id');
            $this->assign('type_id',$id);
            //信息
            $info = M('our1')->where(['type_id'=>$id])->find();
            $this->assign('info',$info);

            $this->assign('title','新闻编辑');
            $this->display('our1_edit');



        }
    }


    public function our2_list(){
        $type_id = I('get.type_id');//期刊id
        $this->assign('type_id',$type_id);
        $page = I('get.p')?I('get.p'):1;
        $pagesize = I('get.pagesize')?I('get.pagesize'):10;



        $where['display'] = 1;
        $where['type_id'] = $type_id;
        $data = getlist('our2',$page,$pagesize,$where,['inputtime'=>'desc']);
        if($data['count']){
            foreach($data['list'] as $k=>$v){
                $data['list'][$k]['inputtime'] = date('Y-m-d H:i:s',$v['inputtime']);
            }
        }


        $this->assign('list',$data['list']);
        $this->assign('page',$data['page']);
        $this->display();
    }

    public function our2_add(){
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
            $r = M('our2')->add($info);
            if($r){
                $this->ajaxSuccess('添加成功');
            }else{
                $this->ajaxError('添加失败');
            }


        }else{
            $type_id = I('get.type_id');
            $this->assign('type_id',$type_id);
            $this->assign('title','添加新闻');
            $this->display();
        }
    }

    public function our2_edit(){
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



            $r = M('our2')->save($info);

            if($r){
                $this->ajaxSuccess('修改成功');
            }else{
                $this->ajaxError('修改失败');
            }
        }else{
            $id = I('get.id');
            $this->assign('id',$id);
            //信息
            $info = M('our2')->where(['id'=>$id])->find();
            $this->assign('info',$info);

            $this->assign('title','编辑');
            $this->display('our2_add');



        }
    }

    public function our2_del(){
        $id = I('post.id');
        $r = M('our2')->where(['id'=>$id])->save(['display'=>0]);
        if($r){
            $this->ajaxSuccess('删除成功');
        }else{
            $this->ajaxError('删除失败');
        }
    }




}