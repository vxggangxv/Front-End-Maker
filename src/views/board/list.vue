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
                <v-avatar :size="$vuetify.breakpoint.xlOnly ? 160 : 150" color="grey lighten-4">
                  <img
                    v-if="$store.state.user.photoURL"
                    :src="$store.state.user.photoURL"
                    alt="avatar"
                  />
                  <v-icon v-else size="125">mdi-account</v-icon>
                </v-avatar>
              </v-col>
              <v-col
                class="pt-10"
                :class="$vuetify.breakpoint.lgAndUp ? 'px-0' : null"
                cols="12"
                sm="9"
              >
                <div class="mt-3">
                  <template v-if="$store.state.user.displayName">
                    <span class="blue--text">@{{ $store.state.user.displayName }}</span>
                  </template>
                  <template v-else>
                    <div class="blue--text">{{ firstEmailName }}</div>
                  </template>
                </div>
                <!-- <v-divider class="mt-12"></v-divider> -->
                <v-divider class="mt-3"></v-divider>
                <div class="pt-4">
                  <template v-if="$store.state.user.displayName">
                    <span class="font-weight-bold display-1">{{ $store.state.user.displayName }}</span>
                  </template>
                  <template v-else>
                    <span
                      class="font-weight-bold display-1 letter-space-n10"
                    >{{ $store.state.user.email }}</span>
                  </template>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-spacer class="hidden-xs-only"></v-spacer>
              <v-col cols="12" sm="9" :class="$vuetify.breakpoint.lgAndUp ? 'px-0' : null">
                <span class="my-post blue--text">나의 포스트</span>
                <template v-if="items">
                  <v-card
                    outlined
                    :to="`/board/list/${item.id}`"
                    v-for="(item) in items"
                    :key="item.id"
                    class="mt-5"
                  >
                    <v-card-title>{{ item.title }}</v-card-title>
                    <v-divider class="mx-4"></v-divider>
                    <v-card-text class="mb-n3">
                      <!-- {{ item }} -->
                      {{ item.createdAt }} 작성
                      <span class="float-right">
                        <v-btn color="primary" @click.prevent="goEdit(item.id)" small outlined>수정</v-btn>
                        <v-btn
                          class="ml-2"
                          color="error"
                          @click.prevent="del(item.id)"
                          small
                          outlined
                        >삭제</v-btn>
                      </span>
                    </v-card-text>
                    <v-card-actions></v-card-actions>
                  </v-card>
                </template>
                <template v-else>
                  <v-card flat class="mt-5">
                    <v-card-title class="pl-0">아직 작성한 글이 없습니다.</v-card-title>
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
import BoardBar from "../../components/BoardBar.vue";

export default {
  data() {
    return {
      items: []
    };
  },
  components: {
    BoardBar
  },
  computed: {
    firstEmailName() {
      var email = this.$store.state.user.email;
      var emailLength = email.length;
      var dot = email.lastIndexOf("@");
      var first = email.substring(0, dot);
      return "@" + first;
    }
  },
  methods: {
    async goEdit(id) {
      this.$router.push("/board/edit/" + id);
    },
    del(id) {
      this.$store.dispatch("DELETE_BOARD", id);
    }
  },
  async created() {
    await this.$store.dispatch("FETCH_BOARDS");
    this.items = this.$store.state.boards;
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