import { Router, Request, Response } from 'express'
import { check, validationResult } from 'express-validator'
import { ResJson } from './../../utils/index'
import { GetJwt } from './../../utils/jwt'
import { CheckUser, CreateUser } from '../../service/user'

const router: Router = Router()
router.all(
  '/login',
  [
    check('username', 'Please include a valid username').isLength({
      min: 1,
      max: 30,
    }),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6, max: 30 }),
  ],
  async (req: Request, res: Response) => {
    let params = req.body
    if (req.method === 'GET') {
      params = req.query
    } else if (req.method === 'POST') {
      params = req.body
    }
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      ResJson(req, res, {}, 4000, errors.array()[0].msg)
      return
    }
    try {
      let user = await CheckUser(params)
      let code = 0
      if (!user) {
        user = await CreateUser(params, req.ip)
        code = 1
      } else {
        user.lastLogin = Date.now()
        user.save()
      }
      const token = await GetJwt({ uid: String(user._id) })
      user.password = ''
      ResJson(req, res, user, code, '', token)
      return
    } catch (e) {
      ResJson(req, res, {}, Number(e) || 5000)
      return
    }
  }
)

export default router
