// pages/components/cloudFunction/components/userInfo/index.js
const envID = getApp().globalData.envID
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
    Openid: '',
    Unionid: '',
    Appid: '',
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

    async getInfo() {
      let result = await wx.cloud.callFunction({
        name: 'expGetInfo',
        data: {
          envID: envID,
        }
      })
      console.log(result.result)
      this.setData({
        Openid: result.result.openid,
        Unionid: result.result.unionid,
        Appid: result.result.appid
      })
    },
  }
})
