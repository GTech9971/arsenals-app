import { HttpResponse, http } from 'msw';

import { env } from '@/config/env';
import { categoriesHandlers } from './categories';
import { bulletsHandlers } from './bullets';

export const handlers = [
    ...categoriesHandlers,
    ...bulletsHandlers,
    http.get(`${env.API_URL}/healthcheck`, async () => {
        return HttpResponse.json({ ok: true });
    })
];