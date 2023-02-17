<template>
  <el-menu-item :index="titleIconPath.path" v-if="showOne">
    <!-- <DynamicIcon icon="Search" size="20"/> -->
    <el-icon v-if="titleIconPath.icon">
      <component :is="titleIconPath.icon" />
    </el-icon>
    <span class="menu-title">{{ titleIconPath.title }}</span>
  </el-menu-item>
  <el-sub-menu :index="selfPath" v-else>
    <template #title>
      <el-icon v-if="selfIcon">
        <component :is="selfIcon" />
      </el-icon>
      <span v-else>123</span>
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
    const selfTitle = computed(() => {
      return props.data.meta?.title;
    });
    const selfIcon = computed(() => {
      return props.data.meta?.icon;
    });
    const selfPath = computed(() => {
      return joinPath(props.parentPath, props.data.path);
    });
    /**
     * 如果只有自己，那就是显示自己
     * 如果有孩子，但只有1个可见的孩子，可以将孩子提到自己这一级
     * 如果有孩子，且可见孩子不止1个，那就是显示自己
     */
    const titleIconPath = computed(() => {
      let _title = selfTitle.value;
      let _icon = selfIcon.value;
      let _path = selfPath.value;

      if (!childrenRoutes.value || childrenRoutes.value.length == 0) {
        return {
          title: _title,
          icon: _icon,
          path: _path,
        };
      }

      if (childrenRoutes.value.length == 1) {
        return {
          title: childrenRoutes.value[0].meta?.title,
          icon: childrenRoutes.value[0].meta?.icon,
          path: joinPath(_path, childrenRoutes.value![0].path),
        };
      }

      if (childrenRoutes.value.length > 1) {
        return {
          title: _title,
          icon: _icon,
          path: _path,
        };
      }

      /**
       * 单纯从代码上判断，是有可能走到这里的。
       * 这就遇到了：父级可见，但子级全不可见，比如子路由全部没有权限。那这种情况就很奇怪了，一个空的父路由。
       */
      return {
        title: "",
        icon: "",
        path: "",
      };
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
      showOne,
      selfPath,
      selfTitle,
      selfIcon,
      childrenRoutes,
      titleIconPath,
    };
  },
});
</script>

<style lang="less">
@menu-active-bg-color: #05206e;
@menu-hover-bg-color:#05206e ;// #041850;
.el-menu-item {
  width: 100%;
  overflow: hidden;
}

.menu-title {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  // transition: color 0.1s linear;
}

.el-menu-item:hover {
  color: white;
  background-color: @menu-hover-bg-color !important;
}

.is-active {
  background-color: @menu-active-bg-color;
}

.el-sub-menu__title:hover {
  background-color: @menu-hover-bg-color !important;
}

.my-menu > .is-active:not(.is-opened) > .el-sub-menu__title {
  background-color: @menu-active-bg-color !important;
}
</style>
