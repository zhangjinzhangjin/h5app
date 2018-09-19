iG.openWin = function(name,data){
    if(data){
        localStorage.setItem(name,JSON.stringify(data));
    }
    iG.saveOpenWin(name);
    var base = location.href.substring(0, location.href.lastIndexOf("/") + 1);
    var url = base + name + ".html";
    top.location.href = url;
};
if(typeof(win) == "object"){
    win.openPopover = function(childrenId, fatherId){//子页id，父页面id，子页面style
        $("iframe").remove();
        var $content = $("#content");
        var height = $content.height();
        var iframe = $("<iframe src='" + childrenId + ".html'></iframe>").height(height);
        $content.append(iframe);
    };
}
iG.execFunc = function(pageId, functionString){//这里只能调父页或子页，根据是否带_win判断
    if(pageId.indexOf("_win") > 0){//调父页
    		var string = "window.parent." + functionString;
        eval(string);
    }else{//调子页
        var string = "$('iframe')[0].contentWindow." + functionString;
        eval(string);
    }
};
$(function(){
    $("#header [goback]").off("click");
    $("#header [goback]").on("click",function(){
        top.history.go(-1);
    });
    $(window).on("resize", function(){
        var height = $("#content").height();
        $("iframe").height(height);
    });
    iP.init();
});