function getRandomColor() {
  const rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length === 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

const ctx = wx.createCanvasContext("canvas1", this);

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage: 0,
    pageNum: 5,
    nbTitle: '',
    titleArr: ['audio', 'video', 'map', 'canvas','camera'],
    audioCurrentTime: 0,
    audioPer: 0,
    audioTime: 0,
    audio_loop: false,
    isPause: false,
    audioInterval: 0,
    videoSrc: 'http://dldir1.qq.com/weixin/checkresupdate/3304_b8e21693a94e4820a4e80e8d98df4c7a.mp4',
    videoControl: true,
    danmuList: [
      {
        text: '1111',
        color: '#FFFFF',
        time: 1
      }
    ],
    videoLoop: false,
    videoMute: false,
    videoInittime: 0,
    videoPoster: '../../../resource/videoPoster.jpg',
    videoCurrent: 0,
    videoDuration: 0,
    danmuinput: '',
    longitude: 116.37587785720825,
    latitude: 40.10860340044603,
    scale: 10,
    markers: [
      {
        id: 1,
        latitude: 39.96127745174715,
        longitude: 116.35832883417606,
        iconPath: "../../../resource/location.png",
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
        iconPath: "../../../resource/location.png",
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
    is_selectedline: false,
    is_selectedvector_line: false,
    is_selectedrectangle: false,
    is_selectedroundedrectangle: false,
    is_selectedpolygon: false,
    is_selectedcircle: false,
    start_x: 0,
    start_y: 0,
    vector_x_y: [],
    end_x: 0,
    end_y: 0,
    cp1_x: 0,
    cp1_y: 0,
    cp2_x: 0,
    cp2_y: 0,
    device_position: "back",
    flash: "auto",
    src_photo: "",
    src_video: "",
    src_camera: "../../../resource/take_photo.png",
    src_flash: "../../../resource/flash_auto.png",
    src_direction: "../../../resource/direction.png",
    showInfo: "预览",
    recordInfo: "切换模式",
    mode: "拍照",
    Camera_mode: "normal",
    is_showCamera: true,
  },
  
  audioLoop: function(e) {
    this.audioContext.loop = e.detail.value
  },

  audioPlay: function() {
    this.audioContext.play()
      let interval = setInterval(() => {
        console.log("时间：" + this.audioContext.currentTime)
        this.setData({
          audioCurrentTime: Math.round(this.audioContext.currentTime),
          audioTime: Math.round(this.audioContext.duration)
        })
      }, 1000)
    this.setData({
      isPause: false,
      audioInterval: interval
    })
  },

  audioPause: function () {
    this.audioContext.pause()
    this.setData({
      isPause: true
    })
    clearInterval(this.data.audioInterval)
  },

  audioSeek: async function () {
    await this.audioContext.seek(180)
    this.setData({
      audioCurrentTime: 180
    })
  },

  changeProperty: function (e) {
    var propertyName = e.currentTarget.dataset.propertyName
    var newData = {}
    newData[propertyName] = e.detail.value
    this.setData(newData)
  },

  videoTimeUpdate: function(e) {
    this.setData({
      videoCurrent: e.detail.currentTime,
      videoDuration: e.detail.duration
    })
  },

  danmuInput: function(e){
    this.setData({
      danmuinput: e.detail.value
    })
  },

  danmuSend: async function(){
    let danmuColor = getRandomColor()
    // console.log("颜色："+danmuColor)
    // console.log("弹幕：" + this.data.danmuinput)
    await this.videoContext.sendDanmu({
      text: this.data.danmuinput,
      color: danmuColor
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

  touchStart(e) {
    // console.log("start: " + JSON.stringify(e));
    let _this = this;
    if(_this.data.is_selectedline === true) {
      _this.setData({
        start_x: e.touches[0].x,
        start_y: e.touches[0].y
      })
      // console.log(_this.data.start_x);
      // console.log(_this.data.start_y);
    }else if(_this.data.is_selectedvector_line === true) {
      _this.setData({
        vector_x_y: [[e.touches[0].x, e.touches[0].y]]
      });
    }else if(_this.data.is_selectedrectangle === true) {
      _this.setData({
        start_x: e.touches[0].x,
        start_y: e.touches[0].y
      })
    } else if (_this.data.is_selectedroundedrectangle === true) {
      _this.setData({
        start_x: e.touches[0].x,
        start_y: e.touches[0].y
      })
    } else if (_this.data.is_selectedpolygon === true) {
      _this.setData({
        start_x: e.touches[0].x,
        start_y: e.touches[0].y
      })
    } else if(_this.data.is_selectedcircle === true) {
      _this.setData({
        start_x: e.touches[0].x,
        start_y: e.touches[0].y
      })
    }
  },

  touchMove(e) {
    let _this = this;
    // console.log("move: " + JSON.stringify(e));
    if(_this.data.is_selectedline === true){
      // var ctx = wx.createCanvasContext("canvas1");
      ctx.restore();
      let x = _this.data.start_x;
      let y = _this.data.start_y;
      let end_x = e.touches[0].x;
      let end_y = e.touches[0].y;
      ctx.moveTo(x, y);
      ctx.lineTo(end_x, end_y);
      ctx.setLineWidth(2);
      ctx.setStrokeStyle('red');
      ctx.stroke();
      ctx.draw();
    }else if(_this.data.is_selectedvector_line === true) {
      let vector = _this.data.vector_x_y;
      vector.push([e.touches[0].x, e.touches[0].y]);
      ctx.moveTo(vector[0][0], vector[0][1]);
      for(var i=1;i<vector.length;i++){
        ctx.lineTo(vector[i][0], vector[i][1]);
      }
      ctx.stroke();
      ctx.draw(true);
      _this.setData({
        vector_x_y: vector
      })
    } else if (_this.data.is_selectedrectangle === true) {
      let x = _this.data.start_x;
      let y = _this.data.start_y;
      let end_x = e.touches[0].x;
      let end_y = e.touches[0].y;
      let width = end_x - x;
      let height = end_y - y;
      ctx.setStrokeStyle('red');
      ctx.setLineWidth(2);
      ctx.strokeRect(x, y, width, height);
      ctx.draw();
    } else if (_this.data.is_selectedroundedrectangle === true) {
      let x = _this.data.start_x;
      let y = _this.data.start_y;
      let end_x = e.touches[0].x;
      let end_y = e.touches[0].y;
      let width = Math.abs(end_x - x);
      let height = Math.abs(end_y - y);
      let r = width / 10;
      if (end_x > x) {
        if (end_y > y) {
          roundRect(ctx, x, y, width, height, r);
        } else if (e.touches[0].y < y) {
          roundRect(ctx, x, y - height, width, height, r);
        } else {
          ctx.moveTo(x, y);
          ctx.lineTo(e.touches[0].x, y);
          ctx.stroke();
          ctx.draw();
        }
      } else if (end_x < x) {
        if (end_y > y) {
          roundRect(ctx, x - width, y, width, height, r);
        } else if (e.touches[0].y < y) {
          roundRect(ctx, x - width, y - height, width, height, r);
        } else {
          ctx.moveTo(x, y);
          ctx.lineTo(e.touches[0].x, y);
          ctx.stroke();
          ctx.draw();
        }
      } else {
        ctx.moveTo(x, y);
        ctx.lineTo(e.touches[0].x, e.touches[0].y);
        ctx.stroke();
        ctx.draw();
      }
      // roundRect(ctx, x, y, width, height, r);
      function roundRect(ctx, x, y, w, h, r) {
        // 开始绘制
        ctx.beginPath()
        // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
        // 这里是使用 fill 还是 stroke都可以，二选一即可
        // ctx.setFillStyle('transparent')
        ctx.setStrokeStyle('red');
        ctx.setLineWidth(2);
        // 左上角
        ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)

        // border-top
        ctx.moveTo(x + r, y)
        ctx.lineTo(x + w - r, y)
        // ctx.lineTo(x + w, y + r)
        // 右上角
        ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)

        // border-right
        ctx.lineTo(x + w, y + h - r)
        // ctx.lineTo(x + w - r, y + h)
        // 右下角
        ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)

        // border-bottom
        ctx.lineTo(x + r, y + h)
        // ctx.lineTo(x, y + h - r)
        // 左下角
        ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)

        // border-left
        ctx.lineTo(x, y + r)
        // ctx.lineTo(x + r, y)

        // 这里是使用 fill 还是 stroke都可以，二选一即可，但是需要与上面对应
        // ctx.fill()
        ctx.stroke()
        ctx.closePath()
        // 剪切
        // ctx.clip()
        ctx.draw();
      }
    } else if(_this.data.is_selectedpolygon === true){
      let x = _this.data.start_x;
      let y = _this.data.start_y;
      let width = Math.abs(e.touches[0].x - x);
      let height = Math.abs(e.touches[0].y - y);
      let small_width = width/3;
      if ((Math.pow(width, 2) - Math.pow(height, 2) / 4)>0){
        small_width = Math.sqrt(Math.pow(width, 2) - Math.pow(height, 2) / 4);
      }
      if(e.touches[0].x>x){
        if(e.touches[0].y > y){
          polygon(ctx, x, y, width, height, small_width);
        }else if(e.touches[0].y < y){
          polygon(ctx, x, y-height, width, height, small_width);
        }else {
          ctx.moveTo(x, y);
          ctx.lineTo(e.touches[0].x, y);
          ctx.stroke();
          ctx.draw();
        }
      }else if(e.touches[0].x<x){
        if (e.touches[0].y > y) {
          polygon(ctx, x-width, y, width, height, small_width);
        } else if (e.touches[0].y < y) {
          polygon(ctx, x-width, y - height, width, height, small_width);
        } else {
          ctx.moveTo(x, y);
          ctx.lineTo(e.touches[0].x, y);
          ctx.stroke();
          ctx.draw();
        }
      }else {
        ctx.moveTo(x, y);
        ctx.lineTo(e.touches[0].x, e.touches[0].y);
        ctx.stroke();
        ctx.draw();
      }
      function polygon(ctx, x, y, width, height, small_width){
        ctx.setStrokeStyle('red');
        ctx.setLineWidth(2);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + width, y);
        ctx.lineTo(x + width + small_width, y + (height / 2));
        ctx.lineTo(x + width, y + height);
        ctx.lineTo(x, y + height);
        ctx.lineTo(x - small_width, y + (height / 2));
        ctx.closePath();
        ctx.stroke();
        ctx.draw();
      }
    }else if(_this.data.is_selectedcircle === true) {
      let x = _this.data.start_x;
      let y = _this.data.start_y;
      let w = Math.abs(e.touches[0].x - x);
      let h = Math.abs(e.touches[0].y - y);
      let r = (Math.min(w, h)) / 2;
      if (e.touches[0].x > x) {
        if (e.touches[0].y > y) {
          circle(ctx, x+(w/2), y+(h/2), r);
        } else if (e.touches[0].y < y) {
          circle(ctx, x+(w/2), y-(h/2), r);
        } else {
          ctx.moveTo(x, y);
          ctx.lineTo(e.touches[0].x, y);
          ctx.stroke();
          ctx.draw();
        }
      } else if (e.touches[0].x < x) {
        if (e.touches[0].y > y) {
          circle(ctx, x - (w/2), y+(h/2), r);
        } else if (e.touches[0].y < y) {
          circle(ctx, x - (w/2), y - (h/2), r);
        } else {
          ctx.moveTo(x, y);
          ctx.lineTo(e.touches[0].x, y);
          ctx.stroke();
          ctx.draw();
        }
      } else {
        ctx.moveTo(x, y);
        ctx.lineTo(e.touches[0].x, e.touches[0].y);
        ctx.stroke();
        ctx.draw();
      }
      function circle(ctx, x, y, r){
        ctx.setStrokeStyle('red');
        ctx.setLineWidth(2);
        ctx.arc(x, y, r, 0, 2*Math.PI);
        ctx.stroke();
        ctx.draw();
      }
    }
  },

  touchEnd(e) {
    let _this = this;
    // console.log("end: " + JSON.stringify(e));
    if (_this.data.is_selectedline === true) {
      let x = _this.data.start_x;
      let y = _this.data.start_y;
      let end_x = e.changedTouches[0].x;
      let end_y = e.changedTouches[0].y;
      ctx.moveTo(x, y);
      ctx.lineTo(end_x, end_y);
      ctx.setLineWidth(2);
      ctx.setStrokeStyle('red');
      ctx.stroke();
      ctx.draw();
      ctx.save();
      // console.log("直线结束！");
    }else if(_this.data.is_selectedvector_line === true) {
      let vector = _this.data.vector_x_y;
      vector.push([e.changedTouches[0].x, e.changedTouches[0].y]);
      ctx.moveTo(vector[0][0], vector[0][1]);
      for (var i = 1; i < vector.length; i++) {
        ctx.lineTo(vector[i][0], vector[i][1]);
      }
      ctx.stroke();
      ctx.draw(true);
      _this.setData({
        vector_x_y: vector
      })
    }
  },

  touchCancel(e) {
    console.log("cancel: " + JSON.stringify(e));
  },

  error(e) {
    console.log("error: " + e);
  },

  line() {
    let _this = this;
    _this.setData({
      is_selectedline: true,
      is_selectedcircle: false,
      is_selectedpolygon: false,
      is_selectedrectangle: false,
      is_selectedroundedrectangle: false,
      is_selectedvector_line: false
    })
  },

  circle() {
    let _this = this;
    _this.setData({
      is_selectedline: false,
      is_selectedcircle: true,
      is_selectedpolygon: false,
      is_selectedrectangle: false,
      is_selectedroundedrectangle: false,
      is_selectedvector_line: false
    })
  },

  polygon() {
    let _this = this;
    _this.setData({
      is_selectedline: false,
      is_selectedcircle: false,
      is_selectedpolygon: true,
      is_selectedrectangle: false,
      is_selectedroundedrectangle: false,
      is_selectedvector_line: false
    })
  },

  rectangle() {
    let _this = this;
    _this.setData({
      is_selectedline: false,
      is_selectedcircle: false,
      is_selectedpolygon: false,
      is_selectedrectangle: true,
      is_selectedroundedrectangle: false,
      is_selectedvector_line: false
    })
  },

  roundedrectangle() {
    let _this = this;
    _this.setData({
      is_selectedline: false,
      is_selectedcircle: false,
      is_selectedpolygon: false,
      is_selectedrectangle: false,
      is_selectedroundedrectangle: true,
      is_selectedvector_line: false
    })
  },

  vector_line() {
    let _this = this;
    _this.setData({
      is_selectedline: false,
      is_selectedcircle: false,
      is_selectedpolygon: false,
      is_selectedrectangle: false,
      is_selectedroundedrectangle: false,
      is_selectedvector_line: true
    })
  },

  take() {
    let _this = this;
    var ctx = wx.createCameraContext()
    if(_this.data.src_photo === "" && _this.data.src_video === "" && _this.data.mode === "拍照"){
      ctx.takePhoto({
        quality: 'high',
        success: (res) => {
          _this.setData({
            src_photo: res.tempImagePath,
            is_showCamera: false,
          })
        }
      })
    } else if (_this.data.src_photo === "" && _this.data.src_video === "" && _this.data.mode === "录像"){
      console.log("切换录像模式成功！");
      if (_this.data.src_camera === "../../../resource/recordstart.png") {
        console.log("准备录像！");
        ctx.startRecord({
          success: res => {
            console.log("录像开始！")
            _this.setData({
              src_camera: "../../../resource/recordstop.png"
            })
          },
          fail: err => {
            console.log(err)
          }
        })
      } else if (_this.data.src_camera === "../../../resource/recordstop.png") {
        console.log("录像准备结束！");
        ctx.stopRecord({
          success: res => {
            _this.setData({
              src_video: res.tempVideoPath,
              is_showCamera: false,
              src_camera: "../../../resource/recordstart.png"
            })
            console.log("录像结束！")
          },
          fail: err => {
            console.log(err)
          }
        })
      }
    } else {
      wx.showToast({
        icon: 'none',
        title: '请返回拍照/录像模式！',
      })
    }
  },

  error(e) {
    console.log(e.detail)
  },

  direction() {
    let _this = this;
    if(_this.data.device_position === "back"){
      _this.setData({
        device_position: "front"
      })
    }else if(_this.data.device_position === "front") {
      _this.setData({
        device_position: "back"
      })
    }
    console.log(_this.data.device_position)
  },

  show() {
    let _this = this;
    if(_this.data.mode === "拍照") {
      _this.setData({
        is_showCamera: true,
        src_photo: ""
      })
    } else if (_this.data.mode === "录像") {
      _this.setData({
        is_showCamera: true,
        src_video: ""
      })
    }
  },

  changeMode() {
    let _this = this;
    if(_this.data.mode === "拍照") {
      _this.setData({
        mode: "录像",
        src_camera: "../../../resource/recordstart.png"
      })
    }else if(_this.data.mode === "录像") {
      _this.setData({
        mode: "拍照",
        src_camera: "../../../resource/take_photo.png",
        src_direction: "../../../resource/direction.png",
        src_flash: "../../../resource/flash_auto.png",
      })
    }
  },

  control_flash() {
    let _this = this;
    if(_this.data.flash === "auto"){
      _this.setData({
        flash: "on",
        src_flash: "../../../resource/flash_on.png"
      });
      wx.showToast({
        icon: 'none',
        title: '闪光灯模式：打开',
      });
    }else if(_this.data.flash === "on") {
      _this.setData({
        flash: "off",
        src_flash: "../../../resource/flash_off.png"
      });
      wx.showToast({
        icon: 'none',
        title: '闪光灯模式：关闭',
      });
    }else if(_this.data.flash === "off") {
      _this.setData({
        flash: "auto",
        src_flash: "../../../resource/flash_auto.png"
      });
      wx.showToast({
        icon: 'none',
        title: '闪光灯模式：自动',
      });
    }
  },

  tobefore(e) {
    if (this.data.currentPage === 0) {
      this.setData({
        nbTitle: this.data.titleArr[0]
      })
      wx.cloud.callFunction({
        name: 'addRecord',
        data: {
          envID: getApp().globalData.envID,
          openid: getApp().globalData.openid,
          behavior: 'browse',
          component: this.data.titleArr[0],
          time: new Date()
        },
        success: res => {
          console.log("result: " + JSON.stringify(res.result))
        },
        fail: err => {
          console.log("error: " + JSON.stringify(err))
        }
      })
      return
    }
    var that = this;
    this.setData({
      currentPage: parseInt(this.data.currentPage) - 1,
      leftanimation: 'fade',
      nbTitle: this.data.titleArr[parseInt(this.data.currentPage) - 1]
    })
    wx.cloud.callFunction({
      name: 'addRecord',
      data: {
        envID: getApp().globalData.envID,
        openid: getApp().globalData.openid,
        behavior: 'browse',
        component: this.data.titleArr[parseInt(this.data.currentPage)],
        time: new Date()
      },
      success: res => {
        console.log("result: " + JSON.stringify(res.result))
      },
      fail: err => {
        console.log("error: " + JSON.stringify(err))
      }
    })
    setTimeout(function () {
      that.setData({
        leftanimation: ''
      })
    }, 200)
  },
  tonext(e) {
    if (this.data.currentPage === this.data.pageNum - 1) {
      this.setData({
        nbTitle: this.data.titleArr[this.data.pageNum - 1]
      })
      wx.cloud.callFunction({
        name: 'addRecord',
        data: {
          envID: getApp().globalData.envID,
          openid: getApp().globalData.openid,
          behavior: 'browse',
          component: this.data.titleArr[this.data.pageNum],
          time: new Date()
        },
        success: res => {
          console.log("result: " + JSON.stringify(res.result))
        },
        fail: err => {
          console.log("error: " + JSON.stringify(err))
        }
      })
      return
    }
    var that = this;
    this.setData({
      currentPage: parseInt(this.data.currentPage) + 1,
      rightanimation: 'fade',
      nbTitle: this.data.titleArr[parseInt(this.data.currentPage) + 1]
    })
    wx.cloud.callFunction({
      name: 'addRecord',
      data: {
        envID: getApp().globalData.envID,
        openid: getApp().globalData.openid,
        behavior: 'browse',
        component: this.data.titleArr[parseInt(this.data.currentPage)],
        time: new Date()
      },
      success: res => {
        console.log("result: " + JSON.stringify(res.result))
      },
      fail: err => {
        console.log("error: " + JSON.stringify(err))
      }
    })
    setTimeout(function () {
      that.setData({
        rightanimation: ''
      })
    }, 200)
  },

  onTabChange(e){
    console.log(e)
    this.setData({
      currentPage: e.detail.name
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentPage: parseInt(options.index),
      nbTitle: this.data.titleArr[parseInt(options.index)]
    })
    this.audioContext = wx.createInnerAudioContext()
    this.videoContext = wx.createVideoContext('video1')
    this.audioContext.src = "cloud://simpledemo-9jk60.7369-simpledemo-9jk60-1302043964/resource/Someday.mp3"
    this.audioContext.onPlay(function(){
      console.log("正在播放")
    })
    this.audioContext.onPause((res) => {
      console.log("已暂停！")
    })
    this.audioContext.onEnded((res) => {
      console.log("已结束！")
      clearInterval(this.data.audioInterval)
    })
    this.audioContext.onError((res) => {
      console.log("出现错误！")
      console.log(res)
    })
    wx.cloud.callFunction({
      name: 'addRecord',
      data: {
        envID: getApp().globalData.envID,
        openid: getApp().globalData.openid,
        behavior: 'browse',
        component: this.data.titleArr[parseInt(options.index)],
        time: new Date()
      },
      success: res => {
        console.log("result: " + JSON.stringify(res.result))
      },
      fail: err => {
        console.log("error: " + JSON.stringify(err))
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})