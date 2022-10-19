/**
 * Babel v7+ TypeScript 推荐使用，目前官方仓库的编写风格
 * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
 */
import fs from "fs";
import path from "path";

import { BabelAPI, declare } from "@babel/helper-plugin-utils";
import {
  BabelFile,
  NodePath,
  PluginObj,
  PluginPass,
  types as t,
} from "@babel/core";
import doctrine from "doctrine";

const generateMD = (apidoc: Array<ApiTable>) => {
  let raw = `| 属性名 | 说明 | 类型 | 可选值	| 默认值 |\n| ------ | ---- | ---- | ----- | ----- |\n`;
  apidoc.forEach((item) => {
    raw += `| ${item.attributeName} | ${item.attributeDescribe} | ${item.attributeType} | ${item.attributeOptions} | ${item.attributeDefault} |\n`;
  });
  return raw;
};

const parseComment = (comment: string) => {
  if (!comment) {
    return;
  }
  return doctrine.parse(comment, {
    unwrap: true,
  });
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

export default declare(
  (api: BabelAPI, options: Record<string, any>, dirname: string) => {
    api.assertVersion(7);

    return {
      name: "auto-attr-doc",
      pre(this: PluginPass, file: BabelFile) {
        this.set("api-doc", []);
      },
      visitor: {
        ExportNamedDeclaration(
          path: NodePath<t.ExportNamedDeclaration>,
          state: PluginPass
        ) {
          const apidoc = state.get("api-doc");
          let _comment: Comment = undefined;
          path.node.leadingComments?.forEach((comment) => {
            if (!Reflect.has(comment, "skip")) {
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
              Reflect.set(comment, "skip", true);
            }
          });
          apidoc.push({
            attributeName: (path.node.declaration as t.TypeAlias).id.name
              .substr(1)
              .toLocaleLowerCase(),
            attributeDescribe: _comment!.describe,
            attributeType: _comment!.type,
            attributeOptions: _comment!.options,
            attributeDefault: _comment!.default,
          } as ApiTable);
          state.set("api-doc", apidoc);
        },
      },
      post(this: PluginPass, file: BabelFile) {
        const apidoc = this.get("api-doc");
        const output = generateMD(apidoc);
        const root = path.parse(file.opts.filename || "./").dir;
        fs.writeFileSync(path.join(root, "api-doc.md"), output, {
          encoding: "utf-8",
        });
      },
    } as PluginObj<PluginPass>;
  }
);
