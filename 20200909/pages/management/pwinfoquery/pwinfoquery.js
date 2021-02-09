// pages/management/pwinfoquery/pwinfoquery.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
      flag:1,
      background_color1:'rosybrown',
      background_color2:'#ffffff',
      color1:'#ffffff',
      color2:'rosybrown',
      date1:{
        year1:'',
        month1:'',
        day1:''
      },
      date2:{
        year2:'',
        month2:'',
        day2:''
      },
      pw_info1:[],
      pw_info2:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
  },

    //按时间查询牌位信息的选择按钮
    selectime(e){
      this.setData({
        flag:e.target.offsetLeft,
        background_color1:'rosybrown',
        background_color2:'#ffffff',
        color1:'#ffffff',
        color2:'rosybrown'
      })
    },
    //按人名或者联系方式查询牌位信息的选择按钮
    selectname(e){
      this.setData({
        flag:e.target.offsetLeft,
        background_color1:'#ffffff',
        background_color2:'rosybrown',
        color1:'rosybrown',
        color2:'#ffffff'
      })
    },
    //输入待查询年份
    year1(e){
      let that = this
      that.data.date1.year1 = e.detail.value
    },
    //输入待查询月份
    month1(e){
      let that = this
      that.data.date1.month1 = e.detail.value
    },
    // 输入待查询具体日期
    day1(e){
      let that = this
      that.data.date1.day1 = e.detail.value
    },
    //输入待查询年份
    year2(e){
      let that = this
      that.data.date2.year2 = e.detail.value
    },
    //输入待查询月份
    month2(e){
      let that = this
      that.data.date2.month2 = e.detail.value
    },
    // 输入待查询具体日期
    day2(e){
      let that = this
      that.data.date2.day2 = e.detail.value
    },

    //按牌位到期日期的查询按钮
    query1(){
      let that = this;
      //每次调用清空查询结果数组
      var length1=app.globalData.showlist1.length
      var length2=app.globalData.showlist2.length
      app.globalData.showlist1.splice(0,length1);
      app.globalData.showlist2.splice(0,length2);

      var inputTime=that.data.date1.year1+'/'+that.data.date1.month1+'/'+that.data.date1.day1
      const db = wx.cloud.database(); 
      db.collection("PwInfo").where({	 	//括号内为欲模糊查询数据所在collection的名
        deadline:{								//此处表示欲模糊查询数据所在列的名
          $regex:inputTime + '.*',		//"+"前为查询的变量值'.*'等同于SQL中的'%'
          $options: 'i'							//$options:'1' 代表这个like的条件不区分大小写,详见开发文档
        }
      }).get({
        success: res => {
          console.log(res.data)
          //遍历所有查询结果，根据牌位类别进行分类
          var j = 0,k = 0;
          for(var i = 0;i<res.data.length;i++){
            //给牌位分类展示
            if(res.data[i].type == '长生禄位'){
              app.globalData.showlist1[j] = res.data[i];
              //将时分秒去掉，使之成为日期的格式
              app.globalData.showlist1[j].deadline = res.data[i].deadline.slice(0,10);
              app.globalData.showlist1[j].time = res.data[i].time.slice(0,10);
              j++;
            }
            else{
              app.globalData.showlist2[k] = res.data[i];
              //将时分秒去掉，使之成为日期的格式
              app.globalData.showlist2[k].deadline = res.data[i].deadline.slice(0,10);
              app.globalData.showlist2[k].time = res.data[i].time.slice(0,10);
              k++;
            }
          }
          //判断全局变量修改是否成功
          if(app.globalData.showlist1.length>0 || app.globalData.showlist2.length>0){
            console.log("查询结束后：全局信息非空")
          }
          else{
            console.log("查询结束后：全局信息为空")
          }
          //页面跳转
          wx.navigateTo({
            url: '/pages/management/queryresult/queryresult',
          })
        },
        fail: err => {
          console.log("查询失败!")
          console.log(err)
        }
      })
    },

    //按牌位初始日期的查询按钮
    query2(){
      let that = this;
      //每次调用清空查询结果数组
      var length1=app.globalData.showlist1.length
      var length2=app.globalData.showlist2.length
      app.globalData.showlist1.splice(0,length1);
      app.globalData.showlist2.splice(0,length2);

      var inputTime2=that.data.date2.year2+'/'+that.data.date2.month2+'/'+that.data.date2.day2
      const db = wx.cloud.database(); 
      db.collection("PwInfo").where({	 	//括号内为欲模糊查询数据所在collection的名
        time:{								//此处表示欲模糊查询数据所在列的名
          $regex:inputTime2 + '.*',		//"+"前为查询的变量值'.*'等同于SQL中的'%'
          $options: 'i'							//$options:'1' 代表这个like的条件不区分大小写,详见开发文档
        }
      }).get({
        success: res => {
          console.log(res.data)
          //遍历所有查询结果，根据牌位类别进行分类
          var j = 0,k = 0;
          for(var i = 0;i<res.data.length;i++){
            //给牌位分类展示
            if(res.data[i].type == '长生禄位'){
              app.globalData.showlist1[j] = res.data[i];
              //将时分秒去掉，使之成为日期的格式
              app.globalData.showlist1[j].deadline = res.data[i].deadline.slice(0,10);
              app.globalData.showlist1[j].time = res.data[i].time.slice(0,10);
              j++;
            }
            else{
              app.globalData.showlist2[k] = res.data[i];
              //将时分秒去掉，使之成为日期的格式
              app.globalData.showlist2[k].deadline = res.data[i].deadline.slice(0,10);
              app.globalData.showlist2[k].time = res.data[i].time.slice(0,10);
              k++;
            }
          }
          //判断全局变量修改是否成功
          if(app.globalData.showlist1.length>0 || app.globalData.showlist2.length>0){
            console.log("查询结束后：全局信息非空")
          }
          else{
            console.log("查询结束后：全局信息为空")
          }
          //页面跳转
          wx.navigateTo({
            url: '/pages/management/queryresult/queryresult',
          })
        },
        fail: err => {
          console.log("查询失败!")
          console.log(err)
        }
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