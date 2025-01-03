import { render, screen, waitFor } from "@/testing/test-utils";
import { GunCategorySegment } from "../gun-category-segment";
import { GunCategory } from "@gtech9971/arsenals.model";
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";
import { IonApp } from "@ionic/react";

describe("銃カテゴリーセグメント", () => {

    test("選択したカテゴリーが返ってくる", async () => {
        const onChange = (value: GunCategory | undefined) => {
            console.debug(value);
            expect(value?.name).toBe('ハンドガン');
        };

        render(<GunCategorySegment onChange={onChange} />);

        await waitFor(async () => {
            const handgunButton = screen.getByText("ハンドガン");
            await userEvent.click(handgunButton);
            expect(handgunButton).toBeInTheDocument();
        });
    });

    test("追加ボタン押下時に登録ダイアログが表示される", async () => {
        render(
            <IonApp>
                <GunCategorySegment onChange={(value: GunCategory | undefined) => { console.debug(value) }} />
            </IonApp>
        );

        const openButton = screen.getByTestId('open');
        expect(screen.queryByText('カテゴリー登録')).not.toBeInTheDocument();

        await userEvent.click(openButton);

        const modalTest = await screen.findByText("カテゴリー登録");
        expect(modalTest).toBeInTheDocument();
    });

});