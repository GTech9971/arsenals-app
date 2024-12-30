/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import * as path from "path";

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/testing/setup-tests.ts',
        include: ["src/**/*.test.{js,ts,jsx,tsx}"],
        alias: {
            "@": path.resolve(__dirname, "./src")
        },
        exclude: ['**/node_modules/**', '**/e2e/**'],
        coverage: {
            include: ['src/**'],
        },
    },
})