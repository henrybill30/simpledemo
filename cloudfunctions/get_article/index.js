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

  const article = db.collection('article')
  if(event.id){
    try{
      var res = await article.where({
        _id: event.id
      }).get({
        success: res => {
          return res.data
        }
      })
    }catch(e){
      return {
        state: false,
        msg: e
      }
    }
  }else{
    try{
      var res = await article.where({}).field({
        _id: true,
        author: true,
        time: true,
        title: true,
        introduction: true
      }).get({
        success: res => {
          return res.data
        }
      })
    }catch(e){
      return {
        state: false,
        msg: e
      }
    }
  }
  return {
    state: true,
    res: res
  }
}