<template>
  <v-app>
    <v-container fluid>
      <v-row class="mt-10" no-gutters>
        <v-spacer></v-spacer>
        <v-chip class="py-5 ma-5" color="transparent" to="/" flat depressed>
          <v-icon class="app-logo-comm app-logo-icon mr-1">mdi-account-supervisor-circle</v-icon> 
          <span class="app-logo-comm app-logo">FEM</span>
        </v-chip>
        <v-spacer></v-spacer>
      </v-row>
      <!-- <v-row class="mb-5">
        <v-spacer></v-spacer>
        <div class="subheading font-weight-light">Sign into FEM</div>
        <v-spacer></v-spacer>
      </v-row> -->
      <v-row>
        <v-card width="320" class="mx-auto" flat>
          <v-card-text>

            <sign-in v-if="signType" @changeSignType="signType = !signType"></sign-in>
            <sign-up v-else @changeSignType="signType = !signType"></sign-up>

          </v-card-text>
        </v-card>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
  import SignIn from '@/components/auth/SignIn.vue'
  import SignUp from '@/components/auth/SignUp.vue'

  export default {
    components: {
      SignIn,
      SignUp
    },
    data() {
      return {
        signType: true
      }
    },
  }

</script>

<style lang="scss" scoped>

</style>
