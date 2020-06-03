// miniprogram/pages/person/collection/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collections: []
  },
  getcollection(){
    let that = this
    wx.cloud.callFunction({
      name: 'get_collections',
      data: {
        envID: getApp().globalData.envID,
        openid: getApp().globalData.openid
      },
      success: res => {
        // console.log(res.result.res.data)
        that.setData({
          collections: res.result.res.data
        })
      },
      fail: err => {
        console.log(err)
        wx.showToast({
          title: '获取收藏失败！',
          icon: 'none'
        })
      }
    })
  },
  to(e){
    console.log()
    wx.navigateTo({
      url: `../../../${ e.currentTarget.dataset.path }`,
    })
  },
  del(e){
    console.log(e.currentTarget.dataset.id)
    wx.cloud.callFunction({
      name: 'del_collection',
      data: {
        envID: getApp().globalData.envID,
        id: e.currentTarget.dataset.id
      },
      success: res => {
        this.getcollection()
        wx.showToast({
          title: '删除收藏成功！',
          icon: 'success'
        })
      },
      fail: err => {
        console.log(err)
        wx.showToast({
          title: '删除收藏失败！',
          icon: 'none'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.getcollection()
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
    return {
      title: '组件学习',
      path: '/pages/components/index/index'
    }
  }
})