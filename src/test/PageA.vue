<template>
  <h1>PageA</h1>
  <div>
    p:{{ count }}
  </div>
  <el-button type="primary" @click="addCount">add count</el-button>
  <div>
    <RouterView />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const count = ref(0)

const addCount = () => {
  count.value++;
}

</script>