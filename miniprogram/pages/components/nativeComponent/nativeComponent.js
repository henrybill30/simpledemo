function getRandomColor() {
  const rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length === 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage: 0,
    pageNum: 5,
    nbTitle: '',
    titleArr: ['audio', 'video', 'map', 'canvas','camera'],
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

  async onTabChange(e) {
    await this.addRecord()
    this.setData({
      currentPage: e.detail.name
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentPage: parseInt(options.index),
      nbTitle: this.data.titleArr[parseInt(options.index)]
    })
    wx.cloud.callFunction({
      name: 'addRecord',
      data: {
        envID: getApp().globalData.envID,
        openid: getApp().globalData.openid,
        behavior: 'browse',
        component: this.data.titleArr[parseInt(options.index)],
        time: new Date()
      },
      success: res => {
        console.log("result: " + JSON.stringify(res.result))
      },
      fail: err => {
        console.log("error: " + JSON.stringify(err))
      }
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