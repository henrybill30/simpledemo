// miniprogram/pages/person/feedback/index.js
import Toast from '../../../lib/dist/toast/toast'

Page({
  data: {
    options: [{
      title: "Bug反馈",
      code: 103
    }, {
      title: "功能需求",
      code: 200
    }, {
      title: "吐槽",
      code: 300
    }],
    choose: 103,
    content: ""
  },
  getOption: function (e) {
    this.setData({
      choose: parseInt(e.currentTarget.dataset.code)
    });
  },
  getInputValue: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  confirm: async function () {
		if(!this.data.content) {
				return
    }
		const event = {
      envID: getApp().globalData.envID,
      openid: getApp().globalData.openid,
      type: this.data.choose,
      title: this.data.content.slice(0, 19),
      content: this.data.content,
      timestamp: (new Date()).getTime(),
      action: 'add'
		}
    Toast.loading({
      message: '正在提交...'
    })
		try {
      await wx.cloud.callFunction({
      		name: 'feedback',
      		data: event
      })
      Toast.success('反馈成功！')
      const timeId = setTimeout(() => {
        wx.navigateBack()
        clearTimeout(timeId)
      }, 1500)
		} catch(e) {
			console.error(e)
      Toast.fail('提交失败！')
		}
  },
  onLoad: function (opt) { },
  onReady: function () { },
  onShow: function () { },
  onHide: function () {
  },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () { }
});
