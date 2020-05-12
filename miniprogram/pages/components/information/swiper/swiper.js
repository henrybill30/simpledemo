Page({
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    code: [
      {
        html:
`<swiper indicator-dots="{{indicatorDots}}" autoplay="{{autoplay}}" circular="{{circular}}" vertical="{{vertical}}" interval="{{interval}}" duration="{{duration}}" previous-margin="{{previousMargin}}px" next-margin="{{nextMargin}}px">　
  <swiper-item>
    <view class="swiper-item demo-text-2"></view>
  </swiper-item>
  <swiper-item>
    <view class="swiper-item demo-text-3"></view>
  </swiper-item>
  <swiper-item>
    <view class="swiper-item demo-text-1"></view>
  </swiper-item>
</swiper>`
      }
    ]
  },
  stringTemplate: function () {
    let code = [
      {
        html:
`<swiper indicator-dots="{{indicatorDots}}" autoplay="{{autoplay}}" circular="{{circular}}" vertical="{{vertical}}" interval="{{interval}}" duration="{{duration}}" previous-margin="{{previousMargin}}px" next-margin="{{nextMargin}}px">　
  <swiper-item>
    <view class="swiper-item demo-text-2"></view>
  </swiper-item>
  <swiper-item>
    <view class="swiper-item demo-text-3"></view>
  </swiper-item>
  <swiper-item>
    <view class="swiper-item demo-text-1"></view>
  </swiper-item>
</swiper>`
      }
    ]
    this.setData({
      code: code
    }) 
  },
  changeProperty: function (e) {
    var propertyName = e.currentTarget.dataset.propertyName
    var newData = {}
    newData[propertyName] = e.detail.value
    this.setData(newData)

    this.stringTemplate()
    console.log('oooooooooo')
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  onLoad: function (options) {
    this.stringTemplate()
  },
  onUnload: function () {
    wx.reLaunch({
      url: '../../components/index/index',
    })
  },
})
