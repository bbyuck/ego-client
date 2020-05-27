<template>
  <div class="center" id="position_page">
    <div class="main_position_show">
      <h1>
        메인 포지션
        <transition name="slide-fade">
          <i class="icon-top mp" v-if="favorite === 0"></i>
          <i class="icon-jungle mp" v-if="favorite === 1"></i>
          <i class="icon-mid mp" v-if="favorite === 2"></i>
          <i class="icon-adcarry mp" v-if="favorite === 3"></i>
          <i class="icon-support mp" v-if="favorite === 4"></i>
        </transition>
      </h1>
    </div>
    <div class="position_line">
      <div class="top">
        <div class="content_top">
          <span class="position_btn" v-bind:class="{ 'on' : top }" v-on:click="topBtn">
            <i class="icon-top"></i>
          </span>
        </div>
        <div class="content_btm">
          <v-ons-button class="favorite_btn fa-top" v-if="top" v-on:click="selectMainPosition(0)">
            <i class="far fa-star"></i>
          </v-ons-button>
        </div>
      </div>

      <div class="jg">
        <div class="content_top">
          <span class="position_btn jg" v-bind:class="{ 'on' : jungle }" v-on:click="jungleBtn">
            <i class="icon-jungle"></i>
          </span>
        </div>
        <div class="content_btm">
          <v-ons-button class="favorite_btn fa-jg" v-if="jungle" v-on:click="selectMainPosition(1)">
            <i class="far fa-star"></i>
          </v-ons-button>
        </div>
      </div>

      <div class="mid">
        <div class="content_top">
          <span class="position_btn mid" v-bind:class="{ 'on' : mid }" v-on:click="midBtn">
            <i class="icon-mid"></i>
          </span>
        </div>
        <div class="content_btm">
          <v-ons-button class="favorite_btn fa-mid" v-if="mid" v-on:click="selectMainPosition(2)">
            <i class="far fa-star"></i>
          </v-ons-button>
        </div>
      </div>

      <div class="adc">
        <div class="content_top">
          <span class="position_btn ad" v-bind:class="{ 'on' : adcarry }" v-on:click="adcarryBtn">
            <i class="icon-adcarry"></i>
          </span>
        </div>
        <div class="content_btm">
          <v-ons-button
            class="favorite_btn fa-adc"
            v-if="adcarry"
            v-on:click="selectMainPosition(3)"
          >
            <i class="far fa-star"></i>
          </v-ons-button>
        </div>
      </div>

      <div class="sup">
        <div class="content_top">
          <span class="position_btn sup" v-bind:class="{ 'on' : support }" v-on:click="supportBtn">
            <i class="icon-support"></i>
          </span>
        </div>
        <div class="content_btm">
          <v-ons-button
            class="favorite_btn fa-sup"
            v-if="support"
            v-on:click="selectMainPosition(4)"
          >
            <i class="far fa-star"></i>
          </v-ons-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      top: false,
      jungle: false,
      mid: false,
      adcarry: false,
      support: false,
      favorite: Number
    };
  },
  methods: {
    topBtn: function() {
      this.top = !this.top;
      this.$store.commit("selectPosition", 0);
      if (!this.top && this.favorite === 0) {
        this.favorite = -1;
      }
    },
    jungleBtn: function() {
      this.jungle = !this.jungle;
      this.$store.commit("selectPosition", 1);
      if (!this.jungle && this.favorite === 1) {
        this.favorite = -1;
      }
    },
    midBtn: function() {
      this.mid = !this.mid;
      this.$store.commit("selectPosition", 2);
      if (!this.mid && this.favorite === 2) {
        this.favorite = -1;
      }
    },
    adcarryBtn: function() {
      this.adcarry = !this.adcarry;
      this.$store.commit("selectPosition", 3);
      if (!this.adcarry && this.favorite === 3) {
        this.favorite = -1;
      }
    },
    supportBtn: function() {
      this.support = !this.support;
      this.$store.commit("selectPosition", 4);
      if (!this.support && this.favorite === 4) {
        this.favorite = -1;
      }
    },
    selectMainPosition: function(index) {
      this.$store.commit("selectMainPosition", index);
      this.favorite = index;
    }
  }
};
</script>

