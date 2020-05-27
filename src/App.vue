<template id="main">
  <div class="full">
    <transition name="mode-change" mode="out-in">
      <div class="full" v-if="appMode === -1">
        <profile-card></profile-card>
        <!--테스트코드-->
      </div>
      <div class="full" v-if="appMode === 0">
        <start-view v-on:start="nextMode"></start-view>
      </div>

      <div class="full" v-if="appMode === 2">
        <profile-make-view v-on:profile_complete="nextMode"></profile-make-view>
      </div>

      <div class="full" v-if="appMode === 4">
        <top-toolbar></top-toolbar>
        <v-ons-tabbar position="bottom" :tabs="tabs" :visible="true" :index.sync="tabIdx"></v-ons-tabbar>
      </div>
    </transition>
  </div>
</template>

<script>
import StartView from "./components/start/StartView.vue";
import TopToolbar from "./components/common/TopToolbar.vue";
import ProfileMakeView from "./components/profilemake/ProfileMakeView.vue";
import MessengerView from "./components/tabpages/MessengerView.vue";
import SettingView from "./components/tabpages/SettingView.vue";
import MainView from "./components/main/MainView.vue";
import ProfileCard from "./components/common/ProfileCard.vue"; // 테스트코드

export default {
  data: function() {
    return {
      profileCurPage: 0,
      loadingTimeout: 0,
      appMode: 0,
      /*
       * appMode 0 -> start view app 첫 시작
       * appMode 2 -> profile card make view
       * appMode 4 -> main Page -> 로그인 후
       */
      tabIdx: 0,
      tabs: [
        {
          icon: "ion-ios-home",
          label: "ego",
          page: MainView,
          key: "MainView"
        },
        {
          icon: "fa-comments",
          label: "Messenger",
          page: MessengerView,
          badge: 7,
          key: "MessengerView"
        },
        {
          icon: "ion-ios-settings",
          label: "Settings",
          page: SettingView,
          key: "SettingView"
        }
      ]
    };
  },
  methods: {
    nextMode: function(currentPage) {
      clearTimeout(this.loadingTimeout);
      this.appMode += 1;
      this.loadingTimeout = setTimeout(() => (this.appMode += 1), 700);
    }
  },
  components: {
    StartView,
    ProfileMakeView,
    MessengerView,
    SettingView,
    TopToolbar,
    MainView,
    ProfileCard // 테스트코드
  },
  created: function() {
    let preset = JSON.parse(localStorage.getItem("preset1"));

    if (preset !== null) {
      this.appMode = 4;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.full {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.page__content {
  background-color: #461f41;
  overflow: hidden;
}

.center {
  text-align: center;
}

.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-20px);
  opacity: 0;
}

/*
 * fade
 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/*
 * mode change
 */
.mode-change-enter-active,
.mode-change-leave-active {
  transition: opacity 0.7s;
}
.mode-change-enter,
.mode-change-leave-to {
  opacity: 0;
}

/*
 *  input box css
 */

input {
  font-size: 20px;
  margin-left: auto;
  margin-right: auto;
}

.input {
  width: 80%;
}

.input_area {
  width: 100%;
}
</style>
