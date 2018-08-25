//app.js

// Import Towxml
const Towxml = require('/towxml/main');

App({
  onLaunch: function () {
  },
  globalData: {
    userInfo: null
  },
  // Towxml
  towxml: new Towxml()
})