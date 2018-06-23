
/**
 * 创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果
 * @param {Function} callback 
 *    生成新数组元素的函数，使用三个参数：
 *          @param {Any} currentValue
 *          callback 的第一个参数，数组中正在处理的当前元素。
 *          @param {Number} index
 *          callback 的第二个参数，数组中正在处理的当前元素的索引。
 *          @param {Array} array
 *          callback 的第三个参数，map 方法被调用的数组。
 * @param thisArg
 *    可选的。执行 callback 函数时 使用的this 值。
 */
Array.prototype.map = function (callback, thisArg) {
    if (!Array.isArray(this) || !this) {//判断是否是正常的数组类型数据,同时判断是否为空或者未定义
        throw new TypeError(' this is null or not defined');
    }

    if (Object.prototype.toString.call(callback) != "[object Function]") {//判断callback是否是一个方法,不能直接判断instanceof,需要能支持箭头函数检测
        throw new TypeError('Parameter passed error, first parameter must pass function type parameters.');
    }

    //获取到未修改的数组对象
    let oldArr = this;
    if (oldArr.length === 0) {
        return oldArr; //如果当前数组长度为0,则不做任何操作,直接返回
    }

    let tempThis = undefined;

    //深度拷贝当前数组对象
    let copyArr = this.concat();

    //获取thisArg,如果不为空,则传递给tempThis
    if (!!thisArg) {
        tempThis = thisArg;
    }
    copyArr.forEach((item, index, arr) => {
        // 执行callback,this指向tempThis,参数有三个.分别是item:值,index:索引,oldArr:原数组.
        let execValue = callback.call(tempThis, item, index, oldArr);
        // 动态将执行完成的值赋值给copyArr
        copyArr[index] = execValue;
    });

    return copyArr;
};

let testArr01 = [1, 5, 10, 15];
let doubles = testArr01.map(x => x ** 2);
console.log('old:', testArr01);//old: [ 1, 5, 10, 15 ]
console.log('new:', doubles);//new: [ 1, 25, 100, 225 ]

const testArr02 = [2, 4, 8, 10];
let halves = testArr02.map(x => x / 2);
console.log('old:', testArr02);//old: [ 2, 4, 8, 10 ]
console.log('new:', halves);//new: [ 1, 2, 4, 5 ]

let testArr03 = [1, 4, 9];
let roots = testArr03.map(Math.sqrt);
console.log('old:', testArr03);//old: [ 1, 4, 9 ]
console.log('new:', roots);//new: [ 1, 2, 3 ]

let testArr04 = [{ key: 1, value: 10 },
{ key: 2, value: 20 },
{ key: 3, value: 30 }];

let formatObjArray = testArr04.map((obj) => {
    let rObj = {};
    rObj[obj.key] = obj.value;
    return rObj;
});
console.log('old:', testArr04);//old: [ { key: 1, value: 10 },{ key: 2, value: 20 },{ key: 3, value: 30 } ]
console.log('new:', formatObjArray);//new: [ { '1': 10 }, { '2': 20 }, { '3': 30 } ]


/**
 * 创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果
 * @param {Function} callback 
 *    执行数组中每个值的函数，包含四个参数：
 *          @param {Any} accumulator
 *          callback 的第一个参数，累加器累加回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue（如下所示）。
 *          @param {Any} currentValue
 *          callback 的第二个参数，数组中正在处理的当前元素。
 *          @param {Number} index 可选
 *          callback 的第三个参数，数组中正在处理的当前元素的索引。 如果提供了initialValue，则索引号为0，否则为索引为1。。
 *          @param {Array} array
 *          callback 的第三个参数，reduce 方法被调用的数组。
 * @param initialValue
 *    可选的。用作第一个调用 callback的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。
 */
Array.prototype.reduce = function (callback, initialValue) {
    if (!Array.isArray(this) || !this) {//判断是否是正常的数组类型数据,同时判断是否为空或者未定义
        throw new TypeError(' this is null or not defined');
    }

    if (Object.prototype.toString.call(callback) != "[object Function]") {//判断callback是否是一个方法,不能直接判断instanceof,需要能支持箭头函数检测
        throw new TypeError('Parameter passed error, first parameter must pass function type parameters.');
    }

    //获取到未修改的数组对象
    let oldArr = this;
    if (oldArr.length === 0) {
        throw new TypeError(" the length of the array must be greater than 0.");
    }

    let accumulator = 0;//声明累加变量
    let res = undefined;//声明最后累加值

    //深度拷贝当前数组对象
    let copyArr = this.concat();

    //获取initialValue,如果不为空,则传递给accumulator
    if (!!initialValue) {
        accumulator = initialValue;
    }

    // 如果没有提供initialValue，
    // reduce 会从索引1的地方开始执行 callback 方法，跳过第一个索引。
    // 如果提供initialValue，从索引0开始。

    copyArr.forEach((item, index, arr) => {
        if (initialValue === undefined && index === 0) {
            return;
        }
        // 执行callback,参数有四个.分别是accumulator:累加器累加回调的返回值,item:值,index:索引,oldArr:原数组.
        accumulator = callback(accumulator, item, index, oldArr);
        // 动态将执行完成的值赋值给copyArr
        res = accumulator;
    });

    return res;
}

let testArr05 = [1, 2, 3, 4, 5];
let tempAdd01 = testArr05.reduce((prev, curr) => prev + curr);
console.log('old:', testArr05);//old: [ 1, 2, 3, 4, 5 ]
console.log('new:', tempAdd01);//new: 14
let tempAdd02 = testArr05.reduce((prev, curr) => prev + curr, 0);
console.log('old:', testArr05);//old: [ 1, 2, 3, 4, 5 ]
console.log('new:', tempAdd02);//new: 15
let tempAdd03 = testArr05.reduce((prev, curr) => prev + curr, 3);
console.log('old:', testArr05);//old: [ 1, 2, 3, 4, 5 ]
console.log('new:', tempAdd03);//new: 18

let testArr06 = [[0, 1], [2, 3], [4, 5]];
let flattened = testArr06.reduce(
    (acc, cur) => acc.concat(cur),
    []
);
console.log('old:', testArr06);//old: [ [ 0, 1 ], [ 2, 3 ], [ 4, 5 ] ]
console.log('new:', flattened);//new: [ 0, 1, 2, 3, 4, 5 ]


let testArr07 = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
let countedNames = testArr07.reduce(function (allNames, name) {
    if (name in allNames) {
        allNames[name]++;
    }
    else {
        allNames[name] = 1;
    }
    return allNames;
}, {});
console.log('old:', testArr07);//old: [ 'Alice', 'Bob', 'Tiff', 'Bruce', 'Alice' ]
console.log('new:', countedNames);//new: { Alice: 2, Bob: 1, Tiff: 1, Bruce: 1 }


