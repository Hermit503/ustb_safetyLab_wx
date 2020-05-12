// pages/function/hiddenRecode/hiddenRecode.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    height: 0,
    role:null,
    TabCur: 0,
    scrollLeft: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    that.setData({
      role:wx.getStorageSync('Roles')[0]
    })
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowHeight)
        that.setData({
          height: res.windowHeight
        })
      },
    })
    wx.request({
      url: app.globalData.Url + '/hiddens',
      data: {
        'unit_id': wx.getStorageSync('UserData').unit_id
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      method: 'GET',
      success: function(res) {
        console.log(res.data.hidden.data)
        that.setData({
          hiddenList: res.data.hidden.data,
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  hiddenHandle(e) {
    console.log(e.currentTarget.dataset)
    wx.navigateTo({
      url: './hiddenHandle?id=' + e.currentTarget.dataset.id +"&user_id="+e.currentTarget.dataset.userid+ "&title=" + e.currentTarget.dataset.title + "&issolve=" + e.currentTarget.dataset.issolve,
      success: function(res) {
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  //分页
  onReachBottom: function (e) {
    var that = this;
    that.data.page += 1;
    var page = that.data.page;
    console.log(page);
    wx.request({
      url: app.globalData.Url + "/hiddens?page=" + page,
      data: {
        
      },
      success(res) {
        console.log(res.data.hidden.data);
        that.setData({
          //向页面已有数据后面加数据
          hiddenList: that.data.hiddenList.concat(res.data.hidden.data),
        })
        if (res.data.hidden.data == '') {
          wx.showToast({
            // icon: ,
            title: '没有更多数据',
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})