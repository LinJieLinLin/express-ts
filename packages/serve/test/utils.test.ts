import { ConnectDb, CloseDb } from '../src/utils/db'
import { GetJwt } from '../src/utils/jwt'
import * as index from '../src/utils/index'
import { Sleep } from '../../web/src/utils/project'
import { AnyObject } from '../src/types/common'

jest.mock('../src/utils/log')
jest.useFakeTimers()
// jest.setTimeout(20000)

const ENV = process.env
beforeAll(async () => {
  process.env = { ...ENV }
})

afterAll(async () => {
  console.log('afterAll')
  Sleep(10000)
  jest.clearAllTimers()
  process.env = ENV
})

describe('db', () => {
  it('ConnectDb', async () => {
    const fn = ConnectDb
    expect(await fn()).toBe(true)
  })
  it('ConnectDb', async () => {
    const fn = ConnectDb
    process.env.NODE_ENV = 'test12'
    expect(fn()).rejects.toBe(5000)
  })
  it('CloseDb', async () => {
    const fn = CloseDb
    expect(await fn()).toBe(true)
  })
})

describe('index', () => {
  it('ResJson', async () => {
    const fn = index.ResJson
    process.env.JWT_EXPIRATION = '3600'
    let res: AnyObject = await fn(
      {
        needNewToken: true,
        tokenInfo: {
          uid: '1',
        },
      } as any,
      {
        json: (res: AnyObject) => res,
      } as any,
      {},
      0
    )
    expect(res.code).toBe(0)
    res = await fn(
      {
        needNewToken: false,
      } as any,
      {
        json: (res: AnyObject) => res,
      } as any,
      {},
      1,
      '',
      '123'
    )
    expect(res.token).toBe('123')
    res = await fn(
      {
        needNewToken: false,
      } as any,
      {
        json: (res: AnyObject) => res,
      } as any,
      {},
      1000,
      '',
      '123'
    )
    expect(res.code).toBe(1000)
  })
  it('SafeData', async () => {
    const obj: { [key: string]: any } = { b: '', c: 0, d: { a: 1, b: 2 } }
    const fn = index.SafeData
    expect(fn(obj.a, 'a')).toBe(undefined)
    expect(fn(obj, 'a')).toBe(undefined)
    expect(fn(obj, 'd.a')).toBe(1)
    expect(fn(obj, 'd.a.a', 2, 1)).toBe(2)
    expect(fn(obj, 'a', 0)).toBe(0)
    expect(fn(obj, 'b', 0)).toBe(0)
    expect(fn(obj, 'b')).toBe('')
    expect(fn(obj, obj as any)).toBe('')
    expect(fn(obj, 'c')).toBe(0)
    expect(fn(obj, 'c', '')).toBe('')
    expect(fn(obj, 'a', 'a', true)).toBe('a')
  })
  it('Sleep', async () => {
    const fn = index.Sleep
    expect(fn(1000)).resolves.toBe(true)
  })
  it('SetCacheData', async () => {
    const fn = index.SetCacheData
    expect(
      await fn('username.test', { errorRecord: [], lockDate: 0, uid: 0 })
    ).toStrictEqual({ errorRecord: [], lockDate: 0, uid: 0 })
  })
  it('GetCacheData', async () => {
    const fn = index.GetCacheData
    expect(await fn('username.test1', '')).toBe('')
    expect(await fn('username.test', '')).toStrictEqual({
      errorRecord: [],
      lockDate: 0,
      uid: 0,
    })
  })
})

describe('jwt', () => {
  it('GetJwt', async () => {
    const fn = GetJwt
    expect(fn({ uid: '1' })).not.toBe('')
  })
})
