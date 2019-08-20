// pages/function/medcine/medcine.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chemicalList: [],
    picker: ['g', 'kg', 'mL', 'L'],
  },
  PickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    wx.request({
      url: app.globalData.Url + '/chemical',
      data: {
        user_id: wx.getStorageSync('UserData').user_id,
        unit_id: wx.getStorageSync('UserData').unit_id
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res)
        that.setData({
          chemicalList: res.data.chemicalList
        })
      },
    });
  },


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
      userName: e.currentTarget.dataset.name
    })
    console.log(e)
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
  //入库
  inout: function(e) {
    console.log(e)
    this.setData({
      modalName: e.currentTarget.dataset.target,
      checimalName: e.currentTarget.dataset.name,
      checimalId: e.currentTarget.dataset.id,
      unitType: e.currentTarget.dataset.unit,
      chemicalType: e.currentTarget.dataset.type,
      inout: e.currentTarget.dataset.inout
    })
  },
  inoutSubmit(e) {
    let that = this
    console.log(that.data.checimalId)
    if (that.data.inout == 'in') {
      var stock = Math.abs(Number(e.detail.value.stock))
      console.log(stock)
    } else if (that.data.inout == 'out') {
      var stock = Math.abs(Number(e.detail.value.stock)) * (-1)
      console.log(stock)
    }
    wx.request({
      url: app.globalData.Url + '/chemical/inout',
      data: {
        chemicalId: that.data.checimalId,
        stock: stock,
        remarks: e.detail.value.remarks,
        chemicalType: that.data.chemicalType
      },
      header: {},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res)
        if (res.data == "需要完成双人入库操作") {
          console.log(res.data)
        } else {
          that.setData({
            modalName: null
          })
          wx.showToast({
            title: res.data,
            icon: 'success',
            duration: 2000
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
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