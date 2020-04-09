//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    msg: null,//cu-tag badge
    messageList: null,
    length: null,
    indexPage: null,
    noticeLength:null,
    noticeList:null,
  },
  onLaunch: function () {
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
        //需要将safe.test 改为本地ip 非127/local/ 即可手机调试
        this.globalData.Url = 'https://safe.hlhs.xyz/api/v1';
        this.globalData.Domain = 'https://safe.hlhs.xyz';
        // this.globalData.Url = 'http://www.pipicui.wang/api/v1';
        // this.globalData.Url = 'http://www.hlhs.xyz/api/v1';
        // this.globalData.Url = 'http://119.23.243.176/api/v1';
      }
    })
  },
  });