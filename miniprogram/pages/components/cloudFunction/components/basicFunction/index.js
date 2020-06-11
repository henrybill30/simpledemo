// pages/components/cloudFunction/components/basicFunction/index.js
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
    A: null,
    B: null,
    result: '',
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

    inputA(e) {
        this.setData({
            A: e.detail.value
        }) 
    },

    inputB(e) {
        this.setData({
            B: e.detail.value
        }) 
    },

    async sum() {
        let result = await wx.cloud.callFunction({
            name: 'expSum',
            data: {
                envID: envID,
                A: this.data.A,
                B: this.data.B
            },
        })
        console.log(result)
        this.setData({
            result: result.result.result
        })
    },
  }
})
