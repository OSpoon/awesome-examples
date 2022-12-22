<script setup lang="ts">
import LogicFlow from "@logicflow/core";
import { Group } from "@logicflow/extension";
import "@logicflow/core/dist/style/index.css";
import "@logicflow/extension/lib/style/index.css";

import { onMounted, ref } from "vue";

const container = ref();
const lf = ref<LogicFlow>();
const graphData = {
  nodes: [
    {
      type: 'group',
      x: 300,
      y: 300,
      children: ["node_2"]
    },
    {
      id: 'node_2',
      type: 'circle',
      x: 300,
      y: 300
    }
  ]
}
onMounted(() => {
  lf.value = new LogicFlow({
    container: container.value,
    grid: true,
    plugins: [Group],
  })
  lf.value.render(graphData);
})
</script>

<template>
  <div ref="container" class="container"></div>
</template>

<style scoped>
.container {
  width: 800px;
  height: 600px;
}
</style>
