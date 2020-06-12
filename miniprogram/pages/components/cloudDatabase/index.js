var timer
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeId: '',
    currentPage: 0, // 子组件索引
    components: [
        {
            title: '创建集合',
            name: 'createCollection',
            type: 'basic',
            num: 0
        },{
          title: '添加数据',
          name: 'addData',
          type: 'basic',
          num: 0
        },
        {
          title: '查询数据',
          name: 'getData',
          type: 'basic',
          num: 0
        },
        {
          title: '更新数据',
          name: 'updateData',
          type: 'basic',
          num: 0
        },
        {
          title: '删除数据',
          name: 'deleteData',
          type: 'basic',
          num: 0
        },
        {
          title: '服务端时间',
          name: 'serverTime',
          type: 'basic',
          num: 0
        },
    ]
  },
  
  async onTabChange(e) {
    await this.addRecord()
    this.setData({
      currentPage: e.detail.name
    })
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
    const currentPage = parseInt(options.index) || 0
    this.setData({
      currentPage,
      orcbtn: getApp().globalData.movedBtn
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