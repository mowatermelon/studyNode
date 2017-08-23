> 前期概要，项目中需要使用到点击左侧目录树，右侧文档跳转到对应的锚点地点，所以使用了bootstrap的affix，结果点开了一堆bug，主要是太粗心，所以写一篇文章记录一些基础使用情况

- # 1 默认情况

> 自定义样式

```css
/* Custom Styles */
ul.nav-pills.affix{
    top: 30px; /* 在页面滚动的时候会给添加了affix-top的样式修改为affix,修改左侧目录树距离顶端的距离，这个和js中写偏移一样的效果 */
}
p.h4
{
    line-height:2;
    /*text-indent:2em;*/
}
```
> 默认的html,注意要引用jquery.js和bootstrap.js

```html
<body data-spy="scroll" data-target="#myScrollspy">
<div class="container">
        <div class="col-xs-3" id="myScrollspy">
          <ul class='nav nav-pills nav-stacked affix-top' id='scrollUL' data-spy="affix" data-offset-top="125">
                <li class="active"><a href="#section-1">第一部分</a></li>
                <li><a href="#section-2">第二部分</a></li>
                <li><a href="#section-3">第三部分</a></li>
            </ul>
        </div>
        <div class="col-xs-9"  id='scrollDiv'>
            <h2 id="section-1">第一部分</h2>
            <p class='h4'>partpartpartpartpartpartpartpartpartpart</p>
            <h2 id="section-2">第一部分</h2>
            <p class='h4'>partpartpartpartpartpartpartpartpartpart</p>
            <h2 id="section-3">第一部分</h2>
            <p class='h4'>partpartpartpartpartpartpartpartpartpart</p>
        </div>
   </div>
</body>
```

- # 2 触发bug

##### 左侧盒子的id`myScrollspy`，左侧盒子ul的id`scrollUL`，右侧盒子的id`scrollDiv`


   > - bug 1) 我觉得默认的左侧目录树样式有些丑，希望bootstrap提供其他选择

  bug原因:提供的nav-tabs,需要修改的太多，这边发现了nav-pills，需要修改的地方很少，提供的样式也还好。其实这个也不算bug，懒惰如我。

  > - bug 2) 我发现我点击左侧目录树，右侧文本毫无反应，甚至还对我笑了笑，摊手.jpg

  bug原因:我没有放body控制，没有绑定左侧目录树ul中的相对定位地址，这边触发一直不成功，应该为`<body data-spy="scroll" data-target="#myScrollspy">`。注意这个绑定的id是左侧目录盒子的id不是其他的。

  > - bug 3) 我发现页面滚动的时候，右侧的文本就漂浮到页面最左侧了，右侧页面滚动的时候对应的左侧的li也不对，更换了在线资源之后也是这样，当时我觉得左右两侧的盒子都在笑我。

  bug原因:我在`body`中绑定的是左侧盒子的id，但是在js中我需要绑定的是左侧盒子中ul的id，我需要但是左侧盒子中的ul在页面滚动的时候，一般来说js的优先级高于css的执行情况，所以这边页面就只管js，导致页面效果出现问题，放上正确的js。

  ```javascript
  $('#scrollUL').affix({
     offset: {
  	  top: 100/*修改左侧目录树距离顶端的距离，这个和css中写偏移一样的效果 */
  	  }
  })
    ```

- # 3 暂停总结
    使用`affix`，在当前界面进行锚点跳转还是比较好用的，横向列表进行锚点链接就是用默认的`nav`,如果想用纵向的锚点跳转，就添加`nav-stacked`,这在页面使用的时候其实是比较常用的功能，而且`nav`在移动端会自动折叠成一个目录图标，这个默认媒体查询比较友好，在使用bootstrap的时候，用过很多插件，这边总感觉bootstrap只有样式，其实是了解比较少，希望之后用到更多，还有我最近越来越发现很多时候先检查基础问题，再看代码问题，很多都是细节没有注意好，导致bug出现。  
