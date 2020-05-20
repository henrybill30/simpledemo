// miniprogram/pages/components/cloud/cloud.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageTitle: '云开发', // 页面信息
        currentPage: 0, // 子组件索引
        MIN_PAGE: 0,
        MAX_PAGE: 0,
        components: [
            {
                title: '用户信息',
                name: 'userInfo',
                type: 'basic',
                num: 0
            }, {
                title: '文本存储',
                name: 'textRestore',
                type: 'basic',
                num: 0
            }, {
                title: '文件存储',
                name: 'fileRestore',
                type: 'basic',
                num: 0
            }, {
                title: '订阅消息',
                name: 'subscribeMsg',
                type: 'basic',
                num: 0
            }
        ],
        leftAnimation: '', // 页面切换效果
        rightAnimation: '',
        text: undefined // 文本存储
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

    async toBefore(e) {
        let currentPage = this.data.currentPage
        if(currentPage <= this.data.MIN_PAGE) {
            return
        }
        currentPage--
        this.setData({
            currentPage,
            leftanimation: 'animation-fade',
            pageTitle: this.data.components[currentPage].title
        })

        await this.addRecord()

        const timerID = setTimeout(() => {
            this.setData({
                leftAnimation: ''
            })
            clearTimeout(timerID)
        }, 200)
    },

    async toNext(e) {
        let currentPage = this.data.currentPage
        if(currentPage >= this.data.MAX_PAGE) {
            return
        }
        currentPage++
        this.setData({
            currentPage,
            leftAnimation: 'animation-fade',
            pageTitle: this.data.components[currentPage].title
        })

        await this.addRecord()

        const timerID = setTimeout(() => {
            this.setData({
                rightAnimation: ''
            })
            clearTimeout(timerID)
        }, 200)
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
        // await insertDemoCode2CloudDatabase ()
        const currentPage = parseInt(options.index)
        const components = this.data.components
        const pageTitle = components[currentPage].title
        this.setData({
            currentPage,
            pageTitle,
            MAX_PAGE: this.data.components.length - 1
        })
        await this.getText()

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
    name: 'textRestore',
    type: 'basic',
    num: 0,
    code: {
      html: ``,
      js:
`// 根据指定 id，将所需存储文本存入数据库
async function addText(id, text) {
    // 1. 获取数据库引用
    const db = wx.cloud.database()
    // 2. 构造查询语句
    return await db.collection('Text').add({
        data: {
            id,
            text
        }
    })
}

// 根据指定 id 获取存储文本
async function getText(id) {
    // 1. 获取数据库引用
    const db = wx.cloud.database()
    // 2. 构造查询语句
    return await db.collection('Text').where({
        id
    }).get()
}

// 根据指定 id 及 新文本 更新已有文本
async function updateText(id, newText) {
    // 1. 获取数据库引用
    const db = wx.cloud.database()
    // 2. 构造更新语句
    return await db.collection('Text').where({
        id
    }).update({
        data: {
            text: newText
        }
    })
}`,
      css: ``
    }
  }]
  await Promise.all(dataArr.map(data => {
    wx.cloud.callFunction({
      name: 'addComponent',
      data
    })
  }))
}


