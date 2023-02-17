<template>
  <el-menu
    @select="handleSelect"
    backgroundColor="#001529"
    textColor="#bfcbd9"
    activeTextColor="#fff"
    :defaultActive="defaultActiveIndex"
    :collapse="collapse"
    class="my-menu"
  >
    <template v-for="(route, index) in routes" :key="index">
      <MenuItem :data="route" />
    </template>
  </el-menu>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import MenuItem from "./MenuItem.vue";
import { useGlobalStore } from "@/store/global";
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

const defaultActiveIndex = computed(() => {
  return router.currentRoute.value.path;
});

const globalStore = useGlobalStore();
const collapse = computed(() => {
  return globalStore.menuExpanded == false;
});
</script>
<style lang="less" scoped>
.el-menu {
  overflow: hidden;
  border: none !important;
  width: 100%;
}
</style>
