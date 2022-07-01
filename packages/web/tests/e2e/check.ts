const delay = 500

/**
 * @description 获取检测后的prop属性，用于断言，全等检测，检测失败的话会输出截图
 * @param {Page} page 页面对象
 * @param {String} selector 元素选择器
 * @param {String} attr 要获取的元素属性
 * @param {String} verify 用于检测的值
 * @param {String} msg 描述信息，用于输出日志和截图命名
 * @returns {*} 获取结果
 */
export async function getCheckedProp(
  page: any,
  selector: string,
  prop: any,
  verify: string,
  msg: string
): Promise<any> {
  await page.waitForTimeout(delay)
  await page.waitForSelector(selector)
  const res = await page.$eval(selector, (e: any, prop: any) => e[prop], prop)

  if (res === verify) {
    console.log(`${msg} 成功`)
    return res
  } else {
    await page.waitForTimeout(delay)

    const element = await page.$(selector)
    await element.screenshot({
      path: `tests/puppeteer/screenshot/${msg}-${escape(verify)}.png`,
    })

    return res
  }
}

/**
 * @description 获取检测后的attr属性，用于断言，全等检测，检测失败的话会输出截图
 * @param {Page} page 页面对象
 * @param {String} selector 元素选择器
 * @param {String} attr 要获取的元素属性
 * @param {String} verify 用于检测的值
 * @param {String} msg 描述信息，用于输出日志和截图命名
 * @returns {*} 获取结果
 */
export async function getCheckedAttr(
  page: any,
  selector: string,
  attr: string,
  verify: string,
  msg: string
): Promise<any> {
  await page.waitForTimeout(delay)
  await page.waitForSelector(selector)
  const res = await page.evaluate(
    (e: any, attr: any) => e.getAttribute(attr),
    await page.$(selector),
    attr
  )

  if (res === verify) {
    console.log(`${msg} 成功`)
    return res
  } else {
    await page.waitForTimeout(delay)

    const element = await page.$(selector)
    await element.screenshot({
      path: `tests/puppeteer/screenshot/${msg}-${escape(verify)}.png`,
    })

    return res
  }
}

/**
 * @description 获取检测后的元素数量，用于断言，全等检测，检测失败的话会输出截图
 * @param {Page} page 页面对象
 * @param {String} parent 父元素选择器
 * @param {String} children 子元素选择器
 * @param {String} verify 用于检测的值
 * @param {String} msg 描述信息，用于输出日志和截图命名
 * @returns {Promise} 子元素数量
 */
export async function getCheckedENum(
  page: any,
  parent: string,
  children: string,
  verify: string,
  msg: string
): Promise<any> {
  await page.waitForTimeout(delay)
  await page.waitForSelector(children)
  const length = await page.$$eval(children, (e: any) => e.length)

  if (length === verify) {
    console.log(`${msg} 成功`)
    return length
  } else {
    await page.waitForTimeout(delay)

    const element = await page.$(parent)
    await element.screenshot({
      path: `tests/puppeteer/screenshot/${msg}-${escape(verify)}.png`,
    })

    return length
  }
}

/**
 * @description 获取检测后的元素存在判断，用于断言，全等检测，检测失败的话会输出截图
 * @param {Page} page 页面对象
 * @param {String} parent 父元素选择器
 * @param {String} children 子元素选择器
 * @param {String} verify 用于检测的值
 * @param {String} msg 描述信息，用于输出日志和截图命名
 * @returns {Boolean} 是否存在
 */
export async function getCheckedEExist(
  page: any,
  parent: string,
  children: string,
  verify: boolean,
  msg: string
): Promise<any> {
  await page.waitForTimeout(delay)
  const element = await page.$(children)
  const isExist = !!element

  if (isExist === verify) {
    console.log(`${msg} 成功`)
    return isExist
  } else {
    await page.waitForTimeout(delay)

    const element = await page.$(parent)
    await element.screenshot({
      path: `tests/puppeteer/screenshot/${msg}-${
        verify ? '存在' : '不存在'
      }.png`,
    })

    return isExist
  }
}
/**
 * @description 获取父对象display非none的子元素
 * @param  {EventEmitter} page 页面对象
 * @param {String} parent 父元素选择器
 * @param {String} children 子元素选择器
 * @returns {ElementHandle|object}
 */
export async function getVisibleElement(
  page: any,
  parent: string,
  children: string
): Promise<any> {
  await page.waitForTimeout(delay)
  const element = await page.$$(parent)
  const res = {
    click() {
      console.log(`getVisibleElement：${parent}-${children}`)
      return false
    },
  }
  if (element.length) {
    for (let e of element) {
      let t = await page.evaluate(
        (e: any, attr: any) => e.getAttribute(attr),
        e,
        'style'
      )
      if (!t || !t.match('none')) {
        return await e.$(children)
      }
    }
    return res
  } else {
    return res
  }
}
export async function setVisibleElement(
  page: any,
  parent: any,
  selector: any,
  type: string,
  ...args: any[]
): Promise<any> {
  const e = await getVisibleElement(page, parent, selector)
  if (e) {
    if (type === 'type') {
      await getAttr(page, e, 'value')
    }
    await e[type](...(args || null))
    return true
  } else {
    let msg = `${type} error:,${args}`
    console.log(msg)
    return null
  }
}
async function getAttr(page: any, element: any, attr: string) {
  const res = await page.evaluate(
    (e: any, attr: any) => {
      if (attr === 'value') {
        const value = e[attr]
        e[attr] = ''
        return value
      }
      return e.getAttribute(attr) || e[attr] || null
    },
    element,
    attr
  )
  return res
}
/**
 * @description 获取element上的属性
 * @param  {} page
 * @param  {} selectString
 * @param  {} attr
 */
export async function getElementAttr(page: any, selector: any, attr: string) {
  const [select, index = 0] = selector.split('@index=')
  await page.waitForSelector(select)
  const e = await page.$$(select)
  if (e[index]) {
    return getAttr(page, e[index], attr)
  } else {
    return null
  }
}
export async function getElement(page: any, selector: any, timeout = 10000) {
  const [select, index = 0] = selector.split('@index=')
  await page.waitForSelector(select, { timeout: timeout })
  const e = await page.$$(select)
  if (e[index]) {
    return e[index]
  } else {
    let msg = `can't find element:${selector}`
    console.log(msg)
    return null
  }
}
export async function setElement(
  page: any,
  selector: any,
  type: string,
  ...args: any[]
): Promise<any> {
  const e = await getElement(page, selector)
  if (e) {
    if (type === 'type') {
      await getAttr(page, e, 'value')
    }
    await e[type](...(args || null))
    return true
  } else {
    let msg = `${type} error:${selector},${args}`
    console.log(msg)
    return null
  }
}

export async function missionDialog(
  page: any,
  parent: any,
  children = '.ant-modal-content .ant-modal-confirm-btns button:nth-child(1)'
) {
  let res = await getVisibleElement(page, parent, children)
  await res.click()
  await page.waitForTimeout(delay * 5)
  res = await getVisibleElement(
    page,
    parent,
    '.ant-modal-content .ant-modal-confirm-btns button:nth-child(2)'
  )
  await res.click()
}
