# vite-plugin-pkey-install

公钥证书安装辅助插件

## Install

```js
npm i -D # vite-plugin-pkey-install
```

Add plugin to your vite.config.ts:

```js
// vite.config.ts
import { defineConfig } from 'vite'
import pkeyInstall from './src/index';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [pkeyInstall({})]
})
```