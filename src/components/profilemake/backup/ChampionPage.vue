<template>
  <div>
    <div class="loading_area">
      <v-ons-modal :visible="loading">
        <p style="text-align: center">
          Loading <v-ons-icon icon="fa-spinner" spin></v-ons-icon>
        </p>
      </v-ons-modal>
    </div>

    <div class="search_area input_area">
		  <span class="input input--minoru">
			  <input class="input__field input__field--minoru" type="text" id="ingameIdInput" v-on:keyup.enter="searchBarBtnAction" v-on:input="typing" ref="inputBox" placeholder="챔피언 검색">
		  </span>
      <span class="search_bar_btn_container" v-if="championInput === ''" v-on:click="searchBarBtnAction">
        <i class="fas fa-search search_bar_btn"></i>
      </span>
      <span class="search_bar_btn_container" v-if="championInput !== ''" v-on:click="deleteSearchInput">
        <i class="fas fa-backspace search_bar_btn"></i>
      </span>
    </div>

    <div class="champion_area">
      <v-ons-carousel fullscreen swipeable auto-scroll overscrollable auto-scroll-ratio="0.1"
        :index.sync="championPageIndex"
      >
        <v-ons-carousel-item class="champion_swipe_page" v-for="pageIndex in 10" v-bind:key="pageIndex" v-if="!searched">
          <div class="champion_btn_container" v-for="championIndex in 16" v-bind:key="championIndex">
            <div class="champion_border" v-if="(pageIndex - 1) * 16 + championIndex - 1 < 148" v-on:click="championBtnAction((pageIndex - 1) * 16 + championIndex - 1)"
              v-bind:style="{ backgroundImage: 'url(./src/assets/images/champion/' + championArr[(pageIndex - 1) * 16 + championIndex - 1].engName + '.png)' }"
              v-bind:class="{selected : championArr[(pageIndex - 1) * 16 + championIndex - 1].selected}" 
            >
              <div class="number" v-if="championArr[(pageIndex - 1) * 16 + championIndex - 1].selected">{{ championArr[(pageIndex - 1) * 16 + championIndex - 1].rank }}</div>
            </div>
          </div>
        </v-ons-carousel-item>
        <v-ons-carousel-item class="champion_swipe_page" v-for="pageIndex in searchArrPage" v-bind:key="pageIndex" v-if="searched">
          <div class="champion_btn_container" v-for="championIndex in 16" v-bind:key="championIndex" v-on:click="championBtnAction(searchChampionArr[(pageIndex - 1) * 16 + championIndex - 1])">
            <div class="champion_border" v-if="(pageIndex - 1) * 16 + championIndex - 1 < searchedChampionCount"
              v-bind:style="{ backgroundImage: 'url(./src/assets/images/champion/' + championArr[searchChampionArr[(pageIndex - 1) * 16 + championIndex - 1]].engName + '.png)' }"
              v-bind:class="{ selected : championArr[searchChampionArr[(pageIndex - 1) * 16 + championIndex - 1]].selected }" 
            >
              <div class="number" v-if="championArr[searchChampionArr[(pageIndex - 1) * 16 + championIndex - 1]].selected">{{ championArr[searchChampionArr[(pageIndex - 1) * 16 + championIndex - 1]].rank }}</div>
            </div>
          </div>
        </v-ons-carousel-item>
      </v-ons-carousel>
    </div>
    
    <div class="selected_champion_area">
      <div class="selected_champion">
        <div class="champion_border selected"
          v-bind:style="[ selectedChampions[0] === -1 ? {} : { backgroundImage: 'url(./src/assets/images/champion/' + championArr[selectedChampions[0]].engName + '.png)' }]"
        >
          <div class="number center" v-show="selectedChampions[0] === -1">?</div>
          <div class="number center" v-show="selectedChampions[0] !== -1">1</div>  
        </div>
      </div>
      <div class="selected_champion">
        <div class="champion_border selected"
          v-bind:style="[ selectedChampions[1] === -1 ? {} : { backgroundImage: 'url(./src/assets/images/champion/' + championArr[selectedChampions[1]].engName + '.png)' }]"
        >
          <div class="number center" v-show="selectedChampions[1] === -1">?</div>
          <div class="number center" v-show="selectedChampions[1] !== -1">2</div>  
        </div>
      </div>
      <div class="selected_champion">
        <div class="champion_border selected"
          v-bind:style="[ selectedChampions[2] === -1 ? {} : { backgroundImage: 'url(./src/assets/images/champion/' + championArr[selectedChampions[2]].engName + '.png)' }]"
        >
          <div class="number center" v-show="selectedChampions[2] === -1">?</div>
          <div class="number center" v-show="selectedChampions[2] !== -1">3</div>  
        </div>
      </div>
    </div>
    
    <v-ons-alert-dialog modifier="rowfooter"
      :title="'프로필 카드 생성'"
      :footer="{
        Cancel: () => profileSuccess = false,
        Ok: makeMyProfile
      }"
      :visible.sync="profileSuccess"
      :mask-color="'rgba(0, 0, 0, 0.7)'"
    >
      입력한 정보로 프로필 카드를 생성합니다.
    </v-ons-alert-dialog>

  </div>
