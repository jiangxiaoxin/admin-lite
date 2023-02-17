<template>
  <div class="layout-wrapper">
    <div class="layout-left" :style="leftStyle">
      <SideMenu />
    </div>

    <div class="layout-right">
      <div class="main-header-wrapper">
        <MainHeader />
      </div>
      <div class="main-content-wrapper">
        <MainContent />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import SideMenu from "@/components/SideMenu/index.vue";
import MainHeader from "@/components/MainHeader/index.vue";
import MainContent from "@/components/MainContent.vue";
import { useGlobalStore } from "@/store/global";

export default defineComponent({
  name: "LayoutDefault",
  components: {
    SideMenu,
    MainHeader,
    MainContent,
  },
  setup() {
    const globalStore = useGlobalStore();
    const leftStyle = computed(() => {
      return {
        width: globalStore.menuExpanded ? "240px" : "64px",
      };
    });

    return {
      leftStyle,
    };
  },
});
</script>

<style lang="less" scoped>
.layout-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-items: flex-start;
}

.layout-left {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #001529; // 跟左侧菜单的背景色一样，不会那么突兀
  transition: width 0.3s linear;
}

.layout-right {
  flex: 1;
  flex-shrink: 0;
  height: 100%;
}

.main-content-wrapper {
  height: calc(100% - 50px);
}
</style>
