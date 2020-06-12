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
      let res =null
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
      const tempFilePaths = res.tempFilePaths[0]
      that.setData({
        imgUrl: tempFilePaths
      })
      var text = await that.ocr(tempFilePaths, 8)
      that.setData({
        text: text
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
      const idtempFilePaths = res.tempFilePaths[0]
      that.setData({
        idcardUrl: idtempFilePaths
      })
      var text = await that.ocr(that.data.idcardUrl, 1)
      that.setData({
        idcard: text
      })
      wx.hideLoading()
    },

    async uploadFile2Cloud (cloudPath, filePath) {
        
      const res =await wx.cloud.uploadFile({
          cloudPath,
          filePath
      })
      return res.fileID
    },
  
    async getTempFileURLfromCloud (fileID) {
      const res = await wx.cloud.getTempFileURL({
          fileList: [{
              fileID,
              maxAge: 60 * 60, // one hour
          }]
          })
      return res.fileList[0].tempFileURL
    },
  
    async ocr (imgUrl, ocr_type) {
      // 参考：https://developers.weixin.qq.com/community/servicemarket/detail/000ce4cec24ca026d37900ed551415
      const data = {
          img_url: new wx.serviceMarket.CDN({
            type: 'filepath',
            filePath: imgUrl,
          }),
          data_type: 3, // 图片 url
          ocr_type: ocr_type // 通用 OCR
      }
      const res = await wx.serviceMarket.invokeService({
          service: 'wx79ac3de8be320b71', // '固定为服务商OCR的appid，非小程序appid',
          api: 'OcrAllInOne',
          data
      })
      // console.log(res)
      var code = null
      if(ocr_type == 8){
        let results = res.data.ocr_comm_res.items
        code = results.reduce((acc, cur) => {
            acc += `\n${cur.text}`
            return acc
        }, '')
      }else if(ocr_type == 1){
        let result = res.data.idcard_res
        code = result
      }
      
      return code
    },
  },
})
