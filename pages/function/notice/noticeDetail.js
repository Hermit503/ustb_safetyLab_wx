// pages/function/notice/noticeDetail.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details:null,
    url: app.globalData.Domain
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.Url + "/notice/getOneNotice",
      data:{
        id: options.id
      },
      success(res){
        that.setData({
          details: res.data[0]
        })
        console.log(that.data.details);
      }
    })
  },

  //图片预览
  previewImg: function (e) {
    console.log(e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    var i = 0;
    var imgArr = [];
    for (i; i < this.data.details['pictures'].length ; i++){
      imgArr[i] = this.data.url + this.data.details['pictures'][i];
    }
    
    wx.previewImage({
      current: imgArr[index],     //当前图片地址
      urls: imgArr,               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
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