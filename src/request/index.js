//进行axios二次封装:使用请求与响应拦截器
import axios from "axios";

//1.创建axios实例
const request = axios.create({
  baseURL: "http://123.207.32.32:8000",
  timeout: 5000
});

//添加请求拦截器
request.interceptors.request.use((config) => {
  //通过请求头向服务器携带token
  //config配置对象,headers属性请求头,给服务器端携带公共参数(token)
  config.headers.token = window.localStorage.token;
  //返回配置对象
  return config;
});

//响应拦截器
request.interceptors.response.use(
  (response) => {
    //成功的回调
    //简化数据
    return response.data;
  },
  (error) => {
    //失败的回调:处理http网络错误
    console.log(error);
    return Promise.reject(error);
  }
);

//对外暴露
export default request;
