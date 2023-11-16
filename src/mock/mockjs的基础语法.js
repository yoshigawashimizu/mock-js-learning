// 这是 mock 文件, 不要在 main.js 中直接引入, 而是在 mock/index.js 中引入后, 在导入到 main.js 中, 好处是独立的文件好管理

import Mock from 'mockjs' // 引入 mock 模块

/** mock 语法 👇
 * 基本格式: .mock({}) 方法
 * mock作用/功能: Ⅰ生成模拟数据, Ⅱ拦截请求
 */

// Ⅰ生成模拟数据

// 第一大类: 生成字符串 String

// (1) 生成指定内容的字符串
// const data = Mock.mock(
//   {
//     'greeting': '生成简单的字符串' // 在 JS 对象字面量中，属性名可以是一个标识符（如没有空格的简单单词），也可以用引号括起来的字符串
//   }
// )
// console.log(data) // 返回结果: 一个Object → { "greeting": "生成简单的字符串" }

// (2) 字符重复指定次数
// const data2 = Mock.mock(
//   {
//     'greeting|4': '你好' // 将 '你好' 重复拼接, 有4个 '你好' 被拼接
//   }
// )
// console.log(data2) // 结果: 一个Object → { "greeting": "你好你好你好你好" }

// (3) 字符重复随机次数
// const data3 = Mock.mock(
//   {
//     'greeting2|1-4': '你好' // 将 '你好' 随机重复拼接, 最少有1个, 最多有4个 '你好' 被拼接
//   }
// )
// console.log(data3)

// (4) 生成一个随机的, 无意义的字符串, 注意: 不能直接生成日文, 想生成日文请用 fake-api
// const data4 = Mock.mock({
//   RandomWord1: '@word()', // 生成一个无意义的英文单词
//   RandomWord2: '@word(3)', // 生成一个无意义的, 只有3个字符的英文单词
//   RandomChinese1: '@cword()', // 生成一个汉字
//   RandomChinese2: '@cword(3)', // 随机生成三个汉字
//   RandomChinese3: '@cword(3,10)', // 随机生成3到10个汉字
//   RandomTraditionalChinese1: '@cword(1, 1, { traditional: true })', // 生成一个繁体中文字符, 貌似不生效, 详情请看文档文件
//   RandomTraditionalChinese2: '@cword(3, 3, { traditional: true })' // 生成三个繁体中文字符的字符串, 貌似不生效, 详情请看文档文件
// })
// console.log(data4)

// (5) 生成标题, 可以指定字符个数
// const title = Mock.mock(
//   {
//     title1: '@title()', // 生成毫无意义的标题, 特点是多段大写开头的英文单词
//     title2: '@title(8)', // 生成8段大写开头的英文单词
//     chineseTitle1: '@ctitle()', // 生成毫无意义的中文标题, 字数在3到8左右
//     chineseTitle2: '@ctitle(8)' // 生成毫无意义的中文标题, 8个字符
//   }
// )
// console.log('生成一个标题:', title)

// (6) 生成句子, 可以指定字符个数
// const sentence = Mock.mock(
//   {
//     sentence1: '@sentence()', // 生成毫无意义的一句话, 开头单词大写, 其余小写
//     sentence2: '@sentence(15)', // 生成15个单词组成的毫无意义的一句话
//     chineseSentence1: '@csentence()', // 用中文生成毫无意义的一句话
//     chineseSentence2: '@csentence(7)', // 用7个汉字组成的毫无意义的一句话
//     chineseSentence3: '@csentence(5,7)' // 用5到7个汉字组成的毫无意义的一句话
//   }
// )
// console.log(sentence)

// (7) 生成段落, !!!不可以指定字符个数, 可以指定有几句话
// const paragraph = Mock.mock(
//   {
//     paragraph1: '@paragraph()', // 生成毫无意义的一个段落
//     paragraph2: '@paragraph(3)', // 生成一个三句话的段落
//     chineseParagraph1: '@cparagraph()', // 生成随机的中文段落
//     chineseParagraph2: '@cparagraph(2)' // 生成2句话组成的中文段落
//   }
// )
// console.log(paragraph)

// 第二大类: 生成数字 Number

