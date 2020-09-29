// miniprogram/pages/person/feedback/index.js
import Toast from '../../../lib/dist/toast/toast'
import Notify from '../../../lib/dist/notify/notify'

Page({
  data: {
    options: [
      "样式太简单",
      "组件内容不全面",
      "组件内容有bug",
      "操作说明不清晰",
      '其他'
    ],
    checkedOptions: [],
    step: 1, // 运行步骤
    otherInfo: '', // 其他信息
    contact: '', // 联系方式
    imgList: [], // 图片
    deletable: false // 图片选择使用
  },
  
  // options 选择
  onChange(event) {
    this.setData({
      checkedOptions: event.detail,
    });
  },
  // 复选框状态更换
  toggle(event) {
    const { index } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${index}`);
    checkbox.toggle();
  },
  noop() {},
  nextStep: async function () {
    if(this.data.checkedOptions.length === 0) {
      Notify({
        type: 'danger',
        message: '至少选择一项'
      })
      return
    }
    this.setData({
      step: 2
    })
  },
  // 其他信息
  getInputValue: function (e) {
    this.setData({
      otherInfo: e.detail.value
    })
  },
  // 联系方式
  onContactChange: function(e) {
    this.setData({
      contact: e.detail
    })
  },
  // 图片选择 - 本地选择完成后
  async afterRead(event) {
    let curImgList = this.data.imgList
    let tmpImgList = event.detail.file
    tmpImgList = tmpImgList.map(img => {
      const res = {
        url: img.path,
        status: 'uploading'
      }
      return res
    })
    curImgList.push(...tmpImgList)
    this.setData({
      imgList: curImgList
    })
    await this.uploadToCloud()
  },
  // 上传图片到云数据库
  async uploadToCloud() {
    wx.cloud.init();
    let { imgList } = this.data;
    if (!imgList.length) {
      return
    }
    // 待上传图片
    let undoneImgList = imgList.reduce((acc, cur) => {
      if(cur.status !== 'done') {
        acc.push(cur)
      }
      return acc
    }, [])
    // 已上传图片
    let doneImgList = imgList.reduce((acc, cur) => {
      if(cur.status === 'done') {
        acc.push(cur)
      }
      return acc
    }, [])
    for(let img of undoneImgList) {
      const urlArr = img.url.split('.')
      const imgSuffix = urlArr[urlArr.length - 1]
      const cloudPath = `feedback-${(new Date()).getTime()}.${imgSuffix}`
      const filePath = img.url
      const res = await wx.cloud.uploadFile({
        cloudPath,
        filePath
      })
      // 更改为 云 fileID，及上传状态
      doneImgList.push({
        url: res.fileID,
        status: 'done'
      })
    }
    this.setData({
      imgList: doneImgList
    })
  },
  // 提交反馈
  confirm: async function () {
    let content = this.data.checkedOptions.join(';')
    const { otherInfo, component = {} } = this.data
    if(otherInfo !== '') {
      content = [content, otherInfo].join(';')
    }
    // 只使用 url 即 云存储中的 fileID
    const imgList = this.data.imgList.reduce((acc, cur) => {
      acc.push(cur.url)
      return acc
    }, [])

		const event = {
      envID: getApp().globalData.envID,
      action: 'add',
      data: {
        openid: getApp().globalData.openid,
        title: content.slice(0, 19),
        content,
        timestamp: (new Date()).getTime(),
        contact: this.data.contact,
        imgList,
        component
      }
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
  onLoad: function (opt) {
    // 组件信息
    if(opt.component) {
      this.setData({
        component: JSON.parse(opt.component)
      })
    }
  },
  onReady: function () { },
  onShow: function () { },
  onHide: function () {
  },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () {
    return {
      title: '组件学习',
      path: '/pages/components/index/index',
      imageUrl: 'cloud://simpledemo-9jk60.7369-simpledemo-9jk60-1302043964/resource/小程序头像.png'
    }
  }
});
