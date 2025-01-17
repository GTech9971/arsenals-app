import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from "vite-tsconfig-paths"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // エイリアス付きでアクセスする場合必要
  return {
    base: mode === 'production' ? '/arsenals/' : '/',
    plugins: [react(), tsconfigPaths()],
  }
})
