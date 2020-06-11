// pages/components/cloudDatabase/components/getData/index.js
const util = require('../../../../../utils/util.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    activeId: '',
    searchContent: '',
    todoList: [],
    show: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showMore(e){
      this.setData({
        activeId: e.detail.id
      })
    },

    onInputSearchContent(e) {
      // 输入搜索内容
      this.setData({
        searchContent: e.detail.value
      })
    },

    searchTodo() {
      if(this.data.searchContent == ''){
        return
      }
      let searchContent = this.data.searchContent
      const db = wx.cloud.database()
      let descriptionCondition = searchContent
      const execResult = /([\s\S]*)$/.exec(searchContent)
      console.log(execResult, 'ooo')
      if (execResult) {
        console.log(execResult)
        const reStr = execResult[1].trim().replace(/\s+/g, '|')
        console.log(reStr)
        descriptionCondition = db.RegExp({
          regexp: reStr
        })
      }
      wx.showLoading({
        title: '正在查询...'
      })
      db.collection('todos').where({
        _openid: this.data.openid,
        description: descriptionCondition
      }).get({
        success: res => {
          let list = res.data
          list.map((item)=>{
            item.time = util.formatDateTime(item.clientTime)
            return item
          })
          this.setData({
            todoList: list,
          })
          console.log('[数据库] [查询记录] 成功: ', res)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error('[数据库] [查询记录] 失败：', err)
        },
        complete: () => {
          wx.hideLoading()
        }
      })
      this.setData({
        show: true
      })
    },

    close() {
      this.setData({
        show: false
      })
    }
  }
})
