// pages/components/cloud/components/fileRestore/index.js
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

    lifetimes: {
      async created() {
          await this.getImg()
      }
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
      // 文件存储 获取已上传文件
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

      // 文件存储 更换图片
      async updateImg() {
          // 需用户登录 用户 openid 作为存储索引
          let that = this
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
              var openid = getApp().globalData.openid
              wx.chooseImage({
                  count: 1,
                  sizeType: ['original', 'compressed'],
                  sourceType: ['album', 'camera'],
                  success: async res => {
                      let fileID = that.data.imgUrl
                      if(fileID){
                          await deleteFile(fileID) // 删除已有文件
                      }
                      const filePath = res.tempFilePaths[0]
                      const cloudPath = `${openid}-${(new Date).getTime()}`
                      fileID = await uploadFile(cloudPath, filePath) // 上传新文件
                      await updateFileID(fileID) // 数据库中更新文件 ID
                  }
              })
  
              // 上传文件到云存储
              const uploadFile = async (cloudPath, filePath) => {
                  const res = await wx.cloud.uploadFile({
                      cloudPath,
                      filePath
                  })
                  const fileID = res.fileID
                  this.setData({
                      imgUrl: fileID
                  })
                  return fileID
              }
              // 从云存储中删除文件
              const deleteFile = async fileID => {
                  let res =  await wx.cloud.deleteFile({
                      fileList: [fileID]
                  })
              }
              // 云数据库中更新对应用户上传的文件
              const updateFileID = async newFileID => {
                  const event = {
                      envID: getApp().globalData.envID,
                      openid: getApp().globalData.openid,
                      action: 'update',
                      fileID: newFileID
                  }
                  await wx.cloud.callFunction({
                      name: 'fileRestore',
                      data: event
                  })
              }
          }
      }
  }
})
