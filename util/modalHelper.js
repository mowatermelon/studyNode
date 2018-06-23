"use strict"

/**
 * 页面错误弹窗提示
 * @param {String} msg 需要进行提示的信息
 * @param {Number} modalIndex 弹窗的索引值
 * @param {Boolean} isCloseAll 是否关闭所有的弹窗，如果是错误提示弹窗，请传false
 */
function fnAlert(msg, modalIndex, isCloseAll) {
  if (!msg) {
    return;
  }
  let layer = layui.layer;
  if (!modalIndex) {
    modalIndex = 190650603;
  }
  if(!!layer.zIndex){
    modalIndex += layer.zIndex;
  }
  if (isCloseAll === undefined || isCloseAll === null) {
    isCloseAll = true; //默认关闭所有的弹窗
  }
  let res = layer.open({
    type: 1,
    title: '警告',
    content: '<div class="text-center p-3">' + msg + '</div>',
    shade: 0,
    zIndex:modalIndex,
    btn: ['确认'],
    success: function (layero) {
      // layer.setTop(layero);
    },
    end: function (layero, index) {
      if (isCloseAll) {
        layer.closeAll();
      }
      return true;
    }
  });

  return res;
}

/**
 * 页面错误弹窗提示，并且弹窗加载之后，有回调事件
 * @param {String} msg 需要进行提示的信息，不可缺省
 * @param {Object} modalObj 存储所有弹窗需要的缺省值对象
 *      @param01 {String} title 模态窗需要绑定的的模态窗标题 ，可缺省、
 *      @param02 {Boolean} needQ 模态窗是否需要取消按钮 ，可缺省
 *      @param03 {Number} modalIndex 模态窗需要绑定的的模态窗索引值 ，可缺省
 *      @param04 {Number} width 模态窗需要绑定的的模态窗宽度值，可缺省
 *      @param05 {Number} height 模态窗需要绑定的的模态窗高度值，可缺省
 * @param {Function} showCallback 弹窗关闭之后需要执行的回调函数，不可缺省
 * @param {Function} BCallback 确认按钮需要执行的回调函数
 */
function fnAlertShow(msg, modalObj, showCallback, BCallback) {
  if (!msg) {
    return;
  }
  if (!modalObj.title) {
    modalObj.title = '提示信息';
  }
  if (modalObj.needQ === undefined) {
    modalObj.needQ = false;
  }
  let layer = layui.layer;
  if (!modalObj.modalIndex) {
    modalObj.modalIndex = 190650603;
  }
  if(!!layer.zIndex){
    modalObj.modalIndex += layer.zIndex;
  }
  if (!modalObj.width) {
    modalObj.width = 200;
  }
  if (!modalObj.height) {
    modalObj.height = '';
  }
  if (!!modalObj.height && modalObj.height > 380) {
    modalObj.height = 380;
  }
  let tempStr = modalObj.needQ ? ['确认', '取消'] : ['确认'];
  let res = layer.open({
    type: 1,
    title: modalObj.title,
    area: [modalObj.width + 'px', modalObj.height + 'px'],
    content: '<div class="text-center p-3">' + msg + '</div>',
    shade: 0,
    maxHeight: 380,
    zIndex:  modalObj.modalIndex,
    success: function (layero, index) {
      if (typeof showCallback === 'function') {
        showCallback();
      }
    },
    btn: tempStr,
    yes: function (index, layero) {
      let _this = this;
      let tempCheck = true;
      if (typeof BCallback === 'function') {
        let temp = BCallback(index, layero);
        if (temp !== undefined) {
          tempCheck = temp;
        }
      }
      layer.closeAll();
      return tempCheck;
    },
    btn2: function (index, layero) {}
  });
  let element = layui.element;
  let form = layui.form;
  element.init();
  form.render();
  return res;
}

/**
 * 页面错误弹窗提示，并且弹窗关闭之后，有回调事件
 * @param {String} msg 需要进行提示的信息
 * @param {Number} modalIndex 模态窗需要绑定的的模态窗索引值
 * @param {Function} hideCallback 弹窗关闭之后需要执行的回调函数
 */
