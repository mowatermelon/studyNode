/**通用的工具方法-------------------------------------------------------------------*/

/**
 * 对象复制其他对象值
 * @param {Object} objA 需要被插入属性的对象
 * @param {Object} objB 需要插入属性的对象
 */
function pushObj(objA, objB) {
    if (typeof objA === 'object' && typeof objB === 'object') {
        for (let item in objB) {
            objA[item] = objB[item];
        }
    }
    return objA;
}

/**
 * js格式化
 */
function jsFormat() {
    let r = editor.getValue();
    r = r.replace(/^\s+/, '');
    if (r && r.charAt(0) === '<') {
        r = style_html(r, 4, ' ', 80);
    } else {
        r = js_beautify(r, 4, ' ');
    }
    if (editor) {
        editor.setValue(r);
    }
}

/**
 * 生成唯一ID
 */
function guidGenerator() {
    let S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    let now = new Date();
    let nowStr = formatDate(now, 1);
    return nowStr + "-" + S4() + S4();
}

/**
 * 调取浏览器打印功能
 * @param {String} url 需要打印的页面地址
 * @returns null
 */
function printPreview() {
    if (getBrowserInfo() == "Chrome") {
        window.print();
    } else {
        WindowPrint.execwb(7, 1);
    }

}

/**
 * 判断浏览器的类型
 * @returns 具体浏览器版本
 */
function getBrowserInfo() {
    let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    let isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    }; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1) {
        return "Chrome";
    }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (!isOpera && /(msie\s|trident.*rv:)([\w.]+)/.exec(userAgent)) {
        return "IE";
    }; //判断是否IE浏览器

    let mobileAgents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"
    ];
    for (let v = 0; v < mobileAgents.length; v++) {
        if (userAgent.indexOf(mobileAgents[v]) > 0) {
            return mobileAgents[v];
            break;
        }
    }
}

/**
 * 判断当前是否支持localStorage
 */
function supportStorage() {
    let res = false;
    if (typeof window.localStorage == 'object') {
        res = true;
    }
    return res;
}

/**
 * 检测浏览器是否支持CORS
 */
function checkBrowserCORS() {
    let res = false;
    //Detect browser support for CORS
    if ('withCredentials' in new XMLHttpRequest()) {
        /* supports cross-domain requests */
        console.log("CORS supported (XHR)");
        res = true;
    } else {
        if (typeof XDomainRequest !== "undefined") {
            //Use IE-specific "CORS" code with XDR
            console.log("CORS supported (XDR)");
            res = true;
        } else {
            //Time to retreat with a fallback or polyfill
            console.log("No CORS Support!");
        }
    }
}
/**
 * 将url后面的对象转为参数
 * eg. {a:1,b:2}
 * 我返回的是?a=1&b=2
 * @returns Object
 */
function translateJsonToParams(obj) {
    let _params = obj;
    if (_params === null && !_params && typeof _params !== "object") {
        return res;
    }
    let temp = $.extend({},_params);
    let symbol = '=';
    let lastSymbol = '&';
    let res = '?';
    for (let key in temp) {
        if (!!temp[key]) {
            res += key + symbol + temp[key] + lastSymbol;
        }
    }
    res = res.substring(0, res.length - 1); //去掉最后一个多余的lastSymbol
    return res;
}

/**
 * 将url后面的参数转为对象
 * eg. 地址是127.0.0.1/index.html?a=1&b=2
 * 我返回的是{a:1,b:2}
 * @returns Object
 */
function translateParamsToJson() {
    let _url = decodeURI(location.href);
    let paramsString = _url.substring(_url.indexOf("?") + 1, _url.length).split("&");
    let paramsObj = {};
    for (let i = 0; nameValue = paramsString[i]; i++) {
        let equalIndex = nameValue.indexOf("=");
        let paramStringLength = nameValue.length;
        let _name = nameValue.substring(0, equalIndex);
        let _value = nameValue.substring(equalIndex + 1, paramStringLength);
        if (_value.indexOf("#") > -1) {
            _value = _value.split("#")[0];
        }
        paramsObj[_name] = _value;
    }
    return paramsObj;
}

/**
 * 阻止默认事件
 * @param {Event} event
 */
function cancelFlow(event) {
    //阻止默认事件
    // 兼容FF和IE和Opera
    let Event = event || window.event || e;
    if (Event && Event.preventDefault) {
        //因此它支持W3C的stopPropagation()方法
        Event.preventDefault();
        Event.stopPropagation();

    } else {
        //否则，我们需要使用IE的方式来取消事件冒泡
        Event.returnValue = false;
        Event.cancelBubble = true;

        return false;
    }

}

