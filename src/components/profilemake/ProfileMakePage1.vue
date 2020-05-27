<template>
  <div class="page_content">
    <div class="tab_title">소환사명</div>
    <div class="tab_desc">회원님의 소환사명을 입력해주세요.</div>
    <div class="ingame_id_area">
      <input type="text" class="ingame_id_input" placeholder="소환사명 입력" v-on:input="typing" />
    </div>

    <div class="tab_title">티어 선택</div>
    <div class="tab_desc">회원님의 티어를 선택해주세요.</div>
    <div class="tier_area">
      <div class="tier_swipe_area">
        <v-ons-carousel
          swipeable
          auto-scroll
          overscrollable
          direction="vertical"
          auto-scroll-ratio="0.2"
          fullscreen="true"
          :index.sync="tierIndex"
          v-on:update:index="tierChange"
        >
          <v-ons-carousel-item
            class="swipe_slide"
            v-for="(tier, i) in tiers"
            v-bind:index="i"
            v-bind:key="i"
          >
            <div class="swipe_area">
              <img v-bind:src="tierImgUrl(i)" class="tier_img" />
            </div>
          </v-ons-carousel-item>
        </v-ons-carousel>
        <div class="high" v-on:click="tierUp">
          <i class="fas fa-angle-up"></i>
        </div>
        <div class="low" v-on:click="tierDown">
          <i class="fas fa-angle-down"></i>
        </div>
      </div>

      <div class="tier_detail_area">
        <div class="tier_text">
          <div class="completed_tier" v-if="!isHigh">{{ myTier }} {{ levels[levelIndex] }}</div>
          <div class="completed_tier" v-if="isHigh">
            {{ myTier }}
            <br />
            {{ myLp }} LP
          </div>
        </div>

        <transition name="fade" mode="out-in">
          <div class="tier_lev_container" v-if="!isHigh">
            <div
              v-for="(lev, index) in levels"
              v-on:click="levelSelected(index)"
              class="tier_lev_btn"
              v-bind:key="lev"
              v-bind:class="{filter : levelIndex !== index}"
            >{{ lev }}</div>
          </div>
          <!-- <v-ons-row width="40px" style="text-align: center; line-height: 31px;">
            <i class="fas fa-plus"></i>
          </v-ons-row>-->
          <v-ons-row class="lp_bar_container" v-if="isHigh">
            <v-ons-col>
              <v-ons-range v-model.number="lpInput" class="lp_bar" v-on:change="lpSet"></v-ons-range>
            </v-ons-col>
          </v-ons-row>
          <!-- <v-ons-row width="40px" style="text-align: center; line-height: 31px;">
            <i class="fas fa-minus"></i>
          </v-ons-row>-->
        </transition>
      </div>
      <!-- <div class="tier">
        <carousel-3d ref="tierList" v-on:after-slide-change="tierChange" v-bind:minSwipeDistance="blockSwipe" v-bind:perspective="0" v-bind:controls-visible="true" v-bind:display="3" v-bind:border="0" v-bind:start-index="4" v-bind:inverseScaling="1400" v-bind:width="tierHeight" v-bind:height="tierHeight" v-bind:space="300">
          <slide v-for="(tier, i) in tiers" v-bind:index="i" v-bind:key="i">
            <div class="swipe_area">
              <img v-bind:src="tierImgUrl(i)" class="tier_img">
            </div>
          </slide>
        </carousel-3d>
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      inputId: "",
      tiers: [
        "Challenger",
        "GrandMaster",
        "Master",
        "Diamond",
        "Platinum",
        "Gold",
        "Silver",
        "Bronze",
        "Iron"
      ],
      myTier: "Platinum",
      levels: ["I", "II", "III", "IV"],
      selected: false,
      lpInput: 0,
      levelIndex: 0,
      tierIndex: 4
    };
  },
  methods: {
    typing(e) {
      this.inputId = e.target.value;
      this.$store.commit("inputIngameId", this.inputId);
      if (this.inputId === "") {
        this.$emit("idEmpty");
      } else {
        this.$emit("idOk", this.inputId);
      }
    },
    tierImgUrl: function(index) {
      return this.$store.state.tierImgRoot + this.tiers[index] + ".png";
    },
    tierChange: function(payload) {
      this.$emit("tierSelect", this.tiers[payload]);
      this.myTier = this.tiers[payload];
      if (!this.isHigh) {
        this.$emit("resetLp");
        this.lpInput = 0;
      } else {
        this.$emit("resetTierLev");
        this.levelIndex = 0;
      }
    },
    levelSelected: function(index) {
      this.levelIndex = index;
      this.$emit("setTierLev", index + 1);
    },
    /*
     * 천상계 LP는 25점 단위로
     */
    lpSet: function(payload) {
      this.$emit("setLp", payload.target.value * 25);
    },
    tierUp: function() {
      if (this.tierIndex !== 0) {
        this.tierIndex -= 1;
      }
    },
    tierDown: function() {
      if (this.tierIndex !== 8) {
        this.tierIndex += 1;
      }
    }
  },
  computed: {
    tierHeight: function() {
      let height = window.innerHeight;
      if (height > 500 && height < 600) {
        return 90;
      } else if (height > 600 && height < 700) {
        return 130;
      } else if (height > 700 && height < 800) {
        return 180;
      } else if (height > 800 && height < 900) {
        return 180;
      }
    },
    blockSwipe: function() {
      return window.innerWidth * 2;
    },
    isHigh: function() {
      if (
        this.myTier === "Challenger" ||
        this.myTier === "GrandMaster" ||
        this.myTier === "Master"
      ) {
        return true;
      } else {
        return false;
      }
    },

    myLp: function() {
      return this.lpInput * 25;
    }
  }
};
</script>

