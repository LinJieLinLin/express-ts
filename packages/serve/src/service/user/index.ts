import { IUsername } from './types'
import config from 'config'
import { GetCacheData, SetCacheData } from '../../utils/index'
import User, { IUser } from '../../models/User'
import bcrypt from 'bcryptjs'

export const FindUser = async (uid: string) => {
  if (!uid) {
    return null
  }
  const user = await User.findById(uid).select('-password')
  if (!user) {
    return null
  }
  return user
}

export const CheckUser = async (userInfo: IUser) => {
  const cacheUser: IUsername = GetCacheData('username.' + userInfo?.username, {
    errorRecord: [],
    lockDate: 0,
  })
  // check is it lock
  const now = Date.now()
  if (cacheUser.lockDate - now > 0) {
    return Promise.reject(1000)
  }

  const { username, password } = userInfo
  try {
    let user = await User.findOne({ username })
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password)
      // check 5min 3 error
      if (!isMatch) {
        cacheUser.errorRecord.push(now)
        SetCacheData('username.' + userInfo?.username, cacheUser)
        const last5Min = now - 5 * 60 * 1000
        const temLen = cacheUser.errorRecord.length || 0
        if (temLen > 3 && cacheUser.errorRecord[temLen - 1] > last5Min) {
          cacheUser.lockDate =
            now + Number(config.get('lockExpiration') || 1) * 1000
          cacheUser.errorRecord = []
          SetCacheData('username.' + userInfo?.username, cacheUser)
          return Promise.reject(1000)
        }
        return Promise.reject(1001)
      } else {
        return user
      }
    } else {
      return null
    }
  } catch (e) {
    return Promise.reject(1003)
  }
}

export const CreateUser = async (userInfo: IUser, ip: string) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(userInfo.password, salt)
    userInfo.password = hashed
    userInfo.ip = ip
    const newUser = new User(userInfo)
    await newUser.save()
    return newUser
  } catch (e) {
    return Promise.reject(e)
  }
}
