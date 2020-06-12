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
          console.log(list)
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
    editValue(e){
      // console.log(e.detail.value)
      this.setData({
        editValue: e.detail.value
      })
    },
    edit(e){
      // console.log(e)
      this.setData({
        editFlag: e.currentTarget.dataset.index,
        editid: e.currentTarget.dataset.id
      })
    },
    saveEdit(){
      const db = wx.cloud.database()
      db.collection('todos').doc(this.data.editid).update({
        data: {
          description: this.data.editValue
        },
        success: () => {
          console.log('he')
          wx.showToast({
            title: '更新成功',
          })
          this.setData({
            editFlag: -1,
            editid: ''
          })
          this.getData()
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '更新失败',
          })
          console.error('[数据库] [更新记录] 失败：', err)
        },
        complete: () => {
          this.setData({ updating: false })
        }
      })
    },
  },
  lifetimes: {
    attached: function(){
      this.getData()
    }
  }
})
