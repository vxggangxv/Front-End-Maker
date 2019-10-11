<template>
  <v-app>
    <BoardBar />

    <v-content class="white mt-12">
      <v-container grid-list-sm>
        <v-row>
          <v-spacer></v-spacer>
          <v-col xs="12" md="9" lg="7">
            <v-row>
              <v-col cols="3">
                <v-avatar size="150" color="grey lighten-4">
                  <img
                    v-if="$store.state.user.photoURL"
                    :src="$store.state.user.photoURL"
                    alt="avatar"
                  />
                  <v-icon v-else size="125">mdi-account</v-icon>
                </v-avatar>
              </v-col>
              <v-col class="pt-10" cols="9">
                <div class="blue--text mt-3">{{ firstEmailName }}</div>
                <!-- <v-divider class="mt-12"></v-divider> -->
                <v-divider class="mt-3"></v-divider>
                <div class="pt-4">
                  <template v-if="$store.state.user.displayName">
                    <span class="font-weight-bold display-1">{{ $store.state.user.displayName }}</span>
                  </template>
                  <template v-else>
                    <span class="font-weight-bold display-1">{{ $store.state.user.email }}</span>
                  </template>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-spacer></v-spacer>
              <v-col class="pl-5" cols="10">
                <span class="my-post blue--text">나의 포스트</span>
              </v-col>
            </v-row>
            <template v-if="items">
              <v-row v-for="(item, i) in items" :key="i">
                <v-spacer></v-spacer>
                <v-col class="pl-5" cols="10">
                  <v-card outlined :to="`/board/list/${item.id}`">
                    <!-- <v-card-title primary-title>{{ item.id }}</v-card-title> -->
                    <v-card-title>{{ item.title }}</v-card-title>
                    <v-divider class="mx-4"></v-divider>
                    <v-card-text class="mb-n3">
                      날짜
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
                </v-col>
              </v-row>
            </template>
            <template v-else>
              <v-row>
                <v-spacer></v-spacer>
                <v-col class="pl-5" cols="10">
                  <v-card flat>
                    <v-card-title class="pl-0">아직 작성한 글이 없습니다.</v-card-title>
                  </v-card>
                </v-col>
              </v-row>
            </template>
          </v-col>
          <v-spacer></v-spacer>
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
      // items: []
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
    },
    items() {
      return this.$store.state.boards;
    }
  },
  methods: {
    async goEdit(id) {
      this.$router.push("/board/edit/" + id);
    },
    async del(id) {
      const r = await this.$firebase
        .firestore()
        .collection("board")
        .doc(id)
        .delete();
      await this.get();
      console.log(r);
    }
  },
  async created() {
    this.$store.dispatch("FETCH_BOARDS");
  }
};
</script>
<style lang="scss" scoped>
.content-viewer {
  height: calc(100% - 80px);
}
.my-post {
  display: inline-block;
  font-size: 22px;
  border-bottom: 2px solid #2196f3;
  padding-bottom: 5px;
  margin-bottom: 5px;
}
</style>