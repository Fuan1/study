import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
import { fileURLToPath } from 'node:url';

// MDX 플러그인은 쿼리를 떼고 경로만 보기 때문에 exclude 로는 ?raw 를 막을 수 없다.
// 검색 색인은 글 원문(?raw)을 문자열로 읽으므로, ?raw 요청만 컴파일을 건너뛰게 감싼다.
const mdxPlugin = mdx({ providerImportSource: '@mdx-js/react', remarkPlugins: [remarkGfm] });
const compileMdx = mdxPlugin.transform as (this: unknown, code: string, id: string) => unknown;
const mdxSkipRaw = {
  ...mdxPlugin,
  enforce: 'pre' as const,
  transform(this: unknown, code: string, id: string) {
    if (/[?&]raw(&|$)/.test(id)) return null;
    return compileMdx.call(this, code, id);
  },
};

// base './' + HashRouter: GitHub Pages 같은 하위 경로 정적 호스팅에서도 별도 설정 없이 동작한다.
export default defineConfig({
  base: './',
  // 5001 고정. 이미 쓰는 프로세스가 있으면 다른 포트로 넘어가지 않고 오류로 멈춘다.
  server: { port: 5001, strictPort: true },
  preview: { port: 5001, strictPort: true },
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  plugins: [mdxSkipRaw, react()],
});
