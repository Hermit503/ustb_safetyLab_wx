// pages/function/notice/messageDetail.js
const app = new getApp();
var common = require('../../../utils/util.js');
Page({

      /**
       * 页面的初始数据
       */
      data: {
        name: '',
        id: '',
        title: null,
        comment: null,
        pictures: null,
        file: null,
        url: app.globalData.Domain,
        isReceived: null,
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function(options) {
        var that = this;
        console.log(options.received);
        that.setData({
          id: options.id,
          name: options.name,
          title: options.title,
          comment: options.comment,
          pictures: JSON.parse(options.pictures),
          isReceived: options.received,
          // file: options.file
        })
        console.log(that.data)
      },

      showModal(e) {
        this.setData({
          modalName: e.currentTarget.dataset.target,
          id: e.target.dataset.id
        });
      },
      hideModal(e) {
        this.setData({
          modalName: null
        })
      },

      //图片预览
      previewImg: function(e) {
        console.log(e.currentTarget.dataset.index);
        var index = e.currentTarget.dataset.index;
        var i = 0;
        var imgArr = [];
        for (i; i < this.data.pictures.length; i++) {
          imgArr[i] = this.data.url + this.data.pictures[i];
        }

        wx.previewImage({
          current: imgArr[index], //当前图片地址
          urls: imgArr, //所有要预览的图片的地址集合 数组形式
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
      },

      //收到消息
      receiveNotice: function(e) {
        var that = this;
        wx.request({
              url: app.globalData.Url + "/notice/receiveNotice",
              data: {
                id: that.data.id,
                user: wx.getStorageSync('UserData').user_id,
              },
              success: function(res) {
                wx.showToast({
                  title: res.data,
                })
                console.log(res.data);

                setTimeout(function () {
                  let pages = getCurrentPages();  // 当前页的数据，可以输出来看看有什么东西
                  let prevPage = pages[pages.length - 2];  // 上一页的数据，也可以输出来看看有什么东西
                  
                  prevPage.changeData();
                  wx.navigateBack({
                  
                  })
                }, 1500)
                }
              })
        common.clearHistoryMessageList();
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