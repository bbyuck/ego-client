<template>
  <div class="page_content">
    <div class="gray_header1">
      <p class="header_text">선택한 챔피언</p>
    </div>
    <div class="selected_champion_area">
      <div class="selected_champion">
        <div
          class="champion_border"
          v-bind:style="
          [ selectedChampions[0] === -1 ? { width: championImgSize + 'px', height: championImgSize + 'px' } : 
          { backgroundImage: 'url(./src/assets/images/champion/' + championArr[selectedChampions[0]].engName + '.png)', width: championImgSize + 'px', height: championImgSize + 'px' } ]"
          v-on:click="selectedAreaBtn(0)"
        >
          <div class="number center" v-show="selectedChampions[0] === -1">?</div>
        </div>
      </div>
      <div class="selected_champion">
        <div
          class="champion_border"
          v-bind:style="
          [ selectedChampions[1] === -1 ? { width: championImgSize + 'px', height: championImgSize + 'px' } : 
          { backgroundImage: 'url(./src/assets/images/champion/' + championArr[selectedChampions[1]].engName + '.png)', width: championImgSize + 'px', height: championImgSize + 'px' } ]"
          v-on:click="selectedAreaBtn(1)"
        >
          <div class="number center" v-show="selectedChampions[1] === -1">?</div>
        </div>
      </div>
      <div class="selected_champion">
        <div
          class="champion_border"
          v-bind:style="
          [ selectedChampions[2] === -1 ? { width: championImgSize + 'px', height: championImgSize + 'px' } : 
          { backgroundImage: 'url(./src/assets/images/champion/' + championArr[selectedChampions[2]].engName + '.png)', width: championImgSize + 'px', height: championImgSize + 'px' } ]"
          v-on:click="selectedAreaBtn(2)"
        >
          <div class="number center" v-show="selectedChampions[2] === -1">?</div>
        </div>
      </div>
    </div>

    <div class="gray_header2">
      <p class="header_text">챔피언 목록</p>
    </div>
    <div class="champion_area">
      <div
        class="champion_btn_container"
        v-bind:style="{ height: championImgSize + 'px'}"
        v-for="champion in championArr"
        v-bind:key="champion.engName"
        v-if="champion.koreanName.includes(searchInput)"
      >
        <div
          class="champion_border"
          v-bind:style="{ backgroundImage: 'url(./src/assets/images/champion/' + champion.engName + '.png)' }"
          v-bind:class="{selected : champion.selected}"
          v-on:click="championBtnAction(champion)"
        >
          <div class="champion_area_number" v-if="champion.selected">{{ champion.rank }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      selectedChampionsCount: 0,
      championArr: [
        {
          showEngName: "Garen",
          engName: "Garen",
          koreanName: "가렌",
          index: 0,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Galio",
          engName: "Galio",
          koreanName: "갈리오",
          index: 1,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Gangplank",
          engName: "Gangplank",
          koreanName: "갱플랭크",
          index: 2,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Gragas",
          engName: "Gragas",
          koreanName: "그라가스",
          index: 3,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Graves",
          engName: "Graves",
          koreanName: "그레이브즈",
          index: 4,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Gnar",
          engName: "Gnar",
          koreanName: "나르",
          index: 5,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Nami",
          engName: "Nami",
          koreanName: "나미",
          index: 6,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Nasus",
          engName: "Nasus",
          koreanName: "나서스",
          index: 7,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Nautilus",
          engName: "Nautilus",
          koreanName: "노틸러스",
          index: 8,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Nocturne",
          engName: "Nocturne",
          koreanName: "녹턴",
          index: 9,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Nunu & Willump",
          engName: "NunuWillump",
          koreanName: "누누와 윌럼프",
          index: 10,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Nidalee",
          engName: "Nidalee",
          koreanName: "니달리",
          index: 11,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Neeko",
          engName: "Neeko",
          koreanName: "니코",
          index: 12,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Darius",
          engName: "Darius",
          koreanName: "다리우스",
          index: 13,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Diana",
          engName: "Diana",
          koreanName: "다이애나",
          index: 14,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Draven",
          engName: "Draven",
          koreanName: "드레이븐",
          index: 15,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Ryze",
          engName: "Ryze",
          koreanName: "라이즈",
          index: 16,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Rakan",
          engName: "Rakan",
          koreanName: "라칸",
          index: 17,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Rammus",
          engName: "Rammus",
          koreanName: "람머스",
          index: 18,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Lux",
          engName: "Lux",
          koreanName: "럭스",
          index: 19,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Rumble",
          engName: "Rumble",
          koreanName: "럼블",
          index: 20,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Renekton",
          engName: "Renekton",
          koreanName: "레넥톤",
          index: 21,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Leona",
          engName: "Leona",
          koreanName: "레오나",
          index: 22,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Rek'Sai",
          engName: "RekSai",
          koreanName: "렉사이",
          index: 23,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Rengar",
          engName: "Rengar",
          koreanName: "렝가",
          index: 24,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Lucian",
          engName: "Lucian",
          koreanName: "루시안",
          index: 25,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Lulu",
          engName: "Lulu",
          koreanName: "룰루",
          index: 26,
          selected: false,
          rank: 0
        },
        {
          showEngName: "LeBlanc",
          engName: "LeBlanc",
          koreanName: "르블랑",
          index: 27,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Lee Sin",
          engName: "LeeSin",
          koreanName: "리 신",
          index: 28,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Riven",
          engName: "Riven",
          koreanName: "리븐",
          index: 29,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Lissandra",
          engName: "Lissandra",
          koreanName: "리산드라",
          index: 30,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Master Yi",
          engName: "MasterYi",
          koreanName: "마스터 이",
          index: 31,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Maokai",
          engName: "Maokai",
          koreanName: "마오카이",
          index: 32,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Malzahar",
          engName: "Malzahar",
          koreanName: "말자하",
          index: 33,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Malphite",
          engName: "Malphite",
          koreanName: "말파이트",
          index: 34,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Mordekaiser",
          engName: "Mordekaiser",
          koreanName: "모데카이저",
          index: 35,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Morgana",
          engName: "Morgana",
          koreanName: "모르가나",
          index: 36,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Dr. Mundo",
          engName: "DrMundo",
          koreanName: "문도 박사",
          index: 37,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Miss Fortune",
          engName: "MissFortune",
          koreanName: "미스 포츈",
          index: 38,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Bard",
          engName: "Bard",
          koreanName: "바드",
          index: 39,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Varus",
          engName: "Varus",
          koreanName: "바루스",
          index: 40,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Vi",
          engName: "Vi",
          koreanName: "바이",
          index: 41,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Veigar",
          engName: "Veigar",
          koreanName: "베이가",
          index: 42,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Vayne",
          engName: "Vayne",
          koreanName: "베인",
          index: 43,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Vel'Koz",
          engName: "VelKoz",
          koreanName: "벨코즈",
          index: 44,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Volibear",
          engName: "Volibear",
          koreanName: "볼리베어",
          index: 45,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Braum",
          engName: "Braum",
          koreanName: "브라움",
          index: 46,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Brand",
          engName: "Brand",
          koreanName: "브랜드",
          index: 47,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Vladimir",
          engName: "Vladimir",
          koreanName: "블라디미르",
          index: 48,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Blitzcrank",
          engName: "Blitzcrank",
          koreanName: "블리츠크랭크",
          index: 49,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Viktor",
          engName: "Viktor",
          koreanName: "빅토르",
          index: 50,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Poppy",
          engName: "Poppy",
          koreanName: "뽀삐",
          index: 51,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Sion",
          engName: "Sion",
          koreanName: "사이온",
          index: 52,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Sylas",
          engName: "Sylas",
          koreanName: "사일러스",
          index: 53,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Shaco",
          engName: "Shaco",
          koreanName: "샤코",
          index: 54,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Senna",
          engName: "Senna",
          koreanName: "세나",
          index: 55,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Sejuani",
          engName: "Sejuani",
          koreanName: "세주아니",
          index: 56,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Sett",
          engName: "Sett",
          koreanName: "세트",
          index: 57,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Sona",
          engName: "Sona",
          koreanName: "소나",
          index: 58,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Soraka",
          engName: "Soraka",
          koreanName: "소라카",
          index: 59,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Shen",
          engName: "Shen",
          koreanName: "쉔",
          index: 60,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Shyvana",
          engName: "Shyvana",
          koreanName: "쉬바나",
          index: 61,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Swain",
          engName: "Swain",
          koreanName: "스웨인",
          index: 62,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Skarner",
          engName: "Skarner",
          koreanName: "스카너",
          index: 63,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Sivir",
          engName: "Sivir",
          koreanName: "시비르",
          index: 64,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Xin Zhao",
          engName: "XinZhao",
          koreanName: "신 짜오",
          index: 65,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Syndra",
          engName: "Syndra",
          koreanName: "신드라",
          index: 66,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Singed",
          engName: "Singed",
          koreanName: "신지드",
          index: 67,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Thresh",
          engName: "Thresh",
          koreanName: "쓰레쉬",
          index: 68,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Ahri",
          engName: "Ahri",
          koreanName: "아리",
          index: 69,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Amumu",
          engName: "Amumu",
          koreanName: "아무무",
          index: 70,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Aurelion Sol",
          engName: "AurelionSol",
          koreanName: "아우렐리온 솔",
          index: 71,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Ivern",
          engName: "Ivern",
          koreanName: "아이번",
          index: 72,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Azir",
          engName: "Azir",
          koreanName: "아지르",
          index: 73,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Akali",
          engName: "Akali",
          koreanName: "아칼리",
          index: 74,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Aatrox",
          engName: "Aatrox",
          koreanName: "아트록스",
          index: 75,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Aphelios",
          engName: "Aphelios",
          koreanName: "아펠리오스",
          index: 76,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Alistar",
          engName: "Alistar",
          koreanName: "알리스타",
          index: 77,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Annie",
          engName: "Annie",
          koreanName: "애니",
          index: 78,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Anivia",
          engName: "Anivia",
          koreanName: "애니비아",
          index: 79,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Ashe",
          engName: "Ashe",
          koreanName: "애쉬",
          index: 80,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Yasuo",
          engName: "Yasuo",
          koreanName: "야스오",
          index: 81,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Ekko",
          engName: "Ekko",
          koreanName: "에코",
          index: 82,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Elise",
          engName: "Elise",
          koreanName: "엘리스",
          index: 83,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Wukong",
          engName: "Wukong",
          koreanName: "오공",
          index: 84,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Ornn",
          engName: "Ornn",
          koreanName: "오른",
          index: 85,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Orianna",
          engName: "Orianna",
          koreanName: "오리아나",
          index: 86,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Olaf",
          engName: "Olaf",
          koreanName: "올라프",
          index: 87,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Yorick",
          engName: "Yorick",
          koreanName: "요릭",
          index: 88,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Udyr",
          engName: "Udyr",
          koreanName: "우디르",
          index: 89,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Urgot",
          engName: "Urgot",
          koreanName: "우르곳",
          index: 90,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Warwick",
          engName: "Warwick",
          koreanName: "워윅",
          index: 91,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Yuumi",
          engName: "Yuumi",
          koreanName: "유미",
          index: 92,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Irelia",
          engName: "Irelia",
          koreanName: "이렐리아",
          index: 93,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Evelynn",
          engName: "Evelynn",
          koreanName: "이블린",
          index: 94,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Ezreal",
          engName: "Ezreal",
          koreanName: "이즈리얼",
          index: 95,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Illaoi",
          engName: "Illaoi",
          koreanName: "일라오이",
          index: 96,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Jarvan IV",
          engName: "JarvanIV",
          koreanName: "자르반 4세",
          index: 97,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Xayah",
          engName: "Xayah",
          koreanName: "자야",
          index: 98,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Zyra",
          engName: "Zyra",
          koreanName: "자이라",
          index: 99,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Zac",
          engName: "Zac",
          koreanName: "자크",
          index: 100,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Janna",
          engName: "Janna",
          koreanName: "잔나",
          index: 101,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Jax",
          engName: "Jax",
          koreanName: "잭스",
          index: 102,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Zed",
          engName: "Zed",
          koreanName: "제드",
          index: 103,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Xerath",
          engName: "Xerath",
          koreanName: "제라스",
          index: 104,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Jayce",
          engName: "Jayce",
          koreanName: "제이스",
          index: 105,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Zoe",
          engName: "Zoe",
          koreanName: "조이",
          index: 106,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Ziggs",
          engName: "Ziggs",
          koreanName: "직스",
          index: 107,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Jhin",
          engName: "Jhin",
          koreanName: "진",
          index: 108,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Zilean",
          engName: "Zilean",
          koreanName: "질리언",
          index: 109,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Jinx",
          engName: "Jinx",
          koreanName: "징크스",
          index: 110,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Cho'Gath",
          engName: "ChoGath",
          koreanName: "초가스",
          index: 111,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Karma",
          engName: "Karma",
          koreanName: "카르마",
          index: 112,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Camille",
          engName: "Camille",
          koreanName: "카밀",
          index: 113,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Kassadin",
          engName: "Kassadin",
          koreanName: "카사딘",
          index: 114,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Karthus",
          engName: "Karthus",
          koreanName: "카서스",
          index: 115,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Cassiopeia",
          engName: "Cassiopeia",
          koreanName: "카시오페아",
          index: 116,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Kaisa",
          engName: "Kaisa",
          koreanName: "카이사",
          index: 117,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Kha'Zix",
          engName: "KhaZix",
          koreanName: "카직스",
          index: 118,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Katarina",
          engName: "Katarina",
          koreanName: "카타리나",
          index: 119,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Kalista",
          engName: "Kalista",
          koreanName: "칼리스타",
          index: 120,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Kennen",
          engName: "Kennen",
          koreanName: "케넨",
          index: 121,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Caitlyn",
          engName: "Caitlyn",
          koreanName: "케이틀린",
          index: 122,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Kayn",
          engName: "Kayn",
          koreanName: "케인",
          index: 123,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Kayle",
          engName: "Kayle",
          koreanName: "케일",
          index: 124,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Kog'Maw",
          engName: "KogMaw",
          koreanName: "코그모",
          index: 125,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Corki",
          engName: "Corki",
          koreanName: "코르키",
          index: 126,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Quinn",
          engName: "Quinn",
          koreanName: "퀸",
          index: 127,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Kled",
          engName: "Kled",
          koreanName: "클레드",
          index: 128,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Qiyana",
          engName: "Qiyana",
          koreanName: "키아나",
          index: 129,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Kindred",
          engName: "Kindred",
          koreanName: "킨드레드",
          index: 130,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Taric",
          engName: "Taric",
          koreanName: "타릭",
          index: 131,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Talon",
          engName: "Talon",
          koreanName: "탈론",
          index: 132,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Taliyah",
          engName: "Taliyah",
          koreanName: "탈리야",
          index: 133,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Tahm Kench",
          engName: "TahmKench",
          koreanName: "탐 켄치",
          index: 134,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Trundle",
          engName: "Trundle",
          koreanName: "트런들",
          index: 135,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Tristana",
          engName: "Tristana",
          koreanName: "트리스타나",
          index: 136,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Tryndamere",
          engName: "Tryndamere",
          koreanName: "트린다미어",
          index: 137,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Twisted Fate",
          engName: "TwistedFate",
          koreanName: "트위스티드 페이트",
          index: 138,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Twitch",
          engName: "Twitch",
          koreanName: "트위치",
          index: 139,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Teemo",
          engName: "Teemo",
          koreanName: "티모",
          index: 140,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Pyke",
          engName: "Pyke",
          koreanName: "파이크",
          index: 141,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Pantheon",
          engName: "Pantheon",
          koreanName: "판테온",
          index: 142,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Fiddlesticks",
          engName: "Fiddlesticks",
          koreanName: "피들스틱",
          index: 143,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Fiora",
          engName: "Fiora",
          koreanName: "피오라",
          index: 144,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Fizz",
          engName: "Fizz",
          koreanName: "피즈",
          index: 145,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Heimerdinger",
          engName: "Heimerdinger",
          koreanName: "하이머딩거",
          index: 146,
          selected: false,
          rank: 0
        },
        {
          showEngName: "Hecarim",
          engName: "Hecarim",
          koreanName: "헤카림",
          index: 147,
          selected: false,
          rank: 0
        }
      ],
      selectedChampions: [-1, -1, -1]
    };
  },
  computed: {
    championImgSize: function() {
      let w = window.innerWidth;
      return w * 0.1765;
    }
  },
  methods: {
    championBtnAction: function(championObj) {
      if (!championObj.selected && this.selectedChampionsCount < 3) {
        championObj.selected = true;
        championObj.rank = this.selectedChampionsCount + 1;
        this.selectedChampions[this.selectedChampionsCount] = championObj.index;
        this.selectedChampionsCount += 1;
      } else {
        //지우는 경우의 수
        if (this.selectedChampions[1] === -1) {
          // 1개만 선택됨
          championObj.selected = false;
          championObj.rank = 0;
          this.selectedChampions[0] = -1;
          this.selectedChampionsCount -= 1;
        } else if (this.selectedChampions[2] === -1) {
          if (this.selectedChampions[0] === championObj.index) {
            this.championArr[this.selectedChampions[0]].selected = false;
            this.championArr[this.selectedChampions[0]].rank = 0;
            this.championArr[this.selectedChampions[1]].rank = 1;

            this.selectedChampions[0] = this.selectedChampions[1];
            this.selectedChampions[1] = -1;
          } else if (this.selectedChampions[1] === championObj.index) {
            this.championArr[this.selectedChampions[1]].selected = false;
            this.championArr[this.selectedChampions[1]].rank = 0;
            this.selectedChampions[1] = -1;
          }

          this.selectedChampionsCount -= 1;
        } else {
          // 3개 꽉 채운경우
          if (this.selectedChampions[0] === championObj.index) {
            this.championArr[this.selectedChampions[0]].selected = false;
            this.championArr[this.selectedChampions[0]].rank = 0;
            this.championArr[this.selectedChampions[1]].rank = 1;
            this.championArr[this.selectedChampions[2]].rank = 2;

            this.selectedChampions[0] = this.selectedChampions[1];
            this.selectedChampions[1] = this.selectedChampions[2];
            this.selectedChampions[2] = -1;

            this.selectedChampionsCount -= 1;
          } else if (this.selectedChampions[1] === championObj.index) {
            this.championArr[this.selectedChampions[1]].selected = false;
            this.championArr[this.selectedChampions[1]].rank = 0;
            this.championArr[this.selectedChampions[2]].rank = 2;

            this.selectedChampions[1] = this.selectedChampions[2];
            this.selectedChampions[2] = -1;

            this.selectedChampionsCount -= 1;
          } else if (this.selectedChampions[2] === championObj.index) {
            this.championArr[this.selectedChampions[2]].selected = false;
            this.championArr[this.selectedChampions[2]].rank = 0;

            this.selectedChampions[2] = -1;

            this.selectedChampionsCount -= 1;
          }
        }
      }
      let selectedChampionsObj = [];

      for (let i = 0; i < 3; i++) {
        if (this.selectedChampions[i] === -1) {
          break;
        }
        selectedChampionsObj[i] = this.championArr[this.selectedChampions[i]];
      }
      this.$emit("championUpdate", selectedChampionsObj);
    },
    selectedAreaBtn: function(index) {
      if (index === 0 && this.selectedChampions[index] !== -1) {
        if (this.selectedChampionsCount === 1) {
          this.championArr[this.selectedChampions[index]].rank = 0;
          this.championArr[this.selectedChampions[index]].selected = false;
          this.selectedChampions[index] = -1;
          this.selectedChampionsCount = 0;
        } else if (this.selectedChampionsCount === 2) {
          this.championArr[this.selectedChampions[index]].rank = 0;
          this.championArr[this.selectedChampions[index]].selected = false;
          this.selectedChampions[0] = this.selectedChampions[1];
          this.championArr[this.selectedChampions[0]].rank = 1;
          this.selectedChampions[1] = -1;
          this.selectedChampionsCount = 1;
        } else if (this.selectedChampionsCount === 3) {
          this.championArr[this.selectedChampions[index]].rank = 0;
          this.championArr[this.selectedChampions[index]].selected = false;
          this.selectedChampions[0] = this.selectedChampions[1];
          this.championArr[this.selectedChampions[0]].rank = 1;
          this.selectedChampions[1] = this.selectedChampions[2];
          this.championArr[this.selectedChampions[1]].rank = 2;
          this.selectedChampions[2] = -1;
          this.selectedChampionsCount = 2;
        }
      } else if (index === 1 && this.selectedChampions[index] !== -1) {
        if (this.selectedChampionsCount === 2) {
          this.championArr[this.selectedChampions[index]].rank = 0;
          this.championArr[this.selectedChampions[index]].selected = false;
          this.selectedChampions[index] = -1;
          this.selectedChampionsCount = 1;
        } else if (this.selectedChampionsCount === 3) {
          this.championArr[this.selectedChampions[index]].rank = 0;
          this.championArr[this.selectedChampions[index]].selected = false;
          this.selectedChampions[index] = this.selectedChampions[2];
          this.championArr[this.selectedChampions[1]].rank = 2;
          this.selectedChampions[2] = -1;
          this.selectedChampionsCount = 2;
        }
      } else if (index === 2 && this.selectedChampions[index] !== -1) {
        this.championArr[this.selectedChampions[index]].rank = 0;
        this.championArr[this.selectedChampions[index]].selected = false;
        this.selectedChampions[index] = -1;
        this.selectedChampionsCount = 2;
      }
      let selectedChampionsObj = [];

      for (let i = 0; i < 3; i++) {
        if (this.selectedChampions[i] === -1) {
          break;
        }
        selectedChampionsObj[i] = this.championArr[this.selectedChampions[i]];
      }

      this.$emit("championUpdate", selectedChampionsObj);
    }
  },
  props: ["searchInput"]
};
</script>

