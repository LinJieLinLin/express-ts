import jwt from 'jsonwebtoken'
import config from 'config'
import { ITokenInfo } from '../types/common'

export const GetJwt = (argData: ITokenInfo) => {
  return jwt.sign(argData, config.get('jwtSecret'), {
    expiresIn: process.env.JWT_EXPIRATION,
  })
}
