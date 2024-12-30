import { http, HttpResponse } from "msw";
import { env } from '@/config/env';
import { FetchGunCategoryResponse, GunCategory, RegistryGunCategoryResponse } from '@gtech9971/arsenals.model'

/**
 * 銃カテゴリーのMSWハンドラー
 */
export const categoriesHandlers = [
    // カテゴリー取得
    http.get(`${env.API_URL}/categories`, async () => {
        return HttpResponse.json<FetchGunCategoryResponse>({
            error: undefined,
            data: [
                DummyCategoryA,
                DummyCategoryB,
                DummyCategoryC,
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

/** ハンドガン */
export const DummyCategoryA: GunCategory = {
    id: 'C-1000', name: 'ハンドガン'
}

/** ライフル */
export const DummyCategoryB: GunCategory = {
    id: 'C-2000', name: 'ライフル'
}
/** サブマシンガン */
export const DummyCategoryC: GunCategory = {
    id: 'C-3000', name: 'サブマシンガン'
}