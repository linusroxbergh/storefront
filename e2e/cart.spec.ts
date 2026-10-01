import { expect, test } from '@playwright/test';

test('adds a product and updates the total', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /Stoneware Mug/ }).click();
  await page.getByRole('button', { name: 'Add to cart' }).click();

  const drawer = page.locator('.drawer');
  await expect(drawer.getByText('Stoneware Mug')).toBeVisible();
  await drawer.getByRole('button', { name: '+' }).click();
  await expect(drawer.locator('dd.total')).toHaveText('$58.79');
});

test('applies a discount code', async ({ page }) => {
  await page.goto('/products/stoneware-mug');
  await page.getByRole('button', { name: 'Add to cart' }).click();

  const drawer = page.locator('.drawer');
  await drawer.getByPlaceholder('Discount code').fill('save15');
  await drawer.getByRole('button', { name: 'Apply' }).click();
  await expect(drawer.getByText('SAVE15 applied')).toBeVisible();
  await expect(drawer.getByText('−$3.60')).toBeVisible();
});

test('rejects an unknown code', async ({ page }) => {
  await page.goto('/products/stoneware-mug');
  await page.getByRole('button', { name: 'Add to cart' }).click();

  const drawer = page.locator('.drawer');
  await drawer.getByPlaceholder('Discount code').fill('FREEBIES');
  await drawer.getByRole('button', { name: 'Apply' }).click();
  await expect(drawer.getByText("That code doesn't exist or has expired.")).toBeVisible();
});

test('finds a product from the header search', async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder('Search the shop').fill('Mug');

  await expect(page.getByRole('heading', { name: 'Results for “Mug”' })).toBeVisible();
  await expect(page.locator('.grid li')).toHaveCount(1);
});
