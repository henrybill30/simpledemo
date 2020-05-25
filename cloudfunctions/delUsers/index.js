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

  const user = db.collection('Users')

  let users = await user.limit(300).get()
  let count = 0;
  console.log(typeof(users))
  for(let i=0;i<users.data.length;i++){
    console.log(i)
    console.log(users.data[i].openid)
    await user.where({
      openid: users.data[i].openid
    }).remove({
      success: function(res) {
        count++
      }
    })
  }
  return {
    count: count,
  }
}