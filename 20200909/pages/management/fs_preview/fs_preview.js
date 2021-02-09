// pages/management/fs_preview/fs_preview
Page({
  data:{
      dataList:''
  }, 
  onLoad: function () {
      // var that=this
      // wx.cloud.database().collection("fh_list").get({
      //     success(e){
      //       that.setData({
      //         dataList: e.data
      //       })
      //     },
      //     fail(e){
      //         console.log("请求失败",e)
      //     }
      // })
  },

    /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this
    wx.cloud.database().collection("fh_list").get({
        success(e){
          that.setData({
            dataList: e.data
          })
        },
        fail(e){
            console.log("请求失败",e)
        }
    })
  },
  operation:function(e) {
    let data = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/management/fs_edit/fs_edit?id=' + data.fhid + '&gtime=' + data.gtime + '&name=' + data.name,
    })
  }
})