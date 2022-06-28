import Vue from 'vue'
import Vuex from 'vuex'
 
//1.安装插件
Vue.use(Vuex)
 
//2.创建对象
const store = new Vuex.Store({
  state:{
    logined: 0 ,
    userId: null ,
    onesay:'',
    total:0,
    imgId: 'default_img.jpg',
    username:''
  },
  mutations:{
    changelogin(state,temp){
      state.logined = temp
    },

    changeUserId(state,id){
      state.userId = id
    },

    changeTotal(state,sum){
      state.total = Number(sum)
    },

    changeImgId(state,imgid){
      state.imgId = imgid
    },
    
    getOnesay(state,said){
      state.onesay = said
    },

    logout(state){
      state.logined = 0,
      state.userId = null,
      state.total = 0,
      state.imgId = 'default_img.jpg'
    },

    changeUsername(state,user){
      state.username = user
    }
  },
  actions:{
 
  },
  getters:{
 
  },
  modules:{
    
  }
})
//3.导出使用
export default store