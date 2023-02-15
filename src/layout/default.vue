<template>
  <div class="layout-wrapper">
    <div class="layout-left">
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
import { defineComponent } from 'vue';
import SideMenu from "@/components/SideMenu.vue"
import MainHeader from "@/components/MainHeader/index.vue"
import MainContent from "@/components/MainContent.vue"

export default defineComponent({
  name: 'LayoutDefault',
  components: {
    SideMenu,
    MainHeader,
    MainContent
  }
})
</script>

<style lang="less" scoped>

.layout-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-items: flex-start;
}

.layout-left {
  width: 240px;
  height: 100%;
  overflow: auto;
  background-color: black;
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