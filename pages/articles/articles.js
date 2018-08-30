var Network = require('../../utils/network.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    articles: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // Saved `this` Page
    var that = this

    wx.showLoading()

    Network.fetchArticles(function (data) {
      wx.hideLoading()

      if (data.status == 0) {
        that.setData({
          articles: data.data
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
    // Saved `this` Page
    var that = this

    wx.showLoading()

    Network.fetchArticles(function (data) {
      wx.hideLoading()

      if (data.status == 0) {
        that.setData({
          articles: data.data
        })
      } else {
        wx.showToast({
          title: data.message,
        })
      }
    })
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