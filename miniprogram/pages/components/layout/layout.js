// miniprogram/pages/components/layout/layout.js
// 样式布局
Page({

    /**
     * 页面的初始数据
     */
    data: {
      currentPage: 0,
      components: [
        {
          title: 'Flex 布局',
          name: 'layout',
          type: 'basic',
          num: 0,
        }
      ]
    },
    // 数据埋点
    async addRecord() {
        const components = this.data.components
        const currentPage = this.data.currentPage
        const event = {
            envID: getApp().globalData.envID,
            openid: getApp().globalData.openid,
            behavior: 'browse',
            component: components[currentPage].title,
            cpType: components[currentPage].type,
            cpNum: components[currentPage].num,
            time: new Date()
        }
        try {
            await wx.cloud.callFunction({
            name: 'addRecord',
            data: event
            })
        } catch(e) {
            console.error(e)
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
      // await insertDemoCode2CloudDatabase()
      await this.addRecord()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})


// 示例代码插入云数据库，只需执行一次
async function insertDemoCode2CloudDatabase () {
  const envID = getApp().globalData.envID
  const dataArr = [{
    envID,
    name: 'flex',
    type: 'centerVerticalHorizon',
    num: 0,
    code: {
      html: 
`<view class="center-vertical-horizon">
垂直水平居中
</view>`,
      js: ``,
      css: 
`.center-vertical-horizon {
display: flex;
justify-content: center;
align-items: center;
height: 200rpx;
}`
    }
  }, {
    envID,
    name: 'flex',
    type: 'flexStart',
    num: 0,
    code: {
      html:
`<view class="flex-start">
<view class="box" style="background-color: beige"></view>
<view class="box" style="background-color: ghostwhite"></view>
<view class="box" style="background-color: lightblue"></view>
</view>`,
      js: ``,
      css:
`.flex-start {
display: flex;
justify-content: flex-start;
}
.box {
height: 100rpx;
width: 100rpx;
}`
    }
  }, {
    envID,
    name: 'flex',
    type: 'flexColumn',
    num: 0,
    code: {
      html:
`<view class="flex-column">
<view class="box" style="background-color: beige"></view>
<view class="box" style="background-color: ghostwhite"></view>
<view class="box" style="background-color: lightblue"></view>
</view>`,
      js: ``,
      css:
`.flex-column {
display: flex;
flex-direction: column;
}
.box {
height: 100rpx;
width: 100rpx;
}`
    }
  }, {
    envID,
    name: 'flex',
    type: 'flexSpacebetween',
    num: 0,
    code: {
      html:
`<view class="flex-spacebetween">
<view class="box" style="background-color: beige"></view>
<view class="box" style="background-color: ghostwhite"></view>
<view class="box" style="background-color: lightblue"></view>
</view>`,
      js: ``,
      css:
`.flex-spacebetween {
display: flex;
justify-content: space-between;
}
.box {
height: 100rpx;
width: 100rpx;
}`
    }
  }, {
    envID,
    name: 'flex',
    type: 'flexWidthAdaptive',
    num: 0,
    code: {
      html:
`<view class="flex-width-adaptive">
<view class="box flex-grow" style="background-color: beige"></view>
<view class="box flex-grow" style="background-color: ghostwhite"></view>
<view class="box flex-grow" style="background-color: lightblue"></view>
</view>`,
      js: ``,
      css:
`.flex-width-adaptive {
display: flex;
}
.flex-grow {
flex: 1;
}
.box {
height: 100rpx;
width: 100rpx;
}`
    }
  }]
  await Promise.all(dataArr.map(data => {
    wx.cloud.callFunction({
      name: 'addComponent',
      data
    })
  }))
}
