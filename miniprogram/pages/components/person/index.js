Page({
  data: {
    uesrImg: '',
    showimg: false
  },
  headimgHD:function () {
    let avatarUrl = this.data.uesrImg
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
    this.setData({
      uesrImg: avatarUrl,
      showimg: true
    })
  },
  hideHeadimgHD(){
    this.setData({
      showimg: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country

        that.setData({
          uesrImg: avatarUrl
        })
      }
    })
  },

  onReady: function () {

  }
})