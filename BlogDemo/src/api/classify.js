import request from "@/utils/request.js";
export const classify = () => request({
  url:'/category/list',
  method:'get'
})