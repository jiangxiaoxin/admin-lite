<template>
  <el-menu-item :index="index" v-if="showOne">
    <span class="menu-title">{{ title }}</span>
  </el-menu-item>
  <el-sub-menu :index="selfPath" v-else>
    <template #title>
      <span class="menu-title">{{ selfTitle }}</span>
    </template>
    <MenuItem
      v-for="(item, index) in childrenRoutes"
      :key="index"
      :parentPath="selfPath"
      :data="item"
    />
  </el-sub-menu>
</template>

<script lang="ts">
import { title } from "process";
import { defineComponent, computed, PropType } from "vue";
import { RouteRecordRaw } from "vue-router";
import { joinPath } from "./util";

export default defineComponent({
  name: "MenuItem",
  props: {
    data: {
      type: Object as PropType<RouteRecordRaw>,
      required: true,
    },
    parentPath: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    // console.log("props", props.data, props.parentPath)
    const selfTitle = computed(() => {
      return props.data.meta?.title;
    });
    /**
     * 如果只有自己，那就是显示自己
     * 如果有孩子，但只有1个可见的孩子，可以将孩子提到自己这一级
     * 如果有孩子，且可见孩子不止1个，那就是显示自己
     */
    const title = computed(() => {
      let _title = selfTitle.value;

      if (!childrenRoutes.value || childrenRoutes.value.length == 0) {
        return _title;
      }

      if (childrenRoutes.value.length == 1) {
        return childrenRoutes.value[0].meta?.title;
      }

      if (childrenRoutes.value.length > 1) {
        return _title;
      }

      /**
       * 单纯从代码上判断，是有可能走到这里的。
       * 这就遇到了：父级可见，但子级全不可见，比如子路由全部没有权限。那这种情况就很奇怪了，一个空的父路由。
       */
      return "";
    });

    const selfPath = computed(() => {
      return joinPath(props.parentPath, props.data.path);
    });

    const index = computed(() => {
      /**
       * 如果只有自己，那就是显示自己
       * 如果有孩子，但只有1个可见的孩子，可以将孩子提到自己这一级
       * 如果有孩子，且可见孩子不止1个，那就是显示自己
       */
      let _path = selfPath.value;

      if (!childrenRoutes.value || childrenRoutes.value.length == 0) {
        return _path;
      }

      if (childrenRoutes.value.length == 1) {
        return joinPath(_path, childrenRoutes.value![0].path);
      }

      if (childrenRoutes.value.length > 1) {
        return _path;
      }

      return "path是个啥";
    });

    /**
     * 判断是显示成menu-item 还是 sub-menu
     * 这里的判断只是针对一些有效情况，会有一些特殊情况，是配置不对，导致判断不对，这种是通过修改配置来正确显示的。
     *
     * 如果自己就是hidden，那走不到这,从父级那就已经堵死了。
     * 自己hidden为false，那就是要显示
     *        如果没有children，那就显示自己，menu-item。
     *        如果有children，且可见的children就1个，那就显示这个child，且是menu-item。如果可见children是多个，那就是个sub-menu
     *
     * 这里会有些特殊情况：
     * 1. 比如自己hidden为false，还没有可见的children，而又redirect到某个child上，那这是配置的不对，
     * 2.
     *
     */
    const showOne = computed(() => {
      if (props.data.meta?.alwaysShow == true) {
        return false;
      }
      let res =
        !childrenRoutes.value ||
        childrenRoutes.value.length == 0 ||
        childrenRoutes.value.length == 1;
      return res;
    });

    //可以显示的子路由
    const childrenRoutes = computed(() => {
      return props.data.children?.filter((route) => {
        return !(route.meta?.hidden == true);
      });
    });

    return {
      title,
      index,
      showOne,
      selfPath,
      selfTitle,
      childrenRoutes,
    };
  },
});
</script>

<style lang="less" scoped>
.el-menu {
  overflow: hidden;
}

.el-menu-item {
  width: 100%;
  overflow: hidden;
}

.menu-title {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  transition: color 0.1s linear;
}

.menu-title:hover {
  color: white;
}

@menu-active-bg-color: #05206e;
.is-active {
  background-color: @menu-active-bg-color;
}

.el-menu-item:hover {
  background-color: @menu-active-bg-color;
}
</style>
