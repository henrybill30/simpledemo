// miniprogram/pages/person/usage/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      activeId: ''
    },
    showMore(e){
      this.setData({
        activeId: e.detail.id
      })
    },
    // del: function(){
    //   wx.cloud.callFunction({
    //     name: 'delUsers',
    //     data: {
    //       envID: getApp().globalData.envID
    //     },
    //     success: res => {
    //       console.log(res.result.count)
    //     }
    //   })
    // },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      getApp().globalData.isNewUser = false;
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
      return {
        title: '组件学习',
        path: '/pages/components/index/index',
        imageUrl: 'cloud://simpledemo-9jk60.7369-simpledemo-9jk60-1302043964/resource/小程序头像.png'
      }
    }
})