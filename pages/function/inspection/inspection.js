// pages/function/inspection/inspection.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [],
    type: 'hidden',
    up:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    wx.showLoading({
      title: '正在加载',
    })
    wx.request({
      url: app.globalData.Url + "/inspections",
      data: {
        id: options.id,
        unit_id:wx.getStorageSync('UserData').unit_id
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        wx.hideLoading({
          complete: (res) => {},
        })
        that.setData({
          inspection: res.data,
          inspection_id: options.id
        })
        if (res.data.status) {
          that.setData({
            status: res.data.status
          })
        } else {
          that.setData({
            status: '正常'
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  Change(e) {
    let that = this
    console.log(e)
    var t = this.data.inspection.status;
    if (e.detail.value == true) {
      that.setData({
        status: '正常',
        up:0
      })
    } else if (e.detail.value == false) {
      if (that.data.inspection.chemical_id) {
        that.setData({
          status: '存在问题',
          up:1
        })
      } else {
        that.setData({
          status: '维修',
          up:1
        })
      }

    }
  },

  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },

  Submit(e) {
    let that = this;
    wx.showLoading({
      title: '正在提交',
    })
    if (Object.keys(that.data.inspection)[9]=="CAS") {
      var type = "chemical";
    } else {
      var type = "equipment";
    }
    if((that.data.status=='正常'&&that.data.inspection.status=='正常')||(that.data.status=='存在问题'&&that.data.inspection.status=='存在问题')||(that.data.status=='维修'&&that.data.inspection.status=='维修')){
      let res={
        data:undefined
      };
      that.updateInspection(res,type);
    }else{
      wx.uploadFile({
        url: app.globalData.Url + "/hiddens/upload",
        filePath: that.data.imgList[0],
        name:'file',
        success(res) {
          that.updateInspection(res,type);
          
          console.log(res)
        }
      });
    }
  },
    updateInspection(res,type){
      let that = this;
      wx.request({
        url: app.globalData.Url + '/inspections/' + that.data.inspection_id,
        data: {
          id: that.data.inspection_id,
          unit_id: wx.getStorageSync('UserData').unit_id,
          type:type,
          repair_user: wx.getStorageSync('UserData').user_id,
          status: that.data.status,
          detail:that.data.textareaAValue,
          image:res.data,
          up:that.data.up,
          position:that.data.inspection.laboratories.building_name+that.data.inspection.laboratories.classroom_num,
          inspection_id:that.data.inspection_id,
          
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        method: 'PUT',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          console.log(res)
          if(res.data=='检修完成'&&res.statusCode==200){
            wx.hideLoading({
              complete: (res) => {},
            })
            wx.showToast({
              title: '检修完成',
              duration: 2000,
              success:function(res){
                wx.redirectTo({
                  url: '../../index/index',
                })
              }
            });
            
          }
        },
        fail: function(res) {},
        complete: function(res) {},
      })
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