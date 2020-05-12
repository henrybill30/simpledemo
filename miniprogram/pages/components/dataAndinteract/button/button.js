Page({

  /**
   * 页面的初始数据
   */
  data: {
    shuju: "",
    contactinfo: "",
    info: "",
    code:[
      {
        html:
`<button size="primary" type="primary" bindtap="showdata">显示数据按钮</button>
<text>{{shuju}}</text>`,
        js:
`Page({
  data:{
    shuju: ""
  },
  showdata: function(){
    this.setData({
      shuju:"显示数据"
    })
  }
})`
      },
      {
        html:
`<button size="mini" type="default" open-type="contacct" bindcontact="contact">显示数据按钮</button>
<text>{{shuju}}</text>`,
        js:
`Page({
  data:{
    contact: ""
  },
  contact: function(e){
    this.setData({
      contactinfo: "页面路径: "+e.detail.path+",\n 对应参数: "+e.detail.query
    })
  }
})`
      },
      {
        html:
`<button size="mini" type="default" open-type="share">分享</button>`
      },
      {
        html:
`<button size="mini" type="default" open-type="openSetting">打开授权设置</button>`
      },
      {
        html:
`<button size="mini" type="default" loading="true">加载按钮</button>
<button size="mini" type="default" disable="true">禁用按钮</button>
<button size="mini" type="warn">警告按钮</button>`
      }
    ],
    jichu:[
      {
        'js': '',
        'wxml': ' '
      },
      {
        'js': '',
        'wxml': ' '
      },
      {
        'wxml': ''
      },
      {
        'wxml': ''
      },
      {
        'wxml': ''
      }
    ]
  },

  showdata: function(){
    this.setData({
      shuju: "显示数据"
    })
    console.log(this.data.shuju);
  },

  contact: function(e) {
    this.setData({
      contactinfo: "页面路径: "+e.detail.path+",\n 对应参数: "+e.detail.query
    })
    console.log(e.detail.path);
    console.log(e.detail.query);
  },

  getuser: function(e) {
    console.log("1111")
    console.log(e.detail.rawData);
  },

  onShareAppMessage: function(res){
    console.log("111111")
    if(res.from === 'button'){
      console.log(res.target)
    }
    return {
      title: "这是标题!",
      path: "/pages/components/index/index",
      success: function(){
        console.log("成功！")
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              //用户已经授权过
            }
          })
        }
      }
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
    wx.reLaunch({
      url: '../../index/index',
    })
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