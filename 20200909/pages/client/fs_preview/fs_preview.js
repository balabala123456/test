// pages/client/fs_preview/fs_preview.js
Page({
  data:{
      dataList:''
  }, 
  onLoad: function () {

    var app = getApp()
    let phonenumber = app.globalData.userPhoneNumber
    wx.cloud.callFunction({
      name : 'fhlist',
      data:{
        phoneNumber: phonenumber,
        index:0
      }
    }).then(res => {
     this.setData({
      dataList : res.result.result
     })
    }).catch(err =>{
      console.log('预定失败',err)
    })

      // var that=this
      // wx.cloud.database().collection("fh_list").get({
      //     success(e){
      //       console.log("222",e.data)
      //       that.setData({
      //         dataList: e.data
      //       })
      //     },
      //     fail(e){
      //         console.log("请求失败",e)
      //     }
      // })
  },

  operation:function(e) {
    var app = getApp()
    let phonenumber = app.globalData.userPhoneNumber
    wx.cloud.callFunction({
      name : 'orderMyfh',
      data:{
        phoneNumber: phonenumber,
        id:e.currentTarget.dataset.fhid
      }
    }).then(res => {
      console.log(res)
      wx.showToast({
        title: '预定成功',
      })
    }).catch(err =>{
      console.log('预定失败',err)
    })

  }
})
