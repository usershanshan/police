<?php
/**
 * Created by PhpStorm.
 * User: zty
 * Date: 2018/3/31
 * Time: 22:30
 */

namespace Admin\Controller;


class NewsController extends AdminBaseController
{
    //添加分类列表
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
            $r = M('news_type')->add($info);
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

    //分类列表
    public function type_list(){
        $list = M('news_type')->where(['display'=>1])->select();
        foreach($list as $k=>$v){
            $list[$k]['inputtime'] = date('Y-m-d H:i:s',$v['inputtime']);
            switch($v['type']){
                case 1:
                    $list[$k]['do_type'] = '普通类型';
                    break;
                case 2:
                    $list[$k]['do_type'] = '报纸类型';
                    break;
                case 3:
                    $list[$k]['do_type'] = '视频类型';
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
                'type'=>'请选择分类'
            ];
            $res = required($require,$info);
            if($res['Error']){
                $this->ajaxError($res['Msg']);
            }

            $info['updatetime'] = time();



            $r = M('news_type')->save($info);

            if($r){
                $this->ajaxSuccess('修改成功');
            }else{
                $this->ajaxError('修改失败');
            }
        }else{
            $id = I('get.id');
            $this->assign('id',$id);
            //信息
            $info = M('news_type')->where(['id'=>$id])->find();
            switch($info['type']){
                case 1:
                    $info['do_type'][1] = 'selected';
                    break;
                case 2:
                    $info['do_type'][2] = 'selected';
                    break;
                case 3:
                    $info['do_type'][2] = 'selected';
                    break;
            }
            $this->assign('info',$info);

            $this->assign('title','分类编辑');
            $this->display('type_add');



        }
    }
    //分类删除
    public function type_del(){
        $id = I('post.id');
        $r = M('news_type')->where(['id'=>$id])->save(['display'=>0]);
        if($r){
            $this->ajaxSuccess('删除成功');
        }else{
            $this->ajaxError('删除失败');
        }
    }


    //==================================================================================================================




    //普通新闻列表
    public function news1_list(){

        $type_id = I('get.type_id');
        $this->assign('type_id',$type_id);
        $page = I('get.p')?I('get.p'):1;
        $pagesize = I('get.pagesize')?I('get.pagesize'):10;



        $where['display'] = 1;
        $where['type_id'] = $type_id;
        $data = getlist('news1',$page,$pagesize,$where,['inputtime'=>'desc']);
        if($data['count']){
            foreach($data['list'] as $k=>$v){
                $data['list'][$k]['inputtime'] = date('Y-m-d H:i:s',$v['inputtime']);
            }
        }


        $this->assign('list',$data['list']);
        $this->assign('page',$data['page']);
        $this->display();
    }


    //普通类型添加
    public function news1_add(){
        if(IS_POST){
            //取分类id
            $info = I('post.');
            $require = [
                'title'=>'请输入新闻标题',
                'title_en'=>'请输入新闻英文标题',
            ];
            $res = required($require,$info);
            if($res['Error']){
                $this->ajaxError($res['Msg']);
            }
            $info['inputtime'] = time();
            $info['display'] = 1;
            $r = M('news1')->add($info);
            if($r){
                $this->ajaxSuccess('添加成功');
            }else{
                $this->ajaxError('添加失败');
            }


        }else{
            $type_id = I('get.type_id');
            $this->assign('type_id',$type_id);
            $this->assign('title','添加普通新闻');
            $this->display();
        }
    }


    //新闻1编辑
    public function news1_edit(){
        if(IS_POST){
            $info = I('post.');
            unset($info['type_id']);
            $require = [
                'title'=>'请输入新闻标题',
                'title_en'=>'请输入新闻英文标题',
            ];
            $res = required($require,$info);
            if($res['Error']){
                $this->ajaxError($res['Msg']);
            }

            $info['updatetime'] = time();



            $r = M('news1')->save($info);

            if($r){
                $this->ajaxSuccess('修改成功');
            }else{
                $this->ajaxError('修改失败');
            }
        }else{
            $id = I('get.id');
            $this->assign('id',$id);
            //信息
            $info = M('news1')->where(['id'=>$id])->find();
            $type = M('news_type')->where(['id'=>$info['type']])->find();
            $info['type'] = $type['title'];
            $this->assign('info',$info);

            $this->assign('title','新闻编辑');
            $this->display('news1_add');



        }
    }


    //新闻1删除
    public function news1_del(){
        $id = I('post.id');
        $r = M('news1')->where(['id'=>$id])->save(['display'=>0]);
        if($r){
            $this->ajaxSuccess('删除成功');
        }else{
            $this->ajaxError('删除失败');
        }
    }

