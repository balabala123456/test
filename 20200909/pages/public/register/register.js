// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userid:'',
      code:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //输入手机号
  phone(e){
      this.setData({
          userid:e.detail.value
      })
  },
  //获取验证码
  getverifycode(){
      
  },
  //输入验证码
  verify(){

  },
  //输入密码
  password(){

  },
  //请确认密码
  password1(){

  },

  register(){
      wx.showToast({
          title: '注册成功',
          duration:1000
        })
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