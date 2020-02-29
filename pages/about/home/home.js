const app = new getApp();
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    messageTotal: 0,
    noticeTotal: 0,
    userdata: '',
    avatarUrl: ''
  },
  attached() {
    console.log("success");
    let that = this;
    wx.getUserInfo({
      complete: (res) => {
        this.setData({
          avatarUrl: res.userInfo.avatarUrl
        })
      },
    })
    that.setData({
      userdata: wx.getStorageSync('UserData')
    })
    wx.showLoading({
      title: '数据加载中',
      mask: true,
    })
    let i = 0;
    numDH();
    function numDH() {
      if (i < 20) {
        setTimeout(function () {
          that.setData({
            starCount: i,
            forksCount: i,
            messageTotal: i
          })
          i++
          numDH();
        }, 20)
      } else {
        that.setData({
          noticeTotal: that.coutNum(wx.getStorageSync('uploadLength')),
          messageTotal: that.coutNum(wx.getStorageSync('length'))
        })
      }
    }
    wx.hideLoading()
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      let that = this;
      let i = 0;
      numDH();
      function numDH() {
        if (i < 20) {
          setTimeout(function () {
            that.setData({
              starCount: i,
              forksCount: i,
              messageTotal: i
            })
            i++
            numDH();
          }, 20)
        } else {
          that.setData({
            noticeTotal: that.coutNum(wx.getStorageSync('uploadLength')),
            messageTotal: that.coutNum(wx.getStorageSync('length'))
          })
        }
      }
    },
    hide: function () {

    },
    resize: function () {

    },
  },
  methods: {
    coutNum(e) {
      if (e > 1000 && e < 10000) {
        e = (e / 1000).toFixed(1) + 'k'
      }
      if (e > 10000) {
        e = (e / 10000).toFixed(1) + 'W'
      }
      return e
    },

    userAbout(e) {
      wx.redirectTo({
        url: '../../../../function/user/userAbout/userAbout',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    },
    showModal(e) {
      this.setData({
        phone_number: wx.getStorageSync('UserData').phone_number,
        email: wx.getStorageSync('UserData').email,
        password: null,
        modalName: e.currentTarget.dataset.target
      })
    },
    hideModal(e) {
      this.setData({
        modalName: null
      })
    },
    showQrcode() {
      wx.previewImage({
        urls: ['https://image.weilanwl.com/color2.0/zanCode.jpg'],
        current: 'https://image.weilanwl.com/color2.0/zanCode.jpg' // 当前显示图片的http链接      
      })
    },
    formSubmit(res) {
      let that = this;
      if (res.detail.value.phone_number[0] != '1') {
        that.setData({
          isEqual: false,
          msg: '手机号格式不正确'
        })
      }else if (res.detail.value.phone_number.length != 11) {
        that.setData({
          isEqual: false,
          msg: '手机号长度不正确'
        })
      }else if (res.detail.value.newPassword != res.detail.value.confirmPassword) {
        that.setData({
          isEqual: false,
          msg: '两次密码输入不一致，请重新输入'
        })
      }else if (res.detail.value.newPassword.length<6) {
        that.setData({
          isEqual: false,
          msg: '密码必须大于8位，请验证'
        })
      }else{
        wx.request({
          url: app.globalData.Url+'/updateUserInfo',
          data: {
            user_id:wx.getStorageSync('UserData').user_id,
            phone_number:res.detail.value.phone_number,
            email:res.detail.value.email,
            password:res.detail.value.newPassword
          },
          dataType: 'json',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
          method: 'POST',
          success: (result) => {
            
            if(result.statusCode==200){
              this.hideModal();
              wx.showToast({
                title: '修改成功',
              })
              const phone_number = res.detail.value.phone_number;
              const email = res.detail.value.email;
              const stroage = wx.getStorageSync('UserData');
              stroage.phone_number = phone_number;
              stroage.email = email;
              wx.setStorageSync('UserData', stroage);
            }
          },
        })
      }

    },
    change(res) {
      let that = this;
      that.setData({
        isEqual: true
      })
    },
    logout() {
      var id = this.data.userdata.id;
      wx.request({
        url: getApp().globalData.Url + '/user/logout',
        data: {
          "id": id
        },
        method: 'POST',
      });
      wx.removeStorage({
        key: 'access_token',
      });
      wx.removeStorage({
        key: 'Roles',
      });
      wx.removeStorage({
        key: 'Permission',
      });
      wx.removeStorage({
        key: 'UserData',
        success: function (res) {
          wx.redirectTo({
            url: '/pages/auth/auth',
          })
        },
      });

    },
    onPullDownRefresh: function () {
      wx.showNavigationBarLoading()
      this.onLoad()
      setTimeout(() => {
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      }, 2000);
    }
  }
})