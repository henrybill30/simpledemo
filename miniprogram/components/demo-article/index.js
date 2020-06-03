const util = require('../../utils/util.js')
Component({
  properties: {
    title: String,
    author: String,
    date: Number,
    _id: String
  },

  /**
   * 组件的初始数据
   */
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      this.setData({
        time: util.formatDate(new Date(this.properties.date))
      })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    to(){
      wx.navigateTo({
        url: `./detail/index?id=${ this.properties._id }`
      })
    }
  }
})
