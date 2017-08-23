### 因为页面整体风格需要，所以需要使用到bootstrap的table Editable插件
## 1 引入对应的js和css
```
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="author" content="watermelon,why" />
  <meta name="Description" content="MSHK" />
  <meta name="Keywords" content="MSHK,公司,demo" />
  <title>Document</title>
  <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
  <link href="css/bootstrap-editable.css" rel="stylesheet" type="text/css" />
</head>
<body>
  <script src="js/jquery-2.1.1.min.js" type="text/javascript"></script>
  <script src="js/bootstrap.min.js" type="text/javascript"></script>
  <script src="js/bootstrap-editable.js" type="text/javascript"></script>
</body>
</html>


```

## 2 基础测试
> 带参数功能测试

```
  <a href="#" id="username" data-type="text" data-title="用户名">用户名</a>
  <script type="text/javascript">
  $(function(){
     $('#username').editable();
  })
```

> 不带参数功能测试

```
  <a href="#" id="status"></a>
  $('#username').editable({
              type: "text",                //编辑框的类型。支持text|textarea|select|date|checklist等
              title: "用户名",              //编辑框的标题
              disabled: false,             //是否禁用编辑
              emptytext: "空文本",          //空值的默认文本
              mode: "inline",              //编辑框的模式：支持popup和inline两种模式，默认是popup
              validate: function (value) { //字段验证
                  if (!$.trim(value)) {
                      return '不能为空';
                  }
              }
          });  
</script>
```

两者测试结果是都是可行的

_注意需要按照实际项目图片安放地址，修改table Editable css中clear和loading地址_

## 3 测试table编辑功能
> 引入对应的js和css

```
<link href="css/bootstrap.min.css" rel="stylesheet" />
<link href="css/bootstrap-editable.css" rel="stylesheet" />
<link href="bootstrap-table.css" rel="stylesheet" />

<script src="js/jquery-2.1.1.min.js" type="text/javascript"></script>
<script src="js/bootstrap.min.js" type="text/javascript"></script>
<script src="js/bootstrap-table.js"></script>
<script src="js/bootstrap-table-zh-CN.js"></script>
<script src="js/bootstrap-editable.js" type="text/javascript"></script>
```

> 简单测试

```
<div class="container">
  <table class="table">
    <caption>基本的表格布局</caption>
    <thead>
      <tr>
        <th>表名</th>
        <th>列名</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Username:</td>
        <td><a href="#" id="username" data-type="text" data-placement="right" data-title="Enter username">superuser</a></td>
      </tr>
      <tr>
        <td>Status:</td>
        <td><a href="#" id="status"></a></td>
      </tr>
    </tbody>
  </table>
</div>
        //toggle `popup` / `inline` mode
      $.fn.editable.defaults.mode = 'inline';

      //make username editable 文本
      $('#username').editable();

      //make status editable 下拉框
      $('#status').editable({
          type: 'select',
          title: 'Select status',
          placement: 'right',
          value: 2,
          source: [
              {value: 1, text: 'status 1'},
              {value: 2, text: 'status 2'},
              {value: 3, text: 'status 3'}
          ]
      });
```

## 4 多数据测试效果

> 在编辑完成提交之后，如果提交之后的文本内容过多，表格的thead里面th的宽度和tbody里面td的宽度不对齐，下次再结合bootstrap table一起测试

```
$("#table").bootstrapTable("resetView");
```
## 5 后续改进
> 之前在使用了Editable之后，我这边项目提出新需求这边需要现在新增需求是，当修改的input失去焦点的时候，当前值依旧会触发保存事件，现有的是没有选中编辑框中的对钩，是不会触发保存事件的，之前同事以为是bootstrap的Editable，所以参考那个的api，查看相关属性Option其中有shown和hidden事件是我们需要监控的，但是一直断点没能成功进入，我当时看着也觉得不可思议，后来在自己的工位上看api的时候，才发现同事看的api有问题，应该是看x-editable的api，应该修改的是`savenochange`和`onblur`，两者都是String属性，默认的是`false`和`submit`，

### 默认情况
```
onblur (since 1.1.1) string	'cancel'
savenochange (since 1.2.0 ) boolean	false
```
### 修改之后
```
onblur：submit
savenochange:true
```
