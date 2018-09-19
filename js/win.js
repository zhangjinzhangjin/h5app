var win = {};
//更改title
win.title = function(text){
    $$("title").innerHTML = text;
}
//初始化
win.init = function(){
    $("#header [goback]").on("click",function(){
        var array = iG.getObjItem("openWin","array");
        var lastWinId = array[array.length - 1];
        array.pop();
        iG.setObjItem("openWin","array",array);
        plus.webview.close(lastWinId);
    });
};
//打开浮层
win.openPopover = function(childrenId, fatherId){//子页id，父页面id，子页面style
    var subPageStyle = {
        top: $("#header").height() + "px",
        bottom: $("#footer").height() + "px"
    };
    var currentView = plus.webview.currentWebview();
    var subPageView = plus.webview.create(childrenId + ".html", childrenId, subPageStyle);
    currentView.append(subPageView);
    var oSubId = iG.getObjItem(fatherId, "subId");
    if(oSubId && oSubId != childrenId)
        plus.webview.close(oSubId);
    iG.setObjItem(fatherId, "subId", childrenId);
};
win.init();