/*
 * @Author: yewei 
 * @Date: 2018-02-02 10:25:02 
 * @Last Modified by: yewei
 * @Last Modified time: 2018-05-31 10:35:22
 * 
 * 微信jssdk的相关使用
 */
import wx from 'weixin-js-sdk';

import { checkJSSDK } from '../services/wxService';
import {
    showToast,
    showLoading,
    hideLoading
} from '../components/commons/LightToast';

// 验证jssdk，加载完成后调用scan方法
const wxUtils = () => {
    showLoading();
    checkJSSDK()
        .then(data => {
            const result = data.result;
            wx.config({
                debug: false, // TODO: 测试阶段使用
                appId: result.appId,
                timestamp: result.timestamp,
                nonceStr: result.nonceStr,
                signature: result.signature,
                jsApiList: [
                    'hideMenuItems',
                    'onMenuShareAppMessage',
                    'scanQRCode',
                    'getLocation'
                ]
            });

            hideLoading();

            wxReady();
        })
        .catch(error => {
            console.log(error);
        });
};

// 微信jssdk加载完成
const wxReady = () => {
    wx.ready(() => {
        wx.hideMenuItems({
            menuList: [
                'menuItem:share:timeline', // 分享给朋友圈
                'menuItem:share:qq', // 分享到QQ
                'menuItem:share:weiboApp', // 分享到Weibo
                'menuItem:favorite', // 收藏
                'menuItem:share:QZone', // 分享到 QQ 空间
                'menuItem:copyUrl', // 复制链接
                'menuItem:openWithQQBrowser', // 在QQ浏览器中打开
                'menuItem:openWithSafari', // 在Safari中打开
                'menuItem:share:email', // 邮件
                'menuItem:readMode', // 阅读模式
                'menuItem:originPage' // 原网页
            ] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        });

        // wx.getLocation({
        //     success: function(res) {
        //         alert(JSON.stringify(res));
        //     },
        //     cancel: function(res) {
        //         alert('用户拒绝授权获取地理位置');
        //     }
        // });
        // qrScan();
    });
};

// 扫码
const qrScan = (needResult = 1) => {
    return new Promise((resolve, reject) => {
        wx.scanQRCode({
            needResult: needResult, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
            success: response => {
                // 当needResult 为 1 时，扫码返回的结果
                resolve(response);
            },
            fail: err => {
                reject(err);
                showToast('请在微信环境下进行扫码操作！');
            }
        });
    });
};

// 获取地理位置
const getLocation = () => {
    return new Promise((resolve, reject) => {
        wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: response => {
                resolve(response);
            },
            fail: err => {
                reject(err);
            }
        });
    });
};

// 进行微信授权
const wxAuth = wxAuthConfig => {
    // const { user } = this.props;
    // const { wxAuthConfig } = user;
    // const { appId, redirectUri, responseType } = wxAuthConfig;
    window.href =
        'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
        wxAuthConfig.appId +
        '&redirect_uri=' +
        wxAuthConfig.redirectUri +
        '&response_type=' +
        wxAuthConfig.responseType +
        '&scope=snsapi_userinfo' +
        '&state=saash5#wechat_redirect';
    // return new Promise(() => {
    //     // getAppid()
    //     //     .then(response => {
    //     //         console.log(response);
    //     //         resolve(response);
    //     //     })
    //     //     .catch(error => {
    //     //         console.log(error);
    //     //         reject(error);
    //     //     });
    // });
};

export { qrScan, wxAuth, getLocation };
export default wxUtils;
