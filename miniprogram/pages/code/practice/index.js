// miniprogram/pages/code/practice/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //页面传参---确定组件
    name: '',
    type: '',
    num: 0,
    List: [],

    //view_basic_1数据
    view_basic_1_content: '这是增加了点击态效果的view组件',
    view_basic_1_starttime: 10,
    view_basic_1_staytime: 400,
    view_basic_1_list: [
      {
        name: 'hover-start-time',
        type: 'number',
        describe: '按住后多久出现点击态，单位毫秒'
      },
      {
        name: 'hover-stay-time',
        type: 'number',
        describe: '手指松开后点击态保留时间，单位毫秒'
      },
      {
        name: '文本内容',
        type: 'String',
        describe: '显示的文本'
      },
    ],
    view_basic_1_code: [
      `<view hover-class="view2" hover-start-time=`,
      `hover-stay-time=`,
      `>`,
      `</view>`
    ],

    // process_basic_0数据
    progress_basic_0_percent: 20,
    progress_basic_0_showinfo: false,
    progress_basic_0_borderradius: 0,
    progress_basic_0_fontsize: 16,
    progress_basic_0_strokewidth: 5,
    progress_basic_0_activeColor: '#09BB07',
    progress_basic_0_backgroundColor: '#EBEBEB',
    progress_basic_0_active: false,
    progress_basic_0_duration: 30,
    progress_basic_0_list: [
      {
        name: 'percent',
        type: 'number',
        describe: '百分比0-100'
      },
      {
        name: 'show-info',
        type: 'boolean',
        describe: '在进度条右侧显示百分比'
      },
      {
        name: 'border-radius',
        type: 'number/String',
        describe: '圆角大小'
      },
      {
        name: 'font-size',
        type: 'number/String',
        describe: '右侧百分比字体大小'
      },
      {
        name: 'stroke-width',
        type: 'number/String',
        describe: '进度条线宽度'
      },
      {
        name: 'activeColor',
        type: 'String',
        describe: '已选择进度条的颜色'
      },
      {
        name: 'backgroundColor',
        type: 'String',
        describe: '未选择进度条的颜色'
      },
      {
        name: 'active',
        type: 'boolean',
        describe: '是否显示从左至右的动画'
      },
      {
        name: 'duration',
        type: 'number',
        describe: '进度增加1%所需毫秒数'
      },
    ],
    progress_basic_0_code: [
      `<progress`,
      `percent=`,
      `show-info=`,
      `border-radius=`,
      `font-size=`,
      `stroke-width=`,
      `activeColor=`,
      `backgroudColor=`,
      `active=`,
      `duration=`,
      `/>`,
    ],
  },

  view_basic_1_submit(e){
    console.log(e.detail.value.view_basic_1_0)
    var value = e.detail.value
    value.view_basic_1_0 = parseInt(value.view_basic_1_0)
    value.view_basic_1_1 = parseInt(value.view_basic_1_1)
    if(!(value.view_basic_1_0>=0&&value.view_basic_1_0<=10000) || !(value.view_basic_1_1>=0&&value.view_basic_1_1<=20000)){
      wx.showToast({
        title: '最好设置正常的属性参数哦~',
        icon: 'none'
      })
      return
    }
    this.setData({
      view_basic_1_starttime: value.view_basic_1_0,
      view_basic_1_staytime: value.view_basic_1_1,
      view_basic_1_content: value.view_basic_1_2
    })
    wx.showToast({
      title: '运行成功！试试效果吧~',
      icon: 'success'
    })
  },

  progress_basic_0_submit(e){
    console.log(e.detail.value)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: options.name,
      type: options.type,
      num: options.num
    })
    if(this.data.name=='view'){
      this.setData({
        List: this.data.view_basic_1_list
      })
    }
    if(this.data.name=='progress'){
      this.setData({
        List: this.data.progress_basic_0_list
      })
    }
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