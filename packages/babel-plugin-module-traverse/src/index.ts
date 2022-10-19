import { declare } from "@babel/helper-plugin-utils";
import { addDefault } from "@babel/helper-module-imports";

export default declare((api, options) => {
  api.assertVersion(7);

  return {
    name: "module-imports",
    visitor: {
      Program: {
        enter(path, state) {
          path.traverse({
            ImportDeclaration(cpath) {
              // 获取导入的模块名
              const moduleName = cpath.get("source").node.value;
              // 存在插件配置的埋点模块名
              if (moduleName === options.trackerName) {
                const specifiers = cpath.get("specifiers.0");
                if (specifiers.isImportSpecifier() || specifiers.isImportDefaultSpecifier()) {
                  state.trackerId = specifiers.toString();
                } else if (specifiers.isImportNamespaceSpecifier()) {
                  state.trackerId = specifiers.get("local").toString();
                }
                path.stop();
              }
            },
          });
          if (!state.trackerId) {
            state.trackerId = addDefault(path, "tracker", {
              nameHint: "_tracker",
            }).name;
          }
          console.log(state.trackerId);
        },
      },
    },
  };
});
