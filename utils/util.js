const app = new getApp();
var historyList = [];
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//获取全部消息列表
function getAllMessageList () {
  var that = this;
  // var result = [];
  var i;
  wx.request({
    url: app.globalData.Url + '/notice/notices',
    data: {
      'user_id': wx.getStorageSync('UserData').user_id,
    },
    header: {},
    method: 'GET',
    dataType: 'json',
    responseType: 'text',
    success: function (res) {
      // console.log(res.data);
      for (i = 0; i < res.data.length; i++) {
        if (res.data[i]['noticeType'] == "chemical") {
          // res.data[i]['user_name_1'] 
          //自己的没处理的消息
          if (res.data[i]['user_id_2'] == wx.getStorageSync('UserData').user_id && res.data[i]['receive'] == "0") {
            res.data[i]['msg'] = "申请" + res.data[i]['type'] + res.data[i]['stock'] + res.data[i]['unit_type'] + res.data[i]['chemical_name'];
          }
          //自己申请的被驳回的消息
          if (res.data[i]['user_id_1'] == wx.getStorageSync('UserData').user_id && res.data[i]['receive'] == "1" && res.data[i]['isConfirm_2'] == "0") {
            res.data[i]['msg'] = "您申请" + res.data[i]['type'] + res.data[i]['stock'] + res.data[i]['unit_type'] + res.data[i]['chemical_name'] + "被驳回";
          }

        } else {
          res.data[i]['msg'] = res.data[i]['title'];
        }
      }
      wx.setStorageSync('length', res.data.length);
      app.globalData.messageList = res.data;
      console.log('调用成功')
    },
    fail: function (res) { },
    complete: function (res) { },
  })
}

//清除消息列表数据
function clearMessageList(){
  //先设置为空
  app.globalData.messageList = null;
  wx.request({
    url: app.globalData.Url + '/clearAllMessage',
    data:{
      user_id: wx.getStorageSync('UserData').user_id,
    },
    success: function (res) {
      getAllMessageList();
    },
    fail:function(res){
      console.log("请求失败");
    }
  })
}

//获取历史消息列表
function getHistoryMessage(startDate, endDate) {
  var that = this;
  wx.request({
    url: app.globalData.Url + '/notice/getHistoryMessage',
    data: {
      user_id: wx.getStorageSync('UserData').user_id,
      startDate: startDate,
      endDate: endDate,
    },
    success: function (res) {
      var user_id = wx.getStorageSync('UserData').user_id;
      for (var i = 0; i < res.data.length; i++) {
        if (res.data[i]['noticeType'] == "notice") {
          res.data[i]['msg'] = res.data[i]['title'];
        } else {
          //user_id_2是自己 101
          if (res.data[i]['user_id_2'] == user_id && res.data[i]['isConfirm_2'] == "0" && res.data[i]['receive'] == "1") {
            res.data[i]['msg'] = '您已驳回"' + res.data[i]['type'] + res.data[i]['stock'] + res.data[i]['unit_type'] + '的' + res.data[i]['chemical_name'] + '"';
          }
          //102
          if (res.data[i]['user_id_2'] == user_id && res.data[i]['receive'] == "2") {
            res.data[i]['msg'] = '您已驳回"' + res.data[i]['type'] + res.data[i]['stock'] + res.data[i]['unit_type'] + '的' + res.data[i]['chemical_name'] + '" 对方已读';
          }
          //111
          if (res.data[i]['user_id_2'] == user_id && res.data[i]['isConfirm_2'] == "1" && res.data[i]['receive'] == "1") {
            res.data[i]['msg'] = '您已同意"' + res.data[i]['type'] + res.data[i]['stock'] + res.data[i]['unit_type'] + '的' + res.data[i]['chemical_name'] + '"';
          }


          //user_id_1是自己 102
          if (res.data[i]['user_id_1'] == user_id && res.data[i]['isConfirm_2'] == "0" && res.data[i]['receive'] == "2") {
            res.data[i]['msg'] = '对方已驳回您的申请' + res.data[i]['type'] + res.data[i]['stock'] + res.data[i]['unit_type'] + '的' + res.data[i]['chemical_name'] + '"';
          }
        }
      }
      return res.data;
    },
    fail: function (res) { },
    complete: function (res) { },
  })
}

//清除历史消息
function clearHistoryMessageList() {
  wx.request({
    url: app.globalData.Url +'/clearHistoryMessage',
    data: {
      user_id: wx.getStorageSync('UserData').user_id
    },
    success: function(res) {
      console.log("清除成功");
    },
    fail: function(res) {},
    complete: function(res) {},
  })
}

//获取我的上传
function getMyUpload() {
  wx.request({
    url: app.globalData.Url + "/notice/getSomeoneNoticeList",
    data: {
      user_id: wx.getStorageSync('UserData').user_id,
    },
    success(res) {
      console.log(res.data.data)
      app.globalData.noticeList = res.data.data;
      wx.setStorageSync('uploadLength', res.data.data.length);
    }
  })
}

module.exports = {
  formatTime: formatTime,
  getAllMessageList: getAllMessageList,
  getHistoryMessage: getHistoryMessage,
  getMyUpload: getMyUpload,
  clearMessageList: clearMessageList,
  clearHistoryMessageList: clearHistoryMessageList
}
