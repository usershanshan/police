<?php
namespace Common\Controller;

use Think\Controller;
use Home\Api\WxApi;

class CommonController extends Controller
{ 
    public function __construct()
    {
    	parent::__construct();
        session('USER_INFO', ['id'=>25]);
    }
    
    /**
     * ription:错误返回
     *
     * @param string $msg
     * @param unknown $fields
     */
    protected function ajaxError($msg = '', $fields = array()) {
        header ( 'Content-Type:application/json; charset=utf-8' );
        $data = array (
            'status' => 'error',
            'msg' => $msg,
            'fields' => $fields
        );
        echo json_encode ( $data );
        exit ();
    }
    protected function ajaxSuccess($msg, $_data = array(),$url=false) {
        header ( 'Content-Type:application/json; charset=utf-8' );
        $data = array (
            'status' => 'success',
            'msg' => $msg,
            'data' => $_data,
            'url'=>$url,
        );
        echo json_encode ( $data );
        exit ();
    }
//
//    public function _empty()
//    {
//        header("HTTP/1.0 404 Not Found");
//        $this->display('Public:404');
//    }
    
}

