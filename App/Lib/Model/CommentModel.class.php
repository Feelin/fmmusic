<?php
	class CommentModel extends Model{
		//添加自动验证功能
		protected $_validate = array(
			//    array('no','require','编号不能为空！'),
			array('sid','require','sid必须非空',1), 
			array('content','require','内容不能为空！',1), 
			array('content','checkContent','内容不能超过50字',0,'function')
		);
		public function checkContent($var){
			if(mb_strlen($var) > 50){
				return false;
			}
			return true;
		}
		public function getlist($sid){

			$data['sid'] = $sid;
			$result = $this->where($data)->order('id desc')->select();

			foreach ($result as $key => $value) {
				if($value['toid'] != 0){
					$todata = array();
					$todata = $this->find($value['toid']);
					if($todata != null)
					{
						$result[$key]['tocontent'] = $todata['content'];
						$result[$key]['totime']    = $todata['time'];
					}
				}
			}

			$hotest = $this->where($data)->order('count desc')->find();
			// $todata = $this->find($hotest['toid']);
			// if($todata != null)
			// {
			$hotest['tocontent'] = '';
			$hotest['totime']    = '';
			// }
			array_unshift($result, $hotest);

			return $result;
		}
	}