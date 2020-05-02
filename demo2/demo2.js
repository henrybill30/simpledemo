const app = getApp()

Page({
  data: {},
  switchChange: function (e) {
    console.log('switch发生change事件，携带value值为：', e.detail.value)
  },
  radioBoxChange: function (e) {
    console.log('radiobox发生change事件，携带value值为：', e.detail.value)
  },
  checkBoxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  sliderChange: function (e) {
    console.log('slider发生change事件，携带value值为：', e.detail.value)
  },
  onGotUserInfo: function (e) {
    console.log(e.detail.userInfo)
  },

  onLoad: function (options) {
    this.setData({
      title: options.title
    })
  },
})
