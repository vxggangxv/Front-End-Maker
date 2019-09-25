<template>
  <div class="error-container">
    <div class="inform">
      <div class="error-code">404</div>
      <div class="content">Page Not Found</div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .error-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background-color: #fff;
  }
  .inform {
    // padding-top: 50px;
    text-align: center;
    font-family: 'Roboto', sans-serif;
    .error-code {
      font-size: 250px;
    }
    .content {
      font-size: 55px;
    }
  }
</style>