    //==================================================================================================================

    //报纸添加
    public function news2_add(){
        if(IS_POST){
            //取分类id
            $info = I('post.');
            $require = [
                'title'=>'请输入期刊编号',
                'title_en'=>'请输入英文期刊编号',
            ];
            $res = required($require,$info);
            if($res['Error']){
                $this->ajaxError($res['Msg']);
            }
            $info['inputtime'] = time();
            $info['display'] = 1;
            $r = M('news2')->add($info);
            if($r){
                $this->ajaxSuccess('添加成功');
            }else{
                $this->ajaxError('添加失败');
            }


        }else{
            $type_id = I('get.type_id');

            $this->assign('type_id',$type_id);
            $this->assign('title','添加期刊类新闻');
            $this->display();
        }
    }


    //报纸类总列表
    public function news2_list(){

        $type_id = I('get.type_id');
        $this->assign('type_id',$type_id);
        $page = I('get.p')?I('get.p'):1;
        $pagesize = I('get.pagesize')?I('get.pagesize'):10;



        $where['display'] = 1;
        $where['type_id'] = $type_id;
        $data = getlist('news2',$page,$pagesize,$where,['inputtime'=>'desc']);
        if($data['count']){
            foreach($data['list'] as $k=>$v){
                $data['list'][$k]['inputtime'] = date('Y-m-d H:i:s',$v['inputtime']);
            }
        }


        $this->assign('list',$data['list']);
        $this->assign('page',$data['page']);
        $this->display();
    }

    //报纸类编辑
    public function news2_edit(){
        if(IS_POST){
            $info = I('post.');
            unset($info['type_id']);
            $require = [
                'title'=>'请输入期刊编号',
                'title_en'=>'请输入英文期刊编号',
            ];
            $res = required($require,$info);
            if($res['Error']){
                $this->ajaxError($res['Msg']);
            }

            $info['updatetime'] = time();



            $r = M('news2')->save($info);

            if($r){
                $this->ajaxSuccess('修改成功');
            }else{
                $this->ajaxError('修改失败');
            }
        }else{
            $id = I('get.id');
            $this->assign('id',$id);
            //信息
            $info = M('news2')->where(['id'=>$id])->find();
            $this->assign('info',$info);

            $this->assign('title','期刊编辑');
            $this->display('news2_add');



        }
    }


    //新闻2删除
    public function news2_del(){
        $id = I('post.id');
        $r = M('news2')->where(['id'=>$id])->save(['display'=>0]);
        if($r){
            $this->ajaxSuccess('删除成功');
        }else{
            $this->ajaxError('删除失败');
        }
    }



    //======================================================================================================

    //版面添加
    public  function news2_ban_add(){
        if(IS_POST){
            $info = I('post.');
            $require = [
                'title'=>'请输入版面号',
                'title_en'=>'请输入英文版面号',
            ];
            $res = required($require,$info);
            if($res['Error']){
                $this->ajaxError($res['Msg']);
            }

           $info['display'] = 1;
            $info['inputtime'] = time();



            $r = M('news2_ban')->add($info);

            if($r){
                $this->ajaxSuccess('添加成功');
            }else{
                $this->ajaxError('添加失败');
            }
        }else{
            $this->assign('title','添加版面');
            $this->assign('pid',I('get.pid'));//期刊id
            $this->display();

        }
    }

    //版面列表
    public function news2_ban_list(){
        $pid = I('get.pid');//期刊id
        $this->assign('pid',$pid);
        $page = I('get.p')?I('get.p'):1;
        $pagesize = I('get.pagesize')?I('get.pagesize'):10;



        $where['display'] = 1;
        $where['pid'] = $pid;
        $data = getlist('news2_ban',$page,$pagesize,$where,['inputtime'=>'desc']);
        if($data['count']){
            foreach($data['list'] as $k=>$v){
                $data['list'][$k]['inputtime'] = date('Y-m-d H:i:s',$v['inputtime']);
            }
        }


        $this->assign('list',$data['list']);
        $this->assign('page',$data['page']);
        $this->display();
    }


    //新闻2删除
    public function news2_ban_del(){
        $id = I('post.id');
        $r = M('news2_ban')->where(['id'=>$id])->save(['display'=>0]);
        if($r){
            $this->ajaxSuccess('删除成功');
        }else{
            $this->ajaxError('删除失败');
        }
    }

