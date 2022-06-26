import request from "@/utils/request.js";
export const showUser = (params) => request({
  url:'/user/show',
  params,
  method:'get'
})