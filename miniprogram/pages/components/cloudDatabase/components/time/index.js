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
    serverTime: '',
    clientTime: '',
    activeId: ''
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
    gettime(){
      wx.cloud.callFunction({
        name: 'server_time',
        data: {
          envID: getApp().globalData.envID,
          time: new Date()
        },
        success: res => {
          console.log(res.result)
          this.setData({
            clientTime: util.formatDateTime(new Date(res.result.clienttime), true),
            serverTime: util.formatDateTime(new Date(res.result.servertime), true)
          })
        },
        fail: err => {
          console.log("调用云函数失败：" + JSON.stringify(err))
        }
      })
    }
  }
})
