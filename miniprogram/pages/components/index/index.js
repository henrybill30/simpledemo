const app = getApp()
Page({
  data: {
    admin: 0,
    windowWidth: 0,
    windowHeight: 0,
    list: [
      {
        name: '组件',
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
          },
        ]
      },
      {
        name: 'API与语法',
        list: [
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
      {
        name: '云开发',
        list: [
          {
            id: 'cloudfunction',
            name: '云函数',
            imgUrl: './pics/function.png',
            url: '../cloudFunction/index',
            children: ['简单云函数', '获取信息']
          },
          {
            id: 'cloudDatabase',
            name: '云数据库',
            imgUrl: './pics/Cloudserver.png',
            url: '../cloudDatabase/index',
            children: ['创建集合', '添加数据', '查询数据', '更新数据', '删除数据', '服务端时间']
          },
          {
            id: 'cloudStorage',
            name: '云存储',
            imgUrl: './pics/Cloudstorage.png',
            url: '../cloud/cloud',
            children: ['存储文本', '存储文件', '删除文件']
          },
          {
            id: 'cloudAPI',
            name: '云调用',
            imgUrl: './pics/cloudAPI.png',
            url: '../cloud/cloud',
            children: ['小程序码', 'ocr']
          }
        ]
      }
    ],
  },
  onLoad: function() {
    let that = this
    console.log(getApp().globalData)
    that.setData({
      windowWidth: getApp().globalData.windowWidth,
      windowHeight: getApp().globalData.windowHeight
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
      for( let j = 0, lenj = list[i].list.length; j<lenj; ++j){
        if (list[i].list[j].id === id) {
          list[i].list[j].open = !list[i].list[j].open
        } else { 
          list[i].list[j].open = false
        }
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

  async test() {
    wx.chooseImage({
      count:1,
      success: res =>{
        wx.request({
          url: res.tempFilePaths[0],
          responseType: 'arraybuffer',
          success: async image => {
            let result = await wx.cloud.callFunction({
              name: 'printText',
              data: {
                envID: getApp().globalData.envID,
                buffer: image.data
              }
            })
            console.log(result)
          }
        })
        // console.log(res.tempFilePaths)
        // let result = await wx.cloud.callFunction({
        //   name: 'printText',
        //   data: {
        //     envID: getApp().globalData.envID,
        //     imgurl: res.tempFilePaths[0]
        //   }
        // })
        // console.log(result.items)
      },
      complete: (res) => {},
    })
  }
})