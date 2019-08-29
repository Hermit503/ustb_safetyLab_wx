// pages/index/index.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    PageCur: 'function',
    UserData:wx.getStorageSync('UserData'),
    role:'',
    length: 0
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    var i;
    app.globalData.indexPage = getCurrentPages(); // 当前页面;
    wx.request({
      url: app.globalData.Url + '/notice/notices',
      data: {
        'user_id': wx.getStorageSync('UserData').user_id,
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        that.setData({
          length:res.data.length
        })
        console.log(res.data);
        for (i = 0; i < res.data.length; i++) {
          if (res.data[i]['noticeType'] == "chemical") {
            // res.data[i]['user_name_1'] 
            res.data[i]['msg'] = "申请" + res.data[i]['type'] + res.data[i]['stock'] + res.data[i]['chemical_name'];
          } else {
            res.data[i]['msg'] = res.data[i]['title'];
          }
        }
        app.globalData.messageList = res.data;
        app.globalData.length = res.data.length;
        that.setData({
          length: app.globalData.length
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })

    wx.request({
      url: app.globalData.Url + "/notice/getSomeoneNoticeList",
      data: {
        user_id: wx.getStorageSync('UserData').user_id,
      },
      success(res) {
        console.log(res.data.data)
        app.globalData.noticeList = res.data.data;
        app.globalData.noticeLength = res.data.data.length;
        
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