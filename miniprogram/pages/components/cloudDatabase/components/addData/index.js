// pages/components/cloudDatabase/components/addData/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    activeId: '',
    todo: '',
    todoNum: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showMore(e){
      this.setData({
        activeId: e.detail.id
      })
    },

    input(e) {
      this.setData({
        todo: e.detail.value
      })
    },

    add() {
      let that = this
      if(that.data.todo == ''){
        return
      }
      if(that.data.todoNum>=5){
        wx.showToast({
          title: '添加已至上限',
          icon: 'none'
        })
      }else{
        var db = wx.cloud.database()
        db.collection("todos").add({
          data: {
            description: that.data.todo,
            done: false,
            serverTime: db.serverDate(),
            clientTime: new Date()
          },
          success: res => {
            // 在返回结果中会包含新创建的记录的 _id
            this.setData({
              newContent: "",
              todoNum: that.data.todoNum+1
            })
            wx.showToast({
              title: '新增记录成功',
            })
            console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '新增记录失败'
            })
            console.error('[数据库] [新增记录] 失败：', err)
          },
        })
      }
    }
  },

  lifetimes: {
    attached: function() {
      let that = this
      var db = wx.cloud.database()
      db.collection('todos').where({
        _openid: getApp().globalData.openid
      }).get({
        success: res => {
          console.log(res.data.length)
          that.setData({
            todoNum: res.data.length
          })
        }
      })
      
      // that.setData({
      //   todoNum: todoNum
      // })
    }
  }
})











