//index.js
//获取应用实例
const app = getApp()

Page({
  onLoad: function () {
  },
  enterlxs(){
    wx.navigateTo({
      url:  "/pages/public/lxsindex/lxsindex",
    })
  },
})
