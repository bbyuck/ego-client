<template>
  <div class="page_content">
    <div class="tab_title">보이스 채팅</div>
    <div class="tab_desc">게임중 회원님의 보이스 채팅 여부를 선택해주세요.</div>

    <div class="voice_area">
      <div class="voice_btn_container">
        <div class="voice_btn" v-on:click="micOnToggle">
          <img v-show="micOn" v-bind:src="btnUrl + 'mic_on_ON.png'" />
          <img v-show="!micOn" v-bind:src="btnUrl + 'mic_on_OFF.png'" alt />
        </div>
      </div>
      <div class="voice_btn_container">
        <div class="voice_btn" v-on:click="micOffToggle">
          <img v-show="!micOn" v-bind:src="btnUrl + 'mic_off_ON.png'" />
          <img v-show="micOn" v-bind:src="btnUrl + 'mic_off_OFF.png'" alt />
        </div>
      </div>
    </div>

    <div class="tab_title">포지션 선택</div>
    <div class="tab_desc">회원님의 포지션을 한 개 이상 선택해주세요.</div>
    <div class="position_area">
      <div class="position_btn_container">
        <div class="position_btn" v-on:click="topToggle">
          <img v-show="topBtnOn" v-bind:src="btnUrl + 'top_on.png'" />
          <img v-show="!topBtnOn" v-bind:src="btnUrl + 'top_off.png'" />
        </div>
      </div>
      <div class="position_btn_container">
        <div class="position_btn" v-on:click="jgToggle">
          <img v-show="jgBtnOn" v-bind:src="btnUrl + 'jg_on.png'" />
          <img v-show="!jgBtnOn" v-bind:src="btnUrl + 'jg_off.png'" />
        </div>
      </div>
      <div class="position_btn_container">
        <div class="position_btn" v-on:click="midToggle">
          <img v-show="midBtnOn" v-bind:src="btnUrl + 'mid_on.png'" />
          <img v-show="!midBtnOn" v-bind:src="btnUrl + 'mid_off.png'" />
        </div>
      </div>
      <div class="position_btn_container">
        <div class="position_btn" v-on:click="adToggle">
          <img v-show="adBtnOn" v-bind:src="btnUrl + 'ad_on.png'" />
          <img v-show="!adBtnOn" v-bind:src="btnUrl + 'ad_off.png'" />
        </div>
      </div>
      <div class="position_btn_container">
        <div class="position_btn" v-on:click="supToggle">
          <img v-show="supBtnOn" v-bind:src="btnUrl + 'sup_on.png'" />
          <img v-show="!supBtnOn" v-bind:src="btnUrl + 'sup_off.png'" />
        </div>
      </div>
      <div class="position_btn_container">
        <div class="position_btn"></div>
      </div>
    </div>

    <div class="shape-758_img">
      <img v-bind:src="'./src/assets/images/design/shape-758.png'" alt />
    </div>
    <div class="shape-10_img">
      <img v-bind:src="'./src/assets/images/design/shape-10.png'" alt />
    </div>
  </div>
</template>

<script scoped>
export default {
  data: function() {
    return {
      btnUrl: "./src/assets/images/profile_make_btn/",
      micOn: true,
      topBtnOn: false,
      jgBtnOn: false,
      midBtnOn: false,
      adBtnOn: false,
      supBtnOn: false
    };
  },
  methods: {
    micOnToggle: function() {
      this.micOn = true;
      this.$emit("micOn");
    },
    micOffToggle: function() {
      this.micOn = false;
      this.$emit("micOff");
    },
    topToggle: function() {
      if (this.topBtnOn === false) {
        this.topBtnOn = true;
        this.$emit("positionBtnTouch", "topOn");
      } else if (this.topBtnOn === true) {
        this.topBtnOn = false;
        this.$emit("positionBtnTouch", "topOff");
      }
    },
    jgToggle: function() {
      if (this.jgBtnOn === false) {
        this.jgBtnOn = true;
        this.$emit("positionBtnTouch", "jgOn");
      } else if (this.jgBtnOn === true) {
        this.jgBtnOn = false;
        this.$emit("positionBtnTouch", "jgOff");
      }
    },
    midToggle: function() {
      if (this.midBtnOn === false) {
        this.midBtnOn = true;
        this.$emit("positionBtnTouch", "midOn");
      } else if (this.midBtnOn === true) {
        this.midBtnOn = false;
        this.$emit("positionBtnTouch", "midOff");
      }
    },
    adToggle: function() {
      if (this.adBtnOn === false) {
        this.adBtnOn = true;
        this.$emit("positionBtnTouch", "adOn");
      } else if (this.adBtnOn === true) {
        this.adBtnOn = false;
        this.$emit("positionBtnTouch", "adOff");
      }
    },
    supToggle: function() {
      if (this.supBtnOn === false) {
        this.supBtnOn = true;
        this.$emit("positionBtnTouch", "supOn");
      } else if (this.supBtnOn === true) {
        this.supBtnOn = false;
        this.$emit("positionBtnTouch", "supOff");
      }
    }
  }
};
</script>

<style scoped>
.voice_area,
.position_area {
  text-align: center;
}

.voice_btn_container {
  width: 40%;
  display: inline-block;
}

.voice_btn img,
.position_btn img {
  width: 100%;
}

.position_btn_container {
  width: 26%;
  display: inline-block;
}

.shape-10_img {
  width: 31.7%;
  position: absolute;
  left: 35.3%;
  bottom: 10.9%;
}

.shape-10_img img {
  width: 100%;
}

.shape-758_img {
  width: 31.7%;
  position: absolute;
  right: 8.4%;
  bottom: 10.9%;
}

.shape-758_img img {
  width: 100%;
}
</style>