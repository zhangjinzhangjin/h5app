iG.openWin = function(name,data){
    if(data){
        localStorage.setItem(name,JSON.stringify(data));
    }
    iG.saveOpenWin(name);
    var url = name + ".html";
    location.href = url;
};
iG.ajax = function(settings){
    var base64Encode = new Base64();
    var url = "http://172.31.64.27/FOCMobile/JsonService/";
    var data = JSON.stringify(settings.data);
    var jsondata=JSON.parse(data);
    var userInfo = iG.getUserInfo();
    $.ajax({
        url : url + base64Encode.encode(data) + "/" + userInfo,
        type : "get",
        dataType : "jsonp",
        success : function(data){
            if(jsondata.type!="FCHKNOTAM"){
               settings.success(JSON.parse(data));
            }
            else{
                settings.success(data);
            }
        },
        error : function(data){
            settings.error(data)
        }
    });
};

$(function(){
	if(window.uexOnload)
    	window.uexOnload();
})
