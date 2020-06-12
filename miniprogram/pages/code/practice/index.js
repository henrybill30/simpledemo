// miniprogram/pages/code/practice/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //页面传参---确定组件
    name: '',
    type: '',
    num: 0,

    //view_basic_1数据
    view_basic_1_content: '这是增加了点击态效果的view组件',
    view_basic_1_starttime: 10,
    view_basic_1_staytime: 400,
    view_basic_1_list: [
      {
        name: 'hover-start-time',
        type: 'number',
        describe: '按住后多久出现点击态，单位毫秒'
      },
      {
        name: 'hover-stay-time',
        type: 'number',
        describe: '手指松开后点击态保留时间，单位毫秒'
      },
      {
        name: '文本内容',
        type: 'String',
        describe: '显示的文本'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: options.name,
      type: options.type,
      num: options.num
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