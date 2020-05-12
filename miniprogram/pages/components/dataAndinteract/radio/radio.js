Page({

  /**
   * 页面的初始数据
   */
  data: {
    change1: "未选中",
    checked: false,
    checked_value: "",
    language: [
      {
        value: "JAVA",
        checked: false
      }, 
      {
        value: "C++",
        checked: false
      }, 
      {
        value: "Python",
        checked: false
      }, 
      {
        value: "JavaScript",
        checked: false
      }, 
      {
        value: "Go",
        checked: false
      },
    ],
    jichu: [
      {
        'js': 'data:{\n  change1: "未选中",\n  checked: false,\n},\nchange1: function(e){\n  this.setData({\n    checked: !this.data.checked\n  })\n  if(this.data.checked == true){\n    this.setData({\n    change1:"选中"\n  })\n  }else{\n    this.setData({\n    change1:"未选中"\n    })\n  }\n},\n',
        'wxml': '<radio checked="{{checked}}" bindtap="change1"/>{{change1}}\n<radio disabled="true"/>禁用\n<radio color="blue" checked="{{checked}}" bindtap="change1"/>变颜色{{change1}}'
      }
    ],
    zengqiang: [
      {
        'js': 'change2: function(e){\n  let items = this.data.language;\n  for(let i = 0;i<items.length;i++){\n    items[i].checked = items[i].value === e.detail.value\n  }\n  this.setData({\n  language: items,\n  checked_value: e.detail.value\n  })\n},\n',
        'wxml': '<view style="display:flex;flex-direction: column">\n <radio-group  style="flex-group:1" bindchange="change2" >\n  <label wx:for-items="{{language}}" wx:for-item="item" wx:key="value">\n   <view>\n    <radio value="{{item.value}}" checked="{{item.checked}}">{{ item.value }}</radio>\n   </view>\n  </label>\n </radio-group >\n <view style="flex-group:1">\n  <text>选择为：{{ checked_value }}</text>\n </view>\n</view>'
      }
    ]
  },

  change1: function (e) {
    this.setData({
      checked: !this.data.checked
    })
    if(this.data.checked == true){
      this.setData({
        change1: "选中"
      })
    }else{
      this.setData({
        change1: "未选中"
      })
    }
  },

  change2: function(e){
    let items = this.data.language;
    console.log(e.detail)
    for(let i=0;i<items.length;i++){
      items[i].checked = items[i].value === e.detail.value
    }
    this.setData({
      language: items,
      checked_value: e.detail.value
    })
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