// pages/components/nativeComponent/component/videoExample/index.js
function getRandomColor() {
  const rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length === 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    videoSrc: 'http://dldir1.qq.com/weixin/checkresupdate/3304_b8e21693a94e4820a4e80e8d98df4c7a.mp4',
    videoControl: true,
    danmuList: [
      {
        text: '1111',
        color: '#FFFFF',
        time: 1
      }
    ],
    videoLoop: false,
    videoMute: false,
    videoInittime: 0,
    videoPoster: '../../../../../resource/videoPoster.jpg',
    videoCurrent: 0,
    videoDuration: 0,
    danmuinput: '',
    activeId: ''
  },

  lifetimes: {
    attached: function(){
      this.videoContext = wx.createVideoContext('video1')
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showMore(e){
      this.setData({
        activeId: e.detail.id
      })
    },
    changeProperty: function (e) {
      var propertyName = e.currentTarget.dataset.propertyName
      var newData = {}
      newData[propertyName] = e.detail.value
      this.setData(newData)
    },
  
    videoTimeUpdate: function(e) {
      this.setData({
        videoCurrent: e.detail.currentTime,
        videoDuration: e.detail.duration
      })
    },
  
    danmuInput: function(e){
      this.setData({
        danmuinput: e.detail.value
      })
    },
  
    danmuSend: async function(){
      let danmuColor = getRandomColor()
      // console.log("颜色："+danmuColor)
      // console.log("弹幕：" + this.data.danmuinput)
      await this.videoContext.sendDanmu({
        text: this.data.danmuinput,
        color: danmuColor
      })
    },
  }
})
