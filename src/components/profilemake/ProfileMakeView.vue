<template>
  <div class="profile_make">
    <div class="profile_make_page">
      <v-ons-page>
        <v-ons-carousel
          fullscreen
          swipeable
          auto-scroll
          auto-scroll-ratio="0.1"
          :index.sync="pageIndex"
        >
          <v-ons-dialog
            cancelable
            :visible.sync="profileCardVisible"
            :mask-color="'rgba(0, 0, 0, 0.7)'"
            class="pre_profile"
          >
            <profile-card
              v-bind:myInfo="preMyInfo"
              v-on:goToIngameId="pageIndex = 0; profileCardVisible = false;"
              v-on:goToChampion="pageIndex = 2; profileCardVisible = false;"
            ></profile-card>
          </v-ons-dialog>
          <v-ons-carousel-item class="profile_make_page">
            <div class="profile_make_header">
              소환사 정보
              <div class="profile_view_btn" v-on:click="curProfileView">
                <img v-bind:src="'./src/assets/images/profile_make_btn/profile_view.png'" alt />
              </div>
            </div>
            <div class="profile_make_content_long">
              <profile-make-page1
                v-on:idOk="idSave"
                v-on:idEmpty="resetId"
                v-on:tierSelect="tierSelectInView"
                v-on:setLp="setLpInView"
                v-on:setTierLev="setTierLevInView"
                v-on:resetLp="preMyInfo.myLp = 0"
                v-on:resetTierLev="preMyInfo.myTierLev = 1"
              ></profile-make-page1>
            </div>
          </v-ons-carousel-item>
          <v-ons-carousel-item class="profile_make_page">
            <div class="profile_make_header">
              소환사 정보
              <div class="profile_view_btn" v-on:click="curProfileView">
                <img v-bind:src="'./src/assets/images/profile_make_btn/profile_view.png'" alt />
              </div>
            </div>
            <div class="profile_make_content_long">
              <profile-make-page2
                v-on:micOn="page2MicOn"
                v-on:micOff="page2MicOff"
                v-on:positionBtnTouch="page2PositionBtnAction"
              ></profile-make-page2>
            </div>
          </v-ons-carousel-item>
          <v-ons-carousel-item class="profile_make_page">
            <div class="profile_make_header">
              챔피언 선택
              <div class="profile_view_btn" v-on:click="curProfileView">
                <img v-bind:src="'./src/assets/images/profile_make_btn/profile_view.png'" alt />
              </div>
            </div>
            <div class="input_area">
              <div class="input_box">
                <input
                  type="text"
                  class="background_input"
                  placeholder="챔피언을 검색해주세요."
                  v-on:input="championSearchInput"
                  ref="championSearch"
                />
                <div class="search_btn" v-on:click="championSearchBarBtn">
                  <i class="fas fa-search" v-show="championInput === ''"></i>
                  <i class="fas fa-times" v-show="championInput !== ''"></i>
                </div>
              </div>
            </div>
            <div class="profile_make_content">
              <profile-make-page3
                v-bind:searchInput="championInput"
                v-on:championUpdate="championUpdateInView"
              ></profile-make-page3>
            </div>
          </v-ons-carousel-item>
          <v-ons-carousel-item class="profile_make_page">
            <div class="profile_make_header">
              EGO태그 선택
              <div class="profile_view_btn" v-on:click="curProfileView">
                <img v-bind:src="'./src/assets/images/profile_make_btn/profile_view.png'" alt />
              </div>
            </div>

            <div class="profile_make_content_long">
              <profile-make-page4></profile-make-page4>
            </div>
          </v-ons-carousel-item>
          <v-ons-carousel-item class="profile_make_page">
            <div class="profile_make_header">프로필 카드</div>
            <div class="profile_card_area">
              <profile-make-page5
                v-bind:myInfo="preMyInfo"
                v-on:goToIngameIdInView="pageIndex = 0"
                v-on:goToChampionInView="pageIndex = 2"
              ></profile-make-page5>
            </div>
          </v-ons-carousel-item>
        </v-ons-carousel>

        <div v-bind:class="{ white_dot : pageIndex === 4, progress_dot : pageIndex !== 4 }">
          <span
            :index="dotIndex - 1"
            v-for="dotIndex in 5"
            :key="dotIndex"
            style="cursor: pointer"
            @click="pageIndex = dotIndex - 1"
          >{{ pageIndex === dotIndex - 1 ? '\u25CF' : '\u25CB' }}</span>
        </div>
      </v-ons-page>
    </div>
  </div>
</template>

<script>
import ProfileMakePage1 from "./ProfileMakePage1.vue";
import ProfileMakePage2 from "./ProfileMakePage2.vue";
import ProfileMakePage3 from "./ProfileMakePage3.vue";
import ProfileMakePage4 from "./ProfileMakePage4.vue";
import ProfileMakePage5 from "./ProfileMakePage5.vue";
import ProfileCard from "../common/ProfileCard.vue";

