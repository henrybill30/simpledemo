// 云函数入口文件
const cloud = require('wx-server-sdk')

// cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  if(!event.envID) return { errCode: -1, errMsg: '环境id为空' }

    cloud.init({
        env: event.envID,
    }) 
    const db = cloud.database({
        env: event.envID,
    })
    

  return {
    result: parseInt(event.A) + parseInt(event.B)
  }
}