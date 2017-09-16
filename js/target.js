function Target(x,y,name,step){
	base(this,LSprite,[]);
	var self =this;
	self.x = x;
	self.y = y;
	self.step = step;
	self.sx = self.x;
	self.sy = self.y;
	self.img = new LBitmap(new LBitmapData(imgList[name]));
	self.addChild(self.img);
	self.tween = bigAndSmall(self,2,2,1.0,0.1,0.2,true);
	//微信头像

	var tou = new LBitmap(new LBitmapData(wechatHead));//实例化背景

	tou.x=8;
	tou.y=8;
	tou.scaleX = 59/tou.getWidth();
	tou.scaleY = 59/tou.getHeight();
	var maskObj = new LSprite();
    maskObj.graphics.drawArc(8, "#1166ff", [37, 37, 29, 0,Math.PI*2]);
    tou.mask = maskObj;
	self.addChild(tou);//添加到人物层
	//跳的声音
	self.sound = new LSound();
	self.addChild(self.sound);
	self.sound.load('music/jump.wav');
}
//设置变小
Target.prototype.setSmall=function(){
	var self =this;
	LTweenLite.remove(self.tween);
	LTweenLite.to(self,0.1,{x:self.sx,y:self.sy,scaleX:1.0,scaleY:1.0});
}
////人物动态
//Target.prototype.bigXsmall =function(){
//	var self = this;
//
//}
//人物移动
Target.prototype.moving =function(number,pcid){
	var self = this;
	if(number>0)
	{
		number--;
		self.setSmall();
		self.sound.play();
		switch(self.step)
		{
			case 0:
			case 1:
			case 2:
			case 4:
			case 5:
			case 13:
			case 14:
			case 15:
			case 17:
			case 18:
			case 25:
				LTweenLite.to(self,0.5,{coordinate:stepList[self.step][0],onComplete:function(){
					self.sx = self.x;
					self.sy = self.y;
					self.step+=1;
					self.moving(number,pcid);
				}});
				break;
			case 3:
			case 6:
			case 7:
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
				LTweenLite.to(self,0.2,{y:(targetY[self.step]-30)}).to(self,0.3,{y:(targetY[self.step+1]),onComplete:function(){
					self.sx = self.x;
					self.sy = self.y;
					self.step+=1;
					self.moving(number,pcid);
				}});
				break;
			case 16:
			case 17:
			case 18:
			case 19:
			case 20:
			case 21:
			case 22:
			case 23:
			case 24:
				LTweenLite.to(self,0.35,{y:targetY[self.step+1]-20}).to(self,0.15,{y:targetY[self.step+1],onComplete:function(){
					self.sx = self.x;
					self.sy = self.y;
					self.step+=1;
					self.step=self.step%26;
					self.moving(number,pcid);
				}});
			break;
			case 26:
				LTweenLite.to(self,0.35,{y:targetY[self.step+1]-20}).to(self,0.15,{y:targetY[self.step+1],onComplete:function(){
					self.sx = self.x;
					self.sy = self.y;
					self.step+=1;
					self.step=self.step%26;
					self.moving(number,pcid);
				}});
			break;
		}
	}else{
		self.tween = bigAndSmall(self,2,2,1.0,0.1,0.2,true);
		var step = self.step;		
		setTimeout(function(){
            var cardName='card'+pcid;
			switch(step){
				case 3:
					giftCard(cardName);
				break;
				case 5:
				case 10:
					getDice();
				break;
				case 6:
					giftCash('giftCash188');
				break;
				case 8:
				case 21:
					giftHug();
				break;
				case 12:
					giftCash('giftCash388');
				break;
				case 13:
					giftCard(cardName);
				break;
				case 15:
					giftCard(cardName);
				break;
				case 17:
				case 23:
					//获取钱数
					var cashMoney =window.money;
					getCash("yuan1",cashMoney);
				break;
				case 20:
					giftCard(cardName);
				break;
				case 25:
					giftCard(cardName);
				break;
				default:
					var elsen = parseInt(Math.random()*5);
					elsePop(elsen);
				break;
			}
		},250);
		
	}
}