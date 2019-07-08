const app = new getApp();
Component({
  options: {
    addGlobalClass: true
  },
  data: {
    role: null,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'http://m.qpic.cn/psb?/V11ZA3cx2xY4Vc/yeYmIGBsW0PbutxCAvJ5SKUD.BGdqHuPNaot7ghhR5o!/b/dL4AAAAAAAAA&bo=qAg4BAAAAAADB74!&rf=viewer_4'
    }, {
      id: 1,
      type: 'image',
      url: 'http://m.qpic.cn/psb?/V11ZA3cx2xY4Vc/yeYmIGBsW0PbutxCAvJ5SKUD.BGdqHuPNaot7ghhR5o!/b/dL4AAAAAAAAA&bo=qAg4BAAAAAADB74!&rf=viewer_4',
    }, {
      id: 2,
      type: 'image',
      url: 'http://m.qpic.cn/psb?/V11ZA3cx2xY4Vc/yeYmIGBsW0PbutxCAvJ5SKUD.BGdqHuPNaot7ghhR5o!/b/dL4AAAAAAAAA&bo=qAg4BAAAAAADB74!&rf=viewer_4'
    }, {
      id: 3,
      type: 'image',
      url: 'http://m.qpic.cn/psb?/V11ZA3cx2xY4Vc/yeYmIGBsW0PbutxCAvJ5SKUD.BGdqHuPNaot7ghhR5o!/b/dL4AAAAAAAAA&bo=qAg4BAAAAAADB74!&rf=viewer_4'
    }],
  },

  lifetimes: {
    attached: function() {
      let that = this
      let roles = wx.getStorageSync('Roles');
      var role = roles.find(function(value) {
        if (value) {
          that.setData({
            role: value
          })
          console.log(value)
        }
      })
    }
  },
  methods: {
    into: function(e) {
      wx.request({
        url: app.globalData.Url + "/users/permissions/" + wx.getStorageSync('UserData').user_id,
        data: {
          permission: e.currentTarget.dataset.btn,
          user_id: wx.getStorageSync('UserData').user_id
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          if (res.data.hasPermission == 1) {
            wx.navigateTo({
              url: '../function/' + e.currentTarget.dataset.btn + "/" + e.currentTarget.dataset.btn,
            })
            return 1;
          } else {
            wx.showToast({
              title: '你没有权限哦',
              icon: 'none'
            })
          }
        },
        fail: function(res) {},
        complete: function(res) {},
      })
      console.log(e.currentTarget.dataset.btn)
    }
  },

})