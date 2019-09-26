<template>
  <v-app>

    <vue-progress-bar></vue-progress-bar>

    <app-nav></app-nav>
    <app-bar></app-bar>

    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>

        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-content>

    <app-footer></app-footer>

  </v-app>
</template>

<script>
  import AppBar from '@/components/AppBar';
  import AppNav from '@/components/AppNav';
  import AppFooter from '@/components/AppFooter';

  export default {
    components: {
      AppBar,
      AppNav,
      AppFooter,
    },
  }

</script>

<style lang="scss">
  .theme--light.v-application {
    background: #F1F3F5 !important;
    // color: #222 !important;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
  .v-text-field input {
    line-height: normal !important;
  }
</style>
