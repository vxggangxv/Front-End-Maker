<template>
  <v-container fluid>
    <div class="title">최신 Article</div>
    <v-row>
      <v-col v-for="item in boardList" :key="item.id" cols="12" sm="6" md="4" lg="3">
        <v-card class="post-card" :to="`/board/list/${item.id}`">
          <div class="thumbnail-container" v-if="item.titleImg">
            <figure v-html="item.titleImg"></figure>
            <!-- <v-btn v-if="!$store.state.user" @click="goSignIn" color="white" depressed>로그인</v-btn>
            <v-btn v-else icon v-on="on" class="avatar-btn">
              <v-avatar size="36" color="white">
                <img
                  v-if="$store.state.user.photoURL"
                  :src="$store.state.user.photoURL"
                  alt="avatar"
                />
                <v-icon v-else>mdi-account</v-icon>
              </v-avatar>
            </v-btn>-->
          </div>
          <v-card-title class="pt-5 pb-3">
            <div class="post-title-wrapper">
              <span class="writer green--text">{{ item.writer }}</span>
              <div class="post-title">{{ item.title }}</div>
              <div class="date grey--text">{{ item.updatedAt }}</div>
            </div>
          </v-card-title>
          <v-divider class="mx-4"></v-divider>
          <v-card-text class="pt-7">
            <template v-if="item.titleImg">
              <div class="post-text-wrapper">
                <div v-html="item.summary" class="post-text line-clamp01"></div>
              </div>
            </template>
            <template v-else>
              <div class="post-text-wrapper">
                <div v-html="item.summary" class="post-text line-clamp02"></div>
              </div>
            </template>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      items: []
      // boardList: ""
    };
  },
  computed: {
    ...mapState(["board", "boardList"])
  },
  methods: {
    ...mapActions(["FETCH_BOARD", "UPDATE_BOARD_TITLE"])
  },
  async created() {
    await this.$store.dispatch("FETCH_BOARD_LIST");
    this.$store.commit("SET_IS_EMAIL_SEND", false);
    // console.log(this.$store.state.boardList);
  }
};
</script>

<style lang="scss" scoped>
.thumbnail-container {
  position: relative;
  height: 195px;
  overflow: hidden;
  figure {
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.post-card {
  height: 495px;
  overflow: hidden;
  .post-title-wrapper {
    height: 110px;
    .writer {
      display: block;
      font-size: 13px;
    }
    .post-title {
      line-height: 1.3;
    }
    .date {
      font-size: 13px;
    }
  }
  .post-text-wrapper {
    .post-text {
      font-size: 16px;

      overflow-y: hidden;
      word-break: break-all;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      line-height: 25px;
      text-overflow: ellipsis;
      &.line-clamp01 {
        -webkit-line-clamp: 4;
        height: 100px;
      }
      &.line-clamp02 {
        -webkit-line-clamp: 11;
        height: 275px;
      }
    }
  }
}
</style>