/**
 * 将对象的属性值绑定到对应的输入框上
 * @param {Object} obj 需要进行值绑定的对象
 * 形如{
 *      "roleId": "roleId1",
 *       "roleName": "roleName1",
 *      "roleFullname": "roleFullname1",
 *      "roleType": "roleType1",
 *       "roleCreatetime": "roleCreatetime1",
 *       "roleSortnum": "roleSortnum1",
 *       "roleNote": "roleNote1",
 *       "rolePopedom": "rolePopedom1"
 *   }
 * 需要对象属性的键名和控件的id是一致的，通过控件id给控件绑值
 * 执行过程类似 $("#roleId").val("roleId1")
 * @returns 没有返回值
 */
function bindObjectToInput(obj) {
    for (let key in obj) {
        $('#' + key).val(obj[key]);
    }
}

/**
 * 分割原始参数数组，只保留用户输入的value值的方法
 * @param {Array} obj  包含所有参数的param数组，必选
 *           格式举例[{text:'melon',data:'melon'},{text:'water',data:'water'}]
 * @param {String} param 需要进行返回的属性值
 *  *            举例设置为data，则每个子数组至少包含一个data属性值
 * @param {Boolean} isString 返回的是对象，还是通过英文逗号拼接的字符串
 * @return {Array,String} res 只保存了规定属性值的数组，或者通过英文逗号拼接的String
 */
function splitArguData(obj, param, isString) {
    let res = [];
    if (isArr(obj) && obj.length > 0) {
        for (let i = 0; i < obj.length; i++) {
            res.push(obj[i][param]);
        }
        if (isString) {
            res = res.toString();
        }
    } else {
        res = "Parameter pass error,it is not an array object!";
    }

    return res;
}

/**
 * 时间格式化方法
 * @param {Date} iDate，需要进行转换的日期
 * @param {Number} type 格式，一共有两种情况，。
 *                      一种是0，将原始的日期转成yyyy-MM-dd hh:mm:ss格式，默认的格式。
 *                      一种是1，是将原始的日期转换成yyyyMMddhhmmss格式
 *                      一种是2，将原始的时间戳转换成yyyy-MM-dd
 */
function formatDate(iDate, type) {
    if (type === 2) {
        iDate = new Date(iDate);
    }
    iDate = iDate.toLocaleString("zh-CN", {
        hour12: false
    }); //将默认的日期按照当地的日期格式进行转移，这边转化的效果是yyyy/M/d h:m:s
    iDate = iDate.replace(/\b\d\b/g, '0$&'); //将yyyy/M/d h:m:s中的月份，日期，时间只有一位的，用0进行补位，比如将2018/5/14 转换成2018/05/14
    switch (type) {
        case 0:
            {
                iDate = iDate.replace(new RegExp('/', 'gm'), '-'); //将日期转换成yyyy-MM-dd hh:mm:ss
                break;
            }
        case 1:
            {
                iDate = iDate.replace(/\/|\:|\s/g, ''); //将日期转换成yyyyMMddhhmmss
                break;
            }
        case 2:
            {
                iDate = iDate.replace(new RegExp('/', 'gm'), '-').substr(0, 10); //将日期转换成yyyy-MM-dd hh:mm:ss
                break;
            }
    }
    return iDate;
}
/**
 * 获取某个日期时间n天前/后的时间
 * @param {Date} iDate，需要进行转换的某个日期
 * @param {Number} n,天数:正数为n天后，负数为n天前
 */
function getNDaysBeforeEndDate(iDate,n) {
    let timestamp = new Date(iDate).getTime();
    // 获取n天前/后的日期
    let newDate = new Date(timestamp + n * 24 * 3600 * 1000);
    return newDate;
}
/**
 * 打印正常日志的方法
 * @param {Any} variable  需要打印的变量值，必选
 */
function log(variable) {
    console.log(variable);
}
/**
 * 打印消息日志的方法
 * @param {Any} variable  需要打印的变量值，必选
 */
function info(variable) {
    console.info(variable);
}
/**
 * 打印错误日志的方法
 * @param {Any} variable  需要打印的变量值，必选
 */
function err(variable) {
    console.error(variable);
}

