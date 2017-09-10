//音乐按钮类
function musicBtn(x,y,sx,sy,name){
	base(this,LSprite,[]);
	var self = this;
	self.x=x;
	self.y=y;
	self.open=true;
	var musicImg = new LBitmap(new LBitmapData(name));
	musicImg.scaleX = sx;
	musicImg.scaleY = sy;
	self.musicplay = LTweenLite.to(musicImg,1.0,{rotate:360,loop:true,onComplete:function(){
		musicImg.rotate = 0;
	}})
	self.addChild(musicImg);
	self.graphics.drawRect(0,'#000000',[0,0,musicImg.getWidth(),musicImg.getHeight()],false,'#ff0000');
	self.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		if(self.open==true)
		{
			document.getElementById('Jaudio').pause();
			self.open = false;
			self.musicplay.pause();
			
		}else{
			document.getElementById('Jaudio').play();
			self.open = true;
			self.musicplay.resume();
		}
	})
}
