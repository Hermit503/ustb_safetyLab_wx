// pages/function/user/user.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList: {},
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    userSortId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    wx.request({
      url: app.globalData.Url + "/users",
      data: {
        unit_id: wx.getStorageSync('UserData').unit_id,
        role: wx.getStorageSync('Roles'),
        id: wx.getStorageSync('UserData').id,
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success(res) {
        console.log(res.data);
        that.setData({
          userList: res.data,
          permissionList: wx.getStorageSync('Permission')
        })
      }
    });
  },
  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
  /**
   * 模态框
   */
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target,
      userSortId: e.currentTarget.dataset.id,
      userName:e.currentTarget.dataset.name
    })
    console.log(e.currentTarget.dataset)
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  //删除的模态框
  showDeleteModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target,
      id: e.target.dataset.id
    });
  },
  hideDeleteModal(e) {
    this.setData({
      modalName: null
    })
  },
  //人员信息更改
  updateUser: function(e) {
    wx.navigateTo({
      url: './updateUser?id=' + e.currentTarget.dataset.id + '&unit_id=' + e.currentTarget.dataset.unit,
      success: function(res) {
        // console.log(res)
      }
    })
    wx.showLoading({
      title: '正在加载',
    })
    // console.log(e.currentTarget)
  },
  // 人员信息删除
  deleteUser(e) {
    // console.log(this.data.userSortId)
    let that = this
    wx.request({
      url: app.globalData.Url + "/users/" + this.data.userSortId,
      data: {
        'user_Id': this.data.userSortId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'DELETE',
      success: function(res) {
        if (res.statusCode == 204) {
          that.hideModal();
          that.onLoad();
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})