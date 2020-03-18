// pages/book/book.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
    bookBrief: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},
  // takePhoto() {
  //   const ctx = wx.createCameraContext()
  //   ctx.takePhoto({
  //     quality: 'high',
  //     success: (res) => {
  //       this.setData({
  //         src: res.tempImagePath
  //       })
  //     }
  //   })
  // },
  scanCode() {
    wx.scanCode({
      success: res => {
        wx.showLoading({
          title: '加载中'
        });
        console.log("res", res);

        wx.cloud.callFunction({
          name: "getisbn",
          data: {
            isbn: res.result
          }
          // succcess: res => {
          //   console.log("success", res);
          //   wx.hideLoading();
          // },
          // fail: err => {
          //   console.log("err", err);
          // },
          // complete: () => {}
        }).then(res => {
          console.log('success', res);
          this.setData({
            bookBrief: res.result
          })
          wx.hideLoading();
        }).catch(err => {
          console.log('err', err);
          wx.hideLoading();
        });
      },
      fail: err => {
        wx.showToast({
          title: "扫码失败，请稍后再试"
        });
      }
    });
  },

  checkDetail() {
    wx.navigateTo({
      url: '/pages/h5/h5?url=' + this.data.bookBrief.id
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
