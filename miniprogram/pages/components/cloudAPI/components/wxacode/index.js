// pages/components/cloudAPI/components/wxacode/index.js
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
    wxcodeUrl: ''
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

    async getWxCode(){
      this.setData({
        wxcodeUrl: 'cloud://simpledemo-9jk60.7369-simpledemo-9jk60-1302043964/wxacode_default_openapi_page.jpeg'
      })
      return
      let result = await wx.cloud.callFunction({
        name: 'openapi',
        data: {
          envID: getApp().globalData.envID
        }
      })
      console.log(result.result)
      this.setData({
        wxcodeUrl: result.result
      })
    }
  }
})
