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

  const users = db.collection('Users')
  let res;
  console.log('event', event)
  try{
    res = await users.where({
      openid: event.openid
    }).update({
      data: {
        stuNum: event.stuNum,
        stuName: event.stuName
      },
    })
  }catch(e){
    return {
      state: false,
      msg: e
    }
  } 
  return {
    state: true,
    result: res
  }
}