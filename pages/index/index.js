//获取应用实例
import {
  createPoster
} from "../../utils/util.js";
Page({
  data: {
    img: '', // 生成后的海报路径，保存到本地时可用，也可用于image标签展示
    showCanvas: false, // 是否显示canvas
  },

  // 保存海报
  savePoster() {
    wx.getSetting({
      success: (res) => {
        // 判断是否有访问相册的权限，没有的情况下弹出框提示用户允许授权。
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: (aRes) => {
              wx.saveImageToPhotosAlbum({
                filePath: this.data.img,
                success: () => {
                  wx.showToast({
                    title: '保存成功',
                    success:()=>{
                      this.setData({
                        showCanvas:false
                      })
                    }
                  })
                },
                fail: () => {
                  wx.showToast({
                    title: '保存失败',
                    icon: 'none'
                  })
                }
              })
            }
          })
        } else {
          wx.saveImageToPhotosAlbum({
            filePath: this.data.img,
            success: () => {
              wx.showToast({
                title: '保存成功',
                success:()=>{
                  this.setData({
                    showCanvas:false
                  })
                }
              })
            },
            fail: () => {
              wx.showToast({
                title: '保存失败',
                icon: 'none'
              })
            }
          })
        }
      }
    })
  },

  // 点击创建海报
  clickCreate() {
    this.setData({
      showCanvas: true
    }, () => {
      // 创建海报
      createPoster((res) => {
        this.setData({
          img: res.tempFilePath
        })
      })
    })

  },

  onLoad: function () {

  },

})