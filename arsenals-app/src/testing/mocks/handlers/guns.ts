import { env } from "@/config/env";
import { FetchGunsResponse, Gun, RegistryGunResponse } from "@gtech9971/arsenals.model";
import { http, HttpResponse } from "msw";
import { DummyBulletC } from "./bullets";
import { DummyCategoryA, DummyCategoryB } from "./categories";
import { HttpStatusCode } from "axios";

export const gunsHandlers = [
    // 全銃取得
    http.get(`${env.API_URL}/guns`, async ({ request }) => {
        const url = new URL(request.url);

        let data: Gun[] = [
            DummyGunA,
            DummyGunB,
        ];

        const categoryId: string | null = url.searchParams.get('category');
        console.log(categoryId);
        if (categoryId) {
            data = data.filter(x => x.category?.id === categoryId);
        }

        return HttpResponse.json<FetchGunsResponse>({
            error: undefined,
            data: data
        }, { status: 200 })
    }),

    // 登録
    http.post(`${env.API_URL}/guns`, async ({ request }) => {
        return HttpResponse.json<RegistryGunResponse>({
            error: undefined,
            data: { id: 'G-1000' }
        }, { status: 201 })
    }),

    // 削除
    http.delete(`${env.API_URL}/guns/*`, async () => {
        return HttpResponse.text(null, { status: HttpStatusCode.NoContent });
    })
];

const DummyGunA: Gun = {
    id: "G-1000",
    name: 'G3A1',
    category: DummyCategoryB,
    capacity: 31,
    imageUrl: 'https://img01.militaryblog.jp/usr/o/r/g/orga/UMAREXsG3A3sGBBRskJPver.HKsLicensedkガスブローバックsVFC_4.jpg',
    bullets: [{ id: 'B-1000', name: '5.56', damage: 20 }]
};

const DummyGunB: Gun = {
    id: "G-2000",
    name: 'M1911A1',
    category: DummyCategoryA,
    capacity: 6,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlOzyXOpgL7MotXGpyGwMFDPmaklfRU-E_4w&s',
    bullets: [DummyBulletC]
};