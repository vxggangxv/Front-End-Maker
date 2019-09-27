<template>
  <v-app>
    <v-container fluid>
      <v-row class="mt-5" no-gutters>
        <v-spacer></v-spacer>
        <v-btn
          class="pa-0 mr-5 ml-n1 mt-3"
          color="transparent"
          to="/"
          depressed
          rounded
        >
          <v-icon class="app-logo-comm app-logo-icon mr-1"
            >mdi-account-supervisor-circle</v-icon
          >
          <span class="app-logo-comm app-logo">FEM</span>
        </v-btn>
        <v-spacer></v-spacer>
      </v-row>
      <v-row class="text-center">
        <v-col>
          <span class="font-weight-thin">Sign in to FEM</span>
        </v-col>
      </v-row>
      <v-row>
        <v-card width="320" class="mx-auto">
          <v-card-text>
            <sign-Finish v-if="$store.state.emailSend"></sign-Finish>
            <sign-in v-else></sign-in>
            <!-- <template v-if="$store.state.user">
              <finish-sign v-if="$store.state.user.emailVerified"></finish-sign>
            </template>
            <template v-else>
              <sign-in></sign-in>
            </template>-->

            <!-- <sign-in v-if="$store.state.signType"></sign-in>
            <sign-up v-else></sign-up>-->

            <!-- <v-row no-gutters class="px-2 py-3">
              <v-btn @click="signOut" block>로그아웃</v-btn>
            </v-row> -->
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import SignIn from '@/components/auth/SignIn.vue'
import SignUp from '@/components/auth/SignUp.vue'
import SignFinish from '@/components/auth/SignFinish.vue'

export default {
  components: {
    SignIn,
    SignUp,
    SignFinish
  },
  data() {
    return {}
  },
  methods: {
    signOut() {
      this.$firebase.auth().signOut()
    }
  },
  async mounted() {
    // Confirm the link is a sign-in with email link.
    if (this.$firebase.auth().isSignInWithEmailLink(window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      var email = window.localStorage.getItem('emailForSignIn')
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt('Please provide your email for confirmation')
      }
      try {
        await this.$firebase
          .auth()
          .signInWithEmailLink(email, window.location.href)
        // Clear email from storage.
        await window.localStorage.removeItem('emailForSignIn')
        // You can access the new user via result.user
        // Additional user info profile not available via:
        // result.additionalUserInfo.profile == null
        // You can check if the user is new or existing:
        // result.additionalUserInfo.isNewUser
        console.log('success')
        this.$store.state.emailSend = true
        this.$store.state.emailVerified = true
        console.log(this.$store.state.emailSend)
        console.log(this.$store.state.emailVerified)
        // this.$router.push("/");
      } catch (error) {
        console.log(error.message)
        // Some error occurred, you can inspect the code: error.code
        // Common errors could be invalid email and invalid or expired OTPs.
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
