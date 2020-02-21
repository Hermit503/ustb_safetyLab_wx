// pages/function/exam/startExam/startExam.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionNum:0,
    isClick:[0,0,0,0],
    clickCache:[
      [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],
      [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],
      [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],
      [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],
      [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this;
    let time = 3600;
    wx.showLoading({
      title: '正在加载',
    })
    wx.request({
      url: app.globalData.Url+"/getQuestions",
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data:{
        'user_id':wx.getStorageSync('UserData').user_id,
        'unit_id':wx.getStorageSync('UserData').unit_id
      },
      success(res){
        wx.hideLoading({
          complete: (res) => {},
        })
        that.setData({
          question:res.data
        });
        let setTime = setInterval(function(){
          time=time-1;
          let minute=parseInt(time/60);
          let second=parseInt(time%60);
          if(second<10) second = "0"+second;
          if(minute<10) minute = "0"+minute;
          that.setData({
            minute:minute,
            second:second
          });
          if(minute==0&&second==0){
            console.log("时间到");
            clearInterval(setTime);
          }
        },1000);
      },
      fail(res){
        console.log(res)
      }
    })
  },
  btn:function(res){
    let that = this;
    if(res.currentTarget.dataset.option=="A"){
    that.setData({
      isClick:[!that.data.isClick[0],0,0,0]
    })
  }else if(res.currentTarget.dataset.option=="B"){
    that.setData({
      isClick:[0,!that.data.isClick[1],0,0]
    })
  }else if(res.currentTarget.dataset.option=="C"){
    that.setData({
      isClick:[0,0,!that.data.isClick[2],0]
    })
  }else if(res.currentTarget.dataset.option=="D"){
    that.setData({
      isClick:[0,0,0,!that.data.isClick[3]]
    })
  }
    // console.log(res)
      
  },
  next:function(res){
    let that = this;
    let question  = that.data.questionNum+1;
    let clickCaches = "clickCache["+that.data.questionNum+"]";
    let click = [0,0,0,0];
     if(that.data.clickCache[that.data.questionNum+1]){
       click = that.data.clickCache[that.data.questionNum+1]
     }
    that.setData({
      questionNum:question,
      isClick:click,
      [clickCaches]:that.data.isClick
    })
    // console.log(that.data.isClickCache)
  },
  last:function(res){
    let that = this;
    let question  = that.data.questionNum-1;
    that.setData({
      questionNum:question,
      isClick:that.data.clickCache[that.data.questionNum-1]
    })
  },
  
  submit:function(res){
    let that = this;
    console.log("交卷");
    that.hideModal();
    wx.showLoading({
      title: '正在提交',
    })
    let clickCaches = "clickCache["+that.data.questionNum+"]";
    that.setData({
      [clickCaches]:that.data.isClick
    })

    
    wx.request({
      url: app.globalData.Url+"/submitAchievement",
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data:{
        'achievement':[that.data.clickCache],
        'user_id':wx.getStorageSync('UserData').user_id
      },
      success(res){
        //TODO: 修改成绩加入缓存
        console.log(res);
        if(res.data.result>=wx.getStorageSync('UserData').exam_result){
          const stroage = wx.getStorageSync('UserData')
          stroage.exam_result = res.data.result
          wx.setStorageSync('UserData', stroage)
       }
        
        if(res.statusCode===200){
          wx.redirectTo({
            url: '../examResult/examResult?result='+res.data.result,
            complete: (res) => {},
            fail: (res) => {},
            success: (res) => {},
          })
        }
      },
      fail(res){
        console.log(res);
      }
    })
    // console.log(this.data.isClickCache)
  },

  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
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