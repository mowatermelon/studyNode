
- 1 按钮和input在谷歌中会有一个默认蓝色边框，由于我用的是bootstrap，所以我这边直接就btn的总样式改了，还有加了input的选中样式修改。
```css
input,.btn{
  outline:0 none;
}
.btn:focus,
.btn:active:focus,
.btn.active:focus,
.btn.focus,
.btn:active.focus,
.btn.active.focus {
  outline:0 none;
}
input:hover,
input:focus,
input:active{
  outline:0 none;
}
```

- 2 自动填充的文本框默认有个黄色背景
由于chrome浏览器默认的给自动填充的文本框添加了背景样式属性
```css

/*谷歌默认样式*/
input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
    background-color: rgb(250, 255, 189);
    background-image: none;
    color: rgb(0, 0, 0);
}
/*修改版本一 没有用*/
input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
    background-color: transparent !important;
    background-image: none;
    color: var(--c);//用了一个css变量
}
/*最终建议修改样式*/
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px white inset;
}
```
