/**
 * 检测密码强度
 * @param {Any} variable  需要检测用户输入的密码值，必选
 * @returns {String} res 检测的密码的强度
 */
function testPwdStrength(variable) {
    let resArr = ['弱', '中', '强'];
    let res = resArr[0];
    if (!!variable) {//先判断输入值是否为空
        if (onlyNum(variable)) {
            res = resArr[0];
        } else if (testNumLetter(variable)) {
            res = resArr[1];
        } else if (testNumLetterSpecial(variable)) {
            res = resArr[2];
        }
    }
    return res;//如果都匹配不成功，默认返回弱
}
/**
 * 返回正则测试结果的方法
 * @param {RegExp} reg  用来检测变量的正则，必选
 * @param {Any} variable  需要检测的变量值，必选
 * @returns {Boolean} res 对于指定正则是否能够匹配
 */
function testReg(reg, variable) {
    let res = false;

    if (!(reg instanceof RegExp)) {//判断reg是否是正则表达式
        throw new TypeError(" Parameter passed error, first parameter must pass RegExp type parameters.");
    }
    if (!variable) {//判断variable长度，如果为空，则不需要进行任何检测了
        throw new TypeError(" Parameter passed error, the length of the second parameter must be greater than 0.");
    }
    //执行正则测试
    res = reg.test(variable);
    return res;
}

/**
 * 判断是否只为数字的方法
 * @param {Any} variable  需要检测的变量值，必选
 */
function onlyNum(variable) {
    let reg = /^[0-9]*$/g;
    return testReg(reg, variable);
}
/**
 * 判断是否匹配数字加大小写字母的方法
 * @param {Any} variable  需要检测的变量值，必选
 */
function testNumLetter(variable) {
    let reg = /^[0-9a-zA-Z]*$/g;
    return testReg(reg, variable);
}
/**
 * 判断是否匹配数字加大小写字母加特殊符号的方法
 * @param {Any} variable  需要检测的变量值，必选
 */
function testNumLetterSpecial(variable) {
    let reg = /^[0-9a-zA-Z~'!@#￥$%^&*()-+_={}\[\]\|\\:：;；'"‘“,，.。/><《》\s]*$/g;
    return testReg(reg, variable);
}

console.log(testPwdStrength(12346));//弱
console.log(testPwdStrength('12346Sa2'));//中
console.log(testPwdStrength('12346Sa 2'));//强
console.log(testPwdStrength('12346S2《'));//强