<style scoped>
#position_page {
  display: inline-block;
  vertical-align: bottom;
  width: 100%;
}

.icon-top,
.icon-jungle,
.icon-mid,
.icon-adcarry,
.icon-support {
  font-size: 2.5em;
  position: relative;
  left: 0.01em;
  bottom: 0.2em;
}

.position_line {
  margin-top: 30%;
  display: inline-block;
}

.content_btm {
  margin-top: 30%;
  margin-bottom: 30%;
}

/* #position_select {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  position: relative;
} */

.top,
.jg,
.mid,
.adc,
.sup {
  position: relative;
  display: inline-block;
  vertical-align: top;
}

.main_position_show > .icon-top,
.main_position_show > .icon-jungle,
.main_position_show > .icon-mid,
.main_position_show > .icon-adcarry,
.main_position_show > .icon-support {
  font-size: 1em;
}

.main_position_show {
  margin-top: 20%;
  font-size: 2em;
}
.mp {
  font-size: 1em;
}
/*
 * button css
 */

:active,
:focus {
  outline: 0;
}

.position_btn {
  margin-left: auto;
  margin-right: auto;
  text-shadow: 0px 1px 1px rgba(250, 250, 250, 0.1);
  display: inline-block;
  position: relative;
  text-decoration: none;
  box-shadow: 0px 3px 0px 0px rgb(34, 34, 34), 0px 7px 10px 0px rgb(17, 17, 17),
    inset 0px 1px 1px 0px rgba(250, 250, 250, 0.2),
    inset 0px -12px 35px 0px rgba(0, 0, 0, 0.5);
  width: 65px;
  height: 65px;
  border: 0;
  color: rgb(37, 37, 37);
  text-align: center;
  line-height: 79px;
  background-color: rgb(83, 87, 93);
  border-radius: 7px;
  transition: color 350ms ease, text-shadow 350ms;
  -o-transition: color 350ms ease, text-shadow 350ms;
  -moz-transition: color 350ms ease, text-shadow 350ms;
  -webkit-transition: color 350ms ease, text-shadow 350ms;
}
.position_btn:before {
  margin-left: auto;
  margin-right: auto;
  width: 70px;
  height: 70px;
  display: inline-block;
  z-index: -2;
  position: absolute;
  background-color: rgb(26, 27, 29);
  border-radius: 7px;
  left: -5px;
  top: -2px;
  box-shadow: 0px 1px 0px 0px rgba(250, 250, 250, 0.1),
    inset 0px 1px 2px rgba(0, 0, 0, 0.5);
}
.position_btn:active {
  box-shadow: 0px 0px 0px 0px rgb(34, 34, 34), 0px 3px 7px 0px rgb(17, 17, 17),
    inset 0px 1px 1px 0px rgba(250, 250, 250, 0.2),
    inset 0px -10px 35px 5px rgba(0, 0, 0, 0.5);
  background-color: rgb(83, 87, 93);
  top: 3px;
}
.position_btn.on {
  box-shadow: 0px 0px 0px 0px rgb(34, 34, 34), 0px 3px 7px 0px rgb(17, 17, 17),
    inset 0px 1px 1px 0px rgba(250, 250, 250, 0.2),
    inset 0px -10px 35px 5px rgba(0, 0, 0, 0.5);
  background-color: rgb(83, 87, 93);
  top: 3px;
  color: darkkhaki;
  text-shadow: 0px 0px 3px rgb(250, 250, 250);
}
.position_btn:active:before,
.position_btn.on:before {
  top: -5px;
  background-color: rgb(26, 27, 29);
  box-shadow: 0px 1px 0px 0px rgba(250, 250, 250, 0.1),
    inset 0px 1px 2px rgba(0, 0, 0, 0.5);
}

.favorite_btn {
  font-size: 1.3em;
  color: white;
  width: 65px;
}
</style>