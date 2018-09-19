var iG = {};
iG.versionNo = '1.0';
iG.isApp = /Html5Plus/i.test(navigator.userAgent) ? true :  false;
iG.debug = false;
iG.init = function(){
    iG.removeObjItem("openWin","array");
};
/* 操作数据
---------------------------------------------------------------------------------------*/
//AJAX请求
iG.ajax = function(settings){
    /*var base64Encode = new Base64();
    var url = "http://172.31.64.27/FOCMobile/JsonService/";
    if(this.debug) url = "http://172.31.64.27/FOCMobile/JsonService/";
    var data = JSON.stringify(settings.data);
	  var jsondata=JSON.parse(data);
    var userInfo = iG.getUserInfo();
    var dataJson = {
        jsonStr : base64Encode.encode(data),
        jsonUserInfo : userInfo
    }
    
    $.ajax({
        type : "post",
        contentType: 'application/json',
        dataType:"json",  
        url : url + "GetJsonDataPost",
        data: JSON.stringify(dataJson),  
        success : function(data){
             if(jsondata.type!="FCHKNOTAM"){
               settings.success(JSON.parse(data));
            }
            else{
                settings.success(data);
            }
        },
        error : function(data){
            settings.error(data);
        }
    });*/
};
//获取用户账户
iG.getUserInfo = function(){
    
};
//自动装载数据
iG.autoData = function(obj,wrapElem){
    if(wrapElem == undefined) wrapElem = $("body");
    wrapElem.find("[auto]").each(function(){
        var key = $(this).attr("auto");
        var objCopy = obj;
        while (key.indexOf("_") != "-1") {
            var sep = key.indexOf("_");
            objCopy = objCopy[key.substring(0, sep)];
            key = key.substring(key.indexOf("_") + 1);
        };
        if (objCopy != null) {
            $(this).text(objCopy[key]);
        }else{
            $(this).text('');
        }
    });
};
/* 操作本地存储
---------------------------------------------------------------------------------------*/
//获取本地存储obj值
//获取本地存储obj值
iG.getObjItem = function(obj,key){
    var json = localStorage.getItem(obj);
    if(json == null || json == undefined || json == "undefined" || json == ""){
		return undefined;
	}else{
		json=JSON.parse(json);
	}
    return json[key];
};
//设置本地存储obj值
iG.setObjItem = function(obj,key,value){
    var json = localStorage.getItem(obj);
    if(json == null || json == undefined || json == "undefined" || json == ""){
		json = {};
	}else{
		json=JSON.parse(json);
	}
    json[key] = value;
    localStorage.setItem(obj,JSON.stringify(json));
};
//删除本地存储obj值
iG.removeObjItem = function(obj,key){
    var json = localStorage.getItem(obj);
    if(json == null || json == undefined || json == "undefined" || json == ""){
		return;
	}else{
		json=JSON.parse(json); 
	}
    delete json[key];
    localStorage.setItem(obj,JSON.stringify(json));
};
/* 操作日期
---------------------------------------------------------------------------------------*/
//获取年
iG.getYear = function(date){
    if(date == undefined) date = new Date;
    return date.getFullYear();
};
//获取月
iG.getMonth = function(date){
    if(date == undefined) date = new Date;
    var month = date.getMonth() + 1;
    if(month < 10) month = "0" + month;
    return month;
};
//获取日
iG.getDay = function(date){
    if(date == undefined) date = new Date;
    var day = date.getDate();
    if(day < 10) day = "0" + day;
    return day;
};
//获取当前日期
iG.getDateToday = function(date){
    return iG.getYear() + "-" + iG.getMonth() + "-" + iG.getDay();
};
//获取星期
iG.getWeek = function(date){
    if(date == undefined) date = new Date;
    var week = date.getDay();
    var weekArr = ["日","一","二","三","四","五","六"];
    return weekArr[week];
};
//获取小时
iG.getHours = function(date){
    if(date == undefined) date = new Date;
    return date.getHours();
},
//获取分钟
iG.getMinutes = function(date){
    if(date == undefined) date = new Date;
    return date.getMinutes();
};
//打开日期控件
iG.openDate = function(callback, dateObj){
    if(!iG.isApp)
    		return;
    var sDate = new Date();
    if(dateObj)
        sDate.setFullYear(dateObj.year ? dateObj.year : sDate.getFullYear(), dateObj.month ? dateObj.month - 1 : 1, dateObj.day ? dateObj.day : 1);
	plus.nativeUI.pickDate(function(e){
		var nDate = e.date;
        var result = nDate.getFullYear() + "-" + (nDate.getMonth() + 1) + "-" + nDate.getDate();
        callback.call(this, result);
		//console.log( "选择的日期："+d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate() );
	},function(e){
		console.log( "未选择日期："+e.message );
	},{date: sDate});
};
//打开时间控件
iG.openTime = function(callback, timeObj){
    if(!iG.isApp)
    		return;
    var sDate = new Date();
    if(timeObj)
        sDate.setHours(timeObj.hour ? timeObj.hour : sDate.getHours(), timeObj.minute ? timeObj.minute : sDate.getMinutes());
    plus.nativeUI.pickTime(function(e){
    	var nDate = e.date;
    	//console.log( "选择的时间："+d.getHours()+":"+d.getMinutes() );
        var result = nDate.getHours() + ":" + nDate.getMinutes();
        callback.call(this, result);
    },function(e){
    	console.log( "未选择时间："+e.message );
    });
};
/* 设置页面回弹
---------------------------------------------------------------------------------------*/
//默认状态，系统下拉刷新的回调
iG.setSysBounce = function(){
    if(!iG.isApp)
    		return;
    var ws = plus.webview.currentWebview();
    ws.endPullToRefresh();
};
//系统下拉刷新
iG.sysPullDown = function(callback){
    if(!iG.isApp)
    		return;
    var ws = plus.webview.currentWebview();
    ws.setPullToRefresh({
    	support:true,
    	height:'50px',
    	range:'200px',
    	contentdown:{
    		caption:'下拉可以刷新'
    	},
    	contentover:{
    		caption:'释放立即刷新'
    	},
    	contentrefresh:{
    		caption:'正在刷新...'
    	}
    }, function(){
        callback.call();
        
    });
};
//默认状态，h5上下拉刷新的回调
iG.setH5Bounce = function(mescroll, param1, param2){
    mescroll.endSuccess(param1, param2);
};
//h5页面刷新，支持上下拉
iG.h5Refresh = function(id, downCallback, upCallback){
    var scrollBuffer = {};
    if(downCallback)
        scrollBuffer["down"] = {
            auto:false,//是否在初始化完毕之后自动执行下拉回调callback; 默认true
            callback: function(){ //下拉刷新的回调,
                downCallback.call(mescroll);
            }
        }
    if(upCallback)
        scrollBuffer["up"] = {
            auto:false,//初始化完毕,是否自动触发上拉加载的回调
            isBoth: true, //上拉加载时,如果滑动到列表顶部是否可以同时触发下拉刷新;默认false,两者不可同时触发; 这里为了演示改为true,不必等列表加载完毕才可下拉;
            isBounce: false, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
            callback: function(){ //上拉加载的回调
                upCallback.call(mescroll);
            },
            toTop:{ //配置回到顶部按钮
                src : "../img/mescroll-totop.png", //默认滚动到1000px显示,可配置offset修改
            }
        }
    var mescroll = initMeScroll(id, scrollBuffer);
};
/* 其他
---------------------------------------------------------------------------------------*/
//记录打开窗口
iG.saveOpenWin = function(winName){
    var array = iG.getObjItem("openWin","array");
    if(!array)
        array = [];
    if(array.indexOf(winName) == -1){
        array.push(winName);
    }
    iG.setObjItem("openWin","array",array);
};
//打开新窗口
iG.openWin = function(pageId, data){
    if(data){
        localStorage.setItem(pageId, JSON.stringify(data));
    }
    iG.saveOpenWin(pageId);
    //var nwaiting = plus.nativeUI.showWaiting();
    webviewShow = plus.webview.create(pageId + ".html", pageId);
    webviewShow.show("slide-in-right",300);
    /*webviewShow.addEventListener("loaded", function() { //注冊新webview的加载完毕事件
		nwaiting.close(); //新webview的加载完毕后关闭等待框
		webviewShow.show("slide-in-right",300); //把新webview窗口显示出来，显示动画效果为速度300毫秒的右側移入动画
	}, false);*/
    //plus.webview.open(pageId + ".html", pageId);//直接打开，但是有白屏闪
};
//调用其他页面的方法，父子页面函数相互调用, 调用其他view时，需要传递的参数需要在localstroage中传
iG.execFunc = function(pageId, functionString){
    var targetView = null;
    if(pageId == "index_win")//首页
        targetView = plus.webview.getLaunchWebview();
    else
        targetView = plus.webview.getWebviewById(pageId);
    targetView.evalJS(functionString);
};
//发送推送消息
iG.sendPushMessage = function(msg, data){
    if(!iG.isApp)
    		return;
    plus.push.createMessage(msg, data, {
        cover: true,
        sound: "system"
    });
};
//从推送消息回到页面后的触发函数
iG.backFromPushMessage = function(callback){
    if(!iG.isApp)
    		return;
    plus.push.addEventListener( "click", function ( msg ) {
        callback.call(this, msg);
    }, false ); 
};
//设备震动
iG.shake = function(s){//s为毫秒数
    if(!iG.isApp)
    		return;
    plus.device.vibrate(s);
};
//照相
iG.capture = function(callback){
    if(!iG.isApp)
    		return;
    var cmr = plus.camera.getCamera();
    var res = cmr.supportedImageResolutions[0];//分辨率
    var fmt = cmr.supportedImageFormats[0];//格式jpg等
    cmr.captureImage( function(path){
        plus.io.resolveLocalFileSystemURL(path, function(entry) {
            callback.call(this, entry.fullPath);
        }, function(e) {
            alert(e.message);  
        });
    },
    function( error ) {
        alert( "Capture image failed: " + error.message );
    },
    {resolution: res, format: fmt}
  );
};
//相册
iG.gallery = function(callback, multi){//回调，是否多选
    if(!iG.isApp)
        return;
    if(!multi){
        plus.gallery.pick( function(path){
            callback.call(this, path);
        }, function ( e ) {
            console.log( "取消选择图片" );
        }, {filter:"image"} );
    }else{
        plus.gallery.pick( function(e){
        		for(var i in e.files){//e.files是路径数组
        			callback.call(this, e.files);
        		}
        }, function ( e ) {
              console.log( "取消选择图片" );
        },{filter:"image",multiple:true});
    }
};
iG.downLoad = function(sUrl, callback, option){//下载文件的地址，回调，下载参数
    if(!iG.isApp){
        return window.location.href = sUrl;
    }
    var option = option || {filename: "_doc/download/"};
    /*
    downloadObj
    id: 下载任务的标识
    url: 下载文件的地址
    state: 任务的状态
    options: 下载任务的参数
    filename: 下载的文件名称
    downloadedSize: 已完成下载文件的大小
    totalSize: 下载任务文件的总大小
    */
    var downLoader = plus.downloader.createDownload(sUrl, option, function ( downloadObj, status ) {
		// 下载完成
		if ( status == 200 ) { 
			//alert( "Download success: " + downloadObj.filename );
            callback.call(this, downloadObj);
		} else {
			alert( "Download failed: " + status ); 
		}  
	});
	//downLoader.addEventListener( "statechanged", onStateChanged, false );
	downLoader.start(); 
};
iG.upload = function(settingObj){
    if(!iG.isApp){
        //微网站上传
        return;
    }
       
    /*settingObj
    serviceUrl, 上传服务地址
    callback, 上传成功后的回调
    option, 上传参数
    filePath, 上传文件路径名
    extendData 上传时额外带的key:value数据
    */
    var option = settingObj.option || { method:"POST",blocksize:204800,priority:100 };
    /*
    uploadObj
    id: 上传任务的标识
    url: 上传文件的服务器地址
    state: 任务的状态
    options: 上传任务的参数
    responseText: 上传任务完成后服务器返回的数据
    uploadedSize: 已完成上传数据的大小）
    totalSize: 上传数据的总大小
    */
    var uploader = plus.uploader.createUpload(settingObj.serviceUrl, settingObj.option, function (uploadObj, status ) {
			// 上传完成
			if ( status == 200 ) { 
				//alert( "Upload success: " + uploadObj.url );
                settingObj.callback.call(this, uploadObj);
			} else {
				alert( "Upload failed: " + status );
			}
		}
	);
	uploader.addFile(settingObj.filePath, {key: settingObj.key} );
    if(settingObj.extendData){
        for(var key in settingObj.extendData){
            uploader.addData(key, settingObj.extendData[key]);
        }
    }
	//task.addEventListener( "statechanged", onStateChanged, false );
	uploader.start();
};