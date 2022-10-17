## 目录：

::: warning
1. 引入UnoCSS
2. 增加自定义颜色
3. 增加自定义图标
4. 配置组件库入口
5. 增加编译配置
6. 测试输出模块
:::

## 引入UnoCSS：
### 安装

1. 执行`pnpm i -D unocss@"0.45.6"`安装`unocss`模块；
2. 执行`pnpm i -D @iconify-json/ic@"1.1.4"`安装`@iconify-json/ic`模块；
3. 更新Unocss插件配置：
```typescript
import { presetUno, presetAttributify, presetIcons } from "unocss";
import Unocss from "unocss/vite";

export default defineConfig({
  plugins: [
    Unocss({
      presets: [
        presetUno(), 
        presetAttributify(), 
        presetIcons()
      ],
    })
  ]
})
```
### 编写

4. 编写Button组件（`./src/Button/index.tsx`）：
   1. 组件入口导入`uno.css`模块；
   2. 通过模板语法编写样式；
```typescript
import { defineComponent, PropType } from "vue";
import "uno.css";

export default defineComponent({
    name: 'GButton',
    props,
    setup(props, { slots }) {
        return () => <button
            class={`
                py-2 
                px-4 
                font-semibold 
                rounded-lg 
                shadow-md 
                text-white 
                bg-blue-500 
                hover:bg-blue-700 
                border-none 
                cursor-pointer
                m-1
            `}
        >
            {slots.default ? slots.default() : ''}
        </button>
    }
})
```
### 挂载

