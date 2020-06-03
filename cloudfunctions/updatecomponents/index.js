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

  try{
    let res = await components.limit(500).get()
    console.log("长度："+res.data.length)
    var count = 0
    for(let i=0;i<res.data.length;i++){
      await components.doc(res.data[i]._id).set({
        data: {
          code: res.data[i].code,
          name: res.data[i].name,
          type: res.data[i].type,
          num: res.data[i].num,
          understandNum: 0
        }
      })
      count++
    }
  }catch(e){
    return {
      state: false,
      msg: e
    }
  }
  return {
    state: true,
    count: count
  }
}