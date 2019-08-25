// pages/function/notice/message.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
      wx.request({
        url: app.globalData.Url +"/notice/test",
        data: {
          userId: wx.getStorageSync('UserData').user_id
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        method: 'GET',
        success: function (res) {
          console.log(res)
          that.setData({
            chemicalNoticesList: res.data.chemicalNoticesList,
          }
          )
        }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 出入库确认 
   */
  confirm(e){
    console.log(e.target.dataset)
    wx.request({
      url: app.globalData.Url + "/notice/test",
      data: {
        chemicalId:e.target.dataset.chemical,
        type: e.target.dataset.type,
        stock:e.target.dataset.stock,
        id:e.target.dataset.id
      },
      header: {},
      method: 'PUT',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {},
      complete: function(res) {},
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