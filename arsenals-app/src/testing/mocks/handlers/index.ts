import { HttpResponse, http } from 'msw';

import { env } from '@/config/env';
import { categoriesHandlers } from './categories';

export const handlers = [
    ...categoriesHandlers,
    http.get(`${env.API_URL}/healthcheck`, async () => {
        return HttpResponse.json({ ok: true });
    })
];