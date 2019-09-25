<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    components: {
    },

  }

</script>

<style lang="scss">
  .theme--light.v-application {
    background: #F1F3F5 !important;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
  $logo-color: #1EA1F7 !important;
  .app-logo-comm {
    font-size: 50px !important;
    color: $logo-color;
  }
  .app-logo {
    font-family: 'Roboto', sans-serif !important;
    font-weight: 800;
  }
  .app-logo-icon {

  }
  .small-terms-text {
    font-size: 12px;
    font-weight: 200;
    color: #637282
}

</style>
