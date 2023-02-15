<template>
  <div class="main-header">
    <div class="header-left">
      <ToggleCollapse />
    </div>
    <div class="header-content">
      <Breadcrumb />
    </div>
    <div class="header-right">
      <UserInfo />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ToggleCollapse from './ToggleCollapse.vue';
import Breadcrumb from './Breadcrumb.vue';
import UserInfo from "./UserInfo.vue"

export default defineComponent({
  name: 'MainHeader',
  components: {
    ToggleCollapse,
    Breadcrumb,
    UserInfo
  },
  methods: {
    outside(e?: MouseEvent) {
      console.log("outside", e);
      
    }
  }
})
</script>

<style lang="less" scoped>
.main-header {
  width: 100%;
  height: 50px; // 顶部条整个区域高度为50px
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  border-bottom: 1px solid rgb(245,245,245);
}

.header-left {
  width: 40px;
  height: 100%;
  margin-right: 8px;
}

.header-right {
  width: 200px;
  height: 100%;
  margin-right: 20px; //太靠边不好
}

.header-content {
  flex: 1;
  flex-shrink: 0;
}
</style>