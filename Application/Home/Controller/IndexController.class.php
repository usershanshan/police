<?php
namespace Home\Controller;

class IndexController extends HomeController  {

    //招聘
    public function recruit(){
        //招聘内容id
        $key = true;
        $recruit_id = I('get.recruit_id');
        if($recruit_id){
            $key = false;
            $content = M('recruit_content')->where(['id'=>$recruit_id])->find();
        }


        $type = M('recruit_type')->where(['display'=>1])->order(['orders'=>'asc'])->select();

        foreach($type as $k=>$v){
            $type[$k]['content'] = M('recruit_content')->where(['display'=>1,'type_id'=>$v['id']])->order(['orders'=>'asc'])->select();
            //第一次点击
            if($key == true){
                $content = $type[$k]['content'][0];
                $key = false;

            }
        }

        $content['content'] = htmlspecialchars_decode($content['content']);
        $content['content_en'] = htmlspecialchars_decode($content['content_en']);


        $this->assign('now_recruit','now');
        $this->assign('type',$type);
        $this->assign('content',$content);
        $this->display();
    }

    //案例
    public function cases(){
        $key = true;
        $case_id = I('get.case_id');
        if($case_id){
            $key = false;
            $content = M('case_content')->where(['display'=>1,'type_id'=>$case_id])->order(['orders'=>'asc'])->select();
            $title = M('case_type')->where(['display'=>1,'id'=>$case_id])->find()['title'];
            $title_en = M('case_type')->where(['display'=>1,'id'=>$case_id])->find()['title_en'];
        }


        $type = M('case_type')->where(['display'=>1])->order(['orders'=>'asc'])->select();


            if($key){
                $content = M('case_content')->where(['display'=>1,'type_id'=>$type[0]['id']])->order(['orders'=>'asc'])->select();
                $title = $type[0]['title'];
                $title_en = $type[0]['title_en'];
                $key =false;

            }


        $this->assign('now_case','now');
        $this->assign('title',$title);
        $this->assign('title_en',$title_en);
        $this->assign('type',$type);
        $this->assign('content',$content);
        $this->display();


    }

    //关于我们
    public function our(){
        $our_id = I('get.our_id');
        $page = I('get.page')?I('get.page'):1;
        $pagesize = I('get.pagesize')?I('get.pagesize'):10;
        $key = true;
        if($our_id){
            $typef = M('our_type')->where(['display'=>1,'id'=>$our_id])->find();
            $title = $typef['title'];
            $title_en = $typef['title_en'];
            if($typef['type'] == 1){//图文

                $p = 1;
                $content = M('our1')->where(['display'=>1,'type_id'=>$our_id])->find();
                $content['content'] = htmlspecialchars_decode($content['content']);
                $content['content_en'] = htmlspecialchars_decode($content['content_en']);
            }else{
                $p = 2;
                //$content = M('our2')->where(['display'=>1,'type_id'=>$our_id])->select();
                $data =  getlist('our2',$page,$pagesize,['display'=>1,'type_id'=>$our_id],['inputtime'=>'desc']);
                $pages = $data['page'];
                $content = $data['list'];
                foreach($content as $k=>$v){
                    $content[$k]['inputtime'] = date('Y-m-d',$v['inputtime']);
                }
            }
            $key =false;
        }

        $type = M('our_type')->where(['display'=>1])->select();
        if($key){
            $title = $type[0]['title'];
            $title_en = $type[0]['title_en'];
            if($type[0]['type'] == 1){//图文
                $content = M('our1')->where(['display'=>1,'type_id'=>$type[0]['id']])->find();
                $content['content'] = htmlspecialchars_decode($content['content']);
                $content['content_en'] = htmlspecialchars_decode($content['content_en']);
                $p = 1;
            }else{
                $p = 2;
                $data =  getlist('our2',$page,$pagesize,['display'=>1,'type_id'=>$our_id],['inputtime'=>'desc']);
                $pages = $data['page'];
                $content = $data['list'];
                foreach($content as $k=>$v){
                    $content[$k]['inputtime'] = date('Y-m-d',$v['inputtime']);
                }
            }
        }


        $net = M('net')->where(['display'=>1])->order(['orders'=>'asc'])->select();


        $this->assign('page',$pages);
        $this->assign('net',$net);
        $this->assign('now_our','now');
        $this->assign('title',$title);
        $this->assign('title_en',$title_en);
        $this->assign('type',$type);
        $this->assign('content',$content);
        if($p == 1){
            $this->display('our1');
        }else{
            $this->display('our2');
        }

    }
    //内容
    public function our2_info(){
        $id = I('get.id');
        $title = I('get.title');
        $title_d = I('get.title_d');
        $this->assign('title',$title);
        $this->assign('title_d',$title_d);
        $info  = M('our2')->where(['display'=>1,'id'=>$id])->find();
        $info['content'] = htmlspecialchars_decode($info['content']);
        $info['content_en'] = htmlspecialchars_decode($info['content_en']);
        $this->assign('info',$info);
        $this->display();
    }

    //新闻
    public function news(){

    }



  }