	$(function(){
			var div = '<div class="songInfoBG"></div>';
			$(".songInfo").hover(function(){
					$(this).prepend(div);
				},
				function(){
					$(".songInfoBG").remove();
				}
			);
			$("#searchText").focus(function(){
				if($(this).attr("value")=="输入选手编号,姓名,歌曲信息"){
					$(this).attr("value","");
				}
			});

			
			$("#closeBtn").click(function(){
				$(".popBoard").css("display","none");
				$("#searchList").empty();
				$(".nofind").css("display","none");
			});

			$("#searchBtn").click(function(){
				var searchText = $("#searchText").attr("value").toString();
				$.getJSON("http://fmmusic.sinaapp.com/Index/search/",{
					"keyword":searchText
				},function(data){
					if(data.status==0){
					var searchHtml = '';
					var info = data.data.data;
					for( i in info){
						searchHtml = searchHtml+'<a href="http://fmmusic.sinaapp.com/index.php/Index/index/id/'+info[i]['id']+'" class="S_info"><div class="S_songInfo"><label class="S_num">'+info[i]['no']+'</label><label class="S_singerName">'+info[i]['name']+'</label><label class="S_songName">'+info[i]['song_name']+'</label></div></a>';
					}
					$("#searchLength").text(data.data.count);
					$("#searchList").prepend(searchHtml);
					$(".popBoard").css("display","block");
					$(".S_songInfo").hover(function(){
							$(this).prepend('<div class="hoveringBar"></div><div class="S_songInfoBG"></div>');
						},
						function(){
							$(".hoveringBar").remove();
							$(".S_songInfoBG").remove();
						});
					}
					else{
						$(".nofind").css("display","block");
						$(".popBoard").css("display","block");
					}
					});
				});
		});

	$(document).keydown(function(event){ 
        if(event.keyCode==13){
        	$(".searchBtn").trigger("click");
       	} 
    });
		