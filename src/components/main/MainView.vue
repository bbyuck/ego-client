<template>
  <v-ons-page>
    <v-ons-button class="deletePreset" v-on:click="profile_delete">프로필 삭제</v-ons-button>
    <div class="profile_card_container">
      <profile-card v-bind:my-info="myInfo"></profile-card>
    </div>
  </v-ons-page>
</template>

<script>
import ProfileCard from "../common/ProfileCard.vue";

export default {
  data: function() {
    return {};
  },
  methods: {
    profile_delete: function() {
      this.$store.commit("deleteProfile");
    }
  },
  components: {
    ProfileCard
  },
  computed: {
    myInfo: function() {
      let preset = JSON.parse(localStorage.getItem("preset1"));
      console.log(preset);
      if (preset !== null) {
        return preset;
      } else {
        return null;
      }
    }
  }
};
</script>

<style>
.deletePreset {
  margin-top: 20%;
}
.profile_card_container {
  text-align: center;
}
</style>