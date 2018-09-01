var Network = require('../../utils/network.js')
var Constants = require('../../utils/constants.js')

var page = 1

Page({

  /**
   * 页面的初始数据
   */
  data: {
    repos: [],
    listHeight: 0,
    listWidth: 0,
    repoColOne: [],
    repoColTwo: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    wx.startPullDownRefresh()

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          listHeight: res.windowHeight,
          listWidth: res.windowWidth * 0.48
        })

        that.loadProfileRepos()
      },
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    page += 1

    wx.showLoading({
      title: Constants.MESSAGE_LOADING,
    })

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
          that.setData({
            repos: data.data
          })
        } else {
          wx.hideLoading()

          var rawRepos = that.data.repos

          for (var i = 0; i < data.data.length; i += 1) {
            rawRepos.push(data.data[i])
          }

          that.setData({
            repos: rawRepos
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