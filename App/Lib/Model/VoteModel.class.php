<?php
	class VoteModel extends Model{
		//添加自动验证功能
		protected $_validate = array(
			//    array('no','require','编号不能为空！'),
			array('sid','require','歌曲id不能为空！',1), 
			array('flag','require','用户标识不可以为空！',1), //必须开启1参数，require才能使用
		);


		public function is_beyond($flag,$sid,$limit){
			$data['sid']  = $sid;
			$data['flag'] = $flag;
			$data['date'] = date('Y/m/d');
			if(count($this->where($data)->select()) < $limit)
				return false;
			else
				return true;
		}
	}