// pages/function/user/user.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    equipmentList: {},
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    id: null,
    keyword: '',
    tabletitle: 1,
    msgdisplay: 'none',
    msg: '',
    page: 1,
    height: 0,
    updateDisplay: 'none'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getSystemInfo({
      success: function(res) {
        console.log(res.windowHeight)
        that.setData({
          height : res.windowHeight
        })
      },
    })
    wx.request({
      url: app.globalData.Url + "/equipments",
      data: {
        unit_id: wx.getStorageSync('UserData').unit_id,
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success(res) {
        console.log(res.data.data);
        that.setData({
          equipmentList: res.data.data,
          permissionList: wx.getStorageSync('Permission')
        })
      }
    });
    //判断有没有修改设备信息的权限，没有的话就不显示
    let userPermission = wx.getStorageSync('Permission');
    var permission = userPermission.find(function (value) {
      if (value == 'updateEquipment') {
        that.setData({
          updateDisplay: 1
        })
      }
    })
  },

  //分页
  onReachBottom: function (e) {
    var that = this;
    that.data.page += 1;
    var page = that.data.page;
    console.log(page);
    wx.request({
      url: app.globalData.Url + "/equipments?page="+page,
      data: {
        unit_id: wx.getStorageSync('UserData').unit_id,
      },
      success(res){
        console.log(res.data.data);
        that.setData({
          //向页面已有数据后面加数据
          equipmentList: that.data.equipmentList.concat(res.data.data),
        })
        that.data.height = that.data.height+100;
        if (res.data.data == '') {
          wx.showToast({
            // icon: ,
            title: '没有更多数据',
          })
        }
      }
    })
  },

  setkeyword: function (e) {
    this.setData({
      keyword: e.detail.value
    });
  },
  searchEquipment: function (e) {
    console.log(this.data.keyword);
    var that = this;
    wx.request({
      url: app.globalData.Url + "/searchEquipment",
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data: {
        keyword: that.data.keyword
      },
      success(res) {
        console.log(typeof res.data);
        if (typeof res.data == "string") {
          that.setData({
            equipmentList: [],
            tabletitle: 'none',
            msgdisplay: 1,
            msg: res.data
          })
        } else {
          that.setData({
            msgdisplay: 'none',
            tabletitle: 1,
            equipmentList: res.data,
          })
        }
      }
    })
  },
  //增加设备跳转页面
  addEquipment: function (e) {
    let userPermission = wx.getStorageSync('Permission');
    //判断是否有设备管理的权限
    var permission = userPermission.find(function (value) {
      if (value == 'createEquipment') {
        wx.navigateTo({
          url: '../../function/equipment/equipmentDetails',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
        return 1;
      } else {
        wx.showToast({
          title: '你没有权限哦',
          icon: 'none'
        })
      }
    });
  },
  //删除设备显示模态框
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target,
      id: e.target.dataset.id
    });
  },
  hideModal(e) {
    this. setData({
      modalName: null
    })
  },
  deleteEquipment:function(e){
    var that = this;
    let userPermission = wx.getStorageSync('Permission');
    //判断是否有设备管理的权限
    var permission = userPermission.find(function (value) {
      if (value == 'createEquipment') {
    wx.request({
      url: app.globalData.Url + '/equipment/delete',
      data: {
        id: this.data.id
      },
      method: 'DELETE',
      success(res) {
        that.hideModal();
        that.onLoad();
      }
    })
      }else{
        wx.showToast({
          title: '你没有权限哦',
          icon: 'none'
        })
      }
    })
  },
  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
  exit: function () {
    wx.navigateTo({
      url: './pages/index/index',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})