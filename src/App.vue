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
import AppBar from "@/components/AppBar";
import AppNav from "@/components/AppNav";
import AppFooter from "@/components/AppFooter";

export default {
  components: {
    AppBar,
    AppNav,
    AppFooter
  }
};
</script>
<style lang="scss">
.theme--light.v-application {
  background: #f1f3f5 !important;
}

a {
  color: inherit;
  text-decoration: none;
}
$logo-color: #1ea1f7 !important;
.app-logo-comm {
  font-size: 50px !important;
  color: $logo-color;
}
.app-logo {
  font-family: "Roboto", sans-serif !important;
  font-weight: 800;
}
.app-logo-icon {
}
.small-terms-text {
  font-size: 12px;
  font-weight: 200;
  color: #637282;
}
.theme--light.v-application {
  background: #f1f3f5 !important;
  // color: #222 !important;
}
.v-text-field input {
  line-height: normal !important;
}
</style>
