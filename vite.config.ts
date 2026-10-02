import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
import { fileURLToPath } from 'node:url';

// base './' + HashRouter: GitHub Pages 같은 하위 경로 정적 호스팅에서도 별도 설정 없이 동작한다.
export default defineConfig({
  base: './',
  // 5001 고정. 이미 쓰는 프로세스가 있으면 다른 포트로 넘어가지 않고 오류로 멈춘다.
  server: { port: 5001, strictPort: true },
  preview: { port: 5001, strictPort: true },
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  plugins: [{ enforce: 'pre', ...mdx({ providerImportSource: '@mdx-js/react', remarkPlugins: [remarkGfm] }) }, react()],
});
