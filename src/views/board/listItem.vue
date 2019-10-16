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
                  <img
                    v-if="$store.state.user.photoURL"
                    :src="$store.state.user.photoURL"
                    alt="avatar"
                  />
                  <v-icon v-else size="50">mdi-account</v-icon>
                </v-avatar>
              </v-col>
              <v-col
                class="mt-4"
                :class="$vuetify.breakpoint.xsOnly ? 'pl-2' : 'pl-8'"
                cols="10"
                sm="11"
              >
                <template v-if="$store.state.user.displayName">
                  <span>@{{ $store.state.user.displayName }}</span>
                </template>
                <template v-else>
                  <span>{{ firstEmailName }}</span>
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
                      <router-link class="body-2 grey--text" to="/board/list">목록보기</router-link>
                      <router-link class="ml-2 body-2 grey--text" :to="`/board/edit/${bid}`">수정</router-link>
                      <a class="ml-2 body-2 grey--text" @click.prevent="del()">삭제</a>
                    </div>
                  </v-card-text>
                  <v-card-text class="px-0 mt-10 mb-5" v-html="content"></v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
          <v-spacer class="hidden-sm-and-down"></v-spacer>
        </v-row>
        <v-row class="another-post-row py-5">
          <v-spacer class="hidden-sm-and-down"></v-spacer>
          <v-col cols="12" md="7" lg="6" xl="5">
            <div class="my-post font-weight-bold">나의 다른 포스트</div>
            <template v-if="boards">
              <div v-for="(item, i) in boards" :key="i">
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
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
import BoardBar from "../../components/BoardBar.vue";

export default {
  data() {
    return {
      bid: null
      // title: null,
      // content: null,
      // items: []
    };
  },
  components: {
    BoardBar
  },
  computed: {
    ...mapState(["boards", "board"]),
    title() {
      return this.board.title;
    },
    content() {
      return this.board.content;
    },
    firstEmailName() {
      var email = this.$store.state.user.email;
      var emailLength = email.length;
      var dot = email.lastIndexOf("@");
      var first = email.substring(0, dot);
      return "@" + first;
    }
  },
  methods: {
    ...mapActions(["FETCH_BOARD", "DELETE_BOARD", "FETCH_BOARD_LIST"]),
    del() {
      this.DELETE_BOARD(this.bid);
      this.$router.push("/board/list");
    },
    anotherPost(id) {
      this.FETCH_BOARD(id);
      this.$router.push(`/board/list/${id}`);
    }
  },
  async mounted() {
    this.bid = this.$route.params.id;
    await this.FETCH_BOARD(this.bid);

    await this.$store.dispatch("FETCH_BOARD_LIST");
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