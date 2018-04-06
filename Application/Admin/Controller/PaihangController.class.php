<?php
/**
 * Created by PhpStorm.
 * User: zty
 * Date: 2018/3/27
 * Time: 13:38
 */

namespace Admin\Controller;


class PaihangController extends AdminBaseController
{
    //添加
    public function  add(){
        if(IS_POST){
            $info = I('post.');
            $require = [
              'user'=>'请输入会员名',
              'num'=>'请输入策略数',
              'balance'=>'请输入盈利'
            ];
            $res = required($require,$info);
            if($res['Error']){
                $this->ajaxError($res['Msg']);
            }
            if(num_str($info['num'],'num')){
                $this->ajaxError('请正确输入策略数');
            }
            if(num_str($info['balance'],'num')){
                $this->ajaxError('请正确输入盈利');
            }

            $info['display'] = 1;
            $info['inputtime']  = time();

            $r = M('paihang')->add($info);
            if($r){
                $this->ajaxSuccess('添加成功');
            }else{
                $this->ajaxError('添加失败');
            }
        }else{
            $this->assign('title','添加排行信息');
            $this->display();
        }
    }

    //列表
    public function lists(){
        $order = 1;
        $data = M('paihang')->where(['display'=>1])->order(['balance'=>'desc'])->select();
        foreach($data as $k=>$v){
            $data[$k]['inputtime'] = date('Y-m-d H:i:s',$v['inputtime']);
            $data[$k]['order'] = $order;
            $order ++;
        }
        $this->assign('list',$data);
        $this->display();
    }

    //编辑
    public function edit(){
        if(IS_POST){
            $info = I('post.');
            $require = [
                'user'=>'请输入会员名',
                'num'=>'请输入策略数',
                'balance'=>'请输入盈利'
            ];
            $res = required($require,$info);
            if($res['Error']){
                $this->ajaxError($res['Msg']);
            }
            if(num_str($info['num'],'num')){
                $this->ajaxError('请正确输入策略数');
            }
            if(num_str($info['balance'],'num')){
                $this->ajaxError('请正确输入盈利');
            }
            $r = M('paihang')->save($info);
            if($r){
                $this->ajaxSuccess('修改成功');
            }else{
                $this->ajaxError('修改失败');
            }
        }else{
            $id = I('get.id');
            $this->assign('id',$id);
            $info = M('paihang')->where(['id'=>$id,'display'=>1])->find();
            $this->assign('title','排行信息修改');
            $this->assign('info',$info);
            $this->display('add');
        }


    }

    //
    public function del(){
        $id = I('id');
        $r = M('paihang')->where(['id'=>$id,'display'=>1])->save(['display'=>0]);
        if($r){
            $this->ajaxSuccess('删除成功');
        }else{
            $this->ajaxError('删除失败');
        }
    }

}