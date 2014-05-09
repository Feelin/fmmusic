<?php
	class VoteAction extends Action{
		function index() {
			$sid = $_GET['sid'];
			$music=D('music');
			
			if (isset($_GET['no'])) {
				$data3['no']=$_GET['no'];
                $arr2=$music->where($data3)->find();
                if($arr2 == false){
                	$this->ajaxReturn(0,"不存在该编号",4);
                }
                $sid = $arr2['id'];
			}
			$m = D("Vote");

			if(!isset($_GET['flag'])){

				$flag = get_client_ip();

			}else{
				$wxid = $_GET['flag']; 

				$ch=curl_init();
				curl_setopt($ch,CURLOPT_URL,'http://2.jnufm.sinaapp.com/index.php/Index/checkuser?id='.$wxid);
				curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
				$content=curl_exec($ch);
				if(curl_errno($ch)) {
					$this->ajaxReturn(0,"网络请求错误",4);
				}
				curl_close($ch);

				$is_exist = json_decode($content);

				if($is_exist->status == false){
					$this->ajaxReturn(0,"微信id不存在",0);
				}
				$flag = $_GET['flag'];
			}
			
			if(!$m->is_beyond($flag,$sid,C("DAY_LIMIT_VOTE"))){	//超额
                 
                 
                $vote['id']=$sid;
                $arr=$music->where($vote)->getField('state');
           		if($arr==4)                 //到时换成第二期或第三期直接来这里改变state的值，，同时改数据库中state的默认值
                {                
                
                
                $vote_count=$music->where($vote)->getField("vote_count");
                $vote['vote_count']=$vote_count+1;
                $music->save($vote);

               }
               else $this->ajaxReturn(0,"现在只能对决赛选手进行投票",5); 
           
                 
                
                $data['sid'] = $sid;
				$data['flag'] = $flag;
				$data['date'] = date('Y/m/d');
				$m->create($data);
				$result = $m->add();

				if($result){
					$this->ajaxReturn($result,"投票成功",1);
				}else{
					$this->ajaxReturn(0,$m->getError(),3);
				}
                
			}else{
				$this->ajaxReturn(0,"您今日已投过票了",2);
			}
		}
		function show(){
			// 用户名　 : 3lzoom32l0
			// 密　　码 : k05klhlk1hmwhw11ihy4w1zyzk42zj0yw5k25lh1
			// 主库域名 : w.rdc.sae.sina.com.cn
			// 从库域名 : r.rdc.sae.sina.com.cn
			// 端　　口 : 3307
			// 数据库名 : app_jnufm

		}
        
        
        
        function test(){
            $keyword=1;
            	$ch=curl_init();
				curl_setopt($ch,CURLOPT_URL,'http://fmmusic.sinaapp.com/index.php/Index/index?id='.$keyword);
				curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
				$content=curl_exec($ch);
				if(curl_errno($ch)) {
					$this->ajaxReturn(0,"网络请求错误",4);
				}
				curl_close($ch);
            // echo $content;

            	$is_exist = json_decode($content);
            
          
             dump($is_exist);
               exit;
            
        }
	}