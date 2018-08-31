var Constants = require('constants.js')

module.exports = {
  // Request - Ariticles
  fetchArticles: function (page, callback) {
    wx.request({
      url: Constants.API_ARTICLES_URL + "?page=" + page,
      success: function (response) {
        callback(response.data)
      },
      fail: function () {
        wx.showToast({
          title: Constants.MESSAGE_ERROR_REQUEST_FAILED,
        })
      }
    })
  },
  // Request - Ariticle details
  fetchArticleDetails: function (articleNumber, callback) {
    wx.request({
      url: Constants.API_ARTICLE_DETAILS_URL + articleNumber,
      success: function (response) {
        callback(response.data)
      },
      fail: function () {
        wx.showToast({
          title: Constants.MESSAGE_ERROR_REQUEST_FAILED,
        })
      }
    })
  }
}