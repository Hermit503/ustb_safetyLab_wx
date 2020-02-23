const app =new getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    UserData: [],
    isClick: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  userIdInput: function (e) {
    this.setData({
      userId: e.detail.value
    })
  },
  userPwdInput: function (e) {
    this.setData({
      userPwd: e.detail.value
    })
  },
  onLoad: function (options) {
    wx.getStorageInfo({
      success: function(res) {
        console.log(res)
        if (res.currentSize != 1 && res.currentSize!=0){
          wx.navigateTo({
            url: '../index/index',
          })
        }
      },
      complete:function(res){
        console.log(res)
      }
    })
  },
  login: function (e) {
    let that = this
    that.setData({
      isClick: true
    })
    wx.getUserInfo({
      lang: "zh_CN",
      success: response => {
        wx.login({
          success: res => {
            let data = {
              userid: this.data.userId,
              userpwd: this.data.userPwd,
              code: res.code,
              nickname: response.userInfo.nickName,
            }
            console.log(data)
            app.globalData.userInfo = data;
            wx.request({
              url: app.globalData.Url+'/user/login',
              method: 'POST',
              data: data,
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                console.log(res)
                if (res.statusCode == '401') {
                  wx.showToast({
                    title: '工号或密码错误',
                    duration: 2000,
                  });
                  that.setData({
                    isClick: false
                  })
                  return false;
                } else if (res.statusCode=="400"){
                  wx.showToast({
                    title: '工号不存在！',
                    duration: 2000,
                  });
                  that.setData({
                    isClick: false
                  })
                  return false;
                }else if (res.statusCode=="200"){
                  wx.showToast({
                    title: '登陆成功！',
                    duration: 2000,
                  });
                  var userPermissions = new Array()
                  let permissionLength = (res.data.permissions).length
                  for (let i = 0; i < permissionLength; i++) {
                    userPermissions.push(res.data.permissions[i].permission)
                  }
                  var userRoles = new Array();
                  let roleLength = (res.data.roles).length;
                  for (let i = 0; i < roleLength;i++){
                    userRoles.push(res.data.roles[i].role);
                  }
                  wx.setStorageSync('access_token', res.data.access_token)
                  wx.setStorageSync('UserData', res.data.data ? res.data.data : '')
                  wx.setStorageSync('Roles', userRoles)
                  wx.setStorageSync('Permission', userPermissions)
                  if(res.data.data.unit_id==null){
                    wx.redirectTo({
                      url: '/pages/index/index',
                    })
                  }else if(res.data.data.exam_result<80){
                    wx.showToast({
                      title: '您未通过考试',
                    })
                    wx.redirectTo({
                      url: '../function/exam/exam',
                    })
                  }else{
                    wx.redirectTo({
                      url: '/pages/index/index',
                    })
                  }
                }
              }
            });
          }
        })
      },
      fail: function (e) {
        that.setData({
          isClick: false
        })
      },
    })

  }
})