// pages/components/cloudAPI/components/ocr/index.js
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
    activeId: '',
    text: [],
    imgUrl: '',
    idcardUrl: '',
    idcard: {}
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
    async chooseImg(){
      let that = this
      let res = null
      try{
        res = await wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
        })
      } catch (err) {
        console.log(err)
        return
      }
      wx.showLoading({
        title: '识别中',
      })
      // tempFilePath可以作为img标签的src属性显示图片
      const tempFilePaths = res.tempFilePaths
      // console.log(res)
      that.setData({
        imgUrl: tempFilePaths[0]
      })
      let buffer = wx.getFileSystemManager().readFileSync(tempFilePaths[0])
      // console.log(buffer)
      let resText = null
      try{
        resText = await wx.cloud.callFunction({
          name: 'printText',
          data: {
            envID: getApp().globalData.envID,
            img: buffer
          }
        })
      } catch (err) {
        console.log(err)
      }
      that.setData({
        text: resText.result.items
      })
      wx.hideLoading()
      
    },
    async chooseIDcard(){
      let that = this
      let res = null
      try{
        res = await wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
        })
      } catch (err) {
        console.log(err)
        return
      }
      wx.showLoading({
        title: '识别中',
      })
      // tempFilePath可以作为img标签的src属性显示图片
      const tempFilePaths = res.tempFilePaths
      // console.log(res)
      that.setData({
        idcardUrl: tempFilePaths[0]
      })
      let buffer = wx.getFileSystemManager().readFileSync(tempFilePaths[0])
      // console.log(buffer)
      let resText = null
      try{
        resText = await wx.cloud.callFunction({
          name: 'idcard',
          data: {
            envID: getApp().globalData.envID,
            img: buffer
          }
        })
      } catch (err) {
        console.log(err)
      }
      if(resText.result.errCode==-1){
        wx.showToast({
          title: '请重新上传身份证！',
          icon: 'none'
        })
        return
      }
      wx.hideLoading()
      that.setData({
        idcard: resText.result
      })
    }
  }
})
