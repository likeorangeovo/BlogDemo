import request from "@/utils/request.js";
export const timeLine = (params) => request({
  url:'/blog/blogTime',
  params,
  method:'get'
})