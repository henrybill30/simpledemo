// 云函数入口文件
const cloud = require('wx-server-sdk')

// 云函数入口函数
exports.main = async (event, context) => {
  if(!event.envID) return { errCode: -1, errMsg: '环境id为空' }

  cloud.init({
      env: event.envID,
  }) 
  const db = cloud.database({
      env: event.envID,
  })

  const collection = db.collection('Collections')

  try {
    var res = await collection.where({
      openid: event.openid,
      name: event.name
    }).get({
      success: res => {
        return res.data
      }
    })
  }catch(e) {
    return {
      state: false,
      msg: e
    }
  }
  return {
    state: true,
    res: res
  }
}