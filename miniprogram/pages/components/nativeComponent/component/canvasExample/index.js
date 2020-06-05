// pages/components/nativeComponent/component/canvasExample/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    is_selectedline: false,
    is_selectedvector_line: false,
    is_selectedrectangle: false,
    is_selectedroundedrectangle: false,
    is_selectedpolygon: false,
    is_selectedcircle: false,
    start_x: 0,
    start_y: 0,
    vector_x_y: [],
    end_x: 0,
    end_y: 0,
    cp1_x: 0,
    cp1_y: 0,
    cp2_x: 0,
    cp2_y: 0,
    activeId: ''
  },


  /**
   * 组件的方法列表
   */
  methods: {
    showMore(e){
      this.setData({
        activeId: e.detail.id
      })
    },
    touchStart(e) {
      // console.log("start: " + JSON.stringify(e));
      let _this = this;
      if(_this.data.is_selectedline === true) {
        _this.setData({
          start_x: e.touches[0].x,
          start_y: e.touches[0].y
        })
        // console.log(_this.data.start_x);
        // console.log(_this.data.start_y);
      }else if(_this.data.is_selectedvector_line === true) {
        _this.setData({
          vector_x_y: [[e.touches[0].x, e.touches[0].y]]
        });
      }else if(_this.data.is_selectedrectangle === true) {
        _this.setData({
          start_x: e.touches[0].x,
          start_y: e.touches[0].y
        })
      } else if (_this.data.is_selectedroundedrectangle === true) {
        _this.setData({
          start_x: e.touches[0].x,
          start_y: e.touches[0].y
        })
      } else if (_this.data.is_selectedpolygon === true) {
        _this.setData({
          start_x: e.touches[0].x,
          start_y: e.touches[0].y
        })
      } else if(_this.data.is_selectedcircle === true) {
        _this.setData({
          start_x: e.touches[0].x,
          start_y: e.touches[0].y
        })
      }
    },
  
    touchMove(e) {
      let _this = this;
      var ctx = wx.createCanvasContext("canvas1", _this);
      // console.log("move: " + JSON.stringify(e));
      if(_this.data.is_selectedline === true){
        // var ctx = wx.createCanvasContext("canvas1");
        ctx.restore();
        let x = _this.data.start_x;
        let y = _this.data.start_y;
        let end_x = e.touches[0].x;
        let end_y = e.touches[0].y;
        ctx.moveTo(x, y);
        ctx.lineTo(end_x, end_y);
        ctx.setLineWidth(2);
        ctx.setStrokeStyle('red');
        ctx.stroke();
        ctx.draw();
      }else if(_this.data.is_selectedvector_line === true) {
        let vector = _this.data.vector_x_y;
        vector.push([e.touches[0].x, e.touches[0].y]);
        ctx.moveTo(vector[0][0], vector[0][1]);
        for(var i=1;i<vector.length;i++){
          ctx.lineTo(vector[i][0], vector[i][1]);
        }
        ctx.stroke();
        ctx.draw(true);
        _this.setData({
          vector_x_y: vector
        })
      } else if (_this.data.is_selectedrectangle === true) {
        let x = _this.data.start_x;
        let y = _this.data.start_y;
        let end_x = e.touches[0].x;
        let end_y = e.touches[0].y;
        let width = end_x - x;
        let height = end_y - y;
        ctx.setStrokeStyle('red');
        ctx.setLineWidth(2);
        ctx.strokeRect(x, y, width, height);
        ctx.draw();
      } else if (_this.data.is_selectedroundedrectangle === true) {
        let x = _this.data.start_x;
        let y = _this.data.start_y;
        let end_x = e.touches[0].x;
        let end_y = e.touches[0].y;
        let width = Math.abs(end_x - x);
        let height = Math.abs(end_y - y);
        let r = width / 10;
        if (end_x > x) {
          if (end_y > y) {
            roundRect(ctx, x, y, width, height, r);
          } else if (e.touches[0].y < y) {
            roundRect(ctx, x, y - height, width, height, r);
          } else {
            ctx.moveTo(x, y);
            ctx.lineTo(e.touches[0].x, y);
            ctx.stroke();
            ctx.draw();
          }
        } else if (end_x < x) {
          if (end_y > y) {
            roundRect(ctx, x - width, y, width, height, r);
          } else if (e.touches[0].y < y) {
            roundRect(ctx, x - width, y - height, width, height, r);
          } else {
            ctx.moveTo(x, y);
            ctx.lineTo(e.touches[0].x, y);
            ctx.stroke();
            ctx.draw();
          }
        } else {
          ctx.moveTo(x, y);
          ctx.lineTo(e.touches[0].x, e.touches[0].y);
          ctx.stroke();
          ctx.draw();
        }
        // roundRect(ctx, x, y, width, height, r);
        function roundRect(ctx, x, y, w, h, r) {
          // 开始绘制
          ctx.beginPath()
          // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
          // 这里是使用 fill 还是 stroke都可以，二选一即可
          // ctx.setFillStyle('transparent')
          ctx.setStrokeStyle('red');
          ctx.setLineWidth(2);
          // 左上角
          ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)
  
          // border-top
          ctx.moveTo(x + r, y)
          ctx.lineTo(x + w - r, y)
          // ctx.lineTo(x + w, y + r)
          // 右上角
          ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)
  
          // border-right
          ctx.lineTo(x + w, y + h - r)
          // ctx.lineTo(x + w - r, y + h)
          // 右下角
          ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)
  
          // border-bottom
          ctx.lineTo(x + r, y + h)
          // ctx.lineTo(x, y + h - r)
          // 左下角
          ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)
  
          // border-left
          ctx.lineTo(x, y + r)
          // ctx.lineTo(x + r, y)
  
          // 这里是使用 fill 还是 stroke都可以，二选一即可，但是需要与上面对应
          // ctx.fill()
          ctx.stroke()
          ctx.closePath()
          // 剪切
          // ctx.clip()
          ctx.draw();
        }
      } else if(_this.data.is_selectedpolygon === true){
        let x = _this.data.start_x;
        let y = _this.data.start_y;
        let width = Math.abs(e.touches[0].x - x);
        let height = Math.abs(e.touches[0].y - y);
        let small_width = width/3;
        if ((Math.pow(width, 2) - Math.pow(height, 2) / 4)>0){
          small_width = Math.sqrt(Math.pow(width, 2) - Math.pow(height, 2) / 4);
        }
        if(e.touches[0].x>x){
          if(e.touches[0].y > y){
            polygon(ctx, x, y, width, height, small_width);
          }else if(e.touches[0].y < y){
            polygon(ctx, x, y-height, width, height, small_width);
          }else {
            ctx.moveTo(x, y);
            ctx.lineTo(e.touches[0].x, y);
            ctx.stroke();
            ctx.draw();
          }
        }else if(e.touches[0].x<x){
          if (e.touches[0].y > y) {
            polygon(ctx, x-width, y, width, height, small_width);
          } else if (e.touches[0].y < y) {
            polygon(ctx, x-width, y - height, width, height, small_width);
          } else {
            ctx.moveTo(x, y);
            ctx.lineTo(e.touches[0].x, y);
            ctx.stroke();
            ctx.draw();
          }
        }else {
          ctx.moveTo(x, y);
          ctx.lineTo(e.touches[0].x, e.touches[0].y);
          ctx.stroke();
          ctx.draw();
        }
        function polygon(ctx, x, y, width, height, small_width){
          ctx.setStrokeStyle('red');
          ctx.setLineWidth(2);
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + width, y);
          ctx.lineTo(x + width + small_width, y + (height / 2));
          ctx.lineTo(x + width, y + height);
          ctx.lineTo(x, y + height);
          ctx.lineTo(x - small_width, y + (height / 2));
          ctx.closePath();
          ctx.stroke();
          ctx.draw();
        }
      }else if(_this.data.is_selectedcircle === true) {
        let x = _this.data.start_x;
        let y = _this.data.start_y;
        let w = Math.abs(e.touches[0].x - x);
        let h = Math.abs(e.touches[0].y - y);
        let r = (Math.min(w, h)) / 2;
        if (e.touches[0].x > x) {
          if (e.touches[0].y > y) {
            circle(ctx, x+(w/2), y+(h/2), r);
          } else if (e.touches[0].y < y) {
            circle(ctx, x+(w/2), y-(h/2), r);
          } else {
            ctx.moveTo(x, y);
            ctx.lineTo(e.touches[0].x, y);
            ctx.stroke();
            ctx.draw();
          }
        } else if (e.touches[0].x < x) {
          if (e.touches[0].y > y) {
            circle(ctx, x - (w/2), y+(h/2), r);
          } else if (e.touches[0].y < y) {
            circle(ctx, x - (w/2), y - (h/2), r);
          } else {
            ctx.moveTo(x, y);
            ctx.lineTo(e.touches[0].x, y);
            ctx.stroke();
            ctx.draw();
          }
        } else {
          ctx.moveTo(x, y);
          ctx.lineTo(e.touches[0].x, e.touches[0].y);
          ctx.stroke();
          ctx.draw();
        }
        function circle(ctx, x, y, r){
          ctx.setStrokeStyle('red');
          ctx.setLineWidth(2);
          ctx.arc(x, y, r, 0, 2*Math.PI);
          ctx.stroke();
          ctx.draw();
        }
      }
    },
  
    touchEnd(e) {
      let _this = this;
      var ctx = wx.createCanvasContext("canvas1", _this);
      // console.log("end: " + JSON.stringify(e));
      if (_this.data.is_selectedline === true) {
        let x = _this.data.start_x;
        let y = _this.data.start_y;
        let end_x = e.changedTouches[0].x;
        let end_y = e.changedTouches[0].y;
        ctx.moveTo(x, y);
        ctx.lineTo(end_x, end_y);
        ctx.setLineWidth(2);
        ctx.setStrokeStyle('red');
        ctx.stroke();
        ctx.draw();
        ctx.save();
        // console.log("直线结束！");
      }else if(_this.data.is_selectedvector_line === true) {
        let vector = _this.data.vector_x_y;
        vector.push([e.changedTouches[0].x, e.changedTouches[0].y]);
        ctx.moveTo(vector[0][0], vector[0][1]);
        for (var i = 1; i < vector.length; i++) {
          ctx.lineTo(vector[i][0], vector[i][1]);
        }
        ctx.stroke();
        ctx.draw(true);
        _this.setData({
          vector_x_y: vector
        })
      }
    },
  
    touchCancel(e) {
      console.log("cancel: " + JSON.stringify(e));
    },
  
    error(e) {
      console.log("error: " + e);
    },
  
    line() {
      let _this = this;
      _this.setData({
        is_selectedline: true,
        is_selectedcircle: false,
        is_selectedpolygon: false,
        is_selectedrectangle: false,
        is_selectedroundedrectangle: false,
        is_selectedvector_line: false
      })
    },
  
    circle() {
      let _this = this;
      _this.setData({
        is_selectedline: false,
        is_selectedcircle: true,
        is_selectedpolygon: false,
        is_selectedrectangle: false,
        is_selectedroundedrectangle: false,
        is_selectedvector_line: false
      })
    },
  
    polygon() {
      let _this = this;
      _this.setData({
        is_selectedline: false,
        is_selectedcircle: false,
        is_selectedpolygon: true,
        is_selectedrectangle: false,
        is_selectedroundedrectangle: false,
        is_selectedvector_line: false
      })
    },
  
    rectangle() {
      let _this = this;
      _this.setData({
        is_selectedline: false,
        is_selectedcircle: false,
        is_selectedpolygon: false,
        is_selectedrectangle: true,
        is_selectedroundedrectangle: false,
        is_selectedvector_line: false
      })
    },
  
    roundedrectangle() {
      let _this = this;
      _this.setData({
        is_selectedline: false,
        is_selectedcircle: false,
        is_selectedpolygon: false,
        is_selectedrectangle: false,
        is_selectedroundedrectangle: true,
        is_selectedvector_line: false
      })
    },
  
    vector_line() {
      let _this = this;
      _this.setData({
        is_selectedline: false,
        is_selectedcircle: false,
        is_selectedpolygon: false,
        is_selectedrectangle: false,
        is_selectedroundedrectangle: false,
        is_selectedvector_line: true
      })
    },
  }
})
