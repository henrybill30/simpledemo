Component({
  data: {
    showcode: false,
    lastTapTime: 0,
    codeNum: 0 // 计算代码种类数，只为一种不显示代码名
  },
  options: {
    // multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    height: {
      type: Number,
      value: 80
    },
    htmlcode: String,
    jscode: String,
    csscode: String
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
    attached: function () {
      // 在组件实例进入页面节点树时执行
      console.log('pppppppppp', this.properties.htmlcode)
      if (this.properties.htmlcode){
        this.setData({
          htmlcode: `<pre><code class="language-html">@@${this.properties.htmlcode}@@</code></pre>`,
          codeNum: this.data.codeNum+1
        })
      }
      if (this.properties.jscode) {
        this.setData({
          jscode: `<pre><code class="language-js">@@${this.properties.jscode}@@</code></pre>`,
          codeNum: this.data.codeNum+1
        })
      }
      console.log(this.data.codeNum)
      if (this.properties.csscode) {
        this.setData({
          csscode: `<pre><code class="language-css">@@${this.properties.csscode}@@</code></pre>`,
          codeNum: this.data.codeNum+1
        })
      }
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  externalClasses: ['custom-class']
});
