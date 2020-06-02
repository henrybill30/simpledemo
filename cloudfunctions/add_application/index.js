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

  const application = db.collection('Applications')
  return await application.add({
    data: {
      openid: event.openid,
      applyFlag: event.applyFlag,
      applyState: '正在审核',
      time: new Date()
    }
  })
}