/*
 * @Author: yewei 
 * @Date: 2018-04-11 17:12:19 
 * @Last Modified by: 孙传文
 * @Last Modified time: 2018-06-09 17:58:54
 * 
 * 常用的工具方法
 */
import store from 'store2';
import { Base64 } from 'js-base64';
//  判断是否是安卓平台
export const isAndroid = () => {
    const userAgent = navigator.userAgent;
    const isAndroid =
        userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1;

    return isAndroid;
};

// 判断是否是微信
export const isWexin = () => {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
};

// 判断是否是支付宝
export const isAlipay = () => {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/AlipayClient/i) == 'alipayclient') {
        return true;
    } else {
        return false;
    }
};

// 延时器 -- 主要用于接口返回后需要toast提示，然后接着会请求其它接口，在这之前使用延时器让toast完成提示后再请求
export const delay = time => {
    let timer = null;
    clearTimeout(timer);
    return new Promise(resolve => {
        timer = setTimeout(resolve, time);
    });
};
// 获取地址栏所带参数 -- 暂时主要用于用户授权同意之后回调获取code码
export const getQueryString = name => {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};
// 按照参数字母生序排序 -- 主要用于生成签名
export const mapUtils = {
    keySet(map) {
        var keySet = [];
        for (var item in map) {
            keySet.push(item);
        }
        return keySet;
    },
    getSignText(map) {
        var signArr = [];
        var keySet = this.keySet(map);
        keySet.sort();
        for (var i = 0; i < keySet.length; i++) {
            var key = keySet[i];
            signArr.push('&');
            signArr.push(key);
            signArr.push('=');
            signArr.push(map[key]);
        }
        signArr.splice(0, 1);
        return signArr.join('');
    },
    getSign(params) {
        let paramsNotEmpty = {};
        for (let key in params) {
            let val = params[key];
            if (val !== '' && val !== null && val !== undefined) {
                paramsNotEmpty[key] = val;
            }
        }
        let signStr = this.getSignText(paramsNotEmpty);
        console.log(signStr);
        let ukey = store.get('ukey');
        const md5 = require('blueimp-md5');
        let sign = Base64.encode(md5(md5(ukey) + signStr));
        return sign;
    }
};
// 金额格式化
export const fmoney = (s, n) => {
    let result;
    n = n > 0 && n <= 20 ? n : 2;
    s = `${parseFloat(`${s}`.replace(/[^\d.-]/g, '')).toFixed(n)}`;
    let l = s
            .split('.')[0]
            .split('')
            .reverse(),
        r = s.split('.')[1];
    let t = '';
    for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? ',' : '');
    }
    result = `${t
        .split('')
        .reverse()
        .join('')}.${r}`;

    if (result != 0 && !parseInt(result, 10)) {
        // 当为负数的时候，将, 替换成空
        result = result.replace(',', '');
    }

    return result;
};

export const addChangeData = {
    addSelectValue(mapArr) {
        for (let i = 0; i < mapArr.length; i++) {
            mapArr[i] = {
                ...mapArr[i],
                isSelectItem: 0
            };
            if (mapArr[i].children.length > 0) {
                this.addSelectValue(mapArr[i].children);
            }
        }
        return mapArr;
    },
    addSearchValue(mapArr, keyStr) {
        let strArr = [];
        let keyStrArr = this.addSearchJudgeValue(mapArr, keyStr, strArr);
        // for (let i = 0; i < mapArr.length; i++) {
        //     if (mapArr[i].text.indexOf(keyStr) >= 0) {
        //         keyStrArr.push(mapArr[i]);
        //     }
        //     if (mapArr[i].children.length > 0) {
        //         // this.addSelectValue(mapArr[i].children);
        //     }
        // }
        return keyStrArr;
    },
    addSearchJudgeValue(mapArr, keyStr, strArr) {
        // var strArr = [];
        for (let i = 0; i < mapArr.length; i++) {
            if (mapArr[i].text.indexOf(keyStr) >= 0) {
                strArr.push(mapArr[i]);
            }
            if (mapArr[i].children.length > 0) {
                this.addSearchJudgeValue(mapArr[i].children, keyStr, strArr);
            }
        }
        return strArr;
    },

    addCheckedValue(mapArr, item) {
        for (let i = 0; i < mapArr.length; i++) {
            if (item.id === mapArr[i].id) {
                return mapArr[i];
            }
            if (mapArr[i].children.length > 0) {
                this.addCheckedValue(mapArr[i].children);
            }
        }
        return [];
    }
};
