<?php
	class musicModel extends Model
	{
		//添加自动验证功能
		protected $_validate = array(
		//    array('no','require','编号不能为空！'),
		    array('name','require','姓名不能为空！'), 
		    array('song_name','require','歌曲名不可以为空！'), 
		    array('imgurl','url','图片地址错误',2,'regex') ,
			array('song_url','url','歌曲链接错误',2,'regex')  
		);
        
        
        
        function getno(){
           $a=D('music');
            $no=rand(100,999);
            $where['no']=$no;
            $count=$a->where($where)->select();
            while($count>0)
            {
             $no=rand(100,999);
             $where['no']=$no;
            $count=$a->where($where)->select();
            }
            return $no;
        }
        
        
        
        public function hotsong(){
              $m=D('music');
            //    $b=m->order("vote_count desc")->limit('5')->select();
            $b=$m->order('vote_count desc')->limit('5')->where("state=3")->select();
            return $b;
        }
        
            public function newsong(){
              $m=D('music');
            //    $b=m->order("vote_count desc")->limit('5')->select();
            $b=$m->order('id desc')->limit('5')->where("state=3")->select();
            return $b;
        }

		public function search($keyword){

			$data[0]['no'] = $keyword;
			$result[0] = $this->where($data[0])->select();

			$data[1]['name'] = array('like','%'.$keyword.'%');
			$result[1] = $this->where($data[1])->select();

			$data[2]['song_name'] = array('like','%'.$keyword.'%');
			$result[2] = $this->where($data[2])->select();

			$data[3]['summary'] = array('like','%'.$keyword.'%');
			$result[3] = $this->where($data[3])->select(); 

			for ($i=0; $i < 4; $i++) {
				if ($result[$i] == NULL) {
					$result[$i] = array();
				}
			}
			return array_unique(array_merge($result[0],$result[1],$result[2],$result[3]));
		}

		public function getHotList(){
			
			$arr = $this->where("state=3")->select();

			foreach ($arr as $key => $value) {
				$sort[$value['vote_count']*8 + $value['play_count']*1] = $arr[$key]; 
			}
			krsort($sort);
			return $sort;
		}
	}
?>