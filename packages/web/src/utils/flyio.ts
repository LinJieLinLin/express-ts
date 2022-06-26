/**
 * @description flyio config
 */
import fly from 'flyio'
import { toast } from 'react-toastify'
import { IReqData, IRes } from '../types/common'
import { Msg } from './msg'

// let noToast = false
// let toast = (...argData: any[]) => {
//   if (noToast) {
//     return
//   }
//   setTimeout(() => {
//     // Toast(...argData)
//   }, 320)
// }
const suCode = ',0,1,'
fly.config.timeout = Number(process.env.REACT_APP_TIMEOUT) || 10000
fly.config.baseURL =
  process.env.REACT_APP_API_URL || 'http://localhost:3000/api'

fly.interceptors.request.use((request: any) => {
  // console.debug('request：', request)
  request.headers['tk'] = localStorage.getItem('tk')
  return request
})
fly.interceptors.response.use(
  async (response) => {
    // console.debug('response：', response)
    const res: IRes = response.data
    if (suCode.match(',' + res.code + ',')) {
      if (res.code === 1) {
        toast(Msg[1])
      }
      if (res?.token) {
        localStorage.setItem('tk', '.web.' + res.token)
      }
      return res.data
    }
    const msg = res.msg || Msg[res.code]
    msg && toast(msg)
    return Promise.reject(res)
  },
  async (err: any) => {
    if (err && err.message && err.message.match('timeout')) {
      toast('timeout!')
      return Promise.reject(err)
    }
    switch (err.status) {
      case 401:
        window.location.href = '#/login'
        break
      default:
        toast('server error, please try again later')
        console.debug('unknown error:', err)
        break
    }
    return Promise.reject(err)
  }
)
export const request = async (argData: IReqData) => {
  if (!argData) {
    return
  }
  return fly.request(argData.url, argData.params, {
    method: argData.method,
    config: argData.config,
  } as any)
}
export const post = (argData: IReqData) => {
  argData.method = 'post'
  return request(argData)
}
export const get = (argData: IReqData) => {
  argData.method = 'get'
  return request(argData)
}

export default fly
