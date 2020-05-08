const util = require('../../utils/util.js')

Page({
  data: {
    launchLogs: [],
    eventsLogs: []
  },
  onReady: function() {
    // this.setData({
    //   logs: (wx.getStorageSync('logs') || []).map(log => {
    //     return util.formatTime(new Date(log))
    //   })
    // })

    let logs = wx.getStorageSync('logs') || []
    let len = logs.length
    if (len != 0) {
      let eventsLogs_Temp_0 = this.data.eventsLogs
      eventsLogs_Temp_0.push([])
      this.setData({
        eventsLogs: eventsLogs_Temp_0
      })
      let i = 0
      while (i < len) {
        if (logs[i].operation) {
          let eventsLogs_temp = this.data.eventsLogs
          eventsLogs_temp[eventsLogs_temp.length - 1].push(logs[i])
          this.setData({
            eventsLogs: eventsLogs_temp
          })
        } else {
          let launchLogs_temp = this.data.launchLogs
          launchLogs_temp.push(util.formatTime(new Date(logs[i])))
          this.setData({
            launchLogs: launchLogs_temp
          })
          if (i < len - 1) {
            let eventsLogs_Temp = this.data.eventsLogs
            eventsLogs_Temp.push([])
            this.setData({
              eventsLogs: eventsLogs_Temp
            })
          }
        }
        i++
      }
    }
  }
})