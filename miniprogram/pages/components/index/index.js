const app = getApp()
Page({
  data: {
    admin: 0,
    list: [
      {
        id: 'information',
        name: '信息呈现',
        open: false,
        pages: [
          ['view', 'view'], 
          ['text', 'text'], 
          ['icon', 'icon'], 
          ['progress', 'progress'], 
          ['rich-text', 'richtext'], 
          ['swiper', 'swiper']
        ]
      },
      {
        id: 'dataAndinteract',
        name: '数据与交互',
        open: false,
        pages: [
          ['button', 'button'], 
          ['switch', 'switch'], 
          ['radio', 'radio'], 
          ['checkbox', 'checkbox'], 
          ['picker', 'picker'], 
          ['slider', 'slider'], 
          ['input', 'input'], 
          ['form', 'form']
        ]
      },
      {
        id: 'arrayAndloop',
        name: '数组与循环',
        open: false,
        pages: [
          ['wx:for', 'wxfor']
        ]
      },
      {
        id: 'condition',
        name: '条件与分支',
        open: false,
        pages: [
          ['wx:if', 'wxif'], 
          ['wx:elif', 'wxelif'], 
          ['wx:else', 'wxelse']
        ]
      },
      {
        id: 'API',
        name: 'API与回调',
        open: false,
        pages: [
          ['系统信息', 'system'], 
          ['传感器', 'sensor'], 
          ['振动', 'vibration'], 
          ['扫码', 'scan'], 
          ['获取位置信息', 'location']
        ]
      },
      {
        id: 'Storage',
        name: '数据缓存',
        open: false,
        pages: [
          ['wx.setStorageSync', 'setStorage'], 
          ['wx.removeStorageSync', 'removeStorage'], 
          ['wx.getStorageSync', 'getStorage'], 
          ['wx.getStorageInfo', 'getInfo'], 
          ['wx.clearStorageSync', 'clearStorage']
        ]
      },
      {
        id: 'nativeComponent',
        name: '原生组件',
        open: false,
        pages: [
          ['audio', 'audio'],
          ['video', 'video'],
          ['map', 'map'],
          ['canvas', 'canvas'],
          ['camera', 'camera']
        ]
      },
    ]
  },
  onLoad: function() {
    // let that = this
    // if (!app.globalData.openid) {
    //   wx.navigateTo({
    //     url: "/pages/login/login"
    //   })
    //   console.log('[main]login please')
    // } else {
    //   console.log('[main]login success')
    // }
    // wx.cloud.callFunction({
    //   name: 'getAdmin',
    //   success: res => {
    //     if (res.result.admin_openid == getApp().globalData.openid) {
    //       that.setData({
    //         admin: 1
    //       })
    //     }
    //   }
    // })
  },
  to: function(e) {
    let id = e.target.dataset.id
    if (id == '1') {
      wx.navigateTo({
        url: '/demo1/demo1',
      })
    } else if (id == '2') {
      wx.navigateTo({
        url: '/demo2/demo2',
      })
    } else if (id == '3') {
      wx.navigateTo({
        url: '/demo3/demo3',
      })
    } else if (id == '4') {
      wx.navigateTo({
        url: '/demo4/demo4',
      })
    } else if (id == '5') {
      wx.navigateTo({
        url: '/demo5/demo5',
      })
    } else if (id == '6') {
      wx.navigateTo({
        url: '/demo6/demo6',
      })
    } else if (id == '7') {
      wx.navigateTo({
        url: '/demo7/demo7',
      })
    } else if (id == '8') {
      wx.navigateTo({
        url: '../../log/log',
      })
    } else if (id == '9') {
      wx.navigateTo({
        url: '../../tongji/tongji',
      })
    }
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
  }
})