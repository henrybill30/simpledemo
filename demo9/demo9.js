// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    step: 1,
    inputValue1: '',
    result1: ''
  },
  textarea1: function (e) {
    var value = e.detail.value;
    console.log(e)
    this.setData({
      inputValue1: value
    })
  },
  upload: function () {
    var textarea1 = this.data.inputValue1;
    var db = wx.cloud.database()
    db.collection("notebook").add({
      data: {
        textarea1: this.data.inputValue1,
      },
      success: res => {
        wx.showToast({
          title: '上传成功',
        })
        this.setData({
          counterId: res._id, count: 1
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none', title: '上传失败',
        })
        console.error('[数据库] [录入记录] 失败：', err)
      },
    })
  },
  read: function () {
    var that = this;
    wx.cloud.callFunction({
      name: "query",
      success: function (res) {
        var result1 = res.result.data[0].textarea1;
        wx.showToast({
          title: '读取成功',
        })
        console.log(res)
        that.setData({
          inputValue1: result1,
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none', title: '上传失败',
        })
      }
    })
  },
  nextStep: function () {
      this.setData({
        step: this.data.step + 1
      })
    if (this.data.step === 5) {
      console.group('微信开发者文档')
      console.log('https://developers.weixin.qq.com/')
      console.groupEnd()
    }
  },
  prevStep: function () {
    this.setData({
      step: this.data.step - 1
    })
  }
})