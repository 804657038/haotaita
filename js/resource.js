//预加载的图片
var loadImg = [
	{path:'img/loadingBkg.jpg',type:'img',name:'loadingBkg'},//进度图背景
	{path:'img/logo.png',type:'img',name:'logo'},//logo
	{path:'img/music.png',type:'img',name:'music'}//音乐
];
//需要加载的图片
var gameImg = [
	{path:'img/address.png',type:'img',name:'address'},//地址
	{path:'img/phone.png',type:'img',name:'phone'},//电话
	{path:'img/go.png',type:'img',name:'go'},//去哪里
	{path:'img/airer.png',type:'img',name:'airer'},//晾衣架
	{path:'img/backBag.png',type:'img',name:'backBag'},//我的背包
	{path:'img/dayTip.png',type:'img',name:'dayTip'},//时间提示
	{path:'img/fesitial.png',type:'img',name:'fesitial'},//好太太节日
	{path:'img/noMoney.png',type:'img',name:'noMoney'},//免费抢
	{path:'img/rules.png',type:'img',name:'rules'},//规则
	{path:'img/start.png',type:'img',name:'start'},//开始
	{path:'img/homepage.jpg',type:'img',name:'homepage'},//首页背景
	{path:'img/logo.png',type:'img',name:'logo'},//logo
	{path:'img/music.png',type:'img',name:'music'},//音乐	
	{path:'img/gameBkg.jpg',type:'img',name:'gameBkg'},//主游戏页面
	{path:'img/dan.png',type:'img',name:'dan'},//单
	{path:'img/dice.png',type:'img',name:'dice'},//骰子
	{path:'img/feng.png',type:'img',name:'feng'},//疯
	{path:'img/hug58.png',type:'img',name:'hug58'},//抱枕
	{path:'img/gift188.png',type:'img',name:'gift188'},//礼物188
	{path:'img/gift388.png',type:'img',name:'gift388'},//礼物388
	{path:'img/horn.png',type:'img',name:'horn'},//喇叭
	{path:'img/mian.png',type:'img',name:'mian'},//季
	{path:'img/ji.png',type:'img',name:'ji'},//季
	{path:'img/qiang.png',type:'img',name:'qiang'},//抢
	{path:'img/red.png',type:'img',name:'red'},//红包
	{path:'img/returnHomepage.png',type:'img',name:'returnHomepage'},//返回首页
	{path:'img/target.png',type:'img',name:'target'},//目标
	{path:'img/wantToDice.png',type:'img',name:'wantToDice'},//我要骰子
	{path:'img/smallShank.png',type:'img',name:'smallShank'},//摇一摇
	{path:'img/shank.png',type:'img',name:'shank'},//摇一摇
	{path:'img/star.png',type:'img',name:'star'},//星星
	{path:'img/tips.png',type:'img',name:'tips'},//提示
	{path:'img/know.png',type:'img',name:'know'},//知道了
	{path:'img/festival.png',type:'img',name:'festival'},//节日
	{path:'img/gameAirer.png',type:'img',name:'gameAirer'},//游戏晾衣架
	{path:'img/bigDice.png',type:'img',name:'bigDice'},//大骰子
	{path:'img/challenge.png',type:'img',name:'challenge'},//挑战游戏
	{path:'img/close.png',type:'img',name:'close'},//关闭
	{path:'img/invite.png',type:'img',name:'invite'},//邀请
	{path:'img/wantBkg.png',type:'img',name:'wantBkg'},//我要骰子背景
	{path:'img/wantTitle.png',type:'img',name:'wantTitle'},//骰子标题
	{path:'img/ok.png',type:'img',name:'ok'},//ok
	{path:'img/bigHug.png',type:'img',name:'bigHug'},//ok
	{path:'img/fiveEightGet.png',type:'img',name:'fiveEightGet'},//ok背景
	{path:'img/goTip.png',type:'img',name:'goTip'},//明天提示
	{path:'img/rightNowGet.png',type:'img',name:'rightNowGet'},//邀请用完
	{path:'img/light.png',type:'img',name:'light'},//光
	{path:'img/mainGift.png',type:'img',name:'Gift1'},//季卡
	{path:'img/danGift.png',type:'img',name:'Gift2'},//季卡
	{path:'img/fengGift.png',type:'img',name:'Gift3'},//季卡
	{path:'img/qiangGift.png',type:'img',name:'Gift4'},//季卡
	{path:'img/jiGift.png',type:'img',name:'Gift5'},//季卡
	{path:'img/giftCash388.png',type:'img',name:'giftCash388'},//现金388
	{path:'img/giftCash188.png',type:'img',name:'giftCash188'},//现金188
	{path:'img/cashBkg.png',type:'img',name:'cashBkg'},//现金背景
	{path:'img/oneYuan.png',type:'img',name:'yuan1'},//1元现金
	{path:'img/redBkg.png',type:'img',name:'redBkg'},//红包背景
	{path:'img/redTips.png',type:'img',name:'redTips'},//红包提醒
	{path:'img/diceNumber2.png',type:'img',name:'diceNumber2'},//获得2个骰子
	{path:'img/gameSuccess.png',type:'img',name:'gameSuccess'},//游戏成功
	{path:'img/comfirm.png',type:'img',name:'comfirm'},//确定
	{path:'img/send.png',type:'img',name:'send'},//送给好友
	{path:'img/myAward.png',type:'img',name:'myAward'},//我的奖品
	{path:'img/myCard.png',type:'img',name:'myCard'},//我的卡片
	{path:'img/mianCard.png',type:'img',name:'card1'},//季卡
	{path:'img/danCard.png',type:'img',name:'card2'},//季卡
	{path:'img/fengCard.png',type:'img',name:'card3'},//季卡
	{path:'img/qiangCard.png',type:'img',name:'card4'},//季卡
	{path:'img/jiCard.png',type:'img',name:'card5'},//季卡
	{path:'img/goHomepage.png',type:'img',name:'goHomepage'},//返回首页
	{path:'img/compose.png',type:'img',name:'compose'},//我要合成
	{path:'img/cardAwardBkg.jpg',type:'img',name:'cardAwardBkg'},//我的卡片和奖品背景
	{path:'img/samllCard1.png',type:'img',name:'samllCard1'},//小卡
	{path:'img/samllCard2.png',type:'img',name:'samllCard2'},//小卡
	{path:'img/samllCard3.png',type:'img',name:'samllCard3'},//小卡
	{path:'img/samllCard4.png',type:'img',name:'samllCard4'},//小卡
	{path:'img/samllCard5.png',type:'img',name:'samllCard5'},//小卡
	{path:'img/samllCard11.png',type:'img',name:'samllCard11'},//小卡
	{path:'img/samllCard22.png',type:'img',name:'samllCard22'},//小卡
	{path:'img/samllCard33.png',type:'img',name:'samllCard33'},//小卡
	{path:'img/samllCard44.png',type:'img',name:'samllCard44'},//小卡
	{path:'img/samllCard55.png',type:'img',name:'samllCard55'},//小卡
	{path:'img/samllCard111.png',type:'img',name:'samllCard111'},//小卡
	{path:'img/samllCard222.png',type:'img',name:'samllCard222'},//小卡
	{path:'img/samllCard333.png',type:'img',name:'samllCard333'},//小卡
	{path:'img/samllCard444.png',type:'img',name:'samllCard444'},//小卡
	{path:'img/samllCard555.png',type:'img',name:'samllCard555'},//小卡
	{path:'img/cardNumber.png',type:'img',name:'cardNumber'},//卡数量背景
	{path:'img/hasChoice.png',type:'img',name:'hasChoice'},//已经选择
	{path:'img/noCards.png',type:'img',name:'noCards'},//没有卡片提示
	{path:'img/comfirmCard.png',type:'img',name:'comfirmCard'},//确定是否赠送
	{path:'img/comfirmPerson.png',type:'img',name:'comfirmPerson'},//确认个人信息
	{path:'img/sendSuccess.png',type:'img',name:'sendSuccess'},//赠送成功
	{path:'img/writeError.png',type:'img',name:'writeError'},//输入错误
	{path:'img/continue.png',type:'img',name:'continue'},//继续
	{path:'img/cancel.png',type:'img',name:'cancel'},//取消

	{path:'img/coupon0.png',type:'img',name:'coupon10'},//免单券
	{path:'img/coupon1.png',type:'img',name:'coupon8'},//188
	{path:'img/coupon2.png',type:'img',name:'coupon9'},//688

	{path:'img/continueCompose.png',type:'img',name:'continueCompose'},//继续合成
	{path:'img/composeError.png',type:'img',name:'composeError'},//合成错误
	{path:'img/confirmCompose.png',type:'img',name:'confirmCompose'},//是否合成
	{path:'img/conposing.png',type:'img',name:'conposing'},//合成
	{path:'img/conposeTitle.png',type:'img',name:'conposeTitle'},//合成标题
	{path:'img/conposeBkg.jpg',type:'img',name:'conposeBkg'},//合成背景
	{path:'img/bkgleft.jpg',type:'img',name:'bkgleft'},//背景左
	{path:'img/bkgright.jpg',type:'img',name:'bkgright'},//背景右
	{path:'img/awardBkg.jpg',type:'img',name:'awardBkg'},//奖品背景
	{path:'img/nearlyBtn.png',type:'img',name:'nearlyBtn'},//附近门店
	{path:'img/redClassBkg.png',type:'img',name:'redClassBkg'},//红包背景
	{path:'img/packageBkgBig.png',type:'img',name:'packageBkgBig'},//大礼包背景
	{path:'img/packageBkgHug.png',type:'img',name:'packageBkgHug'},//保证背景
	{path:'img/exchange.png',type:'img',name:'exchange'},//兑换
	{path:'img/look.png',type:'img',name:'look'},//查看
	{path:'img/donate.png',type:'img',name:'donate'},//赠送
	{path:'img/use.png',type:'img',name:'use'},//使用

	{path:'img/coupon000.png',type:'img',name:'coupon000'},//免单券
	{path:'img/coupon188.png',type:'img',name:'coupon188'},//券188
	{path:'img/coupon688.png',type:'img',name:'coupon688'},//券688

	{path:'img/inforClose.png',type:'img',name:'inforClose'},//关闭
	{path:'img/inforTitle.png',type:'img',name:'inforTitle'},//标题
	{path:'img/submit.png',type:'img',name:'submit'},//提交
	{path:'img/submitBkg.png',type:'img',name:'submitBkg'},//提交背景
	{path:'img/inforBkg.jpg',type:'img',name:'inforBkg'},//信息背景
	{path:'img/awardDetails.png',type:'img',name:'awardDetails'},//奖品详情
	{path:'img/lookBkg.png',type:'img',name:'lookBkg'},//查看背景
	{path:'img/null.png',type:'img',name:'null'},//空
	{path:'img/awardContent.png',type:'img',name:'awardContent'},//奖品设置
	{path:'img/awardSet.png',type:'img',name:'awardSet'},//奖品设置
	{path:'img/rulesContent.png',type:'img',name:'rulesContent'},//规则说明
	{path:'img/awardSetTitle.png',type:'img',name:'awardSetTitle'},//奖品设置标题
	{path:'img/rulesTitle.png',type:'img',name:'rulesTitle'},//规则设置标题
	{path:'img/conposetext0.png',type:'img',name:'conposetext0'},//规则提示
	{path:'img/conposetext1.png',type:'img',name:'conposetext1'},//规则提示
	{path:'img/conposetext2.png',type:'img',name:'conposetext2'},//规则提示
	{path:'img/conposetext3.png',type:'img',name:'conposetext3'},//规则提示
	{path:'img/useTitles.png',type:'img',name:'useTitles'},//使用标题
	{path:'img/useTips.png',type:'img',name:'useTips'},//使用提示
	{path:'img/userBkg.png',type:'img',name:'userBkg'},//使用背景
	{path:'img/useContent.png',type:'img',name:'useContent'},//使用内容
	{path:'img/shareFriends.png',type:'img',name:'shareFriends'},//分享好友
	{path:'img/diceBkg.png',type:'img',name:'diceBkg'},//骰子背景
	{path:'img/diceTitle.png',type:'img',name:'diceTitle'},//骰子标题
	{path:'img/installBkg.png',type:'img',name:'installBkg'},//安装背景
	{path:'img/seting.png',type:'img',name:'seting'},//设置背景
	{path:'img/gameBkg.png',type:'img',name:'gameBkg1'},//游戏背景
	{path:'img/closeStore.png',type:'img',name:'closeStore'},//关闭商店
	{path:'img/dice1.png',type:'img',name:'dice1'},//骰子1
	{path:'img/dice2.png',type:'img',name:'dice2'},//骰子2
	{path:'img/dice3.png',type:'img',name:'dice3'},//骰子3
	{path:'img/dice4.png',type:'img',name:'dice4'},//骰子4
	{path:'img/dice5.png',type:'img',name:'dice5'},//骰子5
	{path:'img/dice6.png',type:'img',name:'dice6'},//骰子6
	{path:'img/green0.png',type:'img',name:'green0'},//绿细菌0
	{path:'img/green1.png',type:'img',name:'green1'},//绿细菌1
	{path:'img/green2.png',type:'img',name:'green2'},//绿细菌2
	{path:'img/yellow0.png',type:'img',name:'yellow0'},//黄细菌0
	{path:'img/yellow1.png',type:'img',name:'yellow1'},//黄细菌1
	{path:'img/yellow2.png',type:'img',name:'yellow2'},//黄细菌2
	{path:'img/mouseBkg.jpg',type:'img',name:'mouseBkg'},//地鼠背景
	{path:'img/s1.png',type:'img',name:'s1'},//+1
	{path:'img/gameError.png',type:'img',name:'gameError'},//游戏结果
	{path:'img/games1.png',type:'img',name:'games1'},//游戏结果
	{path:'img/games2.png',type:'img',name:'games2'},//游戏结果
	{path:'img/games3.png',type:'img',name:'games3'},//游戏结果
	{path:'img/shanking.png',type:'img',name:'shanking'},//摇一摇
	{path:'img/headpic.png',type:'img',name:'headpic'},//头像
	{path:'img/nowget.png',type:'img',name:'nowget'},//头像
	{path:'img/getfail.png',type:'img',name:'getfail'},//领取失败
	{path:'img/getsuccess.png',type:'img',name:'getsuccess'},//领取成功
	{path:'img/confirmBtn.png',type:'img',name:'confirmBtn'},//确定
	{path:'img/inviteFriends.png',type:'img',name:'inviteFriends'},//邀请好友
	{path:'img/hasnotChoice.png',type:'img',name:'hasnotChoice'},//没有选择

	{path:'img/headpic.png',type:'img',name:'tou'},//微信地址
	{path:'img/mouseTips.png',type:'img',name:'mouseTips'},//打地鼠提示
	{path:'img/fight.png',type:'img',name:'fight'},//挑战
	{path:'music/hit.mp3',name:'hit'},//打地鼠声音
	{path:'music/jump.wav',name:'jump'},//跳的声音

    {path:'img/szdql.gif',type:'img',name:'szdql'},//骰子gif
    
    {path:'img/sendMian.png',type:'img',name:'sendMian'},//送的免
    {path:'img/sendDan.png',type:'img',name:'sendDan'},//送的单
    {path:'img/sendFeng.png',type:'img',name:'sendFeng'},//送的疯
    {path:'img/sendJi.png',type:'img',name:'sendJi'},//送的季
    {path:'img/sendQiang.png',type:'img',name:'sendQiang'},//送的抢
];
//全局变量
var backLayer,person,imgList;
var stepList = new Array(28);
//				0  1   2   3   4   5   6   7   8   9  10  11   12  13 14  15  16  17  18 19 20 21  22 23 24 25 26 27
var targetX = [81,171,265,359,359,451,541,541,541,541,541,541,541,541,451,359,265,265,171,81,81,81,81,81,81,81,171,171];
var targetY = [330,330,330,330,406,406,406,482,564,640,720,800,880,960,960,960,960,880,880,880,800,720,640,564,482,406,406,330];
var targetR = [46,47,47,0,46,45,0,0,0,0,0,0,0,45,46,47,0,47,46,0,0,0,0,0,0,46,0,0];
//             0  1  2  3 4  5  6 7 8 9101112 13 14 15 161718 1920212223 2425 26var targetX = [85,175,265,355,355];
var awardLists;
var wordIndex = -1;
var diceNumberWord;//骰子个数
var loadText;//加载进度提示
var shape;//进度条
var shankOpen = false;
for(var i=0;i<targetX.length;i++)
{
	var list;
	if(targetR[i]==0)
	{
		list = [];
		stepList[i]=new Array(list);
	}else{
		stepList[i]=new Array(getStepList(targetX[i],targetY[i],targetR[i],i));
	}
}
//摇一摇数据
var SHAKE_THRESHOLD = 2000;
var last_update = 0;  
var x = y = z = last_x = last_y = last_z = 0;  
var gameOrAward;
var diceList = [];
var hasFirst=true;
var wechatHead;