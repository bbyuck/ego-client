<template>
  <v-ons-page>
    <div id="home">
      <transition name="fade" mode="out-in">
        <basic-info-page v-if="currentPage === 0"></basic-info-page>
        <tier-swipe-page v-if="currentPage === 1"></tier-swipe-page>
        <champion-page v-on:profile_confirm="makeProfile" v-if="currentPage === 2"></champion-page>
        <!-- 추가할 메인 페이지 컴포넌트 여기에 추가 -->
      </transition>
      <make-profile-back-button v-on:goBack="prevPage"></make-profile-back-button>
      <make-profile-next-button v-on:goNext="nextPage"></make-profile-next-button>
    </div>
  </v-ons-page>
</template>

<script>
import BasicInfoPage from "./BasicInfoPage.vue";
import TierSwipePage from "./TierSwipePage.vue";
import ChampionPage from "./ChampionPage.vue";
import MakeProfileBackButton from "./MakeProfileBackButton.vue";
import MakeProfileNextButton from "./MakeProfileNextButton.vue";

export default {
  data: function() {
    return {
      currentPage: 0,
      tierCode: 0
    };
  },
  methods: {
    nextPage: function() {
      /*
       * 앞으로 가기 버튼 페이지별 기능추가
       */
      switch (this.currentPage) {
        case 0:
          this.$store.commit("completeBasicInfo");
          break;
        case 1:
          this.$store.commit("completeTier");
          break;
        default:
          break;
      }
      this.currentPage += 1;
      this.$emit("profile_page_change", this.currentPage);
    },
    prevPage: function() {
      /*
       * 뒤로가기 버튼 페이지별 기능추가
       */
      switch (this.currentPage) {
        case 1:
          this.$store.commit("cancelTierSelect");
          break;
        case 2:
          this.$store.commit("cancelChampionSelect");
          break;
        default:
          break;
      }
      this.currentPage -= 1;
    },
    makeProfile: function() {
      this.$store.commit("makeProfileCard");
      this.$emit("profile_complete");
    }
  },
  components: {
    BasicInfoPage,
    TierSwipePage,
    ChampionPage,
    MakeProfileBackButton,
    MakeProfileNextButton
  }
};
</script>

<style>
/*
 * main-view transition 관련 css
 */

.main-view-enter-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.main-view-leave-active {
  transition: all 0.5s ease;
}

.main-view-leave-to,
.main-view-enter {
  transform: translateY(-100px);
  opacity: 0;
}
</style>