export type IRes = {
  code: number
  data?: any
  msg?: string
  token?: string
}
export type ITokenInfo = {
  uid: string
  exp?: number
}
export interface AnyObject {
  [key: string]: any
}
