参考网站[博客园--谢灿勇](http://www.cnblogs.com/st-leslie/p/5617130.html),[developer.mozilla](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/sessionStorage)
localStorage只支持string类型的存储,
```javascript
// 保存数据到localStorage
window.localStorage.setItem('key', 'value');

// 从localStorage获取数据
var data = window.localStorage.getItem('key');

// 从localStorage删除保存的数据
window.localStorage.removeItem('key');

// 从localStorage删除所有保存的数据
window.localStorage.clear();

// 保存数据到sessionStorage
window.sessionStorage.setItem('key', 'value');

// 从sessionStorage获取数据
var data = window.sessionStorage.getItem('key');

// 从sessionStorage删除保存的数据
window.sessionStorage.removeItem('key');

// 从sessionStorage删除所有保存的数据
window.sessionStorage.clear();
```
localStorage使用的例子
```javascript
var storage=window.localStorage;
            var data={
                name:'xiecanyong',
                sex:'man',
                hobby:'program'
            };
            var d=JSON.stringify(data);
            storage.setItem("data",d);
            //将JSON字符串转换成为JSON对象输出
            var json=storage.getItem("data");
            var jsonObj=JSON.parse(json);
            console.log(typeof jsonObj);
```
sessionStorage使用的例子
```javascript
// 获取文本输入框
var field = document.getElementById("field");
 
// 检测是否存在 autosave 键值
// (这个会在页面偶然被刷新的情况下存在)
if (window.sessionStorage.getItem("autosave")) {
  // 恢复文本输入框的内容
  field.value = window.sessionStorage.getItem("autosave");
}
 
// 监听文本输入框的 change 事件
field.addEventListener("change", function() {
  // 保存结果到 sessionStorage 对象中
  window.sessionStorage.setItem("autosave", field.value);
});
```
目前pc浏览器支持状态
<table class="compat-table">
 <tbody>
  <tr>
   <th>Feature</th>
   <th>Chrome</th>
   <th>Firefox (Gecko)</th>
   <th>Internet Explorer</th>
   <th>Opera</th>
   <th>Safari (WebKit)</th>
  </tr>
  <tr>
   <td>localStorage</td>
   <td>4</td>
   <td>3.5</td>
   <td>8</td>
   <td>10.50</td>
   <td>4</td>
  </tr>
  <tr>
   <td>sessionStorage</td>
   <td>5</td>
   <td>2</td>
   <td>8</td>
   <td>10.50</td>
   <td>4</td>
  </tr>
 </tbody>
</table>
目前手机浏览器支持状况
<table class="compat-table">
 <tbody>
  <tr>
   <th>Feature</th>
   <th>Android</th>
   <th>Firefox Mobile (Gecko)</th>
   <th>IE Phone</th>
   <th>Opera Mobile</th>
   <th>Safari Mobile</th>
  </tr>
  <tr>
   <td>Basic support</td>
   <td>2.1</td>
   <td><span style="color: rgb(255, 153, 0);" title="Compatibility unknown; please update this.">?</span></td>
   <td>8</td>
   <td>11</td>
   <td>iOS 3.2</td>
  </tr>
 </tbody>
</table>