<template>
  <v-app>
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

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import AppBar from '@/components/AppBar';
import AppNav from '@/components/AppNav';

  export default {
      components: {
          AppBar,
          AppNav,
      },

  }
</script>
