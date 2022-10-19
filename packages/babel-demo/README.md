# 【入门】你连Babel都不会配？那插件不成乱装了
---

## 1. 前言
> 大家好，我是[小鑫同学](https://juejin.cn/user/3966693685871694)。一位从事过**Android开发**、**混合开发**，现在长期从事**前端开发**的编程爱好者，**我觉得在编程之路上最重要的是知识的分享，所谓三人行必有我师**。所以我开始在社区持续输出我所了解到、学习到、工作中遇到的各种编程知识，欢迎有想法、有同感的伙伴加我[fe-xiaoxin](https://juejin.cn/pin/7126196941574111262)微信交流~


如果你有项目搭建的需求，工具链开发的需求，那么 **Babel** 目前仍是一个前端工程师高频使用的产品，在各浏览器厂商纷纷拥抱**W3C**标准的时候还是会遇到需要将 **ES2015+ **的语法进行降级，使得可以在低版本的浏览器及其他环境中正常使用。
## 2. Babel 能搞什么？
**Babel** 作为一款工具链产品可以辅助我们在JavaScript 编写时更放心的去使用一些较新的或最新的语法，对于浏览器或其他环境不能很好兼容的事情全部交给 **Babel** 自行处理，所以说 **Babel** 在我们编码的过程中主要起到了**语法转换**和 **Polyfill** 的功能。
## 3. MVP环境配置：
> 这里的 MVP 指的是产品理论，指的是**最简可行化分析**，我们需要配置一个满足最基本 Babel 运行的项目环境。

| 依赖项 | 作用 |
| --- | --- |
| @babel/core |  babel 运行的核心模块。 |
| @babel/cli |  babel 配套使用的命令行工具。 |
| @babel/plugin-transform-arrow-functions |  语法转换插件的其中之一，用于将箭头函数转为普通函数。 |

我们需要使用命令行工具来启动 babel 核心模块进行工作，其中所做的具体工作有各种各样的**插件**或**预设**的集合来提供，当官方和社区的插件和预设无法满足我们的需求时就需要我们自定义插件来完成，这个我们先来演示**一个 MVP 级别的箭头函数到普通函数转换**~
### 3.1 初始化项目
#### 3.1.1 初始化目录：
```typescript
mkdir babel-study && pnpm init
```
#### 3.1.2 安装各依赖：

1. `pnpm add -D @babel/core`；
1. `pnpm add -D @babel/cli`；
1. `pnpm add -D @babel/plugin-transform-arrow-functions`；
### 3.2 配置文件和编译命令
#### 3.2.1 插入 babel 编译命令:
> 编译 src 目录下的 js 文件并输出到 output 目录

```typescript
{
    "build": "./node_modules/.bin/babel ./src -d output"
}
```
#### 3.2.2 创建 babel 配置文件：
创建一个后缀名为 `.js` 的配置文件（`babel.config.js`）并配置**插件列表**，**预设列表**的使用后面会讲到：
```typescript
const presets = [];

const plugins = ["@babel/plugin-transform-arrow-functions"];

module.exports = { presets, plugins };
```
### 3.3 插入源码并编译：
#### 3.3.1 在 src 目录插入下面的源码：
> 如下代码包含了块级作用域变量的定义、**箭头函数**和模板字符串使用

```typescript
const say = (value) => {
  console.log(`hello ${value}`);
};
```
#### 3.3.2 执行编译命令并预览结果：
执行 `pnpm build` 命令后在终端将输出 Babel 为我们处理成功了一个文件的提示：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/2373519/1659968690428-4c72a05f-975c-439c-9a24-0438c07804aa.png#clientId=u23a348ea-37b6-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=123&id=u9a367de1&margin=%5Bobject%20Object%5D&name=image.png&originHeight=246&originWidth=1190&originalType=binary&ratio=1&rotation=0&showTitle=false&size=97620&status=done&style=stroke&taskId=u35dacd68-2ada-4ca5-bdc9-3977134e2f0&title=&width=595)
使用`@babel/plugin-transform-arrow-functions`处理后的结果：
```typescript
const say = function (value) {
  console.log(`hello ${value}`);
};
```
### 3.4 处理掉更多的语法：
#### 3.4.1 转换块级变量定义：
> 安装并配置插件：[@babel/plugin-transform-block-scoping](https://babeljs.io/docs/en/babel-plugin-transform-block-scoping)

```typescript
const presets = [];

const plugins = [
  "@babel/plugin-transform-arrow-functions",
  "@babel/plugin-transform-block-scoping",
];

module.exports = { presets, plugins };
```
转换结果：
```typescript
var say = function (value) {
  console.log(`hello ${value}`);
};
```
#### 3.4.2 转换模板字符串：
> 安装并配置引入插件：[@babel/plugin-transform-template-literals](https://babeljs.io/docs/en/babel-plugin-transform-template-literals)

```typescript
const presets = [];

const plugins = [
  "@babel/plugin-transform-arrow-functions",
  "@babel/plugin-transform-block-scoping",
  "@babel/plugin-transform-template-literals",
];

module.exports = { presets, plugins };
```
转换结果：
```typescript
var say = function (value) {
  console.log("hello ".concat(value));
};
```
#### 3.4.3 更优雅的处理方式：
我们分别使用不同的插件来处理掉了不同的语法，`ES2015+`提供的语法有不少，我们虽然可以一个个插件安装来处理但不是最优雅的方式，这里就需要用到**预设**，我们可以认为预设就是一组插件的集合。
[@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)就是Babel 官方维护的 JavaScript 转换预设，我们接下来看一下预设的使用：

1. 安装依赖：`pnpm add -D @babel/preset-env`;
1. 配置预设并取消插件列表：
```typescript
const presets = [
    [
        "@babel/preset-env", // 整合了尽可能全的JavaScript语法转换的预设
    ],
];

const plugins = [
//   "@babel/plugin-transform-arrow-functions",   // ① 箭头函数
//   "@babel/plugin-transform-block-scoping",     // ② 块级作用域
//   "@babel/plugin-transform-template-literals", // ③ 模板字符串
];

module.exports = { presets, plugins };
```

3. 转换结果：
```typescript
"use strict";

var say = function say(value) {
  console.log("hello ".concat(value));
};
```
## 4. 支持 TypeScript？
### 4.1 在 src 目录下插入下面的源码：
```typescript
const person: {
  name: string;
  age: number;
} = {
  name: "TypeScript",
  age: 16,
};
console.log(person?.name);
```
### 4.2 安装并配置[@babel/preset-typescript](https://www.babeljs.cn/docs/babel-preset-typescript)：
```typescript
const presets = [
  [
    "@babel/preset-env", // 整合了尽可能全的JavaScript语法转换的预设
  ],
  "@babel/preset-typescript",
];

const plugins = [];

module.exports = { presets, plugins };
```
### 4.3 添加一条新的编译scripts：
通过增加`-x '.ts'`参数来支持 babel 识别 `.ts` 文件：
```typescript
{
    "build:ts": "./node_modules/.bin/babel ./src -d output -x '.ts'"
}
```
### 4.4 转换结果：
```typescript
"use strict";

var person = {
  name: "TypeScript",
  age: 16
};
console.log(person === null || person === void 0 ? void 0 : person.name);
```
## 5. 总结

1. Babel 官网提供了 [ES2015+ ](https://babeljs.io/docs/en/learn)各语法的演示，我们可以对照各个语法和对应的插件来感受 Babel 语法转换的奥妙~
1. 当我们与其它的**构建系统**、**框架**、**语言 API**搭配使用时还需要更多的配置来支持，可以在 [Using Babel](https://babeljs.io/setup) 查看。
1. 我们还可以使用 [REPL](https://babeljs.io/repl) 来在线查看语法的转换。
> 本文项目已推送至GitHub，欢迎克隆演示：`git clone git@github.com:OSpoon/babel-study.git`


---

**如果看完觉得有收获，欢迎点赞、评论、分享支持一下。你的支持和肯定，是我坚持写作的动力~**
最后可以关注我@小鑫同学。欢迎[点此扫码加我微信](https://juejin.cn/pin/7126196941574111262)[fe-xiaoxin](https://juejin.cn/pin/7126196941574111262)交流，共同进步（还可以帮你**fix**🐛）~
