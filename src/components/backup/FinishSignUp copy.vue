<template>
  <v-card>
    이메일 인증이 완료되었습니다.
    <br />메인페이지로 이동합니다.
  </v-card>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    async tokenUpdate() {
      const user = this.$firebase.auth().currentUser;
      await user.getIdToken(true);
      await this.$store.dispatch("getUser", user);
    }
  }
};
</script>
