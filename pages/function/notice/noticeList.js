// pages/function/notice/noticeList.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticeList: {},
    page: 1,
    height: 0,
    pictures:[],
    time:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowHeight)
        that.setData({
          height: res.windowHeight
        })
      },
    })
    that.setData({
      noticeList: app.globalData.noticeList,
    })
    var i = 0;
    // 把json字符串转为json对象
    for (i; i < app.globalData.noticeLength; i++) {
      var str = app.globalData.Domain + JSON.parse(app.globalData.noticeList[i]['pictures'])[0];
      that.setData({
        pictures: that.data.pictures.concat(str),
      })
    }

    //TODO:待优化
    wx.request({
      url: app.globalData.Url + "/notice/getTime",
      data: {
        user_id: wx.getStorageSync('UserData').user_id,
      },
      success(res) {
        that.setData({
          time: res.data
        })
        console.log(that.data.time);
      }
    })
    
    
  },

  //获取具体信息
  getOneNotice(e){
    wx.navigateTo({
      url: 'noticeDetail?id=' + e.currentTarget.dataset.id,
      success: function (res) {
        
      }
    })
  },

  //分页
  onReachBottom: function (e) {
    var that = this;
    that.data.page += 1;
    var page = that.data.page;
    console.log(page);
    wx.request({
      url: app.globalData.Url + "/notice/getSomeoneNoticeList?page=" + page,
      data: {
        user_id: wx.getStorageSync('UserData').user_id,
      },
      success(res) {
        console.log(res.data.data);
        that.setData({
          //向页面已有数据后面加数据
          noticeList: that.data.noticeList.concat(res.data.data),
        })
        // that.data.height = that.data.height + 100;
        if (res.data.data == '') {
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})