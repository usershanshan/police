<?php
/**
 * Created by PhpStorm.
 * User: zty
 * Date: 2018/2/24
 * Time: 14:03
 */

namespace Admin\Controller;


class VoteController extends AdminBaseController
{
    //添加活动
    public function act_add(){
        if(IS_POST){
            $info = I('post.');
            $require = [
                'title'=>'请填写活动标题',
                'type'=>'请选择活动类型',
                'free'=>'请填写抽奖次数上限',
                'day'=>'请填写免费抽奖次数',
            ];
            $res = required($require,$info);
            if($res['Error']){
                $this->ajaxError($res['Msg']);
            }
            if(num_str($info['day'],'num') && $info['day'] != '无限'){
                $this->ajaxError('请正确输入抽奖次数上限');
            }
            if(num_str($info['free'],'num') && $info['free'] != '无限'){
                $this->ajaxError('请正确填写免费抽奖次数');
            }
            if($info['free'] == '无限' && $info['day'] != '无限'){
                $this->ajaxError('免费抽奖次数为 无限 时，抽奖次数上限必须为 无限');

            }

            if($info['free'] == '无限'){
                $info['free'] = -1;
            }
            if($info['day'] == '无限'){
                $info['day'] = -1;
            }


            $info['display'] = 1;
            $info['inputtime'] = time();

            $r = M('vote_act')->add($info);
            if($r){
                $this->ajaxSuccess('添加成功');
            }else{
                $this->ajaxError('添加失败');
            }


        }else{
            $this->assign('title','活动添加');
            $this->display();
        }
    }

    //活动列表
    public function act_list(){
        $page = I('get.p')?I('get.p'):1;
        $pagesize = I('get.pagesize')?I('get.pagesize'):10;

        $where['display'] = 1;

        $data = getlist('vote_act',$page,$pagesize,$where,$order = ['inputtime'=>'desc']);
        if($data['count']){
            foreach($data['list'] as $k=>$v){
                $data['list'][$k]['inputtime'] = date('Y-m-d H:i:s',$v['inputtime']);
                $data['list'][$k]['do_type'] =  $v['type'] == 1?'数量型':'概率型';
            }
        }
        $this->assign('list',$data['list']);
        $this->assign('page',$data['page']);
        $this->display();
    }

    //活动编辑
    public function act_edit(){
        if(IS_POST){
            $info = I('post.');
            $require = [
                'title'=>'请填写活动标题',
                'type'=>'请选择活动类型',
                'free'=>'请填写抽奖次数上限',
                'day'=>'请填写免费抽奖次数',
            ];
            $res = required($require,$info);
            if($res['Error']){
                $this->ajaxError($res['Msg']);
            }
            if(num_str($info['day'],'num') && $info['day'] != '无限'){
                $this->ajaxError('请正确输入抽奖次数上限');
            }
            if(num_str($info['free'],'num') && $info['free'] != '无限'){
                $this->ajaxError('请正确填写免费抽奖次数');
            }
            if($info['free'] == '无限' && $info['day'] != '无限'){
                $this->ajaxError('免费抽奖次数为 无限 时，抽奖次数上限必须为 无限');

            }
            if($info['free'] == '无限'){
                $info['free'] = -1;
            }
            if($info['day'] == '无限'){
                $info['day'] = -1;
            }

            $r = M('vote_act')->where(['id'=>$info['id']])->save($info);
            if($r){
                $this->ajaxSuccess('修改成功');
            }else{
                $this->ajaxError('修改失败');
            }
        }else{
            $id = I('get.id');
            $info  =  M('vote_act')->where(['display'=>1,'id'=>$id])->find();
            if($info['type'] == 1){
                $info['n'] = 'selected';
            }else{
                $info['p'] = 'selected';
            }

            if($info['free'] == -1){
                $info['free'] ='无限';
            }
            if($info['day'] == -1){
                $info['day'] = '无限';
            }


            $this->assign('title','活动编辑');
            $this->assign('id',$id);
            $this->assign('info',$info);
            $this->display('act_add');
        }
    }
    //活动删除
    public function act_del(){
        $id = I('post.id');
        $r = M('vote_act')->where(['id'=>$id])->save(['display'=>0]);
        if($r){
            $this->ajaxSuccess('删除成功');
        }else{
            $this->ajaxError('删除失败');
        }

    }




