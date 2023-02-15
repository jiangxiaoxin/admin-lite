<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="(item, index) in paths" :key="index">{{ item }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ArrowRight } from '@element-plus/icons-vue'
export default defineComponent({
  name: 'Breadcrumb',
  setup() {
    const paths = ref(["a","b","c","d"])
    return {
      paths,
      ArrowRight
    }
  }
})
</script>