import { IRes } from 'types/common'
import { Request, Response } from 'express'
import { GetJwt } from './jwt'
import { IUsername } from 'service/user/types'
import { Msg } from './../msg'
import Log from './log'

interface ICacheObj {
  username: { [key: string]: IUsername }
}
const CacheObj: ICacheObj = {
  username: {},
}
export const ResJson = async (
  req: Request,
  res: Response,
  data: any,
  code = 0,
  msg = '',
  token = ''
) => {
  // auto cerate new token if token is expired
  if (!token && req.needNewToken) {
    delete req.tokenInfo.exp
    delete req.tokenInfo.iat
    token = GetJwt(req.tokenInfo)
  }
  // locked user tips
  if (code === 1000) {
    const min = Number(process.env.LOCK_EXPIRATION || 1) / 60
    msg = Msg[code] + `,Please try again in ${min} minutes`
  }
  const re: IRes = {
    code,
    data,
    msg,
    token,
  }
  return res.json(re)
}

export const SafeData = (
  argData: any,
  argCheck: string,
  argValue?: any,
  argSetValueForce?: boolean | 1 | 0
): any => {
  if (typeof argCheck !== 'string' && typeof argCheck !== 'number') {
    return ''
  }
  const temKey = argCheck.toString().split('.')
  const temLen = temKey.length
  if (!argData) {
    return argValue
  }
  if (temLen > 1) {
    for (let i = 0; i < temLen - 1; i++) {
      if (typeof argData[temKey[i]] !== 'object') {
        if (argSetValueForce) {
          Log.error(`${temKey[i]} is not object`)
        }
        return argValue
      }
      argData = argData[temKey[i]]
    }
  }
  if (argSetValueForce) {
    argData[temKey[temLen - 1]] = argValue
  }
  if (typeof argValue === 'undefined') {
    return argData[temKey[temLen - 1]]
  } else {
    return argData[temKey[temLen - 1]] || argValue
  }
}

export const GetCacheData = (key: string, value: any) => {
  return SafeData(CacheObj, key, value)
}

export const SetCacheData = (key: string, value: any) => {
  return SafeData(CacheObj, key, value, true)
}

export const Sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
