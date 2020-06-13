// miniprogram/pages/person/changelog/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        steps: [
            {
                text: '2020/06/13',
                desc: '1.修改小程序名为”最简模块“\n2. 添加推荐模块功能\n 3. 调整样式布局\n 4. 增加云调用模块和生命周期模块'
            },
            {
                text: '2020/06/06',
                desc: '1. 添加收藏、反馈、看懂组件卡片功能\n 2. 增加文章板块\n 3. 样式统一'
            },
            {
                text: '2020/05/30',
                desc: '1. 修复云开发bug\n 2. 增加小程序介绍\n 3.反馈页优化\n 4. 样式优化'
            },
            {
                text: '2020/05/26',
                desc: '添加云开发组件'
            },
            {
                text: '2020/05/02',
                desc: '项目启动',
            }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
        return {
            title: '组件学习',
            path: '/pages/components/index/index',
            imageUrl: 'cloud://simpledemo-9jk60.7369-simpledemo-9jk60-1302043964/resource/小程序头像.png'
        }
    }
})