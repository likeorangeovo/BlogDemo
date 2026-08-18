import request from "@/utils/request.js";
export const requestArticle = (params) => request({
  url:'/blog/list',
  params,
  method:'get'
  
})
export const updateArticle = (params) => request({
  url:'/blog/update',
  data: params,
  method:'post',
  headers:{'content-type':'application/json'}
})

export const addArticle = (params) => request({
  url:'/blog/add',
  data: params,
  method:'post',
  headers:{'content-type':'application/json'}
})

export const deleteArticle = (params) => request({
  url:'/blog/delete',
  params,
  method:'get'
})

export const getCommentlist = (params) => request({
  url:'/comment/list',
  params,
  method:'get'
})

export const addComment = (params) => request({
  url:'/comment/add',
  data:params,
  method:'post',
  headers:{'content-type':'application/json'}
})