//我的奖品及卡片
var AllCardNumber = 0;
//我的卡片
function myCard(){
	gameOrAward=false;
	//清除所有
	backLayer.die();
	backLayer.removeAllEventListener();
	backLayer.removeAllChild();
	//背景
	var homepage = new LBitmap(new LBitmapData(imgList['cardAwardBkg']));//实例化背景
	homepage.scaleX = (1+2/700);
	backLayer.addChild(homepage);//添加到背景层
	//返回首页
	var goHomepage = new LButton(new LBitmap(new LBitmapData(imgList['goHomepage'])));
	goHomepage.x = 26;
	backLayer.addChild(goHomepage);//添加到背景层
	goHomepage.addEventListener(LMouseEvent.MOUSE_DOWN,setHomepage);
	//我的奖品
	var myAwards = new LButton(new LBitmap(new LBitmapData(imgList['myAward'])));
	myAwards.x = 155;
	myAwards.y = 35;
	backLayer.addChild(myAwards);//添加到背景层
	myAwards.addEventListener(LMouseEvent.MOUSE_DOWN,myAward);
	//我的卡片
	var myCards = new LBitmap(new LBitmapData(imgList['myCard']));
	myCards.x = 415;
	myCards.y = 35;
	backLayer.addChild(myCards);//添加到背景层
	//我的卡片
	var cardList = [];
	for(var i=0;i<5;i++)
	{
		cardList[i] = new LBitmap(new LBitmapData(imgList['card'+(i+1)]));
		cardList[i].x = (LGlobal.width-cardList[i].getWidth())/2;
		cardList[i].y = 195;
		backLayer.addChild(cardList[i]);
		if(i!=0)
		{
			cardList[i].alpha = 0;
		}
	}
	//添加小卡片
	//向服务器请求个人数据
	var cards = new Array(5);
	AjaxR(window.link+'getMyCard','GET',false,function(data){
        for(var i=0;i<cards.length;i++)
        {
        	var num=data[i+1]?data[i+1].num:0;
            var id=data[i+1]?data[i+1].id:0;
            AllCardNumber+=num;
            cards[i] = new cardClass(42+i*128,860,i+1,num,!i,id);
            backLayer.addChild(cards[i]);
            if(i==0){
                window.gId=id;
			}
            cards[i].addEventListener(LMouseEvent.MOUSE_DOWN,function(){
                var index = this.sp.index;
               	window.gId=this.sp.id;

                for(var i=0;i<5;i++)
                {
                    if(i+1==index){
                        this.sp.hasChoice.alpha = 1;
                        cardList[i].alpha = 1;
                    }else{
                        cards[i].hasChoice.alpha = 0;
                        cardList[i].alpha = 0;
                    }
                }
            })
        }
	});

	//我要合成按钮
	var compose = new LButton(new LBitmap(new LBitmapData(imgList['compose'])));
	compose.x = 85;
	compose.y = 1006;
	backLayer.addChild(compose);//添加到背景层
	compose.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		if(AllCardNumber==0)
		{
			hasNoCard();
		}else{
			ConposeMyCard();
		}
	});
	//送给好友
	var send = new LButton(new LBitmap(new LBitmapData(imgList['send'])));
	send.x = 362;
	send.y = 1006;
	backLayer.addChild(send);//添加到背景层
	send.addEventListener(LMouseEvent.MOUSE_DOWN,function(){

		if(window.gId==0||window.gId==null){
			$('#allPopWindow').show();
			$('#allPopWindow .winTips').html('还没有该卡片，<br/>赶紧去收集吧！');
		}else{
            confirmCardSend();
		}
	});
	//使用说明
	var useTipes = new LButton(new LBitmap(new LBitmapData(imgList['useTips'])));
	useTipes.x = 586;
	useTipes.y = 405;
	backLayer.addChild(useTipes);//添加到背景层
	useTipes.addEventListener(LMouseEvent.MOUSE_DOWN,showUseContent);
	//添加音乐
	var music = new musicBtn(LGlobal.width-60,15,0.75,0.75,imgList['music']);
	backLayer.addChild(music);	
}
//卡类
function cardClass(x,y,cardOrder,cardNumber,choiced,id){
    choiced=choiced?choiced:false;
	base(this,LSprite,[]);
	var self = this;
	self.x = x;
	self.y = y;
	self.index = cardOrder;
	self.cardNumber = cardNumber;//卡数量
	self.id=id;
	//有卡
	self.hasCard = new LBitmap(new LBitmapData(imgList['samllCard'+cardOrder]));
	self.addChild(self.hasCard);
//	self.noCard = new LBitmap(new LBitmapData(imgList[('smallCard'+cardOrder+''+cardOrder)]));
	//没卡
	self.noCard = new LBitmap(new LBitmapData(imgList[('samllCard'+cardOrder)+cardOrder]));
	self.addChild(self.noCard)
	//已经选择
	self.hasChoice = new LBitmap(new LBitmapData(imgList['hasChoice']));
	self.hasChoice.x = -3;
	self.hasChoice.y = -6;
	self.addChild(self.hasChoice);
	//卡数量
	self.cardBkg = new LBitmap(new LBitmapData(imgList['cardNumber']));
	self.cardBkg.x = 74;
	self.cardBkg.y = -14;
	self.addChild(self.cardBkg);
	//卡的具体数量
	self.textNumber = new LTextField();
	self.textNumber.text ="x"+cardNumber;
	self.textNumber.color = '#f5d500';	
	self.textNumber.size = 22;
	self.textNumber.y = -13;
	if(cardNumber>=10)
	{
		self.textNumber.x = 78;	
	}else{
		self.textNumber.x = 86;	
	}
	self.addChild(self.textNumber);
	//判断是否拥有卡
	if(cardNumber>0)
	{
		self.noCard.alpha = 0;
	}else{
		self.hasCard.alpha = 0;
		self.cardBkg.alpha = 0;
		self.textNumber.alpha = 0;
	}
	//判断是否被选中
	if(choiced!=true){
		self.hasChoice.alpha = 0;
	}
}
cardClass.prototype.changeStatus = function(){
	var self = this;
	self.hasCard.alpha = 0;
	self.cardBkg.alpha = 0;
	self.textNumber.alpha = 0;
	self.noCard.alpha = 1;
}
cardClass.prototype.changeTxet = function(){
	var self = this;
	self.textNumber.text ="x"+this.cardNumber;
}
//我的奖品
function myAward(){
	//清除所有
	backLayer.die();
	backLayer.removeAllEventListener();
	backLayer.removeAllChild();
	//背景
	var homepage = new LBitmap(new LBitmapData(imgList['awardBkg']));//实例化背景
	homepage.scaleX = (1+2/700);
	backLayer.addChild(homepage);//添加到背景层
	//返回首页
	var goHomepage = new LButton(new LBitmap(new LBitmapData(imgList['goHomepage'])));
	goHomepage.x = 26;
	backLayer.addChild(goHomepage);//添加到背景层
	goHomepage.addEventListener(LMouseEvent.MOUSE_DOWN,setHomepage);
	//我的奖品
	var myAwards = new LBitmap(new LBitmapData(imgList['myAward']));
	myAwards.x = 155;
	myAwards.y = 35;
	backLayer.addChild(myAwards);//添加到背景层
	//我的卡片
	var myCards= new LButton(new LBitmap(new LBitmapData(imgList['myCard'])));
	myCards.x = 415;
	myCards.y = 35;
	backLayer.addChild(myCards);//添加到背景层
	myCards.addEventListener(LMouseEvent.MOUSE_DOWN,myCard);
	
	
	//测试
	var activityLayer = new LSprite();
	var nullscroll = new LBitmap(new LBitmapData(imgList['null']));//实例化空白条
	var scroll = new LScrollbar(activityLayer,638,860,{back:nullscroll,select:nullscroll,arraw:nullscroll},true,true);//滚动条
	scroll.x = 33;
	scroll.y = 132;
	backLayer.addChild(scroll);//添加滚动条
	//附近门店
	var nearlyLayer = new LSprite();
	backLayer.addChild(nearlyLayer);
	nearlyLayer.graphics.drawRect(0,'#000000',[0,980,700,156],false,'#000000');
	nearlyLayer.addEventListener(LMouseEvent.MOUSE_DOWN,setNull);
	//附近门店按钮
	var nearlyBtn = new LButton(new LBitmap(new LBitmapData(imgList['nearlyBtn'])));
	nearlyBtn.x = setwm(nearlyBtn,2);
	nearlyBtn.y = 1026;
	nearlyLayer.addChild(nearlyBtn);//添加到背景层
	nearlyBtn.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		window.location.href="map.html";
	});
	//现金

    var Packs=[];
    Packs[2]="好太太抱枕价值58元（1个）";
    Packs[0]="获得安迪大礼包（价值188元）";
    Packs[1]="获得安迪大礼包（价值388元）";

	awardLists = [];
	var k=0;
    var ids1=[1,2,3];  //实物
	var ids2=[8,9,10]; //优惠券
	var couponList={
		"coupon10":"coupon000",
		"coupon8":"coupon188",
		"coupon9":"coupon688"
	};
	//向服务器请求奖品数据
	AjaxR(window.link+'myprize','GET',false,function(data){
        if(data.length>0)
        {
            for(i in data)
            {
                var prize_id = data[i].prize_id;
                var id=data[i].id;
                if(k>0){
                    var y=20+awardLists[k-1].getHeight()+awardLists[k-1].y;
                }else{
                    var y=20;
                }
				if($.inArray(prize_id,ids1)>=0){
					var name=prize_id==3?"packageBkgHug":"packageBkgBig";
                    var odd=data[i].logistics?data[i].logistics:false;
                    var has=false;
					if(data[i].mobile){
                        has=true;
					}
                    awardLists[k]= new package(y,name,Packs[prize_id-1],odd,i,id,has);
				}else if(prize_id==6){
                    awardLists[k]= new redClass(y,data[i].redValue,i,id);
                }else if($.inArray(prize_id,ids2)>=0){
					var name="coupon"+prize_id;

					var hasUse=data[i].mobile==null?"true":"false";

					var has=false;
					if(hasUse=="false"){
                        has=true;
					}

                    awardLists[k]= new Coupon(y,couponList[name],has,i,id,data[i].code,data[i].status);
				}

                activityLayer.addChild(awardLists[k]);
                k++;
            }
        }
	});
	//添加音乐
	var music = new musicBtn(LGlobal.width-60,15,0.75,0.75,imgList['music']);
	backLayer.addChild(music);
}
function setwm(target,index){
	return (LGlobal.width-target.getWidth())/index;
}
/*
* @红包类
* @param
* 	y:(20+awardLists[k-1].getHeight()+awardLists[k-1].y)，
* 	money:金额,
* 	order:排序,
* 	index:索引
* **/
function redClass(y,money,order,index)
{
	base(this,LSprite,[]);
	var self = this;
	self.bitmap = new LBitmap(new LBitmapData(imgList['redClassBkg']))
//	self.x = setwm(self.bitmap,2);
	self.index = index;
	self.order = order;
	self.y = y;
	self.addChild(self.bitmap);
	self.addChild(new setText(135,17,24,"获得"+money+"元红包1个","#333333",true));
	self.addChild(new setText(135,48,24,"红包以好太太公众号形式发送","#333333",true));
	self.addChild(new setText(135,78,24,"请注意查收！","#333333",true));
}
/*
* @礼包类
* @param
* 	y:(20+awardLists[k-1].getHeight()+awardLists[k-1].y)
* 	name:'礼包name(packageBkgHug:抱枕，packageBkgBig：'大礼包')',
* 	text：礼包文字描述，
* 	odd：订单号（number／false），
* 	order：排序，
* 	index：索引,
* 	hasUse:是否已经填写地址
* */
function package(y,name,text,odd,order,index,hasUse)
{
	base(this,LSprite,[]);
	var self = this;
	self.order = order;
	self.bitmap = new LBitmap(new LBitmapData(imgList[name]));
//	self.x = setwm(self.bitmap,2);
	self.y = y;
	self.index = index;
	self.addChild(self.bitmap);
	self.addChild(new setText(135,32,24,text,"#333333",true));
	self.look = new LButton(new LBitmap(new LBitmapData(imgList["look"])));
	self.look.x = 488;
	self.look.y = 35;
	self.addChild(self.look);
	self.exchange = new LButton(new LBitmap(new LBitmapData(imgList["exchange"])));
	self.exchange.x = 488;
	self.exchange.y = 35;
	self.addChild(self.exchange);
	self.oddNumber = new setText(135,62,24,"运输单号：","#333333",true);
	self.addChild(self.oddNumber);
	if(odd){
		self.exchange.visible = false;
		self.oddNumber.childList["0"].text = "运输单号："+odd;
	}else{
		self.look.visible = false;
		self.oddNumber.visible = false;
	}
	if(hasUse==true){
        self.look.visible=true;
        self.exchange.visible=false;
	}else{
        self.look.visible=false;
        self.exchange.visible=true;
	}
	//查看详细
	self.look.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		wordIndex = self.order;
		$('#personInfor').show();

        var box2=document.getElementById('personInfor').contentWindow.document.getElementById('box2');

        AjaxR(window.link+'desc','GET',{type:2,id:self.index},function(res){
            $(box2).find('.name').text("姓名："+res.name);
            $(box2).find('.phone').text("手机："+res.mobile);
            $(box2).find('.address').text("地址："+res.region);
            if(res.msg){
                $(box2).find('.word').text("留言："+res.msg);
            }else{
                $(box2).find('.word').css("display",'none');
            }
        });

		document.getElementById('personInfor').contentWindow.document.getElementById('box2').style.display="block";
		document.getElementById('personInfor').contentWindow.document.getElementById('box1').style.display="none";
		document.getElementById('personInfor').contentWindow.document.getElementById('box3').style.display="none";
		document.getElementById('personInfor').contentWindow.document.getElementById('box4').style.display="none";
	});
	//兑换礼物
	self.exchange.addEventListener(LMouseEvent.MOUSE_DOWN,function(){		
		wordIndex = self.order;
		window.postType=1;
		window.id=self.index;
		$('#personInfor').show();
		document.getElementById('personInfor').contentWindow.document.getElementById('box1').style.backgroundImage='url(img/awardBkg.jpg)';
		document.getElementById('personInfor').contentWindow.document.getElementById('box2').style.display="none";
		document.getElementById('personInfor').contentWindow.document.getElementById('box1').style.display="block";
		document.getElementById('personInfor').contentWindow.document.getElementById('box3').style.display="none";
		document.getElementById('personInfor').contentWindow.document.getElementById('box4').style.display="none";
	});
}
/*
* @免费券
* @param
* 	y:20+awardLists[k-1].getHeight()+awardLists[k-1].y,
*   name:'图片名称（coupon10：免单券，coupon8：188券，coupon9：688券）'	,
*   hasUse:布尔值（true/false） 是否已经使用／赠送
*   hasDonate:是否可赠送,
*   order:排序，
*   index:索引,
*   code:卡券编码,
*   hasGift:是否赠送中 1：否，2：是
* */
function Coupon(y,name,hasUse,order,index,code,hasGift)
{
	base(this,LSprite,[]);
	var self = this;
	self.index = index;
	self.order = order;
	self.bitmap = new LBitmap(new LBitmapData(imgList[name]));	
//	self.x = setwm(self.bitmap,2);
	self.y = y;
	self.addChild(self.bitmap);
	self.use = new LButton(new LBitmap(new LBitmapData(imgList["use"])));
	self.use.x = 488;
	self.use.y = 28;
	self.addChild(self.use);
	self.donate = new LButton(new LBitmap(new LBitmapData(imgList["donate"])));
	self.donate.x = 488;
	self.donate.y = 99;
    self.addChild(self.donate);

	self.look = new LButton(new LBitmap(new LBitmapData(imgList["look"])));
	self.look.x = 488;
	self.look.y = 55;
	self.addChild(self.look);

    self.addChild(new setText(125,130,22,"优惠编码："+code,"#333333",true));

	//使用
	self.use.addEventListener(LMouseEvent.MOUSE_DOWN,function(){

        window.id=self.index;
		if(name=="coupon000")
		{
			wordIndex = self.order;
			$('#personInfor').show();
			document.getElementById('personInfor').contentWindow.document.getElementById('box1').style.display="none";
			document.getElementById('personInfor').contentWindow.document.getElementById('box2').style.display="none";
			document.getElementById('personInfor').contentWindow.document.getElementById('box3').style.display="block";
			document.getElementById('personInfor').contentWindow.document.getElementById('box4').style.display="none";
		}else if(name=="coupon188"){
			wordIndex = self.order;
			$('#personInfor').show();
			document.getElementById('personInfor').contentWindow.document.getElementById('box1').style.display="none";
			document.getElementById('personInfor').contentWindow.document.getElementById('box2').style.display="none";
			document.getElementById('personInfor').contentWindow.document.getElementById('box3').style.display="none";
			document.getElementById('personInfor').contentWindow.document.getElementById('box4').style.display="block";
		}else if(name=="coupon688"){
			wordIndex = self.order;
			$('#personInfor').show();
			document.getElementById('personInfor').contentWindow.document.getElementById('box1').style.display="none";
			document.getElementById('personInfor').contentWindow.document.getElementById('box2').style.display="none";
			document.getElementById('personInfor').contentWindow.document.getElementById('box3').style.display="none";
			document.getElementById('personInfor').contentWindow.document.getElementById('box4').style.display="block";
		}
	});
	//查看
	self.look.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		var box2=document.getElementById('personInfor').contentWindow.document.getElementById('box2');

        AjaxR(window.link+'desc','GET',{type:1,id:self.index},function(res){
            $(box2).find('.name').text("姓名："+res.name);
            $(box2).find('.phone').text("手机："+res.mobile);
            $(box2).find('.address').text("地址："+res.region);
            if(res.msg){
                $(box2).find('.word').text("留言："+res.msg);
			}else{
                $(box2).find('.word').css("display",'none');
			}
		});
		$('#personInfor').show();
		document.getElementById('personInfor').contentWindow.document.getElementById('box2').style.display="block";
		document.getElementById('personInfor').contentWindow.document.getElementById('box1').style.display="none";
		document.getElementById('personInfor').contentWindow.document.getElementById('box3').style.display="none";
		document.getElementById('personInfor').contentWindow.document.getElementById('box4').style.display="none";

	});

	//赠送礼物
	self.donate.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        confirmCardSend2();
        window.gId=self.index;
        window.fxLink=window.link+"haotaitai2/index.html?id="+self.index+'&uid='+window.uid;
        // self.use.visible = false;
        // self.donate.visible = false;


        // AjaxR(window.link+'readyGive','POST',{id:self.index,"type":2,"__token__":window.token},function(res){
        	// if(res.code==1){
        	// 	alert(res.msg);
         //        self.use.visible = false;
         //        self.donate.visible = false;
         //        window.fxLink=window.link+"haotaitai/index.html?id="+self.index+'&uid='+res.uid;
		// 	}else{
        	// 	alert("操作失败，请重新操作");
		// 	}
		// });

	});
	if(hasUse==true)
	{
		self.use.visible = false;
		self.donate.visible = false;
		self.look.visible = true;
	}else{
		self.use.visible = true;
		self.donate.visible = true;
		self.look.visible = false;
	}
    if(hasGift==2){
        self.use.visible = false;
        self.donate.visible = false;
    }
}
//使用说明
function showUseContent(){
	var uLayer = new LSprite();
	backLayer.addChild(uLayer);
	uLayer.addEventListener(LMouseEvent.MOUSE_DOWN,setNull);
	uLayer.graphics.drawRect(0,'#ffffff',[0,0,LGlobal.width,LGlobal.height],true,'rgba(0,0,0,0.6)');
	//背景
	var userBkg = new LBitmap(new LBitmapData(imgList['userBkg']));
	userBkg.x = (LGlobal.width-userBkg.getWidth())/2;
	userBkg.y = (LGlobal.height-userBkg.getHeight())/2;
	uLayer.addChild(userBkg);
	//背景
	var useTitles = new LBitmap(new LBitmapData(imgList['useTitles']));
	useTitles.x = (LGlobal.width-useTitles.getWidth())/2;
	useTitles.y = 120;
	uLayer.addChild(useTitles);
	bigAndSmall(useTitles,2,2,1.2,0.05,0,true);
	//测试
	var useLayer = new LSprite();
	var nullscroll = new LBitmap(new LBitmapData(imgList['null']));//实例化空白条
	var uscroll = new LScrollbar(useLayer,495,635,{back:nullscroll,select:nullscroll,arraw:nullscroll},true,true);//滚动条
	uscroll.x = 105;
	uscroll.y = 120+useTitles.getHeight();
	uLayer.addChild(uscroll);//添加滚动条
	//说明
	var useContent = new LBitmap(new LBitmapData(imgList['useContent']));
	useLayer.addChild(useContent);
	//好的按钮
	var close = new LButton(new LBitmap(new LBitmapData(imgList['close'])));
	close.y = 940;
	close.x = (LGlobal.width-close.getWidth())/2;
	uLayer.addChild(close);
	close.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		uLayer.removeAllChild();
		uLayer.remove();
	});
}
//确定是否赠送
function confirmCardSend2(){
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
        enjoy2();
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
function enjoy2(){
    var sendLayer = new LSprite();
    backLayer.addChild(sendLayer);
    sendLayer.addEventListener(LMouseEvent.MOUSE_DOWN,setNull);
    sendLayer.graphics.drawRect(0,'#ffffff',[0,0,LGlobal.width,LGlobal.height],false,'rgba(0,0,0,0.75)');
    var inviteFriends = new LBitmap(new LBitmapData(imgList["inviteFriends"]));
    sendLayer.addChild(inviteFriends);
    //分享
    //如果成功

    window.title="您的好友给您赠送了一份礼物";

    window.hasGitf=true;
    window.gType=2;
    doShare(sendLayer);
}