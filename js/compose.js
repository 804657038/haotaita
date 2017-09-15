//我要合成
var ConposeCardNumber = 0;
//我的卡片
var cardList = [];
function ConposeMyCard(){
	ConposeCardNumber = 0;
	//清除所有
	backLayer.die();
	backLayer.removeAllEventListener();
	backLayer.removeAllChild();
	//背景
	var homepage = new LBitmap(new LBitmapData(imgList['conposeBkg']));//实例化背景
	homepage.scaleX = (1+2/700);
	backLayer.addChild(homepage);//添加到背景层
	//背景
	var conposeTitle = new LBitmap(new LBitmapData(imgList["conposeTitle"]));
	conposeTitle.y = 145;
	conposeTitle.x = (LGlobal.width-conposeTitle.getWidth())/2;
	backLayer.addChild(conposeTitle);
	bigAndSmall(conposeTitle,2,2,1.2,0.1,0,true);
	
	var conposeTexts = new Array(4);
	for(var i=0;i<4;i++)
	{
		conposeTexts[i] = new LBitmap(new LBitmapData(imgList["conposetext"+i]));
		conposeTexts[i].y = 515;
		conposeTexts[i].x = (LGlobal.width-conposeTexts[i].getWidth())/2;
		backLayer.addChild(conposeTexts[i]);
		conposeTexts[i].visible = false;
	}
	conposeTexts[0].visible = true;
	//我的卡片

	for(var i=0;i<5;i++)
	{
		cardList[i] = new longCardClass(47+124.5*i,273,i+1);
		backLayer.addChild(cardList[i]);
		cardList[i].visible = false;
		cardList[i].addEventListener(LMouseEvent.MOUSE_DOWN,function(){
			var index = this.sp.index;
			this.sp.visible = false;
			ConposeCardNumber--;
			switch(ConposeCardNumber){
				case 0:
				case 1:
					conposeTexts[0].visible=true;
					conposeTexts[1].visible=false;
					conposeTexts[2].visible=false;
					conposeTexts[3].visible=false;
					break;
				case 2:
					conposeTexts[0].visible=false;
					conposeTexts[1].visible=true;
					conposeTexts[2].visible=false;
					conposeTexts[3].visible=false;
					break;
				case 3:
				case 4:
					conposeTexts[0].visible=false;
					conposeTexts[1].visible=false;
					conposeTexts[2].visible=true;
					conposeTexts[3].visible=false;
					break;
				case 5:
					conposeTexts[0].visible=false;
					conposeTexts[1].visible=false;
					conposeTexts[2].visible=false;
					conposeTexts[3].visible=true;
					break;
			}
			cards[index-1].hasCard.alpha = 1;
			cards[index-1].cardBkg.alpha = 1;
			cards[index-1].textNumber.alpha = 1;
			cards[index-1].noCard.alpha = 0;
			cards[index-1].cardNumber++;
			cards[index-1].textNumber.text ="x"+cards[index-1].cardNumber;
			conposeCheck[index-1] = true;
		});
	}
	//纠正位置
	cardList[1].x=45+124.5*1;
	cardList[2].x=45+124.5*2;
	cardList[4].x=51+124.5*4;
	//添加小卡片
	var conposeCheck = [true,true,true,true,true];
	//向服务器请求个人数据
	var cards = new Array(5);
	var ids=[];
	AjaxR(window.link+'/getMyCard','GET',false,function(data){
        for(var i=0;i<cards.length;i++)
        {
            var num=data[i+1]?data[i+1].num:0;
            var id=data[i+1]?data[i+1].id:0;
            AllCardNumber+=num;
            cards[i] = new cardClass(42+i*128,794,i+1,num,false,id);
            backLayer.addChild(cards[i]);
            cards[i].addEventListener(LMouseEvent.MOUSE_DOWN,function(){

                var index = this.sp.index;
                if(conposeCheck[index-1]==true)
                {
                    conposeCheck[index-1]= false;

                    if(this.sp.cardNumber>0)
                    {
                        ConposeCardNumber++;
                        switch(ConposeCardNumber){
							case 0:
							case 1:
								conposeTexts[0].visible=true;
								conposeTexts[1].visible=false;
								conposeTexts[2].visible=false;
								conposeTexts[3].visible=false;
								break;
							case 2:
								conposeTexts[0].visible=false;
								conposeTexts[1].visible=true;
								conposeTexts[2].visible=false;
								conposeTexts[3].visible=false;
								break;
							case 3:
							case 4:
								conposeTexts[0].visible=false;
								conposeTexts[1].visible=false;
								conposeTexts[2].visible=true;
								conposeTexts[3].visible=false;
								break;
							case 5:
								conposeTexts[0].visible=false;
								conposeTexts[1].visible=false;
								conposeTexts[2].visible=false;
								conposeTexts[3].visible=true;
								break;
						}
                        cardList[index-1].visible = true;
                        cardList[index-1].id=this.sp.id;
                        this.sp.cardNumber--;
                        if(this.sp.cardNumber==0)
                        {
                            this.sp.changeStatus();
                        }else{
                            this.sp.changeTxet();
                        }
                    }
                }
            })
        }
	});

	//合成按钮
	var conposing = new LButton(new LBitmap(new LBitmapData(imgList['conposing'])));
	conposing.x = 85;
	conposing.y = 980;
	backLayer.addChild(conposing);//添加到背景层
	conposing.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		if(ConposeCardNumber<2)
		{
			conposeErrors();
		}else{
			confirmConposed();
		}
	});
	//取消按钮
	var cancel = new LButton(new LBitmap(new LBitmapData(imgList['cancel'])));
	cancel.x = 362;
	cancel.y = 980;
	backLayer.addChild(cancel);//添加到背景层
	cancel.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		myCard();
	});
	//添加音乐
	var music = new musicBtn(LGlobal.width-60,15,0.75,0.75,imgList['music']);
	backLayer.addChild(music);
}
//没有卡片
function hasNoCard()
{
	var cardLayer = new LSprite();
	backLayer.addChild(cardLayer);
	cardLayer.addEventListener(LMouseEvent.MOUSE_DOWN,setNull);
	cardLayer.graphics.drawRect(0,'#ffffff',[0,0,LGlobal.width,LGlobal.height],true,'rgba(0,0,0,0.75)');
	var noCards = new LBitmap(new LBitmapData(imgList["noCards"]));
	noCards.y = (LGlobal.height-noCards.getHeight())/2;
	noCards.x = (LGlobal.width-noCards.getWidth())/2;
	cardLayer.addChild(noCards);
	//好的按钮
	var fineLayer = new LSprite();
	cardLayer.addChild(fineLayer);
	fineLayer.graphics.drawRect(0,'#ffffff',[91,585,524,90],false,'rgba(0,0,0,0.75)');
	fineLayer.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		cardLayer.removeAllChild();
		cardLayer.remove();
	})
}
//合成成功
function composeSuccess(name)
{
	var cardLayer = new LSprite();
	backLayer.addChild(cardLayer);
	cardLayer.addEventListener(LMouseEvent.MOUSE_DOWN,setNull);
	cardLayer.graphics.drawRect(0,'#ffffff',[0,0,LGlobal.width,LGlobal.height],true,'rgba(0,0,0,0.75)');
	var light = new LBitmap(new LBitmapData(imgList['light']));
	light.y = 185;
	light.x = 0;
	cardLayer.addChild(light);
	LTweenLite.to(light,8.0,{rotate:360,loop:true,onComplete:function(){
		light.rotate=0;
	}});
	
	var coupon = new LBitmap(new LBitmapData(imgList[name]));
	coupon.y = 437;
	coupon.x = (LGlobal.width-coupon.getWidth())/2;
	cardLayer.addChild(coupon);
	
	var continueCompose = new LBitmap(new LBitmapData(imgList["continueCompose"]));
	continueCompose.y = 670;
	continueCompose.x = (LGlobal.width-continueCompose.getWidth())/2;
	cardLayer.addChild(continueCompose);
	//继续
	var continues = new LButton(new LBitmap(new LBitmapData(imgList['continue'])));
	continues.y = 765;
	continues.x = 72;
	cardLayer.addChild(continues);
	continues.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		cardLayer.removeAllChild();
		cardLayer.remove();
		ConposeMyCard();
	});
	//继续
	var cancel = new LButton(new LBitmap(new LBitmapData(imgList['cancel'])));
	cancel.y = 765;
	cancel.x = 348;
	cardLayer.addChild(cancel);
	cancel.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		cardLayer.removeAllChild();
		cardLayer.remove();
		myCard();
	});
}
//合成错误
function conposeErrors()
{
	var cardLayer = new LSprite();
	backLayer.addChild(cardLayer);
	cardLayer.addEventListener(LMouseEvent.MOUSE_DOWN,setNull);
	cardLayer.graphics.drawRect(0,'#ffffff',[0,0,LGlobal.width,LGlobal.height],true,'rgba(0,0,0,0.75)');
	var composeError = new LBitmap(new LBitmapData(imgList["composeError"]));
	composeError.y = (LGlobal.height-composeError.getHeight())/2;
	composeError.x = (LGlobal.width-composeError.getWidth())/2;
	cardLayer.addChild(composeError);
	//好的按钮
	var fineLayer = new LSprite();
	cardLayer.addChild(fineLayer);
	fineLayer.graphics.drawRect(0,'#ffffff',[91,585,524,90],false,'rgba(0,0,0,0.75)');
	fineLayer.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		cardLayer.removeAllChild();
		cardLayer.remove();
	})
}
//是否合成
function confirmConposed(){
	var cardLayer = new LSprite();
	backLayer.addChild(cardLayer);
	cardLayer.addEventListener(LMouseEvent.MOUSE_DOWN,setNull);
	cardLayer.graphics.drawRect(0,'#ffffff',[0,0,LGlobal.width,LGlobal.height],true,'rgba(0,0,0,0.75)');
	var confirmCompose = new LBitmap(new LBitmapData(imgList["confirmCompose"]));
	confirmCompose.y = (LGlobal.height-confirmCompose.getHeight())/2;
	confirmCompose.x = (LGlobal.width-confirmCompose.getWidth())/2;
	cardLayer.addChild(confirmCompose);
	//确认按钮
	var fineLayer = new LSprite();
	cardLayer.addChild(fineLayer);
	fineLayer.graphics.drawRect(0,'#ffffff',[91,585,262,90],false,'rgba(0,0,0,0.75)');
	fineLayer.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		cardLayer.removeAllChild();
		cardLayer.remove();
		var ids=[];
		for (i in cardList){
			if(cardList[i].visible==true){
                ids.push(cardList[i].id);
			}
		};
		AjaxR(window.link+'synthesis','POST',{"__token__":window.token,"ids":ids},function(res){
			if(res.code==1){
                composeSuccess("coupon"+res.msg);
			}else{
                conposeErrors();
			}

		});

		
	});
	//取消按钮
	var cancelLayer = new LSprite();
	cardLayer.addChild(cancelLayer);
	cancelLayer.graphics.drawRect(0,'#ffffff',[353,585,262,90],false,'rgba(0,0,0,0.75)');
	cancelLayer.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		cardLayer.removeAllChild();
		cardLayer.remove();
	});
}