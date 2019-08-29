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
    multiArray:[],
    selectList: [],
    multiIndex:[0,0,0],
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
        laboratory_build: this.data.multiArray[0][this.data.multiIndex[0]],
        laboratory_class: this.data.multiArray[1][this.data.multiIndex[1]],
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
        //TODO:返回上一页并刷新
        setTimeout(function () {
          wx.navigateBack({});
        }, 1500)
      }
    });
  },

  MultiColumnChange:function(e){

    this.data.multiIndex[e.detail['column']] = e.detail['value'];
    
    var multiArray0 = "multiArray[0]";
    var multiArray1 = "multiArray[1]";
    var multiArray2 = "multiArray[2]";

    var arr = this.data.multiIndex;
    var data = this.data.selectList;

    var classroom = [];
    var name = [];

    var i = 0;

    for( i ; i < data[arr[0]+""]["children"].length ; i++){
      classroom[i] = data[arr[0] + ""]["children"][i + ""]["0"]["0"];
      console.log(classroom[i]);
    }
    this.setData({
      [multiArray1]: classroom,
    })

    for (var j = 0; j < data["0"]["children"]["0"]["children"].length; j++) {
      name[j] = data[arr[0] + ""]["children"][arr[1] + ""]["children"]["0"];
    }

    this.setData({
      [multiArray2]: name,
    })

  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var build = [];
    var classroom = [];

    wx.request({
      url: app.globalData.Url + "/getlaboratory/List/" + wx.getStorageSync('UserData').unit_id,
      success(res){
        that.setData({
          selectList:res.data
        })

        console.log(res.data);
        for(var i = 0 ; i < res.data.length ; i++){
          build[i] = res.data[i + ""]["0"];
        }

        var multiArray0 = "multiArray[0]";
        that.setData({
          [multiArray0]: build,
        })

        var multiArray1 = "multiArray[1]";
        var multiArray2 = "multiArray[2]";
        
        var name = [];

        for (var i = 0; i < res.data["0"]["children"].length; i++) {
          classroom[i] = res.data["0"]["children"][i+""]["0"]["0"];
        }
        that.setData({
          [multiArray1]: classroom,
        })

        for (var j = 0; j < res.data["0"]["children"]["0"]["children"].length; j++) {
          name[j] = res.data["0"]["children"][j + ""]["children"]["0"];
        }

        that.setData({
          [multiArray2]: name,
        })
      }
    });
    console.log(this)
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