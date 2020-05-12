Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: [
      {
        html: 
`<text slot="demonam">这是一个简单的text组件</text>`
      },
      {
        html:
`<text selectable="true">这是一个可选择的text组件</text>`
      },
      {
        html:
`<text slot="demoname" selectable="true" space="emsp">这   是   一个显示连续空格的text组件</text>`
      }
    ],
    jichu: [
      '<text slot="demonam">这是一个简单的text组件</text>',
      '<text selectable="true">这是一个可选择的text组件</text>',
      '<text slot="demoname" selectable="true" space="emsp">这   是   一个显示连续空格的text组件</text>'
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