Component({
  data: {
    active: 1,
    icon: [{
      inactive: 'https://wx2.sinaimg.cn/mw690/006D4XS4gy1gesflc4yqtj305k05kwed.jpg',
      active: 'https://wx1.sinaimg.cn/mw690/006D4XS4gy1gesflc1sb9j305k05ka9y.jpg'
    }, {
        inactive: 'https://wx3.sinaimg.cn/mw690/006D4XS4gy1gesf79fcb2j305k05kdfu.jpg',
        active: 'https://wx1.sinaimg.cn/mw690/006D4XS4gy1gesf7wxppuj305k05k74b.jpg'
      }, {
        inactive: 'https://wx2.sinaimg.cn/mw690/006D4XS4gy1gesfl98as5j305l05kmx7.jpg',
        active: 'https://wx4.sinaimg.cn/mw690/006D4XS4gy1gesfl8wlv6j305l05kt8s.jpg'
      }, {
        inactive: 'https://wx1.sinaimg.cn/mw690/006D4XS4gy1gesflbhq61j305k05kglg.jpg',
        active: 'https://wx3.sinaimg.cn/mw690/006D4XS4gy1gesflboe22j305k05kq2s.jpg'
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
            url: '../../components/person/index'
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
