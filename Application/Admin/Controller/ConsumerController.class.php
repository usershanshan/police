<?php
/**
 * Created by PhpStorm.
 * User: zty
 * Date: 2018/1/2
 * Time: 16:10
 */

namespace Admin\Controller;


class ConsumerController extends AdminBaseController
{

    /**
     * 新用户添加
     *
     * @access public
     * @param string $info['phone']  电话
     *         string $info['password']  密码
     *         string $info['password1']  确认密码
     *         int $info['referee_id'] 推荐人 id
     * @return boolean
     */
    public function consumerAdd(){
        $user = M('user');
        $setting = M('setting');
        if(IS_POST){
            $info = I('post.');
            $require=[
                'phone'=>'请填写手机号',
            ];
            $res = required($require,$info);
            if($res['Error']){
                $this->ajaxError($res['Msg']);
            }
            if(!$info['password']){//为空，使用默认密码
                $info['password'] = $info['password1'] = 'abc123456';
            }
            if(!$info['referee_id'] && $info['referee_id'] !== '0'){
                $this->ajaxError('请填写推荐人手机号');
            }
            if(num_str($info['phone'],'phone')){
                $this->ajaxError('请填写正确的注册手机号');
            }
            if(!regex($info['password'],'password')){
                $this->ajaxError('密码必须是包含数字和字母，且在6-18位');
            }
            if($info['password'] != $info['password1']){
                $this->ajaxError('两次密码不一致');
            }
            $info['password'] = md5($info['password']);
            unset($info['password1']);
            if(num_str($info['referee_id'],'phone') && $info['referee_id']){
                $this->ajaxError('请正确填写推荐人手机号');
            }
            $info['inputtime'] = time();
            $info['display'] = 1;
            $info['mark'] = 1;
            //===================================================================================================新手红包
            $set_arr = $setting->where(['display'=>1])->find();//获取设置

            //===================================================================================================
            $k = $user->where(['phone'=>$info['phone']])->find();//手机号不能重复,被禁用也不行！
            if($k){
                $this->ajaxError('该手机已被注册');
            }
            //事务开始
            M()->startTrans();
            if($info['referee_id']){
                $user_arr = $user->where(['phone'=>$info['referee_id'],'display'=>1])->find();//推荐人数组，禁用不行
                if($user_arr){
                    $info['referee_id'] = $user_arr['id'];//插入推荐人id

                    //给推荐人加钱================================================================================

                    if($set_arr['new_key']){//是否推荐   有佣金
                       $rr =  D('Home/Input')->addInput($user_arr['id'],1,$set_arr['new_value'],'money',$user_arr['phone'],$order_id = '0');
                    }

                    //======================================================================================
                }else{
                    $this->ajaxError('推荐人不存在，或已被禁用');
                }
            }

            $r[] = $user->add($info);
            $r = array_merge($r,$rr);
            if(in_array(false,$r)){
                M()->rollback();
                $this->ajaxError('添加失败');
            }else{
                M()->commit();
                $this->ajaxSuccess('添加成功');
            }

        }else{
            $this->assign('title','添加客户');
            $this->display();
        }
    }

