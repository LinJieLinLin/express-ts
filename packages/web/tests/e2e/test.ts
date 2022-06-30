import * as puppeteer from 'puppeteer'

let page: any
let browser: any
jest.setTimeout(10000)
const username = '.login-input input[type="text"]'
const password = '.login-input input[type="password"]'
const indexPage =
  'http://localhost:3002/express-ts#/login' || 'https://www.lj4.top/express-ts/'
describe('Sandbox', () => {
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false })
    page = await browser.newPage()

    await page
      .goto(indexPage, {
        waitUntil: 'networkidle0',
      })
      // tslint:disable-next-line:no-empty
      .catch(() => {})
  })

  afterAll(() => {
    if (!page.isClosed()) {
      browser.close()
    }
  })

  test('login fail', async () => {
    const url = await page.url()
    expect(url).toMatch(/login/)
    await page.waitForSelector('.pLogin')
    await page.type(username, 'admin')
    await page.type(password, '')
    await page.click('.mg-t10 button')
    await page.waitForTimeout(500)

    await page.type(username, 'admin')
    await page.type(password, '123456')
    await page.click('.mg-t10 button')
    await page.waitForSelector('.pIndex')
    await page.waitForTimeout(5000)
  })
})
