import axios from 'axios';
import qs from 'qs';
import isEmpty  from 'lodash.isempty';
import { getToken } from './jwtToken';
import Config from './config';

//这里再添加一个设置函数
let http = axios.create({
  baseURL: Config.baseURL,
  timeout: 1000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
})

let errorCallback: Function = () =>{};
let successCallback: Function = () =>{};

if ( getToken() ) {
  http.defaults.headers.common['Authorization'] = 'Bearer ' + getToken()
}

http.interceptors.request.use(function (config) {
    if ( getToken() ) {
      http.defaults.headers.common['Authorization'] = 'Bearer ' +getToken()
    }

    return config
  }, function (error) {
    return Promise.reject(error)
});

const fetch = (options) => {
  let {
    method = 'get',
    data,
    url,
  } = options

  switch (method.toLowerCase()) {
    case 'get':
      return http.get(`${url}${!isEmpty(data) ? `?${qs.stringify(data)}` : ''}`)
    case 'delete':
      return http.delete(url, { data })
    case 'head':
      return http.head(url, data)
    case 'post':
      return http.post(url, data)
    case 'put':
      return http.put(url, data)
    case 'patch':
      return http.patch(url, data)
    default:
      return http(options)
  }
}

//registerErrorCallback : 当请求失失败时，调用错误回调
export function registerErrorCallback(callback: Function){
  errorCallback = callback
}

//registerSuccessCallback : 当请求失成功时，调用成功回调
export function registerSuccessCallback(callback: Function){
  successCallback = callback
}


export function setHttpBaseUrl(domain,apiPrefix){
    http.defaults.baseURL = "http://" + domain + apiPrefix
}

export async function request (options) {
  return fetch(options).then((response) => {
    console.log("request response:",response);
    
    const { message, code } = response.data
    let data = response.data
    let status = null 
    if ( code > 10400 ){
       status = { success: false, status:code, message }
    }else {
      status = {
        success: true,
        message,
        status:code,
        ...data,
      }
    }
    
    successCallback(status)

    return status 

  }).catch((error) => {
    console.log("request error: ", error);
    
    const { response } = error
    let message
    let returnStatus = null 
    if (response) {
      const { status, data, statusText } = response
      message = data.message || statusText
      returnStatus = { success: false,status , message }
    } else {
      returnStatus = { success: false, status:600 , message :'Network Error'}
    }
    
    errorCallback(returnStatus)

    return returnStatus
  })
}
