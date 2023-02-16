<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="(item, index) in paths" :key="index">{{ item }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script lang="ts">
import { defineComponent, ref, isRef, isReactive, watch } from 'vue';
import { ArrowRight } from '@element-plus/icons-vue'
import { useRoute } from "vue-router"

export default defineComponent({
  name: 'Breadcrumb',
  setup() {
    const paths = ref(["a","b","c","d"])
    const route = useRoute();
    console.log(isRef(route), isReactive(route));
    
    watch(route, (now, old) => {
      console.log("--route watch", now.fullPath, now.meta)
      console.log(now);
      
    })
    return {
      paths,
      ArrowRight
    }
  }
})
</script>