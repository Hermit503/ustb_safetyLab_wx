//app.js
App({
  globalData: {
    userInfo: null,
    msg: null,//cu-tag badge
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
  });