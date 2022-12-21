<script setup lang="ts">
import LogicFlow from "@logicflow/core";
import "@logicflow/core/dist/style/index.css";

import { onMounted, ref } from "vue";

import CustomEdge from "./edges/CustomEdge";

const container = ref();
const lf = ref<LogicFlow>();

const graphData = {
  nodes: [
    {
      id: '242b1b6c-1721-4b10-b4ad-c895094cf332',
      type: 'rect',
      x: 100,
      y: 100
    },
    {
      id: 'e59d6ecd-68f7-4d50-8e3f-29e67b6e5f16',
      type: 'circle',
      x: 300,
      y: 200
    }
  ],
  edges: [
    {
      id: '702a4d2f-b516-4769-adb0-5a4f4f5c07a9',
      sourceNodeId: '242b1b6c-1721-4b10-b4ad-c895094cf332',
      targetNodeId: 'e59d6ecd-68f7-4d50-8e3f-29e67b6e5f16',
      type: 'CustomEdge',
      text: '连线'
    }
  ]
}

onMounted(() => {
  lf.value = new LogicFlow({
    container: container.value,
    grid: true,
    edgeGenerator(sourceNode, targetNode, currentEdge?) {
      if (sourceNode.type === 'rect') return 'CustomEdge'
    },
  })

  lf.value.setTheme({
    arrow: {
      offset: 4, // 箭头垂线长度
      verticalLength: 2, // 箭头底线长度
    }
  })

  lf.value.register(CustomEdge);
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
