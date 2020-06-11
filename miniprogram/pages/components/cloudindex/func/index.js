// miniprogram/pages/components/cloudindex/storage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeId: '',
    currentPage: 0, // 子组件索引
    components: [
      {
          title: '云函数',
          name: 'cloudFunction',
          type: 'basic',
          num: 0
      },{
        title: '云数据库',
        name: 'database',
        type: 'basic',
        num: 0
      },{
          title: '云存储',
          name: 'cloudRestore',
          type: 'basic',
          num: 0
      }
    ],
  },
  showMore(e){
    this.setData({
      activeId: e.detail.id
    })
  },

  async onTabChange(e) {
    await this.addRecord()
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
    onTabChange(e){
      console.log(e)
      this.setData({
        currentPage: e.detail.name
      })
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const currentPage = parseInt(options.index) || 0
    this.setData({
      currentPage
    })

    await this.addRecord()
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