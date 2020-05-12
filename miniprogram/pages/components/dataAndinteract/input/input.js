Page({

  /**
   * 页面的初始数据
   */
  data: {
    jichu: [
      {
        html: `<input placeholder="最简输入框"></input>`
      }
    ], 
    zengqiang: [
      {
        html: `<input maxlength="10" placeholder="最大输入长度为10"/>`
      }, {
        html: `<input value="这是初始内容！" placeholder="包含初始内容"/>`
      }, {
        html: `<input password placeholder="请输入密码"/>`
      }, {
        html: `<input placeholder-style="color:red" placeholder="红色占位符"/>`
      }, {
        html: `<input disabled placeholder="禁用状态"/>`
      }, {
        html: `<input auto-focus placeholder="自动获取焦点"/>`
      }
    ], 
    keyboard: [
      {
        html: `<input type="text" placeholder="文本输入键盘"/>`
      }, {
        html: `<input type="number" placeholder="数字输入键盘"/>`
      }, {
        html: `<input type="idcard" placeholder="身份证输入键盘"/>`
      }, {
        html: `<input type="digit" placeholder="带小数点的数字输入键盘"/>`
      }
    ]
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
    wx.reLaunch({
      url: '../../index/index',
    })
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