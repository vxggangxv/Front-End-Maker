<template>
  <v-app>
    <BoardBar />

    <v-content class="white mt-12">
      <v-container fluid>
        <v-row>
          <v-spacer class="hidden-sm-and-down"></v-spacer>
          <v-col cols="12" md="7" lg="6" xl="5">
            <v-row>
              <v-col cols="2" sm="1">
                <v-avatar size="62" color="grey lighten-4">
                  <v-icon v-if="!getUserBoard.photoURL" size="50">mdi-account</v-icon>
                  <img v-else :src="getUserBoard.photoURL" alt="avatar" />
                </v-avatar>
              </v-col>
              <v-col
                class="mt-4"
                :class="$vuetify.breakpoint.xsOnly ? 'pl-2' : 'pl-5'"
                cols="10"
                sm="11"
              >
                <template v-if="getUserBoard">
                  <template v-if="getUserBoard.displayName">
                    <span>@{{ getUserBoard.displayName }}</span>
                  </template>
                  <template v-else>
                    <span>{{ firstName }}</span>
                  </template>
                </template>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-card flat>
                  <v-card-title class="pl-0 pb-5 font-weight-bold display-1">{{ title }}</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text class="px-0">
                    <div class="float-right">
                      <router-link
                        class="body-2 grey--text"
                        :to="`/board/list/${getUserBoard.uid}`"
                      >목록보기</router-link>
                      <template v-if="$store.state.user.uid === getUserBoard.uid">
                        <router-link class="ml-2 body-2 grey--text" :to="`/board/edit/${bid}`">수정</router-link>
                        <a class="ml-2 body-2 grey--text" @click.prevent="del()">삭제</a>
                      </template>
                    </div>
                  </v-card-text>
                  <v-card-text class="px-0 mt-10 mb-5 subtitle-1 black--text" v-html="content"></v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
          <v-spacer class="hidden-sm-and-down"></v-spacer>
        </v-row>
        <!-- <v-row class="another-post-row py-5">
          <v-spacer class="hidden-sm-and-down"></v-spacer>
          <v-col cols="12" md="7" lg="6" xl="5">
            <div class="my-post font-weight-bold">나의 다른 포스트</div>
            <template v-if="boardList">
              <div v-for="item in boardList" :key="item.id">
                <v-card outlined class="mt-4" @click="anotherPost(item.id)">
                  <v-card-title>{{ item.title }}</v-card-title>
                  <v-divider class="mx-4"></v-divider>
                  <v-card-text class="mb-n3">날짜</v-card-text>
                  <v-card-actions></v-card-actions>
                </v-card>
              </div>
            </template>
          </v-col>
          <v-spacer class="hidden-sm-and-down"></v-spacer>
        </v-row>-->
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { getHelper } from "../../mixins/getHelper";
import BoardBar from "../../components/BoardBar.vue";

export default {
  data() {
    return {
      bid: null,
      firstName: ""
      // title: null,
      // content: null,
      // items: []
    };
  },
  mixins: [getHelper],
  components: {
    BoardBar
  },
  computed: {
    ...mapState(["boardList", "board"]),
    ...mapGetters(["getUserBoard"]),
    title() {
      return this.getUserBoard.title;
    },
    content() {
      return this.getUserBoard.content;
    }
  },
  methods: {
    ...mapActions([
      "FETCH_USER_LIST",
      "FETCH_BOARD",
      "DELETE_BOARD",
      "FETCH_BOARD_LIST"
    ]),
    del() {
      this.DELETE_BOARD(this.bid);
      this.$router.push("/board/list");
    },
    anotherPost(id, $el) {
      this.bid = id;
      this.FETCH_BOARD(id);
      window.scrollTo(0, 0);
      if (id === this.$route.params.id) return;
      this.$router.push(`/board/list/${id}`);
    }
  },
  created() {
    this.bid = this.$route.params.id;
    this.FETCH_USER_LIST()
      .then(() => {
        this.FETCH_BOARD(this.bid);
      })
      .then(() => {
        this.firstName = "@" + this.getFirstEmailName(this.getUserBoard.email);
      });

    // await this.$store.dispatch("FETCH_BOARD_LIST");
    // await this.FETCH_BOARD_LIST;
  }
};
</script>
<style lang="scss" scoped>
.my-post {
  display: inline-block;
  font-size: 22px;
}
.another-post-row {
  background-color: #f8f9fa;
  border-top: 1px solid #e9ecef;
  border-bottom: 1px solid #e9ecef;
}
</style>