</template>

<script>
export default {
  data: function () {
    return {
      championPageIndex: 0,
      championInput: '',
      searched: false,
      profileCardVisible: false,
      loading: true,
      loadingTimeout: 0,
      selectedChampionsCount: 0,
      profileSuccess: false,
      championArr: [
        { engName: "Garen", koreanName: "가렌", index: 0, selected: false, rank: 0 },
        { engName: "Galio", koreanName: "갈리오", index: 1, selected: false, rank: 0 },
        { engName: "Gangplank", koreanName: "갱플랭크", index: 2, selected: false, rank: 0 },
        { engName: "Gragas", koreanName: "그라가스", index: 3, selected: false, rank: 0 },
        { engName: "Graves", koreanName: "그레이브즈", index: 4, selected: false, rank: 0 },
        { engName: "Gnar", koreanName: "나르", index: 5, selected: false, rank: 0 },
        { engName: "Nami", koreanName: "나미", index: 6, selected: false, rank: 0 },
        { engName: "Nasus", koreanName: "나서스", index: 7, selected: false, rank: 0 },
        { engName: "Nautilus", koreanName: "노틸러스", index: 8, selected: false, rank: 0 },
        { engName: "Nocturne", koreanName: "녹턴", index: 9, selected: false, rank: 0 },
        { engName: "NunuWillump", koreanName: "누누와 윌럼프", index: 10, selected: false, rank: 0 },
        { engName: "Nidalee", koreanName: "니달리", index: 11, selected: false, rank: 0 },
        { engName: "Neeko", koreanName: "니코", index: 12, selected: false, rank: 0 },
        { engName: "Darius", koreanName: "다리우스", index: 13, selected: false, rank: 0 },
        { engName: "Diana", koreanName: "다이애나", index: 14, selected: false, rank: 0 },
        { engName: "Draven", koreanName: "드레이븐", index: 15, selected: false, rank: 0 },
        { engName: "Ryze", koreanName: "라이즈", index: 16, selected: false, rank: 0 },
        { engName: "Rakan", koreanName: "라칸", index: 17, selected: false, rank: 0 },
        { engName: "Rammus", koreanName: "람머스", index: 18, selected: false, rank: 0 },
        { engName: "Lux", koreanName: "럭스", index: 19, selected: false, rank: 0 },
        { engName: "Rumble", koreanName: "럼블", index: 20, selected: false, rank: 0 },
        { engName: "Renekton", koreanName: "레넥톤", index: 21, selected: false, rank: 0 },
        { engName: "Leona", koreanName: "레오나", index: 22, selected: false, rank: 0 },
        { engName: "RekSai", koreanName: "렉사이", index: 23, selected: false, rank: 0 },
        { engName: "Rengar", koreanName: "렝가", index: 24, selected: false, rank: 0 },
        { engName: "Lucian", koreanName: "루시안", index: 25, selected: false, rank: 0 },
        { engName: "Lulu", koreanName: "룰루", index: 26, selected: false, rank: 0 },
        { engName: "LeBlanc", koreanName: "르블랑", index: 27, selected: false, rank: 0 },
        { engName: "LeeSin", koreanName: "리 신", index: 28, selected: false, rank: 0 },
        { engName: "Riven", koreanName: "리븐", index: 29, selected: false, rank: 0 },
        { engName: "Lissandra", koreanName: "리산드라", index: 30, selected: false, rank: 0 },
        { engName: "MasterYi", koreanName: "마스터 이", index: 31, selected: false, rank: 0 },
        { engName: "Maokai", koreanName: "마오카이", index: 32, selected: false, rank: 0 },
        { engName: "Malzahar", koreanName: "말자하", index: 33, selected: false, rank: 0 },
        { engName: "Malphite", koreanName: "말파이트", index: 34, selected: false, rank: 0 },
        { engName: "Mordekaiser", koreanName: "모데카이저", index: 35, selected: false, rank: 0 },
        { engName: "Morgana", koreanName: "모르가나", index: 36, selected: false, rank: 0 },
        { engName: "DrMundo", koreanName: "문도 박사", index: 37, selected: false, rank: 0 },
        { engName: "MissFortune", koreanName: "미스 포츈", index: 38, selected: false, rank: 0 },
        { engName: "Bard", koreanName: "바드", index: 39, selected: false, rank: 0 },
        { engName: "Varus", koreanName: "바루스", index: 40, selected: false, rank: 0 },
        { engName: "Vi", koreanName: "바이", index: 41, selected: false, rank: 0 },
        { engName: "Veigar", koreanName: "베이가", index: 42, selected: false, rank: 0 },
        { engName: "Vayne", koreanName: "베인", index: 43, selected: false, rank: 0 },
        { engName: "VelKoz", koreanName: "벨코즈", index: 44, selected: false, rank: 0 },
        { engName: "Volibear", koreanName: "볼리베어", index: 45, selected: false, rank: 0 },
        { engName: "Braum", koreanName: "브라움", index: 46, selected: false, rank: 0 },
        { engName: "Brand", koreanName: "브랜드", index: 47, selected: false, rank: 0 },
        { engName: "Vladimir", koreanName: "블라디미르", index: 48, selected: false, rank: 0 },
        { engName: "Blitzcrank", koreanName: "블리츠크랭크", index: 49, selected: false, rank: 0 },
        { engName: "Viktor", koreanName: "빅토르", index: 50, selected: false, rank: 0 },
        { engName: "Poppy", koreanName: "뽀삐", index: 51, selected: false, rank: 0 },
        { engName: "Sion", koreanName: "사이온", index: 52, selected: false, rank: 0 },
        { engName: "Sylas", koreanName: "사일러스", index: 53, selected: false, rank: 0 },
        { engName: "Shaco", koreanName: "샤코", index: 54, selected: false, rank: 0 },
        { engName: "Senna", koreanName: "세나", index: 55, selected: false, rank: 0 },
        { engName: "Sejuani", koreanName: "세주아니", index: 56, selected: false, rank: 0 },
        { engName: "Sett", koreanName: "세트", index: 57, selected: false, rank: 0 },
        { engName: "Sona", koreanName: "소나", index: 58, selected: false, rank: 0 },
        { engName: "Soraka", koreanName: "소라카", index: 59, selected: false, rank: 0 },
        { engName: "Shen", koreanName: "쉔", index: 60, selected: false, rank: 0 },
        { engName: "Shyvana", koreanName: "쉬바나", index: 61, selected: false, rank: 0 },
        { engName: "Swain", koreanName: "스웨인", index: 62, selected: false, rank: 0 },
        { engName: "Skarner", koreanName: "스카너", index: 63, selected: false, rank: 0 },
        { engName: "Sivir", koreanName: "시비르", index: 64, selected: false, rank: 0 },
        { engName: "XinZhao", koreanName: "신 짜오", index: 65, selected: false, rank: 0 },
        { engName: "Syndra", koreanName: "신드라", index: 66, selected: false, rank: 0 },
        { engName: "Singed", koreanName: "신지드", index: 67, selected: false, rank: 0 },
        { engName: "Thresh", koreanName: "쓰레쉬", index: 68, selected: false, rank: 0 },
        { engName: "Ahri", koreanName: "아리", index: 69, selected: false, rank: 0 },
        { engName: "Amumu", koreanName: "아무무", index: 70, selected: false, rank: 0 },
        { engName: "AurelionSol", koreanName: "아우렐리온 솔", index: 71, selected: false, rank: 0 },
        { engName: "Ivern", koreanName: "아이번", index: 72, selected: false, rank: 0 },
        { engName: "Azir", koreanName: "아지르", index: 73, selected: false, rank: 0 },
        { engName: "Akali", koreanName: "아칼리", index: 74, selected: false, rank: 0 },
        { engName: "Aatrox", koreanName: "아트록스", index: 75, selected: false, rank: 0 },
        { engName: "Aphelios", koreanName: "아펠리오스", index: 76, selected: false, rank: 0 },
        { engName: "Alistar", koreanName: "알리스타", index: 77, selected: false, rank: 0 },
        { engName: "Annie", koreanName: "애니", index: 78, selected: false, rank: 0 },
        { engName: "Anivia", koreanName: "애니비아", index: 79, selected: false, rank: 0 },
        { engName: "Ashe", koreanName: "애쉬", index: 80, selected: false, rank: 0 },
        { engName: "Yasuo", koreanName: "야스오", index: 81, selected: false, rank: 0 },
        { engName: "Ekko", koreanName: "에코", index: 82, selected: false, rank: 0 },
        { engName: "Elise", koreanName: "엘리스", index: 83, selected: false, rank: 0 },
        { engName: "Wukong", koreanName: "오공", index: 84, selected: false, rank: 0 },
        { engName: "Ornn", koreanName: "오른", index: 85, selected: false, rank: 0 },
        { engName: "Orianna", koreanName: "오리아나", index: 86, selected: false, rank: 0 },
        { engName: "Olaf", koreanName: "올라프", index: 87, selected: false, rank: 0 },
        { engName: "Yorick", koreanName: "요릭", index: 88, selected: false, rank: 0 },
        { engName: "Udyr", koreanName: "우디르", index: 89, selected: false, rank: 0 },
        { engName: "Urgot", koreanName: "우르곳", index: 90, selected: false, rank: 0 },
        { engName: "Warwick", koreanName: "워윅", index: 91, selected: false, rank: 0 },
        { engName: "Yuumi", koreanName: "유미", index: 92, selected: false, rank: 0 },
        { engName: "Irelia", koreanName: "이렐리아", index: 93, selected: false, rank: 0 },
        { engName: "Evelynn", koreanName: "이블린", index: 94, selected: false, rank: 0 },
        { engName: "Ezreal", koreanName: "이즈리얼", index: 95, selected: false, rank: 0 },
        { engName: "Illaoi", koreanName: "일라오이", index: 96, selected: false, rank: 0 },
        { engName: "JarvanIV", koreanName: "자르반 4세", index: 97, selected: false, rank: 0 },
        { engName: "Xayah", koreanName: "자야", index: 98, selected: false, rank: 0 },
        { engName: "Zyra", koreanName: "자이라", index: 99, selected: false, rank: 0 },
        { engName: "Zac", koreanName: "자크", index: 100, selected: false, rank: 0 },
        { engName: "Janna", koreanName: "잔나", index: 101, selected: false, rank: 0 },
        { engName: "Jax", koreanName: "잭스", index: 102, selected: false, rank: 0 },
        { engName: "Zed", koreanName: "제드", index: 103, selected: false, rank: 0 },
        { engName: "Xerath", koreanName: "제라스", index: 104, selected: false, rank: 0 },
        { engName: "Jayce", koreanName: "제이스", index: 105, selected: false, rank: 0 },
        { engName: "Zoe", koreanName: "조이", index: 106, selected: false, rank: 0 },
        { engName: "Ziggs", koreanName: "직스", index: 107, selected: false, rank: 0 },
        { engName: "Jhin", koreanName: "진", index: 108, selected: false, rank: 0 },
        { engName: "Zilean", koreanName: "질리언", index: 109, selected: false, rank: 0 },
        { engName: "Jinx", koreanName: "징크스", index: 110, selected: false, rank: 0 },
        { engName: "ChoGath", koreanName: "초가스", index: 111, selected: false, rank: 0 },
        { engName: "Karma", koreanName: "카르마", index: 112, selected: false, rank: 0 },
        { engName: "Camille", koreanName: "카밀", index: 113, selected: false, rank: 0 },
        { engName: "Kassadin", koreanName: "카사딘", index: 114, selected: false, rank: 0 },
        { engName: "Karthus", koreanName: "카서스", index: 115, selected: false, rank: 0 },
        { engName: "Cassiopeia", koreanName: "카시오페아", index: 116, selected: false, rank: 0 },
        { engName: "Kaisa", koreanName: "카이사", index: 117, selected: false, rank: 0 },
        { engName: "KhaZix", koreanName: "카직스", index: 118, selected: false, rank: 0 },
        { engName: "Katarina", koreanName: "카타리나", index: 119, selected: false, rank: 0 },
        { engName: "Kalista", koreanName: "칼리스타", index: 120, selected: false, rank: 0 },
        { engName: "Kennen", koreanName: "케넨", index: 121, selected: false, rank: 0 },
        { engName: "Caitlyn", koreanName: "케이틀린", index: 122, selected: false, rank: 0 },
        { engName: "Kayn", koreanName: "케인", index: 123, selected: false, rank: 0 },
        { engName: "Kayle", koreanName: "케일", index: 124, selected: false, rank: 0 },
        { engName: "KogMaw", koreanName: "코그모", index: 125, selected: false, rank: 0 },
        { engName: "Corki", koreanName: "코르키", index: 126, selected: false, rank: 0 },
        { engName: "Quinn", koreanName: "퀸", index: 127, selected: false, rank: 0 },
        { engName: "Kled", koreanName: "클레드", index: 128, selected: false, rank: 0 },
        { engName: "Qiyana", koreanName: "키아나", index: 129, selected: false, rank: 0 },
        { engName: "Kindred", koreanName: "킨드레드", index: 130, selected: false, rank: 0 },
        { engName: "Taric", koreanName: "타릭", index: 131, selected: false, rank: 0 },
        { engName: "Talon", koreanName: "탈론", index: 132, selected: false, rank: 0 },
        { engName: "Taliyah", koreanName: "탈리야", index: 133, selected: false, rank: 0 },
        { engName: "TahmKench", koreanName: "탐 켄치", index: 134, selected: false, rank: 0 },
        { engName: "Trundle", koreanName: "트런들", index: 135, selected: false, rank: 0 },
        { engName: "Tristana", koreanName: "트리스타나", index: 136, selected: false, rank: 0 },
        { engName: "Tryndamere", koreanName: "트린다미어", index: 137, selected: false, rank: 0 },
        { engName: "TwistedFate", koreanName: "트위스티드 페이트", index: 138, selected: false, rank: 0 },
        { engName: "Twitch", koreanName: "트위치", index: 139, selected: false, rank: 0 },
        { engName: "Teemo", koreanName: "티모", index: 140, selected: false, rank: 0 },
        { engName: "Pyke", koreanName: "파이크", index: 141, selected: false, rank: 0 },
        { engName: "Pantheon", koreanName: "판테온", index: 142, selected: false, rank: 0 },
        { engName: "Fiddlesticks", koreanName: "피들스틱", index: 143, selected: false, rank: 0 },
        { engName: "Fiora", koreanName: "피오라", index: 144, selected: false, rank: 0 },
        { engName: "Fizz", koreanName: "피즈", index: 145, selected: false, rank: 0 },
        { engName: "Heimerdinger", koreanName: "하이머딩거", index: 146, selected: false, rank: 0 },
        { engName: "Hecarim", koreanName: "헤카림", index: 147, selected: false, rank: 0 },
        { engName: "None", koreanName: "", index: 148 ,selected: false, rank: 0}    
      ],
      searchChampionArr: [],
      selectedChampions: [-1, -1, -1],
    }
  },
  methods: {
    searchBarBtnAction: function () {
      if (this.championInput === '') {
        this.$refs.inputBox.focus();
        if(this.searched) {
          this.searched = false;
          this.searchChampionArr = [];
        }
      } 
      else if(this.searched === false) {
        this.searched = true;
        for (let i = 0; i < this.championArr.length; i++) {
          if (this.championArr[i].koreanName.includes(this.championInput)) {
            this.searchChampionArr.push(i);
          }
        }
        this.championPageIndex = 0;
      } else if(this.searched === true && this.searchChampionArr.length !== 0) {
        this.searchChampionArr = [];
        for (let i = 0; i < this.championArr.length; i++) {
          if (this.championArr[i].koreanName.includes(this.championInput)) {
            this.searchChampionArr.push(i);
          }
        }
        this.championPageIndex = 0;
      }
    },
    deleteSearchInput: function () {
      this.clearInput();
      this.searched = false;
      this.searchChampionArr = [];
      this.$refs.inputBox.value = '';
    },
    typing(e) {
      this.championInput = e.target.value;
    },
    clearInput: function () {
      this.championInput = '';
    },
    championBtnAction: function (championIndex) {
      if(!this.championArr[championIndex].selected && this.selectedChampionsCount < 3) {
        this.championArr[championIndex].selected = true;
        this.championArr[championIndex].rank = this.selectedChampionsCount + 1;
        this.selectedChampions[this.selectedChampionsCount] = championIndex;
        this.selectedChampionsCount += 1;

        if(this.selectedChampions[2] !== -1) {
          this.profileSuccess = true;
        }
      } else {  //지우는 경우의 수
        if (this.selectedChampions[1] === -1) {   // 1개만 선택됨
          this.championArr[championIndex].selected = false;
          this.championArr[championIndex].rank = 0;
          this.selectedChampions[0] = -1;
          this.selectedChampionsCount -= 1;
        } else if (this.selectedChampions[2] === -1) {
          if (this.selectedChampions[0] === championIndex) {
            this.championArr[this.selectedChampions[0]].selected = false;
            this.championArr[this.selectedChampions[0]].rank = 0;
            this.championArr[this.selectedChampions[1]].rank = 1;

            this.selectedChampions[0] = this.selectedChampions[1];
            this.selectedChampions[1] = -1;          
          } else if (this.selectedChampions[1] === championIndex) {
            this.championArr[this.selectedChampions[1]].selected = false;
            this.championArr[this.selectedChampions[1]].rank = 0;
            this.selectedChampions[1] = -1;
          }

          this.selectedChampionsCount -= 1;
        } else {  // 3개 꽉 채운경우
          if (this.selectedChampions[0] === championIndex) {
            this.championArr[this.selectedChampions[0]].selected = false;
            this.championArr[this.selectedChampions[0]].rank = 0;
            this.championArr[this.selectedChampions[1]].rank = 1;
            this.championArr[this.selectedChampions[2]].rank = 2;
            
            this.selectedChampions[0] = this.selectedChampions[1];
            this.selectedChampions[1] = this.selectedChampions[2];
            this.selectedChampions[2] = -1;

            this.selectedChampionsCount -= 1;

          } else if (this.selectedChampions[1] === championIndex) {
            this.championArr[this.selectedChampions[1]].selected = false;
            this.championArr[this.selectedChampions[1]].rank = 0;
            this.championArr[this.selectedChampions[2]].rank = 2;

            this.selectedChampions[1] = this.selectedChampions[2];
            this.selectedChampions[2] = -1;
            
            this.selectedChampionsCount -= 1;

          } else if (this.selectedChampions[2] === championIndex){
            this.championArr[this.selectedChampions[2]].selected = false;
            this.championArr[this.selectedChampions[2]].rank = 0;

            this.selectedChampions[2] = -1;

            this.selectedChampionsCount -= 1;

          }
        }
      }
    },
    profileCardExCancel: function () {
      this.profileCardVisible = false;
      for (let i = 0; i < 149; i++) {
        this.championArr[i].selected = false;
      }
      this.$store.commit("cancelProfile");
    },
    makeMyProfile: function () {
      let selected = [];
      
      for (let i = 0; i < 3; i++) {
        selected.push(this.championArr[this.selectedChampions[i]]);
      }

      this.profileSuccess = false;
      
      this.$store.commit("completeChampion", selected);

      this.$emit("profile_confirm");

    },
    cancelMyProfile: function () {
      this.profileCardVisible = false;
      for (let i = 0; i < 149; i++) {
        this.championArr[i].selected = false;
      }
      this.$store.commit("cancel_confirm");
    }
  },
  computed: {
    myTier: function () {
      if (this.$store.state.isHigh) {
        return this.$store.state.myTier + " " + this.$store.state.lp + "LP";
      } else{
        let tierLev = this.$store.state.tierLev;
        let romeLev;
        switch (tierLev) {
        case 1:
          romeLev = "I";
          break;
        case 2:
          romeLev = "II";
          break;
        case 3:
          romeLev = "III";
          break;
        case 4:
          romeLev = "IV";
          break;
        default:
          break;  
        }
        return this.$store.state.myTier + " " + romeLev;
      }
    },
    myPositions: function () {
      return this.$store.getters.getPositionArr;
    },
    myIngameId: function () {
      return this.$store.state.ingameId;
    },
    isVoiceOn: function () {
      return this.$store.state.isVoiceOn;
    },
    searchedChampionCount: function () {
      return this.searchChampionArr.length;
    },
    searchArrPage: function () {
      return parseInt(this.searchedChampionCount / 16) + 1;
    }
  },
  created: function () {
    clearTimeout(this.loadingTimeout);
    this.loadingTimeout = setTimeout(() => this.loading = false, 800);
  }
}
</script>

