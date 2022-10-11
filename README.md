# BLOG
## 前言
基于springboot/node与vue开发的多人博客平台<br />
后端：[springboot](https://github.com/gqd000/OurBlog)/[node](https://github.com/1664635775/BlogApi)
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

## 实现的功能
1. 登录、注册
  前置守卫和localstorage判断登录状态，已登录将相关信息存入vuex，未登录跳转至登录界面，登录时对非法字符进行过滤；注册，对非法字符进行过滤（做表单校验）

2. 首页文章推荐
  将文章按时间顺序、热度进行展示。（未实现：基于协同过滤的推荐）

3. 文章详情
  将主页面的文章信息通过路由传参，并进行展示

4. 写作时间轴排序
  通过用户id将文章信息按顺序展示，并传参给文章详情页

5. 文章分类
  通过文章的分类id进行树状展示，并传参给文章详情页

6. 写文章、修改文章
  将文章内容，用户id，分类id，标签id传给服务端，返回主页面时进行更新

7. 搜索文章
  通过数据库字段对文章内容，标题进行查询。（或通过搜索引擎部署查询）

8. 用户关注
  将相关用户id传给服务器端，通过session，对数据库增减

9. 用户界面展示
  通过用户id请求信息，路由传参给侧边栏和articleItem

10. 个人信息修改
    表单校验，将图片上传后，使用window.URL.createObjectURL()进行展示

11. 用户权限限制
    路由守卫对未登录用户做浏览限制

12. 待优化

    图片懒加载，预加载preload，使用强缓存和协商缓存，建立持久连接(keep-alive),模块按需加载(import语法)

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
