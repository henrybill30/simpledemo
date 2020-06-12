const app = getApp()
var timer
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
  
  onShow(){
    this.setData({
      orcbtn: getApp().globalData.movedBtn
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
  }
})