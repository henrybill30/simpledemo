// pages/components/cloud/components/textRestore/index.js
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
        text: '',
        activeId: ''
    },

    lifetimes: {
        async created() {
            await this.getText()
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
    // 文本存储 更新已存储文本
    async updateText(e) {
        const event = {
            envID: getApp().globalData.envID,
            openid: getApp().globalData.openid,
            action: 'update',
            text: e.detail.value.textarea
        }
        await wx.cloud.callFunction({
            name: 'textRestore',
            data: event
        })
        await this.getText()
    },

    // 文本存储 获取已存储文本
    async getText() {
        const event = {
            envID: getApp().globalData.envID,
            openid: getApp().globalData.openid,
            action: 'get'
        }
        const res = await wx.cloud.callFunction({
            name: 'textRestore',
            data: event 
        })
        const data = res.result.data
        this.setData({
            text: data[0] && data[0].text
        })
    },
    }
})
