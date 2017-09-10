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
Target.prototype.moving =function(number){
	var self = this;
	
	if(number>0)
	{
		number--;
		self.setSmall();
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
					self.moving(number);
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
					self.moving(number);
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
					self.moving(number);
				}});
			break;
			case 26:
				LTweenLite.to(self,0.35,{y:targetY[self.step+1]-20}).to(self,0.15,{y:targetY[self.step+1],onComplete:function(){
					self.sx = self.x;
					self.sy = self.y;
					self.step+=1;
					self.step=self.step%26;
					self.moving(number);
				}});
			break;
		}
	}else{
		self.tween = bigAndSmall(self,2,2,1.0,0.1,0.2,true);
		var step = self.step;
		var cashMoney = "yuan1";
		setTimeout(function(){
			switch(step){
				case 3:
					giftCard('card1');
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
					giftCard('card2');
				break;
				case 15:
					giftCard('card3');
				break;
				case 17:
				case 23:
					getCash(cashMoney);
				break;
				case 20:
					giftCard('card1');
				break;
				case 25:
					giftCard('card1');
				break;
				default:
					shankOpen=true;
				break;
			}
		},250);
		
	}
}