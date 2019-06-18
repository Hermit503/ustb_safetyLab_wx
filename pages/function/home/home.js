Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    UserData: wx.getStorageSync('UserData'),
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
  methods: {
    hiddenRecord: function(e) {
      let roles = wx.getStorageSync('UserData')
      if(roles.role_id==1){
        let allRoles = wx.getStorageSync('Roles');
        let rolesLength = allRoles.length;
        for (let i = 0; i < rolesLength;i++){
          console.log("你的身份为："+allRoles[i].role);
        }
      }else{
      }
    },
    getAllUser: function (e) {
      console.log(e);
      wx.request({
        url: 'http://saftylab.test/api/v1/user',
        success(res){
          console.log(res.data.data)
        }
      })
    }
    

  }
})