const app = new getApp();
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    messageTotal:0,
    noticeTotal:0,
    userdata:'',

  },
  attached() {
    console.log("success");
    let that = this;
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
          noticeTotal: that.coutNum(app.globalData.noticeLength),
          messageTotal: that.coutNum(app.globalData.length)
        })
      }
    }
    wx.hideLoading()
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
    CopyLink(e) {
      wx.setClipboardData({
        data: e.currentTarget.dataset.link,
        success: res => {
          wx.showToast({
            title: '已复制',
            duration: 1000,
          })
        }
      })
    },
    showModal(e) {
      this.setData({
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
    logout(){
      var id = this.data.userdata.id;
      wx.request({
        url: getApp().globalData.Url+'/user/logout',
        data: {
          "id" : id
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
    },
  }
})