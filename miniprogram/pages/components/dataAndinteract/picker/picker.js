Page({
  data: {
    code: [
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
    customItem: '全部'
  },
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
  }
})