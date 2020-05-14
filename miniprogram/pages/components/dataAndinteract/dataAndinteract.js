// pages/components/information/information.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buttonForbid: false,
    toright: true,
    currentPage: 0,
    pageNum: 3,
    background: [
      {
        value: "view1",
        show: true
      }, {
        value: "view2",
        show: false
      }, {
        value: "view3",
        show: false
      }, {
        value: "view4",
        show: false
      },
    ]
    
  },
  
  tobefore(e) {
    if (this.data.currentPage === 0 || this.data.buttonForbid) {
      return
    }
    let list1 = this.data.background
    list1[parseInt(this.data.currentPage) - 1].show = true
    this.setData({
      background: list1,
      toright: false,
      buttonForbid: true
    })
    var query = wx.createSelectorQuery();
    //选择id
    var that = this;
    let width = 0;
    query.select('#container').boundingClientRect(function (rect) {
      // console.log(rect.width)
      // that.setData({
      width = rect.width
      // })
      that.animate('#slide-area', [
        { opacity: 1.0, translateX: 0 },
        { opacity: 1.0, translateX: 0.5 * width },
        { opacity: 1.0, translateX: width },
      ], 400, function () {
        let list2 = that.data.background
        list2[parseInt(that.data.currentPage)].show = false
        
        console.log(that.data.background)
          that.setData({
            background: list2,
            currentPage: parseInt(that.data.currentPage) - 1,
            toright: true,
            buttonForbid: false
          })
        that.clearAnimation('#slide-area', { opacity: true, translateX: true }, function () {
          
          console.log("清除了#container上的opacity和rotate属性")
        })
      }.bind(that))
    }).exec();

  },
  tonext(e) {
    if (this.data.currentPage === this.data.pageNum - 1 || this.data.buttonForbid) {
      return
    }
    let list1 = this.data.background
    list1[parseInt(this.data.currentPage) + 1].show = true
    console.log(list1, this.data.currentPage + 1)
    this.setData({
      background: list1,
      toright: true,
      buttonForbid: true
    })
    console.log(this.data.background)
    var query = wx.createSelectorQuery();
    //选择id
    var that = this;
    let width = 0;
    query.select('#container').boundingClientRect(function (rect) {
      // console.log(rect.width)
      // that.setData({
        width = rect.width
      // })
      that.animate('#slide-area', [
        { opacity: 1.0, translateX: 0 },
        { opacity: 1.0, translateX: -0.5 * width },
        { opacity: 1.0, translateX: -width },
      ], 400, function () {
          let list2 = that.data.background
          list2[parseInt(that.data.currentPage)].show = false
          that.setData({
            background: list2,
            currentPage: parseInt(that.data.currentPage) + 1,
            buttonForbid: false
          })
          console.log(that.data.background)
          that.clearAnimation('#slide-area', { opacity: true, translateX: true }, function () {
          console.log("清除了#container上的opacity和rotate属性")
        })
        }.bind(that))
    }).exec();
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   height: wx.getSystemInfoSync().windowHeight,
    //   width: wx.getSystemInfoSync().windowWidth
    // })
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