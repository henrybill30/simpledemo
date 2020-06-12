// miniprogram/pages/components/cloudDatabase/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage: 0, // 子组件索引
    components: [
        {
            title: '页面钩子函数',
            name: 'pageHook',
            type: 'basic',
            num: 0
        },{
          title: '组件钩子函数',
          name: 'componentHook',
          type: 'basic',
          num: 0
        }
    ]
  },
  
  async onTabChange(e) {
    await this.addRecord()
    this.setData({
      currentPage: e.detail.name
    })
  },

  // 数据埋点
  async addRecord() {
      const components = this.data.components
      const currentPage = this.data.currentPage
      const event = {
          envID: getApp().globalData.envID,
          openid: getApp().globalData.openid,
          behavior: 'browse',
          component: components[currentPage].title,
          cpType: components[currentPage].type,
          cpNum: components[currentPage].num,
          time: new Date()
      }
      try {
          await wx.cloud.callFunction({
          name: 'addRecord',
          data: event
          })
      } catch(e) {
          console.error(e)
      }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
    const currentPage = parseInt(options.index) || 0
    this.setData({
      currentPage
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})