import fs from "node:fs";
import path from "node:path";
import type { Plugin, ResolvedConfig, ViteDevServer } from "vite";
import qrcode from "qrcode-terminal";
import { bold, green } from "kolorist";

export type Options = {
    path: string,
    pem: string,
}

const certificateInstall = (options: Options) => {
    const { path: _path, pem: _pem } = options;

    let config: ResolvedConfig;

    return {
        name: 'vite-plugin-certificate-install',
        apply(_, { command }) {
            return command === 'serve'
        },
        configResolved(_config) {
            config = _config
        },
        configureServer(server: ViteDevServer) {
            server.middlewares.use((req, res, next) => {
                const { method, originalUrl } = req;
                if (method === 'GET' && originalUrl === '/__certificate/') {
                    const pemPath = path.resolve(_path, _pem);
                    if (!fs.existsSync(pemPath)) throw new Error(`Make sure that '${pemPath}' exists.`);
                    const pem = fs.readFileSync(path.resolve(_path, _pem));
                    res.writeHead(200, {
                        'Content-Type': 'application/octet-stream',
                        'Content-Disposition': `filename=${_pem}`,
                    })
                    res.end(pem);
                } else {
                    next();
                }
            })
            // 保存一份内置的printUrls函数；
            const _print = server.printUrls;
            // 重写printUrls函数，扩展功能；
            server.printUrls = () => {
                _print();
                // 获取 network 中的地址用于合成url后生成二维码
                const host = server.resolvedUrls?.network[0];
                if (host) {
                    console.log(`${bold('Install Root Certificate on a Mobile Device ⤦')}`);
                    qrcode.generate(`${host}__certificate/`, { small: true });
                } else {
                    console.log(`${green('Failed to get the network address.')}`);
                }
            }
        },
    } as Plugin;
}

export default certificateInstall;