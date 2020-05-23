// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud

/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */
exports.main = async (event, context) => {
  // console.log(event)
  // console.log(context)
  // 判断是否有环境id
  if (!event.envID) return { errCode: -1, errMsg: '环境id为空' }
  
  // 云开发初始化
  cloud.init({
    env: event.envID,
  })
  const db = cloud.database({
    env: event.envID,
  })

  // 可执行其他自定义逻辑
  // console.log 的内容可以在云开发云函数调用日志查看

  // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）
  const wxContext = cloud.getWXContext()
  // 获取数据库
  const users = db.collection("Users")
  // 首先查询数据库中是否存过改id
  let a = await users.where({
    openid: wxContext.OPENID
  }).get({
    fail: function(err) {
      return {
        state: false,
        msg: err
      }
    }
  })
  // 若不存在则存储进数据库
  if (a.data.length == 0){
    await users.add({
      data: {
        openid: wxContext.OPENID,
        username: event.username
      },
      fail: function(err) {
        return {
          state: false,
          msg: err
        }
      }
    })
    return {
      state: true,
      msg: '新用户———存储成功！',
      isNewUser: true,
      openid: wxContext.OPENID
    }
  }

  return {
    state: true,
    msg: '用户已存储',
    isNewUser: false,
    openid: wxContext.OPENID
  }
}
