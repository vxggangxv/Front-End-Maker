<template>
  <v-app>
    <v-container fluid>
      <v-row class="mt-5" no-gutters>
        <v-spacer></v-spacer>
        <v-btn class="pa-0 mr-5 ml-4 mt-3" color="transparent" to="/" depressed rounded>
          <v-icon class="app-logo-comm app-logo-icon mr-1">mdi-account-supervisor-circle</v-icon>
          <span class="app-logo-comm app-logo">FEM</span>
        </v-btn>
        <v-spacer></v-spacer>
      </v-row>
      <v-row class="text-center">
        <v-col>
          <span class="font-weight-thin">Reset your password</span>
        </v-col>
      </v-row>
      <v-row>
        <v-card width="320" class="mx-auto">
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-card-text>
              <v-text-field label="이메일" v-model="form.email"
                :rules="[rule.required, rule.minLength(7), rule.maxLength(50), rule.email]" required></v-text-field>
              <!-- <v-text-field label="비밀번호" v-model="form.password"
                :rules="[rule.required, rule.minLength(6), rule.maxLength(50)]" type="password"
                @keydown.enter="signInWithEmailAndPassword" required></v-text-field> -->
                <v-btn class="mt-2" color="primary" block large @click="resetPasswordWithEmail">
                  비밀번호 재설정 이메일 보내기
                </v-btn>
            </v-card-text>
          </v-form>
        </v-card>
      </v-row>
    </v-container>
  </v-app>
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
      resetPasswordWithEmail () {
        if (!this.$refs.form.validate()) return this.$toasted.global.error('입력 폼을 올바르게 작성해주세요.')
        const actionCodeSettings = {
          // URL you want to redirect back to. The domain (www.example.com) for
          // this URL must be whitelisted in the Firebase Console.
          url: 'http://front-end-maker.firebaseapp.com/checkout?cartId=1234',
          // This must be true for email link sign-in.
          handleCodeInApp: true,
        }
        const userEmail = this.form.email;
        admin.auth().generatePasswordResetLink(userEmail, actionCodeSettings)
        .then((link) => {
          // Construct password reset email template, embed the link and send
          // using custom SMTP server.
          return sendCustomPasswordResetEmail(email, displayName, link);
          console.log('success');
        })
        .catch((error) => {
          console.log('fail');
          // Some error occurred.
        });
      }
    },
  }

</script>

<style lang="scss" scoped>

</style>
