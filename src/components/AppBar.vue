<template>
  <div>
    <v-app-bar color="transparent" flat app>
    <!-- <v-app-bar class="app-bar" color="white" :clipped-left="$vuetify.breakpoint.lgAndUp" app> -->
      <v-toolbar-title>
        <v-app-bar-nav-icon class="hidden-lg-and-up" @click="$store.state.drawer = !$store.state.drawer" ></v-app-bar-nav-icon>
        <span class="hidden-md-and-down">FEM Article</span>
      </v-toolbar-title>
 
      <div class="flex-grow-1"></div>

      <!-- <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn> -->

      <!-- <v-avatar color="white" size="36">
        <img src="@/assets/logo.png" alt="프로필사진">
      </v-avatar> -->

      <div class="mx-2">
        <v-btn to="/sign">회원가입</v-btn>
      </div>
      <div class="mx-2">
        <v-btn to="/sign">로그인</v-btn>
      </div>

      <v-menu left offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-avatar color="white" size="36">
              <v-img src="@/assets/logo.png" alt="프로필사진"></v-img>
            </v-avatar>
          </v-btn>
        </template>

        <v-list flat class="pa-0">
          <v-list-item to="/signUp" class="body-2" color="primary">
            회원가입
          </v-list-item>
          <v-list-item to="/signIn" class="body-2">
            로그인
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu right bottom offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
  export default {

  }

</script>

<style lang="scss" scoped>
.app-bar {
  border-bottom: 1px solid #ddd;
}
</style>
