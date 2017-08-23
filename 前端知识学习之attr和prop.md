> 背景提示，项目中需要动态绑定checkbox的选中状态，同事通过attr方法进行赋值的时候，效果一直不是他需要的，我查了一下资料，同事在使用了prop之后才得到了想要的效果，所以今天就总结一下这两者的区别，[参考文档](http://www.jb51.net/article/89038.htm)

### 介绍attr
`attr`是单词`attribute`的缩写，表示`属性`的意思。在jQuery中attribute表示HTML文档节点的属性。attr()函数的设计目标是用于设置或获取指定DOM元素所对应的文档节点上的属性(attribute)。
```
<!-- 这里的id、class、data_id均是该元素文档节点的attribute -->
<div id="message" class="test" data_id="123"></div>
```
### 介绍prop
`prop`是单词`property`的缩写，表示`属性`的意思。在jQuery中，property表示JS对象的属性。
prop()函数的设计目标是用于设置或获取指定DOM元素(指的是JS对象，Element类型)上的属性(property)；
```
<script type="text/javascript">
// 这里的name、age、url均是obj的property
var obj = { name: "CodePlayer", age: 18, url: "http://www.365mini.com/" };
</script>
```
### 介绍两者区别
* 在jQuery的底层实现中，函数attr()和prop()的功能都是通过JS原生的Element对象(如上述代码中的msg)实现的。attr()函数主要依赖的是Element对象的getAttribute()和setAttribute()两个方法。prop()函数主要依赖的则是JS中原生的对象属性获取和设置方式。

```
<div id="message" class="test" data_id="123"></div>
<script type="text/javascript">
var msg = document.getElementById("message");
var $msg = $(msg);

/* *** attr()依赖的是Element对象的element.getAttribute( attribute ) 和 element.setAttribute( attribute, value ) *** */


// 相当于 msg.setAttribute("data_id", 145);
$msg.attr("data_id", 145);

// 相当于 msg.getAttribute("data_id");
var dataId = $msg.attr("data_id"); // 145

/* *** prop()依赖的是JS原生的 element[property] 和 element[property] = value; *** */

// 相当于 msg["pid"] = "pid值";
$msg.prop("pid", "pid值");

// 相当于 msg["pid"];
var testProp = $msg.prop("pid"); // pid值
</script>
```
* 虽然prop()针对的是DOM元素的property，而不是元素节点的attribute。不过DOM元素某些属性的更改也会影响到元素节点上对应的属性。例如，property的id对应attribute的id，property的className对应attribute的class。

```
<div id="message" class="test" data_id="123"></div>
<script type="text/javascript">
var msg = document.getElementById("message");
var $msg = $(msg);

document.writeln( $msg.attr("class") ); // test
$msg.prop("className", "newTest");
// 修改className(property)导致class(attitude)也随之更改
document.writeln( $msg.attr("class") ); // newTest
</script>
```

* 应用版本不同
attr()是jQuery 1.0版本就有的函数，prop()是jQuery 1.6版本新增的函数。毫无疑问，在1.6之前，你只能使用attr()函数；1.6及以后版本，你可以根据实际需要选择对应的函数。

* 用于设置的属性值类型不同
由于attr()函数操作的是文档节点的属性，因此设置的属性值只能是字符串类型，如果不是字符串类型，也会调用其toString()方法，将其转为字符串类型。
prop()函数操作的是JS对象的属性，因此设置的属性值可以为包括数组和对象在内的任意类型。

* 其他细节问题
在jQuery 1.6之前，只有attr()函数可用，该函数不仅承担了attribute的设置和获取工作，还同时承担了property的设置和获取工作。例如：在jQuery 1.6之前，attr()也可以设置或获取tagName、className、nodeName、nodeType等DOM元素的property。

直到jQuery 1.6新增prop()函数，并用来承担property的设置或获取工作之后，attr()才只用来负责attribute的设置和获取工作。

此外，对于表单元素的`checked`、`selected`、`disabled`等属性，在jQuery 1.6之前，attr()获取这些属性的返回值为Boolean类型：如果被选中(或禁用)就返回`true`，否则返回`false`。
但是从1.6开始，使用attr()获取这些属性的返回值为String类型，如果被选中(或禁用)就返回`checked`、`selected`、`disabled`，否则(即元素节点没有该属性)返回`undefined`。并且，在某些版本中，这些属性值表示文档加载时的初始状态值，即使之后更改了这些元素的选中(或禁用)状态，对应的属性值也不会发生改变。

因为jQuery认为：attribute的`checked`、`selected`、`disabled`就是表示该属性初始状态的值，property的`checked`、`selected`、`disabled`才表示该属性实时状态的值(值为true或false)。
因此，在jQuery 1.6及以后版本中，请使用prop()函数来设置或获取`checked`、`selected`、`disabled`等属性。对于其它能够用prop()实现的操作，也尽量使用prop()函数。
