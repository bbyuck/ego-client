<template>
  <v-ons-fab position="bottom right" v-bind:visible="canGoNext" v-on:click="goNext">
    <i class="fas fa-chevron-right"></i>
  </v-ons-fab>
</template>

<script>
export default {
  computed: {
    canGoNext: function() {
      return this.$store.state.pageCompleted;
    }
  },
  methods: {
    goNext: function() {
      this.$emit("goNext");
    }
  }
};
</script>

<style>
</style>