// pages/function/user/updateUser.js
const app = new getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    picker: [],
    unit_id: null,
    items: [{
        name: 'alluser',
        value: '人员所有权限'
      },
      {
        name: 'allequipment',
        value: '设备所有权限'
      },
      {
        name: 'allmedcine',
        value: '药品所有权限'
      },
      {
        name: 'ENG',
        value: '英国'
      },
      {
        name: 'TUR',
        value: '法国'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    wx.request({
      url: app.globalData.Url + "/users/" + options.id,
      success: function(res) {
        let unitList = Array();
        for (let i = 0; i < res.data.units.length; i++) {
          unitList.push(res.data.units[i].unit_name)
        }
        that.setData({
          userInfo: res.data.userInfo,
          picker: unitList,
          unit_id: options.unit_id - 1
        })
        console.log(res.data)
      }
    })
  },
  userNameInput(e) {
    this.setData({
      userName: e.detail.value
    })
  },
  userEmailInput(e) {
    this.setData({
      userEmail: e.detail.value
    })
  },
  userPhoneInput(e) {
    this.setData({
      userPhone: e.detail.value
    })
  },
  userTitleInput(e) {
    this.setData({
      userTitle: e.detail.value
    })
  },
  PickerChange(e) {
    // console.log(e);
    this.setData({
      unit_id: e.detail.value
    })
  },
  checkboxChange: function (e) {
    let that = this
    console.log(e.detail.value)
    that.setData({
      userPermission: e.detail.value
    })
  },
  formSubmit: function(e) {
    wx.request({
      url: app.globalData.Url + '/users/' + e.detail.value.userId,
      data: {
        'name': e.detail.value.userName,
        'email': e.detail.value.userEmail,
        'user_id': e.detail.value.userId,
        'phone': e.detail.value.userPhone,
        'unit_id': Number(e.detail.value.userUnit) + 1,
        'title': e.detail.value.userTitle,
        'permission': e.detail.value.userPermission
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'PUT',
      success: function(res) {
        console.log(res)
        // if (res.statusCode == 200) {
        //   wx.redirectTo({
        //     url: './user',
        //   })
        // }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    console.log(e.detail)
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.hideLoading()
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