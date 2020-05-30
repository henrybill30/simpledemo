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
    const feedback = db.collection('Feedback')

    const { data } = event

    let res = {}

    switch (event.action) {
        case 'add': {
            await addFeedback(data, feedback)
            break
        }
        default: {
            res = { errCode: -1, errMsg: '未定义动作'}
        }
    }

    return res
}

async function addFeedback(data, feedback) {
    await feedback.add({
        data
    })
}
