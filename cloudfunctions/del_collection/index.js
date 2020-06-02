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
  if(event.id){
    try {
      var result = await collection.where({
        _id: event.id
      }).remove()
    }catch(e) {
      return {
        state: false,
        msg: e
      }
    }
  
    return {
      state: true,
      res: result
    }
  } else {
    try {
      var result = await collection.where({
        openid: event.openid,
        name: event.name,
        type: event.type,
        num: event.num
      }).remove()
    }catch(e) {
      return {
        state: false,
        msg: e
      }
    }
  
    return {
      state: true,
      res: result
    }
  }
}