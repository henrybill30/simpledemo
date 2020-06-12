// miniprogram/pages/person/ocr/index.js
import Toast from '../../../lib/dist/toast/toast';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        recommondComps: [],
        ocrResult: '',
        // imgUrl: 'https://7369-simpledemo-9jk60-1302043964.tcb.qcloud.la/ocr/1591860185045.png?sign=76e7bc741794497a2ecd07bf43d5a1c4&t=1591873638',
        imgUrl: '',
        imgVisible: false,
        MAX_SIZE: 2 * 1024 * 1024, // 单位 byte,
        compPath: [
            {
                name: 'view',
                path: 'pages/components/information/information?index=0'
            },
            {
                name: 'text',
                path: 'pages/components/information/information?index=1'
            },
            {
                name: 'icon',
                path: 'pages/components/information/information?index=2'
            },
            {
                name: 'progress',
                path: 'pages/components/information/information?index=3'
            },
            {
                name: 'richtext',
                path: 'pages/components/information/information?index=4'
            },
            {
                name: 'swiper',
                path: 'pages/components/information/information?index=5'
            },
            {
                name: 'button',
                path: 'pages/components/dataAndinteract/dataAndinteract?index=0'
            },
            {
                name: 'switch',
                path: 'pages/components/dataAndinteract/dataAndinteract?index=1'
            },
            {
                name: 'radio',
                path: 'pages/components/dataAndinteract/dataAndinteract?index=2'
            },
            {
                name: 'checkbox',
                path: 'pages/components/dataAndinteract/dataAndinteract?index=3'
            },
            {
                name: 'picker',
                path: 'pages/components/dataAndinteract/dataAndinteract?index=4'
            },
            {
                name: 'slider',
                path: 'pages/components/dataAndinteract/dataAndinteract?index=5'
            },
            {
                name: 'input',
                path: 'pages/components/dataAndinteract/dataAndinteract?index=6'
            },
            {
                name: 'form',
                path: 'pages/components/dataAndinteract/dataAndinteract?index=7'
            },
            {
                name: 'wx:for',
                path: 'pages/components/arrayAndloop/arrayAndloop?index=0'
            },
            {
                name: 'wx:if',
                path: 'pages/components/condition/condition?index=0'
            },
            {
                name: 'wx:elif',
                path: 'pages/components/condition/condition?index=1'
            },
            {
                name: 'wx:else',
                path: 'pages/components/condition/condition?index=2'
            },
            {
                name: '系统信息',
                path: 'pages/components/API/API?index=0'
            },
            {
                name: '传感器',
                path: 'pages/components/API/API?index=1'
            },
            {
                name: '振动',
                path: 'pages/components/API/API?index=2'
            },
            {
                name: '扫码',
                path: 'pages/components/API/API?index=3'
            },
            {
                name: '获取位置信息',
                path: 'pages/components/API/API?index=4'
            },
            {
                name: 'wx.setStorageSync',
                path: 'pages/components/Storage/Storage?index=0'
            },
            {
                name: 'wx.getStorageSync',
                path: 'pages/components/Storage/Storage?index=1'
            },
            {
                name: 'wx.getStorageInfo',
                path: 'pages/components/Storage/Storage?index=2'
            },
            {
                name: 'wx.removeStorageSync',
                path: 'pages/components/Storage/Storage?index=3'
            },
            {
                name: 'audio',
                path: 'pages/components/nativeComponent/nativeComponent?index=0'
            },
            {
                name: 'video',
                path: 'pages/components/nativeComponent/nativeComponent?index=1'
            },
            {
                name: 'map',
                path: 'pages/components/nativeComponent/nativeComponent?index=2'
            },
            {
                name: 'canvas',
                path: 'pages/components/nativeComponent/nativeComponent?index=3'
            },
            {
                name: 'camera',
                path: 'pages/components/nativeComponent/nativeComponent?index=4'
            },
            {
                name: 'flex',
                path: 'pages/components/layout/layout?index=0'
            },
            {
                name: 'cloudFunction',
                path: 'pages/components/cloudFunction/cloudFunction?index=0'
            },
            {
                name: 'cloudGetInfo',
                path: 'pages/components/cloudFunction/cloudFunction?index=1'
            },
            {
                name: 'createCollection',
                path: 'pages/components/cloudDatabase/cloudDatabase?index=0'
            },
            {
                name: 'addData',
                path: 'pages/components/cloudDatabase/cloudDatabase?index=1'
            },
            {
                name: 'getData',
                path: 'pages/components/cloudDatabase/cloudDatabase?index=2'
            },
            {
                name: 'updateData',
                path: 'pages/components/cloudDatabase/cloudDatabase?index=3'
            },
            {
                name: 'delData',
                path: 'pages/components/cloudDatabase/cloudDatabase?index=4'
            },
            {
                name: 'serverTime',
                path: 'pages/components/cloudDatabase/cloudDatabase?index=5'
            },
            {
                name: 'cloudRestore',
                path: 'pages/components/cloudStorage/cloudStorage?index=0'
            },
            {
                name: 'cloudRestoreFile',
                path: 'pages/components/cloudStorage/cloudStorage?index=1'
            },
            {
                name: 'cloudDeleteFile',
                path: 'pages/components/cloudStorage/cloudStorage?index=2'
            },
            {
                name: 'wxacode',
                path: 'pages/components/cloudAPI/cloudAPI?index=0'
            },
            {
                name: 'ocr',
                path: 'pages/components/cloudAPI/cloudAPI?index=1'
            },
            {
                name: 'pageHook',
                path: 'pages/components/lifecycle/lifecycle?index=0'
            },
            {
                name: 'componentHook',
                path: 'pages/components/lifecycle/lifecycle?index=1'
            },
        ]
    },

    to(e){
        console.log()
        wx.navigateTo({
          url: `../../../${ e.currentTarget.dataset.path }`,
        })
      },

    async getComponents () {
        const data = {
            envID: getApp().globalData.envID,
            text: this.data.ocrResult
        }
        const res = await wx.cloud.callFunction({
            name: 'ocr',
            data
        })
        let comps = []
        for(let i=0;i<res.result.length;i++){
            for(let comp of this.data.compPath){
                if(res.result[i].name == comp.name){
                    comps.push({
                        name: res.result[i].name,
                        path: comp.path
                    })
                }
            }
        }
        this.setData({
            recommondComps: comps
        })
        console.log(comps)
    },

    async afterRead (event) {
        Toast.loading({
            duration: 0, // 持续展示 toast
            forbidClick: true, // 禁用背景点击
            message: '请求中...',
        });
        try {
            console.log(event.detail.file.path)
            const filePath = event.detail.file.path
            const fileFormat = filePath.split('.').pop()
            const cloudPath = `ocr/${(new Date()).getTime()}.${fileFormat}`
        
            const fileID = await this.uploadFile2Cloud(cloudPath, filePath)
            console.log(fileID)
            
            const tempFileURL = await this.getTempFileURLfromCloud(fileID)
            console.log(tempFileURL)
            this.setData({
                imgUrl: tempFileURL,
                imgVisible: true
            })
        
            const ocrResult = await this.ocr(tempFileURL)

            console.log(ocrResult)
            this.setData({
                ocrResult
            })

            await this.getComponents()
            Toast.clear()
        } catch(e) {
            Toast.clear()
            Toast('服务开小差了~')
        }
    },

    imgOversize () {
        Toast('图片大小应小于2M!')
    },

    async uploadFile2Cloud (cloudPath, filePath) {
        
        const res =await wx.cloud.uploadFile({
            cloudPath,
            filePath
        })
        return res.fileID
    },

    async getTempFileURLfromCloud (fileID) {
        const res = await wx.cloud.getTempFileURL({
            fileList: [{
                fileID,
                maxAge: 60 * 60, // one hour
            }]
            })
        return res.fileList[0].tempFileURL
    },
    
    // imgUrl 需公网可访问
    async ocr (imgUrl) {
        // 参考：https://developers.weixin.qq.com/community/servicemarket/detail/000ce4cec24ca026d37900ed551415
        const data = {
            img_url: imgUrl,
            // img_url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591868367077&di=9806b30f2ade66d996545323c6f2a4dc&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20181113%2F13%2F1542085224-DOuwAhszqZ.jpg',
            data_type: 3, // 图片 url
            ocr_type: 8 // 通用 OCR
        }
        const res = await wx.serviceMarket.invokeService({
            service: 'wx79ac3de8be320b71', // '固定为服务商OCR的appid，非小程序appid',
            api: 'OcrAllInOne',
            data
        })
        console.log(res)
        const results = res.data.ocr_comm_res.items
        const code = results.reduce((acc, cur) => {
            acc += `\n${cur.text}`
            return acc
        }, '')
        return code
    },

    previewImage () {
        const imgUrl = this.data.imgUrl
        wx.previewImage({
            current: imgUrl, // 当前显示图片的http链接
            urls: [imgUrl] // 需要预览的图片http链接列表
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})