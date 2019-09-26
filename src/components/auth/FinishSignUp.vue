<template>
  <v-container fluid="">
    <v-card>
      <v-alert type="error" v-if="!this.$store.state.user.emailVerified">이메일을 확인해주세요</v-alert>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    async tokenUpdate () {
      const user = this.$firebase.auth().currentUser
      await user.getIdToken(true)
      await this.$store.dispatch('getUser', user)
    }
  }
}
</script>
