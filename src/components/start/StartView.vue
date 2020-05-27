<template>
  <v-ons-page class="start_view">
    <login-page
      v-on:kakaoLogin="KakaoLogin"
      v-on:unlinkKakao="unlinkKakao"
      v-on:next="temporary_start"
    ></login-page>
    <!-- <login-test-page v-on:kakaoLogin="test_start"></login-test-page> -->
  </v-ons-page>
</template>

<script>
import LoginPage from "./LoginPage.vue";
import LoginTestPage from "./LoginTestPage.vue";
import { sendAuthInfo } from "../../api/index";

var kakaoAuthRes = {};

export default {
  components: {
    LoginPage,
    LoginTestPage
  },
  methods: {
    temporary_start: function() {
      this.$emit("start");
    },
    unlinkKakao: function(res) {
      let success = function() {
        window.alert(
          "id : " +
            JSON.stringify(res) +
            "님의 카카오톡과 어플리케이션 연결이 끊어졌습니다."
        );
      };
      let failed = function(res) {
        window.alert(
          "카카오톡 연결 해제 실패\n에러코드 : " + JSON.stringify(res)
        );
      };
      KakaoCordovaSDK.unlinkApp(success, failed);
    },
    KakaoLogin: function() {
      let loginOptions = {
        authTypes: [1]
      };

      let success = function(res) {
        window.alert(JSON.stringify(res));
        sendAuthInfo(res);
        kakaoAuthRes = res;
      };
      let failed = function(message) {
        window.alert(JSON.stringify(message));
      };

      KakaoCordovaSDK.login(loginOptions, success, failed);
    }
  }
};
</script>

<style>
.start_view {
  overflow: hidden;
}
</style>