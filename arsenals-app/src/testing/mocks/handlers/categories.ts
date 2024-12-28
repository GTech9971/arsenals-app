import { http, HttpResponse } from "msw";
import { env } from '@/config/env';
import { FetchGunCategoryResponse } from '@gtech9971/arsenals.model'

/**
 * 銃カテゴリーのMSWハンドラー
 */
export const categoriesHandlers = [

    http.get(`${env.API_URL}/categories`, async ({ request }) => {
        return HttpResponse.json<FetchGunCategoryResponse>({
            error: undefined,
            data: [
                { id: 'C-0001', name: 'ハンドガン' },
                { id: 'C-0002', name: 'ライフル' }
            ]
        }, { status: 200 });
    })
]