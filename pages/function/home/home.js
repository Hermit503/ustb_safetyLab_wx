const app = new getApp();
Component({
  options: {
    addGlobalClass: true
  },
  data: {
    role:null,
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

  lifetimes:{
    attached:function(){
    let that = this
    let roles = wx.getStorageSync('Roles');
    var role = roles.find(function (value) {
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
    getAllUser: function(e) {
      let userPermission = wx.getStorageSync('Permission');
      //判断是否有人员管理的权限
      var permission = userPermission.find(function(value) {
        if (value == '/readuser' || value == '/alluser') {
          wx.navigateTo({
            url: '../function/user/user',
          })
          return 1;
        } else {
          wx.showToast({
            title: '你没有权限哦',
            icon: 'none'
          })
        }
      });
    },
  },

})