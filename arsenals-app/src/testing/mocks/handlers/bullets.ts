import { env } from "@/config/env";
import { Bullet, FetchBulletsResponse, RegistryBulletResponse } from "@gtech9971/arsenals.model";
import { http, HttpResponse } from "msw";

export const bulletsHandlers = [
    // 全弾丸取得
    http.get(`${env.API_URL}/bullets`, async () => {
        return HttpResponse.json<FetchBulletsResponse>({
            error: undefined,
            data: [
                DummyBulletA,
                DummyBulletB,
                DummyBulletC,
            ],
        }, { status: 200 })
    }),

    // 弾丸登録
    http.post(`${env.API_URL}/bullets`, async () => {
        return HttpResponse.json<RegistryBulletResponse>({
            error: undefined,
            data: { id: "B-0001" }
        }, { status: 201 })
    })
];

/** 5.56 */
export const DummyBulletA: Bullet = {
    id: 'B-1000', name: '5.56mm', damage: 20
}

/** 9mm */
export const DummyBulletB: Bullet = {
    id: 'B-2000', name: '9mm', damage: 12
}

/** 45ACP */
export const DummyBulletC: Bullet = {
    id: 'B-3000', name: '45ACP', damage: 13
}
