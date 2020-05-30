const util = require('../../../utils/util.js')
const envID = getApp().globalData.envID
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageTitle: '云开发', // 页面信息
        currentPage: 0, // 子组件索引
        MIN_PAGE: 0,
        MAX_PAGE: 0,
        components: [
            {
                title: '云函数',
                name: 'cloudFunction',
                type: 'basic',
                num: 0
            },{
              title: '云数据库',
              name: 'database',
              type: 'basic',
              num: 0
            },{
                title: '云存储',
                name: 'cloudRestore',
                type: 'basic',
                num: 0
            }
            // },{
            //     title: '订阅消息',
            //     name: 'subscribeMsg',
            //     type: 'basic',
            //     num: 0
            // }
        ],
        leftAnimation: '', // 页面切换效果
        rightAnimation: '',
        text: undefined, // 文本存储
        imgUrl: '', // 文件存储
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
        A: 0,
        B: 0,
        result: 0,
        Openid: ''
    },

    inputA(e) {
        this.setData({
            A: e.detail.value
        }) 
    },

    inputB(e) {
        this.setData({
            B: e.detail.value
        }) 
    },

    async sum() {
        let result = await wx.cloud.callFunction({
            name: 'expSum',
            data: {
                envID: envID,
                A: this.data.A,
                B: this.data.B
            },
        })
        console.log(result)
        this.setData({
            result: result.result.result
        })
    },

    async getInfo() {
      let result = await wx.cloud.callFunction({
        name: 'expGetInfo',
        data: {
          envID: envID,
        }
      })
      console.log(result.result)
      this.setData({
        Openid: result.result.openid
      })
    },

    // 文本存储 更新已存储文本
    async updateText(e) {
        const event = {
            envID: getApp().globalData.envID,
            openid: getApp().globalData.openid,
            action: 'update',
            text: e.detail.value.textarea
        }
        await wx.cloud.callFunction({
            name: 'textRestore',
            data: event
        })
        await this.getText()
    },

    // 文本存储 获取已存储文本
    async getText() {
        const event = {
            envID: getApp().globalData.envID,
            openid: getApp().globalData.openid,
            action: 'get'
        }
        const res = await wx.cloud.callFunction({
            name: 'textRestore',
            data: event 
        })
        const data = res.result.data
        this.setData({
            text: data[0] && data[0].text
        })
    },

    // 文件存储 获取已上传文件
    async getImg() {
        const DEFAULT_IMG_URL = '/resource/cat.jpg'

        const event = {
            envID: getApp().globalData.envID,
            openid: getApp().globalData.openid,
            action: 'get'
        }
        try {
            const res = await wx.cloud.callFunction({
                name: 'fileRestore',
                data: event
                })
            const data = res.result.data
            this.setData({
                imgUrl: (data[0] && data[0].fileID) || DEFAULT_IMG_URL 

            })
        } catch(e) {
            console.error(e)
            this.setData({
                imgUrl: DEFAULT_IMG_URL
            })
        }
    },

    // 文件存储 更换图片
    async updateImg() {
        // 需用户登录 用户 openid 作为存储索引
        const openid = getApp().globalData.openid
        if(!openid) {
            wx.navigateTo({
                url: '/pages/login/login'
            })
            return
        }
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: async res => {
                let fileID = this.data.imgUrl
                await deleteFile(fileID) // 删除已有文件
                const filePath = res.tempFilePaths[0]
                const cloudPath = `${openid}-${(new Date).getTime()}`
                fileID = await uploadFile(cloudPath, filePath) // 上传新文件
                await updateFileID(fileID) // 数据库中更新文件 ID
            }
        })

        // 上传文件到云存储
        const uploadFile = async (cloudPath, filePath) => {
            const res = await wx.cloud.uploadFile({
                cloudPath,
                filePath
            })
            const fileID = res.fileID
            this.setData({
                imgUrl: fileID
            })
            return fileID
        }
        // 从云存储中删除文件
        const deleteFile = async fileID => {
            let res =  await wx.cloud.deleteFile({
                fileList: [fileID]
            })
        }
        // 云数据库中更新对应用户上传的文件
        const updateFileID = async newFileID => {
            const event = {
                envID: getApp().globalData.envID,
                openid: getApp().globalData.openid,
                action: 'update',
                fileID: newFileID
            }
            await wx.cloud.callFunction({
                name: 'fileRestore',
                data: event
            })
        }
    },

    async deleteImg(){
      let res =  await wx.cloud.deleteFile({
        fileList: [this.data.imgUrl]
      })
      const event = {
        envID: getApp().globalData.envID,
        openid: getApp().globalData.openid,
        action: 'delete',
      }
      await wx.cloud.callFunction({
        name: 'fileRestore',
        data: event
      })
      await this.getImg()
      console.log(res)
    },

    async toBefore(e) {
        let currentPage = this.data.currentPage
        if(currentPage <= this.data.MIN_PAGE) {
            return
        }
        currentPage--
        this.setData({
            currentPage,
            leftanimation: 'animation-fade',
            pageTitle: this.data.components[currentPage].title
        })

        await this.addRecord()

        const timerID = setTimeout(() => {
            this.setData({
                leftAnimation: ''
            })
            clearTimeout(timerID)
        }, 200)
    },

    async toNext(e) {
        let currentPage = this.data.currentPage
        if(currentPage >= this.data.MAX_PAGE) {
            return
        }
        currentPage++
        this.setData({
            currentPage,
            leftAnimation: 'animation-fade',
            pageTitle: this.data.components[currentPage].title
        })

        await this.addRecord()

        const timerID = setTimeout(() => {
            this.setData({
                rightAnimation: ''
            })
            clearTimeout(timerID)
        }, 200)
    },

    // 数据埋点
    async addRecord() {
        const components = this.data.components
        const currentPage = this.data.currentPage
        const event = {
            envID: getApp().globalData.envID,
            openid: getApp().globalData.openid,
            behavior: 'browse',
            component: components[currentPage].title,
            cpType: components[currentPage].type,
            cpNum: components[currentPage].num,
            time: new Date()
        }
        try {
            await wx.cloud.callFunction({
            name: 'addRecord',
            data: event
            })
        } catch(e) {
            console.error(e)
        }
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
        url: `./detail/detail?todoId=${todoId}`,
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

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
      // await insertDemoCode2CloudDatabase()
      const currentPage = parseInt(options.index) || 0
      const components = this.data.components
      const pageTitle = components[currentPage].title
      this.setData({
        currentPage,
        pageTitle,
        MAX_PAGE: this.data.components.length - 1
      })
      await this.getText()
      await this.getImg()

      await this.addRecord()

      // 云数据库 获取用户openid
      console.log(getApp().globalData.openid)
      if (getApp().globalData.openid) {
        this.setData({
          openid: getApp().globalData.openid
        })
      }
//     wx.cloud.callFunction({
//       name: 'addComponent',
//       data: {
//         envID: getApp().globalData.envID,
//         name : 'cloudRestore',
//         type: 'basic',
//         num: 2,
//         code: {
//           js: 
// `Page({
//     data: {
//         imgUrl: '',
//     },
//     async deleteImg(){
//       let res =  await wx.cloud.deleteFile({
//         fileList: [this.data.imgUrl]
//       })
//     },
// })`,
//         },
//         success: function(res) {
//           console.log(1111 + ":" + res)
//         },
//         fail: function(err) {
//           console.log(11111 + "err: " + err)
//         }
//       }
//     })
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
      // 云数据库 从detail页面返回后 更新表单
      this.queryTodoList()
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

// 示例代码插入云数据库，只需执行一次
async function insertDemoCode2CloudDatabase () {
  const envID = getApp().globalData.envID
  const dataArr = [
// {
//     envID,
//     name: 'textRestore',
//     type: 'basic',
//     num: 0,
//     code: {
//       html: ``,
//       js:
// `// 根据指定 id，将所需存储文本存入数据库
// async function addText(id, text) {
//     // 1. 获取数据库引用
//     const db = wx.cloud.database()
//     // 2. 构造查询语句
//     return await db.collection('Text').add({
//         data: {
//             id,
//             text
//         }
//     })
// }

// // 根据指定 id 获取存储文本
// async function getText(id) {
//     // 1. 获取数据库引用
//     const db = wx.cloud.database()
//     // 2. 构造查询语句
//     return await db.collection('Text').where({
//         id
//     }).get()
// }

// // 根据指定 id 及 新文本 更新已有文本
// async function updateText(id, newText) {
//     // 1. 获取数据库引用
//     const db = wx.cloud.database()
//     // 2. 构造更新语句
//     return await db.collection('Text').where({
//         id
//     }).update({
//         data: {
//             text: newText
//         }
//     })
// }`,
//       css: ``
//     }

// },
{
    envID: getApp().globalData.envID,
    name: 'fileRestore',
    type: 'basic',
    num: 0,
    code: {
        html: ``,
        js:
`// 将本地文件 filePath 上传到云存储 cloudPath ，返回对应文件 id
async function uploadFile(cloudPath, filePath) {
  const res = await wx.cloud.uploadFile({
    cloudPath,
    filePath
  })
  const fileID = res.fileID
  return fileID
}

// 根据文件 id 删除云存储中的文件
async function deleteFile(fileID) {
  await wx.cloud.deleteFile({
    fileList: [fileID]
  })
}`,
    css: ``
    }
}
        ]
  await Promise.all(dataArr.map(data => {
    wx.cloud.callFunction({
      name: 'addComponent',
      data
    })
  }))
}