<style scoped>
input:focus {
  outline: none;
}

.champion_area {
  border-top: solid 0.05em #461f41;
  border-bottom: solid 0.05em #461f41;
  background-color: white;
}

.search_area {
  width: 100%;
  height: 20%;
}

.search_bar_btn_container {
  position: absolute;
  border-radius: 15px;
  vertical-align: middle;
  margin-top: 2%;
}

.search_bar_btn {
  color: #882a7f;
  font-size: 2em;
}
.closeModalBtn {
  color: #42b983;
}


ul {
  padding: 0;
  width: 100%;
  display: inline-block;
}

.champion_btn {
  display: block;
}

.number {
  font-size: 45px;
  font-weight: 800;
  color: white;
}

.selected {
  filter: grayscale(100%);
}

.champion_border {
  width: 65px;
  height: 65px;
  background-size: 65px;
  position: relative;
  margin-left: auto;
  margin-right: auto;
}

.champion_btn_container {
  display: block;
  list-style: none;
  width: 25%;
  height: 64px;
  float: left;
}

.champion_img {
  width: 75%;
}

.champion_swipe_page {
  text-align: center;
}

.selected_champion_area {
  text-align: right;
}

.selected_champion{
  display: inline-block;
  margin-right: 4%;
  border: solid 1px #461f41;
}

