"use strict";

/**扩展对象原生属性                                                                          */

/**
* 去掉字符串中的所有空格
*/
String.prototype.trimAll = function () {
  return this.replace(/\s/g, "");
}
/**
 * 数组扩展方法
 * contains  remove
 */
Array.prototype.contains = function (val) {
    let flag = false;
    for (let i = 0; i < this.length; i++) {
        if (this[i] == val) flag = true;
    }
    return flag;
};

Array.prototype.findByName = function (name) {
    let res = null;
    this.forEach(function (item, index) {
        if (item.name == name) {
            res = item;
            //break;
        }
    })
    return res;
};

Array.prototype.findById = function (id) {
    let res = null;
    this.forEach(function (item, index) {
        if (item.id == id) {
            res = item;
            //break;
        }
    })
    return res;
};

Array.prototype.findByPid = function (id) {
    let res = [];
    this.forEach(function (item, index) {
        if (item.parentid == id) {
            res.push(item);
            //break;
        }
    })
    return res;
};

Array.prototype.indexOf = function (val) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};

Array.prototype.remove = function (val) {
    let index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
/**
 * 字符格式化
 *  let template1 = "我是{0}，今年{1}了";
 *  let template2 = "我是{name}，今年{age}了";
 *  let result1 = template1.format("loogn", 22);
 *  let result2 = template1.format({ name: "loogn", age: 22 });
 */
String.prototype.format = function (args) {
    if (arguments.length > 0) {
        let result = this;
        if (arguments.length == 1 && typeof (args) == "object") {
            for (let key in args) {
                let reg = new RegExp("({" + key + "})", "g");
                result = result.replace(reg, args[key]);
            }
        } else {
            for (let i = 0; i < arguments.length; i++) {
                if (arguments[i] == undefined) {
                    return "";
                } else {
                    let reg = new RegExp("({[" + i + "]})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
        return result;
    } else {
        return this;
    }
}