<template>
  <div class="profile_card">
    <div class="header">
      <div class="header_left">
        <div class="tier_text_tag" v-if="myInfo.isHigh" v-bind:class="myInfo.myTier">
          {{ myTierTag }}
          <br />
          {{ myInfo.myLp }} LP
        </div>
        <div
          class="tier_text_tag"
          v-if="!myInfo.isHigh"
          v-bind:class="myInfo.myTier"
        >{{ myTierTag }}{{ myInfo.myTierLev }}</div>
      </div>
      <div class="ingame_id" v-if="myInfo.myIngameId !== ''">{{ myInfo.myIngameId }}</div>
      <div class="empty_ingame_id" v-if="myInfo.myIngameId === ''" v-on:click="goToIngameIdPage">
        <i class="fas fa-plus"></i>
      </div>
    </div>

    <div class="content_top" v-bind:class="{content_top_high : myInfo.isHigh}">
      <div
        v-bind:class="{profile_card_tier_high_area : myInfo.isHigh, profile_card_tier_area : !myInfo.isHigh}"
      >
        <img v-bind:src="tierImgUrlRoot + myInfo.myTier + '.png'" alt />
      </div>
      <div class="hexa_area">
        <div class="hexa_top">
          <img v-bind:src="positionImgUrlRoot + top" />
        </div>
        <div class="hexa_jg">
          <img v-bind:src="positionImgUrlRoot + jungle" />
        </div>
        <div class="hexa_mid">
          <img v-bind:src="positionImgUrlRoot + mid" />
        </div>
        <div class="hexa_ad">
          <img v-bind:src="positionImgUrlRoot + ad" />
        </div>
        <div class="hexa_sup">
          <img v-bind:src="positionImgUrlRoot + support" />
        </div>
        <div class="hexa_voice">
          <img v-bind:src="positionImgUrlRoot + voice" alt />
        </div>
      </div>
    </div>

    <div class="content_mid">
      <div
        v-for="(champion, i) in myInfo.myChampions"
        v-bind:key="champion.koreanName"
        v-bind:class="{main_champion_row : i === 0, champion_row : i !== 0}"
      >
        <div class="row_content">
          <div class="astr_mark" v-if="i === 0">
            <i class="fas fa-star"></i>
          </div>

          <div class="champion_name">
            <div class="kor">{{ champion.koreanName }}</div>
            <div class="eng">{{ champion.showEngName }}</div>
          </div>
          <div class="champion_thumb_container">
            <div class="champion_thumb">
              <img v-bind:src="championImgUrlRoot + champion.engName + '.png'" />
            </div>
          </div>
        </div>
      </div>

      <div
        class="empty_champion_row"
        v-for="idx in unselectedChampionCount"
        v-bind:key="idx"
        v-on:click="goToChampionPage"
      >
        <i class="fas fa-plus"></i>
      </div>
    </div>

    <div class="content_bottom"></div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      tierImgUrlRoot: "./src/assets/images/tier/",
      positionImgUrlRoot: "./src/assets/images/position/",
      championImgUrlRoot: "./src/assets/images/champion/"
    };
  },
  props: ["myInfo"],
  methods: {
    goToChampionPage: function() {
      this.$emit("goToChampion");
    },
    goToIngameIdPage: function() {
      this.$emit("goToIngameId");
    }
  },
  computed: {
    top: function() {
      if (this.myInfo.myPosition[0].main) {
        return "top_main.png";
      } else if (this.myInfo.myPosition[0].selected) {
        return "top_on.png";
      } else {
        return "top_off.png";
      }
    },
    jungle: function() {
      if (this.myInfo.myPosition[1].main) {
        return "jungle_main.png";
      } else if (this.myInfo.myPosition[1].selected) {
        return "jungle_on.png";
      } else {
        return "jungle_off.png";
      }
    },
    mid: function() {
      if (this.myInfo.myPosition[2].main) {
        return "mid_main.png";
      } else if (this.myInfo.myPosition[2].selected) {
        return "mid_on.png";
      } else {
        return "mid_off.png";
      }
    },
    ad: function() {
      if (this.myInfo.myPosition[3].main) {
        return "ad_main.png";
      } else if (this.myInfo.myPosition[3].selected) {
        return "ad_on.png";
      } else {
        return "ad_off.png";
      }
    },
    support: function() {
      if (this.myInfo.myPosition[4].main) {
        return "support_main.png";
      } else if (this.myInfo.myPosition[4].selected) {
        return "support_on.png";
      } else {
        return "support_off.png";
      }
    },
    voice: function() {
      if (this.myInfo.isVoiceOn) {
        return "voice_on.png";
      } else {
        return "voice_off.png";
      }
    },
    hexaAreaWidth: function() {
      return window.innerWidth * 0.8 * 0.55;
    },
    unselectedChampionCount: function() {
      return 3 - this.myInfo.myChampions.length;
    },
    myTierTag: function() {
      let tag = "";
      switch (this.myInfo.myTier) {
        case "Challenger":
          tag = "C1";
          break;
        case "GrandMaster":
          tag = "GM1";
          break;
        case "Master":
          tag = "M1";
          break;
        case "Diamond":
          tag = "D";
          break;
        case "Platinum":
          tag = "P";
          break;
        case "Gold":
          tag = "G";
          break;
        case "Silver":
          tag = "S";
          break;
        case "Bronze":
          tag = "B";
          break;
        case "Iron":
          tag = "I";
          break;
        default:
          break;
      }
      return tag;
    }
  }
};
</script>

