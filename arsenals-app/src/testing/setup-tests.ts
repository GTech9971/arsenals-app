import '@testing-library/jest-dom/vitest';

import { server } from '@/testing/mocks/server';
import { afterAll, afterEach, beforeAll, beforeEach, vi } from 'vitest';

vi.mock('zustand');

// CSSパースエラーを無視
const originalConsoleError = console.error;
const jsDomCssError = "Error: Could not parse CSS stylesheet";
console.error = (...params) => {
    if (!params.find((p) => p.toString().includes(jsDomCssError))) {
        originalConsoleError(...params);
    }
};

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
beforeEach(() => {
    const ResizeObserverMock = vi.fn(() => ({
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
    }));

    vi.stubGlobal('ResizeObserver', ResizeObserverMock);

    window.btoa = (str: string) => Buffer.from(str, 'binary').toString('base64');
    window.atob = (str: string) => Buffer.from(str, 'base64').toString('binary');
});
afterEach(() => {
    server.resetHandlers();
});