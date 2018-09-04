/*
 * @Author: yewei 
 * @Date: 2018-04-28 13:55:41 
 * @Last Modified by: yewei
 * @Last Modified time: 2018-06-06 10:11:27
 * 
 * umi配置文件
 * 配置插件、权限路由
 */

const authPages = {};

const paths = [
    '/',
    '/Test/Hello'
];

paths.map((value, key) => {
    authPages[value] = { Route: './src/routes/PrivateRoute.js' };
});

export default {
    exportStatic: {},
    plugins: [
        'umi-plugin-dva',
        [
            'umi-plugin-routes',
            {
                exclude: [/Main/, /components/]
            }
        ]
    ],
    pages: authPages // 配置权限路由
};
