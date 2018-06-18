import { request } from '../lib/request'
import Config from '../lib/config';
const { api } = Config
const { userLogin ,userRegister} = api

export function requestLogin (data) {
  return request({
    url: userLogin,
    method: 'post',
    data,
  })
}

export function requestRegister (data) {
  return request({
    url: userRegister,
    method: 'post',
    data,
  })
}
