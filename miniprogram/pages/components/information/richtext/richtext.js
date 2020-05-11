Page({

  /**
   * 页面的初始数据
   */
  data: {
    nbsphtml: '<div class="div_class" style="line-height: 60px; color: red;">这是根据字体设置大小的&nbsp;&nbsp;&nbsp;&nbsp;四个连续空格!</div>',
    ensphtml: '<div class="div_class" style="line-height: 60px; color: red;">这是中文字符空格一半大小的&ensp;&ensp;&ensp;&ensp;四个连续空格!</div>',
    emsphtml: '<div class="div_class" style="line-height: 60px; color: red;">这是中文字符空格大小的&emsp;&emsp;&emsp;&emsp;四个连续空格!</div>',
    html: '<div class="div_class" style="line-height: 60px; color: red;">Hello&nbsp;World!</div>',
    nodes: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'line-height: 60px; color: red;'
      },
      children: [{
        type: 'text',
        text: 'Hello&nbsp;World!'
      }]
    }],
    jichu:[{
      html: 
        `<view class="page-section">
        　<view class="rich-text-wrp">
        　　<rich-text nodes="{{html}}" bindtap="tap">
        　　</rich-text>
        　</view>
        </view>`
      ,
      js: 
        `Page({
        　data: {
        　　html: '<div class=\"div_class\" style=\"line-height: 60px; color: red;\">Hello&nbsp;World!</div>'
        　},
        　tap() {
        　　console.log('tap')
        　}
        })`
      ,
      css: 
        `rich-text {
        　width: 700rpx;
        　padding: 25rpx 0;
        }

        .rich-text-wrp {
        　padding: 0 25rpx;
        　background-color: #fff;
        }

        .page-section{
        　width: 100%;
        　margin-bottom: 60rpx;
        }

        .page-section:last-child{
        　margin-bottom: 0;
        }

        .page-section-title{
        　font-size: 28rpx;
        　color: #999999;
        　margin-bottom: 10rpx;
        　padding-left: 30rpx;
        　padding-right: 30rpx;
        }`
      }, {
      html:
        `<view class="page-section">
        　<view class="rich-text-wrp">
        　　<rich-text nodes="{{html}}" bindtap="tap">
        　　</rich-text>
        　</view>
        </view>`
      ,
      js:
        `Page({
        　data: {
        　　nodes: [{
        　　　name: 'div',
        　　　attrs: {
        　　　　class: 'div_class',
        　　　　style: 'line-height: 60px; color: red;'
        　　　},
        　　　children: [{
        　　　　type: 'text',
        　　　　text: 'Hello&nbsp;World!'
        　　　}]
        　　}]
        　},
        　tap() {
        　　console.log('tap')
        　}
        })`
      ,
      css:
        `rich-text {
        　width: 700rpx;
        　padding: 25rpx 0;
        }

        .rich-text-wrp {
        　padding: 0 25rpx;
        　background-color: #fff;
        }

        .page-section{
        　width: 100%;
        　margin-bottom: 60rpx;
        }

        .page-section:last-child{
        　margin-bottom: 0;
        }

        .page-section-title{
        　font-size: 28rpx;
        　color: #999999;
        　margin-bottom: 10rpx;
        　padding-left: 30rpx;
        　padding-right: 30rpx;
        }`
      }
    ],
    zengqiang: [
      {
        html: `<rich-text space="nbsp" nodes="{{nbsphtml}}"></rich-text>`,
        js: 
        `Page({
        　data: {
        　　nbsphtml: '<div class="div_class" style="line-height: 60px; color: red;">这是根据字体设置大小的&nbsp;&nbsp;&nbsp;&nbsp;四个连续空格!</div>'
        　}
        })`
      }, {
        html: `<rich-text space="ensp" nodes="{{ensphtml}}"></rich-text>`,
        js:
        `Page({
        　data: {
        　　ensphtml: '<div class="div_class" style="line-height: 60px; color: red;">这是中文字符空格一半大小的&ensp;&ensp;&ensp;&ensp;四个连续空格!</div>'
        　}
        })`
      }, {
        html: `<rich-text space="emsp" nodes="{{emsphtml}}"></rich-text>`,
        js:
          `Page({
        　data: {
        　　emsphtml: '<div class="div_class" style="line-height: 60px; color: red;">这是中文字符空格大小的&emsp;&emsp;&emsp;&emsp;四个连续空格!</div>'
        　}
        })`
      }
    ]
  },
  tap() {
    console.log('tap')
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

const nodeSnip =
  `Page({
  data: {
    nodes: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'line-height: 60px; color: red;'
      },
      children: [{
        type: 'text',
        text: 'You never know what you're gonna get.'
      }]
    }]
  }
})
`
const htmlSnip =
  `<div class="div_class">
  <h1>Title</h1>
  <p class="p">
    Life is&nbsp;<i>like</i>&nbsp;a box of
    <b>&nbsp;chocolates</b>.
  </p>
</div>
`
