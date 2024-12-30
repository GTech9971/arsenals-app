import { env } from "@/config/env";
import { RegistryBulletResponse } from "@gtech9971/arsenals.model";
import { http, HttpResponse } from "msw";

export const bulletsHandlers = [
    // 弾丸登録
    http.post(`${env.API_URL}/bullets`, async () => {
        return HttpResponse.json<RegistryBulletResponse>({
            error: undefined,
            data: { id: "B-0001" }
        }, { status: 201 })
    })
];