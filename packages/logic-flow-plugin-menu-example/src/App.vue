<script setup lang="ts">
import LogicFlow from "@logicflow/core";
import { Menu } from "@logicflow/extension";
import "@logicflow/core/dist/style/index.css";
import "@logicflow/extension/lib/style/index.css";
import { onMounted, ref } from "vue";

const container = ref();
const lf = ref<LogicFlow>();
const graphData = {
  nodes: [
    {
      id: 'node_1',
      type: 'rect',
      x: 100,
      y: 100
    },
    {
      id: 'node_2',
      type: 'circle',
      x: 300,
      y: 200
    }
  ],
  edges: [
    {
      sourceNodeId: 'node_1',
      targetNodeId: 'node_2',
      type: 'polyline'
    }
  ]
};
onMounted(() => {
  lf.value = new LogicFlow({
    container: container.value,
    grid: true,
    plugins: [Menu]
  })
  lf.value.render(graphData);
})
</script>

<template>
  <div ref="container" class="container"></div>
</template>

<style scoped>
.container {
  width: 500px;
  height: 400px;
}
</style>
