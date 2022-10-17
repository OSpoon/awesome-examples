import path from "path";
import fs from "fs-extra";

import markdownIt from "markdown-it";
import hljs from "highlight.js";
import Token from "markdown-it/lib/token";
import { openBrowser, startServer } from "../../common/src";

// 实例化md-it对象
const md = new markdownIt({
    highlight: (str: string, lang: string) => {
        const defaultCode: string = `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
        if (lang && hljs.getLanguage(lang)) {
            try {
                return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>`
            } catch (__) {
                return defaultCode;
            }
        }
        return defaultCode;
    }
});

md.use(require("markdown-it-container"), "warning", {
    validate: (params: string) => {
        return params.trim().match(/^warning+(.*)$/m);
    },
    render: (tokens: Array<Token>, idx: number) => {
        const m = tokens[idx].info.trim().match(/^warning+(.*)$/m);
        if (tokens[idx].nesting === 1) {
            return `<div class="warning">${md.utils.escapeHtml(m ? m[1] : '')}`
        } else {
            return '</div>\n';
        }
    }
})
// 读取md文件并
const rawMd = fs.readFileSync(path.resolve(__dirname, "temp.md")).toString();
// 通过md-it模块渲染为html文本
const output = md.render(rawMd);
const styles = `
<link rel="stylesheet" href="./node_modules/highlight.js/styles/a11y-dark.css">
<style>
    .warning{
        margin: 28px 0;
        padding: 10px 14px 4px 22px;
        border-radius: 8px;
        overflow-x: auto;
        transition: color .5s,background-color .5s;
        position: relative;
        font-size: 14px;
        line-height: 1.6;
        font-weight: 500;
        color: #0000008c;
        background-color: #f9f9f9;
        border: 1px solid #ffc517;
    }
    .hljs {
        padding: 5px 8px;
        border-radius: 5px;
    }
</style>
`;
// 输出html文本
fs.writeFileSync(path.resolve(__dirname, "../index.html"), `
${styles}
${output}
`);

openBrowser(path.resolve(__dirname, "../index.html"));