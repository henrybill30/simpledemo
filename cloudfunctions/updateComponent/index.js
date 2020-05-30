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
  const components = db.collection('Components')

  try {
    return await components.where({
      name: event.name,
      type: event.type,
      num: event.num
    })
    .update({
      data: {
        code: db.command.set(event.code)
      },
    })
  } catch(e) {
    console.error(e)
  }
  
}