import Mock from 'mockjs' // 导入 mockjs

// 模拟数据: 请求返回的新闻列表数据, 模板新闻列表
const { newsList } = Mock.mock({
  'newsList|20': [
    {
      id: '@increment()', // id 自增长
      title: '@ctitle()', // 标题 '一个老龄化即将超过日本的国家'
      content: '@cparagraph(5,15)', // 新闻内容
      img_url: "@image('100x100', '#ddd', '#000', 'png', '自業自得')",
      add_time: '@date(yyyy-MM-dd hh:mm:ss)'
    }
  ]
})

/** 根据来源来源的访问路径 url, 获取路径传参的 query 参数
 *
 * @param {String} targetUrl 目标URL, 路径里包含了目标参数
 * @param {String} targetQuery 目标参数名, 路径里想要被取出的参数的名称
 */
const getQuery = (targetUrl, targetQuery) => {
  const index = targetUrl.indexOf('?')// 获取路径中问号的索引位置
  // 判断 "问号的索引" 是否不存在, 从而判断该路径是否有传参
  if (index === -1) {
    // 该路径没有传参
    console.log('参数获取失败: 该路径没有传参')
    return
  }
  const querysArray = targetUrl.substring(index + 1).split('&') // 从问号位置后面一位开始截取到最后, 不要问号; 接下来用split(), 以 & 符号进行分割, 得到数组, 格式 ["参数名1=参数值1", "参数名2=参数值2"]

  // for循环: 循环遍历数组 querysArray, 将每一项用 split(), 以 = 符号进行分割
  for (let i = 0; i < querysArray.length; i++) {
    const queryArray = querysArray[i].split('=')
    // 判断, 如果新生成的 queryArray 中的第0项(即传参的属性名称)等于我们的目标参数名
    if (queryArray[0] === targetQuery) {
      // 找到了目标参数

      return queryArray[1] // 返回 queryArray 中的第1项, 即目标参数名的值
    }
  }
  // 没有找到目标参数名
  console.log('参数获取失败: 路径中没有目标参数' + targetQuery)
  return null
}

/** 模拟接口: 发送请求, 获取新闻列表数据
 * 请求路径: '/api/get/news'
 * 请求方法: get
 * 请求传参: pageIndex {Number} 页码, 默认为1 必需
 *          pagesize {Number} 页码, 默认为7
 *
 * 特别注意: 实际请求路径: '/api/get/news?pageIndex=1&pagesize=7' , 所以需要用到正则表达式来扩大拦截范围
 *
 * @param {Object} options 获取来源路由的信息
 * @param {Object} options.body 来源路由的请求体传参
 * @param {String} options.type 来源路由的请求方法
 * @param {String} options.url 来源路由的请求路径, 路径传参的参数所在位置
 */
Mock.mock(/\/api\/get\/news/, 'get', (options) => {
  const pageIndex = getQuery(options.url, 'pageIndex') // 调用"获取路径传参"的方法, 获取分页
  const pagesize = getQuery(options.url, 'pagesize') // 调用"获取路径传参"的方法, 获取分页

  // 这里要手动加工返回的数组数据

  // 总页数
  const totalPage = Math.ceil(newsList.length / pagesize) // Math.ceil() 向上取整

  // 分页功能实现: (1) 每页展示页数: pagesize, 每页起始索引位置: (pageIndex - 1) * pagesize
  // 起始索引
  const startIndex = (pageIndex - 1) * pagesize
  // 结束索引
  const endIndex = pageIndex * pagesize

  /** 模拟数据: 返回是数据经过加工后的数组 list
   * 判断: 如果查询的页码大于总页数, 则返回空数组 [], 否则正常返回结果
   * 如果不这么做, 要是数组越界异常了, 返回了 undefined, 就容易报错
   */
  const list = totalPage < pageIndex ? [] : newsList.slice(startIndex, endIndex) // array.slice(包含起始索引, 不包含结束索引)

  return {
    status: 200,
    message: '获取新闻列表成功',
    list: list, // 这里返回模板新闻列表
    total: newsList.length // 返回总数 → 新闻模板新闻列表总数
  }
})

/** 模拟接口: 发送请求, 新增新闻列表数据
 * 请求路径: '/api/post/news'
 * 请求方法: post
 * 请求传参: title {String} 标题, 必需
 *          content {String} 内容, 必需
 *
 * 特别注意: 实际请求路径: 需要用到正则表达式来扩大拦截范围
 *
 * @param {Object} options 获取来源路由的信息
 * @param {Object} options.body 来源路由的请求体传参
 * @param {String} options.type 来源路由的请求方法
 * @param {String} options.url 来源路由的请求路径, 路径传参的参数所在位置
 */
Mock.mock('/api/post/news', 'post', (options) => {
  const body = JSON.parse(options.body)// 获取到请求体本身, 特别注意: 请求体里的数据是json格式
  const title = body.title // 获取到 '新增新闻的标题'
  const content = body.content // 获取到 '新增新闻的内容'

  // 手动往 newsList 对象里添加数据, 通过数组的 unshift() 方法, 添加的数据本身也是由 mock 生成
  newsList.unshift(Mock.mock(
    {
      id: '@increment()', // id 自增长
      title: title, // 标题 '一个老龄化即将超过日本的国家'
      content: content, // 新闻内容
      img_url: "@image('100x100', '#ddd', '#000', 'png', '自業自得')",
      add_time: '@date(yyyy-MM-dd hh:mm:ss)'
    }
  )
  )

  return {
    status: 200, // 状态码
    message: '添加成功', // 响应信息
    list: newsList, // 返回的数组是模板新闻列表, 此时是新闻列表里以及有新加入的数据了
    total: newsList.length
  }
})

/** 模拟接口: 发送请求, 删除新闻列表数据
 * 请求路径: '/api/delete/news'
 * 请求方式: post 不用 delete 方法.可能是更安全?
 * 请求传参: id {Number} 被删除的新闻的id, 必需
 *
 * @param {Object} options 获取来源路由的信息
 * @param {Object} options.body 来源路由的请求体传参
 * @param {Number} options.body.id 被删除的新闻的id
 * @param {String} options.type 来源路由的请求方法
 * @param {String} options.url 来源路由的请求路径, 路径传参的参数所在位置
 */
Mock.mock('/api/delete/news', 'post', (options) => {
  // 错题: axios 的请求体数据是JSON格式, 要转换
  const body = JSON.parse(options.body) // 获取到 请求体本身

  // 判断: 请求体中的属性名 id 是否为空, 或者不是
  if (!body.id || isNaN(body.id)) {
    // id 为空, 提示用户, 无逻辑操作
    return alert('传入的 id 值为空, 请传入要删除的新闻的 id 值')
  }

  // 手动处理 newsList 数组数据

  // 错题: 使用了 filter() 方法, 而 filter() 方法是新建数组的
  // newsList.filter(item => item.id !== body.id)

  const index = newsList.findIndex(item => item.id === body.id) // 找到要删除的新闻的 id 的索引位置

  // console.log(index) // 调试用代码: 获取被删除的新闻的索引
  newsList.splice(index, 1) // 数组删除数据, 从 index 位置开始删, 删除1项
  return {
    status: 200, // 状态码
    message: '删除成功' // 响应信息
  }
})
