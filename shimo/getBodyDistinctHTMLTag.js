
/**
 * 获取当前页面总共用到了多少种 HTML 标签的方法
 * @return {Array} res  测试数组
 */
function getBodyDistinctHTMLTag() {
    //第一步通过通用选择器找到页面所有标签对象
    let allDomObj = document.querySelectorAll('*');
    //第二步将从宿主对象中获取的dom伪数组通过点展开符转换为真实数组，并且只保留tagName
    //并且考虑有的标签是大写有的是小写，统一转换成小写
    allDomObj = [...allDomObj].map(el => el.tagName.toLowerCase());
    //第三步通过Set进行去重
    let distinctDomSet = new Set(allDomObj);
    return distinctDomSet.size;
}

console.log(getBodyDistinctHTMLTag());