function fnAlertHide(msg, modalIndex, hideCallback) {
  if (!msg) {
    return;
  }
  let layer = layui.layer;
  if (!modalIndex) {
    modalIndex = 190650603;
  }
  if(!!layer.zIndex){
    modalIndex += layer.zIndex;
  }
  let res = layer.open({
    type: 1,
    title: '请确认',
    content: msg,
    shade: 0,
    maxHeight: 380,
    zIndex:  modalIndex,
    end: function (layero, index) {
      if (typeof hideCallback === 'function') {
        hideCallback(layero, index);
      }
    },
    btn: ['确认', '取消']
  });
  let element = layui.element;
  let form = layui.form;
  element.init();
  form.render();
  return res;
}
/**
 * 弹出确认框
 * @param {String} msg 需要进行确认的内容
 * @param {Function} BCallback 确认按钮需要执行的回调函数
 * @param {Number} modalIndex 模态窗需要绑定的的模态窗索引值
 */
function fnConfirm(msg, BCallback, modalIndex) {
  if (!msg) {
    return;
  }
  let layer = layui.layer;
  if (!modalIndex) {
    modalIndex = 190650603;
  }
  if(!!layer.zIndex){
    modalIndex += layer.zIndex;
  }
  let res = layer.open({
    type: 1,
    title: '请确认',
    content: '<div class="text-center p-3">' + msg + '</div>',
    btn: ['确认', '取消'],
    maxHeight: 380,
    shade: 0,
    zIndex:  modalIndex,
    yes: function (index, layero) {
      let _this = this;
      let tempCheck = true;
      if (typeof BCallback === 'function') {
        let temp = BCallback(index, layero);
        if (temp !== undefined) {
          tempCheck = temp;
        }
      }
      layer.closeAll();
      return tempCheck;
    },
    btn2: function (index, layero) {}
  });
  let element = layui.element;
  let form = layui.form;
  element.init();
  form.render();
  return res;
}

/**
 * 弹出确认框
 * @param {Array} obj 需要填写内容的input group对象
 * 形如 [
 * {
 *  "id":"txtUserName",
 *  "name":"用户名",
 * "type":"text"
 * },
 * {
 *  "id":"txtUserPassword",
 *  "name":"密码",
 * "type":"password"
 * },
 * {
 *  "id":"txtUserSex",
 *  "name":"性别",
 * "type":"select",
 * "option":["男","女"]
 * },
 * {
 *  "id":"txtUserNote",
 *  "name":"备注",
 * "type":"textarea"
 * }
 * ]
 * @param {Function} showCallback 模态窗加载之后需要执行的回调函数
 * @param {Function} BCallback 确认按钮需要执行的回调函数
 * @param {Number} modalIndex 弹窗的索引值
 */
function fnFormDialog(title, obj, showCallback, BCallback, modalIndex) {
  if (!obj) {
    return;
  }
  if (!title) {
    title = '请确认';
  }
  let layer = layui.layer;
  if (!modalIndex) {
    modalIndex = 190650603;
  }
  if(!!layer.zIndex){
    modalIndex += layer.zIndex;
  }
  let res = layer.open({
    type: 1,
    title: title,
    content: translateObjectToForm(obj),
    btn: ['确认', '取消'],
    maxHeight: 380,
    zIndex: modalIndex,
    shade: 0,
    area: '450px',
    success: function (layero, index) {
      if (typeof showCallback === 'function') {
        showCallback();
      }
    },
    yes: function (index, layero) {
      let _this = this;
      let tempCheck = true;
      if (typeof BCallback === 'function') {
        let tempObj = translateFormToBigObject(index, layero, obj);
        if (checkInputRight(tempObj)) {
          let temp = BCallback(index, layero);
          if (temp !== undefined) {
            tempCheck = temp;
          }
        } else {
          tempCheck = false;
        }

      }
      return tempCheck;
    },
    btn2: function (index, layero) {}
  });
  let element = layui.element;
  let form = layui.form;
  element.init();
  form.render();
  return res;
}



/**
 * 页面错误弹窗提示，并且弹窗关闭之后，有回调事件
 * @param {String} src 需要显示的地址
 * @param {Object} modalObj 存储所有弹窗需要的缺省值对象
 *      @param01 {String} title 模态窗需要绑定的的模态窗标题 ，可缺省、
 *      @param02 {Object} data 模态窗内嵌地址后面是否要传参的参数，可缺省
 *      @param03 {Number} modalIndex 模态窗需要绑定的的模态窗索引值 ，可缺省
 *      @param04 {Number} width 模态窗需要绑定的的模态窗宽度值，可缺省
 *      @param05 {Number} height 模态窗需要绑定的的模态窗高度值，可缺省
 * @param {Function} hideCallback 弹窗关闭之后需要执行的回调函数
 */
