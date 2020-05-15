// pages/components/arrayAndloop/arrayAndloop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    active2: 'home',
    active3: 0,
    active4: 0,
    active5: 0,
    active6: 0,
    icon: {
      normal: 'https://img.yzcdn.cn/vant/user-inactive.png',
      active: 'https://img.yzcdn.cn/vant/user-active.png'
    },


    currentPage: 0,
    pageNum: 1,
    icon: {
      active: './积木编程.png',
      inactive: './积木编程.png',
    },
    //wxfor
    array: ['美国', '中国', '巴西', '日本'],
    index: 1,
    num: [1, 2, 3, 4],
  },
  //wxfor
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
    console.log('picker发生change事件，携带value值为：', e.detail.value)
    let logs = wx.getStorageSync('logs') || []
    logs.unshift({
      operation: true,
      time: Date.now(),
      type: "bindPickerChange",
      value: e.detail.value
    })
    wx.setStorageSync('logs', logs)
  },
  tobefore(e) {
    if (this.data.currentPage === 0) {
      return
    }
    this.setData({
      currentPage: parseInt(this.data.currentPage) - 1
    })
  },
  tonext(e) {
    if (this.data.currentPage === this.data.pageNum - 1) {
      return
    }
    this.setData({
      currentPage: parseInt(this.data.currentPage) + 1
    })
  },
  onChange(event) {
    console.log(event)
    const { key } = event.currentTarget.dataset;
    this.setData({ [key]: event.detail });
  },

  handleChange(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({ [key]: event.detail });
    wx.showToast({ title: `点击标签 ${event.detail + 1}`, icon: 'none' });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentPage: parseInt(options.index)
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

// wxforcode: [
//       {
//         html:
//           `<picker bindchange="bindPickerChange" value="{{index}}" range="{{array}}">
//   <view class="picker">
//     当前选择：{{array[index]}}
//   </view>
// </picker>`,
//         js:
//           `Page({
//   data: {
//     array: ['美国', '中国', '巴西', '日本'],
//     index: 1,
//     num: [1, 2, 3, 4, 5, 6, 7, 8, 9],
//   },
//   bindPickerChange: function (e) {
//     this.setData({
//       index: e.detail.value
//     })
//     console.log('picker发生change事件，携带value值为：', e.detail.value)
//     let logs = wx.getStorageSync('logs') || []
//     logs.unshift({
//       operation: true,
//       time: Date.now(),
//       type: "bindPickerChange",
//       value: e.detail.value
//     })
//     wx.setStorageSync('logs', logs)
//   },
// })`
//       },
//       {
//         html:
//           `<view wx:for='{{array}}'> 国家{{index}}：{{item}}</view>`
//       },
//       {
//         html:
//           `<view wx:for='array'> 国家{{index}}：{{item}}</view>`
//       },
//       {
//         html:
//           `<view wx:for='{{array}}' wx:for-index='countryID' wx:for-item='countryName' >国家{{countryID}}：{{countryName}}</view>`
//       },
//       {
//         html:
//           `<block wx:for="{{['red','orange','yelllow','green','blue','indigo','purple']}}">
//   <view style="display:flex; align-item: center">
//     <view style="flex-group:1">编号：{{index+1}} </view>
//     <view style="flex-group:1">颜色：{{item}} </view>
//   </view>
// </block>`
//       },
//       {
//         html:
//           `<view wx:for="{{num}}" wx:for-item='i' >
//   <view wx:for="{{num}}" wx:for-item='j' >
//     <view wx:if="{{i<=j}}">
//       {{i}}*{{j}}={{i*j}}
//     </view>
//   </view>
// </view>`
//       }
//     ]