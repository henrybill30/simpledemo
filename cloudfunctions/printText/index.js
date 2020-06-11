// 云函数入口文件
const cloud = require('wx-server-sdk')

// 云函数入口函数
exports.main = async (event, context) => {
  if (!event.envID) return { errCode: -1, errMsg: '环境id为空' }
  
  // 云开发初始化
  cloud.init({
    env: event.envID,
  })
  // const db = cloud.database({
  //   env: event.envID,
  // })
  try {
    console.log(event.buffer)
    let result = await cloud.openapi.ocr.printedText({
        type: 'photo',
        img: {
          contentType: 'image/jpg',
          value: event.buffer
        }
      })
    console.log(result)
    return result
  } catch (err) {
    return err
  }

}