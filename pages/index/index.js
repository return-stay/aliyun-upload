//index.js
//获取应用实例
const app = getApp()
var uploadImage = require('../../utils/uploadFile.js');
var util = require('../../utils/util.js');

Page({
  data: {

  },

  //选择照片
  choose: function() {
    wx.chooseImage({
      count: 1, // 默认最多一次选择9张图
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var nowTime = util.formatTime(new Date());

        console.log(tempFilePaths)
        console.log(nowTime)

        //支持多图上传
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          //显示消息提示框
          wx.showLoading({
            title: '上传中' + (i + 1) + '/' + res.tempFilePaths.length,
            mask: true
          })

          //上传图片
          //你的域名下的/cbb文件下的/当前年月日文件下的/图片.png
          //图片路径可自行修改
          uploadImage(res.tempFilePaths[i], 'activity/' + nowTime + '/',
            function(result) {
              console.log("======上传成功图片地址为：", result);
              wx.hideLoading();
            },
            function(result) {
              console.log("======上传失败======", result);
              wx.hideLoading()
            }
          )
        }
      }
    })
  },
  chooses: function() {
    wx.chooseImage({
      count: 1,
      success: function(res) {
        console.log(res)
        var  imageSrc = res.tempFilePaths[0];
        wx.uploadFile({
          url: 'https://netsafe.org.cn/',
          filePath: imageSrc,
          name: 'file',
          formData: {
            name: res.tempFilePaths[0],
            key: 'logo/2019-01-03/154650051291884.png',
            policy: 'eyJleHBpcmF0aW9uIjoiMjAyOC0xMi0zMVQwNzoyODozMi45MThaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsNTI0Mjg4MF1dfQ==',
            OSSAccessKeyId: 'LTAIIy2bZPjvL2fx',
            success_action_status: '200',
            signature: 'ejZWCLhbpVDfE9axPGo8E4fE06Q=',
          },
          success: function(res) {
            console.log(res);
          }
        })
      },
    })
  }
})