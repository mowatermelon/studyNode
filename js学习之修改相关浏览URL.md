1 c#后台获取当前界面的url
如果测试的url地址是http://www.test.com/testweb/default.aspx, 结果如下：
  ```
  Request.ApplicationPath:                /testweb
  Request.CurrentExecutionFilePath:       /testweb/default.aspx
  Request.FilePath:                       /testweb/default.aspx
  Request.Path:                           /testweb/default.aspx
  Request.PhysicalApplicationPath:        E:\WWW\testwebRequest.
  PhysicalPath:                   E:\WWW\testweb\default.aspx
  Request.RawUrl:                         /testweb/default.aspx
  Request.Url.AbsolutePath:               /testweb/default.aspx
  Request.Url.AbsoluteUrl:                http://www.test.com/testweb/default.aspx
  Request.Url.Host:                       http://www.test.com/
  Request.Url.LocalPath:                  /testweb/default.aspx
  ```
2 前台修改相关url
* html标签跳转
```
<head>
<!-- 以下方式只是刷新不跳转到其他页面 -->
<meta http-equiv="refresh" content="10">
<!-- 以下方式定时转到其他页面 -->
<meta http-equiv="refresh" content="5;url=hello.html">
</head>
```
> 优点：简单
缺点：Struts Tiles中无法使用
* 控制parent页面跳转，这个其实用不到jQuery

  `window.parent.location.href = "*****";`

* 调用parent页面的函数，其实也不用jQuery

  `window.parent.method(para);`

* 操作parent的DOM

  `$(".test", window.parent.document).remove();`

* location.href.....

  （1）self.loction.href="/url"

  ` window.location.href="/url"    以上两个用法相同均为在当前页面打开URL页面`

  （2）this.location.href="/url"    当前页面打开URL

  （3） parent.location.href="/url"   在父页面打开新页面，如果页面中自定义了frame，那么可将parent self top换为自定义frame的名称,效果是在frame窗口打开url地址

  （4） top.location.href="/url"   在顶层页面打开新页面

* 关于刷新页面

  （1）window.location.href=window.location.href

  （2）window.location.Reload()

都是刷新当前页面。区别在于是否有提交数据。当有提交数据时，window.location.Reload()会提示是否提交，window.location.href=window.location.href;则是向指定的url提交数据

