//变大变小
function bigAndSmall(tween,x,y,time,scales,delayTime,loops){
	var bigBeforeX = tween.x;
	var bigBeforeY = tween.y;
	var bigAfterX = tween.x-tween.getWidth()*scales/x;
	var bigAfterY = tween.y-tween.getHeight()*scales/y;
	return LTweenLite.to(tween,time/2,{loop:loops,delay:delayTime,x:bigAfterX,y:bigAfterY,scaleX:(1+scales),scaleY:(1+scales)}).to(tween,time/2,{x:bigBeforeX,y:bigBeforeY,scaleX:1,scaleY:1});

}
//获取原型路径
function getX(x,r,a,i){
	if(i>10&&i<20)
	{
		return x-r*(1-Math.cos(a));
	}else{
		return x+r*(1-Math.cos(a));	
	}

}
function getY(y,r,a){
	return y-r*Math.sin(a);
}
//获取步数数据
function getStepList(x,y,r,j){
	var list = [];
	for(var i=2;i<=180;i+=2)
	{
		list.push({
			x:getX(x,r,i*Math.PI/180,j),
			y:getY(y,r,i*Math.PI/180)
		})
	}
	return list;
}
//空函数
function setNull(){
	
}
//闪闪发光
function bling(target,time,alphaB,alphaA){
	LTweenLite.to(target,time,{alpha:alphaB,loop:true}).to(target,time,{alpha:alphaA});
}
//设置文字
function setText(x,y,size,text,color,weight)
{
	base(this,LSprite,[]);
	var word = new LTextField();
	word.text = text;
	word.color = color;
	word.size = size;
	var self = this;
	self.x = x;
	self.y = y;
	if(weight==true)
	{
		word.weight ="bolder";
	}
	self.addChild(word);
}
//挑战结果
function gameResult(bkg,tip){
	var resultLayer = new LSprite();
	backLayer.addChild(resultLayer);
	resultLayer.addEventListener(LMouseEvent.MOUSE_DOWN,setNull);
	resultLayer.graphics.drawRect(0,'#ffffff',[0,0,LGlobal.width,LGlobal.height],true,'rgba(0,0,0,0.75)');
	var light = new LBitmap(new LBitmapData(imgList['light']));
	light.y = 123;
	light.x = 0;
	resultLayer.addChild(light);
	LTweenLite.to(light,8.0,{rotate:360,loop:true,onComplete:function(){
		light.rotate=0;
	}})
	//背景
	var resultBkg = new LBitmap(new LBitmapData(imgList[bkg]));
	resultBkg.y = 211;
	resultBkg.x = (LGlobal.width-resultBkg.getWidth())/2;
	resultLayer.addChild(resultBkg);
	//背景
	var resultTips = new LBitmap(new LBitmapData(imgList[tip]));
	resultTips.y = 700;
	resultTips.x = (LGlobal.width-resultTips.getWidth())/2;
	resultLayer.addChild(resultTips);
	bigAndSmall(resultTips,2,2,1.2,0.1,0,true);
	//确定按钮
	var comfirm = new LButton(new LBitmap(new LBitmapData(imgList['comfirm'])));
	comfirm.y = 756;
	comfirm.x = (LGlobal.width-comfirm.getWidth())/2;
	resultLayer.addChild(comfirm);
	comfirm.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		resultLayer.removeAllChild();
		resultLayer.remove();
	})
}
//信息轮播
function banner(x,y,texts)
{
	base(this,LSprite,[]);
	var self=this;
	self.x = x;
	self.y = y;
	for(var i=0;i<texts.length;i++)
	{
		if(i==0)
		{
			self.addChild(new setText(0,0,20,texts[i],'#fff7b1'));
		}else{
			self.addChild(new setText(texts[i].length*18*i+i*20,0,20,texts[i],'#fff7b1'));
		}
	}
}

function longCardClass(x,y,cardOrder){
	base(this,LSprite,[]);
	var self = this;
	self.x = x;
	self.y = y;
	self.index = cardOrder;
	self.hasCard = new LBitmap(new LBitmapData(imgList['samllCard'+cardOrder+cardOrder+cardOrder]));
	self.addChild(self.hasCard);
}
//分享给好友
function shareToFriends(){
	var shareLayer = new LSprite();
	backLayer.addChild(shareLayer);
	shareLayer.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		shareLayer.removeAllChild();
		shareLayer.remove();
		gameOrInvite(true);
	});
	shareLayer.graphics.drawRect(0,'#ffffff',[0,0,LGlobal.width,LGlobal.height],false,'rgba(0,0,0,0.75)');
	//背景
	var shareFriends = new LBitmap(new LBitmapData(imgList["shareFriends"]));
	shareLayer.addChild(shareFriends);
}