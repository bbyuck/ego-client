<template>
  <v-ons-toolbar>
    <div class="left"></div>
    <div class="center">
      <ons-toolbar-button
        v-show="!ingameIdChanging"
        v-on:click="startChange"
        class="ingame_id_show"
      >{{ this.$store.state.ingameId }}</ons-toolbar-button>
      <span v-show="ingameIdChanging">
        <div class="idChangeBox shadow">
          <input
            type="text"
            ref="idInput"
            class="idInput"
            v-model="changedIngameId"
            v-on:keyup.enter="changeIngameId"
            placeholder="변경할 아이디 입력"
          />
          <span class="change_btn" v-on:click="changeIngameId">
            <i class="fas fa-edit"></i>
          </span>
        </div>
      </span>
    </div>
    <div class="right">
      <span class="voice_btn" v-on:click="voiceToggle">
        <i v-if="isVoiceOn" class="voice_on fas fa-microphone"></i>
        <i v-if="!isVoiceOn" class="voice_off fas fa-microphone-slash"></i>
      </span>
    </div>
  </v-ons-toolbar>
</template>

<script>
export default {
  data: function() {
    return {
      ingameIdChanging: false,
      changedIngameId: "",
      voidInputAlertVisible: false
    };
  },
  methods: {
    startChange: function() {
      this.ingameIdChanging = true;
      this.$refs.idInput.blur();
    },
    changeIngameId: function() {
      if (this.changedIngameId === "") {
        this.ingameIdChanging = false;
      } else {
        this.$store.commit("updateIngameId", this.changedIngameId);
        this.ingameIdChanging = false;
        this.changedIngameId = "";
      }
      this.$refs.idInput.blur();
    },
    voiceToggle: function() {
      this.$store.commit("toggleVoice");
    }
  },
  computed: {
    currentIngameId: function() {
      return this.$store.state.ingameId;
    },
    isVoiceOn: function() {
      return this.$store.state.isVoiceOn;
    }
  }
};
</script>

<style scoped>
.idChangeBox {
  display: inline-block;
  width: 90%;
  background: inherit;
  height: 40px;
  line-height: 40px;
  border-radius: 5px;
}

.idChangeBox input {
  border: none;
  border-bottom-style: groove;
  background: inherit;
  font-size: 0.9rem;
}

.left {
  width: 20%;
}

.idInput {
  width: 60%;
}

.center {
  text-align: center;
  width: 60%;
}

.right {
  text-align: center;
  width: 20%;
}

.voice_btn {
  font-size: 2em;
}

.voice_on {
  color: chartreuse;
}

.voice_off {
  color: red;
}

.ingame_id_show {
  color: black;
  font-weight: 800;
  font-size: 1.5em;
}

.change_btn {
  color: black;
}
</style>