* js获取url相关参数
```
// 获取地址栏的参数数组  
function getUrlParams() {  
    var search = window.location.search;  
    // 写入数据字典  
    var tmparray = search.substr(1, search.length).split("&");  
    var paramsArray = new Array;  
    if (tmparray != null) {  
        for (var i = 0; i < tmparray.length; i++) {  
            var reg = /[=|^==]/;    // 用=进行拆分，但不包括==  
            var set1 = tmparray[i].replace(reg, '&');  
            var tmpStr2 = set1.split('&');  
            var array = new Array;  
            array[tmpStr2[0]] = tmpStr2[1];  
            paramsArray.push(array);  
        }  
    }  
    // 将参数数组进行返回  
    return paramsArray;  
}  
// 根据参数名称获取参数值  
function getParamValue(name) {  
    var paramsArray = getUrlParams();  
    if (paramsArray != null) {  
        for (var i = 0; i < paramsArray.length; i++) {  
            for (var j in paramsArray[i]) {  
                if (j == name) {  
                    return paramsArray[i][j];  
                }  
            }  
        }  
    }  
    return null;  
}
```
* js设置url相关参数
```
//Js修改Url参数  
function changeURLPar(url, ref, value) {  
    var str = "";  
    if (url.indexOf('?') != -1)  
        str = url.substr(url.indexOf('?') + 1);  
    else  
        return url + "?" + ref + "=" + value;  
    var returnurl = "";  
    var setparam = "";  
    var arr;  
    var modify = "0";  
    if (str.indexOf('&') != -1) {  
        arr = str.split('&');  
        for (i in arr) {  
            if (arr[i].split('=')[0] == ref) {  
                setparam = value;  
                modify = "1";  
            }  
            else {  
                setparam = arr[i].split('=')[1];  
            }  
            returnurl = returnurl + arr[i].split('=')[0] + "=" + setparam + "&";  
        }  
        returnurl = returnurl.substr(0, returnurl.length - 1);  
        if (modify == "0")  
            if (returnurl == str)  
                returnurl = returnurl + "&" + ref + "=" + value;  
    }  
    else {  
        if (str.indexOf('=') != -1) {  
            arr = str.split('=');  
            if (arr[0] == ref) {  
                setparam = value;  
                modify = "1";  
            }  
            else {  
                setparam = arr[1];  
            }  
            returnurl = arr[0] + "=" + setparam;  
            if (modify == "0")  
                if (returnurl == str)  
                    returnurl = returnurl + "&" + ref + "=" + value;  
        }  
        else  
            returnurl = ref + "=" + value;  
    }  
    return url.substr(0, url.indexOf('?')) + "?" + returnurl;  
}  
```
* [HTML5无刷新修改URL](http://www.qttc.net/static/demo/html5_20130320/test.html)

  HTML5新添加了两个api分别是pushState和replaceState，DOM中的window对象通过window.history方法提供了对浏览器历史记录的读取，可以在用户的访问记录中前进和后退，我们可以开始操作这个历史记录堆栈。

  <html>
    <head>
        <meta charset="utf-8" />
        <title>HTML5无刷修改url - XXX</title>
        <script type="text/javascript">
            function changeURL(){
                var url = document.getElementById('url').value;
                window.history.pushState({},0,'http://'+window.location.host+'/'+url);      
            }
        </script>
    </head>
        <h1>html5无刷新改变url</h1>
        <div id="info" style="margin:30px 0;">
            页面真实地址:
            <span style="color:red;"><script type="text/javascript">document.write(window.location.href);</script></span>
        </div>
        <div>
        请输入要改变地URL字符串：<input id='url' type="text" />
        <button onclick="changeURL();">点击无刷改变url</button>
        </div>
        <div style="color:red;margin-top:30px;">请使用支持html5的浏览器访问</div>
        <div style="margin-top:30px;"><a href="http://www.qttc.net/201303292.html" target="_blank">《html5无刷新改变URL》</a> - XXX</div>

</html>

* [HTML5模拟翻页效果](http://www.qttc.net/static/demo/html5_20130320/demo-page.html)
```
    var changeURL = function(){

        if(location.href.indexOf("?") > -1){
            var arr = location.href.split('?');
            var urlbase = arr[0];
            var pageObj = arr[1].match(/page=(\d+)/);
            var page = Number(pageObj[1]) || 1;
        }else{
            var urlbase = location.href;
            var page = 1;
        }

        load = false;
        var content = document.getElementById("content");   
        var ajax = new XMLHttpRequest();

        // 调用数据回掉函数
        var ajaxCallback = function(){
            if(ajax.readyState == 4){
                load = false;
                result = eval('('+ajax.responseText+')');
                content.innerHTML = result.data;
                next.href = urlbase + "?page=" + (page + 1);

                // push到历史记录里，可以在点击后退时从历史记录里恢复内容
                // 并且无刷修改url地址
                window.history.pushState({content:content.innerHTML,page:page},page,urlbase + "?page=" + page);
            }
        };

        // 点击事件
        document.getElementById('next').onclick = function(event){
            if(!load){
                load = true;
                content.innerHTML = '加载中数据中...(注意看数据返回后url改变)';
                page++;
                ajax.open('GET','shuju.php?page='+page, true);
                ajax.onreadystatechange = ajaxCallback;
                ajax.send('');
                return false;
            }
        };
          // 记录到历史里，当点击后退按钮还退回上次页面请求前的页面内容
          window.onpopstate = function(){
              content.innerHTML = history.state.content;
              page = history.state.page;              
          }

          // 修改当前页面在 history 中的记录
          window.history.replaceState({content:content.innerHTML,page:page},page,urlbase + (page > 1 ? '?page=' + page : '' ));
      };

        // 检测是否支持
        try{
            //监听事件
            window.addEventListener('DOMContentLoaded', changeURL, false);
        }catch(e){
            alert('浏览器不支持，请使用支持html5的浏览器');
        }
```
      <div id="content" style="width:300px;height:100px;border:1px solid #999;">第1页的内容</div>
      <div><a id="next" href="?page=2">下一页</a></div>

      <div style="color:red; margin-top:30px;">请使用支持html5的浏览器测试</div>
      <div><a href="http://www.XXX.net">xxx</a></div>
```
* html5hash

    比如：我点击页面上的一个按钮，网址栏中的地址发生改变，但是页面不跳转也不刷新，但是我手动刷新此页面的时候，实际要刷新地址栏中的新地址  其实HTML5早就帮我们解决了 用history.pushState 详情： https://developer.mozilla.org/en/DOM/Manipulating_the_browser_history  

    pushState方法
    pushState()有三个参数:state对象，标题(现在是被忽略，未作处理)，URL(可选)。具体细节

    · state对象 –state对象是一个JavaScript对象，它关系到由pushState()方法创建出来的新的history实体。用以存储关于你所要插入到历史 记录的条目的相关信息。State对象可以是任何Json字符串。因为firefox会使用用户的硬盘来存取state对象，这个对象的最大存储空间为640k。如果大于这个数 值，则pushState()方法会抛出一个异常。如果确实需要更多的空间来存储，请使用本地存储。

    ·  title—firefox现在回忽略这个参数，虽然它可能将来会被使用上。而现在最安全的使用方式是传一个空字符串，以防止将来的修改。或者可以传一个简短的标题来表示state

    ·  URL—这个参数用来传递新的history实体的URL，注意浏览器将不会在调用pushState()方法后加载这个URL。但也许会过一会尝试加载这个URL。比如在用户重启了浏览器后，新的url可以不是绝对路径。如果是相对路径，那么它会相对于现有的url。新的url必须和现有的url同域，否则pushState()将抛出异常。这个参数是选填的，如果为空，则会被置为document当前的url。

    某种意义上来说，调用pushState()方法很像设置了window.location = “#foo”,这两者都会创建和激活另一个关联到当前document的history实体，但pushState()另外有一些优点：

    l 新的url可以是任何和当前url同域的url，相比之下，如果只设置hash，window.location会保持在同一个document。

    l 如果不需要，你可以不修改url。对比而言，设置window.location = “#foo”;仅产生新的history实体，如果你当前的hash不是#foo

    l 你可以将任意的数据与你的新history实体关联。使用基于hash的方法，需要将所有相关的数据编码为一个短字符串。

    注意，pushState()方法不会使hashchange时间发生，即使是新旧url只是hash不同。

    如浏览器地址为http://localhost:8080/tts6/user/teachertts6?pMUploadHomework=success 改变为http://localhost:8080/tts6/user/teachertts6   不用请求后台，直接改变url地址，怎么办了？很简单一句话
    //window.location为http://localhost:8080/tts6/user/teachertts6?pMUploadHomework=success

        var state = {title:'',url:window.location.href.split("?")[0]};

        history.pushState(state,'','teachertts6');

    //现在浏览器的地址变为http://localhost:8080/tts6/user/teachertts6
