import request from "@/utils/request.js";
export const logout = () => request({
  url:'/user/logout',
  method:'get'
})