/**
 * bootstrap table中需要写行内button，并且需要将当前行数据进行返回，
 * 提供一个公共方法，返回对应的按钮html内容
 * @param {Object} row 当前行数据，不可缺省
 * @param {Number} index 当前行索引，不可缺省
 * @param {String} id 需要新增的按钮id，不可缺省
 * @param {String} name  需要新增的按钮内容，不可缺省
 * @param {String} callBackName  需要新增的按钮对应的事件名，不可缺省
 */
function setTableBtn(row, index, id, name, callBackName) {
    let res = '';
    if (!!row && !!id && !!name && !!callBackName) {
        if (typeof row === 'object') {
            let tempRow = JSON.stringify(row);
            tempRow = tempRow.replace(/\"/g, "'");
            res = '<button id="' + id + index+'" type="button" index="' + index + '" class="btn btn-theme btn-inline" onclick="' + callBackName + '(' + tempRow + ')">' + name + '</button>';
        }
    }
    return res;
}

/**
 * 检测ie的具体版本
 * @returns {Number} 具体的版本号
 */
function getIEVer() {
    let userAgent = navigator.userAgent;
    let rMsie = /(msie\s|trident.*rv:)([\w.]+)/;
    let ua = userAgent.toLowerCase();
    let match = rMsie.exec(ua);
    let res = null;
    if (match != null) {
        res = {
            browser: "IE",
            version: match[2] || "0"
        };
    } else {
        res = {
            browser: "",
            version: "0"
        };
    }
    return res;
}
/**
 * 重置Table的头部宽度
 * @param {String} tableId 需要重置的table body的id
 * @param {String} tableTitleId 需要重置的treeTable title的id
 */
function resetTableWidth(tableId,tableTitleId){
    if($("#"+ tableId +" tr").length > 0){
        $("#"+ tableTitleId +" tr th").each(function(index){
            let width = $("#"+ tableId +" tr").eq(0).children("td").eq(index).width();
            $("#"+ tableTitleId +" tr th").eq(index).width(width);
        });
    }
}

/**
 * 获取一个拥有title提示的html内容
 * @param {String} value 必传，需要进行拼接的value值
 * @returns {String} res 已经拼接好的html内容
 */
function getTitleHtml(value){
    let res = '';
    if(!!value){
        res = '<span title="'+value+'">'+value+'</span>';
    }
    return res;
}


/**
 * 对JSON数据进行转移，格式化，转化成规定字符串，并进行返回
 * @param {JSON} ctrl  需要进行格式化的json数据
 * @param {String} symbol  用于链接字符串的符号
 * @returns {String} res 格式化之后的字符串
 */
function translateString(ctrl, symbol) {
    let lastSymbol;
    let res = '';
    // 判断控件数据和分割符号是否为空
    if (!ctrl && !symbol && typeof ctrl !== "object") {
        return res;
    }

    if (symbol === ':') { //如果是样式数据进行拼接
        lastSymbol = ';';
    } else if (symbol === '=') { //如果是属性数据进行拼接
        lastSymbol = ' ';
    }
    for (let key in ctrl) {
        if (!!ctrl[key]) {
            res += getKebabCase(key) + symbol;
            if (symbol === ':') {
                if (key === 'borderColor') {
                    res += ctrl[key] + ' !important';
                } else {
                    res += ctrl[key];
                }
            } else if (symbol === '=') {
                res += "\"" + ctrl[key] + "\"";
            }
            res += lastSymbol;
        }
    }
    return res;
}

/**
 * 将骆驼命名规则的字符串转换成使用短横线命名法的字符串
 * @param {String} str  camelCase驼峰命名法
 * @returns {String} res kebab-case短横线命名法
 */
function getKebabCase(str) {
    return str.replace(/[A-Z]/g, function (i) {
        return '-' + i.toLowerCase();
    })
}

/**
 * 对JSON数据进行深拷贝之后进行属性剔除
 * @param {JSON} ctrl  需要进行格式化的json数据
 * @param {Array} attrs  需要剔除的属性列表
 * @returns {JSON} ctrl 剔除相关属性的ctrl数据
 */
function deleteJsonAttr(ctrl, attrs) {
    let res = '';
    if (!ctrl && !attrs && typeof ctrl !== "object") {
        return res;
    }
    res = $.extend({}, ctrl);
    for (let i in attrs) {
        delete res[attrs[i]];
    }
    return res;
}


/**
 * 截取html字符串中某段标签内容的方法
 * @param {String} str 被检索的字符串;
 * @param {String} tagStr 需要选中的tag标签名;
 * @param {Number} flag 数据返回模式,
 *        0 只返回被检索标签内容，默认值  {String},
 *        1 只返回剔除了检索标签内容的字符串    {String},
 *        2 返回，被检索标签内容，和剔除了检索标签内容的字符串  {Json},
 *        {tag:只返回被检索标签内容,text:剔除了检索标签内容的字符串}
 */
function cutTagStr(str, tagStr, flag) {
    let res = null;
    if (params.length === 3) {
        const tacitFlag = 2;
        let str = params[0];
        let tagStr = params[1];
        let flag = params[2];

        let searchReg = new RegExp("<" + tagStr + "(.*?)>(.+)<\/" + tagStr + ">", "g");
        if (!flag) {
            flag = tacitFlag;
        } else {
            if (typeof (flag) !== "number") {
                flag = tacitFlag;
            }
        }
        switch (flag) {
            case 0:
                res = str.match(searchReg)[0];
                break;
            case 1:
                res = str.replace(searchReg, "");
                break;
            case 2:
                res = {
                    tag: str.match(searchReg)[0],
                    text: str.replace(searchReg, "")
                };
                break;
            default:
                res = {
                    tag: str.match(searchReg)[0],
                    text: str.replace(searchReg, "")
                };
        }
    } else {
        res = "Parameter pass error,wrong number of arguments!";
    }


    return res;
}

/**
 * 将html字符串内容按照固定格式进行分割的方法
 * @param {Array} param  必选
 * 01 {String} str 被检索的字符串;
 * 02 {String} tagStr 用来做分割tag标签名;
 * 03 {Number} flag 数据返回模式,
 *        0 只返回第一次匹配的值，默认值  {String},
 *        1 返回所有匹配的值 {array},
 */

function splitTagStr(param) {
    let res = null;
    if (param.length === 3) {
        const tacitFlag = 1;
        let str = param[0];
        let tagStr = param[1];
        let flag = param[2];
        if (!flag) {
            flag = tacitFlag;
        } else {
            if (typeof (flag) !== "number") {
                flag = tacitFlag;
            }
        }
        let searchReg = new RegExp("<" + tagStr + "(.*?)>.*?<\/" + tagStr + ">", "g");
        switch (flag) {
            case 0:
                res = str.match(searchReg)[0];
                break;
            case 1:
                res = str.match(searchReg);
                break;
            default:
                res = str.match(searchReg)[0];
        }
    } else {
        res = "Parameter pass error,wrong number of arguments!";
    }

    return res;
}

/**
 * 对于字符串，根据特定的分割标识，进行分割转化成数组
 * @param {Date} variable  需要分割的字符串，必选
 * @param {String} sliptTag 需要用来标识分割的字符串
 */
function separateStrByTag(variable, sliptTag) {
    let res = null;
    if (!!variable && variable.constructor !== Array) {
        if (!sliptTag) {
            sliptTag = '，';
        }
        res = variable.split(sliptTag);
    }

    return res
}

/**
 * 存储数值
 * @param {String} name  该存储的标识名，请注意唯一性
 * @param {String,JSON} value  该存储的具体值
 * @param {Boolean} type  该存储具体值的类型，设置为true则是说明具体值是非字符串格式，反正则不是
 * @returns 无返回值
 * 
 */
function setItem(name, value, type) {
    if (type) {
        value = JSON.stringify(value);
    }
    window.localStorage.setItem(name, value);
}

/**
 * 获取数值
 * @param {String} name  该存储的标识名，请注意唯一性
 * @param {Boolean} type  该存储具体值的类型，设置为true则是说明具体值是非字符串格式，反正则不是
 * @returns {String,JSON} 获取到的存储值
 */
function getItem(name, type) {
    let res = window.localStorage.getItem(name);
    if (res !== null) {
        if (type) { // 为布尔值
            res = JSON.parse(res);
        }
    }
    return res
}

/**
 * 存储格式化的数组值
 * @param {Array} init 需要进行存储的数组数值
 *          举例  [{name: 'isLogin', value: 'true', type: false}]
 *          @key {String} name  该存储的标识名，请注意唯一性
 *          @key {String,JSON} value  该存储的具体值
 *          @key {Boolean} type  该存储具体值的类型，设置为true则是说明具体值是非字符串格式，反正则不是
 * @returns 无返回值
 */
function initData(init) {
    for (let i = 0; i < init.length; i++) {
        if (window.localStorage.getItem(init[i].name) === null) {
            setItem(init[i].name, init[i].value, init[i].type);
        }
    }
}