import request from "@/utils/request.js";
export const load = (params) => request({
  url:'/file/download',
  params,
  method: 'get',
  responseType:'blob'
})