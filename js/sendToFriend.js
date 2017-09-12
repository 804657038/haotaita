//送给好友
//输入错误提示
function sendError()
{
	var sendLayer = new LSprite();
	backLayer.addChild(sendLayer);
	sendLayer.addEventListener(LMouseEvent.MOUSE_DOWN,setNull);
	sendLayer.graphics.drawRect(0,'#ffffff',[0,0,LGlobal.width,LGlobal.height],true,'rgba(0,0,0,0.75)');
	var writeError = new LBitmap(new LBitmapData(imgList["writeError"]));
	writeError.y = (LGlobal.height-writeError.getHeight())/2;
	writeError.x = (LGlobal.width-writeError.getWidth())/2;
	sendLayer.addChild(writeError);
	//好的按钮
	var fineLayer = new LSprite();
	sendLayer.addChild(fineLayer);
	fineLayer.graphics.drawRect(0,'#ffffff',[91,585,524,90],false,'rgba(0,0,0,0.75)');
	fineLayer.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		sendLayer.removeAllChild();
		sendLayer.remove();
	})
}
//确定个人信息
function confirmPersonalInfor(){
	var sendLayer = new LSprite();
	backLayer.addChild(sendLayer);
	sendLayer.addEventListener(LMouseEvent.MOUSE_DOWN,setNull);
	sendLayer.graphics.drawRect(0,'#ffffff',[0,0,LGlobal.width,LGlobal.height],true,'rgba(0,0,0,0.75)');
	var comfirmPerson = new LBitmap(new LBitmapData(imgList["comfirmPerson"]));
	comfirmPerson.y = (LGlobal.height-comfirmPerson.getHeight())/2;
	comfirmPerson.x = (LGlobal.width-comfirmPerson.getWidth())/2;
	sendLayer.addChild(comfirmPerson);
	//确认按钮
	var fineLayer = new LSprite();
	sendLayer.addChild(fineLayer);
	fineLayer.graphics.drawRect(0,'#ffffff',[91,585,262,90],false,'rgba(0,0,0,0.75)');
	fineLayer.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		sendLayer.removeAllChild();
		sendLayer.remove();
		confirmCardSend();
	});
	//取消按钮
	var cancelLayer = new LSprite();
	sendLayer.addChild(cancelLayer);
	cancelLayer.graphics.drawRect(0,'#ffffff',[353,585,262,90],false,'rgba(0,0,0,0.75)');
	cancelLayer.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		sendLayer.removeAllChild();
		sendLayer.remove();
	});
}
//确定是否赠送
function confirmCardSend(){
	var sendLayer = new LSprite();
	backLayer.addChild(sendLayer);
	sendLayer.addEventListener(LMouseEvent.MOUSE_DOWN,setNull);
	sendLayer.graphics.drawRect(0,'#ffffff',[0,0,LGlobal.width,LGlobal.height],true,'rgba(0,0,0,0.75)');
	var comfirmCard = new LBitmap(new LBitmapData(imgList["comfirmCard"]));
	comfirmCard.y = (LGlobal.height-comfirmCard.getHeight())/2;
	comfirmCard.x = (LGlobal.width-comfirmCard.getWidth())/2;
	sendLayer.addChild(comfirmCard);
	//确认按钮
	var fineLayer = new LSprite();
	sendLayer.addChild(fineLayer);
	fineLayer.graphics.drawRect(0,'#ffffff',[91,585,262,90],false,'rgba(0,0,0,0.75)');
	fineLayer.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		sendLayer.removeAllChild();
		sendLayer.remove();
		enjoy();
	});
	//取消按钮
	var cancelLayer = new LSprite();
	sendLayer.addChild(cancelLayer);
	cancelLayer.graphics.drawRect(0,'#ffffff',[353,585,262,90],false,'rgba(0,0,0,0.75)');
	cancelLayer.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		sendLayer.removeAllChild();
		sendLayer.remove();
	});
}
//赠送成功
function sendSuccessful()
{
	var sendLayer = new LSprite();
	backLayer.addChild(sendLayer);
	sendLayer.addEventListener(LMouseEvent.MOUSE_DOWN,setNull);
	sendLayer.graphics.drawRect(0,'#ffffff',[0,0,LGlobal.width,LGlobal.height],true,'rgba(0,0,0,0.75)');
	var sendSuccess = new LBitmap(new LBitmapData(imgList["sendSuccess"]));
	sendSuccess.y = (LGlobal.height-sendSuccess.getHeight())/2;
	sendSuccess.x = (LGlobal.width-sendSuccess.getWidth())/2;
	sendLayer.addChild(sendSuccess);
	//好的按钮
	var fineLayer = new LSprite();
	sendLayer.addChild(fineLayer);
	fineLayer.graphics.drawRect(0,'#ffffff',[91,585,524,90],false,'rgba(0,0,0,0.75)');
	fineLayer.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		sendLayer.removeAllChild();
		sendLayer.remove();
	})
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
	sendLayer.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		sendLayer.removeAllChild();
		sendLayer.remove();
		//如果成功
		if(0){
			sendSuccessful();
		}else{
			sendError();
		}
	})
}