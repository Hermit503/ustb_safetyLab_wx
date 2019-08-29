//app.js
App({
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