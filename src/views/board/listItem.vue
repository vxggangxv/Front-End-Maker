<template>
  <v-app>
    <BoardBar />

    <v-content class="white mt-12">
      <v-container fluid>
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="6">
            <v-row>
              <v-col cols="1">
                <v-avatar size="62" color="grey lighten-4">
                  <img
                    v-if="$store.state.user.photoURL"
                    :src="$store.state.user.photoURL"
                    alt="avatar"
                  />
                  <v-icon v-else size="62">mdi-account</v-icon>
                </v-avatar>
              </v-col>
              <v-col class="mt-4 pl-2" cols="10">
                <template v-if="$store.state.user.displayName">
                  <div>{{ $store.state.user.displayName }}</div>
                </template>
                <template v-else>
                  <div>{{ firstEmailName }}</div>
                </template>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-card flat>
                  <v-card-title class="pl-0 font-weight-bold display-1">{{ title }}</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text class="pl-0" v-html="content"></v-card-text>
                </v-card>
              </v-col>
            </v-row>
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
      title: null,
      content: null
    };
  },
  components: {
    BoardBar
  },
  methods: {},
  computed: {
    firstEmailName() {
      var email = this.$store.state.user.email;
      var emailLength = email.length;
      var dot = email.lastIndexOf("@");
      var first = email.substring(0, dot);
      return "@" + first;
    }
  },
  async created() {
    const snapshot = await this.$firebase
      .firestore()
      .collection("board")
      .doc(this.$route.params.id)
      .get();
    const { title, content } = snapshot.data();
    this.title = title;
    this.content = content;
    console.log(snapshot);
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