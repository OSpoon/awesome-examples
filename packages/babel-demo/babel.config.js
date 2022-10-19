const presets = [
  [
    "@babel/preset-env", // 整合了尽可能全的JavaScript语法转换的预设
  ],
  "@babel/preset-typescript",
];

const plugins = [
  //   "@babel/plugin-transform-arrow-functions",
  //   "@babel/plugin-transform-block-scoping",
  //   "@babel/plugin-transform-template-literals",
];

module.exports = { presets, plugins };
