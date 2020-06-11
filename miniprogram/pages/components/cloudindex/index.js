const app = getApp()
Page({
  data: {
    admin: 0,
    windowWidth: 0,
    windowHeight: 0,
    list: [
      {
        id: 'func',
        name: '云函数',
        imgUrl: './pics/云函数.png',
        url: '../cloudFunction/index',
        children: ['简单云函数', '获取信息']
      },{
        id: 'database',
        name: '云数据库',
        imgUrl: './pics/云数据库.png',
        url: '../cloudDatabase/index',
        children: ['创建集合', '添加数据', '查询数据', '更新数据', '删除数据', '服务端时间']
      },{
        id: 'storage',
        name: '云存储',
        imgUrl: './pics/云存储.png',
        url: '../cloudStorage/index',
        children: ['存储文本', '存储文件', '删除文件']
      },{
        id: 'cloudAPI',
        name: '云调用',
        imgUrl: './pics/cloudAPI.png',
        url: '../cloudAPI/index',
        children: ['小程序码', 'ocr']
      }
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