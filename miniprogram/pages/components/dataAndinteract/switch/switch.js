Page({

  /**
   * 页面的初始数据
   */
  data: {
    change1: "关闭",
    code:[
      {
        html:
`<switch bindchange="change1"/>{{change1}}
<switch disabled="false"/>禁用状态
<switch color="blue"/>改变颜色`,
        js:
`Page({
  data:{
    change1: "关闭"
  },
  change1: function(e){
    if(e.detail.value == true){
      this.setData({
        change1:"打开"  
      })
    }else{
      this.setData({
        change1:"关闭"
      })
    }
  },
})`
      }
    ],
    jichu: [
      {
        'js': '',
        'wxml': ''
      }
    ]
  },

  change1: function(e){
    console.log(e.detail)
    if(e.detail.value == true){
      this.setData({
        change1: "打开"
      })
    }else{
      this.setData({
        change1: "关闭"
      })
    }  
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