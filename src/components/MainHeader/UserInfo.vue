<template>
  <div class="user-info">
    <el-popover :width="250" :visible="popoverVisible">
      <template #reference>
        <el-badge :value="count" :max="99" :hidden="hidden" class="alerts">
          <el-icon :size="20" @click.stop="togglePopover">
            <Bell />
          </el-icon>
        </el-badge>
      </template>
      <div class="pop-content" v-clickOutside="closePopover">
        <template v-if="count > 0">
          <div class="popover-list">
            <template v-for="item in alertList" :key="item.id">
              <div class="alert-item">
                <div class="alert-title">{{ item.title }}</div>
                <span class="alert-time">{{ item.time }}</span>
              </div>
            </template>
          </div>
          <div class="popover-footer">
            <!-- 点击后通过路由跳转消息中心模块 -->
            <el-button link @click.stop="closePopover">点击去处理</el-button>
          </div>
        </template>
        <template v-else>
          <el-empty description="暂无数据" :image-size="120" />
        </template>
      </div>
    </el-popover>

    <el-avatar
      :size="36"
      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
    />
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
} from "vue";
import { Bell } from "@element-plus/icons-vue";

/**
 * popover 
 * 如果用tigger=click，那点击之后会弹出来，click outside之后会自动消失，这很好。
 * 但在popover里执行操作之后，因为不会触发 click outside，所以不会自动消失。如果跟 visible合起来用不好。
 * 
 * 那就全用visible来处理，点击之后visible为true。在内部点击后或者在外部点击之后，设置为false。
 */

type AlertItem = {
  id: number;
  title: string;
  time: string;
};

const list = [
  "张三给你发了一封邮件",
  "李四给你发了一条消息",
  "你有一条待办事项",
];

export default defineComponent({
  name: "UserInfo",
  components: {
    Bell,
  },
  setup() {
    const count = ref(0);
    const alertList = ref<Array<AlertItem>>([]);
    const timer = ref(null);
    const popoverVisible = ref(false)

    onMounted(() => {
      mockAlert();
    });

    onBeforeUnmount(() => {
      if (timer.value) {
        clearTimeout(timer.value);
        timer.value = null;
      }
    });

    const mockAlert = () => {
      if (timer.value) {
        clearTimeout(timer.value);
        timer.value = null;
      }
      count.value = Math.max(5, (Math.random() * 10) >> 1);
      alertList.value = [];
      for (let i = 0; i < count.value; ++i) {
        alertList.value.push({
          id: i,
          title: list[i % list.length],
          time: new Date().toLocaleString(),
        });
      }

      setTimeout(() => {
        mockAlert();
      }, 10000);
    };

    const hidden = computed(() => {
      return count.value == 0;
    });

    return {
      count,
      hidden,
      alertList,
      popoverVisible
    };
  },
  methods: {
    togglePopover() {
      this.popoverVisible = !this.popoverVisible
    },
    closePopover() {
      this.popoverVisible = false;
    },
    tryClosePopover(e:MouseEvent) {
      console.log(e.target);
      
    }
  }
});
</script>

<style lang="less" scoped>
.user-info {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.alerts {
  margin-right: 12px;
  cursor: pointer;
}

.alert-item + .alert-item {
  border-top: 1px solid rgb(245, 245, 245);
}

.alert-item {
  padding: 5px 0;
}

.alert-item:first-of-type {
  padding-top: 0;
}

.alert-item:last-of-type {
  padding-bottom: 0;
}

.alert-title {
  font-weight: bold;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.alert-time {
  font-size: 12px;
}

.popover-footer {
  text-align: center;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid rgb(245, 245, 245);
}
</style>