    //用户列表   v
    public function consumerList(){
        $page = I('get.p')?I('get.p'):1;
        $pagesize = I('get.pagesize')?I('get.pagesize'):10;
        $phone = I('get.phone');//电话搜索
        if($phone){
            $where['phone'] = ['LIKE',"%{$phone}%"];
        }
        $user_id = [];
        $data = getlist('user',$page,$pagesize,$where,['inputtime'=>'desc']);
        if($data['count']){
            foreach($data['list'] as $k=>$v){
                $data['list'][$k]['inputtime'] = date('Y-m-d H:i:s',$v['inputtime']);
                $user_id[] = $v['referee_id'];
            }
            if($user_id){
                $user = M('user')->where(['id'=>['in',$user_id]])->field(['id','phone'])->select();
                foreach($user as $k=>$v){
                    $user_arr[$v['id']] = $v;
                }
            }
            foreach($data['list'] as $k=>$v){
                $data['list'][$k]['referee_phone'] = $user_arr[$v['referee_id']]['phone']?$user_arr[$v['referee_id']]['phone']:'无推荐人';
            }
        }
        $this->assign('info',$data['list']);
        $this->assign('page',$data['page']);

        $this->display();
    }
    //用户禁用  V
    public function consumerDel(){

            $id = I('post.id');
            $rule = M('user');
            $r = $rule->where(['id'=>$id])->save(['display'=>0]);
            if($r){
                $this->ajaxSuccess('禁用成功');

            }else{
                $this->ajaxError('禁用失败');
            }

    }
    //用户启用 V
    public function consumerReset(){

        $id = I('post.id');
        $rule = M('user');
        $r = $rule->where(['id'=>$id])->save(['display'=>1]);
        if($r){
            $this->ajaxSuccess('启用成功');

        }else{
            $this->ajaxError('启用失败');
        }

    }
    //用户编辑   V
    public function consumerEdit(){
        $user = M('user');
        $info = I('get.');


        if($info['edit'] == 1){
            unset($info['edit']);
            unset($info['/Admin/Consumer/consumerEdit/id/Admin/Setting/edit']);
            $id = $info['id'];
            foreach($info as $k=>$v){
                if(preg_match(' /^bank_name\d*$/',$k)){//如果匹配了
                    if($v == '#无'){
                        unset($info[$k]);
                    }else{
                        $info['bank_info'][substr($k,9)]['bank_name'] = $v;
                        unset($info[$k]);
                    }

                }
                if(preg_match(' /^bank_number\d*$/',$k)){//如果匹配了
                    if($v == '#无'){
                        unset($info[$k]);
                    }else{
                        $info['bank_info'][substr($k,11)]['bank_number'] = $v;
                        unset($info[$k]);
                    }

                }

            }


            $user_arr = $user->where(['phone'=>$info['phone'],'id'=>['NEQ',$id]])->find();//与自身不相等的其他
            if(!$info['phone']){
                $this->ajaxError('请填写手机号');
            }
            if(num_str($info['phone'],'phone')){
                $this->ajaxError('请正确填写手机号');
            }
            if($user_arr){
                $this->ajaxError('该手机号已被注册');
            }
            $update['phone'] = $info['phone'];
            $update['name'] = $info['name'];
            $update['idcard'] = $info['idcard'];
            if(count($info['bank_info']) > 3){
                $this->ajaxError('只能绑定三张银行卡');
            }
            foreach($info['bank_info'] as $k=>$v){
                if(!$v['bank_name']){
                    $this->ajaxError('请输入银行名称');
                }
                if(num_str($v['bank_number'],'bank')){
                    $this->ajaxError('请正确输入银行卡号');
                }
                $info['bank_info'][$k]['id'] = date('YmdHis',time()).rand(1000,9999);

            }
            $update['bank_info'] = json_encode($info['bank_info']);

            $r = $user->where(['id'=>$id])->save($update);

            if($r){
                $this->ajaxSuccess('修改成功');
            }else{
                $this->ajaxError('修改失败');
            }
        }else{
            $id = I('get.id');
            $this->assign('title','客户编辑');
            $info = $user->where(['id'=>$id])->find();
            if(!$info){
                $this->Error('参数错误');
            }
            $info['bank_info'] = json_decode($info['bank_info'],true);
            $this->assign('info',$info);
            $this->assign('id',$id);
            $this->display();
        }
    }
    //用户详情菜单URL  V
    public function ConsumerMenu(){
        $id = I('get.id');//放URL里
        $info['password']['url'] = U('Consumer/password?id='.$id);
        $info['password']['name'] = '修改密码';
        $info['money']['url'] = U('Consumer/money?id='.$id);
        $info['money']['name'] = '修改账户余额';
        $info['red']['url'] = U('Consumer/red?id='.$id);
        $info['red']['name'] = '修改现金红包余额';
        $info['input']['url'] = U('Report/inputList?uid='.$id);
        $info['input']['name'] = '收入列表';
        $info['output']['url'] = U('Report/outputList?uid='.$id);
        $info['output']['name'] = '支出列表';
        $info['order']['url'] = U('Report/orderList?uid='.$id);
        $info['order']['name'] = '订单列表';
        $info['deposit']['url'] = U('Report/depositList?uid='.$id);
        $info['deposit']['name'] = '充值列表';
        $info['cash']['url'] = U('Report/cashList?uid = '.$id);
        $info['cash']['name'] = '提现列表';
        $info['vote']['url'] = U('Vote/record_list?uid='.$id);
        $info['vote']['name'] = '获奖记录';


        $this->assign('info',$info);
        $this->display();

    }

