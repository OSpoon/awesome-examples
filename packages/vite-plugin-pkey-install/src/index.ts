/**
 * Vite Plugin API
 * https://cn.vitejs.dev/guide/api-plugin.html
 */
import { readFileSync, existsSync } from "node:fs";
import { ServerResponse } from "node:http";
import { resolve } from "node:path";
import type { Connect, Plugin, ViteDevServer } from "vite";
import qrcode from 'qrcode-terminal';
import { green, yellow } from 'kolorist';

export type Options = {
    path: string,
    key: string,
}

export default function pkeyInstall(options: Options): Plugin {

    const { path: _path, key: _key } = options;

    return {
        name: 'vite-plugin-pkey-install',
        apply(_, { command }) {
            return command === 'serve';
        },
        configureServer(server: ViteDevServer) {
            server.middlewares.use((req: Connect.IncomingMessage, res: ServerResponse, next) => {
                // @ts-ignore
                const { method, originalUrl } = req;
                if (method === 'GET' && originalUrl === '/__pkey/') {
                    const root = resolve(_path, _key);
                    if (existsSync(root)) throw new Error('签名文件未找到~');
                    const key = readFileSync(root);
                    res.writeHead(200, {
                        'Content-Type': 'application/octet-stream',
                        'Content-Disposition': `filename=${_key}`
                    })
                    res.end(key);
                } else {
                    next();
                }
            })
            const _print = server.printUrls;
            server.printUrls = () => {
                _print();
                const host = server.resolvedUrls?.network[0];
                if (host) {
                    qrcode.generate(`${host}__pkey/`, { small: true })
                } else {
                    console.log(`  ${green('➜')}  ${yellow('Failed to get the network address.')}`);
                }
            }
        }
    }
}