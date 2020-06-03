Page({
  data: {
    uesrImg: '',
    showimg: false,
    top: 0,
    left: 0,
    bottom: 0,
    width: 0,
    height: 0,
    isNewUser: false,
    loginflag: false
  },
  headimgHD:function () {
    this.setData({
      showimg: true
    })
  },
  hideHeadimgHD(){
    this.setData({
      showimg: false
    })
  },

  async login(e){
    let that = this
    getApp().globalData.nickname = JSON.parse(e.detail.rawData).nickName
    let res = await wx.cloud.callFunction({
      name: 'login',
      data: {
        envID: getApp().globalData.envID,
        username: getApp().globalData.nickname
      }
    })
    console.log(res)
    getApp().globalData.openid = res.result.openid
    getApp().globalData.loginFlag = true
    wx.cloud.callFunction({
      name: 'get_userInfo',
      data: {
        envID: getApp().globalData.envID,
        openid: getApp().globalData.openid
      },
      success: res => {
        // console.log(res.result)
        that.setData({
          identity: res.result.res[0].flag
        })
      },
      fail: err => {
        console.log(err)
      }
    })
    that.setData({
      loginflag: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let that = this;
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        // var gender = userInfo.gender //性别 0：未知、1：男、2：女
        // var province = userInfo.province
        // var city = userInfo.city
        // var country = userInfo.country

        getApp().globalData.nickname = nickName

        console.log('原来的头像', avatarUrl);

        avatarUrl = avatarUrl.split('/');        //把头像的路径切成数组

        //把大小数值为 46 || 64 || 96 || 132 的转换为0
        if (
          avatarUrl[avatarUrl.length - 1] && (avatarUrl[avatarUrl.length - 1] == 46 ||
            avatarUrl[avatarUrl.length - 1] == 64 ||
            avatarUrl[avatarUrl.length - 1] == 96 ||
            avatarUrl[avatarUrl.length - 1] == 132)
        ) {
          avatarUrl[avatarUrl.length - 1] = 0;
        }

        avatarUrl = avatarUrl.join('/');   //重新拼接为字符串

        console.log('高清的头像', avatarUrl);
        that.setData({
          uesrImg: avatarUrl
        })
      }
    })

    let isNewUser = getApp().globalData.isNewUser
    console.log(isNewUser)
    // if (!isNewUser) return; //老用户直接跳过
    that.setData({
      isNewUser: isNewUser
    })
    //定位使用说明位置
    let query = wx.createSelectorQuery()
    query.select('#direction').boundingClientRect(function (rect) {
      rect.id      // 节点的ID
      rect.left    // 节点的左边界坐标
      rect.right   // 节点的右边界坐标
      rect.top     // 节点的上边界坐标
      rect.bottom  // 节点的下边界坐标
      rect.width   // 节点的宽度
      rect.height  // 节点的高度
    })
    query.exec(function (res) {
      that.setData({
        top: res[0].top,
        left: res[0].left,
        width: res[0].width,
        bottom: res[0].bottom,
        height: res[0].height 
      })
    })

    //获取用户身份
    if(!getApp().globalData.isNewUser){
      wx.cloud.callFunction({
        name: 'get_userInfo',
        data: {
          envID: getApp().globalData.envID,
          openid: getApp().globalData.openid
        },
        success: res => {
          // console.log(res.result)
          that.setData({
            identity: res.result.res[0].flag
          })
        },
        fail: err => {
          console.log(err)
        }
      })
    }

    that.setData({
      loginflag: getApp().globalData.loginFlag
    })
  },
  onReady: function () {
  },
  onShow(){
    let isNewUser = getApp().globalData.isNewUser
    this.setData({
      isNewUser: isNewUser
    })
  },
  onReady: function () {
  },
  onShareAppMessage: function () {
    return {
      title: '组件学习',
      path: '/pages/components/index/index'
    }
  }
})