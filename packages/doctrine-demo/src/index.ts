import doctrine from "doctrine";
const ast = doctrine.parse(
    `/**
        * @cDescribe describe
        * @cType
        * @cOptions options
        * @cDefault default
        */`
    , {
        unwrap: true,
        // 返回指定列表的tags
        tags: null,
        // 解析遇到错误后继续执行
        recoverable: true
    });
console.log(ast.tags);