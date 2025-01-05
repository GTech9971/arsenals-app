import { render, screen, waitFor } from "@/testing/test-utils";
import { GunCategorySegment } from "../gun-category-segment";
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";

describe("銃カテゴリーセグメント", () => {

    test("選択したカテゴリーが返ってくる", async () => {
        const onChange = (value?: string) => {
            console.debug(value);
            expect(value).toBe('C-1000');
        };

        render(<GunCategorySegment onChange={onChange} />);

        await waitFor(async () => {
            const handgunButton = screen.getByText("ハンドガン");
            await userEvent.click(handgunButton);
            expect(handgunButton).toBeInTheDocument();
        });
    });

    test("追加ボタン押下時に登録ダイアログが表示される", async () => {
        render(<GunCategorySegment onChange={(value?: string) => { console.debug(value) }} />);

        const openButton = screen.getByTestId('open');
        expect(screen.queryByText('カテゴリー登録')).not.toBeInTheDocument();

        await userEvent.click(openButton);

        const modalTest = await screen.findByText("カテゴリー登録");
        expect(modalTest).toBeInTheDocument();
    });

});