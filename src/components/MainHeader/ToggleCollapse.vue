<template>
  <div class="toggle-collapse-wrapper" @click.stop="toggleCollapse">
    <el-icon :size="20" class="toggle-animation" :class="iconCls">
      <Expand />
    </el-icon>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { Expand, Fold} from "@element-plus/icons-vue"
import { useGlobalStore } from "@/store/global"

export default defineComponent({
  name: "ToggleCollapse",
  components: {
    Expand,
    Fold
  },
  setup() {
    const globalStore = useGlobalStore()
    const expanded = computed(() => {
      return globalStore.menuExpanded
    })
    

    const iconCls = computed(() => {
      return {
        expanded: expanded.value == true,
        collapsed: expanded.value == false
      }
    })
  
    return {
      expanded,
      iconCls,
      globalStore
    }
  },
  methods: {
    toggleCollapse() {
      this.globalStore.toggleExpanded()
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

.toggle-animation {
  transition: all 0.3s linear;
}

.collapsed {
  transform: rotateZ(180deg);
}
</style>
