// pages/components/nativeComponent/component/mapExample/index.js
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
    longitude: 116.37587785720825,
    latitude: 40.10860340044603,
    scale: 10,
    markers: [
      {
        id: 1,
        latitude: 39.96127745174715,
        longitude: 116.35832883417606,
        iconPath: "../../../../../resource/location.png",
        width: 20,
        height: 30,
        callout: {
          content: "北京邮电大学本部",
          color: '#FF0000',
          fontSize: 10,
          borderRadius: 1,
          borderWidth: 2,
          borderColor: 'green',
          bgColor: 'white',
          padding: 2,
          display: 'ALWAYS',
          textAlign: 'center'
        }
      },
      {
        id: 2,
        latitude: 40.1570652715229,
        longitude: 116.28879189491272,
        iconPath: "../../../../../resource/location.png",
        width: 20,
        height: 30,
        callout: {
          content: "北京邮电大学沙河校区",
          color: '#FF0000',
          fontSize: 10,
          borderRadius: 1,
          borderWidth: 2,
          borderColor: 'green',
          bgColor: 'white',
          padding: 2,
          display: 'ALWAYS',
          textAlign: 'center'
        }
      }
    ],
    show_location: false,
    enable_3D: false,
    show_compass: false,
    show_scale: false,
    enable_overlooking: false,
    enable_scroll: true,
    enable_zoom: true,
    enable_rotate: true,
    enable_satellite: false,
    enable_traffic: false,
    mapCallbackTxt: "",
    markerCallbackTxt: "",
    poiCallbackTxt: "",
    regionCallbackTxt: "",
    regionScaleTxt: "",
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
    tapMap(e) {
      // console.log(e);
      this.setData({
        mapCallbackTxt: " 维度：" + e.detail.latitude.toFixed(5) + "," + "经度：" + e.detail.longitude.toFixed(5)
      })
    },
  
    tapMarker(e) {
      // console.log(e);
      let markers = this.data.markers;
      let latitude = 0;
      let longitude = 0;
      for(var i=0;i<markers.length;i++){
        if(markers[i].id === e.markerId) {
          latitude = markers[i].latitude;
          longitude = markers[i].longitude;
          break;
        }
      }
      if(latitude !== 0 && longitude !== 0){
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          success: res => {
            console.log(res);
          }
        })
      }
    },
  
    tapCallout(e) {
      console.log(e);
    },
  
    regionchange(e) {
      const mapCtx = wx.createMapContext('map', this)
      // console.log(e);
      if(e.type==="end" && e.causedBy==="drag") {
        // console.log("11111");
        mapCtx.getCenterLocation({
          success: res => {
            // console.log("3333");
            this.setData({
              regionCallbackTxt: " 中心点坐标：" + res.latitude.toFixed(5) + " , " + res.longitude.toFixed(5)
            })
          }
        })
      }else if(e.type==="end" && e.causedBy==="scale") {
        // console.log("222222")
        mapCtx.getScale({
          success: res => {
            // console.log("44444");
            this.setData({
              regionScaleTxt: " 当前缩放级别：" + res.scale 
            })
          }
        })
      }
    },
  
    tapPOI(e) {
      // console.log(e);
      this.setData({
        poiCallbackTxt: " " + e.detail.name + ": " + e.detail.latitude.toFixed(5) + " , " + e.detail.longitude.toFixed(5)
      })
    },
  
    is_showLocation(e) {
      this.setData({
        show_location: e.detail.value
      })
    },
  
    is_enable3D(e) {
      this.setData({
        enable_3D: e.detail.value
      })
    },
  
    is_showCompass(e) {
      this.setData({
        show_compass: e.detail.value
      })
    },
  
    is_showScale(e) {
      this.setData({
        show_scale: e.detail.value
      })
    },
  
    is_enableOverlooking(e) {
      this.setData({
        enable_overlooking: e.detail.value
      })
    },
  
    is_enableZoom(e) {
      this.setData({
        enable_zoom: e.detail.value
      })
    },
  
    is_enableScroll(e) {
      this.setData({
        enable_scroll: e.detail.value
      })
    },
  
    is_enableRotate(e) {
      this.setData({
        enable_rotate: e.detail.value
      })
    },
  
    is_enableSatellite(e) {
      this.setData({
        enable_satellite: e.detail.value
      })
    },
  
    is_enableTraffic(e) {
      this.setData({
        enable_traffic: e.detail.value
      })
    },
  }
})
