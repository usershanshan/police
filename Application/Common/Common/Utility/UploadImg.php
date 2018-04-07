<?php

/**
 * 上传七牛
 *
 */
class UploadImg {

    protected $config;
    protected $domain;
    protected $bucket;

    public function __construct($domain, $bucket) {
        $this->domain = $domain;
        $this->bucket = $bucket;
        $this->config = array(
            'maxSize' => 1024 * 1024 * 1024, //文件大小
            'rootPath' => './',
            'saveName' => array('uniqid', ''),
            'driver' => 'Qiniu',
            'driverConfig' => array(
                'secretKey' => 'Ar17u2UnAxKIIu1BnQJx4t6DeWMOFiZaWRrQ-Txl',  //七牛空间配置参数
                'accessKey' => 'J0LwFZrS4jSibgjBCNaCL-THjGvlSZr56qcOSiQC',
                'domain' => $this->domain, //空间地址
                'bucket' => $this->bucket, //空间名称
            )
        );
    }

  

    /**
     * 上传一个文件
     * @param array $file 文件参数
     * @return array 返回 code 与文件路径或错误信息
     */
    public function uploadOne($file) {
        $upload = new \Think\Upload($this->config);
        $info = $upload->uploadOne($file);
        if (!$info) {
            return [550, $upload->getError()];
        }
        return [200, $info['url']]; 
    }
    /**
     * 上传多图
     * @param type $files
     * @return array 返回 code 与文件路径数组 或错误信息
     */
    public function uploads($files) {
        $upload = new \Think\Upload($this->config);
        $info = $upload->upload($files);
        if (!$info) {
            return [550, $upload->getError()];
        }
        foreach ($info as $v) {
            $pArray[] = "http://".$this->domain."/".strtr($v['name'], '/', '_');
        }
        return [200, $pArray];
    }

}