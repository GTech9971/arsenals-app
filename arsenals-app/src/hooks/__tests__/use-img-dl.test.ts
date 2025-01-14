import { useImgDl } from "../use-img-dl";

const imageUrl: string = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Heckler_%26_Koch_G3_Holzschaft_Display_noBG.png/600px-Heckler_%26_Koch_G3_Holzschaft_Display_noBG.png";

test("ファイルダウンロード成功", async () => {
    const { download } = useImgDl();

    const file = await download(imageUrl, 'g3a3');

    expect(file.size).greaterThan(0);
    expect(file.name).toBe("g3a3");
});

test("ファイルダウンロード失敗", async () => {
    const { download } = useImgDl();
    await expect(download(imageUrl + "invalid", "test")).rejects.toThrow();
});