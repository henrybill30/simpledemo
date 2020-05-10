Page({

  /**
   * 页面的初始数据
   */
  data: {
    sliderValue1: 0,
    sliderValue2: 0,
    jichu: [
      {
        html: `<slider bindchange="sliderChange">slider滑块</slider>`
      }
    ],
    zengqiang: [
      {
        html: `<slider show-value/>`
      }, {
        html: `<slider show-value step="5"/>`
      }, {
        html: `<slider min="50" max="200" show-value/>`
      }, {
        html: `<slider block-color="#DBFC00" show-value/>`
      }, {
        html: `<slider block-size="12" show-value/>`
      }
    ], 
    event: [
      {
        html: 
        `<slider bindchanging="sliderChange1" show-value/>
        <view>slider组件当前值为：{{sliderValue1}}</view>`,
        js: 
        `Page({
        　data: {
        　　sliderValue1: 0,
        　},
        　sliderChange1: function (e) {
        　　console.log('slider发生change事件，携带value值为：', e.detail.value)
        　　this.setData({
        　　　sliderValue1: e.detail.value
        　　})
        　}
        })`
      }, {
        html: 
        `<slider bindchanging="sliderChange2" show-value/>
        <view>slider组件当前值为：{{sliderValue2}}</view>`,
        js:
        `Page({
        　data: {
        　　sliderValue1: 0,
        　},
        　sliderChange2: function (e) {
        　　console.log('slider发生change事件，携带value值为：', e.detail.value)
        　　this.setData({
        　　　sliderValue2: e.detail.value
        　　})
        　}
        })`
      }
    ]
  },

  sliderChange1: function (e) {
    console.log('slider发生change事件，携带value值为：', e.detail.value)
    this.setData({
      sliderValue1: e.detail.value
    })
  },
  sliderChange2: function (e) {
    console.log('slider发生changeing事件，携带value值为：', e.detail.value)
    this.setData({
      sliderValue2: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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