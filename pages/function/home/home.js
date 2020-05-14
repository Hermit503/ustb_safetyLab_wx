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
          name: 'inspection Record',
          color: 'mauve',
          icon: 'form',
          btn:'inspectionRecord'
        },
        {
          title: '隐患/问题记录',
          name: 'Issue Recode',
          color: 'olive',
          icon: 'text',
          btn: 'hiddenRecode'
        },
        // {
        //   title: '视察报告',
        //   name: 'inspection report',
        //   color: 'pink',
        //   icon: 'text'
        // },
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
          color: 'green',
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
          title: '巡检记录',
          name: 'inspection Record',
          color: 'pink',
          icon: 'form',
          btn:'inspectionRecord'
        },
        {
          title: '隐患/问题记录',
          name: 'Issue Recode',
          color: 'olive',
          icon: '',
          btn: 'hiddenRecode'
        },
        {
          title: '隐患/问题上报',
          name: 'Issue Report',
          color: 'red',
          icon: '',
          btn: 'hidden'
        },
        {
          title: '学习',
          name: 'Study',
          color: 'green',
          icon: 'wenzi',
          btn: 'study'
        },
        {
          title: '考试',
          name: 'Examination',
          color: 'cyan',
          icon: 'wenzi',
          btn: 'exam'
        },
        {
          title: '课堂日志',
          name: 'Class Log',
          color: 'brown',
          icon: 'text',
          btn: 'classLog'
        },
      ],
      '实验室管理员': [
        // {
        //   title: '人员管理',
        //   name: 'User',
        //   color: 'cyan',
        //   icon: 'friend',
        //   btn: 'user'
        // },
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
          name: 'Issue Recode',
          color: 'olive',
          icon: '',
          btn: 'hiddenRecode'
        },
        {
          title: '电子巡检',
          name: 'inspection',
          color: 'pink',
          icon: 'form',
          btn: 'inspection'
        },
        {
          title: '巡检记录',
          name: 'inspection Record',
          color: 'pink',
          icon: 'form',
          btn: 'inspectionRecord'
        },
        // {
        //   title: '实验室日志',
        //   name: 'Laboratory logs',
        //   color: 'brown',
        //   icon: 'text'
        // },
        {
          title: '学习',
          name: 'Study',
          color: 'olive',
          icon: 'wenzi',
          btn: 'study'
        },
        {
          title: '考试',
          name: 'Examination',
          color: 'green',
          icon: 'wenzi',
          btn: 'exam'
        },
        {
          title: '课堂日志',
          name: 'Class Log',
          color: 'brown',
          icon: 'text',
          btn: 'classLog'
        },
      ],
      '教师': [{
          title: '隐患/问题上报',
          name: 'Issue Report',
          color: 'red',
          btn: 'hidden'
        },
        {
          title: '学习',
          name: 'Study',
          color: 'olive',
          icon: 'wenzi',
          btn: 'study'
        },
        {
          title: '考试',
          name: 'Examination',
          color: 'green',
          icon: 'wenzi',
          btn: 'exam'
        },
        {
          title: '课堂日志',
          name: 'Class Log',
          color: 'brown',
          icon: 'text',
          btn:'classLog'
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
      if (e.currentTarget.dataset.btn == 'user' || e.currentTarget.dataset.btn == 'equipment' || e.currentTarget.dataset.btn == 'chemical') {
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
      } else if (e.currentTarget.dataset.btn == 'inspection') {
        wx.scanCode({
          onlyFromCamera: false,
          scanType: ["barCode", "pdf417", "qrCode", "datamatrix"],
          success: function(res) {
            console.log(res)
            wx.showToast({
              title: "正在查询",
            })
            wx.request({
              url: app.globalData.Url + "/inspections",
              data: {
                id: res.result,
                unit_id:wx.getStorageSync('UserData').unit_id
              },
              header: {},
              method: 'GET',
              dataType: 'json',
              responseType: 'text',
              success: function(e) {
                console.log(e)
                if (e.data.canInspection == "no") {
                  wx.showToast({
                    title: e.data.msg,
                    icon:"none",
                  })
                } else {
                  wx.navigateTo({
                    url: '../../pages/function/inspection/inspection?id=' + res.result,
                    success: function(e) {
                    },
                  })
                }
              },
              fail: function(res) {},
              complete: function(res) {},
            })


          },
          fail: function(res) {},
          complete: function(res) {},
        })
      } else if(e.currentTarget.dataset.btn=='study'){
        wx.navigateTo({
          url: '../function/' + e.currentTarget.dataset.btn + "/" + e.currentTarget.dataset.btn+"?unit="+wx.getStorageSync('UserData').unit_id,
        })
      }else {
        wx.navigateTo({
          url: '../function/' + e.currentTarget.dataset.btn + "/" + e.currentTarget.dataset.btn,
        })
      }
      console.log(e.currentTarget.dataset.btn)
    }
  },

})