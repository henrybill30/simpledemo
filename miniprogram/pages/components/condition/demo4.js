const app = getApp()
Page({
  data: {
    array: ['美国', 'China', '巴西', '日本'],
    index: 1,
    num: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  to: function(e) {
    let id = e.target.dataset.id
    if (id == '1') {
      wx.navigateTo({
        url: '/demo5/demo5',
      })
    } else if (id == '2') {
      wx.reLaunch({
        url: '/index/index',
      })
    }
  },

  bindPickerChange: function(e) {
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

})