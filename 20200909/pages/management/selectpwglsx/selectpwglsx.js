// pages/management/selectpwglsx/selectpwglsx.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      pwcount:0,
      butpwcountset:false,
      pwcountset:true,
      pageFresh: false //刷新标志
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    //点击设置牌位按钮
    setpw(){
      let that = this
      that.setData({
        butpwcountset: true,
        pwcountset: false
      })
    },
    //设置牌位数量
    pwinput(e){
      let that = this
      that.setData({
        pwcount:e.detail.value
      })
    },
    //确认牌位数量按钮
    confirm(){
      let that = this
      that.setData({
        butpwcountset: false,
        pwcountset: true
      })
    },
    pwinfoquery(){
        wx.navigateTo({
          url: '/pages/management/pwinfoquery/pwinfoquery',
        })
    },
    //自定义牌位
    pwdefine(){
      wx.navigateTo({
        url: '/pages/client/pwregister/pwregister',
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
      let that = this
      that.data.pageFresh = true
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