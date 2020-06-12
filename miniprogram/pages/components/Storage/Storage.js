var timer
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeId: '',
    currentPage: 0,
    pageNum: 4,
    nbTitle: '',
    titleArr: ['setStorage', 'getStorage', 'getStroageInfo', 'removeStorage'],
    key1: '',
    value1: '',
    disabled: true,
    disabled1: true,
    key2: '',
    value2: '',
    keys: [],
    currentSize: 0,
    limitSize: 0,
    allKey: [],
    allValue: [],
    key3: ''
  },
  showMore(e){
    this.setData({
      activeId: e.detail.id
    })
  },

  keyInput: function(e) {
    this.setData({
      key1: e.detail.value
    })
    if(this.data.value1!=''){
      this.setData({
        disabled: false
      })
    }
  },

  keyInput1: function (e) {
    this.setData({
      key2: e.detail.value,
      disabled1: false,
      value2: ''
    })
  },

  keyInput2: function(e) {
    this.setData({
      key3: e.detail.value,
      disabled2: false
    })
  },

  valueInput: function (e) {
    this.setData({
      value1: e.detail.value
    })
    if (this.data.key1 != '') {
      this.setData({
        disabled: false
      })
    }
  },

  setStorageSync: function() {
    try{
      wx.setStorageSync(this.data.key1, this.data.value1)
      let allk = this.data.allKey
      let allv = this.data.allValue
      allk.push(this.data.key1)
      allv.push(this.data.value1)
      this.setData({
        allKey: allk,
        allValue: allv
      })
      wx.showToast({
        title: '存储成功！',
        icon: 'success'
      })
    }catch(e) {
      console.log(e)
    }
  },

  getStorageSync: function(e) {
    // console.log("key2: " + this.data.key2)
    try {
      let value = wx.getStorageSync(this.data.key2)
      if (value) {
        this.setData({
          value2: value
        })
      } else {
        wx.showToast({
          title: '不存在该数据，请在上一组件中存储！',
          icon: 'none'
        })
      }
    }catch(e) {
      console.log(e)
    }
  },

  getStorageInfo: function(){
    try{
      let res = wx.getStorageInfoSync()
      this.setData({
        keys: res.keys,
        currentSize: res.currentSize,
        limitSize: res.limitSize
      })
    }catch(e) {
      console.log(e)
    }
  },

  removeStorageSync: function(){
    try{
      if(this.data.key3 == 'openid'){
        wx.showToast({
          title: '不能删除openid！！！',
          icon: 'none'
        })
        return
      }
      if(wx.getStorageSync(this.data.key3)){
        wx.removeStorageSync(this.data.key3)
      }else{
        wx.showToast({
          title: '不存在该键值',
          icon: 'none'
        })
      }
      let keys = wx.getStorageInfoSync().keys;
      let values = []
      for (let i=0;i<keys.length;i++){
        values[i] = wx.getStorageSync(keys[i])
      }
      this.setData({
        allKey: keys,
        allValue: values
      })
    }catch(e) {
      console.log(e)
    }
  },

  // 数据埋点
  async addRecord() {
    const components = this.data.components
    const currentPage = this.data.currentPage
    const event = {
        envID: getApp().globalData.envID,
        openid: getApp().globalData.openid,
        behavior: 'browse',
        component: components[currentPage].title,
        cpType: components[currentPage].type,
        cpNum: components[currentPage].num,
        time: new Date()
    }
    try {
        await wx.cloud.callFunction({
        name: 'addRecord',
        data: event
        })
    } catch(e) {
        console.error(e)
    }
  },
  async onTabChange(e) {
    await this.addRecord()
  },
  onTabChange(e) {
    this.setData({
      currentPage: e.detail.name
    })
  },

  btnMove(e){
    // console.log(e)
    if (timer) {
      // console.log('节流')
        clearTimeout(timer);
        timer = null;
    }
    timer = setTimeout(function () {
      // console.log(e)
      getApp().globalData.movedBtn = {
        x: e.detail.x,
        y: e.detail.y
      }
      console.log(getApp().globalData.movedBtn)
    }, 100)
  },

  toOCR(){
    wx.navigateTo({
      url: '../../person/ocr/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentPage: parseInt(options.index),
      nbTitle: this.data.titleArr[parseInt(options.index)],
      orcbtn: getApp().globalData.movedBtn
    })
    try{
      if(wx.getStorageSync('logs')){
        wx.removeStorageSync('logs')
      }
      let keys = wx.getStorageInfoSync().keys;
      let values = []
      for (let i = 0; i < keys.length; i++) {
        values[i] = wx.getStorageSync(keys[i])
      }
      this.setData({
        allKey: keys,
        allValue: values
      })
    }catch(e){
      console.log(e)
    }
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