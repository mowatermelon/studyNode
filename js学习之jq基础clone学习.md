> 前情概要，项目中需要用到新增现有盒子和删除对应index盒子的需求，这边我之前做过这种类似的用的是自己手动拼接新增的字符串，感觉太浪费时间，所以这次想用到JQ中的clone，减少代码冗余

- # 1 点满bug

> - bug 1) 我使用class比较习惯，所以想通过class选择器，进行clone之后，再在进行重新绑定id之类的，结果发现，我点击一次，新增一个盒子，点击第二次，新增两个盒子，点击第三次，新增三个盒子，完全是群魔乱舞。

放上错误代码
```html
<!--html代码-->
<div id="main" class="row">                  
      <div class="panel">
          <div class="panel-info userPanel"></div>
          <button class="btn btn-block btn-link text-center text-info" id="addUser">+新增</button>
      </div>

  </div>
```

```javascript
//javascript代码
$("#addUser").click(function () {
    $('.userPanel').append($('.userPanel').clone());
})
```
bug原因:通过class获取没有唯一性，本意是再新增一行，但是由于class选择器做的是完全匹配，所以每一个对应的class之后都新增了一个盒子，修改为通过id获取clone对象，还有通过id获取需要添加盒子的对象。
<br/><br/>
> - bug 2) 修改为id获取之后我这边事件绑定又出现了问题，因为我是直接克隆的，没有修改id，导致这边id绑定有一定问题，出现了和上个bug一样的问题。

bug原因:绑定事件没有唯一性，所以我这边修改了页面标签结构，并同时修改了clone之后的对应id。

放上修改结构之后的代码
```html
<!--html代码-->
<div id="main" class="row">                  
      <div class="panel">
          <div class="panel-info userPanel" id="userPanel_01"></div>
          <div class="userNull"></div>
      </div>
          <button class="btn btn-block btn-link text-center text-info" id="addUser">+新增</button>
  </div>
```

```javascript
var countU=2;//第一个userPanel是不能删除的，所以之后添加的面板序号默认是从第二个开始的，注意定义在$(function(){})之外，因为之后外部的funciton需要调用到这个全局变量。
//javascript代码
$("#addUser").click(function () {
  $('#userPanel_01').clone(true)
    var _clonePanel = $('#userPanel_01').clone(true);
    _clonePanel.attr('id', 'userPanel_0' + countU);
    _clonePanel.find('.panel-title').html('信息(' + countU + ')');
    _clonePanel.find('.deleteBtn').attr('onclick', "deleteUser(userPanel_0" + countU + ")").removeClass("hide").addClass("show") ;//通过attr绑定事件，不要通过prop绑定事件，$('.userNull')克隆到了之后，赶紧把`.deleteBtn`的hide样式移除掉
    _clonePanel.appendTo('.userNull');
    ++countU;//在克隆了之后，赶紧将序号自增一下
})
function deleteUser(index) {
  $('.userNull').children('.userPanel').eq(index-2).remove();
})
```
<br/><br/>
> - bug 3) 我现在需要绑定删除事件，我前期思路是传对应的Index索引过去，然后在`.userNull`中找对应的索引进行移除操作，结果发现如果我不按照顺序删除，这边通过索引是找不到对应的子盒子的，比如我新增了三个子盒子，我在第二个子盒子点击了删除，我在第三个子盒子中点击删除，就没有用了。

bug原因:因为此时`.userNull`只有两个子盒子，这个时候再找它的第三个子盒子，那就真的是尬找，找不到的，捂脸.jpg。


放上修改结构之后的代码，html没有修改结构

```javascript
$("#addUser").click(function () {
  $('#userPanel_01').clone(true)
    ···
    _clonePanel.find('.deleteBtn').attr('onclick',"deleteUser(userPanel_0" + countU+")");//修改的地方
    ···
})
function deleteUser(id) {
  $('.userNull').find(id).remove();
  --countU;//在删除了之后，赶紧将序号自减一下
})
```
<br/><br/>
> - bug 4) 我的页面新增三个子盒子，我把页面上的第二个删除之后，页面上显示的是'信息(01)'，'信息(02)'，'信息(04)'，这样肯定不合理，而且我的删除肯定是需要有个确认行为的，万一我误碰了怎么办，我也很无辜啊。

bug原因:正常逻辑这边应该在删除之后重新刷一遍页面已有的盒子id，我没有管她们，她们这些盒子也很绝望啊，不能怪她们。

放上修改结构之后的代码，html没有修改结构

