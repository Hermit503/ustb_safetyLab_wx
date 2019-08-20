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
    functions: {
      '校级管理员': [{
          title: '人员查询',
          name: 'User',
          color: 'cyan',
          icon: 'friend',
          btn: 'user'
        },
        {
          title: '设备查询',
          name: 'Equipment',
          color: 'purple',
          icon: 'repair',
          btn: 'equipment'
        },
        {
          title: '危化品查询',
          name: 'chemical',
          color: 'blue',
          icon: 'colorlens',
          btn: 'chemical'
        },
        {
          title: '检修记录',
          name: 'repair recode',
          color: 'mauve',
          icon: 'form'
        },
        {
          title: '隐患/问题记录',
          name: 'IssueRecode',
          color: 'olive',
          icon: 'text',
          btn: 'hiddenRecode'
        },
        {
          title: '视察报告',
          name: 'inspection report',
          color: 'pink',
          icon: 'text'
        },
        {
          title: '下发通知',
          name: 'Notification',
          color: 'brown',
          icon: 'refresharrow',
          btn: 'notice'
        },
      ],
      '院级管理员': [{
          title: '人员管理',
          name: 'User',
          color: 'cyan',
          icon: 'friend',
          btn: 'user'
        },
        {
          title: '设备管理',
          name: 'Equipment',
          color: 'blue',
          icon: 'repair',
          btn: 'equipment'
        },
        {
          title: '危化品管理',
          name: 'chemical',
          color: 'purple',
          icon: 'colorlens',
          btn: 'chemical'
        },
        {
          title: '下发通知',
          name: 'Notification',
          color: 'mauve',
          icon: 'refresharrow',
          btn: 'notice'
        },
        {
          title: '检修记录',
          name: 'repair recode',
          color: 'pink',
          icon: 'form'
        },
        {
          title: '隐患/问题记录',
          name: 'IssueRecode',
          color: 'olive',
          icon: 'text',
          btn: 'hiddenRecode'
        },
        {
          title: '隐患/问题上报',
          name: 'Issue Report',
          color: 'red',
          icon: 'write',
          btn: 'hidden'
        },
        {
          title: '学习',
          name: 'Study',
          color: 'olive',
          icon: 'wenzi'
        },
        {
          title: '考试',
          name: 'Examination',
          color: 'green',
          icon: 'wenzi'
        },
      ],
      '实验室管理员': [{
          title: '人员管理',
          name: 'User',
          color: 'cyan',
          icon: 'friend',
          btn: 'user'
        },
        {
          title: '设备管理',
          name: 'Equipment',
          color: 'blue',
          icon: 'repair',
          btn: 'equipment'
        },
        {
          title: '危化品管理',
          name: 'chemical',
          color: 'purple',
          icon: 'colorlens',
          btn: 'chemical'
        },
        {
          title: '下发通知',
          name: 'Notification',
          color: 'grey',
          icon: 'refresharrow',
          btn: 'notice'
        },
        {
          title: '隐患/问题上报',
          name: 'Issue Report',
          color: 'red',
          icon: '',
          btn: 'hidden'
        },
        {
          title: '隐患/问题记录',
          name: 'IssueRecode',
          color: 'olive',
          icon: '',
          btn: 'hiddenRecode'
        },
        {
          title: '检修记录',
          name: 'repair report',
          color: 'pink',
          icon: 'form'
        },
        {
          title: '实验室日志',
          name: 'Laboratory logs',
          color: 'brown',
          icon: 'text'
        },
        {
          title: '检修报告',
          name: 'repair report',
          color: 'mauve',
          icon: 'same'
        },
        {
          title: '学习',
          name: 'Study',
          color: 'olive',
          icon: 'wenzi'
        },
        {
          title: '考试',
          name: 'Examination',
          color: 'green',
          icon: 'wenzi'
        },
      ],
      '教师': [{
          title: '隐患/问题上报',
          name: 'Issue Report',
          color: 'red',
          icon: 'write',
          btn: 'hidden'
        },
        {
          title: '学习',
          name: 'Study',
          color: 'olive',
          icon: 'wenzi'
        },
        {
          title: '考试',
          name: 'Examination',
          color: 'green',
          icon: 'wenzi'
        },
        {
          title: '课堂日志',
          name: 'Class Log',
          color: 'brown',
          icon: 'text'
        },
      ],
    }
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
      if (e.currentTarget.dataset.btn == 'user' || e.currentTarget.dataset.btn == 'equipment' || e.currentTarget.dataset.btn == 'medcine') {
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
      } else {
        wx.navigateTo({
          url: '../function/' + e.currentTarget.dataset.btn + "/" + e.currentTarget.dataset.btn,
        })
      }
      console.log(e.currentTarget.dataset.btn)
    }
  },

})