<?php
	class PlayAction extends Action{
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

			$m = D("Play");

			$flag = get_client_ip();
			if(!$m->is_timeout($flag,$sid,45)){
				if(!$m->is_beyond($flag,$sid,5)){	//超额
	                

	                $play['id']=$sid;
					$play_count = $music->where($play)->getField("play_count");
	                $play['play_count']=$play_count+1;
	                $music->save($play);

	                $data['sid']  = $sid;
					$data['flag'] = $flag;
					$data['date'] = date('Y/m/d');
					$data['time'] = time();
					$m->create($data);
					$result = $m->add();

					if($result){
						$this->ajaxReturn($result,"播放成功",1);
					}else{
						$this->ajaxReturn(0,$m->getError(),3);
					}
	                
				}else{
					$this->ajaxReturn(0,"您今日已投过票了",2);
				}
			}else{
				$this->ajaxReturn(0,"没有超过间隔时间",2);
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