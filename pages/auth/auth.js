const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    UserData: [],
    isClick: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  userIdInput: function (e) {
    this.setData({
      userId: e.detail.value
    })
  },
  userPwdInput: function (e) {
    this.setData({
      userPwd: e.detail.value
    })
  },
  onLoad: function (options) {

  },
  login: function (e) {
    let that = this
    that.setData({
      isClick: true
    })
    wx.getUserInfo({
      lang: "zh_CN",
      success: response => {
        wx.login({
          success: res => {
            let data = {
              userid: this.data.userId,
              userpwd: this.data.userPwd,
              code: res.code,
              nickname: response.userInfo.nickName,
            }
            console.log(data)
            app.globalData.userInfo = data;
            wx.request({
              url: 'http://saftylab.test/api/v1/user/login',
              method: 'POST',
              data: data,
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                console.log(res.data)
                if (res.statusCode != '200') {
                  return false;
                }
                wx.setStorageSync('access_token', res.data.access_token)
                wx.setStorageSync('UserData', res.data.data ? res.data.data : '')
                wx.redirectTo({
                  url: '/pages/index/index',
                })
              },
              fail: function (e) {
                wx.showToast({
                  title: '服务器错误',
                  duration: 2000
                });
                that.setData({
                  isClick: false
                })
              },
            });
          }
        })
      },
      fail: function (e) {
        that.setData({
          isClick: false
        })
      },
    })

  }
})