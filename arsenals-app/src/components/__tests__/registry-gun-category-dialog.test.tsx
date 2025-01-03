import { screen, } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { RegistryGunCategoryDialog } from '../registry-gun-category-dialog';
import { render } from '@/testing/test-utils';

describe("カテゴリー登録ダイアログ", () => {

    test("入力がない場合、エラーになる", async () => {
        const dismiss = (data?: string | undefined | null, role?: string | undefined | null) => { };

        render(<RegistryGunCategoryDialog dismiss={dismiss} />)
        const input = screen.getByPlaceholderText<HTMLIonInputElement>('ハンドガン');
        const inputVal = input.value;
        expect(inputVal).toBe('');

        const saveButton = screen.getByText('Save');
        await userEvent.click(saveButton);

        // エラーメッセージが表示されていることを確認
        expect(await screen.findByText('カテゴリー名は必須です。')).toBeInTheDocument();
    });

    test('キャンセルボタンを押すと、roleにcancelが返る', async () => {
        const dismiss = (data?: string | undefined | null, role?: string | undefined | null) => {
            expect(role).toBe('cancel');
            expect(data).toBe(null);
        };

        render(<RegistryGunCategoryDialog dismiss={dismiss} />);
        expect(screen.queryByText('カテゴリー登録')).toBeInTheDocument();

        const cancelButton = screen.getByText('Cancel');
        await userEvent.click(cancelButton);
    });

    test("入力がある場合成功し、roleにconfirm、dataにnullが返る", async () => {
        const dismiss = (data?: string | undefined | null, role?: string | undefined | null) => {
            expect(role).toBe('confirm');
            expect(data).toBe(null);
        };

        render(<RegistryGunCategoryDialog dismiss={dismiss} />);
        const input = screen.getByPlaceholderText<HTMLInputElement>('ハンドガン');
        await userEvent.type(input, "M1911A1");

        const saveButton = screen.getByText('Save');
        await userEvent.click(saveButton);
    });
});

