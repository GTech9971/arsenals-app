import { HttpResponse, bypass, http } from 'msw';

import { env } from '@/config/env';
import { categoriesHandlers } from './categories';
import { bulletsHandlers } from './bullets';
import { gunsHandlers } from './guns';

export const handlers = [
    ...categoriesHandlers,
    ...bulletsHandlers,
    ...gunsHandlers,
    http.get(`${env.API_URL}/healthcheck`, async () => {
        return HttpResponse.json({ ok: true });
    }),
    // 銃画像ダウンロード用のwikiページへのアクセスはすべてbypass
    http.all('https://upload.wikimedia.org/*', async ({ request }) => {
        const response = await fetch(bypass(request));
        return response;
    })
];