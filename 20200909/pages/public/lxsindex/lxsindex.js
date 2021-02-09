// pages/lxsindex/lxsindex.js
// 导入utils.js
var util = require('../../../utils/util.js');
Page({

    data:{
      name:'刘昊然'
    },
    onLoad: function () {
      // wx.getUserInfo({
      //   success: (e) => {
      //     console.log(e.rawData[13])
      //     this.setData({
      //       name:e.rawData[0]
      //     })
      //   }
      // })
    },
    fwgl(){
        wx.navigateTo({
          url:  "/pages/public/fwglindex/fwglindex",
        })
    },
})