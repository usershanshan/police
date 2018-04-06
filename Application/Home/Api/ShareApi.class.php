<?php
/**
 * Created by PhpStorm.
 * User: zty
 * Date: 2018/1/29
 * Time: 10:26
 */

namespace Home\Api;


class ShareApi
{
    private $appkey = "1fd35ea313c9c9015e5f8f5d7e9e71f9";//股市api，应挪配置文件
    private $url = "http://web.juhe.cn:8080/finance/stock/hs";//网址

    //阿里云
    private $appcode='b4c7ddf94771440f98fa0573b542f866';


    //根据股票编码查股票数据（单一编码）
    public function oneInfo($gid){
        $params = array(
            "gid" => $gid,//股票编号，上海股市以sh开头，深圳股市以sz开头如：sh601009
            "key" => $this->appkey,//APP Key
        );
        $paramstring = http_build_query($params);
        $content = $this->juhecurl($this->url,$paramstring);
        $result = json_decode($content,true);
        if($result){
            return ['error'=>0,'msg'=>'请求成功','data'=>$result];
        }else{
            return ['error'=>1,'msg'=>"请求失败"];
        }
    }

    public function dapan($type){
        $params = array(
            "type" => $type,//0-上证  1-深证
            "key" => $this->appkey,//APP Key
        );
        $paramstring = http_build_query($params);
        $content = $this->juhecurl($this->url,$paramstring);
        $result = json_decode($content,true);
        if($result['error_code'] == 0){
            return $result['result'];
        }else{
            return [];
        }
    }



