// pages/lxsindex/lxsindex.js
// 导入utils.js
var util = require('../../../utils/util.js');
Page({

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    fwgl(){
        wx.navigateTo({
          url:  "/pages/public/fwglindex/fwglindex",
        })
    },
})