<template>
  <div>
    <v-menu left offset-y>
      <template v-slot:activator="{ on }">
        <v-btn v-if="!$store.state.user" @click="goSignIn" color="white" depressed>로그인</v-btn>
        <v-btn v-else icon v-on="on" class="avatar-btn">
          <v-avatar size="36" color="white">
            <img v-if="$store.state.user.photoURL" :src="$store.state.user.photoURL" alt="avatar" />
            <v-icon v-else>mdi-account</v-icon>
          </v-avatar>
        </v-btn>
      </template>

      <v-list class="pa-0 body-2" dense flat>
        <v-list-item :to="`/board/list/${user.uid}`">내 포스트</v-list-item>
        <v-divider></v-divider>
        <v-list-item to="/board/write">새 글 작성</v-list-item>
        <v-divider></v-divider>
        <v-list-item to="/home/userProfile">프로필 수정</v-list-item>
        <v-divider></v-divider>
        <v-list-item @click="signOut">로그아웃</v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      path: ""
    };
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    ...mapMutations(["SET_IS_EMAIL_VERIFIED", "SET_IS_DRAWER"]),
    goSignIn() {
      this.SET_IS_EMAIL_VERIFIED(false);
      // this.$store.state.emailVerified = false;
      this.$router.push("/sign");
    },
    signOut() {
      this.$firebase.auth().signOut();
      this.$router.push("/sign");
    }
  },
  mounted() {
    // console.log(this.$route.path);
    this.path = this.$route.path;
  }
};
</script>

<style lang="scss" scoped>
</style>