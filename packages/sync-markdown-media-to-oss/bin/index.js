#!/usr/bin/env node

import { cac } from 'cac';
import { syncMedia } from '../src/index';
import pkg from '../package.json';
import pc from "picocolors";

try {
    const cli = cac('mkcli');

    cli
        .command('sync', 'Synchronize media resources to OSS storage.')
        .option('--input <filename>', 'Enter the markdown file name.')
        .action((options)=> {
            if (options.input) syncMedia(options.input);
        })
        
    cli.help();
    cli.version(pkg.version);
    cli.parse()
} catch (error) {
    console.error(pc.red(`ERROR：${error.message}`))
    process.exit(1)
}
