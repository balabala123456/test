// pages/lxsindex/fwglindex/fwglindex.js
const app = getApp()
Page({
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  //佛事预览入口
  fsenter(){
    if(app.globalData.tabIndex == 0){ 
      //如果是普通用户跳转到普通用户的佛事预览界面
      wx.navigateTo({
        url: '/pages/client/fs_preview/fs_preview'
      })  
    }
    else if(app.globalData.tabIndex == 1){
      //如果是管理员跳转到管理员的佛事预览界面
      wx.navigateTo({
        url: '/pages/management/fs_preview/fs_preview'
      }) 
    }else{
      wx.showToast({
        title: '权限不足',
        duration: 1000
      })
    }
  },
  //牌位管理入口
  pwenter(){
    if(app.globalData.tabIndex == 0){
      //如果是普通用户跳转到普通用户的牌位管理界面
      wx.navigateTo({
        url:  "/pages/client/pwregister/pwregister",
      })
    }
    else if(app.globalData.tabIndex == 1){
      //如果是管理员跳转到管理员的牌位管理界面
      wx.navigateTo({
        url:  "/pages/management/selectpwglsx/selectpwglsx",
      })
    }else{
      wx.showToast({
        title: '权限不足',
        duration: 1000
      })
    }
}
})