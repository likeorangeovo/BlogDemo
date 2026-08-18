import request from "@/utils/request.js";
export const follow = () => request({
  url:'/follow/list',
  method:'get'
})
export const followUser = (hostUserId) => request({
  url:`/follow/add/${hostUserId}`,
  method:'get'
})
export const unfollowUser = (hostUserId) => request({
  url:`/follow/remove/${hostUserId}`,
  method:'get'
})