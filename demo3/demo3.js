const app = getApp()

Page({
  data: {
    switchValue: "none",
    radioValue: "none",
    checkBoxValue: "none",
    timePickerValue: "09:30",
    sliderValue: 0
  },
  switchChange: function (e) {
    this.setData({
      switchValue: e.detail.value
    }),
      console.log('switch发生change事件，携带value值为：', e.detail.value)
  },
  radioBoxChange: function (e) {
    this.setData({
      radioValue: e.detail.value
    }),
      console.log('radiobox发生change事件，携带value值为：', e.detail.value)
  },
  checkBoxChange: function (e) {
    this.setData({
      checkBoxValue: e.detail.value
    }),
      console.log('checkbox发生change事件，携带value值为：', e.detail.value)

  },

  timePickerChange: function (e) {
    this.setData({
      timePickerValue: e.detail.value
    }),
      console.log('Time picker发生change事件，携带value值为：', e.detail.value)
  },

  sliderChange: function (e) {
    this.setData({
      sliderValue: e.detail.value
    }),
      console.log('slider发生change事件，携带value值为：', e.detail.value)
  },
  onGotUserInfo: function (e) {
    console.log(e.detail.userInfo),
      this.setData({
        buttonValue: e.detail.userInfo.nickName
      })
  },

  onLoad: function (options) {
  },
})
