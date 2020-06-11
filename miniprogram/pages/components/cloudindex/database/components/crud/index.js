// pages/components/cloud/components/fileRestore/index.js
const util = require('../../../../../../utils/util.js')
const envID = getApp().globalData.envID
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
      value1: '',
      list: [],
      editFlag: -1,
      saveValue: '',
      editValue: '',
      editid: '',

      //云数据库
      openid: '',
      todoListFetched: false,
      todoList: [],
      searchContent: '',
      newContent: '',
      filtered: false,
      loading: false,
      timetype: true, //默认显示服务端时间
      showMilliseconds: false, //默认不显示毫秒
    },

    lifetimes: {
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
      input1: function(e){
        this.setData({
          value1: e.detail.value
        })
      },
      save(){
        wx.cloud.callFunction({
          name: 'add_test',
          data: {
            envID: envID,
            openid: getApp().globalData.openid,
            text: this.data.value1
          },
          success: res => {
            wx.showToast({
              title: '存储成功！',
            })
            this.setData({
              saveValue: ''
            })
          },
          fail: err => {
            console.log("调用云函数失败：" + JSON.stringify(err))
          }
        })
      },
      get(){
        console.log(getApp().globalData.openid)
        wx.cloud.callFunction({
          name: 'get_test',
          data: {
            envID: envID,
            openid: getApp().globalData.openid
          },
          success: res => {
            console.log(res)
            let list = res.result.res
            if(list.length==0){
              wx.showToast({
                title: '请先存储数据！',
                icon: 'none'
              })
            }
            list = list.map(item => ({
              id: item._id,
              text: item.text,
              time: util.formatDateTime(new Date(item.time))
            }))
            this.setData({
              list: list
            })
          },
          fail: err => {
            console.log("调用云函数失败：" + JSON.stringify(err))
          }
        }) 
      },
      editValue(e){
        // console.log(e.detail.value)
        this.setData({
          editValue: e.detail.value
        })
      },
      edit(e){
        // console.log(e)
        this.setData({
          editFlag: e.currentTarget.dataset.index,
          editid: e.currentTarget.dataset.id
        })
      },
      saveEdit(){
        wx.cloud.callFunction({
          name: 'edit_test',
          data: {
            envID: envID,
            id: this.data.editid,
            text: this.data.editValue
          },
          success: (res) => {
            console.log(res)
            wx.showToast({
              title: '更新数据成功！'
            })
            this.setData({
              editFlag: -1,
              editid: ''
            })
            this.get()
          },
          fail: err => {
            console.log("调用云函数失败：" + JSON.stringify(err))
          }
        })
      },
      del(){
        if(this.data.list.length==0){
          wx.showToast({
            title: '请先查询数据是否存在！',
            icon: 'none'
          })
          return
        }
        wx.cloud.callFunction({
          name: 'del_test',
          data: {
            envID: envID,
            openid: getApp().globalData.openid
          },
          success: res => {
            console.log(res.result)
            wx.showToast({
              title: '删除数据成功！',
            })
            this.setData({
              list: []
            })
          },
          fail: err => {
            console.log("调用云函数失败：" + JSON.stringify(err))
          }
        })
      },

      //云数据库
    createTodo() {
      // 创建 todo
      if (this.data.loading) {
        return
      }
      const { newContent } = this.data
      if (!newContent) {
        return
      }

      this.setData({ loading: true })
      const db = wx.cloud.database()
      db.collection('todos').add({
        data: {
          description: newContent,
          done: false,
          serverTime: db.serverDate(),
          clientTime: new Date()
        },
        success: res => {
          // 在返回结果中会包含新创建的记录的 _id
          console.log(res)
          this.queryTodoList()
          this.setData({
            newContent: ""
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
        complete: () => {
          this.setData({ loading: false })
        }
      })
    },

    queryTodoList() {
      // 获取用户 todos 列表
      wx.showLoading({
        title: '正在查询...'
      })
      const db = wx.cloud.database()
      db.collection('todos').where({
        _openid: this.data.openid
      }).get({
        success: res => {
          let list = res.data
          list.map((item)=>{
            if (this.data.timetype){
              item.time = util.formatDateTime(item.serverTime, this.data.showMilliseconds)
            } else {
              item.time = util.formatDateTime(item.clientTime, this.data.showMilliseconds)
            }
            return item
          })
          this.setData({
            todoListFetched: true,
            todoList: res.data,
            filtered: false
            // todotime: util.formatDateTime(res.data.time, true)
          })
          console.log('[数据库] [查询记录] 成功: ', res)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error('[数据库] [查询记录] 失败：', err)
        },
        complete: () => {
          wx.hideLoading()
        }
      })
    },

    searchTodo() {
      // 搜索todo
      const { searchContent } = this.data
      console.log(searchContent,'searchContent')
      if (!searchContent) {
        this.queryTodoList()
        return
      }

      const db = wx.cloud.database()
      let descriptionCondition = searchContent
      const execResult = /([\s\S]*)$/.exec(searchContent)
      console.log(execResult, 'ooo')
      if (execResult) {
        console.log(execResult)
        const reStr = execResult[1].trim().replace(/\s+/g, '|')
        console.log(reStr)
        descriptionCondition = db.RegExp({
          regexp: reStr
        })
      }
      wx.showLoading({
        title: '正在查询...'
      })
      db.collection('todos').where({
        _openid: this.data.openid,
        description: descriptionCondition
      }).get({
        success: res => {
          this.setData({
            todoList: res.data,
            filtered: true
          })
          console.log('[数据库] [查询记录] 成功: ', res)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error('[数据库] [查询记录] 失败：', err)
        },
        complete: () => {
          wx.hideLoading()
        }
      })
    },

    toggleComplete(e) {
      // 更新选项是否完成
      if (this.data.loading) {
        return
      }
      const { id: todoId, index } = e.currentTarget.dataset
      const todo = this.data.todoList[index]

      this.setData({ loading: true })
      const db = wx.cloud.database()
      db.collection('todos').doc(todoId).update({
        data: { done: !todo.done },
        success: () => {
          this.setData({
            [`todoList[${index}].done`]: !todo.done
          })
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '更新失败',
          })
          console.error('[数据库] [更新记录] 失败：', err)
        },
        complete: () => {
          this.setData({ loading: false })
        }
      })
    },

    toDetail(e) {
      // 前往详情页
      const { id: todoId } = e.currentTarget.dataset
      wx.navigateTo({
        url: `./components/crud/detail/detail?todoId=${todoId}`,
      })
    },

    onInputSearchContent(e) {
      // 输入搜索内容
      this.setData({
        searchContent: e.detail.value
      })
    },

    onInputNewContent(e) {
      // 输入新的todo
      this.setData({
        newContent: e.detail.value
      })
    },
    switch1Change(e){
      this.setData({
        timetype: e.detail.value
      })
      this.queryTodoList()
    },
    switch2Change(e){
      this.setData({
        showMilliseconds: e.detail.value
      })
      this.queryTodoList()
    },
  },
  
  lifetimes: {
    attached: async function (options) {
      // this.queryTodoList()
      // 云数据库 获取用户openid
      console.log(getApp().globalData.openid)
      if (getApp().globalData.openid) {
        this.setData({
          openid: getApp().globalData.openid
        })
      }
    }
  },
  pageLifetimes: {
    show: function() {
      // 页面被展示
      this.queryTodoList()
    },
    hide: function() {
      // 页面被隐藏
    },
    resize: function(size) {
      // 页面尺寸变化
    }
  }
})