function fnIfram(src, modalObj, hideCallback) {
  if (!src) {
    return;
  }
  let layer = layui.layer;
  if (!modalObj.title) {
    modalObj.title = '提示信息';
  }
  if (!modalObj.modalIndex) {
    modalObj.modalIndex = 190650603;
  }
  if(!!layer.zIndex){
    modalObj.modalIndex += layer.zIndex;
  }
  if (!modalObj.width) {
    modalObj.width = 200;
  }
  if (!modalObj.height) {
    modalObj.height = '';
  }
  if (!!modalObj.height && modalObj.height > 380) {
    modalObj.height = 380;
  }
  if (!!modalObj.data) {
    src += translateJsonToParams(modalObj.data);
  }
  let res = layer.open({
    type: 2,
    title: modalObj.title,
    area: [modalObj.width + 'px', modalObj.height + 'px'],
    content: src,
    zIndex: modalObj.modalIndex,
    shade: 0,
    maxHeight: 380,
    success: function (layero) {
      layer.setTop(layero);
    },
    end: function (layero, index) {
      if (typeof hideCallback === 'function') {
        hideCallback(layero, index);
      }
    }
  });
  return res;
}

/**
 * 将对象转换为表单字符串，进行返回
 * @param {Array} obj 需要进行转换的对象
 *  id {String} 会绑定到input上面的id值，不可缺省
 *  name {String} 会绑定到左侧提示语上面的内容，不可缺省
 *  type {String} input的实际类型，不可缺省
 *                备选值 text，password，select，textarea
 *  data {String} input的实际值，可缺省
 *  disabled {Boolean} 是否为禁用项，可缺省
 *  required {Boolean} 是否为必填项，可缺省
 *  maxLength {Number} input的最大长度，可缺省
 *  dataType {String} input的需要检查的类型，可缺省
 *                备选值 number ---- 只能为数字
 *                备选值 letter ---- 只能为字母
 *                备选值 phone ---- 需要匹配电话号码格式
 *                备选值 email ---- 需要匹配邮箱格式
 *                备选值 qq ----  需要匹配qq号格式
 * 形如 [
 * {
 *  "id":"txtUserName",
 *  "name":"用户名",
 * "type":"text"
 * },
 * {
 *  "id":"txtUserName",
 *  "name":"用户名",
 * "type":"text",
 * "required":false,
 * "maxLength":10,
 * "dataType":"number"
 * }
 */
function translateObjectToForm(obj) {
  if (!obj || obj.length <= 0) {
    return '对象传递错误';
  }
  let res = '<div class="view layui-form layui-form-pane">';
  obj.forEach(function (item, index) {
    switch (item.type) {
      case 'text':
        {
          res += getTextInput(item);
          break;
        }
      case 'password':
        {
          res += getPasswordInput(item);
          break;
        }
      case 'select':
        {
          res += getSelectInput(item);
          break;
        }
      case 'textarea':
        {
          res += getTextareaInput(item);
          break;
        }
    }

  })
  res += '</div>';
  return res;
}

/**
 * 根据对象将数据转译成text input group组
 * @param {Object} item  text input对象的值
 */
function getTextInput(item) {
  let id = item.id;
  let name = item.name;
  let data = item.data;
  let disabled = item.disabled;
  let required = item.required;
  if (!id || !name) {
    return '';
  }
  let _name = name;
  let res = '<div class="layui-form-item input-group-theme form m-0" aria-label="iText" pane>';
  res += '    <label class="layui-form-label';
  if (!!required && required) {
    res += ' required">';
    _name = '必填项';
  } else {
    res += '">';
  }
  res += name + '</label>';
  res += '  <div class="layui-input-block">';
  res += '  <input type="text" id="' + id + '" class="layui-input form-control" placeholder="' + _name + '"';
  if (!!data) {
    res += ' value="' + data + '"';
  }
  if (!!disabled && disabled === true) {
    res += ' disabled = "true"';
  }
  res += ' />';
  res += '  </div>';
  res += '</div>';
  return res;
}

/**
 * 根据对象将数据转译成password input group组
 * @param {Object} item  text input对象的值
 */
