Component({
  properties: {
    // pre_title: String,
    // next_title: String,
    pre_zujian: String,
    next_zujian: String
  },

  methods: {
    pre: function() {
      if(this.properties.pre_zujian == "首页"){
        wx.navigateTo({
          url: '../../index/index',
        })
      }else{
        wx.navigateTo({
          url: '../' + this.properties.pre_zujian + '/' + this.properties.pre_zujian,
        })
      }
    },

    next: function () {
      if (this.properties.next_zujian == "首页") {
        wx.navigateTo({
          url: '../../index/index',
        })
      } else {
        wx.navigateTo({
          url: '../' + this.properties.next_zujian + '/' + this.properties.next_zujian,
        })
      }
    }
  }
})