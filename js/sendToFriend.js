//送给好友
//确定是否赠送
function confirmCardSend(){
	$('#sendPop').show();
	$('#sendPop').find('.poptips').html("是否确定赠送幸运卡?");
	$(document).on('touchstart','.yes1',function(){		
		$('#sendPop').hide();	
		enjoy();
	});
	$(document).on('touchstart','.no1',function(){
		$('#sendPop').hide();
	});
}
//分享提示
function enjoy()
{
	var sendLayer = new LSprite();
	backLayer.addChild(sendLayer);
	sendLayer.addEventListener(LMouseEvent.MOUSE_DOWN,setNull);
	sendLayer.graphics.drawRect(0,'#ffffff',[0,0,LGlobal.width,LGlobal.height],false,'rgba(0,0,0,0.75)');
	var inviteFriends = new LBitmap(new LBitmapData(imgList["inviteFriends"]));
	sendLayer.addChild(inviteFriends);
	//分享
    //如果成功
    window.title="您的好友给您赠送了一份礼物";
    window.fxLink=window.link+"htt/index.html?id="+window.gId+'&uid='+window.uid+"&type=1";

	window.hasGitf=true;
    window.gType=1;
    doShare(sendLayer);
    // AjaxR(window.link+'readyGive','POST',{id:window.gId,"type":1,"__token__":window.token},function(res){});
	//
	// sendLayer.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
	// 	sendLayer.removeAllChild();
	// 	sendLayer.remove();
	// })
}