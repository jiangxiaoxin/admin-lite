<template>
  <h1>
    404 not found
  </h1>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { onBeforeRouteUpdate, useRoute } from "vue-router"

const route = useRoute()

onMounted(() => {
  console.log("==404 mounted");
  console.log("route=>",route);

})

onBeforeRouteUpdate((to) => {
  console.log("==404 route update")
  console.log("to=>", to)
})
</script>