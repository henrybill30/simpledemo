// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  openid = wxContext.OPENID
  if(openid == 'o1iyM5foZDxqYIKgHkZDdyVbnA5o' ||
     openid == 'o1iyM5QfgEz4AIRGmWl5mkEC9zJw' ||
     openid == 'o1iyM5WKbagD1SLujsClKXggefXw'){
       return {admin_openid: openid};
     }
  return {admin_openid: '0'}
}