import { declare } from "@babel/helper-plugin-utils";
import { addDefault } from "@babel/helper-module-imports";

export default declare((api) => {
  api.assertVersion(7);

  return {
    name: "module-imports",
    visitor: {
      Program: {
        enter(path) {
          addDefault(path, "tracker", {
            nameHint: "_tracker",
          });
        },
      },
    },
  };
});
