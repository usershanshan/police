<?php
/**
 * Created by PhpStorm.
 * User: zty
 * Date: 2018/1/22
 * Time: 15:02
 */

namespace Home\Controller;


class TuwenController extends  AfterLandingController
{


    //图文获取（列表）
    public function lists(){
        $identy = I('post.identy');//获取关键字
        if(!$identy){
            $this->ajaxError('参数错误');
        }
        $tuwen_type = M('tuwen_type');
        if(!$tuwen_type->where(['identy'=>$identy])->find()){
            $insert_ini['display'] = 1;
            $insert_ini['inputtime'] = time();
            $insert_ini['identy'] = $identy;
            $insert_ini['type'] = 2;//列表
            $r = $tuwen_type->add($insert_ini);
            if(!$r){
                $this->ajaxError('数据初始化失败');
            }
        }

        $page = I('post.page')?I('post.page'):1;
        $pagesize = I('post.pagesize')?I('post.pagesize'):10;
        $where['type'] = $identy;
        $where['display'] = 1;

        $data = getlist('tuwen_list',$page,$pagesize,$where,['orders'=>'asc','inputtime'=>'asc']);
        unset($data['page']);
        if($data['count']){
            foreach($data['list'] as $k=>$v){
                $data['list'][$k]['text'] = htmlspecialchars_decode($v['text']);
            }
        }

        $this->ajaxSuccess('数据获取成功',$data);
    }
    //图文获取（单条）
    public function Infos(){
        $identy = I('post.identy');//获取关键字
        if(!$identy){
            $this->ajaxError('参数错误');
        }
        $tuwen_type = M('tuwen_type');
        if(!$tuwen_type->where(['identy'=>$identy])->find()){
            $insert_ini['display'] = 1;
            $insert_ini['inputtime'] = time();
            $insert_ini['identy'] = $identy;
            $insert_ini['type'] = 1;//单条
            $r = $tuwen_type->add($insert_ini);
            if(!$r){
                $this->ajaxError('数据初始化失败');
            }
        }

        $where['display'] = 1;
        $where['type'] = $identy;
        $info = M('tuwen_list')->where($where)->find();
        $this->ajaxSuccess('数据获取成功',$info);

    }


    //图文获取列表分类
    public function typeList(){
        $tuwen_type = M('tuwen_type');
        $type_arr = $tuwen_type->field(['title','identy'])->where(['type'=>2])->order(['orders'=>'desc','inputtime'=>'asc'])->select();
        $this->ajaxSuccess('数据获取成功',$type_arr);

    }

    //获取全部单条
    public function info_all()
    {
        $type = M('tuwen_type');
        $type_arr = $type->field(['identy'])->where(['type'=>1])->select();

        foreach($type_arr as $k=>$v){
            $type_one[] = $v['identy'];
        }

        $list = M('tuwen_list');

        $data = $list->where(['type'=>['IN',$type_one],'display'=>1])->select();
        $this->ajaxSuccess('获取数据成功',['data'=>$data]);
    }
}