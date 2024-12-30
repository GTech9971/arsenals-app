import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { RegistryGunCategoryDialog } from '../registry-gun-category-dialog';
import { render } from '@/testing/test-utils';

test('カテゴリー登録ダイアログが開くかどうか', async () => {
    render(<RegistryGunCategoryDialog />)

    const openButton = screen.getByTestId('open');
    expect(screen.queryByText('カテゴリー登録')).not.toBeInTheDocument();

    await userEvent.click(openButton);

    expect(screen.getByText('カテゴリー登録'));
});