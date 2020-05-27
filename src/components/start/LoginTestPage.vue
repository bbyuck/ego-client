<template>
  <div class="login_page full">
    <div class="title_container">
      <div class="sub_title">e스포츠 팀 매칭 서비스</div>
      <div class="title">We Go With EGO</div>
    </div>

    <div class="banner_logo" v-on:click="alertTest">
      <img v-bind:src="'./src/assets/images/design/ego-title.png'" alt />
    </div>

    <div class="bottom_area">
      <div class="shape-14-copy">
        <img v-bind:src="'./src/assets/images/design/shape-14-copy.png'" alt />
      </div>

      <div class="red-trio">
        <img v-bind:src="'./src/assets/images/design/red-trio.png'" alt />
      </div>
      <div class="blue">
        <img v-bind:src="'./src/assets/images/design/blue.png'" alt />
      </div>

      <div class="bottom_bg">
        <div class="btn_container">
          <div class="login_btn kakao_login" v-on:click="kakaoLogin">
            <img v-bind:src="'./src/assets/images/button/kakao-login.png'" alt />
          </div>
        </div>
      </div>

      <div class="red">
        <img v-bind:src="'./src/assets/images/design/red.png'" alt />
      </div>

      <div class="shape-14">
        <img v-bind:src="'./src/assets/images/design/shape-14.png'" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    kakaoLogin: function() {
      this.$emit("kakaoLogin");
    },
    alertTest: function() {
      function alertDismissed() {
        // do something
      }

      navigator.notification.alert(
        "You are the winner!", // message
        alertDismissed, // callback
        "Game Over", // title
        "Done" // buttonName
      );
    }
  }
};
</script>

<style>
.login_page {
  text-align: center;
  background-color: white;
  overflow: hidden;
}

.title_container {
  width: 100%;
  position: absolute;
  top: 5.2%;
}

.sub_title {
  font-family: NotoSansKR;
  height: 21px;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.45;
  letter-spacing: normal;
  color: #5f3049;
  text-align: center;
}

.title {
  font-family: Roboto;
  font-size: 32px;
  font-weight: 100;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.45;
  letter-spacing: normal;
  text-align: center;
  color: #5f3049;
}

.banner_logo {
  position: absolute;
  top: 24.4%;
}

.banner_logo img {
  width: 64.3%;
}

.shape-14 {
  width: 36.9%;
  position: absolute;
  bottom: 33.7%;
  right: 0;
  object-fit: contain;
}
.shape-14 img {
  width: 100%;
}

.red {
  width: 16%;
  position: absolute;
  left: 39.7%;
  bottom: 33%;
}
.red img {
  width: 100%;
}

.red-trio {
  width: 31.5%;
  position: absolute;
  right: 9.1%;
  bottom: 34.3%;
}

.red-trio img {
  width: 100%;
}

.blue {
  width: 27.2%;
  position: absolute;
  left: 3.1%;
  bottom: 33%;
}

.blue img {
  width: 100%;
}

.shape-14-copy {
  width: 48%;
  position: absolute;
  right: -6.5%;
  bottom: 31.8%;
  object-fit: contain;
}

.shape-14-copy img {
  width: 100%;
}

.bottom_bg {
  position: absolute;
  bottom: 0;
  height: 34.6%;
  width: 100%;
  background-color: #5f3049;
}

.btn_container {
  text-align: center;
  width: 100%;
  height: 100%;
}

.login_btn {
  display: inline-block;
  width: 60%;
}

.login_btn img {
  width: 100%;
}

.kakao_login {
  position: relative;
  top: 38.6%;
}
</style>