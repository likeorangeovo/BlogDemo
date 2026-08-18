import request from "@/utils/request.js";
export const register = (params) => request({
  url:'/user/register',
  data:params,
  method:'post',
  headers:{
    'content-type':'application/json'
  }
})