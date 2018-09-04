/*
 * @Author: yewei 
 * @Date: 2018-01-30 15:43:46 
 * @Last Modified by: yewei
 * @Last Modified time: 2018-06-12 15:18:19
 * 
 * 对axio进行二次封装
 */

import axios from 'axios';
import store from 'store2';
import router from 'umi/router';

import { showFailToast } from '../components/commons/LightToast';
import serviceAddress from '../services/config/serverAddress';
// import { history } from '../router';

const hostName = serviceAddress.serviceIp; // 服务器地址
// const userInfo = store.get('users');
// const token = userInfo && userInfo.result.token;
const headers = {
    // 'Content-Type': 'application/x-www-form-urlencoded'
    Accept: 'application/json',
    'Content-Type': 'application/json'
};
// if (token) {
//     headers.token = token;
// }

const instance = axios.create({
    baseURL: hostName,
    timeout: 35000, // 超时时间
    headers: headers
    // transformRequest: [
    //     function(data) {
    //         // Do whatever you want to transform the data
    //         // form data形式
    //         let ret = '';
    //         for (let it in data) {
    //             ret +=
    //                 encodeURIComponent(it) +
    //                 '=' +
    //                 encodeURIComponent(data[it]) +
    //                 '&';
    //         }

    //         return ret;
    //     }
    // ]
    // withCredentials: true
});

/**
 * get方法
 *
 * @export
 * @param {any} url
 * @param {any} [params={}]
 * @returns
 */
export function axiosGet(url, params) {
    getNewToken();

    return new Promise((resolve, reject) => {
        instance
            .get(url, params)
            .then(function(response) {
                const data = response.data;
                parseData(data, resolve, reject);
            })
            .catch(function(error) {
                parseError(error, reject);
            });
    });
}

/**
 * post方法
 *
 * @export
 * @param {any} url
 * @param {any} [params={}]
 * @returns
 */
export function axiosPost(url, params, isFailToast) {
    getNewToken();

    return new Promise((resolve, reject) => {
        instance
            .post(url, params)
            .then(function(response) {
                const data = response.data;
                parseData(data, resolve, reject, isFailToast);
            })
            .catch(function(error) {
                parseError(error, reject);
            });
    });
}

/**
 * 统一处理异步请求返回的数据
 * 判断code
 * 有token失效、逻辑性错误等
 *
 * @param {any} data
 * @param {any} isReturnAll 返回所有数据，不作code0/1校验
 */
async function parseData(data, resolve, reject, isShowToast = true) {
    const code = data.code;
    const result = data.result;

    switch (code) {
        case '20000': // 请求成功
            resolve(data); // 返回所有数据(根据code进行判断是否有数据然后再数据处理)
            break;
        case '20001': // 业务处理失败
            if (isShowToast) {
                showFailToast(result.subMsg);
            }
            resolve(data);
            break;
        case '40100': // 客户端请求需要用户的身份认证
        case '40101': // 客户端身份认证访问令牌已过期
        case '40102': // 重复的身份认证
        case '40103': // 客户端身份认证访问令牌无效
            // 提示并重新登录
            showFailToast(result.subMsg);
            store.clear('users'); // 清除用户信息缓存
            router.push('/user/login');
            reject();
            break;
        default:
            showFailToast(result.subMsg); // 一般错误错误 => 给toast提示
            reject();
            break;
    }
}

/**
 * 解析特殊性错误
 * 例如请求超时等等
 * TODO: 请求超时后重发或其它处理
 *
 * @param {any} data
 * @param {any} reject
 */
function parseError(error, reject) {
    const message =
        error.message.indexOf('timeout') === -1 ? error.message : 'timeout';

    let tipMessage = ``;

    switch (message) {
        case 'timeout':
            tipMessage = `请求超时`;
            break;
        case 'Network Error':
            tipMessage = `网络异常`;
            break;
        default:
            tipMessage = error.message;
            break;
    }

    tipMessage && showFailToast(tipMessage);

    reject();
}

/**
 * 在header中设置存在localstorage中的token
 *
 */
function getNewToken() {
    const userInfo = store.get('user');
    const token = userInfo && userInfo.token; // TODO: 检验存储token的key值

    if (token) {
        instance.defaults.headers.common['token'] = token;
    }
}
