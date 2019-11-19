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
        <v-card width="315" class="mx-auto">
          <v-card-text>
            <sign-Finish v-if="$store.state.isEmailSend"></sign-Finish>
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
            </v-row>-->
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import SignIn from "@/components/auth/SignIn.vue";
import SignFinish from "@/components/auth/SignFinish.vue";
import { mapMutations } from "vuex";
import bus from "../utils/bus.js";

export default {
  components: {
    SignIn,
    SignFinish
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["SET_IS_EMAIL_SEND", "SET_IS_EMAIL_VERIFIED"]),
    signOut() {
      this.$firebase.auth().signOut();
    }
  },
  async created() {
    // Confirm the link is a sign-in with email link.
    if (this.$firebase.auth().isSignInWithEmailLink(window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      bus.$emit("on:progress");
      var email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt("Please provide your email for confirmation");
      }
      try {
        const result = await this.$firebase
          .auth()
          .signInWithEmailLink(email, window.location.href);
        // Clear email from storage.
        window.localStorage.removeItem("emailForSignIn");
        // You can access the new user via result.user
        // Additional user info profile not available via:
        // result.additionalUserInfo.profile == null
        // You can check if the user is new or existing:
        // result.additionalUserInfo.isNewUser
        // console.log("success");
        this.SET_IS_EMAIL_SEND(true);
        this.SET_IS_EMAIL_VERIFIED(true);
        const db = this.$firebase.firestore();
        const increment = this.$firebase.firestore.FieldValue.increment(1);

        db.collection("user")
          .doc(result.user.uid)
          .get()
          .then(r => {
            if (!r.exists)
              return result.user.updateProfile({ displayName: null });
            // console.log(r);
            if (r.exists) {
              db.collection("user")
                .doc(result.user.uid)
                .update({
                  visitedAt: new Date(),
                  visitCount: increment
                });
            }
          });

        bus.$emit("off:progress");
        this.$router.push("/");
        // console.log(this.$store.state.emailSend);
        // console.log(this.$store.state.emailVerified);
      } catch (error) {
        console.log(error.message);
        // Some error occurred, you can inspect the code: error.code
        // Common errors could be invalid email and invalid or expired OTPs.
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
