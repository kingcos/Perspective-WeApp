var Network = require('../../utils/network.js')
var Constants = require('../../utils/constants.js')

var page = 1

Page({

  /**
   * 页面的初始数据
   */
  data: {
    repoColOne: [],
    repoColTwo: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    wx.startPullDownRefresh()

    that.loadProfileRepos()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.loadProfileRepos()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  loadProfileRepos: function () {
    // Saved `this` Page
    var that = this

    Network.fetchProfileRepos(page, function (data) {
      if (data.status == 0) {
        wx.stopPullDownRefresh()

        if (page == 1) {
          var reposOne = []
          var reposTwo = []

          for (var i = 0; i < data.data.length; i += 1) {
            if (i % 2 == 0) {
              reposOne.push(data.data[i])
            } else {
              reposTwo.push(data.data[i])
            }
          }

          that.setData({
            repoColOne: reposOne,
            repoColTwo: reposTwo
          })
        } else {
          wx.hideLoading()

          var reposOne = that.data.repoColOne
          var reposTwo = that.data.repoColTwo

          for (var i = 0; i < data.data.length; i += 1) {
            if (i % 2 == 0) {
              reposOne.push(data.data[i])
            } else {
              reposTwo.push(data.data[i])
            }
          }

          that.setData({
            repoColOne: reposOne,
            repoColTwo: reposTwo
          })
        }
      } else {
        wx.showToast({
          title: data.message,
        })
      }
    })
  }
})