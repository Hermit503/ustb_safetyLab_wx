// pages/function/study/study.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:app.globalData.Domain+"/storage/images/",
    imageList:[
      {
        'title':'一.总则',
        'data':[1]
      },
      {
        'title':'二.一般安全守则',
        'data':[2]
      },
      {
        'title':'三.消防安全',
        'data':[3,4]
      },
      {
        'title':'四.水电安全',
        'data':[5,6,7]
      },
      {
        'title':'五.化学品安全',
        'data':[8,9,10,11,12,13,14,15,16,17,18,19,20]
      },
      {
        'title':'六.生物安全',
        'data':[21,22,23]
      },
      {
        'title':'七.一般设备安全',
        'data':[26,27,28,29,30]
      },
      {
        'title':'八.特种设备安全',
        'data':[31,32,33]
      },
      {
        'title':'九.实验室废弃物处置',
        'data':[34]
      },
      {
        'title':'十.常见警示标识',
        'data':[35,36]
      },
      {
        'title':'十.一实验室急救处置小常识',
        'data':[37,38,39,40]
      }
    ]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  gotoExam(){
    wx.redirectTo({
      url: '../exam/exam',
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