'use strict'

window.onload = function () {
  loadNecessaryScript();
}

/**
 * 加载默认需要的js文件
 */
function loadNecessaryScript() {
  const helperUrl = '../../plugins/';
  const utilUrl = '../../js/util/';
  const commonUrl = '../../js/page/iform/';

  const helperArr = getHelpList();
  const utilArr = getUtilList();
  const commonArr = getCommonList();

  let loadTime = 0;

  //加载第三方插件
  helperArr.forEach(function (val, index) {
    let tempTime = 500;
    if (index === 0) {
      tempTime = 0;
    }
    loadTime = setTimeout(function () {
      loadScript(helperUrl + val);
    }, tempTime);
  });
  //加载第三方工具包插件
  utilArr.forEach(function (val, index) {
    let tempTime = 500;
    if (index === 0) {
      tempTime = 0;
    }
    loadTime = setTimeout(function () {
      loadScript(utilUrl + val);
    }, tempTime);
  });
  //加载自定义js
  commonArr.forEach(function (val, index, arr) {
    let tempTime = 50;
    if (index === arr.length - 1) {
      tempTime = 500;
    }
    loadTime = setTimeout(function () {
      loadScript(commonUrl + val);
    }, tempTime);
  });

  //判断自定义的js是否都加载完成了
  if (!isIE()) {
    new Promise(function (resolve, reject) {
      loadTime = setTimeout(function () {
        resolve(init);
      }, 1000);
    }).then(function (_callback) {
      loadTime = 0;
      _callback();
    }).catch(function (err) {
      console.error(err);
    });
  } else {
    loadTime = setTimeout(function () {
      loadTime = 0;
      init();
    }, 1000);
  }
}

/**
 * 动态加载相关js文件
 */
function loadScript(url) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;
  document.body.appendChild(script);
}

/**
 * 判断当前浏览器是否是ie
 */
function isIE() {
  return ("ActiveXObject" in window);
}

/**
 * 获取第三方js列表
 * @returns 第三方的插件地址数组
 */
function getHelpList() {
  let helperArr = [];
  // 加载jquery相关的第三方插件地址
  helperArr = helperArr.concat('jQuery/jquery-ui.min.js', 'jQuery/jquery.html-clean.min.js');
  // 加载bootstrap相关的第三方插件地址
  // helperArr = helperArr.concat('bootstrap/js/popper.min.js', 'bootstrap/js/bootstrap.min.js');
  // 加载layui相关的第三方插件地址
  helperArr = helperArr.concat('layui/layui.all.js');
  // // 加载zTree相关的第三方插件地址
  // helperArr = helperArr.concat('zTree/js/jquery.ztree.core.js','zTree/js/jquery.ztree.exhide.js','zTree/js/jquery.ztree.exedit.js');
  // 加载My97DatePicker相关的第三方插件地址
  helperArr = helperArr.concat('My97DatePicker/WdatePicker.js');

  // 加载bootstrapTable相关的第三方插件地址
  // helperArr = helperArr.concat('bootstrapTable/bootstrap-table.js', 'bootstrapTable/bootstrap-table-min-zh_CN.js');
  // 加载弹窗相关的第三方插件地址
  // helperArr = helperArr.concat('bootstrap/js/modal.js');
  // helperArr = helperArr.concat('layui/modal.js');

  // 加载请求相关的第三方插件地址
  helperArr = helperArr.concat('axios/axios.min.js');
  return helperArr;
}

/**
 * 获取自定义js列表
 * @returns 自定义的插件地址数组
 */
function getCommonList() {
  let commonArr = []
  // 加载自定义工具地址
  commonArr = commonArr.concat('util.js');
  // 加载整体布局自定义工具地址
  commonArr = commonArr.concat('iLayout.js');
  // 加载左侧自定义工具地址
  commonArr = commonArr.concat('formPage.js');
  // 加载右侧自定义工具地址
  commonArr = commonArr.concat('iDataSrc.js', 'iDataSet.js', 'iDataBind.js', 'iControl.js', 'iForm.js', 'iDrag.js');
  // 加载自定义的启动地址
  commonArr = commonArr.concat('initDesinger.js');
  return commonArr;
}


/**
 * 获取自定义js列表
 * @returns 自定义的插件地址数组
 */
function getUtilList() {
  let utilArr = []
  // 加载自定义工具地址
  utilArr = utilArr.concat('common.js');
  // 加载整体布局自定义工具地址
  utilArr = utilArr.concat('formHelper.js', 'modalHelper.js');
  // 加载整体请求自定义工具地址
  utilArr = utilArr.concat('ajax.js');
  return utilArr;
}