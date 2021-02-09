// pages/lxsindex/fwglindex/pwenter/pwinfo/pwinfo.js
var name = ''
Page({
    data:{
      username: '',
      lxfs: '',
      pwname:'',
      timeflag:'',
      temp_duration:'',
      selectList: [{
          "id": "10",
          "text": "基础（个人信息 如：阖家）"
        }, {
          "id": "21",
          "text": "祈福（如：名字 + 考试顺利）"
        }],
      
      //长生禄位总信息
      cslw_totalinfo:{
        type:'长生禄位',
        duration:'',
        linkman:'',
        phone:'',
        pw_type:'基础',
        text:''
      }
    },

/**
 * 生命周期函数--监听页面加载
 */
    onLoad: function (options) {
      this.setData({
        // 获取上个页面传过来的列表发布信息
        temp_duration:options.duration
      });
      this.data.cslw_totalinfo.duration=this.data.temp_duration
    },

    //输入用户名
    inputlxr(e){
       this.setData({
         username:e.detail.value
       })
       this.data.cslw_totalinfo.linkman=this.data.username
    },

    //输入联系方式
    inputlxfs(e){
      this.setData({
        lxfs:e.detail.value
      })
      this.data.cslw_totalinfo.phone=this.data.lxfs
    },

    //下拉框选择牌位类别
    m_select_touch(e) {
        let that = this;
        let selectIndex = e.detail.selIndex;
        let value1 = that.data.selectList[selectIndex];
          console.log(e.detail.selIndex)
          if(e.detail.selIndex==1){
            this.data.cslw_totalinfo.pw_type='祈福'
          }
      },

      //输入牌位名
      inputpwname(e){
          this.setData({
            pwname:e.detail.value
          })
          this.data.cslw_totalinfo.text=this.data.pwname
      },

      //保存信息按钮，跳转页面
      butinfo(){
        var that = this;
        if (that.data.username.length == 0 || that.data.lxfs.length == 0 || that.data.pwname.length == 0){
          wx.showToast({
            title: '信息不能为空',
            duration: 2000
          })
        }else if(that.data.lxfs.length != 11){
          wx.showToast({
            title: '请输入有效联系方式',
            duration:2000
          })
        }
        else if(this.data.pwname.length>7){
          wx.showToast({
            title: '牌位名过长',
            duration:2000
          })
        }else{
          this.data.cslw_totalinfo.duration=this.data.temp_duration
          console.log(this.data.cslw_totalinfo)
          var that = this
          //传递json对象
          let total_info=JSON.stringify(this.data.cslw_totalinfo)
          wx.navigateTo({
          url: '/pages/client/info_confirm/info_confirm?temp_totalinfo=' + total_info
          })
        }
      }
})