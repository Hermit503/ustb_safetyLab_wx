// pages/function/exam/exam.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
      wx.getUserInfo({
        complete: (res) => {
          that.setData({
            avatar:res.userInfo.avatarUrl,
            result:wx.getStorageSync('UserData').exam_result
          });
          // console.log(res.userInfo.avatarUrl)
        },
      })
  },
  gotoStudy(e){
    console.log(e)
    wx.redirectTo({
      url: '../study/study?unit='+wx.getStorageSync('UserData').unit_id,
      success(e){
        console.log("成功跳转到study")
      }
    })
  },
  startExam(){
    wx.redirectTo({
      url: './startExam/startExam',
      success(e){
        console.log("开始考试")
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