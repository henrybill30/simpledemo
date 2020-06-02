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

  const component = db.collection('Components')
  const _ = db.command
  try{
    var res = await component.where({
      name: event.name,
      type: event.type,
      num: event.num,
    }).update({
      data: {
        understandNum: _.inc(1)
      }
    })
    var result = await component.where({
      name: event.name,
      type: event.type,
      num: event.num,
    }).field({
      understandNum:true
    }).limit(1)
    .get()
  }catch(e){
    return {
      state: false,
      msg: e
    }
  }

  return {
    state: true,
    understandNum: result.data[0].understandNum
  }
}