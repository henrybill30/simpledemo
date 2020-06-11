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
    list: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getData() {
      // 获取用户 todos 列表
      wx.showLoading({
        title: '正在查询...'
      })
      var db = wx.cloud.database()
      db.collection('todos').where({
        _openid: getApp().globalData.openid
      }).get({
        success: res => {
          let list = res.data
          if(list.length==0){
            wx.showToast({
              title: '请先存储数据！',
              icon: 'none'
            })  
          }
          list.map((item)=>{
            item.time = util.formatDateTime(item.clientTime)
            return item
          })
          this.setData({
            list: list,
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
    del(e){
      const db = wx.cloud.database()
      db.collection('todos').doc(e.currentTarget.dataset.id).remove({
        success: () => {
          wx.showToast({
            title: '删除成功',
          })
          this.getData()
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '删除失败',
          })
          console.error('[数据库] [删除记录] 失败：', err)
        },
        complete: () => {
          this.setData({ deleting: false })
        }
      })
    },
    async delall(){
      wx.cloud.callFunction({
        name: 'del_data',
        data: {
          envID: getApp().globalData.envID,
          openid: getApp().globalData.openid
        },
        success: res => {
          console.log(res.result)
          wx.showToast({
            title: '删除数据成功！',
          })
          this.setData({
            list: []
          })
        },
        fail: err => {
          console.log("调用云函数失败：" + JSON.stringify(err))
        }
      })
    }
  },
  lifetimes: {
    attached: function(){
      this.getData()
    }
  }
})
