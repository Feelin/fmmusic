$(function(){
		//VoCount = {$data.vote_count};
		$("#jquery_jplayer_1").jPlayer({
            ready: function () {
                $(this).jPlayer("setMedia", {
                    mp3:"{$data.song_url}"
                });
            },
            swfPath: "js",
            supplied: "mp3",
            wmode: "window",
            smoothPlayBar: true,
            keyEnabled: true
        });

		var text = $(".songName").text();
		if(text.length > 10){
			size = 17;
		}
		else{
			size = (65-text.length*4);
		}
		$(".songName").css("font-size",  size +"px");

		$("#sumbitBtn").css("width",$("#commentText").width()+15);
		$(".sumbitBtn").css("width",$("#commentText").width()+15);
		$(".tag").click(function(){
			$(".tag").css("background","#282828");
			$(this).css("background","#363636");
		});
		$("#comment").click(function(){
			$(".commentCard").css("display","block");
			$(".infoCard").css("display","none");
			$("#sumbitBtn").css("width",$("#commentText").width()+15);
			$(".sumbitBtn").css("width",$("#commentText").width()+15);

		});
		$("#info").click(function(){
			$(".commentCard").css("display","none");
			$(".infoCard").css("display","block");
		});
		$(window).resize(function() {
			$("#sumbitBtn").css("width",$("#commentText").width()+15);
			$(".sumbitBtn").css("width",$("#commentText").width()+15);
		});
		$(".voteBtn").click(function(){
			$.getJSON("http://fmmusic.sinaapp.com/index.php/Vote/index/",
				{ "sid": {$data.id}},
				function(data){
				switch (data.status){
					case 1: alert("投票成功");
							VoCount = $("#voteCount").text();
							VoCount++;
							$("#voteCount").text(VoCount);
							break;
					case 2: alert("您今日已投过票了");
							break;
					case 3: alert("微信id不存在");
							break;
					case 4: alert("网络请求错误");
							break;
                    case 5: alert("现在只能对第二轮的选手进行投票");
							break;
				}
			});		
		});
		$(".jp-play").click(function(){
			$.get("http://fmmusic.sinaapp.com/index.php/Index/add",
				{
					"id" : {$data.no} ,
					"type" : "2"
				},
				function(){
					PlCount++;
					$("#playCount").text(PlCount);
				}
			)
		});

		$("#commentText").focus(function(){
			if($("#commentText")[0].value=="请输入评论内容"){
				$("#commentText")[0].value="";
			}			
		});

		$.getJSON("http://fmmusic.sinaapp.com/index.php/Index/commentlist/",
			{ "sid":{$data.id} }, 
			function(data){
				if(data.status==0){
					var conmmentHtml = '';
					for(var i in data.data){
						if(data.data[i]['toid']==0){
							conmmentHtml = conmmentHtml+"<a href='javascript:;' class='C_content'><div class='C_text'>"+data.data[i]['content']+"</div><label class='C_time'>"+data.data[i]['time']+"</label><label class='C_id'>"+data.data[i]['id']+"</label><label class='number'>"+data.data[i]['number']+"</label></a>";
						}
						else{
							conmmentHtml = conmmentHtml+'<a href="javascript:;" class="C_content"><div class="C_text"><label class="firstComment">'+data.data[i]['content']+'</label><div class="doubleComment"><label class="toid">'+data.data[i]['toid']+'</label>'+data.data[i]['tocontent']+'</div></div><label class="C_time">'+data.data[i]['time']+'</label><label class="C_id">'+data.data[i]['id']+'</label><label class="number">'+data.data[i]['number']+'</label></a>';
						}
					}
				}
				$(".commentList").prepend(conmmentHtml);
				$(".C_text:first").prepend("<label class='hotcomment'>【最热评论】</label><br/>");	
				$(".C_content").click(function(){
					firstComment = $(this).children(".C_text").children(".firstComment").text();
		       		if(firstComment!=""){
		       			toid = $(this).children(".C_text").children(".doubleComment").children(".toid").text();
		       		}
		       		else{
		       			toid = $(this).children(".C_id").text();
		       		}
		       		toNum = $(this).children(".number").text();

					$("#commentText").trigger("focus");
					$("#commentText")[0].value="回复【"+toNum+"】：";

				});
			}
		);
		
		

		$(".sumbitBtn").click(function(){
			
			commentTxt = $("#commentText")[0].value;
			if(commentTxt=="" ||commentTxt=="请输入评论内容"){
				return false;
			}
			else if(commentTxt.substr(0, 3)=="回复【"){
				var reg = /【(\d+)(】：)([\s\S]+)/;
				var commentData =  reg.exec(commentTxt);				
				content = commentData[3];
				if(firstComment!=''){
					content =  content+ "//" + firstComment
				}

			}
			else{
				content = commentTxt;
				toid = 0;
			}


			$.getJSON("http://fmmusic.sinaapp.com/index.php/Index/commentadd/",
				{
					"toid": toid,
					"sid" : {$data.id},
					"content" : content
				},
				function(data){
				if(data.status==0){
					conmmentHtml = '';
					for(var i in data.data){
						if(data.data[i]['toid']==0){
							conmmentHtml = conmmentHtml+"<div class='C_content'><div class='C_text'>"+data.data[i]['content']+"</div><label class='C_time'>"+data.data[i]['time']+"</label><label class='C_id'>"+data.data[i]['id']+"</label><label class='number'>"+data.data[i]['number']+"</label></div>";
						}
						else{
							conmmentHtml = conmmentHtml+'<div class="C_content"><div class="C_text"><label class="firstComment">'+data.data[i]['content']+'</label><div class="doubleComment"><label class="toid">'+data.data[i]['toid']+'</label>'+data.data[i]['tocontent']+'</div></div><label class="C_time">'+data.data[i]['time']+'</label><label class="C_id">'+data.data[i]['id']+'</label><label class="number">'+data.data[i]['number']+'</label></div>';
						}
					}
				}
				$(".commentList").empty();
				$(".commentList").prepend(conmmentHtml);
				$(".C_text:first").prepend("<label class='hotcomment'>【最热评论】</label><br/>");	
				$("#commentText")[0].value = "请输入评论内容";
				}
			);
		});
	});
	function shunxu(type){
		window.location="__URL__/shunxu?id={$data.id}&type="+type;
	}
	