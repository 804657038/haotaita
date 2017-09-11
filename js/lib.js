/**
 * Created by libinghe on 2017/5/16.
 */
/* jQuery cookie 操作*/
jQuery.cookie = function (key, value, options) {
    if (arguments.length > 1 && (value === null || typeof value !== "object")){
        options = jQuery.extend({}, options);
        if (value === null) {
            options.expires = -1;
        }
        if (typeof options.expires === 'number'){
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }
        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? String(value) : encodeURIComponent(String(value)),
            options.expires ? '; expires=' + options.expires.toUTCString() : '',
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};
getUserLocation=function (options,callback){
    var res={status:1};
    this.options = {
        'useHistory':true,				//boolean 是否使用历史数据
        'historyTime':120			//number  使用历史数据的时效，也是保存数据的有效期
    }
    for (var i in options){
        this.options[i] = options[i];
    }
    options = this.options;
    if(options.useHistory && $.cookie('userLocationLng') && $.cookie('userLocationLat')){
        options['userLocation'] = $.cookie('userLocation');
        options['userLocationLng'] = $.cookie('userLocationLng');
        options['userLocationLat'] = $.cookie('userLocationLat');

        callback(res);
        return false;
    }


    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){

            options['userLocation'] = r.point.lng+','+r.point.lat;
            options['userLocationLng'] = r.point.lng;//lng经度
            options['userLocationLat'] = r.point.lat;//lat纬度
            //通过 cookie 记录用户的经纬度，不通过H5的本地存储方便PHP调用
            var expire =  new Date();
            expire.setTime(expire.getTime() + options.historyTime*1000);	//保存时间 120*1000 毫秒=120秒
            options.historyTime = expire;
            $.cookie('userLocation',options['userLocation'],{expires:options.historyTime,path:'/'});
            $.cookie('userLocationLng',options['userLocationLng'],{expires:options.historyTime,path:'/'});
            $.cookie('userLocationLat',options['userLocationLat'],{expires:options.historyTime,path:'/'});
            $.cookie('userLocationHasRecord',1,{expires:options.historyTime,path:'/'});
            callback(res);

        }else{ //定位失败
            res.status=0;
            callback(res);
            //this.getStatus();
        }
    },{enableHighAccuracy: true})
    //关于状态码
    //BMAP_STATUS_SUCCESS	检索成功。对应数值“0”。
    //BMAP_STATUS_CITY_LIST	城市列表。对应数值“1”。
    //BMAP_STATUS_UNKNOWN_LOCATION	位置结果未知。对应数值“2”。
    //BMAP_STATUS_UNKNOWN_ROUTE	导航结果未知。对应数值“3”。
    //BMAP_STATUS_INVALID_KEY	非法密钥。对应数值“4”。
    //BMAP_STATUS_INVALID_REQUEST	非法请求。对应数值“5”。
    //BMAP_STATUS_PERMISSION_DENIED	没有权限。对应数值“6”。(自 1.1 新增)
    //BMAP_STATUS_SERVICE_UNAVAILABLE	服务不可用。对应数值“7”。(自 1.1 新增)
    //BMAP_STATUS_TIMEOUT	超时。对应数值“8”。(自 1.1 新增)
};
getAddressLocation=function(str,callback){
    // 百度地图API功能

    var myGeo = new BMap.Geocoder();

    // 初始化地图,用城市名设置地图中心点
    myGeo.getPoint(str.address, callback);
};