<template>
  <v-app>
    <BoardBar />

    <v-content class="white mt-12">
      <v-container>
        <v-row>
          <v-spacer class="hidden-xs-only"></v-spacer>
          <v-col sm="12" md="9" lg="7" xl="5">
            <v-row>
              <v-col cols="12" sm="3">
                <v-avatar
                  :size="$vuetify.breakpoint.xlOnly ? 160 : 150"
                  color="grey lighten-4"
                >
                  <v-icon v-if="!boardUser.photoURL" size="125"
                    >mdi-account</v-icon
                  >
                  <img v-else :src="boardUser.photoURL" alt="avatar" />
                </v-avatar>
              </v-col>
              <v-col
                class="pt-10"
                :class="$vuetify.breakpoint.lgAndUp ? 'px-0' : null"
                cols="12"
                sm="9"
              >
                <div class="mt-3">
                  <template v-if="boardUser.displayName">
                    <span class="blue--text">@{{ boardUser.displayName }}</span>
                  </template>
                  <template v-else>
                    <div class="blue--text">@{{ firstName }}</div>
                  </template>
                </div>
                <v-divider class="mt-3"></v-divider>
                <div class="pt-4">
                  <template v-if="boardUser.displayName">
                    <span class="font-weight-bold display-1">{{
                      boardUser.displayName
                    }}</span>
                  </template>
                  <template v-else>
                    <span class="font-weight-bold display-1 letter-space-n10">{{
                      boardUser.email
                    }}</span>
                  </template>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-spacer class="hidden-xs-only"></v-spacer>
              <v-col
                cols="12"
                sm="9"
                :class="$vuetify.breakpoint.lgAndUp ? 'px-0' : null"
              >
                <span class="my-post blue--text">포스트</span>
                <template v-if="getBoardList">
                  <v-card
                    outlined
                    :to="`/board/post/${item.id}`"
                    v-for="item in getBoardList"
                    :key="item.id"
                    class="mt-5"
                  >
                    <v-card-title>{{ item.title }}</v-card-title>
                    <v-divider class="mx-4"></v-divider>
                    <v-card-text class="mb-n3">
                      {{ item.createdAt }} 작성
                      <template v-if="$store.state.user">
                        <template
                          v-if="$store.state.user.uid === boardUser.uid"
                        >
                          <span class="float-right">
                            <v-btn
                              color="primary"
                              @click.prevent="goEdit(item.id)"
                              small
                              outlined
                              >수정</v-btn
                            >
                            <v-btn
                              class="ml-2"
                              color="error"
                              @click.prevent="del(item.id)"
                              small
                              outlined
                              >삭제</v-btn
                            >
                          </span>
                        </template>
                      </template>
                    </v-card-text>
                    <v-card-actions></v-card-actions>
                  </v-card>
                </template>
                <template v-else>
                  <v-card flat class="mt-5">
                    <v-card-title class="pl-0"
                      >아직 작성한 글이 없습니다.</v-card-title
                    >
                  </v-card>
                </template>
              </v-col>
            </v-row>
          </v-col>
          <v-spacer class="hidden-xs-only"></v-spacer>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { getHelper } from "../../mixins/getHelper";
import BoardBar from "../../components/BoardBar.vue";
import bus from "../../utils/bus.js";

export default {
  data() {
    return {
      items: [],
      uid: null,
      firstName: ""
    };
  },
  mixins: [getHelper],
  components: {
    BoardBar
  },
  computed: {
    ...mapState({
      // userEmail: state => state.user.email,
      // uid: state => state.user.uid,
      boardUser: "boardUser"
    }),
    ...mapGetters(["getBoardList"]),
    getDate() {}
  },
  methods: {
    ...mapActions(["FETCH_USER_BOARD_LIST", "FETCH_BOARD_USER"]),
    goEdit(id) {
      this.$router.push("/board/edit/" + id);
    },
    del(id) {
      // console.log("del");
      // console.log(id);
      this.$store.dispatch("DELETE_BOARD", id);
      this.getList(this.uid);
    },
    getList(uid) {
      // console.log(this.$store.state.user.email);
      this.FETCH_USER_BOARD_LIST(uid);
    }
  },
  async created() {
    bus.$emit("on:progress");
    this.uid = this.$route.params.id;
    this.getList(this.uid);
    // console.log(this.uid);
    // this.FETCH_BOARD_USER(this.uid);
    await this.FETCH_BOARD_USER(this.uid).then(() => {
      // console.log(this.boardUser);
      if (this.boardUser.email)
        return (this.firstName = this.getFirstEmailName(this.boardUser.email));
    });
    bus.$emit("off:progress");
  }
};
</script>
<style lang="scss" scoped>
.my-post {
  display: inline-block;
  font-size: 22px;
  border-bottom: 2px solid #2196f3;
  padding-bottom: 5px;
  margin-bottom: 5px;
}
</style>
