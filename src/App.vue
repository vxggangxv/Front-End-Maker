<template>
  <div id="app" class="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {}
};
</script>
<style lang="scss">
a {
  color: inherit;
  text-decoration: none;
}
img {
  max-width: 100%;
}
.of-hidden {
  overflow: hidden;
}
.pos-relative {
  position: relative;
}
.lh-1 {
  line-height: 1;
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

// override
.quill-editor {
  margin: 0 auto;
}
.ql-toolbar.ql-snow,
.ql-toolbar.ql-snow + .ql-container.ql-snow,
.ql-container.ql-snow {
  border: none !important;
}
.letter-space-n3 {
  letter-spacing: -0.3px;
}
.letter-space-n5 {
  letter-spacing: -0.5px;
}
.letter-space-n7 {
  letter-spacing: -0.7px;
}
.letter-space-n10 {
  letter-spacing: -1px;
}
</style>
