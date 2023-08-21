<script lang="ts" setup>
import LoginPanle from './components/LoginPanle.vue'
</script>

<template>
  <div class="login">
    <login-panle></login-panle>
  </div>
</template>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('@/assets/img/login-bg.svg');
}
</style>
