Component({
  data: {
    showcode: false
  },
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    height: Number
  },
  methods: {
    showCode: function (event) {
      console.log(event, "long")
      this.setData({
        showcode: !this.data.showcode
      })
    },
  },
  externalClasses: ['custom-class']
});
