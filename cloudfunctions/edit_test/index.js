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

  const test = db.collection('test')

  let res = await test.doc(event.id).update({
    // data 传入需要局部更新的数据
    data: {
      // 表示将 done 字段置为 true
      text: event.text
    },
    success: function(res) {
    }
  })
  
  return{
    state: true
  }

}