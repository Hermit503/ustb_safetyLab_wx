// pages/function/hidden/hidden.js
const app = new getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgList: [],
    type: 'hidden'
  },
  ChooseImage() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['camera'], //从相机拍摄
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
  formSubmit: function(e) {
    let that = this
    // wx.compressImage({
    //   src: this.data.imgList[0], // 图片路径
    //   quality: 80,
    //   success(res) {
        wx.uploadFile({
          url: app.globalData.Url + "/hiddens/upload",
          filePath: that.data.imgList[0],
          name: 'file',
          success(res) {
            console.log(res)
            wx.request({
              url: app.globalData.Url + "/hiddens",
              data: {
                type: that.data.type,
                position: e.detail.value.position,
                title: e.detail.value.title,
                detail: e.detail.value.detail,
                image: res.data,
                user_id: wx.getStorageSync('UserData').user_id
              },
              header: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
              },
              method: 'POST',
              dataType: 'json',
              responseType: 'text',
              success: function(res) {
                console.log(res)
                if (res.statusCode == 201) {
                  wx.navigateBack({
                    delta: 1
                  });
                  wx.showToast({
                    title: '提交成功',
                    duration: 1500
                  });
                }
              },
              fail: function(res) {},
              complete: function(res) {},
            })
          }
        })
    //   }
    // })

  },
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },
  checkboxChange(e) {
    this.setData({
      type: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})