export default {
  data: function() {
    return {
      profileCardVisible: false,
      pageIndex: 0,
      championInput: "",
      completed: [false, false, false, false, false],
      selectedPositionCount: 0,
      preMyInfo: {
        myIngameId: "",
        myTier: "Platinum",
        isHigh: false,
        myLp: 0,
        myTierLev: 1,
        myPosition: [
          { position: "Top", selected: false, main: false },
          { position: "Jungle", selected: false, main: false },
          { position: "Mid", selected: false, main: false },
          { position: "AD Carry", selected: false, main: false },
          { position: "Support", selected: false, main: false }
        ],
        myMainPositionIdx: -1,
        isVoiceOn: true,
        myChampions: [],
        myEGOtags: []
      }
    };
  },
  methods: {
    idSave: function(payload) {
      this.preMyInfo.myIngameId = payload;
      this.completed[0] = true;
    },
    resetId: function() {
      this.preMyInfo.myIngameId = "";
      this.completed[0] = false;
    },
    tierSelectInView: function(payload) {
      this.preMyInfo.myTier = payload;
      if (
        payload === "Challenger" ||
        payload === "GrandMaster" ||
        payload === "Master"
      ) {
        this.preMyInfo.isHigh = true;
      } else {
        this.preMyInfo.isHigh = false;
      }
    },
    setLpInView: function(payload) {
      this.preMyInfo.myLp = payload;
    },
    setTierLevInView: function(payload) {
      this.preMyInfo.myTierLev = payload;
    },
    page2MicOn: function() {
      this.preMyInfo.isVoiceOn = true;
    },
    page2MicOff: function() {
      this.preMyInfo.isVoiceOn = false;
    },
    page2PositionBtnAction: function(payload) {
      switch (payload) {
        case "topOn":
          this.preMyInfo.myPosition[0].selected = true;
          this.selectedPositionCount += 1;
          break;
        case "topOff":
          this.preMyInfo.myPosition[0].selected = false;
          this.selectedPositionCount -= 1;
          break;
        case "jgOn":
          this.preMyInfo.myPosition[1].selected = true;
          this.selectedPositionCount += 1;
          break;
        case "jgOff":
          this.preMyInfo.myPosition[1].selected = false;
          this.selectedPositionCount -= 1;
          break;
        case "midOn":
          this.preMyInfo.myPosition[2].selected = true;
          this.selectedPositionCount += 1;
          break;
        case "midOff":
          this.preMyInfo.myPosition[2].selected = false;
          this.selectedPositionCount -= 1;
          break;
        case "adOn":
          this.preMyInfo.myPosition[3].selected = true;
          this.selectedPositionCount += 1;
          break;
        case "adOff":
          this.preMyInfo.myPosition[3].selected = false;
          this.selectedPositionCount -= 1;
          break;
        case "supOn":
          this.preMyInfo.myPosition[4].selected = true;
          this.selectedPositionCount += 1;
          break;
        case "supOff":
          this.preMyInfo.myPosition[4].selected = false;
          this.selectedPositionCount -= 1;
          break;
        default:
          break;
      }
      if (this.selectedPositionCount === 0) {
        this.completed[1] = false;
      } else {
        this.completed[1] = true;
      }
    },
    championSearchInput: function(e) {
      this.championInput = e.target.value;
    },
    championSearchBarBtn: function() {
      if (this.championInput === "") {
        this.$refs.championSearch.focus();
      } else {
        this.championInput = "";
        this.$refs.championSearch.value = "";
      }
    },
    championUpdateInView: function(payload) {
      this.preMyInfo.myChampions = payload;
      if (this.preMyInfo.myChampions.length === 3) {
        this.completed[2] = true;
      }
    },
    EGOtagUpdate: function(payload) {
      this.preMyInfo.myEGOtags = payload;
    },
    curProfileView: function() {
      this.profileCardVisible = true;
    }
  },
  components: {
    ProfileMakePage1,
    ProfileMakePage2,
    ProfileMakePage3,
    ProfileMakePage4,
    ProfileMakePage5,
    ProfileCard
  }
};
</script>

<style>
.dialog-container {
  border-radius: 15px;
}

.profile_make_page {
  background-color: #461f41;
  height: 100%;
}

.profile_view_btn {
  display: inline-block;
  position: absolute;
  right: 4%;
  width: 10.8%;
}

.profile_view_btn img {
  width: 100%;
}

.progress_dot {
  text-align: center;
  font-size: 30px;
  color: #461f41;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
}

.white_dot {
  color: white;
  text-align: center;
  font-size: 30px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
}

.profile_make_header {
  text-align: center;
  background-color: #461f41;
  color: #fff;
  font-size: 30px;
  margin-top: 5%;
}

.profile_make_content_long {
  background-color: #fff;
  height: 90%;
  width: 100%;
  position: absolute;
  bottom: 0;
  border-radius: 20px 20px 0 0;
}

.gray_header1 {
  background-color: #f3f2f2;
  width: 100%;
  border-radius: 20px 20px 0 0;
  position: relative;
}

.gray_header2 {
  background-color: #f3f2f2;
  width: 100%;
  position: relative;
}

.profile_make_content {
  background-color: #fff;
  height: 78%;
  width: 100%;
  position: absolute;
  bottom: 0;
  border-radius: 20px 20px 0 0;
}

.tab_title {
  font-size: 20px;
  margin: 5px;
  color: #461f41;
}

.tab_desc {
  font-size: 13px;
  margin: 5px;
  color: gray;
}

.page_content {
  height: 100%;
}

.input_area {
  text-align: center;
}

.input_box {
  width: 80%;
  height: 40px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 2px 2px 2px 2px black;
  border: solid #461f41 1px;
  margin-left: auto;
  margin-right: auto;
  background-color: #fff;
  padding-top: 3%;
  margin-top: 5%;
}

.search_btn {
  display: inline-block;
  width: 15%;
  height: 30px;
}

.search_btn > i {
  color: #461f41;
}

.background_input {
  background-color: inherit;
  font-size: 20px;
  height: 25px;
  width: 70%;
  text-align: center;
  border: none;
}

.profile_card_area {
  margin-left: auto;
  margin-right: auto;
}
</style>