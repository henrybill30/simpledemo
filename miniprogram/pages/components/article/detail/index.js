const util = require('../../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    author: "",
    content: "",
    time: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: "get_article",
      data: {
        envID: getApp().globalData.envID,
        id: options.id
      },
      success: res => {
        console.log(res.result.res.data)
        that.setData({
          title: res.result.res.data[0].title,
          author: res.result.res.data[0].author,
          content: res.result.res.data[0].content,
          time: util.formatDate(new Date(res.result.res.data[0].time))
        })
        wx.hideLoading()
      },
      fail: err => {
        console.log("调用云函数失败：" + JSON.stringify(err))
        that.setData({
          title: "加载文章失败！"
        })
        wx.hideLoading()
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
 return
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