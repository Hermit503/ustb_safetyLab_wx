// pages/function/user/user.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    equipmentList: {},
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    id: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: app.globalData.Url + "/equipments",
      data: {
        unit_id: wx.getStorageSync('UserData').unit_id,
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success(res) {
        console.log(res.data[0]);
        that.setData({
          equipmentList: res.data,
          permissionList: wx.getStorageSync('Permission')
        })
      }
    });

  },
  //增加设备跳转页面
  addEquipment: function (e) {
    let userPermission = wx.getStorageSync('Permission');
    //判断是否有设备管理的权限
    var permission = userPermission.find(function (value) {
      if (value == 'allequipment' || value == 'addequipment') {
        wx.navigateTo({
          url: '../../function/equipment/equipmentDetails',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
        return 1;
      } else {
        wx.showToast({
          title: '你没有权限哦',
          icon: 'none'
        })
      }
    });
  },
  //删除设备显示模态框
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target,
      id: e.target.dataset.id
    });
  },
  hideModal(e) {
    this. setData({
      modalName: null
    })
  },
  deleteEquipment:function(e){
    var that = this;
    wx.request({
      url: app.globalData.Url + '/equipment/delete',
      data: {
        id: this.data.id
      },
      method: 'DELETE',
      success(res) {
        that.hideModal();
        wx.showToast({
          title: res.data,
          duration: 2000,
        });
      }
    })
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
  exit: function () {
    wx.navigateTo({
      url: './pages/index/index',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

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