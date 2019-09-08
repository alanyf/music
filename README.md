# music

> A Vue.js project

## 说明

### 一、本地启动网易云音乐的接口服务
接口文档：https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=neteasecloudmusicapi
``` bash
git clone https://github.com/Binaryify/NeteaseCloudMusicApi

cd NeteaseCloudMusicApi

npm install

node app.js
```
### 二、启动项目
``` bash

git clone https://github.com/**

cd **

# install dependencies
npm install

# serve with hot reload at localhost:8081
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 优化计划
> 1. `(ok)`丰富本地mock数据，使项目在没有网易云api接口的情况下依然正常运行，最好可以自动判断运行环境，本地开发使用接口，线上使用mock；  
> 2. `(ok)`play歌曲播放页架构优化，现在架构较为混乱，代码耦合性较高；  
> 3. `(ok)`当前还未使用vuex，计划使用vuex优化组件建通信和状态管理；  
> 4. `(ok)`评论页面、搜索页面；  
> 5. `(ok)`历史记录优化，由于现在歌曲播放页和列表页使用的方案是fixed布局，还不能与历史记录返回上一步相结合；  
> 6. `(ok)`ui框架逐步用移动端ui框架vant替换element-ui；  
> 7. 生产环节打包，放置于github.io上访问测试；**怎么发上线？前端路由问题**
> 8. webpack打包时自动搬运静态文件到static目录下；  
> 9. `(ok)`图片和长列表懒加载(视频页下拉刷新ok)
>    * `(ok)`骨架屏占位
>    * 1px边框问题、
>    * 横屏问题、
>    * 设备判断及兼容、
>    *  `(ok)`css实现在overflow时超出部分显示省略号... 
> 10. 整理移动端常见问题及解决方案；  
> 11. 本地移动端开发，可实时在手机上测试（静态页面可以，如何解决页面请求不到数据问题？）；  
> 12. 缓存，前进刷新，后退不刷新
> 13. 使用slot插槽优化，能否抽象出常用组件，容器组件等
> 14. `(ok)`子路由刷新报404（服务器设置所有带music路径的请求都只想本项目的index.html）


