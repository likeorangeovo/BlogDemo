import request from "@/utils/request.js";
export const search = (params) => request({
  url:'/blog/search',
  params,
  method:'get'
})