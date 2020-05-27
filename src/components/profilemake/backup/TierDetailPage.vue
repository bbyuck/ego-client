<template>
  <div id="tier_detail">
    <div>
      <img v-bind:src="selectedTierImgUrl" id="my_tier_img" />
    </div>

    <div class="center">
      <v-ons-segment
        v-if="!isHigh"
        v-bind:index.sync="levelIndex"
        v-on:postchange="levelSelected"
        class="tier_lev_list"
      >
        <button>I</button>
        <button>II</button>
        <button>III</button>
        <button>IV</button>
      </v-ons-segment>

      <v-ons-row class="lp_bar" v-if="isHigh" v-on:change="lpComplete">
        <v-ons-col width="40px" style="text-align: center; line-height: 31px;">
          <i class="fas fa-minus"></i>
        </v-ons-col>
        <v-ons-col>
          <v-ons-range v-model.number="lpInput" style="width: 100%;"></v-ons-range>
        </v-ons-col>
        <v-ons-col width="40px" style="text-align: center; line-height: 31px;">
          <i class="fas fa-plus"></i>
        </v-ons-col>
      </v-ons-row>
    </div>

    <div class="completed_tier" v-if="!isHigh">{{ myTier }} {{ levels[levelIndex] }}</div>
    <div class="completed_tier" v-if="isHigh">{{ myTier }} {{ myLp }} LP</div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      levels: ["I", "II", "III", "IV"],
      selected: false,
      lpInput: 0,
      levelIndex: 0,
      tweenedLp: 0
    };
  },
  methods: {
    levelSelected: function() {
      this.$store.commit("setTierLev", this.levelIndex + 1);
    },
    lpComplete: function() {
      this.$store.commit("setLp", this.myLp);
    },
    goNext: function() {
      this.$emit("nextPage");
    }
  },
  computed: {
    selectedTierImgUrl: function() {
      return this.$store.state.tierImgRoot + this.$store.state.myTier + ".png";
    },
    isHigh: function() {
      return this.$store.state.isHigh;
    },
    myTier: function() {
      return this.$store.state.myTier;
    },
    /*
     * 천상계 LP는 25점 단위로
     */

    myLp: function() {
      return this.lpInput * 25;
    },
    animatedLp: function() {
      return this.tweenedLp.toFixed(0);
    }
  },
  watch: {
    number: function(newValue) {
      TweenLite.to(this.$data, 0.5, { tweenedLp: newValue });
    }
  }
};
</script>

<style scoped>
#my_tier_img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 40%;
  margin-top: 15%;
}
.tier_lev_list {
  margin-top: 20%;
  width: 70%;
}

.lp_bar {
  border-top: none;
  background-color: inherit;
  margin-top: 15%;
}

.completed_tier {
  text-align: center;
  margin-top: 10%;
  font-weight: 900;
  font-size: 1.5em;
}
</style>