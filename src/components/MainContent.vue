<template>
  <div class="main">
    <div>main content</div>
    <RouterView />
  </div>
</template>

<script lang="ts" setup>
import { RouterView } from "vue-router";
</script>

<style lang="less" scoped>
.main {
  padding: 10px;
  height: 100%;
  overflow: auto;
}
</style>
