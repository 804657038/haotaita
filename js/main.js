//游戏界面初始化
LInit(1000/60,"good",700,1135,main);
//游戏入口函数

function main(){

    AjaxR(window.link+'getToken','GET',false,function(res){
        window.token=res.token;
        window.shareNum=res.shareNum;
        window.uid=res.uid;
    });
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
	//logo
	var logo = new LBitmap(new LBitmapData(result['logo']));//实例化logo
	logo.x = (LGlobal.width-logo.getWidth())/2;//logo位置x 
	logo.y = 1040;//logo位置y
	backLayer.addChild(logo);//添加到背景层
	bigAndSmall(logo,2,1,1.0,0.1,0,true);
	//添加音乐
	var music = new musicBtn(635,15,0.75,0.75,result['music']);
	backLayer.addChild(music);
	//加载进度
	loadText = new setText(0,0,28,"0%",'#070907');
	loadText.x = setwm(loadText,2);
	loadText.y = 600;
	backLayer.addChild(loadText);
	//进度条
	shape = new LShape();
	backLayer.addChild(shape);
	shape.graphics.drawRoundRect(false, "#f93849", [142, 557, 0, 20, 12], true, "#f93849");
	//加载图片
    LLoadManage.load(gameImg,loadPro,gameStart);//读取加载页面背景图片
}
//加载进度条
function loadPro(per){
	loadText.childList[0].text = parseInt(per)+'%';
	loadText.x = setwm(loadText,2);
	shape.graphics.clear();
	shape.graphics.drawRoundRect(false, "#f93849", [142, 557, 426*parseInt(per)/100, 20, 12], true, "#f93849");
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
//giftCash('giftCash188');
}
//首页
function setHomepage(){

    if(hasFirst==true){
        receive();
        hasFirst=false;
	}

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
	//晾衣架
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

	//免费
	var noMoney = new LBitmap(new LBitmapData(imgList['noMoney']));
	noMoney.x = 78;
	noMoney.y = 385;
	backLayer.addChild(noMoney);//添加到背景层
	//添加音乐
	var music = new musicBtn(15,LGlobal.height-60,0.75,0.75,imgList['music']);
	backLayer.addChild(music);

	//开始游戏
	start.addEventListener(LMouseEvent.MOUSE_DOWN,mainGame);
}
//赠品领取
function receive(){
    var id=GetQueryString('id');
    var uid=GetQueryString('uid');
    var type=GetQueryString('type')?GetQueryString('type'):2;

    if(id && uid && uid !=window.uid){
        AjaxR(window.link+'getGs','GET',{id:id,uid:uid,type:type},function(res){
            $('#face').find('img').attr('src',res.face);
            $('#nickname').text(res.nickName);
            if(res.pimg){
                $('.gifts').find('img').attr('src',res.pimg);
                $('.geted').show();
                $('.noget').hide();
                $('.nowget').show();
                $('.confirmBtn').hide();
            }else{
                $('.geted').hide();
                $('.noget').show();
                $('.nowget').hide();
                $('.confirmBtn').show();
            }
        });

        $('#friendGrit').show();
    }
    //如果券已经被领取

    var ev="touchstart";
    $(document).on(ev,".nowget",function(){
        //如果领取成功
        $('.friendGrit').hide();
        $('.getResult').show();
        AjaxR(window.link+'putGift','POST',{
            "__token__":window.token,
            "id":id,
            "status":type
        },function(res){
            if(res.code==1){
                $('.getBoxS').show();
                $('.getBoxF').hide();
            }else{
                $('.getBoxS').hide();
                $('.getBoxF').show();
            }
        });
    });
    //好的按钮
    $(document).on(ev,".fine",function(){
        $('#friendGrit').hide();
    });
    //确定按钮
    $(document).on(ev,".confirmBtn",function(){
        $('#friendGrit').hide();
    });
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
	smallShank.y = 595;
	LTweenLite.to(smallShank,0.3,{rotate:20,loop:true}).to(smallShank,0.3,{rotate:-20});
	//我要骰子
	var wantToDice = new LButton(new LBitmap(new LBitmapData(imgList['wantToDice'])));//实例化背景
	backLayer.addChild(wantToDice);//添加到背景层
	wantToDice.x = 239;
	wantToDice.y = 805;
	wantToDice.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		 shankOpen=false;
		 wantPop();
	});
	//晾衣架
	var gameAirer = new LBitmap(new LBitmapData(imgList['gameAirer']));
	backLayer.addChild(gameAirer);//添加到背景层
	gameAirer.x = 143;
	gameAirer.y = 38;
	LTweenLite.to(gameAirer,2.0,{x:158,y:23,loop:true}).to(gameAirer,2.0,{x:143,y:38});
	//节日
	var festival = new LBitmap(new LBitmapData(imgList['festival']));
	backLayer.addChild(festival);//添加到背景层
	festival.x = 279;
	festival.y = 66;
	//大骰子
	var bigDice = new LButton(new LBitmap(new LBitmapData(imgList['bigDice'])));//实例化背景
	bigDice.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        // AjaxR(window.link+'lottery',"POST",{"__token__":window.token},function(res){
        //     if(res.code==1){
        //         var number = res.dice;
        //         window.money=res.redValue;
        //         window.id=res.id;
        //         var shankLayer =shankingOne();
        //         var pid=res.pid;
        //         if(res.prize_id!=7){
        //             diceNumberWord.childList[0].text--;
        //         }
        //         setTimeout(function(){
        //             shankLayer.remove();//将要以摇一摇画面移除
        //             document.getElementById('shanks').pause();
        //             diceList[number-1].visible = true;//显示骰子
        //             diceList[number-1].alpha = 0;
        //             LTweenLite.to(diceList[number-1],0.5,{alpha:1.0,onComplete:function(){
        //                 LTweenLite.to(diceList[number-1],0.5,{delay:1.5,alpha:0,onComplete:function(){
        //                     diceList[number-1].visible = false;
        //                     setTimeout(function(){
        //                         target.moving(number,pid);
        //                     },500);
        //                 }});
        //             }});
        //         },1000);
        //     }else{
        //         myAlert(res.msg);
        //     }
        //
        // });

	});

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

	var step=0;
	console.log(imgList['tou']);
	//向服务器请求个人信息数据
	function getAuth(res,m){
        target = new Target(targetX[res.step],targetY[res.step],'target',res.step);

        backLayer.addChild(target);
        //设置骰子个数

        if(res.dice>=10)
        {
            diceNumberWord = new setText(287,743,26,res.dice,'#ffeb00',true);
        }else{
            diceNumberWord = new setText(295,743,26,res.dice,'#ffeb00',true);
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


        for(i=0;i<6;i++)
        {
            diceList[i]=new LBitmap(new LBitmapData(imgList['dice'+(i+1)]));          
            diceList[i].x=(LGlobal.width-diceList[i].getWidth())/2;
            diceList[i].y=(LGlobal.height-diceList[i].getHeight())/2;
            diceList[i].visible=false;
            diceLayer.addChild(diceList[i]); 
        }
	}
    AjaxR(window.link+'getAuth','GET',false,function(res){
		getAuth(res);
    });


	
	//获奖信息信息论
	var banners = new Array(2);
	var bannerCheck = false;
	/*
	 * banner[0]为第一个轮播数据
	 * banner[1]为第二个轮播数据
	 * 两个数据交替轮播
	 */
	//请求获奖人信息开始时请求获奖的信息
	var plog1,plog2;
	$.get(window.link+'plog',function(data){
		banners[0] = new banner(673,302,data);
        plog1=data;
        plog2=data;
		bannerLayer.addChild(banners[0]);
		LTweenLite.to(banners[0],50,{x:-banners[0].getWidth(),onComplete:function(){
			banners[0].remove();
		}});
	});
 	//检测是否轮播完毕
	LTweenLite.to(backLayer,2.0,{loop:true,onComplete:function(){
			/*
			 * 判断上一轮轮播是否结束
			 */
			if(bannerCheck==false)
			{
				if(banners[0].getWidth()+banners[0].x<=700){
                 bannerCheck = true;
                 banners[1] = new banner(673,302,plog1);
                 bannerLayer.addChild(banners[1]);
                 LTweenLite.to(banners[1],50,{x:-banners[1].getWidth(),onComplete:function(){
                     banners[1].remove();
                 }});

				}
			}else{
				if(banners[1].getWidth()+banners[1].x<=700){
                 bannerCheck = false;
                 banners[0] = new banner(673,302,plog2);
                 bannerLayer.addChild(banners[0]);
                 LTweenLite.to(banners[0],50,{x:-banners[1].getWidth(),onComplete:function(){
                     banners[0].remove();
                 }});
				}
			}
	}});
	//
	/*
	* @手机运动监听，摇一摇开始
	* */
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
                  		//先出现摇一摇的画面

                		//服务器请求到骰子数目
						AjaxR(window.link+'lottery',"POST",{"__token__":window.token},function(res){
                            if(res.code==1){
                                var number = res.dice;
                                window.money=res.redValue;
                                window.id=res.id;
                                var shankLayer =shankingOne();
								var pid=res.pid;
                                if(res.prize_id!=7){
                                    diceNumberWord.childList[0].text--;
                                }
                                setTimeout(function(){
                                    shankLayer.remove();//将要以摇一摇画面移除
                                    document.getElementById('shanks').pause();
                                    diceList[number-1].visible = true;//显示骰子
                                    diceList[number-1].alpha = 0;
                                    LTweenLite.to(diceList[number-1],0.5,{alpha:1.0,onComplete:function(){
                                        LTweenLite.to(diceList[number-1],0.5,{delay:1.5,alpha:0,onComplete:function(){
                                            diceList[number-1].visible = false;
                                            setTimeout(function(){
                                                target.moving(number,pid);
                                            },500);
                                        }});
                                    }});
                                },1000);
                            }else{
                                myAlert(res.msg);
                            }

						});
                    }
                }  
                last_x = x; 
                last_y = y;  
                last_z = z;  
            }  
        }
    //添加音乐
	var music = new musicBtn(LGlobal.width-60,15,0.75,0.75,imgList['music']);
	backLayer.addChild(music);
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
		shankOpen=true;
	});
	//标题
	var wantTitle = new LBitmap(new LBitmapData(imgList['wantTitle']));
	wantTitle.y = 153;
	wantTitle.x = (LGlobal.width-wantTitle.getWidth())/2;
	wantLayer.addChild(wantTitle);
	bigAndSmall(wantTitle,2,2,1.0,0.1,0,true);
	//文字
	var wantText = [];
	wantText[0] = new setText(142,530,24,"每天首次邀请好友，即可获得     枚骰子",'#fff7b1');
	wantLayer.addChild(wantText[0]);
	wantText[2] = new setText(120,755,24,"挑战小游戏，闯关成功可最多获得     枚骰子",'#fff7b1');
	wantLayer.addChild(wantText[2]);
	wantText[0].x = -wantText[0].getWidth();
	wantText[2].x = LGlobal.width;
	//数量
	var numberText = [];
	numberText[0] = new setText(461,520,36,"2",'#ff2000',true);
	numberText[0].alpha = 0;
	wantLayer.addChild(numberText[0]);
	
	numberText[2] = new setText(487,746,36,"3",'#ff2000',true);
	numberText[2].alpha = 0;
	wantLayer.addChild(numberText[2]);
	//获取个人次数
	var personInvite;
	var personGame;
    personInvite=window.shareNum;
    personGame=1;
    LTweenLite.to(wantText[0],0.8,{x:280,rotate:0}).to(wantText[0],0.2,{x:142,rotate:0});
    LTweenLite.to(wantText[2],0.8,{x:60,rotate:0}).to(wantText[2],0.2,{x:120,rotate:0,onComplete:function(){
        LTweenLite.to(numberText[0],0.25,{alpha:1.0});
        LTweenLite.to(numberText[2],0.75,{alpha:1.0});
    }});
	//邀请好友
	var invite = new LButton( new LBitmap(new LBitmapData(imgList['invite'])));
	invite.y = 876;
	invite.x = 86;
	wantLayer.addChild(invite);
	invite.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        window.hasGitf=false;
        shareToFriends();
	});
	//挑战游戏：打地鼠
	var challenge = new LButton( new LBitmap(new LBitmapData(imgList['challenge'])));
	challenge.y = 876;
	challenge.x = 361;
	wantLayer.addChild(challenge);
	challenge.addEventListener(LMouseEvent.MOUSE_DOWN,function(){	
		hitMouse();	
		document.getElementById('Jaudio').pause();
		document.getElementById('mouseMusic').play();
	});
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
		
         