```javascript
//javascript代码 只修改了deleteUser方法
function deleteUser(id) {
  $("#bsznModal").showmodal({//这个是我自己基于bootstrap modal写的一个模态窗插件，支持自定义很多内容。
      flag: "info",
      title: "警告",    //设置模态窗标题
      content: "确认删除这条记录吗？",
      Qclose: true,
      fontSize: "18"
  });
  $("#close").click(function () {//点击确认按钮之后，才执行删除操作
      $('.userNull').find(id).remove();
      /*
      *遍历$(".userNull").children(".userPanel")
      *注意each (function (index, data){})结构，这个不是each(index, data){}
      *each 有两个参数，第一个是该子盒子的当前索引，第二个是她的内容
      *这边each默认索引是从0开始的，所以index需要在自身的索引增加2
      */
      $(".userNull").children(".userPanel").each(function (index, data) {
          var _this = $(this);
          index = index + 2;//索引增加2
          _this.attr('id', 'userPanel_0' + index);//
          _this.find('.panel-title').html('信息(' + index + ')');
          _this.find('.deleteBtn').attr('onclick', "deleteUser(userPanel_0" + index + ")");
      })
      --countU;//注意这个时候索引自减实在点击了确认之后才进行，如果没有点击确认，不管不顾的之后在deleteUser()之后执行自减，这个会有问题哒。
    })
}
```
<br/><br/>
- # 2 触发技能
  - 1 clone盒子成功拉 `clone()`
  - 2 clone并修改内容成功拉 `clone(true)`
  - 3 动态新增数据成功拉 `appendTo()`
  - 4 动态修改btn单击事件成功拉 `attr('onclick',"···")`
  - 5 使用each进行遍历成功拉 `each (function (index, data){})`
  - 6 删除对应索引盒子成功拉 `remove()`
<br/><br/>
- # 3 整理思路
    最近学习vue的使用，对于jquery的好感其实降到很低了，今天做这个功能其实比较小，整个做下来也感觉还算顺畅。就我目前学习的vue进度，这些如果在vue中做的话，其实也是比较麻烦的事情，数据驱动模式在dom动态新增上面只能通过字符串进行拼接，这边没有clone来的方便，而且在删除之后动态刷页面上的id内容，通过原生js比较繁琐，不过这边真的是需要注意细节，很多小细节，不要太粗心，不要浪费太多时间去回忆忘记的知识点，很多知识点忘记了之后，自己一个人尬想解决不了问题，还不如直接搜一下，也不是大事。
<br/><br/>
- # 4 放上完整代码
```html
<!--html代码-->
<div id="main" class="row">                  
      <div class="panel">
          <div class="panel-info userPanel" id="userPanel_01">
              <div class="panel-heading">
              <span class="panel-title">信息(1)</span>
                  <button class="pull-right deleteBtn hide btn btn-link">删除</button>
            </div>
            <div class="panel-body">
              <div class="container form-horizontal" id="userdiv">
                <div class="form-group">
                  <label for="txtMC" class="col-xs-3 control-label">姓名：</label>
                  <div class="col-xs-9">
                    <input type="text" class="form-control" id="txtMC"   />
                  </div>
                </div>
              </div>
          </div>
          <div class="userNull"></div>
      </div>
      <button class="btn btn-block btn-link text-center text-info" id="addUser">+新增</button>
  </div>
```

```javascript
  //javascript代码
  var countU = 2;
  $("#addUser").click(function () {
      var _clonePanel = $('#userPanel_01').clone(true);
      _clonePanel.attr('id', 'userPanel_0' + countU);
      _clonePanel.find('.panel-title').html('信息(' + countU + ')');
      _clonePanel.find('.deleteBtn').attr('onclick', "deleteUser(userPanel_0" + countU + ")").removeClass("hide").addClass("show") ;
      _clonePanel.appendTo('.userNull');
      ++countU;
  })

  function deleteUser(id) {
      $("#bsznModal").showmodal({
          flag: "info",
          title: "警告",    //设置模态窗标题
          content: "确认删除这条记录吗？",
          Qclose: true,
          fontSize: "18"

      });
      $("#close").click(function () {
          $('.userNull').find(id).remove();
          $(".userNull").children(".userPanel").each(function (index, data) {
              var _this = $(this);
              index = index + 2;
              _this.attr('id', 'userPanel_0' + index);
              _this.find('.panel-title').html('信息(' + index + ')');
              _this.find('.deleteBtn').attr('onclick', "deleteUser(userPanel_0" + index + ")");
          })
          --countU;
      })

  }
```
