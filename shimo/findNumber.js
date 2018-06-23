
/**
 * 从一个包含连续正整数的数组，顺序随机，不定长度，找到被去掉的一个数值
 * @param {Array} arr 需要进行检测的数组值，必传
 * @returns {Number} findNumber 缺少的数值
 */
function findNumber(arr) {
    if (!isArr(arr)) {//判断arr是否是数组
        throw new TypeError(" Parameter passed error, first parameter must pass array type parameters.");
    }
    if (arr.length === 0) {//判断arr数组长度，如果为空数组，则不需要进行任何检测了
        throw new TypeError(" Parameter passed error, the length of the first parameter must be greater than 0.");
    }

    let findNumber = 0;

    arr = sortArr(arr); //先将数据进行排序
    //获取第一个正整数值
    //正常情况下数组内所有值减去自己的索引值，都应该等于第一个正整数的值
    let firstNumber = arr[0];

    for(let i in arr){
        //如果不是则代表这个数的前一个值被移除了
        let isCutAfterNum = arr[i] - i - firstNumber !== 0;
        if (isCutAfterNum) {
            findNumber = arr[i] - 1;
            break;
        }
    }

    return findNumber;
}

/**
 * 获取测试数组的方法
 * @return {Array} res  测试数组
 */
function getTestArr() {
    return [2,7,6,3,8,5];
}

/**
 * 判断变量是否为数组的方法
 * @param {Any} variable  需要检测的变量值，必选
 * @returns {Boolean} res 是否是数组
 */
function isArr(variable) {
    return Array.isArray(variable);
}

/**
 * 普通数组的进行升序排列,将普通数组转化隐式转化为数组对象，执行sort方法
 * @param {Array} arr  需要进行升序排列的数组值，必选
 * @returns {Array} arr 已经完成升序的数组
 */
function sortArr(arr) {
    return arr.concat().sort((a, b) => {
        return a - b
    })
}

let tempArr = getTestArr();
console.log(findNumber(tempArr));//4