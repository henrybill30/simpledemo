// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

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
  const users = db.collection('Users')
  try{
    if(event.isAgree){
      await application.where({
        openid: event.openid
      }).update({
        data: {
          applyState: '已同意'
        }
      })
      await users.where({
        openid: event.openid
      }).update({
        data:{
          flag: event.applyFlag
        }
      })
    }else{
      await application.where({
        openid: event.openid
      }).update({
        data: {
          applyState: '已拒绝'
        }
      })
    }
  }catch(e){
    return{
      state: false,
      msg: e
    }
  }
  return {
    state: true,
    msg: '审核成功！'
  }
}