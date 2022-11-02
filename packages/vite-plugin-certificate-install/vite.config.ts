import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import certificateInstall from './plugins/vite-plugin-certificate-install';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), certificateInstall({ path: './keys', pem: 'agent2.pem' })]
})
