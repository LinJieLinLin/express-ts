import { Request, Router, Response } from 'express'
import { ResJson } from './../../utils/index'
import { FindUser } from './../../service/user/index'

const router: Router = Router()
router.get('/info', async (req: Request, res: Response) => {
  const user = await FindUser(String(req.tokenInfo?.uid))
  if (!user) {
    ResJson(req, res, {}, 1004)
    return
  }
  ResJson(req, res, user)
  return
})

export default router
