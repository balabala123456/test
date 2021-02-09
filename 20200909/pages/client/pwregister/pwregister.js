// pages/lxsindex/fwglindex/pwenter/pwenter.js
Page({
  data: {
    pwflag:'',
    timeflag:'',
    choose:[{pwtext:"长生禄位"},{pwtext:"往生莲位"}],
    selectList: [{
      "id": "1",
      "text": "安居牌位"
    }, {
      "id": "2",
      "text": "三年"
    }, {
      "id": "3",
      "text": "五年"
    },
    {
      "id": "4",
      "text": "十年"
    }],

    //牌位登记数据结构1
    pw_info1:{
      type:'长生禄位',
      duration:'安居牌位'
    }
  },

  // 按钮切换选中牌位
  click: function (e) {
    var ids = e.currentTarget.dataset.id;  //获取自定义的id   
    this.setData({
      id: ids, //把获取的自定义id赋给当前组件的id(即获取当前组件)
      pwflag: ids //牌位选中标志
    })
    console.log(ids)
    //修改牌位登记数据结构的信息
    if(ids==0){
      this.data.pw_info1.type='长生牌位'
    }
    else{
      this.data.pw_info1.type='往生莲位'
    }
    console.log(this.data.pw_info1.type)
  },

  //下拉框选择年限
  m_select_touch(e) {
    let that = this;
    let selectIndex = e.detail.selIndex;
    let value1 = that.data.selectList[selectIndex];
    this.setData({
      timeflag:value1.text //时间选中标志
    })
    console.log(value1.text)
    this.data.pw_info1.duration=(value1.text)
  },

  //牌位和时间选择完后跳转到填写信息页面
  butinfo(){
    var that = this;
    if(that.data.pwflag.length == 0 || that.data.timeflag.length == 0){
      wx.showToast({
        title: '信息不能为空',
        duration:2000
      })
    }else{//跳转页面顺便传值
      if(this.data.pwflag){
        wx.navigateTo({
          url:"/pages/client/wslwinfofill/wslwinfofill?duration="+ this.data.pw_info1.duration,
        })
      }else{
        wx.navigateTo({
          url:"/pages/client/cslwinfofill/cslwinfofill?duration="+ this.data.pw_info1.duration,
        })
      }
    }
  }
})
