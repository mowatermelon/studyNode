>今天项目需求，我在项目中使用backspace可以在input中进行删除事件，但是不能让backspace触发回退历史上一级的事件

1 最开始我是准备直接监听backspace的keydown事件，直接禁用的，后期才发现，页面上有input是需要执行删除事件的这个也是需要判断的，这个时候是不能进行屏蔽的`event.returnValue = true`，后期才发现如果想禁用回退，也需要禁用`alt+<-`,还有`alt+->`这边直接整合了一个版本，避免以后再次使用搜索。

2 jq中`event.which`返回: `Number`
描述: 针对键盘和鼠标事件，这个属性能确定你到底按的是哪个键。

`event.which` 将 `event.keyCode` 和 `event.charCode` 标准化了。推荐用 `event.which` 来监视键盘输入。更多细节请参阅： [`event.charCode on the MDC`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/charCode#Notes).

`event.which`也将正常化的按钮按下(`mousedown` 和 `mouseupevents`)，左键报告`1`，中间键报告`2`，右键报告`3`。使用`event.which`代替`event.button`。所以代码中的没有出现`event.keyCode`

3 万恶的ie，我这边主要在页面主框架页面调用了`checkBack()`,以为就好了，界面在页面中的`iframe`中还是会触发回退事件，结果我在第二级子页面框架中也调用了`checkBack()`，这边效果才好，在谷歌中其他按钮事件好像就禁用了，但是在`ie`中还是有部分问题，第一次认识到`iframe`其实内部回退机制和在主框架中的回退机制不同，这边之前只把它当作普通标签对，真的对不起他啊.还有在div中其实也可触发回退事件，我感觉我的真的是太乐观了。

4 上完整代码：
```javascript
//页面上进行调用
$("body,iframe").bind("keydown", function (e) {
    <%
    Response.Buffer=true;                 //在asp中可以这个样子设置清除缓存
    Response.CacheControl="no-cache";    //'禁止代理服务器缓存本页面
    Response.Expires=-1000;                        //'让页面立即过期(这儿最好设置一个绝对值较大的负数)
    %>
    checkBack();
});
//监听backspace的操作对象
function checkBack(){
        // 兼容FF和IE和Opera    
        var Event = event || window.event;    
        //获取事件对象    
        var elem = Event.relatedTarget || Event.srcElement || Event.target || Event.currentTarget;
        //console.log("Event.which" + Event.which);
        if (Event.which == 8) {//判断按键为backSpace键    

                //获取按键按下时光标做指向的element    
                var elem = Event.srcElement || Event.currentTarget;     

                //判断是否需要阻止按下键盘的事件默认传递    
                var name = elem.nodeName;    

                if(name!='INPUT' && name!='TEXTAREA'){
                    return _stopIt(Event);    
                }    
                var type_e = elem.type.toUpperCase();    
                if(name=='INPUT' && (type_e!='TEXT' && type_e!='TEXTAREA' && type_e!='PASSWORD' && type_e!='FILE')){
                    return _stopIt(Event);    
                }    
                if(name=='INPUT' && (elem.readOnly==true || elem.disabled ==true)){
                    return _stopIt(Event);    
                }
                }
        $(window).bind("help",function(){
             return false      //屏蔽F1帮助  
         });
         $(document).bind("contextmenu", function () {
              event.returnValue = false; //屏蔽鼠标右键
         });
         onkeydown(Event);

}    

//判断是否需要阻断backspace的事件
function _stopIt(e){    
        if(e.returnValue){    
            e.returnValue = false ;    
        }    
        if(e.preventDefault ){    
            e.preventDefault();    
        }                   

        return false;
}

//监听其他按键的事件执行状态
function onkeydown(event) {
    //console.log("event.which" + event.which);
    if ((event.altKey) &&((event.which == 37) || //屏蔽Alt+方向键←    

	(event.which == 39))) { //屏蔽Alt+方向键→

        //console.log("不准你使用ALT+方向键前进或后退网页！");

        event.returnValue = false;

    }
    if ((event.which == 116) || //屏蔽F5刷新键    

	(event.ctrlKey && event.which == 82)) { //Ctrl+R    

        event.which = 0;

        event.returnValue = false;

    }

    if (event.which == 122) {
        event.which = 0;
        event.returnValue = false;
    } //屏蔽F11    

    if (event.ctrlKey && event.which == 78) event.returnValue = false; //屏蔽Ctrl+n    

    if (event.shiftKey && event.which == 121) event.returnValue = false; //屏蔽shift+F10    

    if (event.srcElement.tagName == "A" && event.shiftKey)

        event.returnValue = false; //屏蔽shift加鼠标左键新开一网页    

    if ((event.altKey) && (event.which == 115)) { //屏蔽Alt+F4     

        showModelessDialog("about:blank", "", "dialogWidth:1px;dialogheight:1px");

        return false;

    }

}    
```

  ___  

5 后续更新

我最初在需要禁用的主页面框架中添加的是如下代码
```javascript
//版本一
$("document,iframe").bind("keydown", function (e) {
    <%
    Response.Buffer=true;
    Response.CacheControl="no-cache";    //'禁止代理服务器缓存本页面
    Response.Expires=-1000;                        //'让页面立即过期(这儿最好设置一个绝对值较大的负数)
    %>
    checkBack();
});
//版本二
window.onload =function (){
  document.getElementsByTagName("body")[0].onkeydown = checkBack;
}
//版本三
window.onload =function (){
  document.getElementsByTagName("body")[0].onkeydown = function(){
      checkBack();
  }
}
//版本四
$(function(){
  //禁止后退键 作用于Firefox、Opera
  document.getElementsByTagName("body")[0].onkeypress = checkBack;
  //禁止后退键  作用于IE、Chrome
  document.getElementsByTagName("body")[0].onkeydown = checkBack;  
})
//控制流程相关核心代码
url = url + "?XXXX=" + XXXX +'&new=' + Math.random();
$("#XXX").attr("src", url);
//控制流程代码方式切换尝试
//XXX.location.repalce(url + '?new=' + Math.random());
//alert(XXX.Src);
//XXX.location.repalce=url + '?new=' + Math.random();
//XXX.location.href=url + '?new=' + Math.random();
```
然后在谷歌中页面大部分都好了，流程中的iframe也不会乱跳,但是在ie中就是不听话咯，所以我想了一个比较笨的方法，每个页面都添加了`checkBack()`,结果在ie9中点击iframe空白处还是会触发`iframe`回退,这边我尝试修改页面跳转方式，这边还是有些问题，不过在我本机的ie11中点击流程的`iframe`空白处,暂时没有触发回退事件，这边希望之后找到更好的解决办法，再来更新一波。
