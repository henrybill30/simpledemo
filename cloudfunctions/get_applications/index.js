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
  const users = db.collection('Users')
  if(event.openid){
    try{
      var app = await application.where({
        openid: event.openid
      }).get()
    }catch(e){
      return {
        state: false,
        msg: e
      }
    }
    return {
      state: true,
      application: app.data
    }
  }
  try{
    var apps = await application.get()
    var returndata = []
    for(let i=0;i<apps.data.length;i++){
      let user = await users.where({
        openid: apps.data[i].openid
      }).field({
        username: true,
        flag: true
      }).get()
      let data = {
        openid: apps.data[i].openid,
        username: user.data[0].username,
        applyFlag: apps.data[i].applyFlag,
        nowFlag: user.data[0].flag,
        applyState: apps.data[i].applyState
      }
      returndata.push(data)
    }
  }catch(e) {
    return {
      state: false,
      msg: e
    }
  }

  return {
    state: true,
    res: returndata
  }
 
}