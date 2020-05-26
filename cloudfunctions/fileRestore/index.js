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
    const cloudDemo = db.collection('CloudDemo')

    let res = {}

    switch (event.action) {
        case 'get': {
            res = await getFileID(event.openid, cloudDemo)
            break
        }
        case 'update': {
            res = await updateFileID(event.openid, event.fileID, cloudDemo)
            break
        }
        case 'delete': {
            res = await deleteFileID(event.openid, cloudDemo)
            break
        }
        default: {
            res = { errCode: -1, errMsg: '未定义动作'}
        }
    }

    return res
}

async function getFileID(openid, collection) {
    return await collection.where({
        openid
    }).limit(1).get()
}

async function updateFileID(openid, newFileID, collection) {
    return await collection.where({
        openid
    }).update({
        data: {
            fileID: newFileID
        }
    })
}

async function deleteFileID(openid, collection) {
    return await collection.where({
        openid
    }).update({
        data: {
            fileID: ''
        }
    })
}