// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import Vue from 'vue';
import VueOnsen from 'vue-onsenui';
import store from './store';
import App from './App';
import Carousel3d from "vue-carousel-3d";


Vue.config.productionTip = false;

Vue.use(VueOnsen);
Vue.use(Carousel3d);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  template: "<App/>",
  components: { App },
  beforeCreate: function () {
    this.$ons.disableAutoStyling();
  },
});
