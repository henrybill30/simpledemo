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
    code: [
      {
        html:
`<checkbox checked="{{checked}}" bindtap="change1">{{change1}}</checkbox>
<checkbox disabled="true">禁用</checkbox>
<checkbox color="blue" checked="{{checked}}" bindtap="change1">变颜色{{change1}}</checkbox>`,
        js:
`Page({
  data:{
    change1: "未选中",
    checked: false,
  },
  change1: function(e){
    this.setData({
      checked: !this.data.checked
    })
    if(this.data.checked == true){
      this.setData({
        change1:"选中"
      })
    }else{
      this.setData({
        change1:"未选中"
      })
    }
  },
})`  
      },
      {
        html:
`<view style="display:flex;flex-direction: column">
  <checkbox-group style="flex-group:1" bindchange="change2">
    <label wx:for-items="{{language}}" wx:for-item="item" wx:key="value">
      <view>
        <checkbox value="{{item.value}}" checked="{{item.checked}}">{{item.value}}</checkbox>
      </view>
    </label>
  </checkbox-group>
  <view style="flex-group:1">
    <text>已选择：{{checked_value}}</text>
  </view>
</view>`,
        js:
`Page({
  data: {
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
  },
  change2: function (e) {
    let items = this.data.language;
    let values = e.detail.value;
    for (let i = 0; i < items.length; i++) {
      items[i].checked = false;
      for (let j=0; j < values.length; j++){
        if(items[i].value == values[j]){
          items[i].checked = true
        }
      }
    }
    this.setData({
      language: items,
      checked_value: values.toString()
    })
  },
})`
      }
    ],
  },

  change1: function (e) {
    this.setData({
      checked: !this.data.checked
    })
    if (this.data.checked == true) {
      this.setData({
        change1: "选中"
      })
    } else {
      this.setData({
        change1: "未选中"
      })
    }
  },

  change2: function (e) {
    let items = this.data.language;
    let values = e.detail.value;
    for (let i = 0; i < items.length; i++) {
      items[i].checked = false;
      for (let j=0; j < values.length; j++){
        if(items[i].value == values[j]){
          items[i].checked = true
        }
      }
    }
    this.setData({
      language: items,
      checked_value: values.toString()
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
      url: '../../components/index/index',
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