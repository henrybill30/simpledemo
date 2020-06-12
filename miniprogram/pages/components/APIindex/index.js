const app = getApp()
var timer
Page({
  data: {
    admin: 0,
    windowWidth: 0,
    windowHeight: 0,
    list: [
      {
        id: 'lifecycle',
        name: '生命周期',
        imgUrl: './pics/lifecycle.png',
        url: '../lifecycle/lifecycle',
        children: ['页面钩子函数', '组件钩子函数']
      },
      {
        id: 'arrayAndloop',
        name: '数组与循环',
        imgUrl: './pics/arrayAndLoop.png',
        url: '../arrayAndloop/arrayAndloop',
        children: ['wx:for']
      },
      {
        id: 'condition',
        name: '条件与分支',
        imgUrl: './pics/condition.png',
        url: '../condition/condition',
        children: ['wx:if', 'wx:elif', 'wx:else']
      },
      {
        id: 'API',
        name: 'API与回调',
        imgUrl: './pics/API.png',
        url: '../API/API',
        children: ['系统信息', '传感器', '振动', '扫码', '获取位置信息']
      },
      {
        id: 'Storage',
        name: '数据缓存',
        imgUrl: './pics/Storage.png',
        url: '../Storage/Storage',
        children: ['wx.setStorageSync', 'wx.getStorageSync', 'wx.getStorageInfo', 'wx.removeStorageSync']
      },
    ]
  },
  onLoad: function() {
    let that = this
    console.log(getApp().globalData)
    that.setData({
      windowWidth: getApp().globalData.windowWidth,
      windowHeight: getApp().globalData.windowHeight
    })
  },
  onShow(){
    this.setData({
      orcbtn: getApp().globalData.movedBtn
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
  kindToggle(e) {
    const id = e.currentTarget.id
    const list = this.data.list
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        list[i].open = !list[i].open
      } else { 
        list[i].open = false
      }
    }
    this.setData({
      list
    })
    let query = wx.createSelectorQuery()
    query.select(`#id${e.currentTarget.id}`).boundingClientRect(function(rect){
      rect.top     // 节点的上边界坐标
    }) 
    query.selectViewport().scrollOffset(function(res){
      res.scrollTop  // 节点的竖直滚动位置
    })
    query.exec(function(res) {
      if(res[0].top+e.currentTarget.dataset.num*44>wx.getSystemInfoSync().windowHeight)
      wx.pageScrollTo({
        scrollTop: res[1].scrollTop+(res[0].top+e.currentTarget.dataset.num*44-wx.getSystemInfoSync().windowHeight)
      })
    })
  },
  onShareAppMessage: function () {

  },

  // async test() {
  //   let res = await wx.cloud.callFunction({
  //     name: 'delUsers',
  //     data: {
  //       envID: getApp().globalData.envID,
  //     }
  //   })
  //   console.log(res)
  // }
})