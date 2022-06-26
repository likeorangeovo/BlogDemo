import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "@/views/Index.vue"
import Writerline from "@/views/Writerline.vue"
import Home from "@/views/Home.vue"
import Classify from "@/views/Classify.vue"
import Search from "@/views/Search.vue"
import Edit from "@/views/Edit.vue"
import Myarticle from "@/views/Myarticle.vue"
import Login from "@/views/Login.vue"
import Article from "@/views/Article.vue"
import Follow from "@/views/Follow.vue"
import store from '@/store/index.js'
import user from '@/views/Changeuser.vue'
import UserArticle from "@/views/UserArticle.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '',
    component: Index,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: Home
      },
      {
        path: 'timeline',
        name: 'timeline',
        component: Writerline
      },
      {
        path: 'classify',
        name: 'classify',
        component: Classify
      },
      {
        path: 'search',
        name: 'search',
        component: Search
      },
      {
        path: 'edit',
        name: 'edit',
        component: Edit
      },
      {
        path: 'myarticle',
        name: 'myarticle',
        component: Myarticle
      },
      {
        path: 'article',
        name: 'article',
        component: Article
      },
      {
        path: 'follow',
        name: 'follow',
        component: Follow
      },
      {
        path: 'user',
        name: 'user',
        component: user
      },
      {
        path: 'userarticle',
        name: 'userarticle',
        component: UserArticle
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  let userInfo = JSON.parse(localStorage.getItem('userInfo'))
  if (null != userInfo) {
    store.commit('changelogin', 1);
    store.commit("changeUserId", userInfo.id);
    store.commit('changeTotal', localStorage.getItem('total'));
    store.commit('changeImgId',userInfo.icon)
  }
  if (store.state.logined === 0) {
    if (to.path === '/home' || to.path === '/article' || to.path === '/classify') {
      next()
      // console.log(11111) 
    }
    else if (to.path === '/login') {
      // console.log(22222) 
      next()
    }
    else {
      // console.log(33333)
      next('/login')
    }
  }
  else {
    next()
  }
});
export default router
