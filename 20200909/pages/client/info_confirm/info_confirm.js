//在page页面引入app，同时声明变量，获得所需要的全局变量
const app = getApp()
// 导入utils.js
var util = require('../../../utils/util.js');
Page({
    /**
     * 页面的初始数据
     */
    data: {
      pwname:'',
      pw_list:[],
      total_info:{
        /*item1：长生对应牌位类别，往生对应超荐人 
          item2：长生对应牌位内容，往生对应供奉人*/
        type:'',
        duration:'',
        linkman:'',
        phone:'',
        item1:'',
        item2:'',
        time:'',
        deadline:'' 
      },
    },

    onLoad: function (options) {
      var that = this
      //获取用户openid
      that.getOpenid();

      //用info接收从信息填写界面过来的信息
      let info = JSON.parse(options.temp_totalinfo)
      that.setData({
        pwname:info.type
      })
      console.log(this.data.pwname)

      //由信息填写界面过来的信息，填充total_info
      that.data.total_info.duration=info.duration
      that.data.total_info.linkman=info.linkman
      that.data.total_info.phone=info.phone

      if(info.type=='长生禄位'){
        that.data.total_info.type='长生禄位'
        that.data.total_info.item1=info.pw_type
        that.data.total_info.item2=info.text
      }
      else{
        that.data.total_info.type='往生莲位'
        that.data.total_info.item1=info.cjman
        that.data.total_info.item2=info.gfman
      }

      // 传入new Date()参数，返回值日期和时间
      var time = util.formatTime(new Date());
      var vari_year;//加在提交时间上
      if(that.data.total_info.duration=="安居牌位"){
        vari_year=1;
      }
      else if(that.data.total_info.duration=="三年"){
        vari_year=3;
      }
      else if(that.data.total_info.duration=="五年"){
        vari_year=5;
      }
      else{
        vari_year=10;
      }
      //赋值
      that.data.total_info.time=time
      //计算截止日期
      var present_year//当前年份
      var date=new Date()
      present_year=date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      var hour = date.getHours()
      var minute = date.getMinutes()
      minute=minute<10?'0'+minute:minute//如果分钟是个位数，如2，写为'02'
      var second = date.getSeconds()
      second=second<10?'0'+second:second//如果秒是个位数，如2，写为'02'
      that.data.total_info.deadline=(present_year+vari_year)+'/'+month+'/'+day+' '+hour+':'+minute+":"+second
      //console.log(that.data.total_info.time)
      //console.log("deadline为："+that.data.total_info.deadline)

      //添加信息
      app.globalData.pw_list.push(that.data.total_info)
      console.log(app.globalData.pw_list)
      that.setData({
        pw_list:app.globalData.pw_list
      })
    },  

    //获取用户openid作为用户标识
    getOpenid(){
      let that = this;
      wx.cloud.callFunction({
        name:'getOpenid',
        complete:res=>{
          console.log('云函数获取到的openid:',res.result.openId)
        }
      })
    },

    //牌位预览
    butpwyl:function(e){
      var that = this
      var i=e.currentTarget.dataset.id//数组序号
      console.log("index="+i)
      wx.navigateTo({
        url: '/pages/client/pw_preview/pw_preview?index=' + i
      })
    },

    //继续添加牌位
    add(){  
      wx.navigateTo({
        url: '/pages/client/pwregister/pwregister',
      })
    },

    //删除牌位
    delete:function(e){
      var i=e.currentTarget.dataset.id
      console.log("删除id为： "+e.currentTarget.dataset.id)
      app.globalData.pw_list.splice(i,1)
      this.setData({
        pw_list:app.globalData.pw_list
      })
    },

    //点击去支付，信息上传至数据库中（暂定）
    pay:function(e){
      var outTradeNo = ""; //订单号
      for (var i = 0; i < 6; i++){ //6位随机数，用以生成订单号后面。
        outTradeNo += Math.floor(Math.random() * 10);
      }
      let that = this;
      wx.cloud.callFunction({
        name: "pay",
        data: {
          orderid: outTradeNo,
          money: 1
        },
        success(res) {
          console.log("提交成功", res.result)
          that.payexcute(res.result)
        },
        fail(res) {
          console.log("提交失败", res)
        }
      })
    },
    
    //实现小程序支付
    payexcute(payData) {
      //官方标准的支付方法
      wx.requestPayment({
        timeStamp: payData.timeStamp,//时间戳
        nonceStr: payData.nonceStr,//随机字符串，长度为32个字符以下
        package: payData.package, //统一下单接口返回的 prepay_id 格式如：prepay_id=***
        signType: payData.signType,//签名类型，默认为MD5，支持HMAC-SHA256和MD5。注意此处需与统一下单的签名类型一致
        paySign: payData.paySign, //签名
        success(res) {
          console.log("支付成功", res)
        },
        fail(res) {
          console.log("支付失败", res)
        },
        complete(res) {
          console.log("支付完成", res)
        }
      })
    }
      //信息上传至数据库
      /*console.log(app.globalData.pw_list)
      const db = wx.cloud.database()
      var i=this.data.pw_list.length //已经填写信息的牌位数
      for(var j=0;j<i;j++){
        db.collection('PwInfo').add({
          data:{
            type:this.data.pw_list[j].type,
            duration:this.data.pw_list[j].duration,
            linkman:this.data.pw_list[j].linkman,
            phone:this.data.pw_list[j].phone,
            item1:this.data.pw_list[j].item1,
            item2:this.data.pw_list[j].item2,
            time:this.data.pw_list[j].time,
            deadline:this.data.pw_list[j].deadline,
          },
          success: res => {
            // 在返回结果中会包含新创建的记录的 _id
            wx.showToast({
              title: '新增记录成功',
            })
            console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '新增记录失败'
            })
            console.error('[数据库] [新增记录] 失败：', err)
          }
        })
      }*/ 
  })