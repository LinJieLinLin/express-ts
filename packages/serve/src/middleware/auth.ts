import config from 'config'
import { Response, NextFunction, Request } from 'express'
import HttpStatusCodes from 'http-status-codes'
import jwt from 'jsonwebtoken'

export default function (req: Request, res: Response, next: NextFunction) {
  const token = req.header('tk')?.replace('.web.', '')
  if (!token) {
    res.status(HttpStatusCodes.UNAUTHORIZED).json({ msg: 'token is required' })
    return
  }
  try {
    const tkInfo: any = jwt.verify(token || '', config.get('jwtSecret'))
    // check if token need update
    const remainTime = ((tkInfo?.exp || 1) * 1000 - Date.now()) / 1000
    if (remainTime < (Number(process.env.JWT_EXPIRATION) || 0) / 2) {
      req.needNewToken = true
    } else {
      req.needNewToken = false
    }
    req.tokenInfo = tkInfo
    next()
  } catch (err) {
    res.status(HttpStatusCodes.UNAUTHORIZED).json({ msg: 'token is invalid' })
    return
  }
}
