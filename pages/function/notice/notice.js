// pages/function/notice/notice.js
const app = new getApp();
let str = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    display: 'none',
    imgList: [],
    index: null,
    items: [],
    indexList: [],
    file: null,
    fileList: null,
    userList: new Array(), //需要上传的人员
    pictures: new Array(), //上传成功后的图片路径
    finalPicture: null,
    finalFile: '',        //上传成功的文件路径
    sucess: 0,
  },

  ChooseImage() {
    wx.chooseImage({
      count: 9, //默认9
      sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'],
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
          console.log(res.tempFilePaths)
        }
      }
    });
  },

  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },

  DelImg(e) {
    wx.showModal({
      title: '照片删除',
      content: '确定要删除吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },

  uploadImage() {
    var that = this;

  },

  chooseFile(e) {
    var that = this;
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success(res) {
        console.log(res);
        that.setData({
          file: res.tempFiles[0].name,
          fileList: res.tempFiles[0].path
        })
      }
    })
  },

  showList(e) {
    if (this.data.display == 'none') {
      this.setData({
        display: null
      });
    } else {
      this.setData({
        display: 'none'
      });
    }
  },

  checkboxChange(e) {
    console.log(e.detail.value);
    this.setData({
      userList: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    let that = this
    wx.request({
      url: app.globalData.Url + "/notice/",
      data: {
        // roles: wx.getStorageSync('Roles'),
        roles: [wx.getStorageSync('UserData').title],
        user_id: wx.getStorageSync('UserData').user_id,
        unit_id: wx.getStorageSync('UserData').unit_id,
      },
      success: function (res) {
        that.setData({
          items: res.data,
        })
        wx.hideLoading();
      }
    })
  },

  formSubmit: function (e) {
       var that = this;
    if (e.detail.value.title == '' ||that.data.userList.length==0||e.detail.value.comment=='') {
      wx.showToast({
        title: '请输入完整信息',
        icon:'none'
      })
    } 
    else {
    
      //用户可能只上传照片，可能只上传文件，也可能都上传
      //只上传照片
      if (that.data.imgList.length != 0 && that.data.fileList == null) {
        var length = this.data.imgList.length;
        var i = 0;
        var count = 0;
        for (i; i < length; i++) {
          wx.uploadFile({
            url: app.globalData.Url + "/notice/imgUpload",
            filePath: this.data.imgList[i],
            name: 'file',
            success(res) {
              count++;
              that.data.pictures.push(res.data);
              if (count == length) {
                wx.request({
                  url: app.globalData.Url + "/notice/saveData",
                  method: 'POST',
                  data: {
                    title: e.detail.value.title,
                    users: JSON.stringify(that.data.userList),
                    comment: e.detail.value.comment,
                    build_id: wx.getStorageSync('UserData').user_id,
                    pictures: JSON.stringify(that.data.pictures),
                    file: that.data.finalFile
                  },
                  success(res) {
                    wx.showToast({
                      // icon: ,
                      title: res.data,
                    })
                    setTimeout(function () {
                      wx.navigateBack({});
                    }, 1500)
                  }
                })
              }
            }
          })
        }
      } else if (that.data.fileList != null && that.data.imgList.length == 0) {
        //只上传文件
        wx.uploadFile({
          url: app.globalData.Url + "/notice/fileUpload",
          filePath: this.data.fileList,
          header: {
            "chartset": "utf-8"
          },
          method: 'POST',
          name: 'file',
          success(res) {
            console.log("result");
            console.log(res.data);
            that.setData({
              finalFile: res.data
            })
            wx.request({
              url: app.globalData.Url + "/notice/saveData",
              method: 'POST',
              data: {
                title: e.detail.value.title,
                users: JSON.stringify(that.data.userList),
                comment: e.detail.value.comment,
                build_id: wx.getStorageSync('UserData').user_id,
                pictures: JSON.stringify(that.data.pictures),
                file: that.data.finalFile
              },
              success(res) {
                wx.showToast({
                  // icon: ,
                  title: res.data,
                })
                setTimeout(function () {
                  wx.navigateBack({});
                }, 1500)
              }
            })
          }
        })

      } else if (that.data.fileList == null && that.data.imgList.length == 0) {
        //都不上传
        wx.request({
          url: app.globalData.Url + "/notice/saveData",
          method: 'POST',
          data: {
            title: e.detail.value.title,
            users: JSON.stringify(that.data.userList),
            comment: e.detail.value.comment,
            build_id: wx.getStorageSync('UserData').user_id,
            pictures: JSON.stringify(that.data.pictures),
            file: that.data.finalFile
          },
          success(res) {
            console.log(res.data);
            wx.showToast({
              // icon: ,
              title: res.data,
            })
            setTimeout(function () {
              wx.navigateBack({});
            }, 1500)
            wx.request({
              url: app.globalData.Url + "/email",
              data: {
                users: JSON.stringify(that.data.userList)
              },
              sucess(r) {
                console.log("邮件发送成功");
              }
            })

          }
        })
      } else if (that.data.fileList != null && that.data.imgList.length != 0) {
        //都有
        wx.uploadFile({
          url: app.globalData.Url + "/notice/fileUpload",
          filePath: this.data.fileList,
          header: {
            "chartset": "utf-8"
          },
          method: 'POST',
          name: 'file',
          success(res) {
            console.log(res.data);
            that.setData({
              finalFile: res.data
            })
            //传图片
            var length = that.data.imgList.length;
            var i = 0;
            var count = 0;
            for (i; i < length; i++) {
              wx.uploadFile({
                url: app.globalData.Url + "/notice/imgUpload",
                filePath: that.data.imgList[i],
                name: 'file',
                success(r) {
                  count++;
                  that.data.pictures.push(r.data);
                  if (count == length) {
                    wx.request({
                      url: app.globalData.Url + "/notice/saveData",
                      method: 'POST',
                      data: {
                        title: e.detail.value.title,
                        users: JSON.stringify(that.data.userList),
                        comment: e.detail.value.comment,
                        build_id: wx.getStorageSync('UserData').user_id,
                        pictures: JSON.stringify(that.data.pictures),
                        file: that.data.finalFile
                      },
                      success(re) {
                        wx.showToast({
                          // icon: ,
                          title: res.data,
                        })
                        setTimeout(function () {
                          wx.navigateBack({});
                        }, 1500)
                      }
                    })
                  }
                }
              })
            }
          }
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})