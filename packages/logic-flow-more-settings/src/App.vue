<script setup lang="ts">
import LogicFlow, { EdgeConfig, NodeConfig } from "@logicflow/core";
import "@logicflow/core/dist/style/index.css";

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
      type: 'polyline',
      text: 'polyline'
    }
  ]
}

const styleConfig = {
  baseNode: {
    fill: "rgb(255, 230, 204)",
    stroke: "green",
    strokeDasharray: "3,3"
  },
  rect: {
    fill: "#FFFFFF",
    strokeDasharray: "10, 1",
    className: "custom-cls",
    radius: 30
  },
  circle: {
    r: 10,
    fill: "#9a9b9c"
  },
  nodeText: {
    fontSize: 20,
    color: "red",
    overflowMode: "autoWrap"
  },
  baseEdge: {
    strokeWidth: 1,
    strokeDasharray: "3,3"
  },
  polyline: {
    offset: 20,
    strokeDasharray: "none",
    strokeWidth: 4
  },
  snapline: {
    stroke: '#1E90FF', // 对齐线颜色
    strokeWidth: 1, // 对齐线宽度
  },
}

const gridConfig = {
  size: 20,
  visible: true,
  type: 'mesh',
  config: {
    color: '#ababab',
    thickness: 1,
  },
}

onMounted(() => {
  lf.value = new LogicFlow({
    container: container.value,
    // grid: gridConfig,
    background: {
      backgroundImage: "url(../grid.svg)",
      backgroundRepeat: "repeat"
    },
    isSilentMode: true, // 静默模式
    stopZoomGraph: true, // 禁止缩放
    stopScrollGraph: true, // 禁止鼠标滚动移动画布
    stopMoveGraph: true, // 禁止拖动画布
    keyboard: {
      enabled: true,
      shortcuts: [
        {
          keys: ["backspace"],
          callback: () => {
            const r = window.confirm("确定要删除吗？");
            if (r) {
              const elements = lf.value!.getSelectElements(true);
              lf.value?.clearSelectElements();
              elements.edges.forEach((edge: EdgeConfig) => lf.value!.deleteEdge(edge.id || ''));
              elements.nodes.forEach((node: NodeConfig) => lf.value!.deleteNode(node.id || ''));
            }
          }
        }
      ]
    },
  })

  lf.value.setTheme(styleConfig);

  lf.value.render(graphData);

  lf.value.updateEditConfig({
    isSilentMode: false
  });

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
