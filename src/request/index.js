import axios from "axios";
import globalConfig from "@/config/index";
import md5 from "js-md5";

//1.创建axios实例（baseURL,timeout,header,responseType）
const request = axios.create({
  baseURL: "http://123.207.32.32:8000",
  timeout: 5000,
  responseType: "json",
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  }
});

const pendingRequests = new Map(); // 存储进行中的请求,用于存储正在进行的请求。每个请求都会生成一个唯一的 requestKey

//添加请求拦截器
request.interceptors.request.use(
  (config) => {
    const requestKey = `${config.url}_${config.method}_${JSON.stringify(
      config.params || config.data
    )}`;

    //  在请求发出前检查 pendingRequests 中是否已有相同的 requestKey，如果有，则拒绝新请求
    if (pendingRequests.has(requestKey)) {
      return Promise.reject(new Error("请求正在处理中，请勿重复提交"));
    }

    pendingRequests.set(requestKey, true); // 锁定请求

    let token = window.localStorage.getItem("token");
    if (token) {
      config.headers.token = token;
    }

    let _secret = md5(globalConfig.secretId + new Date().toString());
    config.headers.secret = _secret;

    return config;
  },
  (error) => {
    return Promise.reject(new Error(error));
  }
);

//响应拦截器
request.interceptors.response.use(
  (response) => {
    const requestKey = `${response.config.url}_${
      response.config.method
    }_${JSON.stringify(response.config.params || response.config.data)}`;
    pendingRequests.delete(requestKey); // 解锁请求

    const status = response.data.code || 200;
    const message = response.data.message || "未知错误";
    if (status === 401) {
      alert("登录过期，请重新登录");
      // 跳转到登录页面
    } else if (status !== 200) {
      alert(message);
      return Promise.reject(new Error(message));
    }
    return response;
  },
  (error) => {
    const requestKey = `${error.config.url}_${
      error.config.method
    }_${JSON.stringify(error.config.params || error.config.data)}`;
    pendingRequests.delete(requestKey); // 解锁请求
    console.log(error);
    return Promise.reject(error);
  }
);

//对外暴露
export default request;
