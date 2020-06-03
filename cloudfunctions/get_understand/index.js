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

  const wxContext = cloud.getWXContext()
  const component = db.collection('Components')
  const understand = db.collection('Understands')

  try{
    var res = await component.where({
      name: event.name,
      type: event.type,
      num: event.num
    }).field({
      type: true,
      num: true,
      understandNum: true
    }).get()

    var understood = await understand.where({
      openid: wxContext.OPENID,
      name: event.name,
    }).field({
      type: true,
      num: true
    }).get()
  }catch(e){
    return{
      state: false,
      msg: e
    }
  }
  return {
    state: true,
    res: res.data,
    understand: understood.data
  }
}