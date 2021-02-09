// pages/wslwinfofill/wslwinfofill.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        username:'',
        lxfs:'',
        cjr:'',
        gfr:'',
        temp_duration:'',//临时存储前页年限
         //往生莲位总信息
        wslw_totalinfo:{
          type:'往生莲位',
          duration:'',
          linkman:'',
          phone:'',
          cjman:'',
          gfman:''
        }

    },

    //生命周期函数--监听页面加载
    onLoad: function (options) {
      this.setData({
        // 获取上个页面传过来的列表发布信息
        temp_duration:options.duration
      });
      this.data.wslw_totalinfo.duration=this.data.temp_duration
    },
    
    //输入用户名
    inputlxr(e){
        this.setData({
          username:e.detail.value
        })
        this.data.wslw_totalinfo.linkman=this.data.username
     },
     //输入联系方式
     inputlxfs(e){
       this.setData({
         lxfs:e.detail.value
       })
       this.data.wslw_totalinfo.phone=this.data.lxfs
     },
     //输入超荐人姓名
    inputcjr(e){
        this.setData({
          cjr:e.detail.value
        })
        this.data.wslw_totalinfo.cjman=this.data.cjr
     },
     //输入供奉人姓名
    inputgfr(e){
        this.setData({
          gfr:e.detail.value
        })
        this.data.wslw_totalinfo.gfman=this.data.gfr
     },
     //保存信息按钮，跳转页面
     butinfo(){
        var that = this;
        if (that.data.username.length == 0 || that.data.lxfs.length == 0 || that.data.cjr.length == 0 || that.data.gfr.length == 0) {
          wx.showToast({
            title: '信息不能为空',
            duration: 2000
          })
        }else if(that.data.lxfs.length != 11){
          wx.showToast({
            title: '请输入有效联系方式',
            duration:2000
          })
        }else{
          console.log(this.data.wslw_totalinfo)
          var that = this
          //传递json对象
          let total_info=JSON.stringify(this.data.wslw_totalinfo)
          wx.navigateTo({
          url: '/pages/client/info_confirm/info_confirm?temp_totalinfo=' + total_info
        })
      }
    }
})