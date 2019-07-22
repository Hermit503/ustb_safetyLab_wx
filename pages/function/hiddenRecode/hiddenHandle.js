// pages/function/hiddenRecode/hiddenHandle.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [],
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    let that = this;
    wx.request({
      url: app.globalData.Url + '/hiddens/' + options.id,
      data: {
        user_id: options.id,
        title: options.title
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      method: 'PUT',
      success: function(res) {
        console.log(res)
        if (res.data['detail'][0].isSolve == 1) {
          that.setData({
            isSolve: true,
          })
        } else {
          that.setData({
            isSolve: false
          })
        }
        that.setData({
          detail: res.data['detail'][0],
          user: res.data['user'],
          addImage:false
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  changeSwitch: function(e) {
    console.log(e.detail.value)
    let that = this
    if (e.detail.value) {
      that.setData({
        addImage: true
      })
      console.log(this.data.addImage)
    }else{
      that.setData({
        addImage: false
      })
      console.log(this.data.addImage)
    }
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