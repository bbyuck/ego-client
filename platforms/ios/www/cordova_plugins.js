cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-kakao-sdk.AuthConstant",
      "file": "plugins/cordova-plugin-kakao-sdk/www/AuthConstant.js",
      "pluginId": "cordova-plugin-kakao-sdk",
      "clobbers": [
        "AuthConstant"
      ]
    },
    {
      "id": "cordova-plugin-kakao-sdk.KakaoCordovaSDK",
      "file": "plugins/cordova-plugin-kakao-sdk/www/KakaoCordovaSDK.js",
      "pluginId": "cordova-plugin-kakao-sdk",
      "clobbers": [
        "KakaoCordovaSDK"
      ]
    },
    {
      "id": "cordova-plugin-vibration.notification",
      "file": "plugins/cordova-plugin-vibration/www/vibration.js",
      "pluginId": "cordova-plugin-vibration",
      "merges": [
        "navigator"
      ]
    },
    {
      "id": "cordova-plugin-statusbar.statusbar",
      "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
      "pluginId": "cordova-plugin-statusbar",
      "clobbers": [
        "window.StatusBar"
      ]
    },
    {
      "id": "cordova-plugin-splashscreen.SplashScreen",
      "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
      "pluginId": "cordova-plugin-splashscreen",
      "clobbers": [
        "navigator.splashscreen"
      ]
    },
    {
      "id": "cordova-plugin-inappbrowser.inappbrowser",
      "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
      "pluginId": "cordova-plugin-inappbrowser",
      "clobbers": [
        "cordova.InAppBrowser.open",
        "window.open"
      ]
    },
    {
      "id": "cordova-plugin-dialogs.notification",
      "file": "plugins/cordova-plugin-dialogs/www/notification.js",
      "pluginId": "cordova-plugin-dialogs",
      "merges": [
        "navigator.notification"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-kakao-sdk": "3.0.6",
    "cordova-plugin-vibration": "3.1.1",
    "cordova-plugin-statusbar": "2.4.3",
    "cordova-plugin-splashscreen": "5.0.3",
    "cordova-plugin-inappbrowser": "3.2.0",
    "cordova-plugin-dialogs": "2.0.2"
  };
});