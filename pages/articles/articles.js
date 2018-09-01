var Network = require('../../utils/network.js')
var Constants = require('../../utils/constants.js')

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
    page = 1
    this.loadArticles()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    page = 1
    this.loadArticles()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    page += 1
    this.loadArticles()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  loadArticles: function () {
    // Saved `this` Page
    var that = this

    wx.showLoading({
      title: Constants.MESSAGE_LOADING,
    })

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

  readDetails: function (event) {
    wx.navigateTo({
      url: '../details/details?number=' + event.currentTarget.id
    })
  }
})