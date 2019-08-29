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
        this.globalData.Url = 'http://saftylab.test/api/v1';
        this.globalData.Domain = 'http://saftylab.test';
        // this.globalData.Url = 'https://www.pipicui.wang/api/v1';
        // this.globalData.Url = 'http://www.hlhs.xyz/api/v1';
        // this.globalData.Url = 'http://119.23.243.176/api/v1';
      }
    })
  },
    checkPermission:function(permission_1,permission_2){
      let userPermission = wx.getStorageSync('Permission');
      //判断是否有设备管理的权限
      var hasPermission;
      for (var i = 0; i < userPermission.length; i++) {
        if (userPermission[i] == permission_1 || userPermission[i] == permission_2) {
          hasPermission = true;
          break;
        } else {
          hasPermission = false;
        }
      }
      return hasPermission;
    }
  });