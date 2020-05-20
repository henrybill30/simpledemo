Component({
  data: {
    active: 1,
    icon: [{
      inactive: 'http://pic.yupoo.com/253673/db990bbf/c6b97c13.png',
      active: 'http://pic.yupoo.com/253673/70a2c46b/03eb75b0.png'
    }, {
        inactive: 'http://pic.yupoo.com/253673/9d264693/dbb2b6e3.png',
        active: 'http://pic.yupoo.com/253673/3ed5e101/13259079.png'
      }, {
        inactive: 'http://pic.yupoo.com/253673/2708e419/75a83e9c.png',
        active: 'http://pic.yupoo.com/253673/62e13938/9fc95b5f.png'
      }, {
        inactive: 'http://pic.yupoo.com/253673/cbd62833/39f91498.png',
        active: 'http://pic.yupoo.com/253673/9608e3fe/4fa0927b.png'
      }]
  },
  options: {
    // multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: { },
  methods: {
    onChange(event) {
      console.log(event)
      this.setData({ 
        active: event.detail 
      });
      switch (event.detail ){
        case 0:
          console.log("0");
          wx.switchTab({
            url: '../../components/componentstear/index'
          })
          break;
        case 1:
          console.log("1");
          wx.switchTab({
            url: '../../components/index/index'
          })
          break;
        case 2:
          console.log("2");
          wx.switchTab({
            url: '../../components/componentpileup/index'
          })
          break;
        case 3:
          console.log("3");
          wx.switchTab({
            url: '../../person/index'
          })
          break;
        default:
          console.log("default");
      }
    }
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
});
