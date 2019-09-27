<template>
  <v-card flat>
    <v-card-text v-if="!$store.state.emailVerified" class="px-2">
      로그인 링크가 이메일로 전송되었습니다.
      <br />이메일의 링크를 통하여 로그인을 계속하세요.
    </v-card-text>
    <v-card-text v-else class="px-12 text-center">
      이메일 인증이 완료되었습니다.
      <v-btn color="primary mt-3" block>홈으로 이동</v-btn>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>
