// pages/components/condition/condition.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage: 0,
    pageNum: 3,
    nbTitle: '',
    titleArr: ['wx:if使用', 'wx:elif使用', 'wx:else使用'],
    x: false,
    randomNum: Math.round(Math.random()*10),
    guessNum: -1,
    randomNum1: Math.round(Math.random() * 10),
    guessNum1: -1,
    imagePos:[
      '上','下','左','右','左上','右上','左下','右下','中间'
    ],
    imgUrl: '../../../resource/cat.jpg',
    index: 0,
  },

  xChange: function (e) {
    this.setData({
      x: e.detail.value
    })
  },

  guess: function(e) {
    if(e.detail.value==""){
      this.setData({
        guessNum: -1
      })
      return
    }
    if((e.detail.value>=10||e.detail.value<0)||(!/^[0-9]+.?[0-9]*$/.test(e.detail.value))){
      wx.showToast({
        title: '请输入一个10以内的数字！',
        icon: 'none'
      })
      return
    } 
    this.setData({
      guessNum: e.detail.value
    })
    if(e.detail.value!=this.data.randomNum){
      wx.showToast({
        title: '猜错了，再猜！',
        icon: 'none'
      })
    }
  },

  guess1: function (e) {
    if(e.detail.value==""){
      this.setData({
        guessNum1: -1
      })
      return
    }
    this.setData({
      guessNum1: e.detail.value
    })
  },

  bindPickerChange(e) {
    this.setData({
      index: e.detail.value
    })
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

// wxifcode: [
//       {
//         html: 
// `<switch bindchange="xChange">显示控制</switch>
// <block wx:if="{{x}}" >
//   <view> 第一个显示单元 </view>
//   <view>
//     <text>progress进度条</text>
//   <progress percent="80" ></progress>
//   </view>
//     <view>image图片</view>
//     <image style="width: 200px; height: 200px;" mode="scaleToFill" src="../../../resource/cat.jpg">  </image>
//   <view> …… </view>
//   <view> 第N个显示单元 </view>
// </block>`,
// js:
// `Page({
//   data: {
//     x: false,
//   },
//   xChange: function (e) {
//     this.setData({
//       x: e.detail.value
//     })
//   },
// })`
//       },
//       {
// html:
// `<view >猜数字</view>
// <view class="weui-cells weui-cells_after-title">
//   <view class="weui-cell weui-cell_input">
//     <input class="weui-input" placeholder="10以内数字" type="number" bindconfirm="guess"></input>
//   </view>
// </view>
// <view wx:if="{{guessNum==randomNum}}">
//   <text>恭喜猜对了！！！这样我才会显示</text>
// </view>`,
// js:
// `Page({
//   data: {
//     randomNum: Math.round(Math.random()*10),
//     guessNum: -1,
//   },
//   guess: function(e) {
//     this.setData({
//       guessNum: e.detail.value
//     })
//   },
// })`
//       },
//       {
// html:
// `<view class="weui-label">显示图片位置</view>
// <picker bindchange="bindPickerChange" value="{{index}}" range="{{imagePos}}">
//   <view class="weui-input">{{imagePos[index]}}</view>
// </picker>
//  <view wx:if="{{index==0}}" style="display:flex; justify-content: center;">
//   <image style="width: 400rpx; height: 400rpx;" src="{{imgUrl}}" mode="top"></image>
// </view>
// <view wx:elif="{{index==1}}" style="display:flex; justify-content: center;">
//   <image style="width: 400rpx; height: 400rpx;" src="{{imgUrl}}" mode="bottom"></image>
// </view>
// <view wx:elif="{{index==2}}" style="display:flex; justify-content: center;">
//   <image style="width: 400rpx; height: 400rpx;" src="{{imgUrl}}" mode="left"></image>
// </view>
// <view wx:elif="{{index==3}}" style="display:flex; justify-content:center">
//   <image style="width: 400rpx; height: 400rpx;" src="{{imgUrl}}" mode="right"></image>
// </view>
// <view wx:elif="{{index==4}}" style="display:flex; justify-content:center">
//   <image style="width: 400rpx; height: 400rpx;" src="{{imgUrl}}" mode="top left"></image>
// </view>
// <view wx:elif="{{index==5}}" style="display:flex; justify-content:center">
//   <image style="width: 400rpx; height: 400rpx;" src="{{imgUrl}}" mode="top right"></image>
// </view>
// <view wx:elif="{{index==6}}" style="display:flex; justify-content:center">
//   <image style="width: 400rpx; height: 400rpx;" src="{{imgUrl}}" mode="bottom left"></image>
// </view>
// <view wx:elif="{{index==7}}" style="display:flex; justify-content:center">
//   <image style="width: 400rpx; height: 400rpx;" src="{{imgUrl}}" mode="bottom right"></image>
// </view>
// <view wx:elif="{{index==8}}" style="display:flex; justify-content:center">
//   <image style="width: 400rpx; height: 400rpx;" src="{{imgUrl}}" mode="center"></image>
// </view>`,
// js:
// `Page({
//   data: {
//     imagePos:[
//       '上','下','左','右','左上','右上','左下','右下','中间'
//     ],
//     imgUrl: '../../../resource/cat.jpg',
//     index: 0,
//   },
//   bindPickerChange(e) {
//     this.setData({
//       index: e.detail.value
//     })
//   },
// })`
//       },
//       {
// html:
// `<switch bindchange="xChange" >显示控制</switch>
// <block wx:if="{{!x}}" >
//   <text>\nx为false显示这一单元</text>
// </block>
// <block wx:else>
//   <text>\nelse,显示这一单元</text>
// </block>`,
// js:
// `Page({
//   data: {
//     x: false,
//   },
//   xChange: function (e) {
//     this.setData({
//       x: e.detail.value
//     })
//   },
// })`
//       },
//       {
// html:
// `<view>猜数字升级</view>
// <view class="weui-cells weui-cells_after-title">
//   <view class="weui-cell weui-cell_input">
//     <input class="weui-input" placeholder="10以内数字" type="number" bindconfirm="guess"></input>
//   </view>
// </view>
// <view wx:if="{{guessNum==randomNum}}">
//   <text>恭喜猜对了！！！这样我才会显示</text>
// </view>
// <view wx:elif="{{guessNum==-1}}">
//   <text>准备开始</text>
// </view>
// <view wx:else>
//   <text>猜错了...再猜一次！</text>
// </view>`,
// js:
// `Page({
//   data: {
//     randomNum: Math.round(Math.random()*10),
//     guessNum: -1,
//   },
//   guess: function(e) {
//     this.setData({
//       guessNum: e.detail.value
//     })
//   },
// })`
//       }
//     ]