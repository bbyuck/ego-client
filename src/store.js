import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ingameId: "",
    isVoiceOn: true,
    tierImgRoot: "./src/assets/images/tier/",
    myTier: "Platinum",
    isHigh: false,
    tierLev: 1,
    lp: 0,
    mainPositionIndex: -1,
    myPosition: [
      { position: "Top", selected: false, main: false },
      { position: "Jungle", selected: false, main: false },
      { position: "Mid", selected: false, main: false },
      { position: "AD Carry", selected: false, main: false },
      { position: "Support", selected: false, main: false }
    ],
    selectedChampions: [],
    mainPageStackLength: 0,

    appMode: 0,

    isPresetExist: false
  },
  mutations: {
    basicInfoPageCanComplete: function (state, payload) {
      state.pageCompleted = payload;
    },
    inputIngameId: function (state, payload) {
      if (payload !== "") {
        state.ingameId = payload;
      }
    },
    positionOn: function (state, payload) {
      state.myPosition[payload].selected = true;
    },
    positionOff: function (state, payload) {
      state.myPosition[payload].selected = false;
      if (state.myPosition[payload].main) {
        state.myPosition[payload].main = false;
        state.mainPositionIndex = -1;
      }
    },
    selectMainPosition: function (state, payload) {
      if (state.mainPositionIndex === -1) {
        state.mainPositionIndex = payload;
        state.myPosition[state.mainPositionIndex].main = true;
      } else {
        state.myPosition[state.mainPositionIndex].main = false;
        state.mainPositionIndex = payload;
        state.myPosition[state.mainPositionIndex].main = true;
      }
    },
    voiceOn: function (state) {
      state.isVoiceOn = true;
    },
    voiceOff: function (state) {
      state.isVoiceOn = false;
    },
    completeBasicInfo: function (state) {
      state.mainPageStackLength += 1;
      state.myTier = "Platinum";
    },
    updateIngameId: function (state, payload) {
      state.ingameId = payload;
    },
    toggleVoice: function (state, payload) {
      state.isVoiceOn = payload;
    },
    tierSelect: function (state, payload) {
      state.myTier = payload;
      if (payload === "Challenger" || payload === "GrandMaster" || payload === "Master") {
        state.isHigh = true;
      } else {
        state.isHigh = false;
      };
    },
    setTierLev: function (state, payload) {
      state.tierLev = payload;
    },
    setLp: function (state, payload) {
      state.lp = payload;
    },
    cancelTierSelect: function (state) {
      state.myTier = "Platinum";
      state.mainPageStackLength -= 1;
      state.tierLev = 1;
      state.lp = 0;
      state.isHigh = false;
      state.pageCompleted = false;
      state.ingameId = "";
      state.voiceOn = true;
      for (let i = 0; i < 5; i++) {
        state.myPosition[i].selected = false;
      }
      state.myPosition[state.mainPositionIndex].main = false;
      state.mainPositionIndex = -1;
    },
    completeTier: function (state) {
      state.mainPageStackLength += 1;
      state.pageCompleted = false;
    },
    cancelChampionSelect: function (state) {
      state.mainPageStackLength -= 1;
      state.selectedChampions = [];
      state.myTier = "Platinum";
      state.tierLev = 1;
      state.lp = 0;
      state.pageCompleted = true;
      state.isHigh = false;
    },
    completeChampion: function (state, payload) {
      state.selectedChampions = payload;
    },
    cancelProfile: function (state) {
      state.selectedChampions = [];
    },
    makeProfileCard: function (state) {
      let myProfileData = {
        "myIngameId": state.ingameId,
        "myIsVoiceOn": state.isVoiceOn,
        "myTier": state.myTier,
        "myIsHigh": state.isHigh,
        "myLp": state.lp,
        "myTierLev": state.tierLev,
        "myPosition": state.myPosition,
        "myMainPositionIdx": state.mainPositionIndex,
        "myChampions": state.selectedChampions
      };

      localStorage.setItem("preset1", JSON.stringify(myProfileData));
    },
    deleteProfile: function (state) {
      localStorage.removeItem("preset1");
      location.reload();
    }
  },
  getters: {
    selectedPositionNum: function (state) {
      let count = 0;
      for (let i = 0; i < 5; i++) {
        if (state.myPosition[i].selected) {
          count += 1;
        }
      }
      return count;
    },
    getPositionArr: function (state) {
      let arr = [];
      for (let i = 0; i < 5; i++) {
        if (state.myPosition[i].selected) {
          arr.push(state.myPosition[i]);
        }
      }
      return arr;
    },
  }
});
