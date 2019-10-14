<template>
  <div>
    <v-app-bar color="white pt-5 px-12" flat app>
      <v-btn icon @click="$router.go(-1)">
        <v-icon color="#222">mdi-arrow-left</v-icon>
      </v-btn>
      <h1 class="d-inline-block">
        <router-link to="/" class="black--text font-weight-bold display-1">프만사</router-link>
      </h1>
      <v-spacer></v-spacer>
      <!-- <span class="text--color">{{ $refs.myQuillEditor }}</span> -->

      <Avatar />
    </v-app-bar>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import Avatar from "./Avatar.vue";

export default {
  components: {
    Avatar
  }
};
</script>

<style lang="scss">
.v-application .avatar-btn .v-avatar {
  // background: #f5f5f5 !important;
}
</style>