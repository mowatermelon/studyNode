'use strict'

/**
 * 封装POST请求的语法糖
 * @param {String} url  请求地址
 * @param {JSON} data  请求需要传递的对象值，
 * @param {Function} successCallback  请求成功的回调
 * @param {Function} errorCallback 请求失败的回调
 * @param {Boolean} needRandom 是否需要在请求地址后面加上一个随机数
 */
function postRequest(url, data, successCallback, errorCallback, needRandom) {
  if (!!url && !!data) {
    if (needRandom === undefined) {
      needRandom = true;
    }
    if (needRandom) {
      url = url + '?T=' + Math.random();
    }
    data = translateJsonToParams(data);
    const params = new URLSearchParams(data);
      axios.post(url,params)
      .then(function (res) {
        if (typeof successCallback === 'function') {
          successCallback(res.data);
        }
      })
      .catch(function (err) {
        if (typeof errorCallback === 'function') {
          errorCallback(err.response);
        } else {
          let tempContent = err.message;
          if (!!err.response) {
            tempContent = translateCodeToString(err.response.status);
          }
          tempContent += '<br/>请联系系统管理员';
          fnAlert(tempContent);
        }

      });
  }

}

/**
 * 封装GET请求的语法糖
 * @param {String} url  请求地址
 * @param {JSON} data  请求需要传递的对象值，
 * @param {Function} successCallback  请求成功的回调
 * @param {Function} errorCallback 请求失败的回调
 * @param {Boolean} needRandom 是否需要在请求地址后面加上一个随机数
 */
function getRequest(url, data, successCallback, errorCallback, needRandom) {
  if (!!url && !!data) {
    if (needRandom === undefined) {
      needRandom = true;
    }
    if (needRandom) {
      url = url + '?T=' + Math.random();
    }
    data = translateJsonToParams(data);
    const params = new URLSearchParams(data);
      axios.get(url,params)
      .then(function (res) {
        if (typeof successCallback === 'function') {
          successCallback(res.data);
        }
      })
      .catch(function (err) {
        if (typeof errorCallback === 'function') {
          errorCallback(err.response);
        } else {
          let tempContent = err.message;
          if (!!err.response) {
            tempContent = translateCodeToString(err.response.status);
          }
          tempContent += '<br/>请联系系统管理员';
          fnAlert(tempContent);
        }

      });
  }

}
/**
 * 封装同步POST请求的语法糖
 * @param {String} url  请求地址
 * @param {JSON} data  请求需要传递的对象值，
 * @param {Function} successCallback  请求成功的回调
 * @param {Function} errorCallback 请求失败的回调
 * @param {Boolean} needRandom 是否需要在请求地址后面加上一个随机数
 */
function synchPostRequest(url, data, successCallback, errorCallback, needRandom) {
  let tempRes = null;
  if (!!url && !!data) {
    if (needRandom === undefined) {
      needRandom = true;
    }
    if (needRandom) {
      url = url + '?T=' + Math.random();
    }
    $.ajax({
      type: 'POST',
      url: url,
      data: data,
      async: false,
      success: function (res) {
        if (typeof successCallback === 'function') {
          successCallback(res);
        }
        tempRes = res;
      },
      error: function (err, textStatus) {
        if (typeof errorCallback === 'function') {
          errorCallback(err, textStatus);
        } else {
          fnAlert(translateCodeToString(err.status) + '<br/>请联系系统管理员');
        }

      }
    });
  }
  return tempRes;
}
/**
 * 封装同步GET请求的语法糖
 * @param {String} url  请求地址
 * @param {JSON} data  请求需要传递的对象值，
 * @param {Function} successCallback  请求成功的回调
 * @param {Function} errorCallback 请求失败的回调
 * @param {Boolean} needRandom 是否需要在请求地址后面加上一个随机数
 */
function synchGetRequest(url, data, successCallback, errorCallback, needRandom) {
  let tempRes = null;
  if (!!url && !!data) {
    if (needRandom === undefined) {
      needRandom = true;
    }
    if (needRandom) {
      url = url + '?T=' + Math.random();
    }
    $.ajax({
      type: 'GET',
      url: url,
      data: data,
      async: false,
      success: function (res) {
        if (typeof successCallback === 'function') {
          successCallback(res);
        }
        tempRes = res;
      },
      error: function (err, textStatus) {
        if (typeof errorCallback === 'function') {
          errorCallback(err, textStatus);
        } else {
          fnAlert(translateCodeToString(err.status) + '<br/>请联系系统管理员');
        }

      }
    });
  }
  return tempRes;
}
/**
 * 转移状态码错误信息
 * @param {Number} code 需要进行转译的错误状态码
 */
