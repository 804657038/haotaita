//游戏界面初始化
LInit(1000/60,"good",700,1135,main);
//游戏入口函数
function main(){
	LGlobal.stageScale = LStageScaleMode.EXACT_FIT;//设置全屏变量
    LGlobal.screen(LStage.FULL_SCREEN);//设置全面适应
    backLayer = new LSprite();//创建背景层
    addChild(backLayer);//添加背景层到游戏环境中                         
    LLoadManage.load(loadImg,"",loading);//读取加载页面背景图片
}
//加载背景
function loading(result){
	//背景
	var loadingBkg = new LBitmap(new LBitmapData(result['loadingBkg']));//实例化背景
	backLayer.addChild(loadingBkg);//添加到背景层
	//身体
	person = new LBitmap(new LBitmapData(result['person']));//实例化刘涛身体
	person.x = 155;//刘涛身体位置x//155 280
	person.y = 392;//刘涛身体位置y
	backLayer.addChild(person);//添加到背景层
	//加载框
	var box = new LBitmap(new LBitmapData(result['box']));//实例化加载框
	box.x = (LGlobal.width-box.getWidth())/2;//加载框位置x 
	box.y = 538;//加载框位置y
	backLayer.addChild(box);//添加到背景层
	//加载条
	var loading = new LBitmap(new LBitmapData(result['loading']));//实例化加载条
	loading.x = (LGlobal.width-loading.getWidth())/2;//加载条位置x
	loading.y = 548;//加载条位置y
	backLayer.addChild(loading);//添加到背景层
	LTweenLite.to(loading,0.4,{alpha:0.5,loop:true}).to(loading,0.4,{alpha:1.0});//加载条变化
	//logo
	var logo = new LBitmap(new LBitmapData(result['logo']));//实例化logo
	logo.x = (LGlobal.width-logo.getWidth())/2;//logo位置x 
	logo.y = 635;//logo位置y
	backLayer.addChild(logo);//添加到背景层
	LTweenLite.to(logo,0.6,{x:234.5,y:632,scaleX:1.1,scaleY:1.1,loop:true}).to(logo,0.6,{scaleX:1.0,scaleY:1.0,x:245,y:635});//加载条变化
	//添加音乐
	var music = new musicBtn(635,15,0.75,0.75,result['music']);
	backLayer.addChild(music);
	//加载图片
    LLoadManage.load(gameImg,loadPro,gameStart);//读取加载页面背景图片
}
//加载进度条
function loadPro(per){
	person.x = 155+280*per/100;
}
//开始游戏
function gameStart(result){
	imgList = result;
	setHomepage();//跳转首页
//	giftHug();
//	giftCard('Gift4');
//	myCard();
//	ConposeMyCard();
//	myAward();
//	getDice();
}
//首页
function setHomepage(){
	//清除所有
	backLayer.die();
	backLayer.removeAllEventListener();
	backLayer.removeAllChild();
	//背景
	var homepage = new LBitmap(new LBitmapData(imgList['homepage']));//实例化背景
	backLayer.addChild(homepage);//添加到背景层
	//提示
	var dayTip = new LBitmap(new LBitmapData(imgList['dayTip']));
	dayTip.x = 12;
	dayTip.y = 612;
	backLayer.addChild(dayTip);//添加到背景层
	LTweenLite.to(dayTip,1.0,{x:22,y:622,loop:true}).to(dayTip,1.0,{x:12,y:612});
	//开始
	var start = new LButton(new LBitmap(new LBitmapData(imgList['start'])));
	start.x = 128;
	start.y = 850;
	backLayer.addChild(start);//添加到背景层
	bigAndSmall(start,2,2,1.0,0.05,0,true);
	
	//我的背包
	var backBag = new LButton(new LBitmap(new LBitmapData(imgList['backBag'])));
	backBag.x = 128;
	backBag.y = 970;
	backLayer.addChild(backBag);
	backBag.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		myAward();
	});
	//活动规则
	var rules = new LButton(new LBitmap(new LBitmapData(imgList['rules'])));
	rules.x = 582;
	backLayer.addChild(rules);//添加到背景层
	rules.addEventListener(LMouseEvent.MOUSE_DOWN,showRules);
	//奖品设置
	var awardSet = new LButton(new LBitmap(new LBitmapData(imgList['awardSet'])));
	awardSet.x = 483;
	backLayer.addChild(awardSet);//添加到背景层
	awardSet.addEventListener(LMouseEvent.MOUSE_DOWN,showAwardSet);
	//提示
	var airer = new LBitmap(new LBitmapData(imgList['airer']));
	airer.x = 88;
	airer.y = 198;
	backLayer.addChild(airer);//添加到背景层
	LTweenLite.to(airer,1.0,{x:78,loop:true}).to(airer,1.0,{x:88});

	//节日
	var fesitial = new LBitmap(new LBitmapData(imgList['fesitial']));
	fesitial.x = 205;
	fesitial.y = 260;
	backLayer.addChild(fesitial);//添加到背景层
	LTweenLite.to(fesitial,1.0,{x:215,y:250,loop:true}).to(fesitial,1.0,{x:205,y:260});

	//免费
	var noMoney = new LBitmap(new LBitmapData(imgList['noMoney']));
	noMoney.x = 78;
	noMoney.y = 385;
	backLayer.addChild(noMoney);//添加到背景层
	LTweenLite.to(noMoney,1.0,{x:64,y:381,scaleX:1.05,scaleY:1.05,loop:true}).to(noMoney,1.0,{x:78,y:385,scaleX:1.0,scaleY:1.0});
	//添加音乐
	var music = new musicBtn(15,LGlobal.height-60,0.75,0.75,imgList['music']);
	backLayer.addChild(music);

	//开始游戏
	start.addEventListener(LMouseEvent.MOUSE_DOWN,mainGame);
}
//游戏主页面
function mainGame(){
	gameOrAward = true;
	//清除所有
	backLayer.die();
	backLayer.removeAllEventListener();
	backLayer.removeAllChild();
	//背景
	var gameBkg = new LBitmap(new LBitmapData(imgList['gameBkg']));//实例化背景
	backLayer.addChild(gameBkg);//添加到背景层
	
	//轮播图
	var bannerLayer = new LSprite();
	backLayer.addChild(bannerLayer);
	//填充图
	var fillLayer = new LSprite();
	backLayer.addChild(fillLayer);
	
	var bkgleft = new LBitmap(new LBitmapData(imgList['bkgleft']));//实例化背景
	fillLayer.addChild(bkgleft);//添加到背景层
	bkgleft.y = 291;
	var bkgright = new LBitmap(new LBitmapData(imgList['bkgright']));//实例化背景
	fillLayer.addChild(bkgright);//添加到背景层
	bkgright.x = 672;
	bkgright.y = 291;
	//喇叭
	var horn = new LBitmap(new LBitmapData(imgList['horn']));//实例化背景
	backLayer.addChild(horn);//添加到背景层
	horn.x=29;
	horn.y=245;
	bigAndSmall(horn,2,1,1.0,0.1,0.2,true);
	//摇一摇小的
	var smallShank = new LBitmap(new LBitmapData(imgList['smallShank']));//实例化背景
	backLayer.addChild(smallShank);//添加到背景层
	smallShank.x = 395;
	smallShank.y = 613;
	LTweenLite.to(smallShank,0.3,{rotate:20,loop:true}).to(smallShank,0.3,{rotate:-20});
	//免费
	var smallNoMoney = new LBitmap(new LBitmapData(imgList['smallNoMoney']));//实例化背景
	backLayer.addChild(smallNoMoney);//添加到背景层
	smallNoMoney.x = 126;
	smallNoMoney.y = 140;
	bigAndSmall(smallNoMoney,2,2,1.5,0.1,0,true);
	//我要骰子
	var wantToDice = new LButton(new LBitmap(new LBitmapData(imgList['wantToDice'])));//实例化背景
	backLayer.addChild(wantToDice);//添加到背景层
	wantToDice.x = 239;
	wantToDice.y = 805;
	wantToDice.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		wantPop();
	});
	//大骰子
	var bigDice = new LButton(new LBitmap(new LBitmapData(imgList['bigDice'])));//实例化背景
	backLayer.addChild(bigDice);//添加到背景层
	bigDice.x = 233;
	bigDice.y = 602;
	
	//返回首页
	var returnHomepage = new LButton(new LBitmap(new LBitmapData(imgList['returnHomepage'])));
	returnHomepage.x = 45;
	backLayer.addChild(returnHomepage);
	returnHomepage.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		shankOpen=false;
		setHomepage();
	});
	//添加礼物
	var giftX = [367,456,540,549,548,538,551,367,276,89,89,92,89];
	var giftY = [368,440,443,610,759,925,1005,1005,918,843,770,600,446];
	var giftName = ['mian','dice','gift188','hug58','dice','gift388','dan','feng','red','qiang','hug58','red','ji'];
	var gifts = [];
	for(var i=0;i<giftX.length;i++)
	{
		gifts[i] = new gift(giftX[i],giftY[i],giftName[i],0.2,1.0);
		backLayer.addChild(gifts[i]);
		gifts[i].play();
	}
	var giftLayer = new LSprite();
	backLayer.addChild(giftLayer);
	//随机抖动
	var gCount = 0;
	LTweenLite.to(giftLayer,1.0,{loop:true,onComplete:function(){
		for(i=gCount;i<13;i+=3)
		{
			gifts[i].play();
		}
		gCount++;
		if(gCount==3)
		{
			gCount=0;
		}
	}});
	//文字摇一摇
	var shankText = new setText(395,745,24,"摇一摇",'#ffffff');
	backLayer.addChild(shankText);
	//剩余
	var remain = new setText(230,745,24,"剩余",'#ffffff');
	backLayer.addChild(remain);
	var ge = new setText(325,745,24,"个",'#ffffff');
	backLayer.addChild(ge);
	//目标人物	
	var target;
	//向服务器请求个人信息数据
	$.get('json/person.json',function(data){
		target = new Target(targetX[data.nowStep],targetY[data.nowStep],'target',0);
		backLayer.addChild(target);
		//设置骰子个数
		if(data.diceNumber>=10)
		{
			diceNumberWord = new setText(287,743,26,data.diceNumber,'#ffeb00',true);
		}else{
			diceNumberWord = new setText(295,743,26,data.diceNumber,'#ffeb00',true);
		}
		backLayer.addChild(diceNumberWord);
		//提示
		var tipLayer = new LSprite();
		backLayer.addChild(tipLayer);
		tipLayer.addEventListener(LMouseEvent.MOUSE_DOWN,setNull);	
		var tips = new LBitmap(new LBitmapData(imgList['tips']));
		tipLayer.addChild(tips);
		var star = new LBitmap(new LBitmapData(imgList['star']));
		tipLayer.addChild(star);
		bling(star,0.4,0.5,1.0);
		//摇一摇
		var shank = new LBitmap(new LBitmapData(imgList['shank']));
		tipLayer.addChild(shank);
		shank.x = 270;
		shank.y = 130;
		shank.rotate = -20;
		LTweenLite.to(shank,0.3,{rotate:20,loop:true}).to(shank,0.3,{rotate:-20});
		//知道
		var know = new LButton(new LBitmap(new LBitmapData(imgList['know'])));
		tipLayer.addChild(know);
		know.y = 885;
		know.x = (LGlobal.width-know.getWidth())/2;
		bigAndSmall(know,2,2,1.0,0.1,0,true);
		know.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
			tipLayer.remove();
			shankOpen=true;
		});
		//骰子
		var diceLayer = new LSprite();
		backLayer.addChild(diceLayer);
		var diceList = [];
		for(i=0;i<6;i++)
		{
			diceList[i]=new LBitmap(new LBitmapData(imgList['dice'+(i+1)]));
			diceLayer.addChild(diceList[i]);
			diceLayer.visible=false;
		}
	},'json');	
	
	//获奖信息信息论
	var banners = new Array(2);
	var bannerCheck = false;
	//请求获奖人信息
	$.get('json/awardInfor.json',function(data){
		banners[0] = new banner(673,302,data.information);
		bannerLayer.addChild(banners[0]);
		LTweenLite.to(banners[0],60,{x:-banners[0].getWidth(),onComplete:function(){
			banners[0].remove();
		}});
	});
 	//检测是否轮播完毕
	LTweenLite.to(backLayer,2.0,{loop:true,onComplete:function(){
		
			if(bannerCheck==false)
			{
				if(banners[0].getWidth()+banners[0].x<=700){
					$.get('json/awardInfor.json',function(data){
						bannerCheck = true;
						banners[1] = new banner(673,302,data.information1);
						bannerLayer.addChild(banners[1]);
						LTweenLite.to(banners[1],60,{x:-banners[1].getWidth(),onComplete:function(){
						banners[1].remove();					
						}});
					});
				}
			}else{
				if(banners[1].getWidth()+banners[1].x<=700){
					$.get('json/awardInfor.json',function(data){
						bannerCheck = false;
						banners[0] = new banner(673,302,data.information);
						bannerLayer.addChild(banners[0]);
						LTweenLite.to(banners[0],60,{x:-banners[1].getWidth(),onComplete:function(){
							banners[0].remove();
						}});
					});
				}
			}
			

	}});
	//
		(function init() {  
            if (window.DeviceMotionEvent) {  
                window.addEventListener('devicemotion', deviceMotionHandler, false);  
            } else {  
                alert('not support mobile event');  
            }  
        })();  
        function deviceMotionHandler(eventData) {  
            var acceleration = eventData.accelerationIncludingGravity;  
            var curTime = new Date().getTime();  
            if ((curTime - last_update) > 100) {  
                var diffTime = curTime - last_update;  
                last_update = curTime;  
                x = acceleration.x;  
                y = acceleration.y;  
                z = acceleration.z;  
                var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;  
                if (speed > SHAKE_THRESHOLD) {  
                    if(shankOpen==true)
                    {
                    	shankOpen=false;
                		//服务器请求
                		var number = 5;
                		diceList[number].visible = true;
                		setTimeout(function(){
                			diceList[number].visible = false;
                		},1000);
                    }
                }  
                last_x = x; 
                last_y = y;  
                last_z = z;  
            }  
        }
}

