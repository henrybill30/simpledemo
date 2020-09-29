// miniprogram/pages/person/completeData/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuNum: '',
    stuName: '',
    stuNumErr: "",
    stuNameErr: "",
    loginFlag: false
  },
  onChangeNum(event) {
    // event.detail 为当前输入的值
    if(event.detail === ''){
      this.setData({
        stuNum: event.detail,
        stuNumErr: '学号不能为空'
      })
    } else {
      this.setData({
        stuNum: event.detail,
        stuNumErr: ''
      })
    }

  },
  onChangeName(event) {
    // event.detail 为当前输入的值
    if(event.detail === ''){
      this.setData({
        stuName: event.detail,
        stuNameErr: '姓名不能为空'
      })
    } else {
      this.setData({
        stuName: event.detail,
        stuNameErr: ''
      })
    }
  },
  async login(e){
    getApp().globalData.nickname = JSON.parse(e.detail.rawData).nickName
    let res = await wx.cloud.callFunction({
      name: 'login',
      data: {
        envID: getApp().globalData.envID,
        username: getApp().globalData.nickname
      }
    })
    getApp().globalData.openid = res.result.openid;
    getApp().globalData.loginFlag = true;
    this.submit();
  },
  submit(){
    console.log(this.data.stuName, this.data.stuNum)
    let that = this;
    wx.cloud.callFunction({
      name: "updateUserInfo",
      data: {
        envID: getApp().globalData.envID,
        openid: getApp().globalData.openid,
        stuNum: that.data.stuNum,
        stuName: that.data.stuName
      },
      success: res => {
        console.log(res.result.state)
        if(res.result.state) {
          getApp().globalData.stuNumExist = true;
          wx.showToast({
            title: '更新资料成功',
            success: res => {
              wx.navigateBack({
                delta: 1
              })
            }
          })
          
        }
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      loginFlag: getApp().globalData.loginFlag
    })
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