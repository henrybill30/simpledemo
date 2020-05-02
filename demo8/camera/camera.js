Page({

  /**
   * 页面的初始数据
   */
  data: {
    device_position: "back",
    flash: "auto",
    src_photo: "",
    src_video: "",
    src_camera: "../../resource/take_photo.png",
    src_flash: "../../resource/flash_auto.png",
    src_direction: "../../resource/direction.png",
    showInfo: "预览",
    recordInfo: "切换模式",
    mode: "拍照",
    Camera_mode: "normal",
    is_showCamera: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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
      if (_this.data.src_camera === "../../resource/recordstart.png") {
        console.log("准备录像！");
        ctx.startRecord({
          success: res => {
            console.log("录像开始！")
            _this.setData({
              src_camera: "../../resource/recordstop.png"
            })
          },
          fail: err => {
            console.log(err)
          }
        })
      } else if (_this.data.src_camera === "../../resource/recordstop.png") {
        console.log("录像准备结束！");
        ctx.stopRecord({
          success: res => {
            _this.setData({
              src_video: res.tempVideoPath,
              is_showCamera: false,
              src_camera: "../../resource/recordstart.png"
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
        src_camera: "../../resource/recordstart.png"
      })
    }else if(_this.data.mode === "录像") {
      _this.setData({
        mode: "拍照",
        src_camera: "../../resource/take_photo.png",
        src_direction: "../../resource/direction.png",
        src_flash: "../../resource/flash_auto.png",
      })
    }
  },

  control_flash() {
    let _this = this;
    if(_this.data.flash === "auto"){
      _this.setData({
        flash: "on",
        src_flash: "../../resource/flash_on.png"
      });
      wx.showToast({
        icon: 'none',
        title: '闪光灯模式：打开',
      });
    }else if(_this.data.flash === "on") {
      _this.setData({
        flash: "off",
        src_flash: "../../resource/flash_off.png"
      });
      wx.showToast({
        icon: 'none',
        title: '闪光灯模式：关闭',
      });
    }else if(_this.data.flash === "off") {
      _this.setData({
        flash: "auto",
        src_flash: "../../resource/flash_auto.png"
      });
      wx.showToast({
        icon: 'none',
        title: '闪光灯模式：自动',
      });
    }
  },

  takeScan(e) {
    console.log(e);
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