import { defineConfig } from 'vite'
import pkeyInstall from './src/index';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [pkeyInstall({ path: '', key: '' })]
})