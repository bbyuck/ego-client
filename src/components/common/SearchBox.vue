<template>
  <div class="input_box">
    <input
      type="text"
      class="background_input"
      placeholder="챔피언을 검색해주세요."
      v-on:input="typing"
      ref="inputBox"
    />
    <div class="search_btn" v-on:click="searchBarBtn">
      <i class="fas fa-search" v-show="bindInput === ''"></i>
      <i class="fas fa-times" v-show="bindInput !== ''"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ["bindInput"],
  methods: {
    typing: function(e) {
      this.championInput = e.target.value;
    },
    searchBarBtn: function() {
      if (this.championInput === "") {
        this.$refs.inputBox.focus();
      } else {
        this.championInput = "";
        this.$refs.inputBox.value = "";
      }
    }
  }
};
</script>

<style>
.input_box {
  width: 80%;
  height: 40px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 2px 2px 2px 2px black;
  border: solid #461f41 1px;
  margin-top: 10px;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  background-color: #fff;
  padding-top: 10px;
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
  width: 80%;
  text-align: center;
}
</style>