// 云函数入口文件
const cloud = require('wx-server-sdk')


// 云函数入口函数
exports.main = async (event, context) => {
  if (!event.envID) return { errCode: -1, errMsg: '环境id为空' }
  
  // 云开发初始化
  cloud.init({
    env: event.envID,
  })
  try{
    let fileid = await getWXACode()
    return fileid
  }catch(e){
    return e
  }
  async function getWXACode(event) {

    // 此处将获取永久有效的小程序码，并将其保存在云文件存储中，最后返回云文件 ID 给前端使用
    try{
      const wxacodeResult = await cloud.openapi.wxacode.get({
        path: 'pages/components/index/index'
      })
      console.log(wxacodeResult)
    
      const fileExtensionMatches = wxacodeResult.contentType.match(/\/([^\/]+)/)
      const fileExtension = (fileExtensionMatches && fileExtensionMatches[1]) || 'jpg'
    
      const uploadResult = await cloud.uploadFile({
        // 云文件路径，此处为演示采用一个固定名称
        cloudPath: `wxacode_default_openapi_page.${fileExtension}`,
        // 要上传的文件内容可直接传入图片 Buffer
        fileContent: wxacodeResult.buffer,
      })
    
      if (!uploadResult.fileID) {
        throw new Error(`upload failed with empty fileID and storage server status code ${uploadResult.statusCode}`)
      }
      return uploadResult.fileID
    }catch(e){
      return e
    }
  }
}
