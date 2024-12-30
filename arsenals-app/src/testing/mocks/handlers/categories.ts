import { http, HttpResponse } from "msw";
import { env } from '@/config/env';
import { FetchGunCategoryResponse, RegistryGunCategoryResponse } from '@gtech9971/arsenals.model'

/**
 * 銃カテゴリーのMSWハンドラー
 */
export const categoriesHandlers = [
    // カテゴリー取得
    http.get(`${env.API_URL}/categories`, async () => {
        return HttpResponse.json<FetchGunCategoryResponse>({
            error: undefined,
            data: [
                { id: 'C-0001', name: 'ハンドガン' },
                { id: 'C-0002', name: 'ライフル' }
            ]
        }, { status: 200 });
    }),

    // カテゴリー登録
    http.post(`${env.API_URL}/categories`, async () => {
        return HttpResponse.json<RegistryGunCategoryResponse>({
            error: undefined,
            data: { id: 'C-1000' }
        }, { status: 201 })
    }),
]