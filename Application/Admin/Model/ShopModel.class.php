<?php
/**
 * Created by PhpStorm.
 * User: zty
 * Date: 2017/12/20
 * Time: 17:13
 */

namespace Admin\Model;


class ShopModel
{
    public $type ;
    public function __construct(){
        $this->type = M('shop_type');
        $this->good = M('shop_goods');
        $this->order = M('shop_order');

    }

    /**
     * 获取子孙树
     * @param   array        $data   待分类的数据
     * @param   int/string   $id     要找的子节点id
     * @param   int          $lev    节点等级
     */
    public function gettree($data , $id = 0 ) {
        static $son = array();
        foreach($data as $key => $value) {
            if($value['parent'] == $id) {
                $son[] = $value;
                $this->gettree($data , $value['id'] );
            }
        }
        return $son;
    }

    public function get($mod,$where){
        return $this->$mod->where($where)->select();

    }

    public function num_str($str,$type,$num=0){
        switch($type){
            case 'phone':
                //电话号 正则匹配

//        验证手机号码
//        *
//        移动号段：139 138 137 136 135 134 147 150 151 152 157 158 159 178 182 183 184 187 188
//        联通号段：130 131 132 155 156 185 186 145 176
//        电信号段：133 153 177 173 180 181 189
                if(!preg_match('/13[0123456789]{1}\d{8}|15[012356789]{1}\d{8}|14[57]{1}\d{8}|17[3678]{1}\d{8}|18[0123456789]{1}\d{8}/',$str)){
                    return true;
                }
                break;
            case 'char':
                if(mb_strlen($str)>$num){
                    return true;
                }
                break;
            case 'num':
                if(!preg_match('/^\d+$/',$str)){
                    return true;
                }
                break;
            case 'price':
                if(!preg_match(' /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/',$str)){
                    return true;
                }
                break;
            case 'tel':
                if(!preg_match(' /^(\d{2,4}-?)?\d{7,8}$/',$str)){
                    return true;
                }
                break;

        }

    }

    public function find($mod,$where){
        return $this->$mod->where($where)->find();
    }

    public function add($mod,$data){
        return $this->$mod->add($data);
    }

    public function update($mod,$where,$data){
        return $this->$mod->where($where)->save($data);
    }

    public function del($mod,$where){
        return $this->$mod->where($where)->delete();
    }

    public function required($required = array(),$info){
        if(!$required){
            return array('Error'=>0,'Msg'=>'没有设置必填项');
        }
        foreach($required as $requiredkey => $requiredvalue){
            if(!isset($info[$requiredkey]) || empty($info[$requiredkey])){
                return array('Error' => 1,'Msg' => $requiredvalue);
            }
        }
        return array('Error'=> 0, 'Msg'=>'成功');
    }

    public function getlist($mod,$page,$pagesize,$where,$order){
    $info = $this->$mod->where($where)->order($order)->page($page,$pagesize)->select();
    $count = $this->$mod->where($where)->count();
    $Page       = new \Think\Page($count,$pagesize);
    $show       = $Page->show();// 分页显示输出
    return ['list'=>$info,'count'=>$count,'page'=>$show];
}

    public function count($mod,$where){
        return $this->$mod->where($where)->count();
    }
}