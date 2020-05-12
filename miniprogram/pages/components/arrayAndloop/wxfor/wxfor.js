Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['美国', '中国', '巴西', '日本'],
    index: 1,
    num: [1, 2, 3, 4],
    code: [
      {
        'html': `<pre><code class="language-html">@@<picker bindchange="bindPickerChange" value="{{index}}" range="{{array}}">
      <view class="picker">
        当前选择：{{array[index]}}
      </view>
    </picker>@@</code></pre>`,
        'js': 
  `<pre><code class="language-js">@@data: {
    array: ['美国', '中国', '巴西', '日本'],
    index: 1,
    num: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
    console.log('picker发生change事件，携带value值为：', e.detail.value)
    let logs = wx.getStorageSync('logs') || []
    logs.unshift({
      operation: true,
      time: Date.now(),
      type: "bindPickerChange",
      value: e.detail.value
    })
    wx.setStorageSync('logs', logs)
  },@@</code></pre>`
      },
      {
        'html': 
        `<pre><code class="language-html">@@<view wx:for='{{array}}'> 国家{{index}}：{{item}}</view>@@</code></pre>`
      },
      {
        'html':
          `<pre><code class="language-html">@@<view wx:for='array'> 国家{{index}}：{{item}}</view>@@</code></pre>`
      },
      {
        'html':
        `<pre><code class="language-html">@@<view wx:for='{{array}}' wx:for-index='countryID' wx:for-item='countryName' >国家{{countryID}}：{{countryName}}</view>@@</code></pre>`
      },
      {
        'html':
        `<pre><code class="language-html">@@<block wx:for="{{['red','orange','yelllow','green','blue','indigo','purple']}}">
        <view style="display:flex; align-item: center">
          <view style="flex-group:1">编号：{{index+1}} </view>
          <view style="flex-group:1">颜色：{{item}} </view>
        </view>
      </block>@@</code></pre>`
      },
      {
        'html':
          `<pre><code class="language-html">@@<view wx:for="{{num}}" wx:for-item='i' >
      <view wx:for="{{num}}" wx:for-item='j' >
        <view wx:if="{{i<=j}}">
          {{i}}*{{j}}={{i*j}}
        </view>
      </view>
    </view>@@</code></pre>`
      }
    ]
  },

  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
    console.log('picker发生change事件，携带value值为：', e.detail.value)
    let logs = wx.getStorageSync('logs') || []
    logs.unshift({
      operation: true,
      time: Date.now(),
      type: "bindPickerChange",
      value: e.detail.value
    })
    wx.setStorageSync('logs', logs)
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
    
  }
})