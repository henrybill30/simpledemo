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
    const cloudDemo = db.collection('CloudDemo')

    let res = {}

    switch (event.action) {
        case 'get': {
            res = await getText(event.openid, cloudDemo)
            break
        }
        case 'update': {
            res = await updateText(event.openid, event.text, cloudDemo)
            break
        }
        default: {
            res = { errCode: -1, errMsg: '未定义动作'}
        }
    }

    return res
}

async function getText(openid, collection) {
    return await collection.where({
        openid
    }).limit(1).get()
}

async function updateText(openid, newText, collection) {
    const preRecords = await collection.where({
        openid
    }).count()
    if(preRecords.total === 0) {
        await collection.add({
            data: {
                openid,
                text: ''
            }
        })
    }

    return await collection.where({
        openid
    }).update({
        data: {
            text: newText
        }
    })
}
