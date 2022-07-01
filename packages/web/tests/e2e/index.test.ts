import * as puppeteer from 'puppeteer'
import { setElement } from './check'

jest.setTimeout(10000)
let page: any
let browser: any

const username = '.login-input input[type="text"]'
const password = '.login-input input[type="password"]'
const data = {
  username: 'test' + Date.now(),
  password: '123456',
}
const indexPage =
  'http://localhost:3002/express-ts#/login' || 'https://www.lj4.top/express-ts/'
describe('Sandbox', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true })
    page = await browser.newPage()

    await page
      .goto(indexPage, {
        waitUntil: 'networkidle0',
      })
      // tslint:disable-next-line:no-empty
      .catch(() => {})
  })

  afterAll(async () => {
    if (!page.isClosed()) {
      await browser.close()
    }
  })

  test('login fail', async () => {
    const url = await page.url()
    await page.waitForSelector('.pLogin')
    expect(url).toMatch(/login/)
    await page.type(username, '')
    await page.type(password, '123')
    await page.click('.mg-t10 button')
    expect(url).toMatch(/login/)
    await page.waitForTimeout(500)

    await setElement(page, username, 'type', data.username)
    await setElement(page, password, 'type', '123')
    expect(url).toMatch(/login/)

    await setElement(page, username, 'type', data.username)
    await setElement(page, password, 'type', '123456')
    await page.click('.mg-t10 button')
    await page.waitForSelector('.pIndex')
    await page.waitForTimeout(500)

    await page.click('.pIndex button')
    expect(url).toMatch(/login/)

    await setElement(page, username, 'type', data.username)
    await setElement(page, password, 'type', '1234567')
    await page.click('.mg-t10 button')
    expect(url).toMatch(/login/)

    await setElement(page, username, 'type', data.username)
    await setElement(page, password, 'type', '1234567')
    await page.click('.mg-t10 button')
    expect(url).toMatch(/login/)

    await setElement(page, username, 'type', data.username)
    await setElement(page, password, 'type', '1234567')
    await page.click('.mg-t10 button')
    expect(url).toMatch(/login/)

    await setElement(page, username, 'type', data.username)
    await setElement(page, password, 'type', '1234567')
    await page.click('.mg-t10 button')
    expect(url).toMatch(/login/)
  })
})
