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
	self.textList = new Array(texts.length);
	for(var i=0;i<texts.length;i++)
	{
		if(i==0)
		{
			self.textList[i] = new setText(0,0,20,texts[i],'#fff7b1');
			self.addChild(self.textList[i]);
		}else{
			self.textList[i] = new setText(self.textList[i-1].x+self.textList[i-1].getWidth()+20,0,20,texts[i],'#fff7b1');
			self.addChild(self.textList[i]);
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
	window.hasShare=true;
	shareLayer.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		shareLayer.removeAllChild();
		shareLayer.remove();

		if(window.shareNum<=0){

//          gameOrInvite(true);
// 			$('#allPopWindow').show();
// 			$('#allPopWindow .winTips').html('你已完成今天首次分享任务，<br/>再次分享不会获得骰子。');
		}else{
			shankOpen=true;
		}
	});
	shareLayer.graphics.drawRect(0,'#ffffff',[0,0,LGlobal.width,LGlobal.height],false,'rgba(0,0,0,0.75)');
	//背景
	var shareFriends = new LBitmap(new LBitmapData(imgList["shareFriends"]));
	shareLayer.addChild(shareFriends);
}
//打地鼠
var mouseylist = [];
var mouseglist = [];
var greenx = [33,253,473,33,253,473,33,253,473];
var greeny = [428,428,428,627,627,627,824,824,824];
var yellowx = [33,253,473,33,253,478,33,253,473];
var yellowy = [447,447,447,646,646,646,843,843,843];
var tCount;
var dScore;
var playNumber = 0;
var playCheck = true;
var timenumber = 20;
var mouseLayer0;
var hitSound;
function hitMouse(){
	//地鼠游戏层
	mouseLayer0 = new LSprite();
	backLayer.addChild(mouseLayer0);
	mouseLayer0.addEventListener(LMouseEvent.MOUSE_DOWN,setNull);
	mouseLayer0.graphics.drawRect(0,'#ffffff',[0,0,LGlobal.width,LGlobal.height],false,'rgba(0,0,0,0.75)');
	//背景
	var mouseBkg = new LBitmap(new LBitmapData(imgList["mouseBkg"]));
	mouseLayer0.addChild(mouseBkg);
	//时间和分数文本
	tCount = new setText(180,51,30,timenumber+"s",'#eb6855',true);
	mouseLayer0.addChild(tCount);
	dScore = new setText(180,111,30,0,'#ffa500',true);
	mouseLayer0.addChild(dScore);
	//
	for(var i=0;i<greenx.length;i++)
	{
		mouseylist[i] = new mousey(yellowx[i],yellowy[i])
		mouseLayer0.addChild(mouseylist[i]);
		mouseglist[i] = new mouse(greenx[i],greeny[i])
		mouseLayer0.addChild(mouseglist[i]);
	}
	 //添加音乐
	var music = new musicBtn(LGlobal.width-60,15,0.75,0.75,imgList['music']);
	mouseLayer0.addChild(music);
	
	//添加提示
	var tipsLayer = new LSprite();
	mouseLayer0.addChild(tipsLayer);
	tipsLayer.addEventListener(LMouseEvent.MOUSE_DOWN,setNull);
	tipsLayer.graphics.drawRect(0,'#ffffff',[0,0,LGlobal.width,LGlobal.height],false,'rgba(0,0,0,0.75)');
	//背景
	var mouseTips = new LBitmap(new LBitmapData(imgList["mouseTips"]));
	tipsLayer.addChild(mouseTips);
	//开始挑战
	var fight = new LButton(new LBitmap(new LBitmapData(imgList["fight"])));	
	fight.y = 840;
	fight.x = (LGlobal.width-fight.getWidth())/2;
	tipsLayer.addChild(fight);
	bigAndSmall(fight,2,2,1.2,0.05,0,true);
	fight.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		tipsLayer.remove();
		tipsLayer.removeAllChild();
		startPlaying();
	});
	//添加打的声音
	hitSound = new LSound();
	mouseLayer0.addChild(hitSound);
	hitSound.load('music/hit.mp3');
}
//打地鼠
function startPlaying(){
	var mouseLayer = new LSprite();
	backLayer.addChild(mouseLayer);
	mouseLayer.addEventListener(LMouseEvent.MOUSE_DOWN,setNull);
	mouseLayer.graphics.drawRect(0,'#ffffff',[0,0,LGlobal.width,LGlobal.height],true,'rgba(0,0,0,0.75)');
	var timeCount = new setText(270,430,260,3,'#ffffff',true);
	mouseLayer.addChild(timeCount);
	document.getElementById('three').play();
	var time = setInterval(function(){	
		timeCount.childList["0"].text--;
		if(timeCount.childList["0"].text==0)
		{
			document.getElementById('zero').play();
		}
		if(timeCount.childList["0"].text==-1)
		{
			clearInterval(time);
			mouseLayer.remove();
			mouseLayer.removeAllChild();
			setTimeout(function(){
					
				var x1=-1;
				var x2=-1;
				var x3=-1;
				var daoshu =  LTweenLite.to(backLayer,1.0,{onStart:function(){
					/*
					 * games3为3个骰子，games2为2个骰子，games1为1个骰子，gameError为0个骰子
					 * 赢得骰子数发送到后台
					 */
					if(timenumber==-1)
					{
						AjaxR(window.link+'games/',"POST",{
							"fraction":dScore.childList[0].text,
							"__token__":window.token
						},function(res){
							if(res.code==1){
	                            // diceNumberWord=res.dice;

	                            if(dScore.childList[0].text>=30)
	                            {
	                                gameResults('games3',res.dice);
	                            }else if(dScore.childList[0].text>=20){
	                                gameResults('games2',res.dice);
	                            }else if(dScore.childList[0].text>=10){
	                                gameResults('games1',res.dice);
	                            }else{
	                                gameResults('gameError');
	                            }
							}else{
	                            if(dScore.childList[0].text>=10){
	                                gameResults('gameSuccess');
	                            }else{
	                                gameResults('gameError');
	                            }
							}
	
						});
						LTweenLite.remove(daoshu);
						//判断是否为今天第一次玩
						
					}else{
						tCount.childList[0].text=timenumber+'s';
						timenumber--;
						x1=parseInt(Math.random()*3);
						x2=3+parseInt(Math.random()*3);
						x3=6+parseInt(Math.random()*3);
						if(parseInt(Math.random()*2)==0)
						{
							mouseglist[x1].showing();
						}else{
							mouseylist[x1].showing();
						}
						if(parseInt(Math.random()*2)==0)
						{
							mouseylist[x2].showing();
						}else{
							mouseglist[x2].showing();
						}
						if(parseInt(Math.random()*2)==0)
						{
							mouseglist[x3].showing();
						}else{
							mouseylist[x3].showing();
						}
					}			
				},loop:true});
			},800);
		}
	},1000);
}
function mouse(x,y){
	base(this,LSprite,[]);
	var self = this;
	self.x = x;
	self.y = y;
	self.green1 = new LButton(new LBitmap(new LBitmapData(imgList["green1"])));
	self.green1.visible=false;
	self.addChild(self.green1);
	self.green1.buttonMode = false;
	self.green2 = new LButton(new LBitmap(new LBitmapData(imgList["green2"])));
	self.green2.visible=false;
	self.green2.y = -44;
	self.addChild(self.green2);
	self.green2.buttonMode = false;
	self.green3 = new LButton(new LBitmap(new LBitmapData(imgList["green0"])));
	self.green3.visible=false;
	self.green3.y = -17;
	self.addChild(self.green3);
	self.green3.buttonMode = false;
	self.s1 = new LButton(new LBitmap(new LBitmapData(imgList["s1"])));
	self.s1.visible=false;
	self.s1.x = 70;
	self.s1.y = -20;
	self.addChild(self.s1);
	self.s1.buttonMode = false;
	self.hitCheck = true;
	self.green1.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		if(self.hitCheck == true)
		{
			hitSound.play();
			self.hitCheck = false;
			LTweenLite.remove(self.tween);
			self.green1.visible = false;
			self.green2.visible = false;
			self.green3.visible = true;
			self.s1.visible = true;
			dScore.childList[0].text++;
			LTweenLite.to(self.s1,0.25,{alpha:0,y:-40,onComplete:function(){
				self.s1.visible=false;
				self.s1.alpha=1.0;
			}});
			LTweenLite.to(self.green3,0.25,{alpha:0,onComplete:function(){
				self.green3.visible=false;
				self.green3.alpha = 1.0;
				self.hitCheck = true;
			}});
		}
		
	});
	self.green2.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		if(self.hitCheck == true)
		{
			hitSound.play();
			self.hitCheck = false;
			LTweenLite.remove(self.tween);
			self.green1.visible = false;
			self.green2.visible = false;
			self.green3.visible = true;
			self.s1.visible = true;
			dScore.childList[0].text++;
			LTweenLite.to(self.s1,0.25,{alpha:0,y:-40,onComplete:function(){
				self.s1.visible=false;
				self.s1.alpha=1.0;
			}});
			LTweenLite.to(self.green3,0.25,{alpha:0,onComplete:function(){
				self.green3.visible=false;
				self.green3.alpha = 1.0;
				self.hitCheck = true;
			}});
		}
	});
}
mouse.prototype.showing=function(){
	var self = this;
	var index = 0;
	self.tween = LTweenLite.to(self,0.25,{onStart:function(){
		index++;
		switch(index){
			case 1:
			case 3:
				self.green1.visible = true;
				self.green2.visible = false;
				self.green3.visible = false;
				break;
			case 2:
				self.green1.visible = false;
				self.green2.visible = true;
				self.green3.visible = false;
				break;
			case 4:
				self.green1.visible = false;
				self.green2.visible = false;
				self.green3.visible = false;
				LTweenLite.remove(self.tween);
				break;
		}
	},loop:true});
}
function mousey(x,y){
	base(this,LSprite,[]);
	var self = this;
	self.x = x;
	self.y = y;
	self.yellow1 = new LButton(new LBitmap(new LBitmapData(imgList["yellow1"])));
	self.yellow1.visible=false;
	self.yellow1.buttonMode = false;
	self.addChild(self.yellow1);
	self.yellow2 = new LButton(new LBitmap(new LBitmapData(imgList["yellow2"])));
	self.yellow2.visible=false;
	self.yellow2.y = -13;
	self.addChild(self.yellow2);
	self.yellow2.buttonMode = false;
	self.yellow3 = new LButton(new LBitmap(new LBitmapData(imgList["yellow0"])));
	self.yellow3.visible=false;
	self.yellow3.y = -30;
	self.addChild(self.yellow3);
	self.yellow3.buttonMode = false;
	self.s1 = new LButton(new LBitmap(new LBitmapData(imgList["s1"])));
	self.s1.visible=false;
	self.s1.x = 70;
	self.s1.y = -20;
	self.addChild(self.s1);
	self.s1.buttonMode = false;
	self.hitCheck = true;
	self.yellow1.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		if(self.hitCheck == true)
		{
			hitSound.play();
			self.hitCheck = false;
			LTweenLite.remove(self.tween);
			self.yellow1.visible = false;
			self.yellow2.visible = false;
			self.yellow3.visible = true;
			self.s1.visible = true;
			dScore.childList[0].text++;
			LTweenLite.to(self.s1,0.25,{alpha:0,y:-40,onComplete:function(){
				self.s1.visible=false;
				self.s1.alpha=1.0;
			}});
			LTweenLite.to(self.yellow3,0.25,{alpha:0,onComplete:function(){
				self.yellow3.visible=false;
				self.yellow3.alpha = 1.0;
				self.hitCheck = true;
			}});
		}
		
	});
	self.yellow2.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		if(self.hitCheck == true)
		{
			hitSound.play();
			self.hitCheck = false;
			LTweenLite.remove(self.tween);
			self.yellow1.visible = false;
			self.yellow2.visible = false;
			self.yellow3.visible = true;
			self.s1.visible = true;
			dScore.childList[0].text++;
			LTweenLite.to(self.s1,0.25,{alpha:0,y:-40,onComplete:function(){
				self.s1.visible=false;
				self.s1.alpha=1.0;
			}});
			LTweenLite.to(self.yellow3,0.25,{alpha:0,onComplete:function(){
				self.yellow3.visible=false;
				self.yellow3.alpha = 1.0;
				self.hitCheck = true;
			}});
		}
	});
	self.tween = null;
}
mousey.prototype.showing=function(){
	var self = this;
	var index = 0;
	self.tween = LTweenLite.to(self,0.25,{onStart:function(){
		index++;
		switch(index){
			case 1:
			case 3:
				self.yellow1.visible = true;
				self.yellow2.visible = false;
				self.yellow3.visible = false;
				break;
			case 2:
				self.yellow1.visible = false;
				self.yellow2.visible = true;
				self.yellow3.visible = false;
				break;
			case 4:
				self.yellow1.visible = false;
				self.yellow2.visible = false;
				self.yellow3.visible = false;
				LTweenLite.remove(self.tween);
				break;
		}
	},loop:true});
}
//确定闯关
function gameResults(bkg,number){
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
	}});
	
	
	//背景
	var resultBkg = new LBitmap(new LBitmapData(imgList[bkg]));
	resultBkg.y = 211;
	resultBkg.x = (LGlobal.width-resultBkg.getWidth())/2;
	resultLayer.addChild(resultBkg);
	var comfirm = new LButton(new LBitmap(new LBitmapData(imgList['comfirm'])));
	comfirm.y = 766;
	comfirm.x = (LGlobal.width-comfirm.getWidth())/2;
	resultLayer.addChild(comfirm);
	var ntext =  new setText(315,698,30,number,'#902a24',true);
	resultLayer.addChild(ntext);
	var tipText1 = new setText(0,683,30,"您今天已经获取3枚骰子",'#902a24',true);
	tipText1.x = (LGlobal.width-tipText1.getWidth())/2;
	resultLayer.addChild(tipText1);
	tipText1.visible = false;
	var tipText2 = new setText(0,717,30,"请明天再来",'#902a24',true);
	tipText2.x = (LGlobal.width-tipText2.getWidth())/2;
	tipText2.visible = false;
	resultLayer.addChild(tipText2);
	if(!number){
		light.visible =false;
		ntext.visible = false;
	}else{
        diceNumberWord.childList[0].text+=number;
	}
	if(bkg=='gameSuccess'){
		ntext.visible = false;
		tipText1.visible = true;
		tipText2.visible = true;
	}
	comfirm.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		resultLayer.removeAllChild();
		resultLayer.remove();
		playCheck=true;
		dScore.childList[0].text=0;
		timenumber=20;
		tCount.childList[0].text=timenumber+'s';
		mouseLayer0.removeAllChild();
		mouseLayer0.remove();
		document.getElementById('Jaudio').play();
		document.getElementById('mouseMusic').pause();
	})
}
