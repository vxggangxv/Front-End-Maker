<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-card-title primary-title>
      <span class="title">회원가입</span>
      <v-spacer></v-spacer>
      <span class="caption">
        또는&nbsp;
        <a @click="$store.commit('setSignType', true)">로그인</a>
      </span>
    </v-card-title>
    <v-card-text>
      <div class="mt-3">
        <v-btn color="red" dark block>
          <v-icon>mdi-google</v-icon>
          <v-divider vertical class="mx-3"></v-divider>
          Google 계정으로 회원가입
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

      <v-text-field label="이메일" v-model="form.email" :rules="[rule.required, rule.minLength(7), rule.maxLength(50), rule.email]" required></v-text-field>
      <!-- <v-text-field label="닉네임" v-model="form.nickName" :rules="[rule.required, rule.minLength(3)]"></v-text-field>
      <v-text-field label="비밀번호" v-model="form.password" :rules="[rule.required, rule.minLength(6), rule.maxLength(50)]" type="password" @keydown.enter="createWithEmailAndPassword" required></v-text-field> -->
      <div class="small-terms-text">이 페이지는 reCAPTCHA로 보호되며, Google <a href="https://www.google.com/policies/privacy/" target="_blank">개인정보처리방침</a> 및 <a href="https://www.google.com/policies/terms/" target="_blank">서비스 약관</a>의 적용을 받습니다.</div>
    </v-card-text>

    <v-card-actions class="my-n4">
      <v-spacer></v-spacer>
      <v-btn color="primary" :disabled="!valid" @click="createWithEmailAndPassword">
        회원가입
      </v-btn>
    </v-card-actions>
  </v-form>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          nickName: '',
          email: '',
          password: ''
        },
        agree: false,
        rule: {
          required: v => !!v || '필수 항목입니다.',
          minLength: length => v => v.length >= length || `${length}자리 이상으로 입력하세요.`,
          maxLength: length => v => v.length <= length || `${length}자리 이하으로 입력하세요.`,
          email: v => /.+@.+/.test(v) || '이메일 형식에 맞지 않습니다.',
          agree: v => !!v || '약관에 동의해야 진행됩니다.'
        },
        valid: false
      }
    },
    methods: {
      async createWithEmailAndPassword() {
        var actionCodeSettings = {
          // URL you want to redirect back to. The domain (www.example.com) for this
          // URL must be whitelisted in the Firebase Console.
          url: window.location.href,
          // This must be true.
          handleCodeInApp: true,
        };
        const email = this.form.email
        try {
          await this.$firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
          await window.localStorage.setItem('emailForSignIn', email);
          this.$store.commit('setSignType', true)
          console.log('linkToEmail success');
        } catch (error) {
          console.log(error.message);
        }
      },
    },
  }

</script>

<style lang="scss" scoped>
  .recaptcha-terms-text {
    font-size: 12px;
    font-weight: 200;
    color: #637282
  }

</style>
