<template>
  <v-container fluid>
    <div class="title">최신 Article</div>
    <v-row>
      <v-col v-for="item in boardList" :key="item.id" cols="12" sm="6" md="4" lg="3">
        <v-card class="post-card">
          <div class="thumbnail-container" v-if="item.titleImg">
            <router-link :to="`/board/post/${item.id}`" class="black--text">
              <figure v-html="item.titleImg"></figure>
            </router-link>
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
          <v-card-title class="post-title-wrapper pt-4 pb-3">
            <div class="post-writer">
              <router-link class="board-avatar" :to="`/board/list/${item.uid}`">
                <v-avatar size="40" color="grey lighten-3">
                  <img v-if="item.photoURL" :src="item.photoURL" alt="avatar" />
                  <v-icon v-else>mdi-account</v-icon>
                </v-avatar>
              </router-link>
              <!-- <router-link :to="`/board/list/${item.uid}`">
                <v-avatar size="36" color="grey lighten-3">
                  <img v-if="item.photoURL" :src="item.photoURL" alt="avatar" />
                  <v-icon v-else>mdi-account</v-icon>
                </v-avatar>
                <span class="writer green--text">{{ item.email }}</span>
              </router-link>-->
            </div>

            <div class="post-title-container">
              <!-- <span class="body-2 writer green--text">{{ firstname }}</span> -->
              <span class="body-2 writer green--text">{{ item.email }}</span>
              <br />
              <h2 class="post-title">
                <router-link :to="`/board/post/${item.id}`" class="black--text">
                  {{ item.title }}
                  <!-- <br />아아아 -->
                </router-link>
              </h2>
            </div>
            <div class="date grey--text">{{ item.createdAt }}</div>
          </v-card-title>
          <v-divider class="mx-4"></v-divider>
          <v-card-text class="pt-6">
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
import { mapState, mapGetters, mapMutations, mapActions, } from 'vuex'
import { getHelper, } from '../../mixins/getHelper'
import bus from '../../utils/bus.js'

export default {
  data() {
    return {
      items: [],
      // boardList: ""
    }
  },
  mixins: [getHelper,],
  computed: {
    ...mapState(['boardList',]),
    ...mapState(['boardUserList',]),
    ...mapGetters(['getBoardList',]),
  },
  methods: {
    ...mapMutations(['SET_IS_EMAIL_SEND',]),
    ...mapActions([
      'FETCH_BOARD_LIST',
      'FETCH_USER_LIST',
      'FETCH_BOARD_USER_LIST',
    ]),
  },
  async created() {
    bus.$emit('on:progress')
    // this.$store.commit('SET_IS_EMAIL_SEND', false);
    this.SET_IS_EMAIL_SEND(false)
    await this.FETCH_BOARD_LIST()
    await this.FETCH_BOARD_USER_LIST().then(data => {
      // console.log(data);
    })
    bus.$emit('off:progress')
  },
}
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
  margin-top: 25px;
  .thumbnail-container {
    overflow: hidden;
  }
  .post-title-wrapper {
    position: relative;
    display: block;
    height: 135px;
    .board-avatar {
      position: absolute;
      top: -25px;
      right: 10px;
      background-color: #fff;
      border: 5px solid #fff;
      border-radius: 50%;
    }
    .post-writer {
      display: block;
      font-size: 13px;
      .writer {
        display: inline-block;
        margin-left: 10px;
      }
    }
    .post-title-container {
      margin-top: 3px;
      .post-title {
        font-size: 20px;
        line-height: 1.3;
        font-weight: 500;
      }
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
