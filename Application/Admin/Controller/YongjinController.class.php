<?php
/**
 * Created by PhpStorm.
 * User: zty
 * Date: 2018/2/9
 * Time: 13:19
 */

namespace Admin\Controller;


class YongjinController extends AdminBaseController
{
    //规则添加
    public function add(){
        if(IS_POST){
            $info = I('post.');
            $require = [
                'num'=>'请输入持仓金额',
                'price'=>'请输入奖励金额（每万）',
            ];
            $res = required($require,$info);
            if($res['Error']){
                $this->ajaxError($res['msg']);
            }

            if(num_str($info['num'],'price')){
                $this->ajaxError('请正确输入持仓金额');
            }
            if(num_str($info['price'],'price')){
                $this->ajaxError('请正确输入奖励金额（每万）');
            }
            if(M('yongjin')->where(['display'=>1,'num'=>$info['num']])->find()){
                $this->ajaxError('该持仓金额的规则已存在，请前往修改');
            }
            $info['inputtime'] = time();
            $info['display'] = 1;

            $r = M('yongjin')->add($info);
            if($r){
                $this->ajaxSuccess('添加成功');
            }else{
                $this->ajaxError('添加失败');
            }
        }else{
            $this->assign('title','规则添加');
            $this->display();
        }
    }
    //规则修改
    public function edit(){
        if(IS_POST){
            $id = I('post.id');
            $num = I('post.num');
            $price = I('post.price');
            if(!$num){
                $this->ajaxError('请输入持仓金额');
            }
            if(!$price){
                $this->ajaxError('请输入奖励金额（每万）');
            }
            if(num_str($num,'price')){
                $this->ajaxError('请正确输入持仓金额');
            }
            if(num_str($price,'price')){
                $this->ajaxError('请正确输入奖励金额（每万）');
            }
            if(M('yongjin')->where(['display'=>1,'num'=>$num,'id'=>['NEQ',$id]])->find()){
                $this->ajaxError('该持仓金额的规则已存在，请前往修改');
            }

            $update['num'] = $num;
            $update['price'] = $price;
            $update['updatetime'] = time();

            $r = M('yongjin')->where(['id'=>$id])->save($update);
            if($r){
                $this->ajaxSuccess('修改成功');
            }else{
                $this->ajaxError('修改失败');
            }


        }else{
            $this->assign('title','规则编辑');
            $id = I('get.id');
            $this->assign('id',$id);
            $info = M('yongjin')->where(['id'=>$id])->find();
            $this->assign('info',$info);
            $this->display('add');


        }
    }

    //规则列表
    public function lists(){
        $data = M('yongjin')->where(['display'=>1])->order(['num'=>'asc'])->select();
        foreach($data as $k=>$v){
            $data[$k]['inputtime'] = date('Y-m-d H:i:s',$v['inputtime']);
        }
        $this->assign('data',$data);
        $this->display();
    }


    public function del(){
        $id = I('post.id');
        $r = M('yongjin')->where(['id'=>$id])->save(['display'=>1]);
        if($r){
            $this->ajaxSuccess('删除成功');
        }else{
            $this->ajaxError('删除失败');
        }
    }

}