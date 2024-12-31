import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { RegistryGunCategoryDialog } from '../registry-gun-category-dialog';
import { render } from '@/testing/test-utils';

describe("カテゴリー登録ダイアログ", () => {


    test('ダイアログが開くかどうか', async () => {
        render(<RegistryGunCategoryDialog />)

        const openButton = screen.getByTestId('open');
        expect(screen.queryByText('カテゴリー登録')).not.toBeInTheDocument();

        await userEvent.click(openButton);

        expect(screen.getByText('カテゴリー登録'));
    });

    test("入力がない場合、エラーになる", async () => {
        render(<RegistryGunCategoryDialog />)
        const openButton = screen.getByTestId('open');
        expect(screen.queryByText('カテゴリー登録')).not.toBeInTheDocument();
        await userEvent.click(openButton);

        const input = screen.getByPlaceholderText<HTMLInputElement>('ハンドガン');
        expect('', input.value);

        const saveButton = screen.getByText('Save');
        await userEvent.click(saveButton);

        // エラーメッセージが表示されていることを確認
        expect(await screen.findByText('カテゴリー名は必須です。')).toBeInTheDocument();
    });

    test('キャンセルボタンを押すと、ダイアログが閉じられる', async () => {
        render(<RegistryGunCategoryDialog />)
        const openButton = screen.getByTestId('open');
        expect(screen.queryByText('カテゴリー登録')).not.toBeInTheDocument();
        await userEvent.click(openButton);

        const cancelButton = screen.getByText('Cancel');
        await userEvent.click(cancelButton);

        await waitFor(() => {
            expect(screen.queryByText("カテゴリー登録")).not.toBeInTheDocument();
        });
    });

    test("入力がある場合成功し、ダイアログが閉じられる", async () => {
        render(<RegistryGunCategoryDialog />)
        const openButton = screen.getByTestId('open');
        expect(screen.queryByText('カテゴリー登録')).not.toBeInTheDocument();
        await userEvent.click(openButton);

        const input = screen.getByPlaceholderText<HTMLInputElement>('ハンドガン');
        await userEvent.type(input, "M1911A1");

        const saveButton = screen.getByText('Save');
        await userEvent.click(saveButton);

        await waitFor(() => {
            expect(screen.queryByText("カテゴリー登録")).not.toBeInTheDocument();
        });
    });
});

