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

  const users = db.collection(('Users'))
  try{
    let res = await users.limit(300).get()
    var count = 0
    console.log("长度： " + res.data.length)
    for(let i=0;i<res.data.length;i++){
      //console.log(res.data[i])
      if(res.data[i].username){
        await users.doc(res.data[i]._id).set({
          data: {
            openid: res.data[i].openid,
            username: res.data[i].username,
            flag: 'student'
          },
          success: res=>{
            console.log(res.data)
          }
        })
      }
      count++
    }
  }catch(e) {
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