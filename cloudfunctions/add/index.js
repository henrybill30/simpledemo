// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async(event, context) => {
  try {
    return await db.collection('simpledemo').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
        nickname: event.nickname,
        openid: event.openid,
        newLogs: event.newLogs
      },
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
       
      },
      fail: function (res) {
        
      }
    })
  } catch (e) {
    console.error(e)
  }

}