    public function password(){
        if(IS_POST){
            $id = I('post.id');
            $password = I('post.password');
            if($password){
                if(!regex($password,'password')){
                    $this->ajaxError('密码必须是包含数字和字母，且在6-18位');
                }
            }else{
                $password = 'abc123456';
            }
            $user_arr = M('user')->where(['id'=>$id])->find();
            if(md5($password) == $user_arr['password']){
                $this->ajaxError('不能与原密码相同');
            }

            $r = M('user')->where(['id'=>$id])->save(['password'=>md5($password)]);
            if($r){
                $this->ajaxSuccess('修改密码成功');
            }else{
                $this->ajaxError('修改密码失败');
            }
        }else{
            $id = I('get.id');
            $this->assign('id',$id);
            $this->display();
        }

    }

    //修改余额。存表
    public function money(){
        $user = M('user');
        if(IS_POST){
            $id=I('post.id');
            $money = I('post.money');
            if(num_str($money,'price')){
                $this->ajaxError('请正填写用户余额');
            }
            $user_arr = $user->where(['id'=>$id])->find();
            $info['admin_user_id'] =  session('user_info')['id'];
            $info['admin_user_name'] =  session('user_info')['user_name'];
            $info['user_id'] =  $user_arr['id'];
            $info['phone'] =  $user_arr['phone'];
            $info['price_s'] =  $user_arr['money'];
            $info['price_e'] =  $money;
            $info['inputtime'] = time();
            $info['display'] = 1;
            M()->startTrans();

            $r[] = $user->where(['id'=>$id])->save(['money'=>$money]);
            $r[] = M('edit_money')->add($info);
            if(!in_array(false,$r)){
                M()->commit();
                $this->ajaxSuccess('更改成功');
            }else{
                M()->rollback();
                $this->ajaxError('更改失败');
            }




        }else{
            $id = I('get.id');
            $this->assign('id',$id);
            $user_arr = $user->where(['id'=>$id])->find();
            $this->assign('money',$user_arr['money']);
            $this->display();

        }
    }

    //修改红包。存表
    public function red(){
        $user = M('user');
        if(IS_POST){
            $id=I('post.id');
            $red = I('post.red');
            if(num_str($red,'price')){
                $this->ajaxError('请正填写现金红包余额');
            }
            $user_arr = $user->where(['id'=>$id])->find();
            $info['admin_user_id'] =  session('user_info')['id'];
            $info['admin_user_name'] =  session('user_info')['user_name'];
            $info['user_id'] =  $user_arr['id'];
            $info['phone'] =  $user_arr['phone'];
            $info['price_s'] =  $user_arr['red'];
            $info['price_e'] =  $red;
            $info['inputtime'] = time();
            $info['display'] = 1;
            M()->startTrans();

            $r[] = $user->where(['id'=>$id])->save(['red'=>$red]);
            $r[] = M('edit_red')->add($info);
            if(!in_array(false,$r)){
                M()->commit();
                $this->ajaxSuccess('更改成功');
            }else{
                M()->rollback();
                $this->ajaxError('更改失败');
            }




        }else{
            $id = I('get.id');
            $this->assign('id',$id);
            $user_arr = $user->where(['id'=>$id])->find();
            $this->assign('red',$user_arr['red']);
            $this->display();

        }
    }

    public function editMoneyList(){
        $page = I('get.p')?I('get.p'):1;
        $pagesize = I('get.pagesize')?I('get.pagesize'):10;
        $data = getlist('edit_money',$page,$pagesize,['display'=>1],['inputtime'=>'desc']);
        if($data['count']){

            foreach($data['list'] as $k=>$v){
                $data['list'][$k]['inputtime'] = date('Y-m-d H:i:s',$v['inputtime']);
            }
        }
        $this->assign('info',$data['list']);
        $this->assign('page',$data['page']);
        $this->display();

    }

    public function editRedList(){
        $page = I('get.p')?I('get.p'):1;
        $pagesize = I('get.pagesize')?I('get.pagesize'):10;
        $data = getlist('edit_red',$page,$pagesize,['display'=>1],['inputtime'=>'desc']);
        if($data['count']){

            foreach($data['list'] as $k=>$v){
                $data['list'][$k]['inputtime'] = date('Y-m-d H:i:s',$v['inputtime']);
            }
        }
        $this->assign('info',$data['list']);
        $this->assign('page',$data['page']);
        $this->display();

    }

}