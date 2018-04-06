<?php
namespace Home\Model;

class DbManager{
	private $obj=array();
	private $tablename=null;
	private $model=null;
	private $sqlarray=array();
	private $pagenum=0;//一页显示多少条记录，如果为0则不分页
	
	public function __get($name){
		if(isset($this->model->$name)){
			return $this->model->$name;
		}else if(isset($this->$name)){
			return $this->name;
		}
	}
	/***
	 * 对二维数组的地二维里指定的key所对应 值来进行排序，并返回排序结果
	 * 例如：
	 * $tiwenDb=new DbManager('wtb');
	 * $arr2=array(
			array('a'=>1,'b'=>6),
			array('a'=>2,'b'=>8),
			array('a'=>3,'b'=>7),
			array('a'=>4,'b'=>3),
			array('a'=>5,'b'=>2),
		);
		$arr2=$tiwenDb->sortArray($arr2,'b');这种情况就是升序
		$arr2=$tiwenDb->sortArray($arr2,'b',true);加了true就是降序
	 *@param $arr   要排序的数组，必须是二维的
	 *@param $name  在二维数组里第二维的小数组里的一个key，最后是按他的值排序
	 *@param $desc=false 
	 *@return 返回排序结果，如果有问题，返回null
	 */
	public function sortArray($arr,$name,$desc=false){
		if(is_array($arr)&&count($arr)){
			for($j=0;$j<count($arr)-1;$j++){
				for($i=0;$i<count($arr)-1-$j;$i++){
					if($desc){
						if($arr[$i][$name]<$arr[$i+1][$name]){
							$lin=$arr[$i];
							$arr[$i]=$arr[$i+1];
							$arr[$i+1]=$lin;
						}
					}else{
						if($arr[$i][$name]>$arr[$i+1][$name]){
							$lin=$arr[$i];
							$arr[$i]=$arr[$i+1];
							$arr[$i+1]=$lin;
						}
					}
					
				}
			}
			return $arr;
		}else{
			return null;
		}
	}
	public function __construct($tablename,$pagenum=10){		
		$this->tablename=$tablename;
		$this->pagenum=$pagenum;
		$this->open();
	}
	public  function open(){
		//echo '打开数据库连接';
		return $this;
	}
	
	public  function create(){
		if($this->tablename){
			if($this->model==null){
				$this->model=M($this->tablename);
			}
			return $this->model->create();
		}
		return null;
	}
	
	public  function field($fields){
		$this->obj['field']=$fields;
		return $this;
	}
	
	public  function where($sql){
		$this->obj['where'][]=$sql;
		return $this;
	}
	
	public  function order($sql){
		$this->obj['order']=$sql;
		return $this;
	}
	
	public  function limit($sql){
		$this->obj['limit']=$sql;
		return $this;
	}
	
	public  function group($sql){
		$this->obj['group']=$sql;
		return $this;
	}

	
	public  function join($sql){
		if(!isset($this->obj['join'])){
			$this->obj['join']=array();
		}
		$this->obj['join'][]=$sql;
		return $this;
	}
	
	public  function select($page=0){
		if($this->tablename){
			$obj=$this->control();
			if($this->pagenum&&$page){
				$rs['page']=$page;
				
				$rs['list']=$obj->page($page,$this->pagenum)->select();
				$sql=$obj->getLastSql();
				$sqlsz=explode('LIMIT',$sql);
				$sql=$sqlsz[0];
				$Model = new \Think\Model();
				$rs2=$Model->query("select count(*) as n from ($sql) a");
				$rs['count']=$rs2[0]['n'];
				$rs['pageCount']=floor(($rs['count']+$this->pagenum-1)/$this->pagenum);
			}else{
				$rs=$obj->select();
			}					
			
			//echo $obj->getLastSql();
			$this->clearObj();
			
			return $rs;
		}
		return false;
	}	
	public  function find(){
		if($this->tablename){
			$obj=$this->control();
			$rs=$obj->find();
			$sqlarray[]=$obj->getLastSql();
			$this->clearObj();
			return $rs;
		}
		return false;
	}
	public  function del(){
		if($this->tablename){
			$obj=$this->control();
			$rs=$obj->delete();
			$sqlarray[]=$obj->getLastSql();
			$this->clearObj();
			return $rs;
		}
		return false;
	}
	public  function save($sql){
		if($this->tablename){
			$obj=$this->control();
			$rs=$obj->save($sql);
			$sqlarray[]=$obj->getLastSql();
			$this->clearObj();
			return $rs;
		}
		return false;
	}
	private function clearObj(){
		unset($this->obj);
		$this->obj=array();
	}
	private function control(){
		if($this->model==null){
			$this->model=M($this->tablename);
		}			
		$obj=$this->model;
		foreach($this->obj as $k=>$v){
			if(is_array($v)&&$k=='join'){
				foreach($v as $v2){
					$obj=$obj->$k($v2);
				}
			}else if(is_array($v)&&$k=='where'){
				foreach($v as $v2){
					$obj=$obj->where($v2);
				}
			}else{
				$obj=$obj->$k($v);
			}
			
		}
		return $obj;
	}
	public  function add($arr){
		if($this->tablename){
			if($this->model==null){
				$this->model=M($this->tablename);
			}	
			$id=0;
			if($arr){
				$id=$this->model->add($arr);
			}else{
				$id=$this->model->add();
			}
			//$this->sqlarray[]=$this->model->getLastSql();			
			return $id;
		}else{
			return 0;
		}		
	}
	public  function setInc($where='',$name='',$num=1){
		if($this->tablename&&$name){
			if($this->model==null){
				$this->model=M($this->tablename);
			}	
			$id=0;
			$id=$this->model->where($where)->setInc($name,$num);
			$this->sqlarray[]=$this->model->getLastSql();			
			return $id;
		}else{
			return 0;
		}		
	}
	public  function setDec($where='',$name='',$num=1){
		if($this->tablename&&$name){
			if($this->model==null){
				$this->model=M($this->tablename);
			}	
			$id=0;
			$id=$this->model->where($where)->setDec($name,$num);
			$this->sqlarray[]=$this->model->getLastSql();			
			return $id;
		}else{
			return 0;
		}		
	}
}
?>