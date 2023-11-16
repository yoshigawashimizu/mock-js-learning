<template>
  <div>
    <h4>新闻列表管理</h4>
    <!-- 新建区域 -->
    <div class="add">
      <!-- 新新闻标题 -->
      <input placeholder="请输入标题" v-model="title">
      <!-- 新新闻内容 -->
      <input placeholder="请输入内容" v-model="content">
      <!-- 新增新新闻按钮 -->
      <button @click="add">添加</button>
    </div>

    <!-- 新闻展示用列表 -->
    <div class="news_list">
      <table class="table">
        <!-- 表格头部 -->
        <thead>
          <tr>
            <th>新闻图片</th>
            <th>新闻标题</th>
            <th>新闻内容</th>
            <th>发布时间</th>
            <th>可选操作</th>
          </tr>
        </thead>

        <!-- 表格主体 -->
        <tbody>
          <tr v-for="item in newsList" :key="item.id">
            <!-- 新闻题目 -->
            <td>
              <img :src="item.img_url">
            </td>

            <!-- 新闻标题 -->
            <td>
              {{ item.title }}
            </td>

            <!-- 新闻内容 -->
            <td>
              {{ item.content }}
            </td>

            <!-- 发布时间 -->
            <td>
              {{ item.add_time }}
            </td>

            <!-- 可用操作 -->
            <td>
              <!-- 删除按钮 -->
              <button class="remove" @click="del(item.id)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 切换页面按钮 -->
    <div class="pages">
        <button @click="prevPage" :disabled="pageIndex <= 1">上一页</button>
        <button @click="nextPage" :disabled="pageIndex >= totalPage">下一页</button>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request' // 导入 axios 的二次封装类

export default {
  name: 'form-comp', // 组件名称
  data () {
    return {
      title: '', // 绑定输入框模型: "新增新闻区域"之新的新闻标题
      content: '', // 绑定输入框模型: "新增新闻区域"之新的新闻内容
      newsList: [], // 新闻列表数据
      pageIndex: 1, // 当前页码
      pagesize: 7, // 每页展示条数
      total: 0, // 总新闻条数
      totalPage: 0 // 总页面数
    }
  },
  methods: {
    /** "新增新闻按钮"的点击事件: 添加新新闻 */
    async add () {
      // 判断: 输入框的输入内容是否是空字符
      if (this.title.trim() === '' || this.content.trim() === '') {
        // 输入的内容为空, 提示用户输入正确内容
        return alert('新闻标题或新闻内容不能为空')
      }
      // console.log('新增新闻标题:', this.title, '新增新闻内容:', this.content) // 调试用代码
      await request.post('post/news', {
        title: this.title, // 传入新闻标题
        content: this.content // 传入新闻主体
      })
      this.setNewsList() // 刷新页面
      this.title = '' // 清空标题输入框内容
      this.content = '' // 清空标题输入框内容
    },

    /** '页面跳转按钮_下一页'的点击事件: 跳转到下一页 */
    nextPage () {
      this.pageIndex++ // 跳转到下一页: pageIndex 加1
      this.setNewsList() // 重新获取新闻列表数据
    },

    /** '页面跳转按钮_上一页'的点击事件: 跳转到上一页 */
    prevPage () {
      // 判断: 当前pageIndex 是否不大于1
      if (this.pageIndex <= 1) {
        return // 直接返回, 无操作
      }
      this.pageIndex-- // 跳转到下一页: pageIndex 加1
      this.setNewsList() // 重新获取新闻列表数据
    },

    /** '删除新闻按钮'的点击事件: 删除指定的新闻
     *
     * @param {Number} targetId 被删除的新闻的id
     */
    async del (targetId) {
      await request.post('/delete/news', {
        id: targetId // 传入被删除的新闻的id
      })
      this.setNewsList()// 重置新闻列表数据
    },

    /** 发起请求, 设置/重置新闻列表数据
     *
     * @param {Number} pageIndex 查询的页码 默认为1
     * @param {Number} pagesize 每页希望展示的页数 默认为7
     */
    setNewsList (pageIndex = 1, pagesize = 7) {
      request.get('/get/news', {
        params: {
          pageIndex: this.pageIndex, // 页码
          pagesize // 单页展示数量
        }
      }).then(res => {
        this.newsList = res.data.list // 设置新闻列表数据
        this.total = res.data.total // 设置总新闻条数
        this.totalPage = Math.ceil(this.total / this.pagesize) // 设置总页面数
      })
    }

  },
  created () {
    // 页面创建时, 发送请求获取新闻列表数据
    this.setNewsList()
  }
}
</script>

<style lang="less" scoped>
  /* 清除默认样式 */
  *{
    padding: 0;
    margin: 0;
  }

  body{
    width: 100vw;
    height: 100vh;
  }

  /* 新建新闻区域 */
  .add{
    /* 输入框样式 */
    input{
      padding: 10px; /* 内边距, 把输入框撑大 */
      border: none;
      border-bottom: 3px solid #409eff;
      outline: none; /* 输入框 平常时的外边框 */
      margin-right: 10px;
    }
  }

  /* 按钮的通用样式 */
  button{
    margin-left: 5px;
    width: 100px;
    height: 30px;
    background: #409eff;
    color: #fff; /*按钮字体颜色 */
    border: none; /* 按钮无外边框 */
    outline: none; /* 获得焦点时的轮廓为 none */
    border-radius: 5px;
    cursor: pointer; /* 鼠标悬浮时时只小手 */

  }

  /* 新闻展示区列表样式 */
  .news_list{
    margin: 0 auto;
    width: 90%; /* 整体占页面宽90% */
    height: 465px;
    overflow-y: scroll; /* y轴超出盒子范围: 滚动条 */
    overflow-x: hidden; /* x轴超出盒子范围: 隐藏/裁剪 */

    /* 新闻展示区域列表表格本身的样式 */
    .table{
      margin: 10px 0; /* 上下 10px 外边距, 保持一定的空间感 */
      width: 1200px;
      border-collapse: collapse; /* border-collapse 表格边框合并样式 collapse(合并) separate(分离) */
      border: 1px solid #d3d3d3;
      color: #606060;
      border-radius: 5px;

      /* 表头样式 */
      th{
        height: 30px;
        font-size: 16px; /* 标题字号 */
        font-weight: normal; /* 字体正常粗细 */
        font-family: 'FangSong', sans-serif; /* 字体 */
      }

      /* 表格每一个格子的样式 */
      td{
        padding: 5px;
        font-size: 12px; /* 字体的字小一点, 便于展示更多 */

        /* 发布时间的格子 */
        &:nth-child(4) {
          width: 150px; /* 窄一点 */
        }

        /* 标题的格子 */
        &:nth-child(2) {
          width: 100px; /* 更窄 */
        }
      }

      /* 图片 */
      img{
        width: 80px;
        height: 80px;
      }

      /* 删除按钮 */
      .remove{
        background: #f56c6c;
      }
    }
  }
</style>
