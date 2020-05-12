Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:[
      {
        'html': 
`<view>这是一个简单的view组件</view>`
      },
      {
        'html':
`<view hover-class="view2" hover-start-time="10" hover-stay-time="400">这是增加了点击态效果的view组件</view>`
      },
      {
        'html':
`<view style="display:flex;">
  <view style='background-color:red;flex-grow:1;height:100rpx;'>水平</view>
  <view style='background-color:rgb(105, 170, 243);flex-grow:1;height:100rpx;'>并排</view>
  <view style='background-color:rgba(146, 245, 162, 0.932);flex-grow:1;height:100rpx;'>view组件</view>
</view>`
      },
      {
        html:
`<view style='display:flex;height:100rpx;'>
  <view style='background-color:red;width:250rpx'>左右</view>
  <view style='flex-grow:1;display:flex;flex-direction:column;'>
    <view style='flex-grow:1;background-color:rgb(105, 170, 243)'>混合</view>
    <view style='flex-grow:1;background-color:rgba(146, 245, 162, 0.932)'>view组件</view>
  </view>
</view>`
      },
      {
        html:
`<view style='display:flex;flex-direction:column;height:150rpx;'>
  <view style='flex-grow:1;background-color:red'>上下</view>
  <view style='flex-grow:1;background-color:rgb(105, 170, 243)'>排列</view>
  <view style='flex-grow:1;background-color:rgba(146, 245, 162, 0.932)'>view组件</view>
</view>`
      }
    ],
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