# 整合了运营和巡视APP, 基于H5开发，主要运行在微信浏览器

> 核心技术栈: react + umi(工具 + 路由) + dva(数据) + antd<-mobile>(视图); 其它技术栈: yarn(依赖管理) + ES6,7,8 + eslint + webpack + babel(高级语法糖 => es5)

## How to use

1. 开发环境

```
npm | yarn run start
```

2. 生产环境

```
npm | yarn run build
```

## Config Path

> 配置环境变量. exp(改变默认端口): `$ PORT=3000 umi dev`; 为了方便起见，可以在package.json中配置script
1. 配置 html 所在的根路径，用于给 react-router 的 basename，以及加载 service-worker.js 用

```
$ BASE_URL=test umi build
```
2. 默认关闭。分析 bundle 构成，build 时有效

```
ANALYZE=1 umi build
```
3. 默认进行 eslint 校验，值为 none 时不校验

```
ESLINT=none umi dev
```

## Functional lib

* 图片懒加载 => img-2
* CSS IN JS => glamorous
* 本地持久化存储 => store2
* 随机字符串 => randexp
* http服务 => axios
* 动画 => react-pose、react-motion
* 路由切换 => react-transition-group

## Attention

* 在开发过程中最好使用Eslint，否则如果有不符合Eslint规则的代码，会打包失败 | 在打包前开启带有Eslint的开发环境(`yarn run starte`)，Fix不符合规则的代码，然后再打包

* build 后访问路由刷新后 404?

几个方案供选择:
1. 改用 hashHistory，在 .umirc.js 里配 hashHistory: true
2. 静态化，在 .umirc.js 里配 exportStatic: true
3. 服务端配置路由 fallback 到 index.html

* git提交时会触发pre-commit，对将要提交的代码进行lint，如果不想lint，可以`git commit --no-verify`(使用sourcetree可在提交选项选择跳过提交钩子)

* 路由过滤 

在pages下组织文件，某些文件是不需要添加到路由的，可以通过 umi-plugin-routes 插件进行排除

* model中对接口返回进行处理

如果有异常，不会返回任何数据，如需对特别异常进行处理，可返回特定的异常数据，该异常数据在业务处理前进行处理

业务处理成功或者失败都会返回接口所有数据，在model中需要根据code作相应的处理(成功 => '20000', 失败 => '20001')

*业务处理失败*
大部分业务场景只需要toast提示，而这个在底层已经作了处理，在model层需要判断业务处理是否成功，只对成功的执行`hideLoading()`，否则会看不到toast提示

有些业务场景页面已经作了失败的提示处理，所以不需要toast，这时候可以统一进行`hideLoading()`

业务处理成功如果想要toast提示，将`hideLoading()`替换成`showSuccessToast()`即可

* 切图统一使用svg格式

* 有些场景下toast提示闪了一下就消失了，是因为接着请求了接口，将这个覆盖了，可以通过设置延时器让toast显示完再进行其它操作