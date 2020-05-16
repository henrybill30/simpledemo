Component({
  data: {
    showcode: false,
    lastTapTime: 0,
    codeNum: 0, // 计算代码种类数，只为一种不显示代码名
    htmlcode: ``,
    jscode: ``,
    csscode: ``
  },
  options: {
    // multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    height: {
      type: Number,
      value: 80
    },
    // htmlcode: String,
    // jscode: String,
    // csscode: String
    name: String,
    type: String,
    num: Number
  },
  methods: {
    doubleClick: function (e) {
      var curTime = e.timeStamp
      var lastTime = this.data.lastTapTime  
      console.log(lastTime)
      if (curTime - lastTime > 0) {
        if (curTime - lastTime < 300) {
          console.log("挺快的双击，用了：" + (curTime - lastTime))
          this.setData({
            showcode: !this.data.showcode
          })
        }
      }
      this.setData({
        lastTapTime: curTime
      })
    },
    showCode: function (event) {
      console.log(event, "long")
      this.setData({
        showcode: !this.data.showcode
      })
    },
    copyhtml: function (e) {
      var content = this.properties.htmlcode.split("@@")[1];
      wx.showActionSheet({
        itemList: ['复制代码'],
        success(res) {
          var tabIndex = res.tapIndex;
          if (tabIndex == 0) {
            wx.setClipboardData({
              data: content,
              success(res) {
                wx.showToast({
                  title: '代码已复制'
                })
              }
            })
          }
        }
      })
    },
    copyjs: function (e) {
      var content = this.properties.jscode.split("@@")[1];
      wx.showActionSheet({
        itemList: ['复制代码'],
        success(res) {
          var tabIndex = res.tapIndex;
          if (tabIndex == 0) {
            wx.setClipboardData({
              data: content,
              success(res) {
                wx.showToast({
                  title: '代码已复制'
                })
              }
            })
          }
        }
      })
    },
    copycss: function (e) {
      var content = this.properties.csscode.split("@@")[1];
      wx.showActionSheet({
        itemList: ['复制代码'],
        success(res) {
          var tabIndex = res.tapIndex;
          if (tabIndex == 0) {
            wx.setClipboardData({
              data: content,
              success(res) {
                wx.showToast({
                  title: '代码已复制'
                })
              }
            })
          }
        }
      })
    },
  },
  lifetimes: {
    attached: async function () {
      // 在组件实例进入页面节点树时执行
      wx.cloud.callFunction({
        name: "getComponent",
        data: {
          envID: getApp().globalData.envID,
          name: this.properties.name,
          type: this.properties.type,
          num: this.properties.num
        },
        success: res => {
          // console.log("111: " + JSON.stringify(res.result.data[0].code.html))
          if(res.result.data[0].code.html){
            this.setData({
              htmlcode: `<pre><code class="language-html">@@${res.result.data[0].code.html}@@</code></pre>`,
              codeNum: this.data.codeNum + 1
            })
          }
          if (res.result.data[0].code.js) {
            this.setData({
              jscode: `<pre><code class="language-js">@@${res.result.data[0].code.js}@@</code></pre>`,
              codeNum: this.data.codeNum + 1
            })
          }
          if (res.result.data[0].code.css) {
            this.setData({
              csscode: `<pre><code class="language-css">@@${res.result.data[0].code.css}@@</code></pre>`,
              codeNum: this.data.codeNum + 1
            })
          }
        },
        fail: err => {
          console.log("2222: " + err)
        }
      })
      // if (this.properties.htmlcode){
      //   this.setData({
      //     htmlcode: `<pre><code class="language-html">@@${this.properties.htmlcode}@@</code></pre>`,
      //     codeNum: this.data.codeNum+1
      //   })
      // }
      // if (this.properties.jscode) {
      //   this.setData({
      //     jscode: `<pre><code class="language-js">@@${this.properties.jscode}@@</code></pre>`,
      //     codeNum: this.data.codeNum+1
      //   })
      // }
      // if (this.properties.csscode) {
      //   this.setData({
      //     csscode: `<pre><code class="language-css">@@${this.properties.csscode}@@</code></pre>`,
      //     codeNum: this.data.codeNum+1
      //   })
      // }
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  externalClasses: ['custom-class']
});