function getPasswordInput(item) {
  let id = item.id;
  let name = item.name;
  let data = item.data;
  let disabled = item.disabled;
  let required = item.required;
  if (!id || !name) {
    return '';
  }
  let _name = name;
  let res = '<div class="layui-form-item input-group-theme form m-0" aria-label="iPassword" pane>';
  res += '    <label class="layui-form-label';
  if (!!required && required) {
    res += ' required">';
    _name = '必填项';
  } else {
    res += '">';
  }
  res += name + '</label>';
  res += '  <div class="layui-input-block">';
  res += '  <input type="password" id="' + id + '" class="layui-input form-control" placeholder="' + _name + '"';
  if (!!data) {
    res += ' value="' + data + '"';
  }
  if (!!disabled && disabled === true) {
    res += ' disabled = "true"';
  }
  res += ' />';
  res += '</div>';
  res += '</div>';
  return res;
}


/**
 * 根据对象将数据转译成select input group组
 * @param {Object} item  text input对象的值
 */
function getSelectInput(item) {
  let id = item.id;
  let name = item.name;
  let data = item.data;
  let disabled = item.disabled;
  let required = item.required;
  let option = item.option;
  if (!id || !name || option.length <= 0) {
    return '';
  }
  let _name = name;
  let res = '<div class="layui-form-item input-group-theme form m-0" aria-label="iSelect" pane>';
  res += '    <label class="layui-form-label';
  if (!!required && required) {
    res += ' required">';
    _name = '必填项';
  } else {
    res += '">';
  }
  res += name + '</label>';
  res += '  <div class="layui-input-block">';
  res += '  <select class="form-control" name="' + name + id + '" id="' + id + '"';
  if (!!disabled && disabled === true) {
    res += ' disabled = "true" ';
  }
  res += ' >';
  option.forEach(function (val, index) {
    res += '  <option index="' + index + '" value="' + val + '"';
    if (data !== undefined && data !== null && val === data) {
      res += ' selected="true" ';
    }
    res += '>' + val + '</option>';
  })
  res += '  </select>';
  res += '</div>';
  res += '</div>';
  return res;
}

/**
 * 根据对象将数据转译成textarea input group组
 * @param {Object} item  text input对象的值
 */
function getTextareaInput(item) {
  let id = item.id;
  let name = item.name;
  let data = item.data;
  let disabled = item.disabled;
  let required = item.required;
  if (!id || !name) {
    return '';
  }
  let _name = name;
  let res = '<div class="layui-form-item input-group-theme form m-0" aria-label="iTextarea" pane>';
  res += '    <label class="layui-form-label';
  if (!!required && required) {
    res += ' required">';
    _name = '必填项';
  } else {
    res += '">';
  }
  res += name + '</label>';
  res += '  <div class="layui-input-block">';
  res += '  <textarea id="' + id + '" class="no-resize layui-textarea form-control" aria-label="文本域" placeholder="' + _name + '"';

  if (!!disabled && disabled === true) {
    res += ' disabled = "true"';
  }
  res += ' >';
  if (!!data) {
    res += data;
  }
  res += '</textarea>';
  res += '</div>';
  res += '</div>';
  return res;
}

/**
 * 将表单中的数据转换成简单json输出
 * @param {String} modalIndex 当前弹窗的索引值
 * @param {Object} currentModal 当前弹窗的对象
 * @returns {Object} res 已经拼接好的json数据
 */
function translateFormToObject(modalIndex, currentModal) {
  let res = {};
  if (!modalIndex) {
    modalIndex = '01';
  }
  let currentObj = $(currentModal).length > 0 ? $(currentModal) : $("#layui-layer" + modalIndex);
  let allInput = currentObj.find(".layui-layer-content>.layui-form-pane").children('.layui-form-item');
  if (allInput.length > 0) {
    for (let i = 0; i < allInput.length; i++) {
      let nowItem = $(allInput[i]).find('.form-control');
      let _name = nowItem.attr('id');
      let _value = nowItem.val();
      res[_name] = _value;
    }
  }
  return res;
}

/**
 * 将表单中的数据转换成复杂的json输出
 * @param {String} modalIndex 当前弹窗的索引值
 * @param {Object} currentModal 当前弹窗的对象
 * @param {Object} obj 之前用于拼接页面input group的对象值
 * @returns {Object} res 已经拼接好的json数据
 */
