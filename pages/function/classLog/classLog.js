// pages/function/classLog/classLog.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picker: [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42],
    multiArray: [['计算机', '通信', '自动化', '材料', '土木'], ['1701', '1702', '1703', '1704', '1705', '1706']],
    status: '正常',
    multiIndex: [],
    multiindex: [],
    role:[]
  },

  bindMultiPickerChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerchange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiindex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    //console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };

    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['1701', '1702', '1703', '1704', '1705', '1706'];
            break;
          case 1:
            data.multiArray[1] = ['1601', '1602', '1701', '1702', '1801', '1802'];
            break;
          case 2:
            data.multiArray[1] = ['1601', '1602', '1701', '1702', '1801', '1802'];
            break;
          case 3:
            data.multiArray[1] = ['1601', '1602', '1603', '1701', '1702', '1703', '1801', '1802'];
            break;
          case 4:
            data.multiArray[1] = ['1601', '1701', '1801'];
            break;
        }
        break;
    }
    this.setData(data);
  },
  bindMultiPickerColumnchange(e) {
    let that = this
    console.log(e.detail)
    var data = {
      multiarray: that.data.multiarray,
      multiindex: that.data.multiindex
    };

    data.multiindex[e.detail.column] = e.detail.value;
    var a = [];
    var s = 0;
    switch (e.detail.column) {
      case 0:
        switch (data.multiindex[0]) {
          case 0:
            for (s; s < that.data.class[0].length; s++) {
              a.push(that.data.class[0][s].classroom_num + "-" + that.data.class[0][s].laboratory_name)
            }
            data.multiarray[1] = a;
            break;
          case 1:
            for (s; s < that.data.class[1].length; s++) {
              a.push(that.data.class[1][s].classroom_num + "-" + that.data.class[1][s].laboratory_name)
            }
            data.multiarray[1] = a;
            break;
          case 2:
            for (s; s < that.data.class[2].length; s++) {
              a.push(that.data.class[2][s].classroom_num + "-" + that.data.class[2][s].laboratory_name)
            }
            data.multiarray[1] = a;
            break;
          case 3:
            for (s; s < that.data.class[3].length; s++) {
              a.push(that.data.class[3][s].classroom_num + "-" + that.data.class[3][s].laboratory_name)
            }
            data.multiarray[1] = a;
            break;
          case 4:
            for (s; s < that.data.class[4].length; s++) {
              a.push(that.data.class[4][s].classroom_num + "-" + that.data.class[4][s].laboratory_name)
            }
            data.multiarray[1] = a;
            break;
          case 5:
            for (s; s < that.data.class[5].length; s++) {
              a.push(that.data.class[5][s].classroom_num + "-" + that.data.class[5][s].laboratory_name)
            }
            data.multiarray[1] = a;
            break;
          case 6:
            for (s; s < that.data.class[6].length; s++) {
              a.push(that.data.class[6][s].classroom_num + "-" + that.data.class[6][s].laboratory_name)
            }
            data.multiarray[1] = a;
            break;
        }
        break;
    }
    this.setData(data);

  },

  Change(e) {
    let that = this;
    if (e.detail.value == true) {
      that.setData({
        status: '正常'
      })
    } else {
      that.setData({
        status: '存在异常'
      })
    }
  },

  PickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },
  experimentNameInput: function (e) {
    this.setData({
      experimentName: e.detail.value
    })
  },


  submit(e) {
    let that = this
    wx.request({
      url: app.globalData.Url + "/createClassLog",
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data: {
        experimentalName:that.data.experimentName,
        buildingName:that.data.multiarray[0][that.data.multiindex[0]],
        classroomNum:that.data.multiarray[1][that.data.multiindex[1]],
        className:that.data.multiArray[0][that.data.multiIndex[0]],
        classNum:that.data.multiArray[1][that.data.multiIndex[1]],
        studentNum:parseInt(that.data.index) + 15,
        status:that.data.status,
        teacherName:wx.getStorageSync('UserData').name,
        phoneNum:wx.getStorageSync('UserData').phone_number
      },
      success(res) {
        console.log(res)
        if(res.statusCode==200){
          wx.showToast({
            title: '提交完成',
            duration: 2000,
            success:function(res){
              wx.redirectTo({
                url: '../../index/index',
              })
            }
          });
        }
      }
    })
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    let that = this;
    that.setData({
      role:wx.getStorageSync('Roles')[0]
    })
    if (wx.getStorageSync('Roles') == "实验室管理员"||wx.getStorageSync('Roles')=='教师'){
      wx.request({
        url: app.globalData.Url + "/getLaboratoryList",
        method: 'GET',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data: {},
        success(res) {

          const arr = [];
          var i = 0;
          for (i; i < res.data[0].length; i++) {
            console.log(res.data)
            arr.push(res.data[0][i].classroom_num + "-" + res.data[0][i].laboratory_name);
          }
          console.log(arr);
          that.setData({
            class: res.data,
            multiarray: [['10教', '11教', '12教', '3教', '5教', '6教', '7教'], arr],
          })
        }
      })
    }else{
      wx.request({
        url: app.globalData.Url+'/classLog',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data:{},
        method:'GET',
        success(e){
          console.log(e)
          that.setData({
            classLog:e.data
          })
        },
      })
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