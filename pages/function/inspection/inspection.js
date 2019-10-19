// pages/function/inspection/inspection.js
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
  onLoad: function(options) {
    let that = this
    wx.request({
      url: app.globalData.Url + "/inspections",
      data: {
        id: options.id
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        that.setData({
          inspection: res.data,
          inspection_id: options.id
        })
        if (res.data.status) {
          that.setData({
            status: res.data.status
          })
        } else {
          that.setData({
            status: '正常'
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

  Change(e) {
    let that = this
    console.log(e)
    var t = this.data.inspection.status;
    if (e.detail.value == true) {
      that.setData({
        status: '正常'
      })
    } else if (e.detail.value == false) {
      if (that.data.inspection.chemical_id) {
        that.setData({
          status: '存在问题'
        })
      } else {
        that.setData({
          status: '维修'
        })
      }

    }
  },

  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },

  Submit(e) {
    let that = this;
    if (Object.keys(that.data.inspection)[9]=="CAS") {
      var type = "chemical";
    } else {
      var type = "equipment";
    }
    wx.request({
      url: app.globalData.Url + '/inspections/' + that.data.inspection_id,
      data: {
        id: that.data.inspection_id,
        type:type,
        repair_user: wx.getStorageSync('UserData').user_id,
        status: that.data.status,
        detail:that.data.textareaAValue
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      method: 'PUT',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res)
        if(res.data=='检修完成'&&res.statusCode==200){
          wx.showToast({
            title: '检修完成',
            duration: 2000,
            success:function(res){
              wx.redirectTo({
                url: '../../index/index',
              })
            }
          });
          
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
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