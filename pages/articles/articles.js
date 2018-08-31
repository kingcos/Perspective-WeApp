var Network = require('../../utils/network.js')
var page = 1

Page({

  /**
   * 页面的初始数据
   */
  data: {
    articles: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // Saved `this` Page
    var that = this

    wx.showLoading()

    page = 1
    Network.fetchArticles(page, function (data) {
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

    page = 1
    Network.fetchArticles(page, function (data) {
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
    // Saved `this` Page
    var that = this

    wx.showLoading()

    page += 1

    Network.fetchArticles(page, function (data) {
      wx.hideLoading()

      if (data.status == 0) {
        var rawArticles = that.data.articles
        
        for (var i = 0; i < data.data.length; i += 1) {
          rawArticles.push(data.data[i])
        }

        that.setData({
          articles: rawArticles
        })
      } else {
        wx.showToast({
          title: data.message,
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  readDetails: function (event) {
    wx.navigateTo({
      url: '../details/details?number=' + event.currentTarget.id
    })
  }
})