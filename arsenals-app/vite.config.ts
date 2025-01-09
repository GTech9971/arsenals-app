import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from "vite-tsconfig-paths"
import { env } from './src/config/env';

// https://vite.dev/config/
export default defineConfig({
  // エイリアス付きでアクセスする場合必要なのだが、開発中はenvを使用すると起動に失敗するので一時的にコメント
  // リリースする際はコメントアウトすること
  // base: env.ENABLE_API_MOCKING ? undefined : '/arsenals/',
  plugins: [react(), tsconfigPaths()],
})
