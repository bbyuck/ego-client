<template>
  <div class="page_content">
    <profile-card
      v-bind:myInfo="myInfo"
      v-on:goToChampion="goToChampionToView"
      v-on:goToIngameId="goToIngameIdToView"
    ></profile-card>
  </div>
</template>

<script>
import ProfileCard from "../common/ProfileCard.vue";

export default {
  props: ["myInfo"],
  methods: {
    goToChampionToView: function() {
      this.$emit("goToChampionInView");
    },
    goToIngameIdToView: function() {
      this.$emit("goToIngameIdInView");
    }
  },
  components: {
    ProfileCard
  }
};
</script>

<style scoped>
.page_content {
  margin-top: 5%;
}
</style>