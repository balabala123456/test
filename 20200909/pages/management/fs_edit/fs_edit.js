// pages/management/fs_edit/fs_edit.js
var util = require ( '../../../utils/util.js' );
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bdate: '2021-02-14',
    edate : '2021-2-11',
    default_name : '',
    id : ''
  },


  bindBeginDateChange: function (e) {
    this.setData({
      bdate: e.detail.value
    })
  },

  bindEndDateChange: function (e) {
    this.setData({
      edate: e.detail.value
    })
  },

  changeName : function(e) {

    var newValue = e.detail.value;
    console.log(newValue)
    this.setData({
      default_name: newValue
    })
  },

  saveInfo:function(e) {

    var app = getApp()
    var phonenumber = app.globalData.userPhoneNumber

    let begin = new Date(this.data.bdate)
    let end = new Date(this.data.edate)
    console.log(this.data.default_name)

//let {userInfo,phoneNumber,id,name,gtime,ltime} = event
    if(begin < end) {
      let nbdate = util.getLunarDate(this.data.bdate)
      let nbdateStr = util.getLunarDateString(nbdate)
      let nedate = util.getLunarDate(this.data.edate)
      let nedateStr = util.getLunarDateString(nedate)
      wx.cloud.callFunction({
        name : 'changedfh',
        data:{
          phoneNumber : phonenumber,
          id : this.data.id,
          name : this.data.default_name,
          gtime : this.data.bdate + '-' + this.data.edate,
          ltime : nbdateStr.month + '月' + nbdateStr.day + '至' +  nedateStr.month + '月' + nedateStr.day
        }
      }).then(res => {
        console.log(res)
        wx.navigateBack({ changed: true });
        wx.showToast({
          title: '修改成功',
        })
      })
    }else if(begin > end) {
      wx.showModal({
        title:'注意',
        content:'开始时间不得晚于结束时间',
        confirmText:'知道了',
        showCancel : false,
        success : function(res) {
        }
      })
    }else {
      let nbdate = util.getLunarDate(this.data.bdate)
      let nbdateStr = util.getLunarDateString(nbdate)
      wx.cloud.callFunction({
        name : 'changedfh',
        data:{
          phoneNumber : phonenumber,
          id : this.data.id,
          name : this.data.default_name,
          gtime : this.data.bdate,
          ltime : nbdateStr.month + '月' + nbdateStr.day 
        }
      }).then(res => {
        console.log(res)
        wx.navigateBack({ changed: true });
        wx.showToast({
          title: '修改成功',
        })
      })
    }
  },

  deleteInfo :function(e) {
    wx.showModal({
      title: '注意',
      content: '您确定要删除该法会吗？',
      confirmText:"删除",//默认是“确定”
      confirmColor: 'red',//确定文字的颜色
 
      success: (res)=>  {
        if (res.confirm) {//这里是点击了确定以后
          var app = getApp()
          var phonenumber = app.globalData.userPhoneNumber
          wx.cloud.callFunction({
            name: 'deletefh',
            data: {
              phoneNumber: phonenumber,
              id : this.data.id
            }
        
          }).then(res1 => {
            wx.navigateBack({ changed: true });
            wx.showToast({
              title: '删除成功',
            })
          }).catch(err1 => {
            console.log('222',err1)
          });
       
 
        } else {//这里是点击了取消以后
 
          
 
        }
 
      }
 
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let dateStr = options.gtime
    if(dateStr.length == 10) {
      var begin_time = dateStr
      var end_time = dateStr
    }else {
      begin_time = dateStr.substring(0,10)
      end_time = dateStr.substring(11,21)
    }
    console.log(dateStr, begin_time,end_time)
    this.setData({
      id : options.id,
      default_name : options.name,
      bdate : begin_time,
      edate : end_time
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

  },

  
  
})

