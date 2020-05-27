<template>
  <div id="tier_swipe_page">
    <div class="tier_swipe">
      <carousel-3d
        ref="tierList"
        v-on:after-slide-change="tierChange"
        v-bind:perspective="0"
        v-bind:display="3"
        v-bind:border="0"
        v-bind:start-index="4"
        v-bind:inverseScaling="1400"
        v-bind:width="180"
        v-bind:height="180"
        v-bind:space="350"
      >
        <slide v-for="(tier, i) in tiers" v-bind:index="i" v-bind:key="i">
          <div class="swipe_area">
            <img v-bind:src="tierImgUrl(i)" class="tier_img" />
          </div>
        </slide>
      </carousel-3d>
    </div>

    <div class="tier_text_area">
      <div class="completed_tier" v-if="!isHigh">{{ myTier }} {{ levels[levelIndex] }}</div>
      <div class="completed_tier" v-if="isHigh">{{ myTier }} {{ myLp }} LP</div>
    </div>

    <div class="tier_detail_area center">
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

        <v-ons-row class="lp_bar" v-if="isHigh">
          <v-ons-col width="40px" style="text-align: center; line-height: 31px;">
            <i class="fas fa-minus"></i>
          </v-ons-col>
          <v-ons-col>
            <v-ons-range v-model.number="lpInput" style="width: 100%;" v-on:change="lpComplete"></v-ons-range>
          </v-ons-col>
          <v-ons-col width="40px" style="text-align: center; line-height: 31px;">
            <i class="fas fa-plus"></i>
          </v-ons-col>
        </v-ons-row>
      </transition>
    </div>

    <div class="loading_area">
      <v-ons-modal :visible="loading">
        <p style="text-align: center">
          Loading
          <v-ons-icon icon="fa-spinner" spin></v-ons-icon>
        </p>
      </v-ons-modal>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      tiers: [
        "Iron",
        "Bronze",
        "Silver",
        "Gold",
        "Platinum",
        "Diamond",
        "Master",
        "GrandMaster",
        "Challenger"
      ],
      levels: ["I", "II", "III", "IV"],
      selected: false,
      lpInput: 0,
      levelIndex: 0,
      loading: true,
      loadingTimeout: 0
    };
  },
  methods: {
    tierImgUrl: function(index) {
      return this.$store.state.tierImgRoot + this.tiers[index] + ".png";
    },
    tierChange: function(payload) {
      this.$store.commit("tierSelect", this.tiers[payload]);
      if (!this.$store.state.isHigh) {
        this.$store.commit("setLp", 0);
        this.lpInput = 0;
      } else {
        this.$store.commit("setTierLev", 1);
        this.levelIndex = 0;
      }
      // console.log(this.tiers[payload]);
    },
    levelSelected: function(index) {
      this.levelIndex = index;
      this.$store.commit("setTierLev", index + 1);
    },
    /*
     * 천상계 LP는 25점 단위로
     */
    lpComplete: function(payload) {
      this.$store.commit("setLp", payload.target.value * 25);
    }
  },
  computed: {
    isHigh: function() {
      return this.$store.state.isHigh;
    },
    myTier: function() {
      return this.$store.state.myTier;
    },

    myLp: function() {
      return this.lpInput * 25;
    }
  },
  created: function() {
    clearTimeout(this.loadingTimeout);
    this.loadingTimeout = setTimeout(() => (this.loading = false), 500);
  }
};
</script>

<style scoped>
#iter_swipe_page {
  vertical-align: bottom;
}

.tier_swipe {
  margin-top: 20%;
}

/*
* 티어 이미지 carousel 관련 css
 */
.carousel-3d-slider > * {
  background: 0;
}
.carousel-3d-slide.current {
  background: 0;
}
.carousel-3d-slide.right-1 {
  background: 0;
}
.carousel-3d-slide.left-1 {
  background: 0;
}

.tier_img {
  position: absolute;
  left: 10%;
  width: 80%;
}

#tier_select_btn_line {
  text-align: center;
}

.tier_lev_container {
  margin-top: 20%;
}

.tier_lev_btn {
  display: inline-block;
  color: white;
  font-weight: 800;
  font-size: 2em;
  background-color: #461f41;
  width: 20%;
  margin-left: 1%;
  margin-right: 1%;
}

.tier_detail_area {
  display: block;
  height: 20%;
  margin-top: 20%;
}

.lp_bar_container {
  margin-top: 20%;
}

.lp_bar {
  border-top: none;
  background-color: inherit;
}

.completed_tier {
  text-align: center;
  margin-top: 10%;
  font-weight: 900;
  font-size: 1.5em;
}

@media (min-height: 500px) and (max-height: 599px) {
  .tier_swipe {
    margin-top: 20%;
  }
}

@media (min-height: 600px) and (max-height: 699px) {
  .tier_swipe {
    margin-top: 25%;
  }
}

@media (min-height: 700px) and (max-height: 799px) {
  .tier_swipe {
    margin-top: 30%;
  }
}

@media (min-height: 800px) and (max-height: 900px) {
  .tier_swipe {
    margin-top: 40%;
  }
}

.filter {
  background-color: rgba(135, 111, 132, 0.6);
}
</style>