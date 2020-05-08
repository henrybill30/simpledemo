// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const MAX_LIMIT = 100 //云函数一次最多取100条记录
// 云函数入口函数
exports.main = async(event, context) => {
  let userNO = 0,
    visitNo = 0,
    oprNo = 0

  // 先取出集合记录总数
  const countResult = await db.collection('simpledemo').count()
  const total = countResult.total
  // 计算需分几次取
  const batchTimes = Math.ceil(total / 100)
  // 承载所有读操作的 promise 的数组
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = db.collection('simpledemo').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }
  // 等待所有
  let result = (await Promise.all(tasks)).reduce((acc, cur) => {
    return {
      data: acc.data.concat(cur.data),
      errMsg: acc.errMsg,
    }
  })
  //计算统计量
  let docs = result.data
  let ids = {}
  docs.forEach(ele => {
    if (!ids[ele.openid]) {
      ids[ele.openid] = 1
      userNO++
    }
    ele.newLogs.forEach(elein => {
      if (elein.operation) oprNo++
      else if (!elein.operation) visitNo++
    })
  })

  return {
    userNO,
    visitNo,
    oprNo
  }
}