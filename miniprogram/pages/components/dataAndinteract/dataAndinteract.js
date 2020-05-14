// pages/components/information/information.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 'home',
    currentPage: 0,
    pageNum: 8,
    //button
    shuju: "",
    contactinfo: "",
    info: "",
    buttoncode: [
      {
        html:
          `<button size="primary" type="primary" bindtap="showdata">显示数据按钮</button>
<text>{{shuju}}</text>`,
        js:
          `Page({
  data:{
    shuju: ""
  },
  showdata: function(){
    this.setData({
      shuju:"显示数据"
    })
  }
})`
      },
      {
        html:
          `<button size="mini" type="default" open-type="contacct" bindcontact="contact">显示数据按钮</button>
<text>{{shuju}}</text>`,
        js:
          `Page({
  data:{
    contact: ""
  },
  contact: function(e){
    this.setData({
      contactinfo: "页面路径: "+e.detail.path+",\n 对应参数: "+e.detail.query
    })
  }
})`
      },
      {
        html:
          `<button size="mini" type="default" open-type="share">分享</button>`
      },
      {
        html:
          `<button size="mini" type="default" open-type="openSetting">打开授权设置</button>`
      },
      {
        html:
          `<button size="mini" type="default" loading="true">加载按钮</button>
<button size="mini" type="default" disable="true">禁用按钮</button>
<button size="mini" type="warn">警告按钮</button>`
      }
    ],
    //switch
    switchchange: "关闭",
    switchcode: [
      {
        html:
          `<switch bindchange="switchchange"/>{{switchchange}}
<switch disabled="false"/>禁用状态
<switch color="blue"/>改变颜色`,
        js:
          `Page({
  data:{
    switchchange: "关闭"
  },
  switchchange: function(e){
    if(e.detail.value == true){
      this.setData({
        switchchange:"打开"  
      })
    }else{
      this.setData({
        switchchange:"关闭"
      })
    }
  },
})`
      }
    ],
    //radio
    change1: "未选中",
    checked: false,
    checked_value: "",
    language: [
      {
        value: "JAVA",
        checked: false
      },
      {
        value: "C++",
        checked: false
      },
      {
        value: "Python",
        checked: false
      },
      {
        value: "JavaScript",
        checked: false
      },
      {
        value: "Go",
        checked: false
      },
    ],
    radiocode: [
      {
        html:
          `<view style="display:flex; align-items:center">
  <view style="flex-group:1">
    <radio checked="{{checked}}" bindtap="change1"/>{{change1}}
  </view>
  <view style="flex-group:1">
    <radio disabled="true"/>禁用
  </view>
  <view style="flex-group:1">
    <radio color="blue" checked="{{checked}}" bindtap="change1"/>变颜色{{change1}}
  </view>
</view>`,
        js:
          `Page({
  data:{
    change1: "未选中",
    checked: false,
  },
  change1: function (e) {
    this.setData({
      checked: !this.data.checked
    })
    if(this.data.checked == true){
      this.setData({
        change1: "选中"
      })
    }else{
      this.setData({
        change1: "未选中"
      })
    }
  },
})`
      },
      {
        html:
          `<view style="display:flex;flex-direction: column">
  <radio-group  style="flex-group:1" bindchange="change2">
    <label wx:for-items="{{language}}" wx:for-item="item" wx:key="value">
      <view>
        <radio value="{{item.value}}" checked="{{item.checked}}">{{item.value}}</radio>
      </view>
    </label>
  </radio-group>
  <view style="flex-group:1">
    <text>选择为：{{checked_value}}</text>
  </view>
</view>`,
        js:
          `Page({
  data: {
    checked_value: "",
    language: [
      {
        value: "JAVA",
        checked: false
      },
      {
        value: "C++",
        checked: false
      },
      {
        value: "Python",
        checked: false
      },
      {
        value: "JavaScript",
        checked: false
      },
      {
        value: "Go",
        checked: false
      },
    ],
  },
  change2: function(e){
    let items = this.data.language;
    console.log(e.detail)
    for(let i=0;i<items.length;i++){
      items[i].checked = items[i].value === e.detail.value
    }
    this.setData({
      language: items,
      checked_value: e.detail.value
    })
  },
})`
      }
    ],
    //checkbox
    checkboxchange: "未选中",
    checked: false,
    checked_value: "",
    language: [
      {
        value: "JAVA",
        checked: false
      },
      {
        value: "C++",
        checked: false
      },
      {
        value: "Python",
        checked: false
      },
      {
        value: "JavaScript",
        checked: false
      },
      {
        value: "Go",
        checked: false
      },
    ],
    checkboxcode: [
      {
        html:
          `<checkbox checked="{{checked}}" bindtap="checkboxchange">{{checkboxchange}}</checkbox>
<checkbox disabled="true">禁用</checkbox>
<checkbox color="blue" checked="{{checked}}" bindtap="checkboxchange">变颜色{{checkboxchange}}</checkbox>`,
        js:
          `Page({
  data:{
    checkboxchange: "未选中",
    checked: false,
  },
  checkboxchange: function(e){
    this.setData({
      checked: !this.data.checked
    })
    if(this.data.checked == true){
      this.setData({
        checkboxchange:"选中"
      })
    }else{
      this.setData({
        checkboxchange:"未选中"
      })
    }
  },
})`
      },
      {
        html:
          `<view style="display:flex;flex-direction: column">
  <checkbox-group style="flex-group:1" bindchange="change2">
    <label wx:for-items="{{language}}" wx:for-item="item" wx:key="value">
      <view>
        <checkbox value="{{item.value}}" checked="{{item.checked}}">{{item.value}}</checkbox>
      </view>
    </label>
  </checkbox-group>
  <view style="flex-group:1">
    <text>已选择：{{checked_value}}</text>
  </view>
</view>`,
        js:
          `Page({
  data: {
    checked_value: "",
    language: [
      {
        value: "JAVA",
        checked: false
      },
      {
        value: "C++",
        checked: false
      },
      {
        value: "Python",
        checked: false
      },
      {
        value: "JavaScript",
        checked: false
      },
      {
        value: "Go",
        checked: false
      },
    ],
  },
  change2: function (e) {
    let items = this.data.language;
    let values = e.detail.value;
    for (let i = 0; i < items.length; i++) {
      items[i].checked = false;
      for (let j=0; j < values.length; j++){
        if(items[i].value == values[j]){
          items[i].checked = true
        }
      }
    }
    this.setData({
      language: items,
      checked_value: values.toString()
    })
  },
})`
      }
    ],
    // picker
    pickercode: [
      {
        html:
          `<picker bindchange="bindPickerChange" value="{{index}}" range="{{array}}">
　<view class="picker">
　　当前选择：{{array[index]}}
　</view>
</picker>`,
        js:
          `Page({
　data: {
　　array: ['美国', '中国', '巴西', '日本'],
　　index: 0
　},
　bindPickerChange: function (e) {
　　console.log('picker发送选择改变，携带值为', e.detail.value)
　　this.setData({
　　　index: e.detail.value
　　})
　},
})`,
        css:
          `.picker{
　padding: 13px;
　background-color: #FFFFFF;
}`
      }, {
        html:
          `<picker 
　mode="multiSelector" 
　bindchange="bindMultiPickerChange"
　bindcolumnchange="bindMultiPickerColumnChange" 
　value="{{multiIndex}}" 
　range="{{multiArray}}"
>
　<view class="picker">
　　当前选择：{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}，{{multiArray[2][multiIndex[2]]}}
　</view>
</picker>`,
        js:
          `Page({
　data: {
　　multiArray: [['无脊柱动物', '脊柱动物'], ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'], ['猪肉绦虫', '吸血虫']],
　　multiIndex: [0, 0, 0]
　},
　bindMultiPickerChange: function (e) {
　　console.log('picker发送选择改变，携带值为', e.detail.value)
　　this.setData({
　　　multiIndex: e.detail.value
　　})
　},
　bindMultiPickerColumnChange: function (e) {
　　console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
　　var data = {
　　　multiArray: this.data.multiArray,
　　　multiIndex: this.data.multiIndex
　　};
　　data.multiIndex[e.detail.column] = e.detail.value;
　　switch (e.detail.column) {
　　　case 0:
　　　switch (data.multiIndex[0]) {
　　　　case 0:
　　　　data.multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'];
　　　　data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
　　　　break;
　　　　case 1:
　　　　data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
　　　　data.multiArray[2] = ['鲫鱼', '带鱼'];
　　　　break;
　　　}
　　　data.multiIndex[1] = 0;
　　　data.multiIndex[2] = 0;
　　　break;
　　case 1:
　　switch (data.multiIndex[0]) {
　　　　case 0:
　　　　switch (data.multiIndex[1]) {
　　　　　case 0:
　　　　　data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
　　　　　break;
　　　　　case 1:
　　　　　data.multiArray[2] = ['蛔虫'];
　　　　　break;
　　　　　case 2:
　　　　　data.multiArray[2] = ['蚂蚁', '蚂蟥'];
　　　　　break;
　　　　　case 3:
　　　　　data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓'];
　　　　　break;
　　　　　case 4:
　　　　　data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
　　　　　break;
　　　　}
　　　　break;
　　　　case 1:
　　　　switch (data.multiIndex[1]) {
　　　　　case 0:
　　　　　data.multiArray[2] = ['鲫鱼', '带鱼'];
　　　　　break;
　　　　　case 1:
　　　　　data.multiArray[2] = ['青蛙', '娃娃鱼'];
　　　　　break;
　　　　　case 2:
　　　　　data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
　　　　　break;
　　　　}
　　　　break;
　　　}
　　　data.multiIndex[2] = 0;
　　　console.log(data.multiIndex);
　　　break;
　　}
　　this.setData(data);
　},
})`,
        css:
          `.picker{
　padding: 13px;
　background-color: #FFFFFF;
}`
      }, {
        html:
          `<picker mode="time" value="{{time}}" start="09:01" end="21:01" bindchange="bindTimeChange">
　<view class="picker">
　　当前选择: {{time}}
　</view>
</picker>`,
        js:
          `Page({
　data: {   
　　time: '12:01'
　},
　bindTimeChange: function (e) {
　　console.log('picker发送选择改变，携带值为', e.detail.value)
　　this.setData({
　　　time: e.detail.value
　　})
　}
})`,
        css:
          `.picker{
　padding: 13px;
　background-color: #FFFFFF;
}`
      }, {
        html:
          `<picker mode="date" value="{{date}}" start="2015-09-01" end="2017-09-01" bindchange="bindDateChange">
　<view class="picker">
　　当前选择: {{date}}
　</view>
</picker>`,
        js:
          `Page({
　data: {
　　date: '2016-09-01'
　},
　bindDateChange: function (e) {
　　console.log('picker发送选择改变，携带值为', e.detail.value)
　　this.setData({
　　date: e.detail.value
　　})
　}
})`,
        css:
          `.picker{
　padding: 13px;
　background-color: #FFFFFF;
}`
      }, {
        html:
          `<picker mode="region" bindchange="bindRegionChange" value="{{region}}" custom-item="{{customItem}}">
　<view class="picker">
　　当前选择：{{region[0]}}，{{region[1]}}，{{region[2]}}
　</view>
</picker>`,
        js:
          `Page({
　data: {
　　region: ['广东省', '广州市', '海珠区'],
　　customItem: '全部'
　},
　bindRegionChange: function (e) {
　　console.log('picker发送选择改变，携带值为', e.detail.value)
　　this.setData({
　　　region: e.detail.value
　　})
　}
})`,
        css:
          `.picker{
　padding: 13px;
　background-color: #FFFFFF;
}`
      }
    ],
    array: ['美国', '中国', '巴西', '日本'],
    objectArray: [
      {
        id: 0,
        name: '美国'
      },
      {
        id: 1,
        name: '中国'
      },
      {
        id: 2,
        name: '巴西'
      },
      {
        id: 3,
        name: '日本'
      }
    ],
    index: 0,
    multiArray: [['无脊柱动物', '脊柱动物'], ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'], ['猪肉绦虫', '吸血虫']],
    objectMultiArray: [
      [
        {
          id: 0,
          name: '无脊柱动物'
        },
        {
          id: 1,
          name: '脊柱动物'
        }
      ], [
        {
          id: 0,
          name: '扁性动物'
        },
        {
          id: 1,
          name: '线形动物'
        },
        {
          id: 2,
          name: '环节动物'
        },
        {
          id: 3,
          name: '软体动物'
        },
        {
          id: 3,
          name: '节肢动物'
        }
      ], [
        {
          id: 0,
          name: '猪肉绦虫'
        },
        {
          id: 1,
          name: '吸血虫'
        }
      ]
    ],
    multiIndex: [0, 0, 0],
    date: '2016-09-01',
    time: '12:01',
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    //slider
    sliderValue1: 0,
    sliderValue2: 0,
    sliderjichu: [
      {
        html: `<slider bindchange="sliderChange">slider滑块</slider>`
      }
    ],
    sliderzengqiang: [
      {
        html: `<slider show-value/>`
      }, {
        html: `<slider show-value step="5"/>`
      }, {
        html: `<slider min="50" max="200" show-value/>`
      }, {
        html: `<slider block-color="#DBFC00" show-value/>`
      }, {
        html: `<slider block-size="12" show-value/>`
      }
    ],
    sliderevent: [
      {
        html:
          `<slider bindchanging="sliderChange1" show-value/>
        <view>slider组件当前值为：{{sliderValue1}}</view>`,
        js:
          `Page({
        　data: {
        　　sliderValue1: 0,
        　},
        　sliderChange1: function (e) {
        　　console.log('slider发生change事件，携带value值为：', e.detail.value)
        　　this.setData({
        　　　sliderValue1: e.detail.value
        　　})
        　}
        })`
      }, {
        html:
          `<slider bindchanging="sliderChange2" show-value/>
        <view>slider组件当前值为：{{sliderValue2}}</view>`,
        js:
          `Page({
        　data: {
        　　sliderValue1: 0,
        　},
        　sliderChange2: function (e) {
        　　console.log('slider发生change事件，携带value值为：', e.detail.value)
        　　this.setData({
        　　　sliderValue2: e.detail.value
        　　})
        　}
        })`
      }
    ],
    // input
    inputjichu: [
      {
        html: `<input placeholder="最简输入框"></input>`
      }
    ],
    inputzengqiang: [
      {
        html: `<input maxlength="10" placeholder="最大输入长度为10"/>`
      }, {
        html: `<input value="这是初始内容！" placeholder="包含初始内容"/>`
      }, {
        html: `<input password placeholder="请输入密码"/>`
      }, {
        html: `<input placeholder-style="color:red" placeholder="红色占位符"/>`
      }, {
        html: `<input disabled placeholder="禁用状态"/>`
      }, {
        html: `<input auto-focus placeholder="自动获取焦点"/>`
      }
    ],
    inputkeyboard: [
      {
        html: `<input type="text" placeholder="文本输入键盘"/>`
      }, {
        html: `<input type="number" placeholder="数字输入键盘"/>`
      }, {
        html: `<input type="idcard" placeholder="身份证输入键盘"/>`
      }, {
        html: `<input type="digit" placeholder="带小数点的数字输入键盘"/>`
      }
    ],
    //form
    formjichu: [
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
  // button
  showdata: function () {
    this.setData({
      shuju: "显示数据"
    })
    console.log(this.data.shuju);
  },

  contact: function (e) {
    this.setData({
      contactinfo: "页面路径: " + e.detail.path + ",\n 对应参数: " + e.detail.query
    })
    console.log(e.detail.path);
    console.log(e.detail.query);
  },

  getuser: function (e) {
    console.log("1111")
    console.log(e.detail.rawData);
  },

  onShareAppMessage: function (res) {
    console.log("111111")
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: "这是标题!",
      path: "/pages/components/index/index",
      success: function () {
        console.log("成功！")
      }
    }
  },
  //switch
  switchchange: function (e) {
    console.log(e.detail)
    if (e.detail.value == true) {
      this.setData({
        switchchange: "打开"
      })
    } else {
      this.setData({
        switchchange: "关闭"
      })
    }
  },
  // radio
  change1: function (e) {
    this.setData({
      checked: !this.data.checked
    })
    if (this.data.checked == true) {
      this.setData({
        change1: "选中"
      })
    } else {
      this.setData({
        change1: "未选中"
      })
    }
  },

  change2: function (e) {
    let items = this.data.language;
    console.log(e.detail)
    for (let i = 0; i < items.length; i++) {
      items[i].checked = items[i].value === e.detail.value
    }
    this.setData({
      language: items,
      checked_value: e.detail.value
    })
  },
  //checkbox
  checkboxchange: function (e) {
    this.setData({
      checked: !this.data.checked
    })
    if (this.data.checked == true) {
      this.setData({
        checkboxchange: "选中"
      })
    } else {
      this.setData({
        checkboxchange: "未选中"
      })
    }
  },

  checkboxchange2: function (e) {
    let items = this.data.language;
    let values = e.detail.value;
    for (let i = 0; i < items.length; i++) {
      items[i].checked = false;
      for (let j = 0; j < values.length; j++) {
        if (items[i].value == values[j]) {
          items[i].checked = true
        }
      }
    }
    this.setData({
      language: items,
      checked_value: values.toString()
    })
  },
  //picker
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'];
            data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
            break;
          case 1:
            data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
            data.multiArray[2] = ['鲫鱼', '带鱼'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
                break;
              case 1:
                data.multiArray[2] = ['蛔虫'];
                break;
              case 2:
                data.multiArray[2] = ['蚂蚁', '蚂蟥'];
                break;
              case 3:
                data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓'];
                break;
              case 4:
                data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
                break;
            }
            break;
          case 1:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['鲫鱼', '带鱼'];
                break;
              case 1:
                data.multiArray[2] = ['青蛙', '娃娃鱼'];
                break;
              case 2:
                data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
                break;
            }
            break;
        }
        data.multiIndex[2] = 0;
        console.log(data.multiIndex);
        break;
    }
    this.setData(data);
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  //slider
  sliderChange1: function (e) {
    console.log('slider发生change事件，携带value值为：', e.detail.value)
    this.setData({
      sliderValue1: e.detail.value
    })
  },
  sliderChange2: function (e) {
    console.log('slider发生changeing事件，携带value值为：', e.detail.value)
    this.setData({
      sliderValue2: e.detail.value
    })
  },
  //form
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

  tobefore(e) {
    if (this.data.currentPage === 0) {
      return
    }
    this.setData({
      currentPage: parseInt(this.data.currentPage) - 1
    })
  },
  tonext(e) {
    if (this.data.currentPage === this.data.pageNum - 1) {
      return
    }
    this.setData({
      currentPage: parseInt(this.data.currentPage) + 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentPage: parseInt(options.index)
    })
    //button
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              //用户已经授权过
            }
          })
        }
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