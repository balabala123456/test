// pages/public/uploadata/uploadata.js
Page({
  uploaddata(){
      wx.cloud.callFunction({
        name:'Excel',
        data:{
          fileID:'cloud://test-co8de.7465-test-co8de-1302871117/excel/2022.xlsx'
        },
        success(e){
          console.log("数据上传成功",e)
        },
        fail(err){
          console.log("数据上传失败",err) 
        }
      })
  }
})