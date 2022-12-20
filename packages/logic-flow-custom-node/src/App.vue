<script setup lang="ts">
import LogicFlow from "@logicflow/core";
import "@logicflow/core/dist/style/index.css";
import { onMounted, ref } from "vue";
import CustomNode from "./nodes/CustomNode";

const container = ref();
const lf = ref<LogicFlow>();

const graphData = {
  nodes: [
    {
      id: 'fba7fc7b-83a8-4edd-b4be-21f694a5d490',
      type: 'CustomNode',
      x: 100,
      y: 100
    },
    {
      id: '681035e6-11e3-43d7-9392-1deed852c01a',
      type: 'CustomNode',
      x: 300,
      y: 100
    }
  ],
  edges: [
    {
      sourceNodeId: 'fba7fc7b-83a8-4edd-b4be-21f694a5d490',
      targetNodeId: '681035e6-11e3-43d7-9392-1deed852c01a',
      type: 'polyline'
    }
  ]
}

onMounted(() => {
  lf.value = new LogicFlow({
    container: container.value,
    grid: true,
  });
  lf.value.register(CustomNode);
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
