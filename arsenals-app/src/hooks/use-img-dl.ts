export const useImgDl = () => {

    /**
     * 画像URLをダウンロードし、Fileで返す
     * @param imageUrl ダウンロードする画像URL
     * @param fileName ダウンロード後のファイル名
     * @returns 
     * @throws ダウンロード失敗時
     */
    const download = async (imageUrl: string, fileName: string): Promise<File> => {
        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error(`画像ダウンロードに失敗:${response.statusText}`);
        }

        const blob = await response.blob();
        const file = new File([blob], fileName, { type: blob.type });

        return file;
    }

    const file2formData = (name: string = 'name', file: File): FormData => {
        const formData = new FormData();
        formData.append(name, file);
        return formData;
    }

    return { download, file2formData };
}