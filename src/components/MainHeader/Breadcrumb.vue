<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="(item, index) in paths" :key="index">{{
      item
    }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script lang="ts">
import { defineComponent, ref, isRef, isReactive, watch, computed } from "vue";
import { ArrowRight } from "@element-plus/icons-vue";
import { useRoute, RouteLocationNormalizedLoaded } from "vue-router";
import { title } from "process";

export default defineComponent({
  name: "Breadcrumb",
  setup() {
    const route = useRoute();
    watch(
      route,
      (newRoute) => {
        console.log("route", newRoute);
      },
      { immediate: true }
    );

    const paths = computed(() => {
      let _paths = [];
      for (let i = 0; i < route.matched.length; i++) {
        if (route.matched[i].redirect) {
          if (route.matched[i].meta?.alwaysShow == true) {
            _paths.push(route.matched[i].meta?.title);
          } else {
            continue;
          }
        } else {
          _paths.push(route.matched[i].meta?.title);
        }
      }
      return _paths;
    });
    return {
      paths,
      ArrowRight,
    };
  },
});
</script>