5. 在app-default视图容器挂载组件：
```typescript
import { createApp } from "vue/dist/vue.esm-bundler.js";

import GButton from "./Button";
createApp({
  template: `
      <div>
          <GButton>普通按钮</GButton>
      </div>
	` })
    .component(GButton.name, GButton)
    .mount("#app-default");
```
### 预览
![default-button-unocss.png](https://cdn.nlark.com/yuque/0/2022/png/2373519/1665367174578-9c0450ae-2b63-43b5-b228-5b3e75e91e4c.png#clientId=u08d9de39-d6ed-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=158&id=u153516ce&margin=%5Bobject%20Object%5D&name=default-button-unocss.png&originHeight=158&originWidth=414&originalType=binary&ratio=1&rotation=0&showTitle=false&size=3465&status=error&style=none&taskId=u15235670-8c59-4156-941b-a061f4f9840&title=&width=414)
## 增加自定义颜色
### 编写

1. 定义一组组件默认支持的样式列表：
```typescript
export type IColor = 'black' | 'gray' | 'red' | 'yellow' | 'green' | 'blue' | 'indigo' | 'purple' | 'pink';
```

2. 为组件增加`color`属性，通过`props`接收：
```typescript
export const props = {
    color: {
        type: String as PropType<IColor>,
        default: 'blue',
    }
}
```

3. 通过模板语法动态更新组件样式：
```typescript
{
  return () => <button
    class={`
    py-2 
    px-4 
    font-semibold 
    rounded-lg 
    shadow-md 
    text-white 
    bg-${props.color}-500 
    hover:bg-${props.color}-700 
    border-none 
    cursor-pointer
    m-1
    `}
  >
    {slots.default ? slots.default() : ''}
  </button>
}
```
### 挂载

4. 更新入口模板：
```typescript
import { createApp } from "vue/dist/vue.esm-bundler.js";

import GButton from "./Button";
createApp({
    template: `
      <div>
          <GButton color="blue">蓝色按钮</GButton>
          <GButton color="green">绿色按钮</GButton>
          <GButton color="gray">灰色按钮</GButton>
          <GButton color="yellow">黄色按钮</GButton>
          <GButton color="red">红色按钮</GButton>
      </div>
  ` })
  .component(GButton.name, GButton)
  .mount("#app-default");
```
### 配置
```typescript
const colors = [
    "white",
    "black",
    "gray",
    "red",
    "yellow",
    "green",
    "blue",
    "indigo",
    "purple",
    "pink",
];

const safelist = [
    ...[
        "search",
        "edit",
        "check",
        "message",
        "star-off",
        "delete",
        "add",
        "share",
    ].map((v) => `i-ic-baseline-${v}`),
    ...colors.map((v) => `bg-${v}-500`),
    ...colors.map((v) => `hover:bg-${v}-700`),
];

Unocss({
    safelist,
})
```
### 预览
![default-button-unocss-color.png](https://cdn.nlark.com/yuque/0/2022/png/2373519/1665369993136-79605ce3-f4f7-458d-a9c9-583c9fd55e23.png#clientId=udaf71914-ea21-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=165&id=ueb5e7f22&margin=%5Bobject%20Object%5D&name=default-button-unocss-color.png&originHeight=165&originWidth=571&originalType=binary&ratio=1&rotation=0&showTitle=false&size=7139&status=error&style=none&taskId=ud48d217d-39c5-4904-95b0-5a595f13440&title=&width=571)
## 增加自定义图标
### 配置

1. 更新安全列表
```typescript
const safelist = [
    ...[
        "search",
        "edit",
        "check",
        "message",
        "star-off",
        "delete",
        "add",
        "share",
    ].map((v) => `i-ic-baseline-${v}`),
    ...
];
```
### 编写

2. 扩展组件
```typescript
export default defineComponent({
    name: 'GButton',
    props,
    setup(props, { slots }) {
        return () => <button
            class={`
                py-2 
                px-4 
                font-semibold 
                rounded-lg 
                shadow-md 
                text-white 
                bg-${props.color}-500 
                hover:bg-${props.color}-700 
                border-none 
                cursor-pointer
                m-1
            `}
        >
            {props.icon !== "" ? (
                <i class={`i-ic-baseline-${props.icon} pr-5`}></i>
            ) : (
                ""
            )}
            {slots.default ? slots.default() : ''}
        </button>
    }
})
```
### 挂载

3. 挂载组件到入口
```typescript
import { createApp } from "vue/dist/vue.esm-bundler.js";

import GButton from "./Button";
createApp({
    template: `
<div>
    <GButton color="blue" icon="search">蓝色按钮</GButton>
    <GButton color="green" icon="edit">绿色按钮</GButton>
    <GButton color="gray" icon="check">灰色按钮</GButton>
    <GButton color="yellow" icon="message">黄色按钮</GButton>
    <GButton color="red" icon="delete">红色按钮</GButton>
</div>
` })
    .component(GButton.name, GButton)
    .mount("#app-default");
```
### 预览
![default-button-unocss-icon.png](https://cdn.nlark.com/yuque/0/2022/png/2373519/1665370654276-c81a687d-5da2-4dbc-8a51-54a0bd05123c.png#clientId=udaf71914-ea21-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=163&id=ub124ba6d&margin=%5Bobject%20Object%5D&name=default-button-unocss-icon.png&originHeight=163&originWidth=607&originalType=binary&ratio=1&rotation=0&showTitle=false&size=7811&status=error&style=none&taskId=udf5ae035-bdfb-40b9-9fd5-f6076f1d845&title=&width=607)
## 配置组件库入口
扩展组件入口（`./src/entry.ts`）：
```typescript
import { App } from "vue";
···
import GButton from "./Button";

// （按需导入）分别提供组件对象
export { SFCButton, JSXButton, GButton }

// （全量导入）提供install函数
export default {
    install(app: App): void {
        ····
        app.component(GButton.name, GButton);
    }
}
```
## 增加编译配置
![build-unocss-error.png](https://cdn.nlark.com/yuque/0/2022/png/2373519/1665370738407-078a0afe-8328-4e4d-bfef-110c22f820d5.png#clientId=udaf71914-ea21-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=536&id=ud1bf5426&margin=%5Bobject%20Object%5D&name=build-unocss-error.png&originHeight=536&originWidth=752&originalType=binary&ratio=1&rotation=0&showTitle=false&size=317045&status=error&style=none&taskId=u7085dc1a-5955-48e5-a914-ec6ca762e08&title=&width=752)
```typescript
import { defineConfig } from "vite";
import vuePlugin from "@vitejs/plugin-vue";
import vueJSXPlugin from "@vitejs/plugin-vue-jsx";
import { presetUno, presetAttributify, presetIcons } from "unocss";
import Unocss from "unocss/vite";

const colors = [
    "white",
    "black",
    "gray",
    "red",
    "yellow",
    "green",
    "blue",
    "indigo",
    "purple",
    "pink",
];

const safelist = [
    ...[
        "search",
        "edit",
        "check",
        "message",
        "star-off",
        "delete",
        "add",
        "share",
    ].map((v) => `i-ic-baseline-${v}`),
    ...colors.map((v) => `bg-${v}-500`),
    ...colors.map((v) => `hover:bg-${v}-700`),
];

export default defineConfig({
    ····
    build: {
        rollupOptions: {
            ····
            output: {
                ····
                assetFileNames: `assets/[name].css`,
            }
        },
        ····
        cssCodeSplit: true,
    }
})
```
## 测试输出模块
### [esm模块+样式+icon](http://127.0.0.1:5173/demo/preview-esm-03.html)
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>preview-esm-03</title>
    <link rel="stylesheet" href="../dist/assets/entry.css">
</head>

<body>
    <div id="app"></div>
    <script type="module">
        import { createApp } from "vue/dist/vue.esm-bundler.js";
        import { GButton } from "../dist/gfe-ui.esm.js";

        createApp({
            template:
            `
                <div>
                    <GButton color="blue">蓝色按钮</GButton>
                    <GButton color="green">绿色按钮</GButton>
                    <GButton color="gray">灰色按钮</GButton>
                    <GButton color="yellow">黄色按钮</GButton>
                    <GButton color="red">红色按钮</GButton>

                    <p></p>
                    <GButton color="blue" icon="search">蓝色按钮</GButton>
                    <GButton color="green" icon="edit">绿色按钮</GButton>
                    <GButton color="gray" icon="check">灰色按钮</GButton>
                    <GButton color="yellow" icon="message">黄色按钮</GButton>
                    <GButton color="red" icon="delete">红色按钮</GButton>
                </div>
            `
        })
            .component(GButton.name, GButton)
            .mount("#app")
    </script>
</body>

</html>
```

![esm-unocss-demo.png](https://cdn.nlark.com/yuque/0/2022/png/2373519/1665370919786-39d0dbe6-0e58-4972-b5c9-aba3269cece3.png#clientId=u373330a6-e0a7-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=131&id=uaa9c78eb&margin=%5Bobject%20Object%5D&name=esm-unocss-demo.png&originHeight=131&originWidth=606&originalType=binary&ratio=1&rotation=0&showTitle=false&size=10585&status=error&style=none&taskId=u82ee5474-7c59-418d-8ee1-155eac35c59&title=&width=606)
### [iife模块+样式+icon](http://127.0.0.1:5173/demo/preview-iife-03.html)
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>preview-iife-03</title>
    <link rel="stylesheet" href="../dist/assets/entry.css">
</head>

<body>
    <div id="app"></div>
    <script src="../node_modules/vue/dist/vue.global.js"></script>
    <script src="../dist/gfe-ui.iife.js"></script>
    <script>
        const { createApp } = Vue;
        createApp({
            template:
                `
                <div>
                    <GButton color="blue">蓝色按钮</GButton>
                    <GButton color="green">绿色按钮</GButton>
                    <GButton color="gray">灰色按钮</GButton>
                    <GButton color="yellow">黄色按钮</GButton>
                    <GButton color="red">红色按钮</GButton>

                    <p></p>
                    <GButton color="blue" icon="search">蓝色按钮</GButton>
                    <GButton color="green" icon="edit">绿色按钮</GButton>
                    <GButton color="gray" icon="check">灰色按钮</GButton>
                    <GButton color="yellow" icon="message">黄色按钮</GButton>
                    <GButton color="red" icon="delete">红色按钮</GButton>
                </div>
            `
        }).component(window.GFEUI.GButton.name, window.GFEUI.GButton)
            .mount("#app")
    </script>
</body>

</html>
```
![iife-unocss-demo.png](https://cdn.nlark.com/yuque/0/2022/png/2373519/1665371024731-bb172785-a6f6-4515-b7c8-b2d6110f5dd6.png#clientId=u373330a6-e0a7-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=133&id=u34cf8828&margin=%5Bobject%20Object%5D&name=iife-unocss-demo.png&originHeight=133&originWidth=619&originalType=binary&ratio=1&rotation=0&showTitle=false&size=10599&status=error&style=none&taskId=u065aba35-99c6-45a1-af02-f09282bb622&title=&width=619)
### [umd模块+样式+icon](http://127.0.0.1:5173/demo/preview-umd-03.html)
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>preview-umd-03</title>
</head>

<body>
    <div id="app"></div>
    <script src="../node_modules/vue/dist/vue.global.js"></script>
    <script src="../dist/gfe-ui.umd.js"></script>
    <script>
        const { createApp } = Vue;
        createApp({
            template:
                `
                <div>
                    <GButton color="blue">蓝色按钮</GButton>
                    <GButton color="green">绿色按钮</GButton>
                    <GButton color="gray">灰色按钮</GButton>
                    <GButton color="yellow">黄色按钮</GButton>
                    <GButton color="red">红色按钮</GButton>

                    <p></p>
                    <GButton color="blue" icon="search">蓝色按钮</GButton>
                    <GButton color="green" icon="edit">绿色按钮</GButton>
                    <GButton color="gray" icon="check">灰色按钮</GButton>
                    <GButton color="yellow" icon="message">黄色按钮</GButton>
                    <GButton color="red" icon="delete">红色按钮</GButton>
                </div>
            `
        }).component(window.GFEUI.GButton.name, window.GFEUI.GButton)
            .mount("#app")
    </script>
</body>

</html>
```
![umd-unocss-demo.png](https://cdn.nlark.com/yuque/0/2022/png/2373519/1665371057530-50808034-89b4-4b36-8c79-71b5e22c6b3c.png#clientId=u373330a6-e0a7-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=paste&height=135&id=ub891ab4c&margin=%5Bobject%20Object%5D&name=umd-unocss-demo.png&originHeight=135&originWidth=644&originalType=binary&ratio=1&rotation=0&showTitle=false&size=10644&status=error&style=none&taskId=uc3374281-d71c-4e74-8919-a873e40f09c&title=&width=644)