> Javascript:

  ```
  IE中：
  document.body.clientWidth ==> BODY对象宽度
  document.body.clientHeight ==> BODY对象高度
  document.documentElement.clientWidth ==> 可见区域宽度
  document.documentElement.clientHeight ==> 可见区域高度
  FireFox中：
  document.body.clientWidth ==> BODY对象宽度
  document.body.clientHeight ==> BODY对象高度
  document.documentElement.clientWidth ==> 可见区域宽度
  document.documentElement.clientHeight ==> 可见区域高度
  Opera中：
  document.body.clientWidth ==> 可见区域宽度
  document.body.clientHeight ==> 可见区域高度
  document.documentElement.clientWidth ==> 页面对象宽度（即BODY对象宽度加上Margin宽）
  document.documentElement.clientHeight ==> 页面对象高度（即BODY对象高度加上Margin高）
  ```

  ```
  通用：
  网页可见区域宽： document.body.clientWidth
  　　网页可见区域高： document.body.clientHeight
  　　网页可见区域宽： document.body.offsetWidth (包括边线的宽)
  　　网页可见区域高： document.body.offsetHeight (包括边线的高)
  　　网页正文全文宽： document.body.scrollWidth
  　　网页正文全文高： document.body.scrollHeight
  　　网页被卷去的高： document.body.scrollTop
  　　网页被卷去的左： document.body.scrollLeft
  　　网页正文部分上： window.screenTop
  　　网页正文部分左： window.screenLeft
  　　屏幕分辨率的高： window.screen.height
  　　屏幕分辨率的宽： window.screen.width
  　　屏幕可用工作区高度： window.screen.availHeight
  　　屏幕可用工作区宽度： window.screen.availWidth
  ```

  > JQ

    　　$(window).height() //浏览器当前窗口可视区域高度
    　　$(document).height() //浏览器当前窗口文档的高度
    　　$(document.body).height()/浏览器当前窗口文档body的高度
    　　$(document.body).outerHeight(true)//浏览器当前窗口文档body的总高度 包括border padding margin
    　　$(window).width()//浏览器当前窗口可视区域宽度
    　　$(document).width()//浏览器当前窗口文档对象宽度
    　　$(document.body).width()//浏览器当前窗口文档body的宽度
    　　$(document.body).outerWidth(true)//浏览器当前窗口文档body的总宽度 包括border padding margin
    　　})
