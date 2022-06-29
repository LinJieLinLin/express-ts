import request from 'supertest'
import { createApp } from '../src/app'
import { CloseDb, ConnectDb } from '../src/utils/db'
import { GetJwt } from '../src/utils/jwt'
import { MongoMemoryServer } from 'mongodb-memory-server'

jest.mock('../src/utils/log')
const server = createApp()
// const password = '123456'
let userToken = ''

describe('POST /api/pub/login', () => {
  beforeAll(async () => {
    const mongod = await MongoMemoryServer.create()
    await ConnectDb(mongod.getUri())
  })

  afterAll(async () => {
    CloseDb()
  })
  it('check', async () => {
    // use get replace post,https://github.com/visionmedia/supertest/issues/772
    const res = await request(server).get('/')
    expect(res.status).toBe(200)
  })
  it('add user su', async () => {
    const res = await request(server).get(
      `/api/pub/login?username=123&password=123456`
    )
    expect(res.status).toBe(200)
    expect(res.body.code).toEqual(1)
  })
  it('add user admin su', async () => {
    const res = await request(server).get(
      `/api/pub/login?username=admin&password=123456`
    )
    expect(res.status).toBe(200)
    expect(res.body.code).toEqual(1)
  })
  it('login fail pwd short', async () => {
    const res = await request(server).get(
      `/api/pub/login?username=123&password=12345`
    )
    expect(res.status).toBe(200)
    expect(res.body.code).toEqual(4000)
  })
  it('login fail pwd too long', async () => {
    const res = await request(server).get(
      `/api/pub/login?username=123&password=1234567890123456789012345678901`
    )
    expect(res.status).toBe(200)
    expect(res.body.code).toEqual(4000)
  })
  it('no username', async () => {
    const res = await request(server).get(
      `/api/pub/login?username=&password=123456`
    )
    expect(res.status).toBe(200)
    expect(res.body.code).toEqual(4000)
  })
  it('login fail username too long', async () => {
    const res = await request(server).get(
      `/api/pub/login?username=1234567890123456789012345678901&password=123456`
    )
    expect(res.status).toBe(200)
    expect(res.body.code).toEqual(4000)
  })
  it('login fail no params', async () => {
    const res = await request(server).post(`/api/pub/login`)
    expect(res.status).toBe(200)
    expect(res.body.code).toEqual(4000)
  })
  it('login fail pwd1', async () => {
    const res = await request(server).get(
      `/api/pub/login?username=123&password=12345123`
    )
    expect(res.status).toBe(200)
    expect(res.body.code).toEqual(1001)
  })
  it('login fail pwd2', async () => {
    const res = await request(server).get(
      `/api/pub/login?username=123&password=12345123`
    )
    expect(res.status).toBe(200)
    expect(res.body.code).toEqual(1001)
  })
  it('login fail pwd3', async () => {
    const res = await request(server).get(
      `/api/pub/login?username=123&password=12345123`
    )
    expect(res.status).toBe(200)
    expect(res.body.code).toEqual(1001)
  })
  it('login lock', async () => {
    const res = await request(server).get(
      `/api/pub/login?username=123&password=12345123`
    )
    expect(res.status).toBe(200)
    expect(res.body.code).toEqual(1000)
  })
  it('login su', async () => {
    const res = await request(server).get(
      `/api/pub/login?username=admin&password=123456`
    )
    expect(res.status).toBe(200)
    expect(res.body.code).toEqual(0)
    userToken = res.body.token
  })
  it('no token', async () => {
    const res = await request(server).get(`/api/user/info`).set('tk', '')
    expect(res.status).toBe(401)
  })
  it('token invalid', async () => {
    const res = await request(server)
      .get(`/api/user/info`)
      .set('tk', '.web.2142314')
    expect(res.status).toBe(401)
  })
  it('no user', async () => {
    const token = await GetJwt({ uid: '10086' })
    const res = await request(server)
      .get(`/api/user/info`)
      .set('tk', '.web.' + token)
    expect(res.status).toBe(200)
    expect(res.body.code).toEqual(1004)
  })
  it('userInfo', async () => {
    const res = await request(server)
      .get(`/api/user/info`)
      .set('tk', '.web.' + userToken)
    expect(res.status).toBe(200)
    expect(res.body.code).toEqual(0)
  })
  // it('cerate user', async () => {
  //   const res = await request(server).post(`/api/pub/login`).send({
  //     username: 'linj',
  //     password: '123456789',
  //   })
  //   expect(res.status).toBe(200)
  //   expect(res.body.code).toEqual(1)
  //   userToken = res.body.token
  //   console.log(userToken, res.body)
  // })
})
