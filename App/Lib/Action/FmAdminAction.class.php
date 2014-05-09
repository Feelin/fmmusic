<?php

     class FmAdminAction extends Action{
	 			
     		protected function _initialize() {
     			header("Content-Type:text/html;charset=utf-8"); 
		        // if($_GET['pwd'] != "jnufm123"){
		        // 	exit("草你，登你妹");
		        // }
		    }
            public function index(){
			
			  $m=D('music');
			
			  $arr=$m->select ();
                
		      $this->assign('data',$arr);
			  $this->display();
			  
					
			}	 
			
			public function del(){
			
			  $m=D('music');
			  $id=$_GET['id'];
		      $c=$m->delete($id);
                if($c>0)
			      $this->success('删除成功');
		      else
			       $this->error('删除失败');
			  	
			}	 
			
				public function modify(){
			$m=D('music');
		
			$where['id']=$_GET['id'];
			$arr=$m->where($where)->find();
			$this->assign('data',$arr);
			$this->display();
		} 
			
				public function update(){
		
	                	$m=D('music');
	                   if(!$m->create())
                        	$this->error($m->getError());//若自动验证失败，则显示相应错误信息
	                  $c=$m->save();
			          if($c>0)
			          $this->success('修改成功','index');
		          else
			           $this->error('修改失败');
	 	
		}
		
			public function add(){
	
	        $this->display();
	}
	
		public function create(){
	
	
	        $m=D('music');  //用D方法实例化，具体对应模板可在Model文件下查看
	        $data['name'] = $_POST['name'];
	        $data['song_name'] = $_POST['song_name'];
	        $data['song_url'] = "http://source.jnu.fm/".urlencode($_POST['name'])."-".urlencode($_POST['song_name']).".mp3";
	        $data['imgurl1'] = "http://fmmusic.sinaapp.com/Public/photo/".(int)$_POST['no']."-1.jpg";
	        $data['imgurl2'] = "http://fmmusic.sinaapp.com/Public/photo/".(int)$_POST['no']."-2.jpg";
	        $data['imgurl3'] = "http://fmmusic.sinaapp.com/Public/photo/".(int)$_POST['no']."-3.jpg";
	        $data['no'] = $_POST['no'];
	        $data['summary'] = $_POST['summary'];
	        $data['singer'] = $_POST['singer'];
	        $data['weibourl'] = $_POST['weibourl'];
	        $data['state'] = 3;

	        if(!$m->create($data))
	        	$this->error($m->getError());//若自动验证失败，则显示相应错误信息
            $no=$m->getno();
            
                //$m->no=$no;
            
         
	        $c=$m->add();
			if($c>0)
				$this->success('添加成功','index');
		    else
				$this->error('添加失败');
	 
	}
		
	 
	 
	 }

?>