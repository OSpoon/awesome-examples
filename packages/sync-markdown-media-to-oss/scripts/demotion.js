import { transformFile } from '@babel/core';
import fs from 'fs-extra';
import pc from "picocolors";

export const demotion = (path) => {
    transformFile(path, (err, result) => {
        console.log(err ? `ERROE：${pc.red(err)}` : `INFO：${pc.green('开始语法降级处理')}`);
        fs.writeFileSync(path.replace('.js', '.cjs'), result.code, { encoding: 'utf-8' });
        console.log(`INFO：${pc.green('语法降级处理结束')}`);
    })
}