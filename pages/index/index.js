// pages/index/index.js
const app = new getApp();
var common = require('../../utils/util.js');
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
    console.log("indextest")
    this.setData({
      length: wx.getStorageSync('length')
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
    common.getAllMessageList();
    common.getMyUpload();
    this.setData({
      length: wx.getStorageSync('length')
    })
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