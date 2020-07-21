/**
 * @param {回调函数} fn 
 */
export const createPoster = (fn) => {
  wx.showLoading({
    title: "生成中..."
  })
  const canvas = wx.createCanvasContext("myCanvas")
    let cW = 240,cH = 400
    // 背景图
    canvas.drawImage("/images/timg (1).jpg",0,0,cW,cH)
    // 商品名称
    canvas.setFillStyle("#FFF")
    canvas.setFontSize(12)
    canvas.fillText("青少年T恤衫",30,30)
    //商品图片
    canvas.drawImage("/images/T-shirt.jpg",30,40,cW-60,cH-200)
    // 商品价格
    canvas.setFillStyle("red")
    canvas.fillText("￥102",cW/2-20,cH-140)
    // 商品介绍
    canvas.setFillStyle("#FFF")
    canvas.fillText("这是一件很好看的T恤衫，快来买咯！",20,cH-120) 
    canvas.setTextAlign("center")   
    // 用户头像
    canvas.save()
    canvas.arc(35,325,30,0,2*Math.PI)
    canvas.clip()
    canvas.drawImage("/images/avatar.jpg",5,295,60,60)
    canvas.restore()
    // 提示文字
    canvas.setFontSize(12)
    canvas.setFillStyle("#FFF")
    canvas.setTextAlign("center")
    canvas.fillText("长按识别二维码",115,330)
    // 二维码
    canvas.save()
    canvas.arc(195,325,35,0,2*Math.PI)
    canvas.clip()
    canvas.drawImage("/images/baidu.png",160,290,70,70)
    canvas.restore()

    // 开始绘制
    canvas.draw(true,()=>{
      // 将画布中的内容导出为图片
      wx.canvasToTempFilePath({
        canvasId: "myCanvas",
        destWidth:cW*3, // 导出后的图片宽度
        destHeight:cH*3, // 导出后的图片高度
        success:(res)=>{
          wx.hideLoading()
          // 通过回调函数返回生成后的图片
          fn && fn(res)
        }
      })
    })
}