//我要骰子弹窗
function wantPop(){
	var wantLayer = new LSprite();
	backLayer.addChild(wantLayer);
	wantLayer.addEventListener(LMouseEvent.MOUSE_DOWN,setNull);
	wantLayer.graphics.drawRect(0,'#ffffff',[0,0,LGlobal.width,LGlobal.height],true,'rgba(0,0,0,0.5)');
	//背景
	var wantBkg = new LBitmap(new LBitmapData(imgList['wantBkg']));
	wantBkg.y = 202;
	wantBkg.x = (LGlobal.width-wantBkg.getWidth())/2;
	wantLayer.addChild(wantBkg);
	//关闭
	var close = new LButton( new LBitmap(new LBitmapData(imgList['close'])));
	close.y = 170;
	close.x = 565;
	wantLayer.addChild(close);
	close.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		wantLayer.removeAllChild();
		wantLayer.remove();
	});
	//标题
	var wantTitle = new LBitmap(new LBitmapData(imgList['wantTitle']));
	wantTitle.y = 153;
	wantTitle.x = (LGlobal.width-wantTitle.getWidth())/2;
	wantLayer.addChild(wantTitle);
	bigAndSmall(wantTitle,2,2,1.0,0.1,0,true);
	//文字
	var wantText = [];
	wantText[0] = new setText(190,530,24,"邀请好友，即可获得     枚骰子",'#fff7b1');
	wantLayer.addChild(wantText[0]);
	wantText[2] = new setText(140,755,24,"挑战小游戏，闯关成功可获得     枚骰子，",'#fff7b1');
	wantLayer.addChild(wantText[2]);
	wantText[0].x = -wantText[0].getWidth();
	wantText[2].x = LGlobal.width;
	//数量
	var numberText = [];
	numberText[0] = new setText(414,520,36,"2",'#ff2000',true);
	numberText[0].alpha = 0;
	wantLayer.addChild(numberText[0]);
	
	numberText[2] = new setText(458,746,36,"3",'#ff2000',true);
	numberText[2].alpha = 0;
	wantLayer.addChild(numberText[2]);
	//获取个人次数
	var personInvite;
	var personGame;
	$.get('json/person.json',function(data){
		personInvite=data.invite;
		personGame=data.game;
		LTweenLite.to(wantText[0],0.8,{x:250,rotate:0}).to(wantText[0],0.2,{x:190,rotate:0});
		LTweenLite.to(wantText[2],0.8,{x:80,rotate:0}).to(wantText[2],0.2,{x:140,rotate:0,onComplete:function(){
			LTweenLite.to(numberText[0],0.25,{alpha:1.0});
			LTweenLite.to(numberText[2],0.75,{alpha:1.0});
		}});
	});
	
	
	//邀请好友
	var invite = new LButton( new LBitmap(new LBitmapData(imgList['invite'])));
	invite.y = 876;
	invite.x = 86;
	wantLayer.addChild(invite);
	invite.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		
		if(personInvite==0)
		{
			gameOrInvite(true);
		}else{
			shareToFriends();
		}
		
	});
	//邀请好友
	var challenge = new LButton( new LBitmap(new LBitmapData(imgList['challenge'])));
	challenge.y = 876;
	challenge.x = 361;
	wantLayer.addChild(challenge);
	challenge.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		
		if(personGame==0)
		{
			gameOrInvite(false);
		}else{
			wantLayer.removeAllChild();
			wantLayer.remove();
		}
	});
}
//显示不能邀请和邀请
function gameOrInvite(check){
	//check为真，表面开启邀请的
	var okLayer = new LSprite();
	backLayer.addChild(okLayer);
	okLayer.addEventListener(LMouseEvent.MOUSE_DOWN,setNull);
	okLayer.graphics.drawRect(0,'#ffffff',[0,0,LGlobal.width,LGlobal.height],true,'rgba(0,0,0,0.6)');
	//背景
	var okBkg = new LBitmap(new LBitmapData(imgList['okBkg']));
	okBkg.x = (LGlobal.width-okBkg.getWidth())/2;
	okBkg.y = (LGlobal.height-okBkg.getHeight())/2;
	okLayer.addChild(okBkg);
	if(check==true)
	{
		var overSharing = new LBitmap(new LBitmapData(imgList['overSharing']));
		overSharing.y = okBkg.y+68;
		overSharing.x = (LGlobal.width-overSharing.getWidth())/2;
		okLayer.addChild(overSharing);
	}else{
		var tomorrow = new LBitmap(new LBitmapData(imgList['tomorrow']));
		tomorrow.y = okBkg.y+68;
		tomorrow.x = (LGlobal.width-tomorrow.getWidth())/2;
		okLayer.addChild(tomorrow);
	}
	//好的按钮
	var ok = new LButton(new LBitmap(new LBitmapData(imgList['ok'])));
	ok.y = okBkg.y+188;
	ok.x = (LGlobal.width-ok.getWidth())/2;
	okLayer.addChild(ok);
	bigAndSmall(ok,2,2,1.0,0.05,0,true);
	ok.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		okLayer.removeAllChild();
		okLayer.remove();
	})
}
//规则说明
function showRules(){
	var rLayer = new LSprite();
	backLayer.addChild(rLayer);
	rLayer.addEventListener(LMouseEvent.MOUSE_DOWN,setNull);
	rLayer.graphics.drawRect(0,'#ffffff',[0,0,LGlobal.width,LGlobal.height],true,'rgba(0,0,0,0.6)');
	//背景
	var rulesContent = new LBitmap(new LBitmapData(imgList['rulesContent']));
	rulesContent.x = (LGlobal.width-rulesContent.getWidth())/2;
	rulesContent.y = (LGlobal.height-rulesContent.getHeight())/2;
	rLayer.addChild(rulesContent);
	//背景
	var rulesTitle = new LBitmap(new LBitmapData(imgList['rulesTitle']));
	rulesTitle.x = (LGlobal.width-rulesTitle.getWidth())/2;
	rulesTitle.y = 128;
	rLayer.addChild(rulesTitle);
	bigAndSmall(rulesTitle,2,2,1.2,0.05,0,true);
	//好的按钮
	var close = new LButton(new LBitmap(new LBitmapData(imgList['close'])));
	close.y = 920;
	close.x = (LGlobal.width-close.getWidth())/2;
	rLayer.addChild(close);
	close.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		rLayer.removeAllChild();
		rLayer.remove();
	});
}
//奖品设置说明
function showAwardSet(){
	var aLayer = new LSprite();
	backLayer.addChild(aLayer);
	aLayer.addEventListener(LMouseEvent.MOUSE_DOWN,setNull);
	aLayer.graphics.drawRect(0,'#ffffff',[0,0,LGlobal.width,LGlobal.height],true,'rgba(0,0,0,0.6)');
	//背景
	var awardContent = new LBitmap(new LBitmapData(imgList['awardContent']));
	awardContent.x = (LGlobal.width-awardContent.getWidth())/2;
	awardContent.y = (LGlobal.height-awardContent.getHeight())/2;
	aLayer.addChild(awardContent);
	//背景
	var awardSetTitle = new LBitmap(new LBitmapData(imgList['awardSetTitle']));
	awardSetTitle.x = (LGlobal.width-awardSetTitle.getWidth())/2;
	awardSetTitle.y = 72;
	aLayer.addChild(awardSetTitle);
	bigAndSmall(awardSetTitle,2,2,1.2,0.05,0,true);
	//好的按钮
	var close = new LButton(new LBitmap(new LBitmapData(imgList['close'])));
	close.y = 1000;
	close.x = (LGlobal.width-close.getWidth())/2;
	aLayer.addChild(close);
	close.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		aLayer.removeAllChild();
		aLayer.remove();
	});
}
		
         