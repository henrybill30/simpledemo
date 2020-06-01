const app = getApp()
Page({
  data: {
    admin: 0,
    windowWidth: 0,
    windowHeight: 0,
    list: [
      {
        id: 'information',
        imgUrl: './pics/information.png',
        name: '信息呈现',
        url: '../information/information',
        children: ['view', 'text', 'icon', 'progress', 'rich-text', 'swiper']
      },
      {
        id: 'dataAndinteract',
        name: '数据与交互',
        imgUrl: './pics/dataAndInteract.png',
        url: '../dataAndinteract/dataAndinteract',
        children: ['button', 'switch', 'radio', 'checkbox', 'picker', 'slider', 'input', 'form']
      },
      {
        id: 'arrayAndloop',
        name: '数组与循环',
        imgUrl: './pics/arrayAndLoop.png',
        url: '../arrayAndloop/arrayAndloop',
        children: ['wx-for']
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
        children: ['系统信息', '传感器', '震动', '扫码', '获取位置信息']
      },
      {
        id: 'Storage',
        name: '数据缓存',
        imgUrl: './pics/Storage.png',
        url: '../Storage/Storage',
        children: ['wx.setStorageSync', 'wx.getStorageSync', 'wx.getStorageInfo', 'wx.removeStorageSync']
      },
      {
        id: 'nativeComponent',
        name: '原生组件',
        imgUrl: './pics/nativeCpmponent.png',
        url: '../nativeComponent/nativeComponent',
        children: ['audio', 'video', 'map', 'canvas', 'camera']
      }, {
        id: 'layout', // 路径
        name: '样式布局', // 类目说明
        imgUrl: './pics/layout.png',
        url: '../layout/layout',
        children: ['flex 布局']
      }, {
        id: 'cloud',
        name: '云开发',
        imgUrl: './pics/cloud.png',
        url: '../cloud/cloud',
        children: ['云函数', '云数据库', '云存储']
      }
    ]
  },
  onLoad: function() {
    let that = this
    if (!app.globalData.openid) {
      wx.redirectTo({
        url: "/pages/login/login"
      })
      console.log('[main]login please')
    } else {
      console.log('[main]login success')
    }
    let res = wx.getSystemInfoSync()
    console.log("宽1: " + res.screenWidth)
    console.log("宽2: " + res.windowWidth)
    that.setData({
      windowWidth: res.screenWidth,
      windowHeight: res.windowHeight
    })
    wx.cloud.callFunction({
      name: 'getAdmin',
      success: res => {
        if (res.result.admin_openid == getApp().globalData.openid) {
          that.setData({
            admin: 1
          })
          getApp().globalData.isAdmin = true
        }
      }
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
  }
})