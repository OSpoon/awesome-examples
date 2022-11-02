import { Plugin } from 'vite';

declare type Options = {
    path: string;
    pem: string;
};
declare const certificateInstall: (options: Options) => Plugin;

export { Options, certificateInstall as default };
