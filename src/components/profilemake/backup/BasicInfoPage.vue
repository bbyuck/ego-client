<template>
  <div>
    <div class="ingame_id_area center">
      <h3 class="title">소환사명 입력</h3>
      <p class="subtitle">소환사명을 입력해주세요.</p>
      <span class="input input--minoru">
        <input
          class="input__field input__field--minoru"
          type="text"
          id="ingameIdInput"
          v-on:input="typing"
          placeholder="입력"
        />
      </span>
    </div>

    <div class="position_select_area">
      <h3 class="title">포지션 선택</h3>
      <p class="subtitle">포지션을 선택해주세요.</p>
      <div class="position_btn_container">
        <div class="position_btn" v-on:click="topBtn">
          <img
            class="position_btn_img"
            v-bind:src="positionImgUrl('top_off.png')"
            v-show="top === 0"
          />
          <img
            class="position_btn_img"
            v-bind:src="positionImgUrl('top_on.png')"
            v-show="top === 1"
          />
          <img
            class="position_btn_img"
            v-bind:src="positionImgUrl('top_main.png')"
            v-show="top === 2"
          />
        </div>
        <div class="position_main_btn">
          <v-ons-button v-if="top === 1" v-on:click="selectMainPosition(0)">메인</v-ons-button>
        </div>
      </div>

      <div class="position_btn_container">
        <div class="position_btn" v-on:click="jgBtn">
          <img
            class="position_btn_img"
            v-bind:src="positionImgUrl('jungle_off.png')"
            v-show="jg === 0"
          />
          <img
            class="position_btn_img"
            v-bind:src="positionImgUrl('jungle_on.png')"
            v-show="jg === 1"
          />
          <img
            class="position_btn_img"
            v-bind:src="positionImgUrl('jungle_main.png')"
            v-show="jg === 2"
          />
        </div>
        <div class="position_main_btn">
          <v-ons-button v-if="jg === 1" v-on:click="selectMainPosition(1)">메인</v-ons-button>
        </div>
      </div>

      <div class="position_btn_container">
        <div class="position_btn" v-on:click="midBtn">
          <img
            class="position_btn_img"
            v-bind:src="positionImgUrl('mid_off.png')"
            v-show="mid === 0"
          />
          <img
            class="position_btn_img"
            v-bind:src="positionImgUrl('mid_on.png')"
            v-show="mid === 1"
          />
          <img
            class="position_btn_img"
            v-bind:src="positionImgUrl('mid_main.png')"
            v-show="mid === 2"
          />
        </div>
        <div class="position_main_btn">
          <v-ons-button v-if="mid === 1" v-on:click="selectMainPosition(2)">메인</v-ons-button>
        </div>
      </div>

      <div class="position_btn_container">
        <div class="position_btn" v-on:click="adBtn">
          <img class="position_btn_img" v-bind:src="positionImgUrl('ad_off.png')" v-show="ad === 0" />
          <img class="position_btn_img" v-bind:src="positionImgUrl('ad_on.png')" v-show="ad === 1" />
          <img
            class="position_btn_img"
            v-bind:src="positionImgUrl('ad_main.png')"
            v-show="ad === 2"
          />
        </div>
        <div class="position_main_btn">
          <v-ons-button v-if="ad === 1" v-on:click="selectMainPosition(3)">메인</v-ons-button>
        </div>
      </div>

      <div class="position_btn_container">
        <div class="position_btn" v-on:click="supBtn">
          <img
            class="position_btn_img"
            v-bind:src="positionImgUrl('support_off.png')"
            v-show="sup === 0"
          />
          <img
            class="position_btn_img"
            v-bind:src="positionImgUrl('support_on.png')"
            v-show="sup === 1"
          />
          <img
            class="position_btn_img"
            v-bind:src="positionImgUrl('support_main.png')"
            v-show="sup === 2"
          />
        </div>
        <div class="position_main_btn">
          <v-ons-button v-if="sup === 1" v-on:click="selectMainPosition(4)">메인</v-ons-button>
        </div>
      </div>
    </div>

    <div class="voice_switch_area center">
      <h3 class="title">보이스 설정</h3>
      <p class="subtitle">게임중 음성채팅 여부를 선택해주세요.</p>
      <div class="voice_switch_container">
        <div class="voice_switch" v-bind:class="{filter : !isVoiceOn}" v-on:click="voiceOn">
          <i class="fas fa-microphone mic"></i>
        </div>
        <div class="voice_switch" v-bind:class="{filter : isVoiceOn}" v-on:click="voiceOff">
          <i class="fas fa-microphone-slash mic"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      inputId: "",
      top: 0,
      jg: 0,
      mid: 0,
      ad: 0,
      sup: 0,
      mainSelected: false,
      mainIndex: Number,
      pageCompleted: false
    };
  },
  methods: {
    voiceOn: function() {
      this.$store.commit("voiceOn");
    },
    voiceOff: function() {
      this.$store.commit("voiceOff");
    },
    topBtn: function() {
      if (this.top === 0) {
        this.top = 1;
        this.$store.commit("positionOn", 0);
      } else {
        this.top = 0;
        this.$store.commit("positionOff", 0);
        if (this.mainIndex === 0) {
          this.mainSelected = false;
          this.mainIndex = -1;
        }
      }

      if (this.inpuId === "" || !this.mainSelected) {
        this.pageCompleted = false;
      } else {
        this.pageCompleted = true;
      }

      if (this.inputId === "") {
        this.pageCompleted = false;
      }

      this.$store.commit("basicInfoPageCanComplete", this.pageCompleted);
    },
    jgBtn: function() {
      if (this.jg === 0) {
        this.jg = 1;
        this.$store.commit("positionOn", 1);
      } else {
        this.jg = 0;
        this.$store.commit("positionOff", 0);
        if (this.mainIndex === 1) {
          this.mainSelected = false;
          this.mainIndex = -1;
        }
      }

      if (this.inpuId === "" || !this.mainSelected) {
        this.pageCompleted = false;
      } else {
        this.pageCompleted = true;
      }

      if (this.inputId === "") {
        this.pageCompleted = false;
      }

      this.$store.commit("basicInfoPageCanComplete", this.pageCompleted);
    },
    midBtn: function() {
      if (this.mid === 0) {
        this.mid = 1;
        this.$store.commit("positionOn", 2);
      } else {
        this.mid = 0;
        this.$store.commit("positionOff", 2);
        if (this.mainIndex === 2) {
          this.mainSelected = false;
          this.mainIndex = -1;
        }
      }

      if (this.inpuId === "" || !this.mainSelected) {
        this.pageCompleted = false;
      } else {
        this.pageCompleted = true;
      }

      if (this.inputId === "") {
        this.pageCompleted = false;
      }

      this.$store.commit("basicInfoPageCanComplete", this.pageCompleted);
    },
    adBtn: function() {
      if (this.ad === 0) {
        this.ad = 1;
        this.$store.commit("positionOn", 3);
      } else {
        this.ad = 0;
        this.$store.commit("positionOff", 3);
        if (this.mainIndex === 3) {
          this.mainSelected = false;
          this.mainIndex = -1;
        }
      }

      if (this.inpuId === "" || !this.mainSelected) {
        this.pageCompleted = false;
      } else {
        this.pageCompleted = true;
      }

      if (this.inputId === "") {
        this.pageCompleted = false;
      }

      this.$store.commit("basicInfoPageCanComplete", this.pageCompleted);
    },
    supBtn: function() {
      if (this.sup === 0) {
        this.sup = 1;
        this.$store.commit("positionOn", 4);
      } else {
        this.sup = 0;
        this.$store.commit("positionOff", 4);
        if (this.mainIndex === 4) {
          this.mainSelected = false;
          this.mainIndex = -1;
        }
      }

      if (this.inpuId === "" || !this.mainSelected) {
        this.pageCompleted = false;
      } else {
        this.pageCompleted = true;
      }

      if (this.inputId === "") {
        this.pageCompleted = false;
      }

      this.$store.commit("basicInfoPageCanComplete", this.pageCompleted);
    },
    selectMainPosition: function(index) {
      this.$store.commit("selectMainPosition", index);

      if (!this.mainSelected) {
        this.mainIndex = index;
        this.mainSelected = true;
      } else {
        switch (this.mainIndex) {
          case 0:
            this.top = 1;
            break;
          case 1:
            this.jg = 1;
            break;
          case 2:
            this.mid = 1;
            break;
          case 3:
            this.ad = 1;
            break;
          case 4:
            this.sup = 1;
            break;
          default:
            break;
        }

        this.mainIndex = index;
      }

      switch (index) {
        case 0:
          this.top = 2;
          break;
        case 1:
          this.jg = 2;
          break;
        case 2:
          this.mid = 2;
          break;
        case 3:
          this.ad = 2;
          break;
        case 4:
          this.sup = 2;
          break;
        default:
          break;
      }
      if (this.inpuId === "" || !this.mainSelected) {
        this.pageCompleted = false;
      } else {
        this.pageCompleted = true;
      }

      if (this.inputId === "") {
        this.pageCompleted = false;
      }

      this.$store.commit("basicInfoPageCanComplete", this.pageCompleted);
    },
    typing(e) {
      this.inputId = e.target.value;
      this.$store.commit("inputIngameId", this.inputId);
      if (this.inpuId === "" || !this.mainSelected) {
        this.pageCompleted = false;
      } else {
        this.pageCompleted = true;
      }

      if (this.inputId === "") {
        this.pageCompleted = false;
      }

      this.$store.commit("basicInfoPageCanComplete", this.pageCompleted);
    },
    positionImgUrl: function(name) {
      return "./src/assets/images/position/" + name;
    }
  },
  computed: {
    isVoiceOn: function() {
      return this.$store.state.isVoiceOn;
    }
  }
};
</script>

