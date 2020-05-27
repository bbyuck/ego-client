<template>
  <v-ons-fab position="bottom left" v-bind:visible="canGoBack" v-on:click="goBack">
    <i class="fas fa-chevron-left"></i>
  </v-ons-fab>
</template>

<script>
export default {
  computed: {
    canGoBack: function() {
      return this.$store.state.mainPageStackLength > 0;
    }
  },
  methods: {
    goBack: function() {
      this.$emit("goBack");
    }
  }
};
</script>

<style>
</style>