// (1) 生成指定的数字
// const number1 = Mock.mock(
//   {
//     number1: 89 // 生成指定数字 89
//   }
// )
// console.log(number1) // 结果 一个对象 → { number1: 89 }

// (2) 生成范围数字, 冒号后面的数字作用暂时不清楚
// const number2 = Mock.mock(
//   {
//     'number1|70': 1, // 从范围70到70里取出一个数字
//     'number2|70': 2, // 从范围70到70里取出一个数字
//     'number3|1-10': 1, // 从范围1到10里取出一个数字
//     'number4|1-10': 2 // 从范围1到10里取出一个数字
//   }
// )
// console.log(number2)

// (3) 生成增量ID: 如果数据放在一个数组里面, 则id会自增加
// const dataOfId = Mock.mock(
//   {
//     id1: '@increment()', // 生成自增长的id
//     id2: '@increment(2)' // 生成自增长的id, 每次自增长都是增加2, 例如 13579
//   }
// )
// console.log(dataOfId) // 结果: {id1: 1, id2: 3}

// 第三大类: 实际应用类型

// (1) 生成姓名-地址-身份证号
// const dataOfApplication1 = Mock.mock(
//   {
//     name: '@name()', // 随机英文名
//     cname: '@cname()', // 随机中文名
//     idCard: '@id()', // 身份证号
//     longAddress: '@city(true)', // 加上true: 返回 省 与 市
//     shortAddress: '@city()', // 不加true: 返回 市
//     shortAddress2: '@city(false)' // false: 返回 市, 与不加 true 效果一致
//   }
// )
// console.log(dataOfApplication1)

/** (2) 生成图片
 *
 * 格式: @image('图片尺寸'(特别注意: 乘号是英文的 x ,不可用 * 号), '图片背景色'(只有一个颜色时默认是为背景色), '字体颜色'(默认为黑), '图片格式', '图片文字')
 */
// const dataOfImage = Mock.mock(
//   {
//     img_url: "@image('300x250', '#fff', '#ddd', 'png', 'Hello World')"
//   }
// )
// console.log(dataOfImage) // 结果为一个 url 地址, 访问该地址就会返回一张图片

/** (3) 生成时间
 * 格式: @date()
 */
// const dataOfDate = Mock.mock(
//   {
//     date1: '@date()', // 默认格式为 yyyy-MM-dd
//     date2: '@date(yyyy-MM-dd hh:mm:ss)', // 自定义格式: 年月日,时分秒
//     date3: '@date(dd/MM/yy)' // 自定义格式: 日月年, 且连接符号为 '/'
//   }
// )
// console.log(dataOfDate)

/** (4) 生成指定返回条数的数组
 * 指定组数: '数组名称|5' 返回包含5组数据的数组
 * 指定范围: '数组名称|5-10' 返回包含5-10组数据的数组
 */
// const array1 = Mock.mock(
//   {
//     'list1|3': [ // 生成只包含5组数据的数组
//       {
//         name: '@cname()', // 随机名字
//         address: '@city(true)', // 随机 省 市
//         id: '@increment()' // 自增长的id
//       }
//     ],
//     'list2|5-8': [ // 生成包含5-8组数据的数组
//       {
//         name: '@cname()', // 随机名字
//         address: '@city(true)', // 随机 省 市
//         id: '@increment()' // 自增长的id
//       }
//     ]
//   }
// )
// console.log(array1)

/** Ⅱ 拦截请求
 * 格式:
 * .mock('拦截路径', '拦截请求方式', { 拦截后返回结果 })
 * .mock('拦截路径', '拦截请求方式', () => { return { 拦截后返回结果 } })
 */

// (1) 拦截 get 请求: 将第二个参数设置为 get
Mock.mock('/api/get/news', 'get', {
  status: 200, // 状态码200
  message: '获取数据成功',
  data: [
    {
      fruit: 'apple'
    }
  ]
}
)

// (2) 拦截 post 请求: 将第二个参数设置为post
Mock.mock('/api/post/news', 'post', () => {
  return {
    status: 200, // 状态码200
    message: '获取数据成功',
    data: [
      {
        fruit: 'apple', // 水果名称
        price: 12 // 水果价格
      }
    ]
  }
})