<style>
.header_text {
  margin: 0;
  margin-left: 10%;
}

.selected_champion_area {
  margin-left: 10%;
  margin-top: 15px;
  margin-bottom: 15px;
}

.selected_champion {
  display: inline-block;
  margin-right: 1.68%;
  border: solid 1px #461f41;
}

.selected {
  filter: grayscale(100%);
}

.champion_border {
  width: 100%;
  height: 100%;
  background-size: 100%;
  position: relative;
}

.champion_btn_container {
  display: inline-block;
  width: 21%;
  margin-left: 2%;
  margin-right: 2%;
  text-align: center;
  margin-top: 15px;
}

.number {
  font-size: 45px;
  font-weight: 800;
  position: absolute;
  width: 100%;
  height: 100%;
  color: #461f41;
}

.champion_area {
  height: 250px;
  overflow: auto;
  width: 84%;
  padding-left: 8%;
  padding-right: 8%;
}

.champion_area_number {
  width: 100%;
  height: 100%;
  position: absolute;
  font-size: 45px;
  font-weight: 800;
  color: #fff;
}

@media (min-height: 500px) and (max-height: 599px) {
  .champion_area {
    height: 220px;
  }
}

@media (min-height: 600px) and (max-height: 699px) {
  .champion_area {
    height: 280px;
  }
}

@media (min-height: 700px) and (max-height: 799px) {
  .champion_area {
    height: 370px;
  }
}

@media (min-height: 800px) and (max-height: 900px) {
  .champion_area {
    height: 450px;
  }
}
</style>