function translateFormToBigObject(modalIndex, currentModal, obj) {
  let res = [];
  if (!modalIndex) {
    modalIndex = '01';
  }
  let currentObj = $(currentModal).length > 0 ? $(currentModal) : $("#layui-layer" + modalIndex);
  let allInput = currentObj.find(".layui-layer-content>.layui-form-pane").children('.layui-form-item');
  if (allInput.length > 0) {
    for (let i = 0; i < allInput.length; i++) {
      let nowItem = $(allInput[i]).find('.form-control');
      obj[i].data = nowItem.val().trimAll();
      res.push(obj[i]);
    }
  }
  return res;
}
/**
 * 对inputgroup中的值，按照预设进行数据检验
 * @param {Array} obj 需要进行检查的对象
 *  id {String} 会绑定到input上面的id值，不可缺省
 *  name {String} 会绑定到左侧提示语上面的内容，不可缺省
 *  data {String} input的实际值，不可缺省
 *  disabled {Boolean} 是否为禁用项，可缺省
 *  required {Boolean} 是否为必填项，可缺省
 *  maxLength {Number} input的最大长度，可缺省
 *  dataType {String} input的需要检查的类型，可缺省
 *                备选值 number ---- 只能为数字
 *                备选值 letter ---- 只能为字母
 *                备选值 phone ---- 需要匹配电话号码格式
 *                备选值 email ---- 需要匹配邮箱格式
 *                备选值 qq ----  需要匹配qq号格式
 *                备选值 chinese ----  需要匹配中文格式
 *                备选值 html ----  需要匹配html标签格式
 * 形如 [
 * {
 *  "id":"txtUserName",
 *  "name":"用户名",
 * "data":"123123123"
 * },
 * {
 *  "id":"txtUserName",
 *  "name":"用户名",
 * "data":"123测试3123",
 * "required":false,
 * "maxLength":10,
 * "dataType":"number"
 * }
 */
function checkInputRight(obj) {
  if (!obj || obj.length <= 0) { //如果传递过来的值为空，直接返回false
    return false;
  }
  let res = true;
  for (let index = 0; index < obj.length; index++) {
    let item = obj[index];
    if (!!item.required && item.required === true) {
      if (!item.data) {
        res = false;
        fnAlert('第' + (index + 1) + '行' + item.name + '为必填项，不能为空，请注意', 2, false);
        break;
      }
    }
    if (item.maxLength !== undefined && item.maxLength > 0) {
      res = testLowLength(item.data, item.maxLength);
      if (!res) {
        res = testEqualLength(item.data, item.maxLength);
      }
      if (!res) {
        fnAlert('第' + (index + 1) + '行' + item.name + '超过了限定' + item.maxLength + '长度，请注意', 2, false);
        break;
      }
    }
    if (res) {
      if (!!item && !!item.dataType) {
        res = checkInputCheckType(item.data, item.dataType);
        if (!res) {
          fnAlert('第' + (index + 1) + '行' + item.name + '不符合' + item.dataType + '规范，请注意', 2, false);
          break;
        }
      }
    }
  }

  return res;
}

/**
 * 对inputgroup中的值，按照预设进行数据检验
 * @param {Object} obj 需要检查的对象
 */
function checkInputCheckType(data, dataType) {
  if (!data || data.length <= 0) { //如果传递过来的值为空，直接返回false
    return false;
  }
  let res = true; //默认是通过验证

  switch (dataType) {
    case 'number':
      {
        if (typeof onlyNum !== undefined) {
          res = onlyNum(data);
        }
        break;
      }
    case 'letter':
      {
        if (typeof onlyLetter !== undefined) {
          res = onlyLetter(data);
        }
        break;
      }
    case 'phone':
      {
        if (typeof testPhone !== undefined) {
          res = testPhone(data);
        }
        break;
      }
    case 'email':
      {
        if (typeof testEmail !== undefined) {
          res = testEmail(data);
        }
        break;
      }
    case 'qq':
      {
        if (typeof testQQ !== undefined) {
          res = testQQ(data);
        }
        break;
      }
    case 'chinese':
      {
        if (typeof testOnlyChinese !== undefined) {
          res = testOnlyChinese(data);
        }
        break;
      }
    case 'html':
      {
        if (typeof testHtml !== undefined) {
          res = testHtml(data);
        }
        break;
      }
  }
  return res;
}