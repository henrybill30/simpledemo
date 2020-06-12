// pages/components/lifecycle/components/componenthook/index.js
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
  }
})
