<template>
  <v-ons-page>
    <v-ons-carousel
      fullscreen
      swipeable
      auto-scroll
      auto-scroll-ratio="0.1"
      :index.sync="carouselIndex"
    >
      <v-ons-carousel-item class="start_page">
        <div class="start_page_header">시작 페이지 1</div>
      </v-ons-carousel-item>
      <v-ons-carousel-item class="start_page">
        <div class="start_page_header">시작 페이지 2</div>
      </v-ons-carousel-item>
      <v-ons-carousel-item class="start_page">
        <div class="start_page_header">시작 페이지 3</div>
        <div class="start_page_content">
          <v-ons-button v-on:click="start">시작하기</v-ons-button>
        </div>
      </v-ons-carousel-item>
    </v-ons-carousel>
    <div class="dots">
      <span
        :index="dotIndex - 1"
        v-for="dotIndex in 3"
        :key="dotIndex"
        style="cursor: pointer"
        @click="carouselIndex = dotIndex - 1"
      >{{ carouselIndex === dotIndex - 1 ? '\u25CF' : '\u25CB' }}</span>
    </div>
  </v-ons-page>
</template>

<script>
export default {
  data: function() {
    return {
      carouselIndex: 0
    };
  },
  methods: {
    start: function() {
      this.$emit("start");
    }
  },
  computed: {
    deviceHeight: function() {
      return screen.height;
    },
    deviceWidth: function() {
      return screen.width;
    }
  }
};
</script>

<style>
.start_page {
  background: linear-gradient(to right, #eba0cf, #a9aaf6);
}
.start_page_header {
  text-align: center;
  font-size: 30px;
  margin-top: 20px;
  color: #fff;
}

.dots {
  text-align: center;
  font-size: 30px;
  color: #fff;
  position: absolute;
  bottom: 40px;
  left: 0;
  right: 0;
}
</style>