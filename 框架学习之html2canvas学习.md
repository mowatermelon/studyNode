> 最近微信项目中，希望能够把流程的最后一步以图片形式保存下来，我之前想触发手机的截屏键，然后在流程的最后一步点击保存按钮，直接可以把最后一步的界面截图保存下来

- 一 什么是`html2canvas`
  - 1 作用
  `html2canvas`可以通过纯JS对浏览器端经行截屏，但截图的精确度还有待提高，部分css不可识别，所以在canvas中不能完美呈现原画面样式
  ---
  - 2 支持的浏览器
  ```
    Firefox 3.5+
    Google Chrome
    Opera 12+
    IE9+
    Safari 6+
```
  ---
  - 3  基本语法
  ```javascript
  //两个参数：所需要截图的元素id，截图后要执行的函数， canvas为截图后返回的最后一个canvas
 html2canvas(document.getElementById('id'))
            .then(function(canvas) {
                document.body.appendChild(canvas);
                }
);
```
  ---
  - 4  可用参数
  <table>
<thead>
<tr>
	<th>
		参数名称
	</th>
	<th>
		类型
	</th>
	<th>
		默认值
	</th>
	<th>
		描述
	</th>
</tr>
</thead>
<tbody>
<tr>
	<td>
		allowTaint
	</td>
	<td>
		boolean
	</td>
	<td>
		false
	</td>
	<td>
		Whether to allow cross-origin images to taint the canvas---允许跨域
	</td>
</tr>
<tr>
	<td>
		background
	</td>
	<td>
		string
	</td>
	<td>
		#fff
	</td>
	<td>
		Canvas background color, if none is specified in DOM. Set undefined for transparent---canvas的背景颜色，如果没有设定默认透明
	</td>
</tr>
<tr>
	<td>
		height
	</td>
	<td>
		number
	</td>
	<td>
		null
	</td>
	<td>
		Define the heigt of the canvas in pixels. If null, renders with full height of the window.---canvas高度设定
	</td>
</tr>
<tr>
	<td>
		letterRendering
	</td>
	<td>
		boolean
	</td>
	<td>
		false
	</td>
	<td>
		Whether to render each letter seperately. Necessary if letter-spacing is used.---在设置了字间距的时候有用
	</td>
</tr>
<tr>
	<td>
		logging
	</td>
	<td>
		boolean
	</td>
	<td>
		false
	</td>
	<td>
		Whether to log events in the console.---在console.log()中输出信息
	</td>
</tr>
<tr>
	<td>
		proxy
	</td>
	<td>
		string
	</td>
	<td>
		undefined
	</td>
	<td>
		Url to the proxy which is to be used for loading cross-origin images. If left empty, cross-origin images won't be loaded.---代理地址
	</td>
</tr>
<tr>
	<td>
		taintTest
	</td>
	<td>
		boolean
	</td>
	<td>
		true
	</td>
	<td>
		Whether to test each image if it taints the canvas before drawing them---是否在渲染前测试图片
	</td>
</tr>
<tr>
	<td>
		timeout
	</td>
	<td>
		number
	</td>
	<td>
		0
	</td>
	<td>
		Timeout for loading images, in milliseconds. Setting it to 0 will result in no timeout.---图片加载延迟，默认延迟为0，单位毫秒
	</td>
</tr>
<tr>
	<td>
		width
	</td>
	<td>
		number
	</td>
	<td>
		null
	</td>
	<td>
		Define the width of the canvas in pixels. If null, renders with full width of the window.---canvas宽度
	</td>
</tr>
<tr>
	<td>
		useCORS
	</td>
	<td>
		boolean
	</td>
	<td>
		false
	</td>
	<td>
		Whether to attempt to load cross-origin images as CORS served, before reverting back to proxy--这个我也不知道是干嘛的
	</td>
</tr>
</tbody>
</table>

- 二 `html2canvas`结合图片保存
  - 1  PC端网页截图保存


  ```javascript
  var g_width=$("#restable").width()>bindHeight().width?bindHeight().width:$("#restable").width();

  //代码在多个浏览器中测试，图片只有在火狐和ie中才显示出来，ie触发下载事件机制不同，只有火狐中保存的图片包含网页中的图片其他浏览器都没有显示图片，文字都是正常被重绘了
  html2canvas(document.getElementById('restable'), {
      width:g_width,
      height:bindHeight().height*0.6,
      background: "#fff",//一定要设置啊，要不然背景色默认是透明色
      onrendered: function(canvas) {

        //document.getElementById('restable').appendChild(canvas);
        $("#showM").showmodal({
               flag: "info",  //设置弹出modal的状态 success:成功窗体,warning:警告窗体,info:信息窗体,default:默认无样式
               title: "截屏",    //设置模态窗标题
               content: "", //设置模态窗内容
               SWidth: g_width,
               AutoBtn:"截屏保存"
         });
         $("#showModal").on("shown.bs.modal",function(){
           $("#showModal .modal-dialog").css({"margin-top":"40px"});
           $(".modal-body").attr("id","m_body").css({"padding":"0px","overflow":"auto"});
           //在模态框加载的同时做一些动作
           document.getElementById('m_body').appendChild(canvas);
           $(".modal-body").children("canvas").css({"margin":"0px auto"});

        });

        $("#close").click(function(){

          dataURL =canvas.toDataURL("image/png");
          var imgName="PC页面截图_EVA";
          //下载图片
          //以下代码为下载此图片功能
           var triggerDownload = $("<a>").attr("href", dataURL).attr("download", imgName + ".png").appendTo("body");
           triggerDownload[0].click();

        })
      }


  });
  ```
  - 2  移动端网页截图保存

  ```javascript
  //移动端不支持直接保存base64图片，所以页面加载之后，直接将页面重绘成图片，移动端可以直接长按进行保存
  html2canvas(document.getElementById('main'), {
      background: "#fff",
      onrendered: function (canvas) {
          var imgName="移动端页面重绘_EVA";
          var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
          $(".res_table").html("<img src='" + image + "' alt='from canvas' name='" + imgName + "'/>");
          $("#showM").showmodal({
              content: "请长按图片进行保存结果告知单",
              SWidth: "200",
              fontSize:"14px"
          });
      }

  });
  ```
- 三 踩坑心得
之前demo中传的直接是body，我以为是直接传id或者class类，结果并不是，我还以为只能重绘body，后来才发现需要传入的是选择器选中之后的对象，可以自定义绘制的内容。
