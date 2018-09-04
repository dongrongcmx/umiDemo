/*
 * @Author: yewei 
 * @Date: 2018-04-28 10:18:29 
 * @Last Modified by: yewei
 * @Last Modified time: 2018-05-30 14:08:09
 * 
 * 权限路由
 * 如果未登录，则重定向到登录页
 */
import React from 'react';
import { Route } from 'react-router-dom';
import Redirect from 'umi/redirect';
import store from 'store2';

export default args => {
    const { render, ...rest } = args;

    const checkUserInfo = store.get('user'); // 检查本地是否有用户信息

    const userId = checkUserInfo && checkUserInfo.user_id; // TODO: user_id 字段

    return (
        <Route
            {...rest}
            render={props =>
                userId ? render(props) : <Redirect to="/Test/" />
            }
        />
    );
};
