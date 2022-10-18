import { declare } from "@babel/helper-plugin-utils";
import doctrine from "doctrine";
import fs from "fs-extra";
import path from "path";

const parseComment = (comment) => {
  if (!comment) {
    return;
  }
  return doctrine.parse(comment, {
    unwrap: true,
  });
};

const generateMD = (apidoc: Array<ApiTable>) => {
  let raw = `| 属性名 | 说明 | 类型 | 可选值	| 默认值 |\n| ------ | ---- | ---- | ----- | ----- |\n`;
  apidoc.forEach((item) => {
    raw += `| ${item.attributeName} | ${item.attributeDescribe} | ${item.attributeType} | ${item.attributeOptions} | ${item.attributeDefault} |\n`;
  });
  return raw;
};

type Comment =
  | {
      describe: string;
      type: any;
      options?: any;
      default?: any;
    }
  | undefined;

type ApiTable = {
  attributeName: any;
  attributeDescribe: any;
  attributeType: any;
  attributeOptions: any;
  attributeDefault: any;
};
export default declare((api) => {
  api.assertVersion(7);

  return {
    name: "generate-api-doc",
    pre(file) {
      file.set("apidoc", []);
    },
    visitor: {
      ExportNamedDeclaration(path, state) {
        const apidoc = state.file.get("apidoc");
        let _comment: Comment = undefined;
        path.node.leadingComments.forEach((comment) => {
          if (!comment.skip) {
            const tags = parseComment(comment.value)?.tags;
            _comment = {
              describe:
                tags?.find((v) => v.title === "cDescribe")?.description || "",
              type: tags?.find((v) => v.title === "cType")?.description || "",
              options:
                tags?.find((v) => v.title === "cOptions")?.description || "",
              default:
                tags?.find((v) => v.title === "cDefault")?.description || "",
            };
            comment.skip = true;
          }
        });
        apidoc.push({
          attributeName: path.node.declaration.id.name
            .substr(1)
            .toLocaleLowerCase(),
          attributeDescribe: _comment!.describe,
          attributeType: _comment!.type,
          attributeOptions: _comment!.options,
          attributeDefault: _comment!.default,
        } as ApiTable);
        state.file.set("apidoc", apidoc);
      },
    },
    post(file) {
      const apidoc = file.get("apidoc");
      const output = generateMD(apidoc);
      const root = path.parse(file.opts.filename).dir;
      fs.writeFileSync(path.join(root, "api-docs.md"), output, {
        encoding: "utf-8",
      });
    },
  };
});
