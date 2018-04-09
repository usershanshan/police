<?php
namespace Home\Controller;

class IndexController extends HomeController  {



    public function __construct(){
        parent::__construct();
        $config_arr = M('config')->select();
        foreach($config_arr as $k=>$v){
            $config[$v['key']] = $v['value'];
        }
        $this->assign('config',$config);

    }

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
        $page = I('get.p')?I('get.p'):1;
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
        $page = I('get.p')?I('get.p'):1;
        $pagesize = I('get.pagesize')?I('get.pagesize'):10;
        $news_id = I('get.news_id');
        $key= true;
        if($news_id){
            $typef = M('news_type')->where(['id'=>$news_id,'display'=>1])->find();
            $title = $typef['title'];
            $title_en = $typef['title_en'];
            $title_d = '要闻动态';
            switch($typef['type']){
                case 1:
                    $data = getlist('news1',$page,$pagesize,['type_id'=>$news_id,'display'=>1] ,['inputtime'=>'desc']);
                    $pages = $data['page'];

                    $content = $data['list'];
                    foreach($content as $k=>$v){
                        $content[$k]['inputtime'] = date('Y-m-d',$v['inputtime']);
                    }
                    $p = 1;
                    break;
                case 2:
                    //跳页  还没写
                    $p=2;
                    $qi = M('news2')->where(['display'=>1,'type_id'=>$news_id])->order(['inputtime'=>'asc'])->select();
                    $qi_x = $qi[0];//默认第一期
                    $yi =  M('news2_list')->where(['display'=>1,'type_id'=>$qi[0]['id'],'pid'=>'yi'])->order(['inputtime'=>'desc'])->select();
                    $er =  M('news2_list')->where(['display'=>1,'type_id'=>$qi[0]['id'],'pid'=>'er'])->order(['inputtime'=>'desc'])->select();
                    $san =  M('news2_list')->where(['display'=>1,'type_id'=>$qi[0]['id'],'pid'=>'san'])->order(['inputtime'=>'desc'])->select();
                    $si =  M('news2_list')->where(['display'=>1,'type_id'=>$qi[0]['id'],'pid'=>'si'])->order(['inputtime'=>'desc'])->select();
                    $content['qi_s'] = $qi[0]['id'];
                    $content['qi_n'] = $qi[1]['id']?$qi[1]['id']:$qi[0]['id'];
                    $content['qi'] = $qi;
                    $content['yi'] = $yi;
                    $content['er'] = $er;
                    $content['san'] = $san;
                    $content['si'] = $si;
                    $content['qi_x'] = $qi_x;


                    break;
                case 3:
                    //没有分页
                    $p = 3;
                    $content = M('news3')->where(['display'=>1,'type_id'=>$news_id])->select();
                    break;

            }
            $key = false;
        }

        $type = M('news_type')->where(['display'=>1])->select();
        if($key){
            $title_d = '要闻动态';
            $title = $type[0]['title'];
            $title_en = $type[0]['title_en'];
            $p = $type[0]['type'];
            switch($type[0]['type']){
                case 1:
                    $data = getlist('news1',$page,$pagesize,['type_id'=>$type[0]['id'],'display'=>1] ,['inputtime'=>'desc']);
                    $pages = $data['page'];

                    $content = $data['list'];
                    foreach($content as $k=>$v){
                        $content[$k]['inputtime'] = date('Y-m-d',$v['inputtime']);
                    }
                    break;
                case 2:
                    $qi = M('news2')->where(['display'=>1,'type_id'=>$news_id])->order(['inputtime'=>'asc'])->select();
                    $qi_x = $qi[0];//默认第一期
                    $yi =  M('news2_list')->where(['display'=>1,'type_id'=>$qi[0]['id'],'pid'=>'yi'])->order(['inputtime'=>'desc'])->select();
                    $er =  M('news2_list')->where(['display'=>1,'type_id'=>$qi[0]['id'],'pid'=>'er'])->order(['inputtime'=>'desc'])->select();
                    $san =  M('news2_list')->where(['display'=>1,'type_id'=>$qi[0]['id'],'pid'=>'san'])->order(['inputtime'=>'desc'])->select();
                    $si =  M('news2_list')->where(['display'=>1,'type_id'=>$qi[0]['id'],'pid'=>'si'])->order(['inputtime'=>'desc'])->select();
                    $content['qi'] = $qi;
                    $content['yi'] = $yi;
                    $content['er'] = $er;
                    $content['san'] = $san;
                    $content['si'] = $si;
                    $content['qi_x'] = $qi_x;
                    $content['qi_s'] = $qi[0]['id'];
                    $content['qi_n'] = $qi[1]['id']?$qi[1]['id']:$qi[0]['id'];



                    //跳页  还没写
                    break;
                case 3:
                    //没有分页
                    $content = M('news3')->where(['display'=>1,'type_id'=>$type[0]['id']])->select();
                    break;

            }

        }


