// 云函数入口文件
const cloud = require('wx-server-sdk')


// 云函数入口函数
exports.main = async (event, context) => {
  if (!event.envID) return { errCode: -1, errMsg: '环境id为空' }

  // 云开发初始化
  cloud.init({
    env: event.envID,
  })
  const db = cloud.database({
    env: event.envID,
  })
  
  const records = db.collection('Records')

  return await records.add({
    data: {
      openid: event.openid,
      behavior: event.behavior,
      component: event.component,
      cpType: event.cpType,
      cpNum: event.cpNum,
      time: event.time
    }
  })
}