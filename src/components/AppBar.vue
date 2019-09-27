<template>
  <div>
    <v-app-bar color="transparent" flat app>
    <!-- <v-app-bar class="app-bar" color="white" :clipped-left="$vuetify.breakpoint.lgAndUp" app> -->
      <v-toolbar-title class="ml-0">
        <!-- <v-app-bar-nav-icon class="hidden-lg-and-up" @click="$store.state.drawer = !$store.state.drawer" ></v-app-bar-nav-icon> -->
        <v-app-bar-nav-icon @click="$store.state.drawer = !$store.state.drawer" ></v-app-bar-nav-icon>
        <!-- <span class="hidden-md-and-down toolbar-title-text"></span> -->
      </v-toolbar-title>
 
      <div class="flex-grow-1"></div>

      <!-- <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn> -->

      <!-- <div class="mx-2">
        <v-btn @click="signOut">로그아웃</v-btn>
      </div>
      <div class="mx-2">
        <v-btn @click="goSignIn">로그인</v-btn>
      </div>
      <div class="mx-2">
        <v-btn @click="goSignUp">회원가입</v-btn>
      </div> -->

      <v-menu left offset-y>
        <template v-slot:activator="{ on }">
          <v-btn v-if="!$store.state.user" @click="goSignIn" color="white" depressed>로그인</v-btn>
          <v-btn v-else icon v-on="on">
            <v-avatar color="white" size="36">
              <img v-if="$store.state.user.photoURL" :src="$store.state.user.photoURL" alt="avatar">
              <v-icon v-else>mdi-account</v-icon>
            </v-avatar>
          </v-btn>
        </template>

        <v-list class="pa-0 body-2" dense flat>
          <v-list-item>
            내 포스트
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            새 글 작성
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item to="/user">
            프로필 수정
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="signOut">
            로그아웃
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu right bottom offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <!-- <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list> -->
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
  export default {
    methods: {
      goSignIn() {
        this.$store.state.emailVerified = false
        this.$router.push('/sign')
      },
      signOut () {
        this.$firebase.auth().signOut()
        this.$router.push('/')
      }
    },
  }

</script>

<style lang="scss" scoped>
.app-bar {
  border-bottom: 1px solid #ddd;
}
.toolbar-title-text {
  position: relative; 
  top: 2px;
}
</style>
