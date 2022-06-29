# BLOG
## 前言
基于springboot与vue开发的多人博客平台
## 前端技术栈
js,vue,vuex,elementui,git,nginx
## 文件目录
src<br />
├─api 所有接口均封装在该目录下的index.js中<br />
├─assets 静态资源<br />
├─components 封装的组件<br />
├─router 路由、全局前置守卫<br />
├─store	vuex<br />
├─utils	封装的request.js<br />
└─views	页面文件<br />
## 开发期间遇到的BUG
* 请求接口的跨域
* 前端服务器部署时的跨域
* 登录状态保持
* axios中get,post的传参
* router的传参问题(name,path)
* 不同组件间的传参(eventBus,props,$emit)
* 前端图片文件显示问题(blob...)
* elementUI传参问题(底部导航栏传参...)
* 删除文章时的组件销毁及页面强制刷新
* v-for与v-if的先后执行顺序
* 事件修饰符.native
* 图片id过长,js爆Number
* 侧边栏数据监听(watch)
* articleItem组件的文字省略(-webkit-box)
* 登录注册时,账号密码校验
* articleItem组件的图片随机展示
* console.log打印内容与后端返回数据不一致
