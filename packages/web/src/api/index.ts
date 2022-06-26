import { get, post } from '../utils/flyio'
export function GetUserInfo(params = {}, config = {}) {
  return get({
    url: '/user/info',
    params,
    config,
  })
}
export function Login(params = {}, config = {}) {
  return post({
    url: '/pub/login',
    params,
    config,
  })
}
