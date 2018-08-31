var Network = require('../../utils/network.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    articleNumber: '',
    article: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      articleNumber: options.number
    });

    // Saved `this` Page
    var that = this

    wx.showLoading()

    Network.fetchArticleDetails(options.number, function (data) {
      wx.hideLoading()

      if (data.status == 0) {
        that.setData({
          article: data.data
        })
      } else {
        wx.showToast({
          title: data.message,
        })
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  }
})