    //添加选项
    public function option_add(){
        if(IS_POST){
            $info = I('post.');
            $required = [
                'act_id'=>'请选择所属活动',
                'title'=>'请填写选项标题',
                'chance'=>'请填写概率',
                'add'=>'请选择是否加入记录'
            ];

            $res = required($required,$info);
            if($res['Error']){
                $this->ajaxError($res['Msg']);
            }
            $act_arr = M('vote_act')->field(['type'])->where(['id'=>$info['act_id'],'display'=>1])->find();
            if(!$act_arr){
                $this->ajaxError('参数错误');
            }
            if($act_arr['type'] == 1){//数字型
                if(num_str($info['chance'],'num')){
                    $this->ajaxError('请正确填写 数字型 奖项个数');
                }

            }else{
                if(num_str($info['chance'],'num')){
                    $this->ajaxError('请正确填写 概率型 获奖概率');
                }
            }
            $insert['add'] = $info['add'];
            $insert['act_id'] = $info['act_id'];
            $insert['inputtime'] = time();
            $insert['display'] = 1;
            $insert['act_id'] = $info['act_id'];
            $insert['chance'] = $info['chance'];
            $insert['title'] = $info['title'];
            $insert['img'] = $info['img'];
            $insert['functions'] = $info['functions'];
            $insert['functions_field'] = $info['functions_field'];
            $insert['note'] = $info['note'];
            $insert['text'] = $info['text'];
            $insert['record'] = 0;

            $r = M('vote_option')->add($insert);
            if($r){
                $this->ajaxSuccess('添加成功');
            }else{
                $this->ajaxSuccess('添加失败');
            }

        }else{
            $act_arr = M('vote_act')->where(['display'=>1])->select();
            $this->assign('act',$act_arr);
            $functions = M('vote_function')->where(['display'=>1])->select();
            $this->assign('function',$functions);
            $this->assign('title','添加选项');
            $this->display();
        }
    }

    //选项列表
    public function option_list(){
        $page = I('get.p')?I('get.p'):1;
        $pagesize = I('get.pagesize')?I('get.pagesize'):10;
        $where['display'] = 1;
        $act_arr = M('vote_act')->where(['display'=>1])->select();
        foreach($act_arr as $k=>$v){
            $act_arrr[$v['id']] = $v;
        }
        $functions = M('vote_function')->where(['display'=>1])->select();
        foreach($functions as $k=>$v){
            $functions_arr[$v['id']] = $v;
        }


        //搜索

        //按活动id搜索
        if(I('get.act_id')){
            $where['act_id'] = I('get.act_id');
            $act_arrr[I('get.act_id')]['selected'] = 'selected';
        }

        $this->assign('act',$act_arrr);

        $data = getlist('vote_option',$page,$pagesize,$where,['inputtime'=>'desc']);
        if($data['count']){
            foreach($data['list'] as $k=>$v){
                $data['list'][$k]['inputtime'] = date('Y-m-d H:i:s',$v['inputtime']);
                $data['list'][$k]['do_add'] = $v['do_add']==1?'添加':'不添加';
                $data['list'][$k]['do_act'] = $act_arrr[$v['act_id']]['title'];
                $data['list'][$k]['functions'] = $functions_arr[$v['functions']]['title'];
                $data['list'][$k]['add'] = $v['add'] == 1?'记录':'不记录';
            }
        }

        $this->assign('list',$data['list']);
        $this->assign('page',$data['page']);
        $this->display();
    }

