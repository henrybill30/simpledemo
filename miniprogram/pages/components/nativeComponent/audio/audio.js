const app = getApp()

Page({
  data: {
    open: true,
    st: 0
  },
  // stop(){
  //   if (this.data.open){
  //     this.setData({
  //       open: false
  //     })
  //     return
  //   } else{
  //     this.setData({
  //       open: true
  //     })
  //     wx.createSelectorQuery()
  //       .select('#canvas')
  //       .fields({
  //         node: true,
  //         size: true,
  //       })
  //       .exec(this.init.bind(this))
  //   }
  // },
  onLoad: function () {
    let that = this;
    this.position = {
      x: 150,
      y: 150,
      st: 2,
      r: 50
    }
    this.x = -100
    wx.startCompass({
      success(res) {
        console.log(res);
        wx.onCompassChange((result) => {
          that.setData({
            st: result.direction
          })
        })
      }
    })

    // 通过 SelectorQuery 获取 Canvas 节点
    wx.createSelectorQuery()
      .select('#canvas')
      .fields({
        node: true,
        size: true,
      })
      .exec(this.init.bind(this))
  },

  init(res) {
    const width = res[0].width
    const height = res[0].height

    const canvas = res[0].node
    const ctx = canvas.getContext('2d')

    const dpr = wx.getSystemInfoSync().pixelRatio
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    const renderLoop = () => {
      this.render(canvas, ctx)
      if(this.data.open){
        canvas.requestAnimationFrame(renderLoop)
      } else {
        return
      }
    }
    canvas.requestAnimationFrame(renderLoop)
  },

  render(canvas, ctx) {
    ctx.clearRect(0, 0, 300, 300)
    this.drawline(ctx)
  },

  drawline(ctx) {
    const p = this.position
    p.st = this.data.st
    console.log(p.x, p.y, p.r, p.st)
    function line(x, y, r, st) {
      ctx.beginPath()
      ctx.lineWidth = "1";
      ctx.strokeStyle = "#E63541";  // Green path
      ctx.fillStyle = "#E63541";
      ctx.moveTo(x + Math.sin((st + 90) / 360 * Math.PI * 2) * 5, y + Math.cos((st + 90) / 360 * Math.PI * 2) * 5);
      ctx.lineTo(x + Math.sin(st / 360 * Math.PI * 2) * 100, y + Math.cos(st / 360 * Math.PI * 2)*100);
      ctx.lineTo(x + Math.sin((st - 90) / 360 * Math.PI * 2) * 5, y + Math.cos((st - 90) / 360 * Math.PI * 2) * 5);

      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.beginPath()
      ctx.strokeStyle = "#A6A69F";
      ctx.fillStyle = "#A6A69F";
      ctx.moveTo(x + Math.sin((st + 90) / 360 * Math.PI * 2) * 5, y + Math.cos((st + 90) / 360 * Math.PI * 2) * 5);
      ctx.lineTo(x - Math.sin(st / 360 * Math.PI * 2) * 50, y - Math.cos(st / 360 * Math.PI * 2) * 50);

      ctx.lineTo(x + Math.sin((st - 90) / 360 * Math.PI * 2) * 5, y + Math.cos((st - 90) / 360 * Math.PI * 2) * 5);
      ctx.fill();
      // ctx.lineTo(x - Math.sin(st / 360 * Math.PI * 2) * 50, y - Math.cos(st / 360 * Math.PI * 2) * 50);
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.strokeStyle = "white";
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.stroke();
    }

    // function ball(){

    // }
    line(p.x, p.y, p.r, p.st)
    // ball(p.x, p.y)

  },
})