<style>
.tab_title,
.tab_desc {
  text-align: center;
}

.ingame_id_input {
  width: 80%;
  height: 40px;
  border-radius: 10px;
  border: solid #461f41;
  text-align: center;
}

.tier_area {
  width: 99%;
  height: 300px;
  box-shadow: 2px 2px 2px 2px #e4e4e4;
  border-radius: 15px;
  position: relative;
}

.swipe_area {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.high {
  color: lightgray;
  position: absolute;
  top: 0;
  left: 28%;
  font-size: 2em;
}

.low {
  color: lightgray;
  position: absolute;
  bottom: 0;
  left: 28%;
  font-size: 2em;
}

.tier_img {
  width: 80%;
}

.tier_swipe_area {
  display: block;
  width: 59%;
  height: 100%;
  border-right: solid 0.5px lightgray;
  float: left;
}

.tier_detail_area {
  display: block;
  width: 40%;
  height: 100%;
  border-radius: 15px;
  text-align: center;
  float: right;
}

.tier_lev_container {
  margin-top: 15px;
  width: 100%;
}

.tier_lev_btn {
  display: block;
  color: white;
  font-weight: 800;
  font-size: 3em;
  border-radius: 50%;
  background-color: #461f41;
  width: 60px;
  height: 60px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
}

.lp_bar {
  border-top: 40%;
  background-color: inherit;
}

.lp_bar_container {
  width: 100%;
  transform: rotate(270deg);
  position: relative;
  top: 45%;
}

.completed_tier {
  font-weight: 900;
  font-size: 15px;
  text-align: center;
}

.filter {
  background-color: rgba(135, 111, 132, 0.6);
}

@media (min-height: 500px) and (max-height: 599px) {
  .ingame_id_area {
    margin-top: 10px;
    height: 50px;
    position: relative;
    text-align: center;
  }
  .tier_area {
    height: 260px;
  }
  .swipe_area {
    margin-top: 30%;
  }
  .completed_tier {
    font-size: 15px;
    margin-top: 5px;
  }
  .tier_lev_btn {
    width: 45px;
    height: 45px;
    font-size: 2.3em;
  }
  .lp_bar {
    width: 135%;
  }
}

@media (min-height: 600px) and (max-height: 699px) {
  .ingame_id_area {
    margin-top: 10px;
    height: 60px;
    position: relative;
    text-align: center;
  }
  .tier_area {
    height: 300px;
  }
  .swipe_area {
    margin-top: 30%;
  }
  .completed_tier {
    font-size: 20px;
    margin-top: 5px;
  }
  .tier_lev_btn {
    width: 50px;
    height: 50px;
    font-size: 2.5em;
  }
  .lp_bar {
    width: 135%;
  }
}

@media (min-height: 700px) and (max-height: 799px) {
  .ingame_id_area {
    margin-top: 20px;
    height: 70px;
    position: relative;
    text-align: center;
  }
  .tier_area {
    height: 340px;
  }
  .swipe_area {
    margin-top: 30%;
  }
  .completed_tier {
    font-size: 20px;
    margin-top: 20px;
  }
  .lp_bar {
    width: 140%;
  }
}

@media (min-height: 800px) and (max-height: 900px) {
  .ingame_id_area {
    margin-top: 20px;
    height: 70px;
    position: relative;
    text-align: center;
  }
  .tier_area {
    height: 380px;
  }
  .swipe_area {
    margin-top: 40%;
  }
  .completed_tier {
    font-size: 20px;
    margin-top: 20px;
  }
  .lp_bar {
    width: 160%;
  }
}
</style>