    //版面编辑
    public function news2_ban_edit(){
        if(IS_POST){
            $info = I('post.');
            unset($info['pid']);
            $require = [
                'title'=>'请输入版面号',
                'title_en'=>'请输入英文版面号',
            ];
            $res = required($require,$info);
            if($res['Error']){
                $this->ajaxError($res['Msg']);
            }
            if($res['Error']){
                $this->ajaxError($res['Msg']);
            }

            $info['updatetime'] = time();



            $r = M('news2_ban')->save($info);

            if($r){
                $this->ajaxSuccess('修改成功');
            }else{
                $this->ajaxError('修改失败');
            }
        }else{
            $id = I('get.id');
            $this->assign('id',$id);
            //信息
            $info = M('news2_ban')->where(['id'=>$id])->find();
            $this->assign('info',$info);

            $this->assign('title','版面编辑');
            $this->display('news2_ban_add');



        }
    }

    //新闻2删除
    public function news2_list_del(){
        $id = I('post.id');
        $r = M('news2_list')->where(['id'=>$id])->save(['display'=>0]);
        if($r){
            $this->ajaxSuccess('删除成功');
        }else{
            $this->ajaxError('删除失败');
        }
    }

    //================================================================================================
    //内容列表
    public function news2_list_add(){
        if(IS_POST){
            $info = I('post.');
            $require = [
                'title'=>'请输入标题',
                'title_en'=>'请输入英文标题',
            ];
            $res = required($require,$info);
            if($res['Error']){
                $this->ajaxError($res['Msg']);
            }

            $info['display'] = 1;
            $info['inputtime'] = time();



            $r = M('news2_list')->add($info);

            if($r){
                $this->ajaxSuccess('添加成功');
            }else{
                $this->ajaxError('添加失败');
            }
        }else{
            $this->assign('title','添加内容');
            $this->assign('pid',I('get.pid'));//版面id
            $this->display();

        }
    }
    //内容列表列表
    public function news2_list_list(){
        $pid = I('get.pid');//版面id
        $this->assign('pid',$pid);
        $page = I('get.p')?I('get.p'):1;
        $pagesize = I('get.pagesize')?I('get.pagesize'):10;



        $where['display'] = 1;
        $where['pid'] = $pid;
        $data = getlist('news2_list',$page,$pagesize,$where,['inputtime'=>'desc']);
        if($data['count']){
            foreach($data['list'] as $k=>$v){
                $data['list'][$k]['inputtime'] = date('Y-m-d H:i:s',$v['inputtime']);
            }
        }


        $this->assign('list',$data['list']);
        $this->assign('page',$data['page']);
        $this->display();
    }

    //版面编辑
    public function news2_list_edit(){
        if(IS_POST){
            $info = I('post.');
            unset($info['pid']);
            $require = [
                'title'=>'请输入标题',
                'title_en'=>'请输入英文标题',
            ];
            $res = required($require,$info);
            if($res['Error']){
                $this->ajaxError($res['Msg']);
            }
            $info['updatetime'] = time();



            $r = M('news2_list')->save($info);

            if($r){
                $this->ajaxSuccess('修改成功');
            }else{
                $this->ajaxError('修改失败');
            }
        }else{
            $id = I('get.id');
            $this->assign('id',$id);
            //信息
            $info = M('news2_list')->where(['id'=>$id])->find();
            $this->assign('info',$info);

            $this->assign('title','内容编辑');
            $this->display('news2_list_add');



        }
    }

    //==================================================================================================================
    public function news3_add(){
        if(IS_POST){
            $info = I('post.');
            $require = [
                'title'=>'请输入标题',
                'title_en'=>'请输入英文标题',
            ];
            $res = required($require,$info);
            if($res['Error']){
                $this->ajaxError($res['Msg']);
            }

            $info['display'] = 1;
            $info['inputtime'] = time();



            $r = M('news3')->add($info);

            if($r){
                $this->ajaxSuccess('添加成功');
            }else{
                $this->ajaxError('添加失败');
            }
        }else{
            $this->assign('title','添加内容');
            $this->assign('type_id',I('get.type_id'));//版面id
            $this->display();

        }
    }


    //内容列表列表
    public function news3_list(){
        $type_id = I('get.type_id');//版面id
        $this->assign('type_id',$type_id);
        $page = I('get.p')?I('get.p'):1;
        $pagesize = I('get.pagesize')?I('get.pagesize'):10;



        $where['display'] = 1;
        $where['type_id'] = $type_id;
        $data = getlist('news2_list',$page,$pagesize,$where,['inputtime'=>'desc']);
        if($data['count']){
            foreach($data['list'] as $k=>$v){
                $data['list'][$k]['inputtime'] = date('Y-m-d H:i:s',$v['inputtime']);
            }
        }


        $this->assign('list',$data['list']);
        $this->assign('page',$data['page']);
        $this->display();
    }




}