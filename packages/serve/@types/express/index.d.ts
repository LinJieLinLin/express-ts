declare namespace Express {
  interface Request {
    needNewToken: boolean
    tokenInfo: any
    id: string
  }
}
