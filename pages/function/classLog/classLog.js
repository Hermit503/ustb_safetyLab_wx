// pages/function/classLog/classLog.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picker: [15, 16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42],
    multiArray: [['计算机', '通信', '自动化', '材料', '土木'], ['1701', '1702', '1703', '1704', '1705', '1706']],
    status: '正常',
    objectMultiArray: [
      [
        {
          id: 0,
          name: '计算机'
        },
        {
          id: 1,
          name: '通信'
        },
        {
          id: 2,
          name: '自动化'
        },
        {
          id: 3,
          name: '材料'
        },
        {
          id: 4,
          name: '土木'
        }
      ],
      [
        {
          id: 0,
          name: '1701'
        },
        {
          id: 1,
          name: '1702'
        },
        {
          id: 2,
          name: '1703'
        },
        {
          id: 3,
          name: '1704'
        },
        {
          id: 4,
          name: '1705'
        },
        {
          id: 5,
          name: '1706'
        }
      ]
    ],
    multiIndex: [],
  },
  bindMultiPickerChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
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
            data.multiArray[1] = ['1701', '1702', '1703','1704','1705','1706'];
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
  Change(e){
    let that = this
    console.log(e)
    console.log(e.detail.value)
    if(e.detail.value==true){
      that.setData({
        status: '正常'
      })
    }else{
      that.setData({
        status: '存在异常'
      })
    }
      

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  experimentNameInput: function (e) {
    this.setData({
      experimentName: e.detail.value
    })
  },


  submit(e){
    console.log(parseInt(this.data.index)+15)
    console.log(this.data.multiArray[0][this.data.multiIndex[0]] + this.data.multiArray[1][this.data.multiIndex[1]])
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