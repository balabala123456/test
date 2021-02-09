const app=getApp()
const DB = wx.cloud.database().collection("admin")
Page({
  data:{
    phone:'',
    useradminchoose:true,  //显示管理员、普通用户登录入口，true表示显示
    canIUse:false,  //微信授权登录按钮，false表示不显示
    userVisible:false,   //普通用户个人中心界面显示，false表示不显示
    adminVisible:false,  //管理员个人中心界面显示，false表示不显示
    flag:null,  //0表示选择的普通用户入口，1表示选择的管理员入口
    count:null
  },

  //管理员入口点击事件，应该有个和数据库数据验证的过程
  butadminlogin(){
    this.setData({
      flag:1,
      useradminchoose:false,  //显示管理员、普通用户登录入口，true表示显示
      canIUse:true,  //微信授权登录按钮，false表示不显示
      userVisible:false,   //普通用户个人中心界面显示，false表示不显示
      adminVisible:false,  //管理员个人中心界面显示，false表示不显示
    })
  },

  //普通用户入口点击事件
  butuserlogin(){
    this.setData({
      flag:0,
      useradminchoose:false,  //显示管理员、普通用户登录入口，true表示显示
      canIUse:true,  //微信授权登录按钮，false表示不显示
      dialogVisible: false,  //获取手机号授权的弹窗显示，false表示不显示
      userVisible:false,   //普通用户个人中心界面显示，false表示不显示
      adminVisible:false,  //管理员个人中心界面显示，false表示不显示
    })
  },

  //微信授权登录
  async getPhoneNumber(e){
    // let that = this
    //如果选择的时普通用户入口
    if(e.detail.errMsg=="getPhoneNumber:ok" && this.data.flag === 0){
      this.setData({
        useradminchoose:false,  
        canIUse:false,  
        userVisible:true,  
        adminVisible:false, 
      })
      wx.cloud.callFunction({
        name: 'getPhone',
        data: {
         cloudID:e.detail.cloudID
        }
      }).then(res => {
        var app = getApp()
        app.globalData.userPhoneNumber = res.result.list[0].data.phoneNumber 
        this.setData({
          phone:res.result.list[0].data.phoneNumber  
        })
      }).catch(err =>{
        console.log('获取失败1',err)
      })  
      app.globalData.tabIndex = 0
    }else if((e.detail.errMsg=="getPhoneNumber:ok" && this.data.flag === 1)){
      //如果选择的是管理员入口
      await  wx.cloud.callFunction({
        name: 'getPhone',
        data: {
         cloudID:e.detail.cloudID
        }
      }).then(res => {

        this.setData({
          phone:res.result.list[0].data.phoneNumber  
        })
      }).catch(err =>{
        console.log('获取失败',err)
      })
      //在数据库中查找是管理员列表中是否有刚刚授权的手机号
      await DB.where({
          phone: this.data.phone
        }).get({
          success: res => {
            this.setData({
              count:res.data.length
            })
            if(this.data.count > 0){
              var app = getApp()
              app.globalData.userPhoneNumber = this.data.phone
              console.log(this.data.phone)
              this.setData({
                useradminchoose:false,  
                canIUse:false,  
                userVisible:false,  
                adminVisible:true, 
              })
              app.globalData.tabIndex = 1
            }else{
              wx.showToast({
                title: '权限不足',
                duration:2000
              })
            }
          }
        })
    }else{
    this.setData({
      useradminchoose:true,  //显示管理员、普通用户登录入口，true表示显示
      canIUse:false,  //微信授权登录按钮，false表示不显示
      userVisible:false,   //普通用户个人中心界面显示，false表示不显示
      adminVisible:false,  //管理员个人中心界面显示，false表示不显示
      })
    }
  },

  // 普通用户的个人中心
  myorder(){
    wx.navigateTo({
      url: '/pages/client/myorder/myorder',
    })
  },
  butcontact(){
    wx.makePhoneCall({
      phoneNumber: '123456789',
    })
  },
  logout(){
    this.setData({
      useradminchoose:true,  
      canIUse:false,  
      userVisible:false,   
      adminVisible:false,  
    })
    app.globalData.tabIndex = 2
  },

  //管理员的个人中心
  pwcountset(){
    wx.navigateTo({
      url: '/pages/management/selectpwglsx/selectpwglsx',
    })
  },
  defpw(){
    wx.navigateTo({
      url: '/pages/management/selectpwglsx/selectpwglsx',
    })
  }
})



