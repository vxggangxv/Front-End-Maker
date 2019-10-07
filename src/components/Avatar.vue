<template>
  <div>
    <v-menu left offset-y>
      <template v-slot:activator="{ on }">
        <v-btn v-if="!$store.state.user" @click="goSignIn" color="white" depressed>로그인</v-btn>
        <v-btn v-else icon v-on="on">
          <v-avatar color="white" size="36">
            <img v-if="$store.state.user.photoURL" :src="$store.state.user.photoURL" alt="avatar" />
            <v-icon v-else>mdi-account</v-icon>
          </v-avatar>
        </v-btn>
      </template>

      <v-list class="pa-0 body-2" dense flat>
        <v-list-item to="/board/list">내 포스트</v-list-item>
        <v-divider></v-divider>
        <v-list-item to="/board/write">새 글 작성</v-list-item>
        <v-divider></v-divider>
        <v-list-item to="/home/user">프로필 수정</v-list-item>
        <v-divider></v-divider>
        <v-list-item @click="signOut">로그아웃</v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations(["SET_EMAIL_VERIFIED", "SET_DRAWER"]),
    goSignIn() {
      this.SET_EMAIL_VERIFIED(false);
      // this.$store.state.emailVerified = false;
      this.$router.push("/sign");
    },
    signOut() {
      this.$firebase.auth().signOut();
      this.$router.push("/sign");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>