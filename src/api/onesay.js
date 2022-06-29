import axios from "axios";
export const Onesay = axios.get('https://v1.hitokoto.cn?c=i&c=h&c=j', { withCredentials: false})
