<template>
  <v-form class="px-2" v-model="valid" ref="form" lazy-validation>
    <div class="mt-3">
      <v-btn color="red" dark block @click="signInWithGoogle">
        <v-icon>mdi-google</v-icon>
        <v-divider vertical class="mx-3"></v-divider>Google 계정으로 로그인
      </v-btn>
    </div>
    <v-row class="mt-3" no-gutters>
      <v-col xs-5>
        <v-divider class="mt-3"></v-divider>
      </v-col>
      <v-col xs-2 class="text-center">또는</v-col>
      <v-col xs-5>
        <v-divider class="mt-3"></v-divider>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-text-field
        label="이메일"
        v-model="form.email"
        :rules="[rule.required, rule.maxLength(50), rule.email]"
        required
      ></v-text-field>
    </v-row>
    <v-row no-gutters class="mt-2">
      <v-btn color="primary" :disabled="!valid" @click="signInWithEmailLink" block>로그인 링크 보내기</v-btn>
    </v-row>
    <div class="small-terms-text mt-2">
      이 페이지는 reCAPTCHA로 보호되며, Google
      <a
        href="https://www.google.com/policies/privacy/"
        target="_blank"
      >개인정보처리방침</a> 및
      <a href="https://www.google.com/policies/terms/" target="_blank">서비스 약관</a>의
      적용을 받습니다.
    </div>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      rule: {
        required: v => !!v || "필수 항목입니다.",
        minLength: length => v =>
          v.length >= length || `${length}자리 이상으로 입력하세요.`,
        maxLength: length => v =>
          v.length <= length || `${length}자리 이하으로 입력하세요.`,
        email: v => /.+@.+/.test(v) || "이메일 형식에 맞지 않습니다.",
        agree: v => !!v || "약관에 동의해야 진행됩니다."
      },
      valid: false
    };
  },
  methods: {
    async signInWithGoogle() {
      const provider = new this.$firebase.auth.GoogleAuthProvider();
      this.$firebase.auth().languageCode = "ko";
      try {
        await this.$firebase.auth().signInWithPopup(provider);
        // const user = this.$firebase.auth().currentUser
        console.log('success');
        this.$router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
    async signInWithEmailLink() {
      if (!this.$refs.form.validate()) return this.$toasted.global.error("입력 폼을 올바르게 작성해주세요.");
      var actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be whitelisted in the Firebase Console.
        // url: "https://front-end-maker.firebaseapp.com",
        // url: 'http://localhost:8080/',
        url: window.location.href,
        // This must be true.
        handleCodeInApp: true
      };
      try {
        const email = this.form.email;
        await this.$firebase
          .auth()
          .sendSignInLinkToEmail(email, actionCodeSettings);
        await window.localStorage.setItem("emailForSignIn", email);

        this.$store.state.emailSend = true;
        this.$toasted.global.notice("인증을 위해 이메일을 확인해주세요");
        // console.log("linkToEmail success");
      } catch (error) {
        console.log(error.message);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
