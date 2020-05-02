const app = getApp()
Page({
  data: {
    array: ['美国', 'China', '巴西', '日本'],
    index: 1,
    num: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },

  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    }),
      console.log('picker发生change事件，携带value值为：', e.detail.value)
  },

})
