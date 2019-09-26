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
            <span class="font-weight-thin">Sign in to FEM</span>
          </v-col>
      </v-row>
      <v-row>
        <v-card width="320" class="mx-auto">
          <v-card-text>
              <sign-in v-if="$store.state.signType"></sign-in>
              <sign-up v-else></sign-up>
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
  import SignIn from '@/components/auth/SignIn.vue'
  import SignUp from '@/components/auth/SignUp.vue'
  import FinishSignUp from '@/components/auth/FinishSignUp.vue'

  export default {
    components: {
      SignIn,
      SignUp,
      FinishSignUp,
    },
    data() {
      return {
        
      }
    },
    mounted() {

    },
  }

</script>

<style lang="scss" scoped>

</style>
