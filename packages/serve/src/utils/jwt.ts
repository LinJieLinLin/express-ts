import jwt from 'jsonwebtoken'
import config from 'config'
import { ITokenInfo } from '../types/common'

export const GetJwt = (argData: ITokenInfo) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(
      argData,
      config.get('jwtSecret'),
      { expiresIn: config.get('jwtExpiration') },
      (err, token) => {
        if (err) return reject(err)
        return resolve(token || '')
      }
    )
  })
}
