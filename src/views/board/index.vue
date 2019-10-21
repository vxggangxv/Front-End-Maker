<template>
  <div>
    <router-view class="board-wrapper"></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.board-wrapper {
  .quill-editor {
    width: 768px;
    .ql-container {
      font-size: 16px;
      // color: rgba(0, 0, 0, 0.54);
      color: #000;
    }
  }
  .v-content {
    background: #fff;
  }
}
</style>