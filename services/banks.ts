import { request } from '../lib/request';
import Config from '../lib/config';
const { api } = Config
const { banks } = api


export async function query (params) {
  return request({
    url: banks,
    method: 'get',
    data: params,
  })
}

export async function queryByTag(params){
  return request({
    url: "/banktags" + "/" + params.tag  + '/banks',
    method:'get',
    data:params
  })
}

export async function queryAllTags(){
  return request({
    url: "/banktags",
    method:'get',
  })
}