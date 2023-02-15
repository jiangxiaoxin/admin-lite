<template>
  <div class="toggle-collapse-wrapper" @click.stop="toggleCollapse">
    <el-icon :size="20">
      <Expand v-if="expanded"/>
      <Fold v-else/>
    </el-icon>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { Expand, Fold} from "@element-plus/icons-vue"

export default defineComponent({
  name: "ToggleCollapse",
  components: {
    Expand,
    Fold
  },
  setup() {
    const expanded = ref(true)
  
    return {
      expanded
    }
  },
  methods: {
    toggleCollapse() {
      this.expanded = !this.expanded
    }
  }
});
</script>

<style lang="less" scoped>
.toggle-collapse-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background 0.1s linear;
}

.toggle-collapse-wrapper:hover {
  background: rgb(240,240,240);
}
</style>
