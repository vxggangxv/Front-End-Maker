<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-card-title primary-title>
      <span class="title">로그인</span>
      <v-spacer></v-spacer>
      <span class="caption">
        또는&nbsp;
        <a @click="$store.commit('setSignType', false)">회원가입</a>
      </span>
    </v-card-title>
    <v-card-text>
      <div class="mt-3">
        <v-btn color="red" dark block>
          <v-icon>mdi-google</v-icon>
          <v-divider vertical class="mx-3"></v-divider>
          Google 계정으로 로그인
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
      <v-text-field label="비밀번호" v-model="form.password" :rules="[rule.required, rule.minLength(6), rule.maxLength(50)]" type="password" @keydown.enter="signInWithEmailAndPassword" required></v-text-field>
      <div class="small-terms-text">이 페이지는 reCAPTCHA로 보호되며, Google <a href="https://www.google.com/policies/privacy/" target="_blank">개인정보처리방침</a> 및 <a href="https://www.google.com/policies/terms/" target="_blank">서비스 약관</a>의 적용을 받습니다.</div>
    </v-card-text>

    <v-card-actions>
      <!-- <router-link to="/passwordReset" class="font-weight-light">비밀번호를 잊어버렸나요?</router-link> -->
      <v-spacer></v-spacer>
      <v-btn color="primary" :disabled="!valid" @click="signInWithEmailAndPassword">
        로그인
      </v-btn>
    </v-card-actions>
  </v-form>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          email: '',
          password: ''
        },
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
      async signInWithEmailAndPassword () {
        if (!this.$refs.form.validate()) return this.$toasted.global.error('입력 폼을 올바르게 작성해주세요.')
        await this.$firebase.auth().signInWithEmailAndPassword(this.form.email, this.form.password)
        const user = this.$firebase.auth().currentUser
        if (!user.emailVerified) {
          await user.sendEmailVerification()
          this.$toasted.global.notice('인증을 위해 이메일을 확인해주세요')
          await this.$firebase.auth().signOut()
        } else {
          await this.$store.commit('setUser', user)
          this.$router.push('/')
        }
      }
    },
    
  }

</script>

<style lang="scss" scoped>

</style>