/*
 *  프로필카드 예시
 */

.championExContainer {
  display: inline-block;
}

 .championEx {
   border-radius: 50%;
   width: 40px;
   height: 40px;
   display: block;
 }


/*
 * 기기 height별 챔피언 영역 크기 조절
 */

@media (min-height:500px) and (max-height:599px) {  
  .champion_area {
    height: 330px;
    margin-top: 5%;
  }
  .selected_champion_area {
    margin-top: 5%;
  }
  .selected_champion {
    margin-right: 2%;
  }
  .search_area {
    margin-top: 18%;
  }
  .champion_btn_container {
    margin-top: 4%;
  }
}

@media (min-height:600px) and (max-height:699px) {  
  .champion_area {
    height: 380px;
    margin-top: 5%;
  }
  .selected_champion_area {
    margin-top: 7%;
  }
  .search_area {
    margin-top: 17%;
  }
  .champion_btn_container {
    margin-top: 7%;
  }
}

@media (min-height:700px) and (max-height:799px) {  
  .champion_area {
    height: 465px;
    margin-top: 5%;
  }
  .selected_champion_area {
    margin-top: 5%;
  }
  .search_area {
    margin-top: 15%;
  }
  .champion_btn_container {
    margin-top: 10%;
  }
}

@media (min-height:800px) and (max-height: 900px) {  
  .champion_area {
    height: 460px;
    margin-top: 5%;
  }
  .selected_champion_area {
    margin-top: 7%;
  }
  .search_area {
    margin-top: 25%;
  }
  .champion_btn_container {
    margin-top: 10%;
  }
}
</style>