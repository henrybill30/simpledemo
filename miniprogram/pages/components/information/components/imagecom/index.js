// pages/components/information/components/image/index.js
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
    modes: ['scaleToFill','aspectFit', 'aspectFill', 'widthFix', 'heightFix', 'top', 'bottom', 'left', 'right', 'center', 'top left', 'top right', 'bottom left', 'botton right'],
    index: 0,
    lazyLoad: false,
    isShow: true,
    activeId: ''
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
  
      // this.stringTemplate()
    },
    modeChange: function(e) {
      this.setData({
        index: e.detail.value
      })
    }
  }
})