<style>
.position_btn_container {
  vertical-align: bottom;
}

@media (min-height: 500px) and (max-height: 599px) {
  .ingame_id_area {
    margin-top: 15%;
  }

  .position_select_area {
    margin-top: 2.5%;
    height: 200px;
  }

  .voice_switch_area {
    margin-top: 2.5%;
  }
}

@media (min-height: 600px) and (max-height: 699px) {
  .ingame_id_area {
    margin-top: 15%;
  }

  .position_select_area {
    height: 180px;
  }
}

@media (min-height: 700px) and (max-height: 799px) {
  .ingame_id_area {
    margin-top: 20%;
  }

  .position_select_area {
    height: 180px;
    margin-top: 5%;
  }

  .voice_switch_area {
    margin-top: 5%;
  }
}

@media (min-height: 800px) and (max-height: 900px) {
  .ingame_id_area {
    margin-top: 25%;
  }

  .position_select_area {
    height: 180px;
    margin-top: 10%;
  }

  .voice_switch_area {
    margin-top: 10%;
  }
}

.voice_switch_container {
  width: 100%;
  height: 100px;
}

.voice_switch {
  display: inline-block;
  width: 40%;
  height: 80px;
  margin-left: 4%;
  margin-right: 4%;
  background-color: #461f41;
}

.mic {
  color: white;
  font-size: 2.5em;
  margin-top: 12%;
}

.subtitle {
  color: gray;
}

/*
 * 포지션 버튼 css
 */

.input {
  margin-top: 0;
  margin-bottom: 0;
}

.position_btn_container {
  width: 55px;
  height: 100px;
  margin-left: 1%;
  margin-right: 1%;
  display: inline-block;
  background-size: 55px 50px;
}

.position_btn_img {
  width: 100%;
}

.position_select_area {
  text-align: center;
}

.position_btn {
  margin-top: 5px;
}

.pos_icon {
  color: white;
  font-size: 35px;
}

@media (min-width: 300px) and (max-width: 340px) {
  .position_btn_container {
    margin-left: 0;
    margin-right: 0;
  }
}

.filter {
  background-color: rgba(135, 111, 132, 0.6);
}
</style>