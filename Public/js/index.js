	$(function(){

		PlCount = {$data.play_count};
		DlCount = {$data.dl_count};
		VoCount = {$data.vote_count};
		ViCount = {$data.view_count};

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
        keyEnabled: true,
        ended: function (event) {                
			$(this).jPlayer("play");
			$.get("http://fmmusic.sinaapp.com/index.php/Index/add",
				{
					"id" : {$data.id} ,
					"type" : "2"
				},
				function(){
					PlCount++;
					$("#playCount").text(PlCount);
				}
			);
		},
    });

	var text = $("#songName").text();
	if(text.length > 12){
		size = 12;
	}
	else{
		size = (17-Math.floor(text.length/3));
	}
	
	$("#songName").css("font-size",  size +"px");


		function bindHover(){
			$(".C_content").hover(
				function(){
					var height = $(this).height();
					$(this).prepend("<div class='C_contentBG'></div>");
					$(this).prepend("<div class='hover_bar'></div>");
					$(this).children(".hover_bar").height(height);
					time = $(this).children("label.C_time").html();
					$(this).children("label.C_time").html("<a id='reply' href='#'>回复他<img src='__PUBLIC__/img/reply.png'/></a>");
					$("#reply").click(function(){
		
                   		firstComment = $(this).parent().parent().children(".C_text").children(".firstComment").text();
                   		if(firstComment!=""){
                   			toid = $(this).parent().prev(".C_text").children(".doubleComment").children(".toid").text();
                   		}
                   		else{
                   			toid = $(this).parent().next(".C_id").text();
                   		}
                   		toNum = $(this).parent().next(".C_id").next(".number").text();

						$("#commentText").trigger("focus");
						$("#commentText")[0].value="回复【"+toNum+"】：";
					});
				},
				function(){
					$(this).children("label.C_time").html(time);
					$(".hover_bar").remove();
					$(".C_contentBG").remove();
				}
			);
		}

		$(".S_info:even").addClass("even");

		if( $("#weibourl").attr("href")=='' ){
			$("#weibologo").css("display","none");
			$("#weibourl").click(function(){
				return false;
			});
			$("#weibourl").attr("title","此人没有留下其微博哦");
		}


		$.getJSON("http://fmmusic.sinaapp.com/index.php/Index/commentlist/",
			{ "sid":{$data.id} }, 
			function(data){
				var conmmentHtml = '';
				for(var i in data.data){

					if(data.data[i]['toid']==0){
						conmmentHtml = conmmentHtml+"<div class='C_content'><div class='C_text'>"+data.data[i]['content']+"</div><label class='C_time'>"+data.data[i]['time']+"</label><label class='C_id'>"+data.data[i]['id']+"</label><label class='number'>"+data.data[i]['number']+"</label></div>";
					}
					else{
                    	conmmentHtml = conmmentHtml+'<div class="C_content"><div class="C_text"><label class="firstComment">'+data.data[i]['content']+'</label><div class="doubleComment"><label class="toid">'+data.data[i]['toid']+'</label>'+data.data[i]['tocontent']+'</div></div><label class="C_time">'+data.data[i]['time']+'</label><label class="C_id">'+data.data[i]['id']+'</label><label class="number">'+data.data[i]['number']+'</label></div>';
					}
					
				};
				$(".C_list").prepend(conmmentHtml);
				if(data.data!=null){
					var len = data.data.length;
				}
				else{
					var len = 0;
				}
				$("#comment_num").text(len);
				bindHover();
				$(".C_text:first").prepend("<label class='hotcomment'>【最热评论】</label><br/>");			
			}
		);

		$("#submitBtn").bind("mousedown",function(){
			 $(".sendBtn").css("background-position","0px -130px");
		});
		$("#submitBtn").bind("mouseup",function(){
			 $(".sendBtn").css("background-position","0px 0px");
		});
		
		$("#submitBtn").bind("click",function(){

			commentTxt = $("#commentText")[0].value;
			if(commentTxt.substr(0, 3)=="回复【"){
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
						var conmmentHtml = '';
						for(var i in data.data){
							if(data.data[i]['toid']==0){
								conmmentHtml = conmmentHtml+"<div class='C_content'><div class='C_text'>"+data.data[i]['content']+"</div><label class='C_time'>"+data.data[i]['time']+"</label><label class='C_id'>"+data.data[i]['id']+"</label><label class='number'>"+data.data[i]['number']+"</label></div>";
							}
							else{

			                   conmmentHtml = conmmentHtml+'<div class="C_content"><div class="C_text"><label class="firstComment">'+data.data[i]['content']+'</label><div class="doubleComment"><label class="toid">'+data.data[i]['toid']+'</label>'+data.data[i]['tocontent']+'</div></div><label class="C_time">'+data.data[i]['time']+'</label><label class="C_id">'+data.data[i]['di']+'</label><label class="number">'+data.data[i]['number']+'</label></div>';
							}
							
						};
						$(".C_list").empty();
						$(".C_list").prepend(conmmentHtml);
						$(".C_text:first").prepend("<label class='hotcomment'>【最热评论】</label><br/>");	
						$("#commentText")[0].value = "在这里输入对歌手的说的话哦";
						$("#submitBtn").attr("disabled","disabled").css("cursor", "auto");
						$("#comment_num").text(data.data.length);
						$(".sendBtn").css("background-position","0px 0px");
						bindHover();
					}				
				}
			);

		});

		$(window).resize(function() {
			$(".C_list").height($(window).height()-130);
			$(".playList").height($(window).height());
		});
		$(".C_list").height($(window).height()-130);
		$(".playList").height($(window).height());

		$("#commentText").focus(function(){
			if($("#commentText")[0].value=="在这里输入对歌手的说的话哦"){
				$("#commentText")[0].value="";
			}			
		});
		$("#commentText").bind('input propertychange', function() {
		    if($("#commentText")[0].value){
				$(".sendBtn").css("background-position","0px -65px");
				$("#submitBtn").removeAttr("disabled").css("cursor", "pointer");
			}
			else{
				$(".sendBtn").css("background-position","0px 0px");
				$("#submitBtn").attr("disabled","disabled").css("cursor", "auto");
			}
		});


		$("#voteBtn").click(function(){
             	$.getJSON("http://fmmusic.sinaapp.com/index.php/Vote/index/",
				{ "sid": {$data.id} }, 
				function(data){
				switch (data.status){
					case 1: 
                          	VoCount++;                        
                          	$("#likeCount").text(VoCount);
							$(".voteBtn").css("background-position","0px 0px");
							break;
					case 2: 
							$(".voteBtn").css("background-position","0px 0px");
							$(".popbox").css("display","block");
							break;
					case 3: alert("微信id不存在");
						break;
					case 4: alert("网络请求错误");
							break;
                    case 5: alert("现在只能对第二轮的选手进行投票");
							break;
					case 6: alert("歌曲不存在");
							break;
				}
			});

		});

		$("#closePopbox").click(function(){
			$(".popbox").css("display","none");
		});

		$(".songListBtn").toggle(function(){
			$(".playList").animate({left:"0px"});
			$(".playListBG").animate({left:"0px"});
			$("#bdshare").css("display","none");
			$(this).css("background-position","0px 0px");
		},
		function(){
			$(".playListBG").animate({left:"-130px"});
			$(".playList").animate({left:"-130px"});
			$("#bdshare").css("display","block");
			$(this).css("background-position","0px -70px");
		});

		$(".S_info").hover(function(){
			$(this).children(".S_name").css("width","100px");
			$(this).append("<div class='triangle2'></div>"); 
		},
		function(){
			$(".triangle2").remove();
			$(this).children(".S_name").css("width","130px");
		});

		$("#downloadmp3").click(function(){
			$.get("http://fmmusic.sinaapp.com/index.php/Index/add",
				{
					"id" : {$data.id} ,
					"type" : "1"
				},
				function(){
					DlCount++;
					$("#downloadCount").text(DlCount);
				}
			);
		});
		
	/*	$(".jp-play").click(function(){
			$.get("http://fmmusic.sinaapp.com/index.php/Index/add",
				{
					"id" : {$data.id} ,
					"type" : "2"
				},
				function(){
					PlCount++;
					$("#playCount").text(PlCount);
				}
			);
		});*/
		
		$(".goWebsite").remove();

		$(".P_info").hover(function(){
			$(this).prepend("<div class='p_infoBG'></div>");
		},
		function(){
			$(".p_infoBG").remove();
		});
		var num = $("#num").text();
		num--;
		$(".P_info").hover(function(){
			$(this).prepend("<img id='playing' src='__PUBLIC__/img/playing.png'>");
		},
		function(){
			$("#playing").remove();
		});
		
		
	});

	function shunxu(type){
          window.location="__URL__/shunxu?id={$data.id}&type="+type;
    }

    window.onload=function(){
    	$(".playBtn").trigger("click");
    	var t=setTimeout(function(){
			$.get("http://fmmusic.sinaapp.com/index.php/Index/add",
				{
					"id" : {$data.id} ,
					"type" : "2"
				},
				function(){
					PlCount++;
					$("#playCount").text(PlCount);
				}
			);
		},45000);
    }