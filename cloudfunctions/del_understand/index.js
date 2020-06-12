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
  const _ = db.command
  try{
    let isUnderstand = await understand.where({
      openid: wxContext.OPENID,
      name: event.name,
      type: event.type,
      num: event.num
    }).get()
    console.log(isUnderstand.data.length)
    if(isUnderstand.data.length != 0){
      await component.where({
        name: event.name,
        type: event.type,
        num: event.num,
      }).update({
        data: {
          understandNum: _.inc(-1)
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
      await understand.where({
        openid: wxContext.OPENID,
        name: event.name,
        type: event.type,
        num: event.num,
      }).remove()
      return {
        state: true,
        understandNum: result.data[0].understandNum
      }
    }
    let uNum = await component.where({
      name: event.name,
      type: event.type,
      num: event.num
    }).get().data[0].understandNum
    return{
      state: true,
      understandNum: uNum
    }
  }catch(e){
    return {
      state: false,
      msg: e
    }
  }
}