    //选项编辑
    public function option_edit(){
        if(IS_POST){
            $info = I('post.');
            $required = [
                'title'=>'请填写选项标题',
                'chance'=>'请填写概率',
                'add'=>'请选择是否加入记录'
            ];
            $res = required($required,$info);
            if($res['Error']){
                $this->ajaxError($res['Msg']);
            }

            $insert['add'] = $info['add'];
            $insert['updatetime'] =time();
            $insert['chance'] = $info['chance'];
            $insert['title'] = $info['title'];
            $insert['img'] = $info['img'];
            $insert['functions'] = $info['functions'];
            $insert['functions_field'] = $info['functions_field'];
            $insert['note'] = $info['note'];
            $insert['text'] = $info['text'];

            $r = M('vote_option')->where(['id'=>$info['id']])->save($insert);

            if($r){

                $this->ajaxSuccess('修改成功');
            }else{
                $this->ajaxError('修改失败');
            }





        }else{
            $id = I('get.id');
            $this->assign('id',$id);
            //信息
            $option_arr = M('vote_option')->where(['id'=>$id])->find();
            if($option_arr['add'] == 1){
                $option_arr['y'] = 'selected';
            }else{
                $option_arr['n'] = 'selected';
            }
            $this->assign('info',$option_arr);

            //活动====不让改了
            $act_arr = M('vote_act')->where(['display'=>1])->select();
            foreach($act_arr as $k=>$v){
                $act_arrr[$v['id']] = $v;
            }
            $act_arrr[$option_arr['act_id']]['selected'] = 'selected';
            $this->assign('act',$act_arrr);

            //功能
            $functions = M('vote_function')->where(['display'=>1])->select();
            foreach($functions  as $k=>$v){
                $functionss[$v['id']] = $v;
            }
            $functionss[$option_arr['functions']]['selected'] = 'selected';
            $this->assign('function',$functionss);

            $this->assign('title','选项编辑');
            $this->display('option_add');



        }
    }

    //删除
    public function option_del(){
        $id = I('post.id');
        $r = M('vote_option')->where(['id'=>$id])->save(['display'=>0]);
        if($r){
            $this->ajaxSuccess('删除成功');
        }else{
            $this->ajaxError('删除失败');
        }
    }

    //获奖记录列表
    public function record_list(){
        $page = I('get.p')?I('get.p'):1;
        $pagesize = I('get.pagesize')?I('get.pagesize'):10;



        $where['display'] = 1;
        $where['show'] = 1;//显示的！！！！！！！！！！！！！！！
        //搜索
        if(I('get.phone')){
            $where['phone'] = ['LIKE','%'.I('get.phone').'%'];
        }

        if(I('get.uid')){
            $where['user_id'] = I('get.uid');
        }

        $data = getlist('vote_record',$page,$pagesize,$where,['inputtime'=>'desc']);
        if($data['count']){
            foreach($data['list'] as $k=>$v){
                $data['list'][$k]['inputtime'] = date('Y-m-d H:i:s',$v['inputtime']);
                $act_id[] = $v['act_id'];
            }

            $act_arr = M('vote_act')->where(['display'=>1,'id'=>['IN',$act_id]])->select();
            foreach($act_arr  as $k=>$v){
                $act_arrr[$v['id']] = $v;
            }
            foreach($data['list'] as $k=>$v){
                $data['list'][$k]['do_act_id'] = $act_arrr[$v['act_id']]['title'];
            }
        }


        $this->assign('list',$data['list']);
        $this->assign('page',$data['page']);
        $this->display();


    }
    //发放
    public function send(){
        $id  = I('post.id');
        $r = M('vote_record')->where(['display'=>1,'id'=>$id])->save(['status'=>2]);
        if($r){
            $this->ajaxSuccess('发放成功');
        }else{
            $this->ajaxError('发放失败');
        }
    }

    //清空记录
    public function clear_record(){
        $id = I('post.id');//活动id
        $r = M('vote_option')->where(['act_id'=>$id])->save(['record'=>0]);
        if($r){
            $this->ajaxSuccess('清空选项获奖次数成功');
        }else{
            $this->ajaxError('网络繁忙或未有中奖记录');
        }
    }





}