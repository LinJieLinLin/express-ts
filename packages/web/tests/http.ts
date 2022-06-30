import fly from 'flyio'

beforeAll(async () => {
  console.log('beforeAll')
  fly.config.timeout = 10000
  fly.config.baseURL = 'http://localhost:3001/api'
  fly.interceptors.request.use((request: any) => {
    console.debug('request：', request)
    // request.headers['tk'] = localStorage.getItem('tk')
    return request
  })
  // fly.interceptors.response.use((response) => {
  //   console.log(response)
  //   return response
  // })
})

afterAll(async () => {
  console.log('afterAll')
  jest.clearAllTimers()
})

describe('http', () => {
  it('login', async () => {
    const res: any = await fly.request(
      '/pub/login',
      { username: 'admin', password: 'admin' },
      {
        method: 'POST',
      }
    )
    expect(res.status).toBe(200)
    expect(res.data.code).toBe(4000)
  })
  it('login su&info', async () => {
    let res: any = await fly.request(
      '/pub/login',
      { username: 'admin', password: '123456' },
      {
        method: 'POST',
      }
    )
    expect(res.status).toBe(200)
    expect(res.data.code).toBe(0)
    console.log('token', res.data.token)
    res = await fly.request(
      '/user/info',
      {},
      {
        method: 'GET',
        headers: {
          tk: '.web.' + res.data.token,
        },
      }
    )
    expect(res.status).toBe(200)
    expect(res.data.code).toBe(0)
  })
})
