<template>
  <div class="lds-facebook" v-if="loading">
    <!-- <div class="lds-facebook"> -->
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
$lt: 10px;
$wd: 12px;
$ht: 62px;
.lds-facebook {
  z-index: 1000;
  display: inline-block;
  position: absolute;
  width: ($lt * 4) + ($wd * 3);
  height: $ht;
  top: 50%;
  left: 50%;
  margin-top: -(($lt * 4) + ($wd * 3) / 2);
  margin-left: -($ht / 2);
  text-align: center;
  &:before {
    content: "";
    display: block;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.15);
  }
}
.lds-facebook div {
  display: inline-block;
  position: absolute;
  width: $wd;
  background: #42b883;
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
  left: $lt;
  animation-delay: -0.24s;
}
.lds-facebook div:nth-child(2) {
  left: ($lt * 2) + $wd;
  animation-delay: -0.12s;
}
.lds-facebook div:nth-child(3) {
  left: ($lt * 3) + ($wd * 2);
  animation-delay: 0;
}
@keyframes lds-facebook {
  0% {
    top: 6px;
    height: 50px;
  }
  50%,
  100% {
    top: 18px;
    height: 26px;
  }
}
</style>
