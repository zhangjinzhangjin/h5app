/**************************************************************
 @Name : iBox v1.0 光箱开发版
 @author: imaginist
 @date: 2013-09-12

 *************************************************************/
(function($,iT,iC) {

var Box = function(settings){
    iT = this;                                      //this -> 赋值
    iC = $.extend({}, this.boxConfig, settings);    //配置 -> 合并
    settings ? this.boxCreate() : this.boxReset();  //执行-> start
};
Box.prototype = {
    //箱子配置
    boxConfig : {
        type : 0,                           //箱子类型 -> 0-3
        bottom : "50%",
        width : "",                         //箱子宽度 -> number
        shade : false,                      //遮罩层 -> boolean
        title : "",                         //标题 -> string
        icon : false,                       //图标 -> boolean
        cont : ["",0],                      //内容 -> [string,0-1]
        btnsNum : 2,                        //按钮个数 -> number
        btnsText : ["确定","取消"],         //按钮文字 -> [string,string]
        ok : function(){$.iBoxHide()},      //确定按钮回调 -> function
        cancel : function(){$.iBoxHide()},  //取消按钮回调 -> function
        time : 0                            //持续时间 -> number
    },
    //箱子创造
    boxCreate : function() {
        this.boxReset();        //箱子重置 -> fn
        this.boxReady();        //箱子准备 -> fn
        this.boxAct();          //箱子动作 -> fn
        this.boxPer();          //箱子个性化 -> fn
        this.boxUp();           //箱子装载 -> fn
        this.boxStyle();        //箱子样式 -> fn
        this.boxTimes();        //箱子定时 -> fn
    },
    //箱子准备
    boxReady : function() {
        this.shade =    $('<div class="iBox-shade"></div>');                        //遮罩层 -> html
        this.wrap =     $('<div class="iBox-wrap"></div>');
        this.box =      $('<div class="iBox-box"></div>');                          //箱子 -> html
        this.title =    $('<div class="iBox-title">'+ iC.title +'</div>');          //标题 -> html
        this.icon =     $('<div class="iBox-icon"></div>');                         //图标 -> html
        this.msg =      $('<div class="iBox-msg"><b>'+ iC.cont[0] +'</b></div>');   //文字 -> html
        this.btnsBox =  $('<div class="iBox-button"></div>');                       //按钮 -> html
        this.ok =       $('<span class="iBox-ok">'+ iC.btnsText[0] +'</span>');     //确定按钮 -> html
        this.cancel =   $('<span class="iBox-cancel">'+ iC.btnsText[1] +'</span>'); //取消按钮 -> html
    },
    //箱子动作
    boxAct : function() {
        this.ok.on("click",iC.ok);              //确定按钮 -> click
        this.cancel.on("click",iC.cancel);      //取消按钮 -> click
    },
    //箱子个性化
    boxPer : function() {
        switch (iC.type) {                                                  //箱子类型 -> 检查
            case 0  : this.box.addClass("iBox-green"); break;               //箱子类型 -> 绿
            case 1  : this.box.addClass("iBox-red"); break;                 //箱子类型 -> 红
            case 2  : this.box.addClass("iBox-yellow"); break;              //箱子类型 -> 黄
            case 3  : this.box.addClass("iBox-wait"); break;                //箱子类型 -> 等待
        };
        switch (iC.cont[1]) {                                               //内容类型 -> 检查
            case 0  : this.cont = this.msg; break;                          //内容类型 -> 文字
            case 1  : this.cont = $(iC.cont[0]).clone(true).show(); break;  //内容类型 -> 页面层
            default : this.cont = this.msg;                                 //内容类型 -> none
        };
        switch (iC.btnsNum) {                                               //按钮个数 -> 检查
            case 1  : this.btns = this.ok.addClass("iBox-center"); break;   //按钮个数 -> 1
            case 2  : this.btns = this.ok.add(this.cancel); break;          //按钮个数 -> 2
            default : this.msg.addClass("iBox-noBtns");                     //按钮个数 -> none
        };
        if(iC.width) this.box.css("width",iC.width);                        //箱子 -> 设置宽度
        if(!iC.icon) this.msg.addClass("iBox-noIcon");                      //图标 -> none
    },
    //箱子装载
    boxUp : function() {
        if(iC.title)   this.box.append(this.title);                         //箱子 -> 装载标题
        if(iC.icon)    this.box.append(this.icon);                          //箱子 -> 装载图标
        if(iC.cont[0]) this.box.append(this.cont);                          //箱子 -> 装载内容
        if(iC.btnsNum) this.box.append(this.btnsBox.append(this.btns));     //箱子 -> 装载按钮
        this.wrap.append(this.box);
        if(iC.shade) $("body").append(this.shade);                          //BODY -> 装载遮罩层
        if(this.box.html()) $("body").append(this.wrap);                     //BODY -> 装载箱子
    },
    boxStyle : function() {
        this.wrap.css("margin-top",-this.wrap.outerHeight() / 2);
		

//        this.box.css({
//            "width" : this.box.width(),                 //箱子 -> 设置宽度
//            "bottom" : iC.bottom,
//            "margin-top" : -this.box.outerHeight() / 2,      //箱子 -> 设置MARGIN-TOP
//            "margin-left" : -this.box.outerWidth() / 2       //箱子 -> 设置MARGIN-LEFT
//        });
    },
    //箱子重置
    boxReset : function() {
        $(".iBox-shade").remove()
        $(".iBox-wrap").remove();        //箱子 -> 移除
        clearTimeout(this.timeId[0]);   //定时器 -> 移除
    },
    //箱子定时
    boxTimes : function() {
        if (!iC.time) return;                //定时器 -> none
        var t = setTimeout(function() {      //定时器 -> 设置
            iT.boxReset();                   //箱子重置 -> fn
        },iC.time * 1000)                    //定时器 -> 持续时间
        this.timeId.length = 0;              //定时器ID -> 清空
        this.timeId.push(t);                 //定时器ID -> 推入
    },
    //定时器ID
    timeId : []
};
$.iBox = function(settings) {
    return new Box(settings);
}
//单纯信息窗
$.iBoxMsg = function(msg) {
    $.iBox({
        
        type : 0,
        cont : [msg,0],
        icon : false,
        btnsNum : false,
        width:"10em",
        time : 3
    })
}
//等待窗
$.iBoxWait = function(shade) {
    $.iBox({
        shade : false,
        type : 0,
        icon : true,
        cont : ["请稍候...",0],
        width:"10em",
        btnsNum : false,

    })
}
//加载窗
$.iBoxLoad = function(shade) {
    $.iBox({
        shade : false,
        type : 0,
        icon : true,
        cont : ["请稍候...",0],
        width:"10em",
        btnsNum : false
    })
}
//选择信息窗
$.iBoxAlert = function(settings) {
    $.iBox({
        width : 350,
        shade : true,
        type : settings.type,
        title : settings.title,
        cont : settings.cont,
        btnsNum : settings.btnsNum,
        btnsText : settings.btnsText,
        ok : settings.ok,
        cancel : settings.cancel
    });
}
//移除
$.iBoxHide = function() {
    $.iBox();
}

})($);
