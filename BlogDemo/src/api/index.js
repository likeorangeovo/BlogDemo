import { LoginBlog } from "./Login";
import { requestArticle,updateArticle,addArticle,deleteArticle,getCommentlist,addComment } from "./article";
import { Onesay } from "./onesay.js";
import { timeLine } from "./timeline";
import { register } from "./register";
import { logout } from "./logout";
import { classify } from "./classify";
import {follow} from './follow.js'
import {followUser} from './follow.js'
import {unfollowUser} from './follow.js'
import { load } from "./load";
import { updateUser } from "./updateUser";
import {showUser } from "./show"
import { search } from "./search";
export const LoginBlogApi = LoginBlog;
export const requestArticleApi = requestArticle;
export const OnesayApi = Onesay;
export const timeLineApi = timeLine;
export const registerApi = register;
export const logOutApi = logout;
export const classifyApi = classify;
export const followApi = follow;
export const followUserApi = followUser;
export const unfollowUserApi = unfollowUser;
export const loadApi = load;
export const updateUserApi = updateUser;
export const showUserApi = showUser;
export const updateArticleApi = updateArticle;
export const addArticleApi = addArticle;
export const deleteArticleApi = deleteArticle;
export const getCommentlistApi = getCommentlist;
export const addCommentApi = addComment;
export const searchApi = search;