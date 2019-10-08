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

```

## 演示地址
点击打开下方链接，进入开发者模式，调整为手机模式查看。  

[演示链接](https://alan147258.gitee.io/musicapp)

## 介绍
### 页面
1. 首页-发现页面
2. 首页-我的页面
3. 首页-好友页面
4. 首页-视频页面
5. 账户中心页
6. 歌曲列表页
7. 歌曲播放页
8. 歌单广场页
9. 歌单详情页
10. 搜索页
11. 底部当前播放列表页  

### 页面截图  

<img src="./static/images/screenshot/find.jpg" style="width:300px;height:533px;">
<img src="./static/images/screenshot/my.jpg" style="width:300px;height:533px;">
<img src="./static/images/screenshot/friend.jpg" style="width:300px;height:533px;">
<img src="./static/images/screenshot/video.jpg" style="width:300px;height:533px;">
<img src="./static/images/screenshot/account.jpg" style="width:300px;height:533px;">
<img src="./static/images/screenshot/menu.jpg" style="width:300px;height:533px;">
<img src="./static/images/screenshot/play.jpg" style="width:300px;height:533px;">
<img src="./static/images/screenshot/playList.jpg" style="width:300px;height:533px;">
<img src="./static/images/screenshot/playListDetail.jpg" style="width:300px;height:533px;">
<img src="./static/images/screenshot/search.jpg" style="width:300px;height:533px;">
<img src="./static/images/screenshot/search-result.jpg" style="width:300px;height:533px;">
<img src="./static/images/screenshot/bottom-list-play.jpg" style="width:300px;height:533px;">

## 优化记录
> 1. `(ok)`丰富本地mock数据，使项目在没有网易云api接口的情况下依然正常运行，最好可以自动判断运行环境，本地开发使用接口，线上使用mock（ajax-mock.js中import()实现前端动态加载mock数据）；  
> 2. `(ok)`play歌曲播放页架构优化，现在架构较为混乱，代码耦合性较高；  
> 3. `(ok)`当前还未使用vuex，计划使用vuex优化组件建通信和状态管理；  
> 4. `(ok)`评论页面、搜索页面；  
> 5. `(ok)`历史记录优化，由于现在歌曲播放页和列表页使用的方案是fixed布局，还不能与历史记录返回上一步相结合；  
> 6. `(ok)`ui框架逐步用移动端ui框架vant替换element-ui；  
> 7. `(ok)`生产环节打包，放置于github.io上访问测试；**怎么发上线？前端路由问题**
> 8.  `(ok)`webpack打包时自动搬运静态文件到static目录下；  
> 9. `(ok)`图片和长列表懒加载(视频页下拉刷新ok)
>    * `(ok)`骨架屏占位
>    * 1px边框问题、
>    * 横屏问题、
>    * 设备判断及兼容、
>    *  `(ok)`css实现在overflow时超出部分显示省略号... 
> 10. 整理移动端常见问题及解决方案；  
> 11.  `(ok)`本地移动端开发，可实时在手机上测试（静态页面可以，如何解决页面请求不到数据问题？）；
> 12. 缓存，前进刷新，后退不刷新
> 13. 使用slot插槽优化，能否抽象出常用组件，容器组件等
> 14. `(ok)`子路由刷新报404（服务器设置所有带music路径的请求都只想本项目的index.html，路由使用哈希模式）
