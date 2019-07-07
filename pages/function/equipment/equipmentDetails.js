// pages/function/equipmentDetails/equipmentDetails.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    equipmentid:'',
    assetnumber:'',
    equipmentname:'',
    text:'请选择',
    tindex: null,
    sindex:null,
    tpicker: ['特种设备', '普通设备'],
    spicker: ['正常', '维修','报废'],
    multiArray: [
      ['1教', '2教'],
      ['101', '102', '103']
    ],
    objectMultiArray: [
      [{
        id: 0,
        name: '1教'
      },
      {
        id: 1,
        name: '2教'
      }
      ],
      [{
        id: 0,
        name: '101'
      },
      {
        id: 1,
        name: '102'
      },
      {
        id: 2,
        name: '103'
      }],
    ],
    storagedate: '2018-12-25',
    scrapdate: '2018-12-25',
  },

  setequipmentid:function(e){
    this.setData({
      equipmentid:e.detail.value
    });
  },

  setassetnumber: function (e) {
    this.setData({
      assetnumber: e.detail.value
    });
  },

  setequipmentname: function (e) {
    this.setData({
      equipmentname: e.detail.value
    });
  },

  getAsset:function(){
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        console.log('调用成功');
      }
    });
  },

  PickerChange(e) {
    this.setData({
      tindex: e.detail.value
    })
  },

  SPickerChange(e) {
    this.setData({
      sindex: e.detail.value
    })
  },

  StorageDateChange(e) {
    this.setData({
      storagedate: e.detail.value
    })
  },

  ScrapDateChange(e) {
    this.setData({
      scrapdate: e.detail.value
    })
  },

  MultiChange(e) {
    this.setData({
      text:'',
      multiIndex: e.detail.value
    })
  },

  submit:function(e){
    wx.request({
      url: app.globalData.Url+'/equipment/add',
      data:{
        asset_number: this.data.assetnumber,
        equipment_name: this.data.equipmentname,
        equipment_type: this.data.tpicker[this.data.tindex],
        laboratory_id: this.data.multiArray[0][this.data.multiIndex[0]] + this.data.multiArray[1][this.data.multiIndex[1]],
        build_id: wx.getStorageSync('UserData').id,
        unit_id: wx.getStorageSync('UserData').unit_id,
        status: this.data.spicker[this.data.sindex],
        storage_time: this.data.storagedate,
        scrap_time: this.data.scrapdate
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success(res) {
        console.log(res.data);
        wx.showToast({
          title: res.data,
          duration: 2000,
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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