        $this->assign('page',$pages);
        $this->assign('now_news','now');
        $this->assign('title',$title);
        $this->assign('title_en',$title_en);
        $this->assign('title_d',$title_d);
        $this->assign('type',$type);
        $this->assign('content',$content);
        switch($p){
            case 1:
                $this->display();
                break;
            case 2:
                $this->display('news2');
                break;
            case 3:
                $this->display('news3');
                break;
        }








    }

    //视频详情页
    public function news3_info(){
        $id = I('get.id');
        $content = M('news3')->where(['id'=>$id])->find();
        $this->assign('content',$content);
        $this->assign('title',I('get.title'));
        $this->assign('title_d',I('get.title_d'));
        $this->display();
    }

    //新闻列表详情页
    public function news1_info(){
        $id = I('get.id');


        $content = M('news1')->where(['id'=>$id])->find();
//        $type = M('news_type')->where(['id'=>$content['type_id']])->find();
//        $title = I('get.title')?I('get.title'):$type['title']
        $this->assign('title',I('get.title'));
        $this->assign('title_d',I('get.title_d'));
        $content['content'] = htmlspecialchars_decode($content['content']);
        $content['content_en'] = htmlspecialchars_decode($content['content_en']);
        $this->assign('info',$content);
        $this->display('our2_info');
    }

    public function news2_info(){
        $id = I('get.id');
        $qi_b = M('news2')->where(['display'=>1,'id'=>$id])->order(['inputtime'=>'asc'])->find();//被选中得期
        $qi = M('news2')->where(['display'=>1,'type_id'=>$qi_b['type_id']])->order(['inputtime'=>'asc'])->select();//所有期
        foreach($qi as $k=>$v){
            if($v['id'] == $id){
                $qi_s = $qi[$k-1]['id']?$qi[$k-1]['id']:$id;//上一期
                $qi_n = $qi[$k+1]['id']?$qi[$k+1]['id']:$id;//下一期
            }
        }
        $qi_x = $qi_b;//选中
        $yi =  M('news2_list')->where(['display'=>1,'type_id'=>$qi_b['id'],'pid'=>'yi'])->order(['inputtime'=>'desc'])->select();
        $er =  M('news2_list')->where(['display'=>1,'type_id'=>$qi_b['id'],'pid'=>'er'])->order(['inputtime'=>'desc'])->select();
        $san =  M('news2_list')->where(['display'=>1,'type_id'=>$qi_b['id'],'pid'=>'san'])->order(['inputtime'=>'desc'])->select();
        $si =  M('news2_list')->where(['display'=>1,'type_id'=>$qi_b['id'],'pid'=>'si'])->order(['inputtime'=>'desc'])->select();
        $content['qi'] = $qi;
        $content['yi'] = $yi;
        $content['er'] = $er;
        $content['san'] = $san;
        $content['si'] = $si;
        $content['qi_x'] = $qi_x;
        $content['qi_s'] = $qi_s;
        $content['qi_n'] = $qi_n;



        $this->assign('content',$content);
        $this->display('news2');
    }

    //详情
    public function news2_content(){
        $id = I('get.id');
        $info = M('news2_list')->where(['display'=>1,'id'=>$id])->find();
        $info['content'] = htmlspecialchars_decode($info['content']);
        echo "<center><h3>{$info['title']}</h3></center>";
        echo $info['content'];

    }


    //一站式服务
    public function one(){
        $one_id = I('get.one_id');
        $key = true;
        if($one_id){
            $typef = M('one_type')->where(['id'=>$one_id])->find();
            $title = $typef['title'];
            $title_en = $typef['title_en'];
           $content = M('one_list')->where(['display'=>1,'type_id'=>$one_id])->select();
           foreach($content as $k=>$v){
               $content[$k]['content'] = M('one_content')->where(['display'=>1,'pid'=>$v['id']])->select();
           }
           $key =false;
        }

        $type = M('one_type')->where(['display'=>1])->order(['orders'=>'asc'])->select();
        if($key){
            $typef = $type[0];
            $title = $type[0]['title'];
            $title_en = $type[0]['title_en'];
            $content = M('one_list')->where(['display'=>1,'type_id'=>$type[0]['id']])->select();
            foreach($content as $k=>$v){
                $content[$k]['content'] = M('one_content')->where(['display'=>1,'pid'=>$v['id']])->select();
            }
            $key =false;
        }


        $this->assign('now_one','now');
        $this->assign('typef',$typef);
        $this->assign('title',$title);
        $this->assign('title_en',$title_en);
        $this->assign('type',$type);
        $this->assign('content',$content);
        $this->display();



    }


    public function index(){
        $this->assign('now_index','now');
        $this->friend();
        $this->partner();
        $this->getBannerList();
        $this->video();
        $this->one_index();
        $this->news_index();
        $this->case_index();
        $this->display();
    }


    public function friend(){
        $data =M('friend')->where(['display'=>1])->select();
        $this->assign('friend',$data);
    }

    public function partner(){
        $data =M('partner')->where(['display'=>1])->select();
        $this->assign('partner',$data);
    }

    public function getBannerList(){
        $where = ['status'=>'on'];
        $banner_info = M('Banner')->where($where)->order('sort desc,id desc')->select();
        $this->assign('banner',$banner_info);
    }

    public function video(){
        $video = M('news3')->where(['display'=>1])->order(['inputtime'=>'desc'])->find();//最新得视频
        $video_arr = M('news_type')->where(['display'=>1,'id'=>$video['type_id']])->find();//视频分类
        $this->assign('video',$video);
        $this->assign('video_arr',$video_arr);

    }

    public function one_index(){
        $one = M('one_type')->where(['display'=>1])->select();
        $this->assign('one',$one);
        //echo json_encode($one);
    }

    public function news_index(){
        $type_arr = M('news_type')->where(['display'=>1])->select();
        foreach($type_arr as $k=>$v){
            $type[$v['id']]['title'] = $v['title'];
            $type[$v['id']]['title_en'] = $v['title_en'];
        }

        $no_img = M('news1')->field(['id','title','title_en','img','type_id'])->where(['display'=>1,'img'=>''])->limit(5)->select();
        foreach($no_img as $k=>$v){
            $no_img[$k]['type_title'] = $type[$v['type_id']]['title'];
            $no_img[$k]['type_title_en'] = $type[$v['type_id']]['title_en'];
        }
        $img = M('news1')->field(['id','title','title_en','img','type_id'])->where(['display'=>1,'img'=>['NEQ','']])->limit(5)->select();
        foreach($img as $k=>$v){
            $img[$k]['type_title'] = $type[$v['type_id']]['title'];
            $img[$k]['type_title_en'] = $type[$v['type_id']]['title_en'];
        }
        $this->assign('no_img',$no_img);
        $this->assign('img',$img);



    }

    public function case_index(){
        $type = M('case_type')->where(['display'=>1])->limit(4)->select();//类型
        $arr = [];
        foreach($type as $k=>$v){
            $arr[$k] = M('case_content')->where(['display'=>1,'type_id'=>$v['id']])->order(['orders'=>'asc'])->find();//内容
            $arr[$k]['title_case'] = $v['title'];
            $arr[$k]['title_case_en'] = $v['title_en'];
        }

        $this->assign('arr',$arr);
    }

    public function config_index(){
        $name = I('get.name');
        $title = I('get.title');
        $this->assign('title',$title);
        $value = M('config')->where(['key'=>$name])->find();
        $value = htmlspecialchars_decode($value['value']);
        $this->assign('value',$value);
        $this->display('config');
    }


    //英文需改
    public function search(){
        $keyword = I('get.keyword');
        $content =  M('news1')->where(['title'=>['LIKE',"%".$keyword."%"],'display'=>1])->select();
        $this->assign('content',$content);
        $this->assign('keyword',$keyword);
        $this->display();

    }








  }