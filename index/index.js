const app = getApp()
Page({
  data: {
    key:'',
    value:'',
    system:"",
    model:"",
    array: ['美国', 'China', '巴西', '日本'],
    index: 1,
    num: [1,2,3,4,5,6,7,8,9],
    time: "09:30",
    radioValue: "none",
    checkBoxValue: "none",
    sliderValue: 0
  },

  printThis: function () { 

    console.log(this)

  },

  scanCode: function () {
    var that = this
    wx.scanCode({
      
      success: function (res) {
        that.setData({res:res})
        console.log(this)

      },
      
      
    })
  },
    
  getSysInfo2: function () {
    console.log("this", this)
    var k = this
    function xxx(){
      console.log("this2")
    }

    this.setData({
      model: "android"
    })
    
    console.log("this",this.data.model)
    console.log("k",k.data.model)
    wx.getSystemInfo({
      
      success: function (res) {

        k.setData({ 
          model: res.model,
          system: res.system

        })
    
        
        console.log("res",this)
       
        console.log("k", k)
      },

    })
    console.log("this", this.data.model)
  },

  keyInput: function(e){
    this.setData({key: e.detail.value})
  },
  valueInput: function (e) { 
    this.setData({value: e.detail.value })
  },
  setStorageSync: function (e) {
    let key=this.data.key
    if(key.length==0){
      wx.showToast({
        title: 'KEY不能为空',
      })
    }
    else{
      wx.setStorageSync(key, this.data.value)
    }
   },
  removeStorageSync:function(){
    let key=this.data.key;
    wx.removeStorageSync(key)
    wx.showToast({
      title: '删除成功',
    })
  },  
  getStorageSync: function () {
    var that=this
    let key=this.data.key
    var data=wx.getStorageSync(key)
    if(data){
      that.setData({value:data})
    }
    else{
      wx.showToast({
        title: '没有数据',
      })
    console.log(key)
    }
  },


  getSysInfo: function(){
    var that=this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({res: res})
      console.log(res)
      },
    })
  },

  onLoad: function (options) {
    var that=this
    
    wx.onCompassChange(function(res){
      that.setData({degree:res.direction})
    })

    wx.onAccelerometerChange(function (res) {
      that.setData({ res: res })
    })
  },
  

  vib:function(){
    wx.vibrateLong({
    })
  },


  scanCode: function () {
    var that = this
    wx.scanCode({
      success: function (res) {
        that.setData({ res: res })
      },

    })
  },



  

  xChange: function (e) {
    this.setData({ x: e.detail.value }),
      console.log('switch发生change事件，携带value值为：', e.detail.value)
  },

  kAdd: function () {
    this.setData({k: this.data.k + 1}), 
    console.log('button发生change事件，携带value值为：', this.data.k )
  },
  kZero: function () {
    this.setData({ k: 0 }),
      console.log('button发生change事件，携带value值为：', this.data.k)
  },


  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    }),
      console.log('picker发生change事件，携带value值为：', e.detail.value)
  },


  bindTimeChange: function (e) {
    this.setData({
     time: e.detail.value
    }),
    console.log('picker发生change事件，携带value值为：', e.detail.value)
  },
  radioBoxChange: function (e) {
    this.setData({
      radioValue: e.detail.value
    }),
    console.log('radiobox发生change事件，携带value值为：', e.detail.value)
  },
  checkBoxChange: function (e) {
    this.setData({
      checkBoxValue: e.detail.value
    }),
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    
  },
  sliderChange: function (e) {
    this.setData({
      sliderValue: e.detail.value
    }),
    console.log('slider发生change事件，携带value值为：', e.detail.value)
  },
  onGotUserInfo: function (e) {
    console.log(e.detail.userInfo),
    this.setData({
      buttonValue: e.detail.userInfo.nickName
    })
  },


})
