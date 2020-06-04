Component({
  data: {
    showcode: false,
    lastTapTime: 0,
    codeNum: 0, // 计算代码种类数，只为一种不显示代码名
    htmlcode: ``,
    jscode: ``,
    csscode: ``,
    collected: false
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
    num: Number,
    currentPage: Number
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
    collected(){
      if(!getApp().globalData.loginFlag){
        wx.showModal({
          title: '提示',
          content: '请先登录授权',
          confirmText: '前去登录',
          confirmColor: '#1685a9',
          cancelColor: '#9ea1a3',
          success: res => {
            if(res.confirm){
              wx.switchTab({
                url: '/pages/person/index'
              })
            }else if(res.cancel){
              wx.showToast({
                title: '这样就无法查看代码或收藏哦~',
                icon: 'none'
              })
            }
          }
        })
      }else{
        const pages = getCurrentPages()
        let that = this
        // console.log(getApp().globalData.openid,this.properties.name,this.properties.type,this.properties.num)
        if(!this.data.collected){
          wx.cloud.callFunction({
            name: 'add_collection',
            data: {
              envID: getApp().globalData.envID,
              openid: getApp().globalData.openid,
              name: this.properties.name,
              type: this.properties.type,
              num: this.properties.num,
              path: `${ pages[pages.length-1].route }?index=${ that.properties.currentPage}`
            },
            success: res => {
              // console.log("result: " + JSON.stringify(res.result))
              wx.showToast({
                title: '收藏成功！',
                icon: 'success'
              })
              that.setData({
                collected: !that.data.collected
              })
            },
            fail: err => {
              // console.log("error: " + JSON.stringify(err))
              wx.showToast({
                title: '收藏失败！',
                icon: 'none'
              })
            }
          })
        } else {
          wx.cloud.callFunction({
            name: 'del_collection',
            data: {
              envID: getApp().globalData.envID,
              openid: getApp().globalData.openid,
              name: this.properties.name,
              type: this.properties.type,
              num: this.properties.num
            },
            success: res => {
              wx.showToast({
                title: '取消收藏成功！',
                icon: 'success'
              })
              that.setData({
                collected: !that.data.collected
              })
            },
            fail: err => {
              wx.showToast({
                title: '取消收藏失败！',
                icon: 'none'
              })
            }
          })
        }
      }
    },
    showCode: function (event) {
      if(!getApp().globalData.loginFlag){
        wx.showModal({
          title: '提示',
          content: '请先登录授权',
          confirmText: '前去登录',
          confirmColor: '#1685a9',
          cancelColor: '#9ea1a3',
          success: res => {
            if(res.confirm){
              wx.switchTab({
                url: '/pages/person/index'
              })
            }else if(res.cancel){
              wx.showToast({
                title: '这样就无法查看代码或收藏哦~',
                icon: 'none'
              })
            }
          }
        })
      }else{
        this.setData({
          showcode: !this.data.showcode
        })
        if(!this.data.showcode){
          return
        }
        wx.cloud.callFunction({
          name: 'addRecord',
          data: {
            envID: getApp().globalData.envID,
            openid: getApp().globalData.openid,
            behavior: 'showCode',
            component: this.properties.name,
            cpType: this.properties.type,
            cpNum: this.properties.num,
            time: new Date()
          },
          success: res => {
            console.log("result: " + JSON.stringify(res.result))
          },
          fail: err => {
            console.log("error: " + JSON.stringify(err))
          }
        })
      }
    },
    feedback: function (event) {
      if(!getApp().globalData.loginFlag){
        wx.showModal({
          title: '提示',
          content: '请先登录授权',
          confirmText: '前去登录',
          confirmColor: '#1685a9',
          cancelColor: '#9ea1a3',
          success: res => {
            if(res.confirm){
              wx.switchTab({
                url: '/pages/person/index'
              })
            }else if(res.cancel){
              wx.showToast({
                title: '这样就无法查看代码或收藏哦~',
                icon: 'none'
              })
            }
          }
        })
      }else{
        const { name, type, num } = this.properties
        const component = JSON.stringify({
          name, type, num
        })
        wx.navigateTo({
          url: `/pages/person/feedback/index?component=${component}`
        })
      }
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
    copycloud: function (e) {
      var content = this.properties.cloudcode.split("@@")[1];
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
      let that = this

      wx.cloud.callFunction({
        name: "getComponent",
        data: {
          envID: getApp().globalData.envID,
          name: this.properties.name,
          type: this.properties.type,
          num: this.properties.num
        },
        success: res => {
          // console.log("111: " + JSON.stringify(res.result.data[0].code.js))
          if(res.result.data[0].code.html){
            this.setData({
              htmlcode: `<pre><code class="language-html">@@${res.result.data[0].code.html}@@</code></pre>`,
              codeNum: this.data.codeNum + 1
            })
          }
          if(res.result.data[0].code.cloudcode){
            this.setData({
              cloudcode: `<pre><code class="language-js">@@${res.result.data[0].code.cloudcode}@@</code></pre>`,
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
      wx.cloud.callFunction({
        name: 'get_collections',
        data: {
          envID: getApp().globalData.envID,
          openid: getApp().globalData.openid,
          name: this.properties.name,
          type: this.properties.type,
          num: this.properties.num
        },
        success: res => {
          console.log((res.result.res))
          if(res.result.res.data.length!=0){
            that.setData({
              collected: true
            })
          }
        },
        fail: err => {
          console.log("error: " + JSON.stringify(err))
        }
      })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  externalClasses: ['custom-class']
});
