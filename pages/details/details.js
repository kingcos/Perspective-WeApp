var Network = require('../../utils/network.js')
var Constants = require('../../utils/constants.js')

const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    article: {},
    markdownEntry: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // Saved `this` Page
    var that = this

    wx.showLoading({
      title: Constants.MESSAGE_LOADING,
    })

    Network.fetchArticleDetails(options.number, function (data) {
      wx.hideLoading()

      if (data.status == 0) {
        let markdown = app.towxml.toJson(data.data.body, 'markdown');
        markdown.theme = 'light';

        that.setData({
          article: data.data,
          markdownEntry: markdown
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

})