function translateCodeToString(code) {
  let res = "请求异常";
  if (code === '' || code === undefined) {
    return res;
  }
  switch (code) {
    case 0:
      {
        res = "服务访问异常";
        break;
      }
    case 100:
      {
        res = "客户必须继续发出请求";
        break;
      }
    case 101:
      {
        res = "客户要求服务器根据请求转换HTTP协议版本";
        break;
      }
    case 200:
      {
        res = "请求成功";
        break;
      }
    case 201:
      {
        res = "提示知道新文件的URL";
        break;
      }
    case 202:
      {
        res = "接受和处理、但处理未完成";
        break;
      }
    case 203:
      {
        res = "返回信息不确定或不完整";
        break;
      }
    case 204:
      {
        res = "请求收到，但返回信息为空";
        break;
      }
    case 205:
      {
        res = "服务器完成了请求，用户代理必须复位当前已经浏览过的文件";
        break;
      }
    case 206:
      {
        res = "服务器已经完成了部分用户的GET请求";
        break;
      }
    case 300:
      {
        res = "请求的资源可在多处得到";
        break;
      }
    case 301:
      {
        res = "删除请求数据";
        break;
      }
    case 302:
      {
        res = "在其他地址发现了请求数据";
        break;
      }
    case 303:
      {
        res = "建议客户访问其他URL或访问方式";
        break;
      }
    case 304:
      {
        res = "客户端已经执行了GET，但文件未变化";
        break;
      }
    case 305:
      {
        res = "请求的资源必须从服务器指定的地址得到";
        break;
      }
    case 306:
      {
        res = "前一版本HTTP中使用的代码，现行版本中不再使用";
        break;
      }
    case 307:
      {
        res = "申明请求的资源临时性删除";
        break;
      }
    case 400:
      {
        res = "错误请求，如语法错误";
        break;
      }
    case 401:
      {
        res = "请求授权失败";
        break;
      }
    case 402:
      {
        res = "保留有效ChargeTo头响应";
        break;
      }
    case 403:
      {
        res = "请求不允许";
        break;
      }
    case 404:
      {
        res = "系统配置有误";
        break;
      }
    case 405:
      {
        res = "用户在Request-Line字段定义的方法不允许";
        break;
      }
    case 406:
      {
        res = "根据用户发送的Accept拖，请求资源不可访问";
        break;
      }
    case 407:
      {
        res = "用户必须首先在代理服务器上得到授权";
        break;
      }
    case 408:
      {
        res = "客户端没有在用户指定的饿时间内完成请求";
        break;
      }
    case 409:
      {
        res = "对当前资源状态，请求不能完成";
        break;
      }
    case 410:
      {
        res = "服务器上不再有此资源且无进一步的参考地址";
        break;
      }
    case 411:
      {
        res = "服务器拒绝用户定义的Content-Length属性请求";
        break;
      }
    case 412:
      {
        res = "一个或多个请求头字段在当前请求中错误";
        break;
      }
    case 413:
      {
        res = "请求的资源大于服务器允许的大小";
        break;
      }
    case 414:
      {
        res = "请求的资源URL长于服务器允许的长度";
        break;
      }
    case 415:
      {
        res = "请求资源不支持请求项目格式";
        break;
      }
    case 416:
      {
        res = "请求中包含Range请求头字段，在当前请求资源范围内没有range指示值，请求";
        break;
      }
    case 417:
      {
        res = "服务器不满足请求Expect头字段指定的期望值，如果是代理服务器，可能是下一级服务器不能满足请求";
        break;
      }
    case 500:
      {
        res = "服务器配置有误";
        break;
      }
    case 501:
      {
        res = "服务器不支持请求的函数";
        break;
      }
    case 502:
      {
        res = "服务器暂时不可用，有时是为了防止发生系统过载";
        break;
      }
    case 503:
      {
        res = "服务器过载或暂停维修";
        break;
      }
    case 504:
      {
        res = "关口过载，服务器使用另一个关口或服务来响应用户，等待时间设定值较长";
        break;
      }
    case 505:
      {
        res = "服务器不支持或拒绝支请求头中指定的HTTP版本";
        break;
      }
  }
  return res;

}