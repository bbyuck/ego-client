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
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-kakao-sdk": "3.0.6"
  };
});