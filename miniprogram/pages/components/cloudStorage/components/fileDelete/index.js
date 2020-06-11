// pages/components/cloudStorage/components/fileDelete/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    imgUrl: '',
    activeId: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showMore(e){
      this.setData({
        activeId: e.detail.id
      })
    },
    // 文件
    async getImg() {
      if(!getApp().globalData.loginFlag){
        wx.showModal({
          title: '提示',
          content: '请先登录授权',
          confirmText: '前去登录',
          confirmColor: '#1685a9',
          cancelColor: '#9ea1a3',
          success: res => {
            if(res.confirm){
              wx.switchTab({
                url: '/pages/person/index'
              })
            }else if(res.cancel){
              wx.showToast({
                title: '这样就无法查看代码或收藏哦~',
                icon: 'none'
              })
            }
          }
        })
      }else{
        const event = {
          envID: getApp().globalData.envID,
          openid: getApp().globalData.openid,
          action: 'get'
        }
        try {
          const res = await wx.cloud.callFunction({
            name: 'fileRestore',
            data: event
          })
          const data = res.result.data
          this.setData({
            imgUrl: (data[0] && data[0].fileID)

          })
        } catch(e) {
          console.error(e)
          // this.setData({
          //     imgUrl: DEFAULT_IMG_URL
          // })
        }
      }
    },
    async deleteImg(){
      if(!getApp().globalData.loginFlag){
          wx.showModal({
            title: '提示',
            content: '请先登录授权',
            confirmText: '前去登录',
            confirmColor: '#1685a9',
            cancelColor: '#9ea1a3',
            success: res => {
              if(res.confirm){
                wx.switchTab({
                  url: '/pages/person/index'
                })
              }else if(res.cancel){
                wx.showToast({
                  title: '这样就无法查看代码或收藏哦~',
                  icon: 'none'
                })
              }
            }
          })
      }else{
        let res =  await wx.cloud.deleteFile({
            fileList: [this.data.imgUrl]
        })
        const event = {
            envID: getApp().globalData.envID,
            openid: getApp().globalData.openid,
            action: 'delete',
        }
        await wx.cloud.callFunction({
            name: 'fileRestore',
            data: event
        })
        await this.getImg()
        console.log(res)
      }
    }
  },
  lifetimes: {
    attached: async function(){
        await this.getImg()
    }
  }
})
