// miniprogram/pages/code/index.js
const envID = getApp().globalData.envID
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    type: '',
    num: 0,
    wxml: ``,
    js: ``,
    wxss: ``,
    cloudcode: ``,
    isExist: true
  },

  input(e) {
    console.log(e.detail.text)
  },

  async formSubmit(e) {
    console.log(e.detail.value)
    let value = e.detail.value
    this.setData({
      name: value.nameinput,
      type: value.typeinput,
      num: parseInt(value.numinput)
    })
    let result = await wx.cloud.callFunction({
      name: 'getComponent',
      data: {
        envID: envID,
        name: value.nameinput,
        type: value.typeinput,
        num: parseInt(value.numinput)
      }
    })
    // console.log(JSON.stringify(result))
    let code = {}
    if(result.result.data.length == 0){
      this.setData({
        isExist: false
      })
      this.Wxml.clear()
      this.Js.clear()
      this.Wxss.clear()
      this.Cloud.clear()
    }else {
      code = result.result.data[0].code
      this.Wxml.clear()
      this.Js.clear()
      this.Wxss.clear()
      this.Cloud.clear()
      if(code.html){
        this.Wxml.insertText({
          text: code.html
        })
      }
      if(code.js){
        this.Js.insertText({
          text: code.js
        })
      }
      if(code.css){
        this.Wxss.insertText({
          text: code.css
        })
      }
      if(code.cloudcode){
        this.Cloud.insertText({
          text: code.cloudcode
        })
      }
    }
    // console.log(this.Wxml)
  },

  async editorSubmit(e) {
    let that = this
    let html = await that.Wxml.getContents({})
    // console.log(html.text)
    let js = await that.Js.getContents({})
    let css = await that.Wxss.getContents({})
    let cloudcode = await that.Cloud.getContents({})
    let code = {
      html: html.text=="\n"?"":html.text,
      js: js.text=="\n"?"":js.text,
      css: css.text=="\n"?"":css.text,
      cloudcode: cloudcode.text=="\n"?"":cloudcode.text
    }
    console.log("code: " + JSON.stringify(code))
    if(that.data.isExist){
      let result = await wx.cloud.callFunction({
        name: 'updateComponent',
        data: {
          envID: envID,
          name: that.data.name,
          type: that.data.type,
          num: that.data.num,
          code: code
        }
      })
      console.log(JSON.stringify(result))
    }else {
      let result = await wx.cloud.callFunction({
        name: 'addComponent',
        data: {
          envID: envID,
          name: that.data.name,
          type: that.data.type,
          num: that.data.num,
          code: code
        }
      })
      console.log(JSON.stringify(result))
    }
  },

  onEditorReadyWxml() {
    let that = this
    const query = wx.createSelectorQuery()
    query.select('#editorWxml').context(function (res) {
      that.Wxml = res.context
    }).exec()
  },
  onEditorReadyJs() {
    let that = this
    const query = wx.createSelectorQuery()
    query.select('#editorJs').context(function (res) {
      that.Js = res.context
    }).exec()
  },

  onEditorReadyWxss() {
    let that = this
    const query = wx.createSelectorQuery()
    query.select('#editorWxss').context(function (res) {
      that.Wxss = res.context
    }).exec()
  },

  onEditorReadyCloud() {
    let that = this
    const query = wx.createSelectorQuery()
    query.select('#editorCloud').context(function (res) {
      that.Cloud = res.context
    }).exec()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    
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