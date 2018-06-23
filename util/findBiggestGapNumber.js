/**
 * 从一个包含连续正整数的数组，顺序随机，不定长度，找到被去掉的一个数值
 * @param {Number} oldValue 需要比较的值，必传
 * @param {Number} currentValue 新增加的值，必传
 * @param {Number} checkRate 需要进行确认的变化率，必传
 * @param {Number} currentIndex 新增加的值索引，必传
 * @returns {Boolean} isBigNumber 当前产生的数据是否
 */
function findBiggestGapNumber(oldValue, currentValue, currentIndex, checkRate) {
    if (oldValue === undefined || currentValue === undefined || currentIndex === undefined) {//判断所有必填参数是否传递
        throw new TypeError(" Parameter passed error, the first three parameters are required parameters.");
    }
    let isBigNumber = false;
    let currentGapValue = currentValue - oldValue;
    let currentGapRate = 0;
    if (oldValue !== 0) {//分母不能为0
        currentGapRate = currentGapValue / oldValue;
        if (currentGapRate > checkRate) {
            isBigNumber = true;
        }
    } else {//如果oldValue为0，默认当前变化率和间隔数为currentValue
        currentGapRate = currentValue;
        if (currentGapRate > checkRate) {
            isBigNumber = true;
        }
    }

    if(isBigNumber){
        findNumber.gap = currentGapValue;
        findNumber.num = currentValue;
        findNumber.index = currentIndex;
        findNumber.rate = currentGapRate;
        console.log(findNumber);
    }

    return isBigNumber;
}

/**
 * 获取测试数组的方法
 * @param {Number} checkRate 需要进行确认的变化率，必传
 */
function getConstantlyProduceArr(checkRate) {
    if (!checkRate) {
        return;
    }

    if (!tempArr) {
        tempArr = [2];
        findNumber = { num: tempArr[0], index: 0, gap: 0, rate: 0 };
    }
    let randomNum = Math.floor(Math.random() * Math.random() * 100);
    tempArr.push(randomNum);
    let newIndex = tempArr.length - 1;
    let oldIndex = newIndex - 1;
    console.log('比较新增加的数是否大于规定变换率：', findBiggestGapNumber(tempArr[oldIndex], tempArr[newIndex], newIndex, checkRate));
}

/**
 * @param {Function} callback 需要定时执行的方法体  
 * @param {Number} time 定时器间隔时间  
 * @param {Number} execNumber 定时器执行次数
 */
function mockInterval(callback, time, execNumber, ...params) {
    if (Object.prototype.toString.call(callback) != "[object Function]") {//判断callback是否是一个方法,不能直接判断instanceof,需要能支持箭头函数检测
        throw new TypeError('Parameter passed error, first parameter must pass function type parameters.');
    }

    if (time === undefined || execNumber === undefined) {//判断必传参数是否都已经传递
        throw new TypeError('Parameter passed error, the first three parameters are required parameters.');
    }

    let tempCount = 1;

    let tempFun = () => {
        console.log('第', tempCount, '次执行');
        try {
            callback.call(null, ...params);
        }
        catch (e) {
            throw e.toString();
        }
        if (--execNumber > 0) {
            setTimeout(tempFun, time);
        }
        tempCount++;
    }

    setTimeout(tempFun, time);
}


/**
 * 获取测试数组的方法
 * @return {Array} res  测试数组
 */
function getTestArr() {
    return [2];
}

let checkCount = 20;
let checkRate = 1;
let tempArr = getTestArr();
let findNumber = { num: tempArr[0], index: 0, gap: 0, rate: 0 };
mockInterval(getConstantlyProduceArr, 1000, checkCount, checkRate);
