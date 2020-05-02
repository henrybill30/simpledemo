// demo7/demo7.js
Page({

  keyInput: function (e) {
    this.setData({ key: e.detail.value })
  },
  valueInput: function (e) {
    this.setData({ value: e.detail.value })
  },
  setStorageSync: function (e) {
    let key = this.data.key
    if (key.length == 0) {
      wx.showToast({
        title: 'KEY不能为空',
      })
    }
    else {
      wx.setStorageSync(key, this.data.value)
    }
  },
  removeStorageSync: function () {
    let key = this.data.key;
    wx.removeStorageSync(key)
    wx.showToast({
      title: '删除成功',
    })
  },
  getStorageSync: function () {
    var that = this
    let key = this.data.key
    var data = wx.getStorageSync(key)
    if (data) {
      that.setData({ value: data })
    }
    else {
      wx.showToast({
        title: '没有数据',
      })
      console.log(key)
    }
  },
})