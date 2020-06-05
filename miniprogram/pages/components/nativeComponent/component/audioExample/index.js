// pages/components/nativeComponent/component/audioExample/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // activeId: {
    //   type: String,
    //   value: ''
    // }
  },

  /**
   * 组件的初始数据
   */
  data: {
    audioCurrentTime: 0,
    audioPer: 0,
    audioTime: 0,
    audio_loop: false,
    isPause: false,
    audioInterval: 0,
    activeId: ''
  },

  lifetimes: {
    attached: function(){
      this.audioContext = wx.createInnerAudioContext()
      this.audioContext.src = "cloud://simpledemo-9jk60.7369-simpledemo-9jk60-1302043964/resource/Someday.mp3"
      this.audioContext.onPlay(function(){
        console.log("正在播放")
      })
      this.audioContext.onPause((res) => {
        console.log("已暂停！")
      })
      this.audioContext.onEnded((res) => {
        console.log("已结束！")
        clearInterval(this.data.audioInterval)
      })
      this.audioContext.onError((res) => {
        console.log("出现错误！")
        console.log(res)
      })
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
    audioLoop: function(e) {
      this.audioContext.loop = e.detail.value
    },
  
    audioPlay: function() {
      this.audioContext.play()
        let interval = setInterval(() => {
          console.log("时间：" + this.audioContext.currentTime)
          this.setData({
            audioCurrentTime: Math.round(this.audioContext.currentTime),
            audioTime: Math.round(this.audioContext.duration)
          })
        }, 1000)
      this.setData({
        isPause: false,
        audioInterval: interval
      })
    },
  
    audioPause: function () {
      this.audioContext.pause()
      this.setData({
        isPause: true
      })
      clearInterval(this.data.audioInterval)
    },
  
    audioSeek: async function () {
      await this.audioContext.seek(180)
      this.setData({
        audioCurrentTime: 180
      })
    },
  }
})
