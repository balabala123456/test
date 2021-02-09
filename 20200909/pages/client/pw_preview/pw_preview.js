// pages/pw_preview/pw_preview.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'',
    content:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    var index=options.index
    console.log(app.globalData.pw_list[index])
    that.setData({
      type:app.globalData.pw_list[index].type,
      content:app.globalData.pw_list[index].item2
    })
  },
})