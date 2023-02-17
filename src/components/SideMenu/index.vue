<template>
  <div>
    <el-menu
      @select="handleSelect"
      backgroundColor="#001529"
      textColor="#bfcbd9"
      activeTextColor="#fff"
      :defaultActive="defaultActiveIndex"
    >
      <template v-for="(route, index) in routes" :key="index">
        <MenuItem :data="route" />
      </template>
    </el-menu>
  </div>
</template>
<script lang="ts" setup>
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

const defaultActiveIndex = computed(() => {
  return router.currentRoute.value.path
})
</script>
