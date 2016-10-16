const server = {
  createXHR: function(){
    if(typeof XMLHttpRequest != 'undefined'){
      return new XMLHttpRequest();
    }else if(typeof ActiveXObject != 'undefined'){
      if(typeof arguments.callee.activeXString != 'string'){
        var version = [ "MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
            i, len;
        for(i = 0, len = version.length; i < len; i++){
          try {
            new ActiveXObject(version[i]);
            arguments.callee.activeXString = version[i];
            break;
          } catch(ex){
            //
          }
        }
      }
      return new ActiveXObject(arguments.callee.activeXString);
    }else{
      throw new Error('No XHR object available.');
    }
  },
  ajaxRequest: function(args){

    var option  = {
      url: args.url,
      sendBeforeFn: args.sendBefore,
      successFn: args.success,
      errorFn: args.error,
      data: args.data || null,
      method: args.method || 'get',
      isAys: args.isAys || true
    };

    var me = server;
    var xmlhttp = me.createXHR();
    xmlhttp.onreadystatechange = function(){
      if(xmlhttp.readyState == 2){
        if(typeof option.sendBeforeFn === 'function'){
          option.sendBeforeFn();
        }
      }else if(xmlhttp.readyState == 4){
        if((xmlhttp.status >= 200 && xmlhttp.status < 300) || xmlhttp.status == 304){
          option.successFn(xmlhttp.responseText);
        }else{
          option.errorFn(xmlhttp.status);
        }
      }
    }

    if(option.method === 'get' && option.data){
      option.url = option.url + '?' + me.getUrlDate(option);
    }


    xmlhttp.open(option.method, option.url, option.isAys);

    if(option.method === 'post' && option.data){
      xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");

      var resultString = me.getUrlDate(option);
      xmlhttp.send(resultString)
    }else {
      xmlhttp.send(null);
    }
  },
  getUrlDate: function(option){
    var resultArray = [],
        resultString = "";
        /*
          目前只之策一层嵌套的data
        */
    for(var i in option.data){
      resultArray.push(i + '=' + option.data[i]);
    }
    resultArray.forEach(function(item){
      resultString += item + '&';
    });
    return resultString.slice(0, resultString.length -1 );
  }
}
export default server.ajaxRequest
