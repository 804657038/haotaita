//礼物类
function gift(x,y,name,scales,time){
	base(this,LSprite,[]);
	var self = this;
	self.x = x;
	self.y = y;
	self.scales = scales;
	self.time = time;
	self.img = new LBitmap(new LBitmapData(imgList[name]));
	self.addChild(self.img);
	
}
gift.prototype.play=function(){
	var self = this;
	var bigBeforeX = self.img.x;
	var bigBeforeY = self.img.y;
	var bigAfterX = self.img.x-self.img.getWidth()*self.scales/2;
	var bigAfterY = self.img.y-self.img.getHeight()*self.scales/2;
	self.rotateCenter = true;
	LTweenLite.to(self.img,self.time/2,{x:bigAfterX,y:bigAfterY,scaleX:(1+self.scales),scaleY:(1+self.scales)}).to(self.img,self.time/2,{x:bigBeforeX,y:bigBeforeY,scaleX:1,scaleY:1});
	LTweenLite.to(self.img,self.time/6,{rotate:-30}).to(self.img,self.time/3,{rotate:30}).to(self.img,self.time/3,{rotate:-30}).to(self.img,self.time/6,{rotate:0});
}
//获取的礼物清单
//抱枕
function giftHug(){
	var giftLayer = new LSprite();
	backLayer.addChild(giftLayer);
	giftLayer.addEventListener(LMouseEvent.MOUSE_DOWN,setNull);
	giftLayer.graphics.drawRect(0,'#ffffff',[0,0,LGlobal.width,LGlobal.height],true,'rgba(0,0,0,0.75)');
	var bigHug = new LBitmap(new LBitmapData(imgList['bigHug']));
	bigHug.y = 210;
	bigHug.x = (LGlobal.width-bigHug.getWidth())/2;
	giftLayer.addChild(bigHug);
	
	var fiveEightGet = new LBitmap(new LBitmapData(imgList['fiveEightGet']));
	fiveEightGet.y = 580;
	fiveEightGet.x = (LGlobal.width-fiveEightGet.getWidth())/2;
	giftLayer.addChild(fiveEightGet);
	bigAndSmall(fiveEightGet,2,2,1.0,0.05,0,true);
	
	var goTip = new LBitmap(new LBitmapData(imgList['goTip']));
	goTip.y = 700;
	goTip.x = (LGlobal.width-goTip.getWidth())/2;
	giftLayer.addChild(goTip);
	
	var rightNowGet = new LButton(new LBitmap(new LBitmapData(imgList['rightNowGet'])));
	rightNowGet.y = 805;
	rightNowGet.x = (LGlobal.width-rightNowGet.getWidth())/2;
	giftLayer.addChild(rightNowGet);
	//马上领取
	rightNowGet.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		giftLayer.removeAllChild();
		giftLayer.remove();
		$('#personInfor').show();		
		document.getElementById('personInfor').contentWindow.document.getElementById('box1').style.backgroundImage='url(img/gameBkg.png)';
		document.getElementById('personInfor').contentWindow.document.getElementById('box1').style.display="block";
		document.getElementById('personInfor').contentWindow.document.getElementById('box2').style.display="none";
		document.getElementById('personInfor').contentWindow.document.getElementById('box3').style.display="none";
		document.getElementById('personInfor').contentWindow.document.getElementById('box4').style.display="none";
	})
}
//卡
function giftCard(name){
	var giftLayer = new LSprite();
	backLayer.addChild(giftLayer);
	giftLayer.addEventListener(LMouseEvent.MOUSE_DOWN,setNull);
	giftLayer.graphics.drawRect(0,'#ffffff',[0,0,LGlobal.width,LGlobal.height],true,'rgba(0,0,0,0.75)');
	var light = new LBitmap(new LBitmapData(imgList['light']));
	light.y = 123;
	light.x = 0;
	giftLayer.addChild(light);
	LTweenLite.to(light,8.0,{rotate:360,loop:true,onComplete:function(){
		light.rotate=0;
	}})
	var careGift = new LBitmap(new LBitmapData(imgList[name]));
	careGift.y = 202;
	careGift.x = (LGlobal.width-careGift.getWidth())/2;
	giftLayer.addChild(careGift);
	//好的按钮
	var close = new LButton(new LBitmap(new LBitmapData(imgList['close'])));
	close.y = 814;
	close.x = (LGlobal.width-close.getWidth())/2;
	giftLayer.addChild(close);
	close.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		giftLayer.removeAllChild();
		giftLayer.remove();
		shankOpen=true;
	})
}
//现金
function giftCash(name){
	var giftLayer = new LSprite();
	backLayer.addChild(giftLayer);
	giftLayer.addEventListener(LMouseEvent.MOUSE_DOWN,setNull);
	giftLayer.graphics.drawRect(0,'#ffffff',[0,0,LGlobal.width,LGlobal.height],true,'rgba(0,0,0,0.75)');
	//背景
	var cashBkg = new LBitmap(new LBitmapData(imgList["cashBkg"]));
	cashBkg.y = 141;
	cashBkg.x = (LGlobal.width-cashBkg.getWidth())/2;
	giftLayer.addChild(cashBkg);
	//背景
	var cash = new LBitmap(new LBitmapData(imgList[name]));
	cash.y = 392;
	cash.x = (LGlobal.width-cash.getWidth())/2;
	giftLayer.addChild(cash);
	bigAndSmall(cash,2,2,1.0,0.05,0,true);
	//好的按钮
	var rightNowGet = new LButton(new LBitmap(new LBitmapData(imgList['rightNowGet'])));
	rightNowGet.y = 855;
	rightNowGet.x = (LGlobal.width-rightNowGet.getWidth())/2;
	giftLayer.addChild(rightNowGet);
	bigAndSmall(rightNowGet,2,2,1.0,0.05,0,true);
	rightNowGet.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		giftLayer.removeAllChild();
		giftLayer.remove();
		$('#personInfor').show();		
		document.getElementById('personInfor').contentWindow.document.getElementById('box1').style.backgroundImage='url(img/gameBkg.png)';
		document.getElementById('personInfor').contentWindow.document.getElementById('box1').style.display="block";
		document.getElementById('personInfor').contentWindow.document.getElementById('box2').style.display="none";
		document.getElementById('personInfor').contentWindow.document.getElementById('box3').style.display="none";
		document.getElementById('personInfor').contentWindow.document.getElementById('box4').style.display="none";
	})
}
//现金
function getCash(name,n){
	var giftLayer = new LSprite();
	backLayer.addChild(giftLayer);
	giftLayer.addEventListener(LMouseEvent.MOUSE_DOWN,setNull);
	giftLayer.graphics.drawRect(0,'#ffffff',[0,0,LGlobal.width,LGlobal.height],true,'rgba(0,0,0,0.75)');
	//背景
	var redBkg = new LBitmap(new LBitmapData(imgList["redBkg"]));
	redBkg.y = 255;
	redBkg.x = (LGlobal.width-redBkg.getWidth())/2;
	giftLayer.addChild(redBkg);
	//现金显示
	var cash = new LBitmap(new LBitmapData(imgList[name]));
	cash.y = 350;
	cash.x = (LGlobal.width-cash.getWidth())/2;
	giftLayer.addChild(cash);
//	bigAndSmall(cash,2,2,1.5,0.1,0,true);
	
	var moneytext = new setText(cash.x-16,390,48,n,'#f93849',true);
	giftLayer.addChild(moneytext);
	//红包提示
	var redTips = new LBitmap(new LBitmapData(imgList["redTips"]));
	redTips.y = 594;
	redTips.x = (LGlobal.width-redTips.getWidth())/2;
	giftLayer.addChild(redTips);
	bigAndSmall(redTips,2,2,1.5,0.1,0,true);
	//变闭按钮
	var close = new LButton(new LBitmap(new LBitmapData(imgList['close'])));
	close.y = 814;
	close.x = (LGlobal.width-close.getWidth())/2;
	giftLayer.addChild(close);
	close.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		giftLayer.removeAllChild();
		giftLayer.remove();
		shankOpen=true;
	})
}
//骰子
function getDice(){
	var giftLayer = new LSprite();
	backLayer.addChild(giftLayer);
	giftLayer.addEventListener(LMouseEvent.MOUSE_DOWN,setNull);
	giftLayer.graphics.drawRect(0,'#ffffff',[0,0,LGlobal.width,LGlobal.height],true,'rgba(0,0,0,0.75)');
	//背景
	var diceBkg = new LBitmap(new LBitmapData(imgList["diceBkg"]));
	diceBkg.y = 324;
	diceBkg.x = (LGlobal.width-diceBkg.getWidth())/2;
	giftLayer.addChild(diceBkg);
	//提示
	var diceTitle = new LBitmap(new LBitmapData(imgList["diceTitle"]));
	diceTitle.y = 620;
	diceTitle.x = (LGlobal.width-diceTitle.getWidth())/2;
	giftLayer.addChild(diceTitle);
	bigAndSmall(diceTitle,2,2,1.5,0.1,0,true);
	//变闭按钮
	var close = new LButton(new LBitmap(new LBitmapData(imgList['close'])));
	close.y = 814;
	close.x = (LGlobal.width-close.getWidth())/2;
	giftLayer.addChild(close);
	close.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		giftLayer.removeAllChild();
		giftLayer.remove();
		shankOpen=true;
	})
}
