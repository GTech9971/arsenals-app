import { render, screen, waitFor } from "@/testing/test-utils";
import { RegistryGunForm } from "../guns/components/registry-guns/registry-gun-form";
import '@testing-library/jest-dom'
import userEvent, { UserEvent } from "@testing-library/user-event";


describe("銃登録フォーム", () => {

    let user: UserEvent;

    beforeAll(async () => {
        user = userEvent.setup();
    });

    const waitIonShadow = async () => {
        // 初回描画時にはion-inputしかなく、しばらく待機することで
        // 内部にinputタグが生成される。
        await waitFor(() => {
            const nameInput = screen
                .getAllByRole("textbox")
                .find(x => x.className.includes("native-input"));
            expect(nameInput).not.toBeUndefined();
        });
    }

    test("必須項目エラー（名前）", async () => {
        render(<RegistryGunForm showSubmit />);

        await waitIonShadow();

        // カテゴリー選択
        const categorySelect = screen
            .getAllByRole("combobox")
            .find(x => x.getAttribute("name") === "categoryId");

        expect(categorySelect).not.toBeUndefined();
        // ボタンクリックはuser.clickで行う
        await user.click(categorySelect!);


        // alertの検証は waitForでアラートのOKボタンが表示されるまで待機
        await waitFor(async () => {
            const okButton = await screen.findByText("OK");

            // オプションはalertに表示されているオプションを選択するようにする。
            // 間違ってIonSelectOptionを取得しないこと。クリックしても意味ない。
            const option = screen.queryAllByText("ライフル").find(x => x.className.includes("alert-radio-label"));
            expect(option).not.toBeUndefined();
            await user.click(option!);

            await user.click(okButton);
            expect(okButton).not.toBeInTheDocument();
        });
        expect(categorySelect).toHaveValue("C-2000");


        // 装弾数入力
        const capacityInput = screen
            .getAllByRole("textbox")
            .find(x => x.getAttribute("name") === 'capacity');

        expect(capacityInput).not.toBeUndefined();

        // 入力は必ずuser.typeを使用すること。そうしないとzodで未入力と判定される。
        await user.type(capacityInput!, "34");
        expect(capacityInput).toHaveValue(34);


        const submit = screen.getByText("Save");
        await user.click(submit);

        // screen.debug();

        expect(screen.queryByText("名前は必須です。")).toBeInTheDocument();
        expect(screen.queryByText("カテゴリーは必須です。")).not.toBeInTheDocument();
        expect(screen.queryByText("装弾数は数字で入力してください。")).not.toBeInTheDocument();
        expect(screen.queryByText("銃画像のURL形式が不正です。")).not.toBeInTheDocument();

    });

    test("必須項目エラー(カテゴリー)", async () => {
        render(<RegistryGunForm showSubmit />);
        const user = userEvent.setup();
        await waitIonShadow();

        // その内部のinputタグに対してuser typeを行うとちゃんと値がvalueに設定されzodの認証が通る
        //ion~タグに対してtypeしてもzodはエラーになる
        const nameInput = screen
            .getAllByRole("textbox")
            .find(x => x.className.includes("native-input") && x.getAttribute("name") === 'name');
        expect(nameInput).not.toBeUndefined();

        await user.type(nameInput!, "銃の名前");
        expect(nameInput).toHaveValue("銃の名前");
        screen.debug(nameInput);

        const capacityInput = screen
            .getAllByRole("textbox")
            .find(x => x.className.includes("native-input") && x.getAttribute("name") === 'capacity');
        expect(capacityInput).not.toBeUndefined();
        await user.type(capacityInput!, "29");
        expect(capacityInput).toHaveValue(29);
        screen.debug(capacityInput);



        const submit = screen.getByText("Save");
        await user.click(submit);

        await waitFor(() => {
            screen.debug();
            expect(screen.getByText("カテゴリーは必須です。")).toBeInTheDocument();
            expect(screen.queryByText("名前は必須です。")).not.toBeInTheDocument();
            expect(screen.queryByText("装弾数は数字で入力してください。")).not.toBeInTheDocument();
            expect(screen.queryByText("銃画像のURL形式が不正です。")).not.toBeInTheDocument();
        });
    });

    test("必須項目エラー(全部)", async () => {
        render(<RegistryGunForm showSubmit />);

        await waitIonShadow();

        const submit = screen.getByText("Save");
        await user.click(submit);

        await waitFor(() => {
            expect(screen.queryByText("カテゴリーは必須です。")).toBeInTheDocument();

            expect(screen.queryByText("名前は必須です。")).toBeInTheDocument();
            expect(screen.queryByText("装弾数は数字で入力してください。")).toBeInTheDocument();
        });

    });

    test("登録成功（画像なし）", async () => {
        render(<RegistryGunForm showSubmit />);

        await waitIonShadow();

        const nameInput = screen
            .getAllByRole("textbox")
            .find(x => x.className.includes("native-input") && x.getAttribute("name") === 'name');
        expect(nameInput).not.toBeUndefined();

        await user.type(nameInput!, "銃の名前");
        expect(nameInput).toHaveValue("銃の名前");

        const capacityInput = screen
            .getAllByRole("textbox")
            .find(x => x.className.includes("native-input") && x.getAttribute("name") === 'capacity');
        expect(capacityInput).not.toBeUndefined();
        await user.type(capacityInput!, "29");
        expect(capacityInput).toHaveValue(29);

        // カテゴリー選択
        const categorySelect = screen
            .getAllByRole("combobox")
            .find(x => x.getAttribute("name") === "categoryId");

        expect(categorySelect).not.toBeUndefined();
        // ボタンクリックはuser.clickで行う
        await user.click(categorySelect!);

        // alertの検証は waitForでアラートのOKボタンが表示されるまで待機
        await waitFor(async () => {
            const okButton = await screen.findByText("OK");

            // オプションはalertに表示されているオプションを選択するようにする。
            // 間違ってIonSelectOptionを取得しないこと。クリックしても意味ない。
            const option = screen.queryAllByText("ライフル").find(x => x.className.includes("alert-radio-label"));
            expect(option).not.toBeUndefined();
            await user.click(option!);

            await user.click(okButton);
            expect(okButton).not.toBeInTheDocument();
        });
        expect(categorySelect).toHaveValue("C-2000");



        const submit = screen.getByText("Save");
        await user.click(submit);

        await waitFor(() => {
            expect(screen.queryByText("カテゴリーは必須です。")).not.toBeInTheDocument();
            expect(screen.queryByText("名前は必須です。")).not.toBeInTheDocument();
            expect(screen.queryByText("装弾数は数字で入力してください。")).not.toBeInTheDocument();
            expect(screen.queryByText("銃画像のURL形式が不正です。")).not.toBeInTheDocument();
        });
    });


    test("登録成功（画像あり）", async () => {
        render(<RegistryGunForm showSubmit />);

        await waitIonShadow();

        const nameInput = screen
            .getAllByRole("textbox")
            .find(x => x.className.includes("native-input") && x.getAttribute("name") === 'name');
        expect(nameInput).not.toBeUndefined();

        await user.type(nameInput!, "銃の名前");
        expect(nameInput).toHaveValue("銃の名前");

        const capacityInput = screen
            .getAllByRole("textbox")
            .find(x => x.className.includes("native-input") && x.getAttribute("name") === 'capacity');
        expect(capacityInput).not.toBeUndefined();
        await user.type(capacityInput!, "29");
        expect(capacityInput).toHaveValue(29);

        // カテゴリー選択
        const categorySelect = screen
            .getAllByRole("combobox")
            .find(x => x.getAttribute("name") === "categoryId");

        expect(categorySelect).not.toBeUndefined();
        // ボタンクリックはuser.clickで行う
        await user.click(categorySelect!);

        // alertの検証は waitForでアラートのOKボタンが表示されるまで待機
        await waitFor(async () => {
            const okButton = await screen.findByText("OK");

            // オプションはalertに表示されているオプションを選択するようにする。
            // 間違ってIonSelectOptionを取得しないこと。クリックしても意味ない。
            const option = screen.queryAllByText("ライフル").find(x => x.className.includes("alert-radio-label"));
            expect(option).not.toBeUndefined();
            await user.click(option!);

            await user.click(okButton);
            expect(okButton).not.toBeInTheDocument();
        });
        expect(categorySelect).toHaveValue("C-2000");

        const inputImage = screen
            .getAllByRole('textbox')
            .find(x => x.getAttribute("name") === 'imageUrl');
        expect(inputImage).not.toBeUndefined();
        const imageUrl: string = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Heckler_%26_Koch_G3_Holzschaft_Display_noBG.png/600px-Heckler_%26_Koch_G3_Holzschaft_Display_noBG.png";
        await user.type(inputImage!, imageUrl);
        expect(inputImage).toHaveValue(imageUrl);


        const submit = screen.getByText("Save");
        await user.click(submit);

        await waitFor(() => {
            expect(screen.queryByText("カテゴリーは必須です。")).not.toBeInTheDocument();
            expect(screen.queryByText("名前は必須です。")).not.toBeInTheDocument();
            expect(screen.queryByText("装弾数は数字で入力してください。")).not.toBeInTheDocument();
            expect(screen.queryByText("銃画像のURL形式が不正です。")).not.toBeInTheDocument();
        });
    });
});