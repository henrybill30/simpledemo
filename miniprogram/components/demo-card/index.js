Component({
  properties: {
    imgurl: {
      type: String,
      value: ''
    },
    title: String,
    appid: String
  },
  methods: {
    to(){
      console.log('跳转到……', this.properties.appid)
      wx.navigateToMiniProgram({
        appId: this.properties.appid
      })
    }
  }
});