<style>
.profile_card {
  width: 320px;
  height: 530px;
  background-color: white;
  border-radius: 15px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.header,
.under_header {
  width: 90%;
  display: block;
  height: 20px;
  font-size: 20px;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 10px;
}
.header {
  border-bottom: solid 1px #461f41;
  padding-top: 10px;
}

.header_left {
  display: inline-block;
  width: 23%;
}

.ingame_id {
  display: inline-block;
  position: relative;
  text-align: center;
  width: 50%;
}

.empty_ingame_id {
  color: #0071f1;
  display: inline-block;
  position: relative;
  text-align: center;
  width: 50%;
  font-size: 25px;
}

.tier_text_tag {
  border-radius: 5px;
  text-align: center;
  color: white;
}

.Iron {
  background-color: darkgray;
  width: 28px;
}
.Bronze {
  background-color: chocolate;
  width: 28px;
}
.Silver {
  background-color: silver;
  width: 28px;
}
.Gold {
  background-color: gold;
  width: 28px;
}
.Platinum {
  background-color: aquamarine;
  width: 28px;
}
.Diamond {
  background-color: aqua;
  width: 28px;
}
.Master {
  background-color: purple;
  font-size: 10px;
  width: 45px;
}
.GrandMaster {
  background-color: red;
  font-size: 10px;
  width: 45px;
}
.Challenger {
  background-color: skyblue;
  font-size: 10px;
  width: 45px;
}

.profile_card_id {
  padding-bottom: 10px;
}

.header_center {
  margin-left: auto;
  margin-right: auto;
}

.content_top {
  height: 120px;
}

.content_top_high {
  margin-top: 10px;
}

.profile_card_tier_area,
.profile_card_tier_high_area {
  width: 30%;
  position: relative;
  display: inline-block;
  margin-left: 10%;
}
.profile_card_tier_area {
  margin-top: 10px;
}

.profile_card_tier_area > img,
.profile_card_tier_high_area > img {
  width: 100%;
}

.hexa_area {
  position: relative;
  display: inline-block;
  width: 140px;
  height: 100px;
  top: 0;
}

.hexa_top,
.hexa_jg,
.hexa_mid,
.hexa_ad,
.hexa_sup,
.hexa_voice {
  width: 50px;
  position: absolute;
  display: inline-block;
}

.hexa_top > img,
.hexa_jg > img,
.hexa_mid > img,
.hexa_ad > img,
.hexa_sup > img,
.hexa_voice > img {
  width: 100%;
}

.hexa_top {
  left: 20px;
}

.hexa_jg {
  left: 60px;
  top: 67px;
}

.hexa_mid {
  left: 60px;
  top: 22px;
}

.hexa_ad {
  left: 100px;
  top: 45px;
}

.hexa_sup {
  left: 100px;
}

.hexa_voice {
  left: 20px;
  top: 45px;
}

.content_mid {
  position: relative;
  top: 20px;
}

.astr_mark {
  width: 20px;
  padding-left: 10px;
  background-color: #461f41;
  display: inline-block;
  position: relative;
  top: 23%;
  color: #f7941d;
  font-size: 15px;
}
.main_champion_row {
  height: 50px;
  color: white;
  border: solid 1px #d7d7d7;
  background-color: #461f41;
  font-weight: 800;
  font-size: 18px;
}

.main_champion_row > .row_content > .champion_name {
  margin-top: 7px;
}

.champion_row {
  height: 35px;
  color: white;
  border: solid 1px #d7d7d7;
  background-color: #461f41;
  font-weight: 800;
  font-size: 15px;
}
.row_content {
  position: relative;
  height: 100%;
}

.champion_name {
  display: inline-block;
  position: absolute;
  left: 12%;
}

.eng {
  color: #c6bcc1;
  font-size: 10px;
}

.champion_thumb_container {
  display: inline-block;
  position: absolute;
  right: 5%;
}

.champion_thumb {
  width: 50px;
  height: 50px;
  overflow: hidden;
  position: relative;
}

.champion_thumb > img {
  position: absolute;
}

.champion_row > .row_content > .champion_thumb_container > .champion_thumb {
  width: 50px;
  height: 35px;
}

.champion_row
  > .row_content
  > .champion_thumb_container
  > .champion_thumb
  > img {
  width: 70px;
  top: -40%;
  left: -20%;
}

.main_champion_row
  > .row_content
  > .champion_thumb_container
  > .champion_thumb
  > img {
  width: 80px;
  top: -30%;
  left: -30%;
}

.empty_champion_row {
  height: 35px;
  border-top: solid 1px #d7d7d7;
  border-bottom: solid 1px #d7d7d7;
  text-align: center;
  font-size: 25px;
  color: #0071f1;
}

.play_style_box_in_profile {
  width: 80%;
  height: 80px;
  box-shadow: 2px 2px 2px 2px #e4e4e4;
}
</style>