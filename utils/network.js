var Constants = require('constants.js')

module.exports = {
  // Request - Ariticles
  fetchArticles: function (callback) {
    wx.request({
      url: Constants.API_ARTICLES_URL,
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