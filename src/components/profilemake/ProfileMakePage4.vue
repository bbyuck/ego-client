<template>
  <div class="page_content">
    <div class="selected_ego_tag_area">
      <div class="gray_header1">
        <p class="header_text">선택한 EGO태그</p>
      </div>
      <div class="selected_ego_tag_list">
        <div class="selected_ego_tag_list_item"></div>
      </div>
    </div>
    <div class="ego_tag_area">
      <div class="gray_header2">
        <p class="header_text">EGO태그 목록</p>
      </div>
      <div class="position_category">
        <div class="position_btn_container">
          <div class="position_btn" v-on:click="positionFilter('top')">
            <img v-show="topBtnOn" v-bind:src="btnUrl + 'top_on.png'" alt />
            <img v-show="!topBtnOn" v-bind:src="btnUrl + 'top_off.png'" alt />
          </div>
        </div>
        <div class="position_btn_container">
          <div class="position_btn" v-on:click="positionFilter('jg')">
            <img v-show="jgBtnOn" v-bind:src="btnUrl + 'jg_on.png'" alt />
            <img v-show="!jgBtnOn" v-bind:src="btnUrl + 'jg_off.png'" alt />
          </div>
        </div>
        <div class="position_btn_container">
          <div class="position_btn" v-on:click="positionFilter('mid')">
            <img v-show="midBtnOn" v-bind:src="btnUrl + 'mid_on.png'" alt />
            <img v-show="!midBtnOn" v-bind:src="btnUrl + 'mid_off.png'" alt />
          </div>
        </div>
        <div class="position_btn_container">
          <div class="position_btn" v-on:click="positionFilter('ad')">
            <img v-show="adBtnOn" v-bind:src="btnUrl + 'ad_on.png'" alt />
            <img v-show="!adBtnOn" v-bind:src="btnUrl + 'ad_off.png'" alt />
          </div>
        </div>
        <div class="position_btn_container">
          <div class="position_btn" v-on:click="positionFilter('sup')">
            <img v-show="supBtnOn" v-bind:src="btnUrl + 'sup_on.png'" alt />
            <img v-show="!supBtnOn" v-bind:src="btnUrl + 'sup_off.png'" alt />
          </div>
        </div>
      </div>

      <div class="ego_tag_list" v-if="topBtnOn">
        <div class="ego_tag_list_item" v-for="tag in topTagList" v-bind:key="tag.id">
          <div class="ego_tag_btn">
            <div class="ego_tag_icon">
              <img v-bind:src="'./src/assets/images/position/' + tag.icon" alt />
            </div>
            <div class="ego_tag_title">{{ tag.title }}</div>
            <div class="ego_tag_description">{{ tag.description }}</div>
          </div>
        </div>
      </div>

      <div class="ego_tag_list" v-if="jgBtnOn">
        <div class="ego_tag_list_item" v-for="tag in jgTagList" v-bind:key="tag.id">
          <div class="ego_tag_btn">
            <div class="ego_tag_icon">
              <img v-bind:src="'./src/assets/images/position/' + tag.icon" alt />
            </div>
            <div class="ego_tag_title">{{ tag.title }}</div>
            <div class="ego_tag_description">{{ tag.description }}</div>
          </div>
        </div>
      </div>

      <div class="ego_tag_list" v-if="midBtnOn">
        <div class="ego_tag_list_item" v-for="tag in midTagList" v-bind:key="tag.id">
          <div class="ego_tag_btn">
            <div class="ego_tag_icon">
              <img v-bind:src="'./src/assets/images/position/' + tag.icon" alt />
            </div>
            <div class="ego_tag_title">{{ tag.title }}</div>
            <div class="ego_tag_description">{{ tag.description }}</div>
          </div>
        </div>
      </div>

      <div class="ego_tag_list" v-if="adBtnOn">
        <div class="ego_tag_list_item" v-for="tag in adTagList" v-bind:key="tag.id">
          <div class="ego_tag_btn">
            <div class="ego_tag_icon">
              <img v-bind:src="'./src/assets/images/position/' + tag.icon" alt />
            </div>
            <div class="ego_tag_title">{{ tag.title }}</div>
            <div class="ego_tag_description">{{ tag.description }}</div>
          </div>
        </div>
      </div>

      <div class="ego_tag_list" v-if="supBtnOn">
        <div class="ego_tag_list_item" v-for="tag in supTagList" v-bind:key="tag.id">
          <div class="ego_tag_btn">
            <div class="ego_tag_icon">
              <img v-bind:src="'./src/assets/images/position/' + tag.icon" alt />
            </div>
            <div class="ego_tag_title">{{ tag.title }}</div>
            <div class="ego_tag_description">{{ tag.description }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      btnUrl: "./src/assets/images/profile_make_btn/",
      topBtnOn: true,
      jgBtnOn: false,
      midBtnOn: false,
      adBtnOn: false,
      supBtnOn: false,
      filter: "Top",
      //ego tag 목록
      /*
       각 태그별 id 규칙
       */
      topTagList: [],
      jgTagList: [
        {
          id: 0,
          title: "와드 장인",
          description: "맵이 어두웠던 적이 없습니다.",
          icon: "support_on.png"
        },
        {
          id: 1,
          title: "걸어다니는 포탑",
          description: "단단한 챔피언만 합니다.",
          icon: "support_on.png"
        },
        {
          id: 2,
          title: "용사냥꾼",
          description: "용을 만들어서 잡습니다.",
          icon: "support_on.png"
        },
        {
          id: 3,
          title: "베스트 스마이터",
          description: "강타 싸움은 누구에게도 지지 않습니다.",
          icon: "support_on.png"
        },
        {
          id: 4,
          title: "다이빙 국가대표",
          description: "다이브 플레이에 능합니다.",
          icon: "support_on.png"
        }
      ],
      midTagList: [],
      adTagList: [],
      supTagList: [],
      selecteEgoTags: []
    };
  },
  methods: {
    positionFilter: function(payload) {
      switch (payload) {
        case "top":
          this.topBtnOn = true;
          this.jgBtnOn = false;
          this.midBtnOn = false;
          this.adBtnOn = false;
          this.supBtnOn = false;
          this.filter = "Top";
          break;
        case "jg":
          this.topBtnOn = false;
          this.jgBtnOn = true;
          this.midBtnOn = false;
          this.adBtnOn = false;
          this.supBtnOn = false;
          this.filter = "Jungle";
          break;
        case "mid":
          this.topBtnOn = false;
          this.jgBtnOn = false;
          this.midBtnOn = true;
          this.adBtnOn = false;
          this.supBtnOn = false;
          this.filter = "Mid";
          break;
        case "ad":
          this.topBtnOn = false;
          this.jgBtnOn = false;
          this.midBtnOn = false;
          this.adBtnOn = true;
          this.supBtnOn = false;
          this.filter = "AD Carry";
          break;
        case "sup":
          this.topBtnOn = false;
          this.jgBtnOn = false;
          this.midBtnOn = false;
          this.adBtnOn = false;
          this.supBtnOn = true;
          this.filter = "Support";
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style>
.selected_ego_tag_area {
  height: 31.5%;
  position: relative;
}

.selected_ego_tag_list {
  position: relative;
  height: 88%;
}

.ego_tag_area {
  height: 68.5%;
}

.ego_tag_list {
  height: 60%;
  overflow: auto;
}

.position_category {
  text-align: center;
  margin-top: 10px;
}
.position_btn_container {
  width: 18%;
  display: inline-block;
}

.position_btn img {
  width: 100%;
}

.ego_tag_list_item {
  width: 100%;
  height: 20%;
  margin-top: 1.5%;
  margin-bottom: 1.5%;
  text-align: center;
}

.ego_tag_btn {
  width: 92%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0 0 12.4px 0.7px rgba(1, 1, 1, 0.14);
  background-color: #ffffff;
  display: inline-block;
  position: relative;
  text-align: left;
}

.ego_tag_icon {
  width: 12.2%;
  display: inline-block;
  position: absolute;
  left: 1.9%;
  top: 13%;
}

.ego_tag_icon img {
  width: 100%;
}

.ego_tag_title {
  display: inline-block;
  position: absolute;
  left: 17.1%;
  top: 25%;

  font-family: NotoSansKR;
  font-size: 15.5px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.38;
  letter-spacing: normal;
  text-align: left;
  color: #482245;
}

.ego_tag_description {
  display: inline-block;
  position: absolute;
  left: 17.1%;
  bottom: 28.7%;

  font-family: NotoSansKR;
  font-size: 11.5px;
  font-weight: 700;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.51;
  letter-spacing: normal;
  text-align: left;
  color: #482245;
}
</style>