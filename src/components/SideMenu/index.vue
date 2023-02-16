<template>
  <div style="background-color: aliceblue">
    <el-menu @select="handleSelect">
      <template v-for="(route, index) in routes" :key="index">
        <MenuItem :data="route" />
      </template>
    </el-menu>
  </div>
</template>
<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import MenuItem from "./MenuItem.vue";
//@ts-ignore
const handleSelect = (index: string, indexPath: string[]) => {
  router.push({
    path: index,
  });
};

const router = useRouter();
const routes = computed(() => {
  return router.options.routes.filter((route) => !(route.meta?.hidden == true));
});

// console.log("routes配置", routes.value);
</script>
