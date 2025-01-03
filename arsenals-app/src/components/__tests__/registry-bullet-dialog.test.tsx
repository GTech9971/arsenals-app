import { screen } from "@testing-library/react";
import { RegistryBulletDialog } from "../registry-bullet-dialog";
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";
import { render } from "@/testing/test-utils";

describe("弾丸登録ダイアログ", () => {

    test("弾丸名の入力がない場合、エラーになる", async () => {
        const dismiss = (data?: string | undefined | null, role?: string | undefined | null) => { };

        render(<RegistryBulletDialog dismiss={dismiss} />);
        const saveButton = screen.getByText("Save");
        await userEvent.click(saveButton);

        expect(await screen.findByText('弾丸名は必須です。')).toBeInTheDocument();
        expect(await screen.findByText("ダメージは数字で入力してください。")).toBeInTheDocument();
    });

    test("キャンセルを押すとroleにcancelが返る", async () => {
        const dismiss = (data?: string | undefined | null, role?: string | undefined | null) => {
            expect(role).toBe('cancel');
            expect(data).toBe(null);
        };

        render(<RegistryBulletDialog dismiss={dismiss} />);

        const cancelButton = screen.getByText('Cancel');
        await userEvent.click(cancelButton);
    });

    test("入力がある場合成功し、roleにconfirm、dataにnullが返る", async () => {
        const dismiss = (data?: string | undefined | null, role?: string | undefined | null) => {
            expect(role).toBe('confirm');
            expect(data).toBe(null);
        };

        render(<RegistryBulletDialog dismiss={dismiss} />);
        const inputBullet = screen.getByPlaceholderText<HTMLInputElement>('9mm');
        await userEvent.type(inputBullet, "45ACP");

        const inputDamage = screen.getByLabelText<HTMLInputElement>('ダメージ');
        await userEvent.type(inputDamage, "10");

        const saveButton = screen.getByText('Save');
        await userEvent.click(saveButton);
    });

    test("ダメージがマイナスの場合エラー", async () => {
        const dismiss = (data?: string | undefined | null, role?: string | undefined | null) => { };

        render(<RegistryBulletDialog dismiss={dismiss} />);
        const inputBullet = screen.getByPlaceholderText<HTMLInputElement>('9mm');
        await userEvent.type(inputBullet, "45ACP");

        const inputDamage = screen.getByLabelText<HTMLInputElement>('ダメージ');
        await userEvent.type(inputDamage, "-1");

        const saveButton = screen.getByText('Save');
        await userEvent.click(saveButton);

        expect(await screen.findByText("ダメージは1以上です。")).toBeInTheDocument();
    });

    test("ダメージが0の場合エラー", async () => {
        const dismiss = (data?: string | undefined | null, role?: string | undefined | null) => { };

        render(<RegistryBulletDialog dismiss={dismiss} />);
        const inputBullet = screen.getByPlaceholderText<HTMLInputElement>('9mm');
        await userEvent.type(inputBullet, "45ACP");

        const inputDamage = screen.getByLabelText<HTMLInputElement>('ダメージ');
        await userEvent.type(inputDamage, "0");

        const saveButton = screen.getByText('Save');
        await userEvent.click(saveButton);

        expect(await screen.findByText("ダメージは1以上です。")).toBeInTheDocument();
    });

    test("ダメージが5000を超える場合の場合エラー", async () => {
        const dismiss = (data?: string | undefined | null, role?: string | undefined | null) => { };

        render(<RegistryBulletDialog dismiss={dismiss} />);
        const inputBullet = screen.getByPlaceholderText<HTMLInputElement>('9mm');
        await userEvent.type(inputBullet, "45ACP");

        const inputDamage = screen.getByLabelText<HTMLInputElement>('ダメージ');
        await userEvent.type(inputDamage, "5001");

        const saveButton = screen.getByText('Save');
        await userEvent.click(saveButton);

        expect(await screen.findByText("ダメージは5000以下です。")).toBeInTheDocument();
    });


})