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

    getData() {
      if(this.data.show){
        this.setData({
          show: false
        })
        return
      }
      this.setData({
        show: true
      })
      // 获取用户 todos 列表
      wx.showLoading({
        title: '正在查询...'
      })
      var db = wx.cloud.database()
      db.collection('todos').where({
        _openid: getApp().globalData.openid
      }).get({
        success: res => {
          // console.log(11111111)
          let list = res.data
          list.map((item)=>{
            item.time = util.formatDateTime(item.clientTime)
            return item
          })
          console.log(list)
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
    },
  }
})
