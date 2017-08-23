> 微信项目迁移pc项目功能的时候，发现原有流程中的iframe滚动条没有出来，总结操作过程

- 1 前情概要

  `-webkit-overflow-scrolling` 属性控制元素在移动设备上是否使用滚动回弹效果：[参考](http://www.cnblogs.com/xcrh/p/6164622.html)
  ```css
  -webkit-overflow-scrolling: touch; /* 当手指从触摸屏上移开，会保持一段时间的滚动 */
  -webkit-overflow-scrolling: auto; /* 当手指从触摸屏上移开，滚动会立即停止 */
  ```

- 2 放上完整代码

  ```html
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>flowDemo</title>
    <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
  <style>
  .flow .flowListBox{

  }
  #flowDiv
  {
      -webkit-overflow-scrolling:touch;/*重要代码*/
      overflow:auto;/*重要代码*/
      width: 100%;
  }
  iframe#iList{
      width: 100%;/*重要代码*/
      height:100%;/*重要代码*/
      border:0 none #000;
      background-color:#fff;
      word-wrap: break-word;
  }
  button.flowBtn{width:41.666666%}
  button.flowBtn#btnTJ{float:right}
  button.flowBtn#btnBack{float:left}
  </style>
  </head>
  <body>
    <div class="main">
      <div class="row">

        <div class="col-xs-12" id="fList">
          <div class="flow">
  			    <div class="flowListBox">
                <h1>步骤条</h1>
  			    </div>
  		    </div>
        </div>
            <!--第一步/-->
    	    <div class="col-xs-12" id="flowDiv">
              <iframe id="iList" name="iframeSelf" src="demo.html">

              </iframe>
       </div>
      <div class="form-group col-sm-8 col-sm-offset-2">
          <button type="button" class="btn btn-primary flowBtn" id="btnBack">上一步</button>
    		<button type="button" class="btn btn-primary flowBtn" id="btnTJ">下一步</button>
      </div>
      </div>
    </div>
  </body>
  <script src="js/jquery-2.1.1.min.js" type="text/javascript"></script>
  <script src="js/bootstrap.min.js" type="text/javascript"></script>
  <script src="js/modal.js" type="text/javascript"></script>

  <script>
  $(function(){
    ReFlowHeight();
  })

  //页面重新加载的时候计算iframe高度
  $(window).resize(function () {
      ReFlowHeight();
  });
  //重新加载界面计算相关高度
  function ReFlowHeight() {
      var bodyH = document.documentElement.clientHeight - 150;
      $("#flowDiv").css({ "height": bodyH + "px" });
  }
  </script>
  </html>

  ```

- 3 错误总结

  我在很早就搜了这个代码，通过多层选择器给`iframe`的父级`div`添加了这个样式，结果一直没有效果，今天一看，样式根本就没有绑上去，所以这边还是通过唯一的id选择器，样式就绑上去了，然后这边`ios`看iframe就可以正常滚动了，但是还是有一丢丢不太友好就是在屏幕点击触发的时候，有的时候触发的是父级`body`的点击事件，可是父级`body`的`overflow`是`hidden`的，导致页面`iframe`滚动机制触发有点不太友好，所以估计后期可能会找看看还有没有其他解决机制优化一下效果。
