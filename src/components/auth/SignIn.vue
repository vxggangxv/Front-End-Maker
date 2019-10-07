<template>
  <v-form class="px-2" v-model="valid" ref="form" lazy-validation>
    <v-row class="mt-3" no-gutters>
      <v-text-field
        label="이메일"
        v-model="form.email"
        dense="dense"
        outlined
        :rules="[rules.required, rules.maxLength(50), rules.email]"
        @keydown.prevent.enter="signInWithEmailLink"
        required
      ></v-text-field>
    </v-row>
    <v-row no-gutters>
      <v-btn color="primary" :disabled="!valid" @click="signInWithEmailLink" large block>이메일로 시작하기</v-btn>
    </v-row>
    <v-row class="mt-2" no-gutters>
      <v-col xs-5>
        <v-divider class="mt-3"></v-divider>
      </v-col>
      <v-col xs-2 class="text-center">또는</v-col>
      <v-col xs-5>
        <v-divider class="mt-3"></v-divider>
      </v-col>
    </v-row>
    <div class="mt-2">
      <v-btn color="red" dark large block @click="signInWithGoogle">
        <v-icon>mdi-google</v-icon>
        <v-divider vertical class="mx-3"></v-divider>Google 계정으로 시작하기
      </v-btn>
    </div>
    <!-- <div class="small-terms-text mt-2">
      이 페이지는 reCAPTCHA로 보호되며, Google
      <a
        href="https://www.google.com/policies/privacy/"
        target="_blank"
      >개인정보처리방침</a> 및
      <a href="https://www.google.com/policies/terms/" target="_blank">서비스 약관</a>의
      적용을 받습니다.
    </div>-->
    <div class="small-terms-text mt-2">
      이 페이지는 Google
      <a href="https://www.google.com/policies/privacy/" target="_blank">개인정보처리방침</a> 및
      <a href="https://www.google.com/policies/terms/" target="_blank">서비스 약관</a>의
      적용을 받으며, 회원가입시 동의하신 것으로 간주합니다.
    </div>
  </v-form>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      rules: {
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
    ...mapMutations(["SET_EMAIL_SEND"]),
    async signInWithGoogle() {
      const provider = new this.$firebase.auth.GoogleAuthProvider();
      this.$firebase.auth().languageCode = "ko";
      try {
        await this.$firebase.auth().signInWithPopup(provider);
        // const user = this.$firebase.auth().currentUser
        console.log("success");
        const user = this.$firebase.auth().currentUser;
        await user.updateProfile({ displayName: null });
        this.$router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
    async signInWithEmailLink() {
      if (!this.$refs.form.validate())
        return this.$toasted.global.error("입력 폼을 올바르게 작성해주세요.");
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

        this.SET_EMAIL_SEND(true);
        // this.$store.state.emailSend = true;
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
