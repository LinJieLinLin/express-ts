export type IReqData = {
  url: string
  params?: any
  method?: 'get' | 'post'
  config?: any
}
export type IRes = {
  code: number
  data?: any
  msg?: string
  token?: string
}
