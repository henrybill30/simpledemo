Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: [
      {
        html:
`<icon type="success" size="50"></icon> \n<icon type="info" size="50"></icon> \n<icon type="warn" size="50" color="gray"></icon> \n<icon type="warn" size="40" ></icon> \n<icon type="waiting" size="40"></icon>`
      },
      {
        html:
`<icon type="success_no_circle" size="50"></icon> \n<icon type="circle" size="50"></icon> \n<icon type="download" size="50"></icon>`
      },
      {
        html:
`<icon type="info_circle" size="50"></icon> \n<icon type="cancel" size="50"></icon> \n<icon type="search" size="50"></icon>`
      },
    ],
    jichu: [
      '',
      '',
      '',
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
      url: '../../components/index/index',
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