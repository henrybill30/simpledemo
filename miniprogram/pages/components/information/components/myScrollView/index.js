// pages/components/information/components/scroll-view/index.js
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
    scroll_direction: true,
    refresher: true,
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
    switch(e) {
      let detail = e.detail.value
      if(detail == "scrollY"){
        this.setData({
          scroll_direction: true
        })
      }else {
        this.setData({
          scroll_direction: false
        })
      }
    }
  }
})
