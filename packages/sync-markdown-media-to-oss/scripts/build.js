import { build } from 'esbuild';
import { demotion } from './demotion.js';
import path from 'path';

build({
    entryPoints: ['./bin/index.js'],
    outfile: './dist/index.js',
    bundle: true,
    platform: "node",
    format: 'cjs',
    minify: false,
    packages: 'external',
}).then(() => {
    demotion(path.resolve(process.cwd(), './dist/index.js'));
}).catch(() => process.exit(1));