    /**
     * 请求接口返回内容
     * @param  string $url [请求的URL地址]
     * @param  string $params [请求的参数]
     * @param  int $ipost [是否采用POST形式]
     * @return  string
     */
    private function juhecurl($url,$params=false,$ispost=0){
        $httpInfo = array();
        $ch = curl_init();//初始一个curl会话

        curl_setopt( $ch, CURLOPT_HTTP_VERSION , CURL_HTTP_VERSION_1_1 );
        curl_setopt( $ch, CURLOPT_USERAGENT , 'JuheData' );
        curl_setopt( $ch, CURLOPT_CONNECTTIMEOUT , 60 );
        curl_setopt( $ch, CURLOPT_TIMEOUT , 60);
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER , true );
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        if( $ispost )
        {
            curl_setopt( $ch , CURLOPT_POST , true );
            curl_setopt( $ch , CURLOPT_POSTFIELDS , $params );
            curl_setopt( $ch , CURLOPT_URL , $url );
        }
        else
        {
            if($params){
                curl_setopt( $ch , CURLOPT_URL , $url.'?'.$params );
            }else{
                curl_setopt( $ch , CURLOPT_URL , $url);
            }
        }
        $response = curl_exec( $ch );
        if ($response === FALSE) {
            //echo "cURL Error: " . curl_error($ch);
            return false;
        }
        $httpCode = curl_getinfo( $ch , CURLINFO_HTTP_CODE );
        $httpInfo = array_merge( $httpInfo , curl_getinfo( $ch ) );
        curl_close( $ch );
        return $response;
    }



    //批量查询
    public function batchlist($gid_arr){
        $chList = array();
        foreach($gid_arr as $k=>$v){
            $params = array(
                "gid" => $v,//股票编号，上海股市以sh开头，深圳股市以sz开头如：sh601009
                "key" => $this->appkey,//APP Key
            );
            $paramstring = http_build_query($params);
            $chList[] =  $this->getCurlObject($this->url.'?'.$paramstring);
        }


        // 创建多请求执行对象
        $downloader = curl_multi_init();

        // 将三个待请求对象放入下载器中
        foreach ($chList as $ch){
            curl_multi_add_handle($downloader,$ch);
        }

        // 轮询
        do {
            while (($execrun = curl_multi_exec($downloader, $running)) == CURLM_CALL_MULTI_PERFORM) ;
            if ($execrun != CURLM_OK) {
                break;
            }

            // 一旦有一个请求完成，找出来，处理,因为curl底层是select，所以最大受限于1024
            while ($done = curl_multi_info_read($downloader))
            {
                // 从请求中获取信息、内容、错误
                //$info = curl_getinfo($done['handle']);
                $output[] = json_decode(curl_multi_getcontent($done['handle']),true);
                //$error = curl_error($done['handle']);

                // 将请求结果保存,我这里是打印出来
//                echo json_encode($output);
                //        print "一个请求下载完成!\n";

                // 把请求已经完成了得 curl handle 删除
                curl_multi_remove_handle($downloader, $done['handle']);
            }

            // 当没有数据的时候进行堵塞，把 CPU 使用权交出来，避免上面 do 死循环空跑数据导致 CPU 100%
            if ($running) {
                $rel = curl_multi_select($downloader, 1);
                if($rel == -1){
                    usleep(1000);
                }
            }

            if( $running == false){
                break;
            }
        } while (true);

        return $output;



    }
    /**
     * 根据url,postData获取curl请求对象,这个比较简单,可以看官方文档
     */
    private function getCurlObject($url,$postData=array(),$header=array()){
        $options = array();
        $url = trim($url);
        $options[CURLOPT_HTTP_VERSION] = CURL_HTTP_VERSION_1_1;
        $options[CURLOPT_USERAGENT] = JuheData;
        $options[CURLOPT_CONNECTTIMEOUT] = 60;
        $options[CURLOPT_TIMEOUT] = 60;
        $options[CURLOPT_RETURNTRANSFER] = true;
        $options[CURLOPT_FOLLOWLOCATION] = true;
        $options[CURLOPT_URL] = $url;
        foreach($header as $key=>$value){
            $options[$key] =$value;
        }
        if(!empty($postData) && is_array($postData)){
            $options[CURLOPT_POST] = true;
            $options[CURLOPT_POSTFIELDS] = http_build_query($postData);
        }
        if(stripos($url,'https') === 0){
            $options[CURLOPT_SSL_VERIFYPEER] = false;
        }
        $ch = curl_init();
        curl_setopt_array($ch,$options);

        return $ch;
    }

    //阿里云搜索接口
    public function api51_curl($url,$data=false,$ispost=0){

        $headers = array();
        //根据阿里云要求，定义Appcode
        array_push($headers, "Authorization:APPCODE " . $this->appcode);
        array_push($headers, "Content-Type".":"."application/x-www-form-urlencoded; charset=UTF-8");

        $httpInfo = array();

        $ch = curl_init();
        curl_setopt( $ch, CURLOPT_HTTP_VERSION , CURL_HTTP_VERSION_1_1 );
        curl_setopt( $ch, CURLOPT_USERAGENT , 'api51.cn' );
        curl_setopt( $ch, CURLOPT_CONNECTTIMEOUT , 300 );
        curl_setopt( $ch, CURLOPT_TIMEOUT , 300);
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER , true );
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_FAILONERROR, false);
        if (1 == strpos("$".$url, "https://"))
        {
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        }
        if($ispost)
        {
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
            curl_setopt( $ch , CURLOPT_POST , true );
            curl_setopt( $ch , CURLOPT_POSTFIELDS , $data );
            curl_setopt( $ch , CURLOPT_URL , $url );
        }
        else
        {
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
            if($data){
                curl_setopt( $ch , CURLOPT_URL , $url.'?'.$data );

            }else{
                curl_setopt( $ch , CURLOPT_URL , $url);
            }

        }
        $response = curl_exec( $ch );
        if ($response === FALSE) {
             //echo "cURL Error: " . curl_error($ch);
            return false;
        }
        $httpCode = curl_getinfo( $ch , CURLINFO_HTTP_CODE );
        $httpInfo = array_merge( $httpInfo , curl_getinfo( $ch ) );
        curl_close( $ch );
        return $response;

    }







}