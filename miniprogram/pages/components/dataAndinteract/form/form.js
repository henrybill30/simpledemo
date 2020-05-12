Page({
  data: {
    jichu: [
      {
html: 
`<form slot="demoname" bindsubmit="formSubmit" bindreset="formReset">
　<view class="section section_gap">
　　<view class="section__title">switch</view>
　　<switch name="switch"/>
　</view>
　<view class="section section_gap">
　　<view class="section__title">slider</view>
　　<slider name="slider" show-value ></slider>
　</view>
　<view class="section">
　　<view class="section__title">input</view>
　　<input name="input" placeholder="please input here" />
　</view>
　<view class="section section_gap">
　　<view class="section__title">radio</view>
　　<radio-group name="radio-group">
　　　<label><radio value="radio1"/>radio1</label>
　　　<label><radio value="radio2"/>radio2</label>
　　</radio-group>
　</view>
　<view class="section section_gap">
　　<view class="section__title">checkbox</view>
　　<checkbox-group name="checkbox">
　　　<label><checkbox value="checkbox1"/>checkbox1</label>
　　　<label><checkbox value="checkbox2"/>checkbox2</label>
　　</checkbox-group>
　</view>
　<view class="btn-area">
　　<button class="submit-btn" formType="submit">Submit</button>
　　<button formType="reset">Reset</button>
　</view>
　<view class="showform">
　　表单提交结果显示区域：
　　<text>
　　　{{showform}}
　　</text>
　</view>
</form>`,
js: 
`Page({
　data: {
　　showform: ''
　},
　formSubmit: function (e) {
　　console.log('form发生了submit事件，携带数据为：', e.detail.value)
　　this.setData({
　　　showform: 
　　　\`form发生了submit事件，携带数据为：
　　　switch: \${ e.detail.value.switch }
　　　slider: \${ e.detail.value.slider }
　　　input: \${ e.detail.value.input }
　　　radio: \${ e.detail.value['radio-group'] }
　　　checkbox: \${ e.detail.value.checkbox }\`
　　})
　},
　formReset: function () {
　　console.log('form发生了reset事件')
　　this.setData({
　　　showform: "form发生了reset事件"
　　})
　}
})`,
css: 
`.intro {
　margin: 30px;
　text-align: center;
}
.submit-btn{
　background-color: #07C160;
　margin: 5px 0;
}
.showform{
　height: 150px;
　background-color: #FADBDB
}`
      }
    ],
    showform: ''
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    this.setData({
      showform: `form发生了submit事件，携带数据为： 
      switch: ${e.detail.value.switch}
      slider: ${e.detail.value.slider}
      input: ${e.detail.value.input}
      radio: ${e.detail.value['radio-group']}
      checkbox: ${e.detail.value.checkbox}
      `
    })
  },
  formReset: function () {
    console.log('form发生了reset事件')
    this.setData({
      showform: `form发生了reset事件`
    })
  },
  onUnload: function () {
    wx.reLaunch({
      url: '../../components/index/index',
    })
  },
})