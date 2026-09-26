import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.route('**/api/payments', (route) =>
    route.fulfill({ status: 201, json: { id: 'pay_test', status: 'succeeded' } }),
  );
  await page.goto('/products/stoneware-mug');
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await page.getByRole('link', { name: 'Checkout' }).click();
});

test('places an order', async ({ page }) => {
  await page.getByPlaceholder('Full name').fill('Ada Lindqvist');
  await page.getByPlaceholder('Email').fill('ada@example.com');
  await page.getByPlaceholder('Street address').fill('12 Harbor Lane');
  await page.getByPlaceholder('City').fill('Portland');
  await page.getByPlaceholder('ZIP code').fill('04101');
  await page.getByRole('button', { name: 'Continue to payment' }).click();

  await page.getByPlaceholder('Name on card').fill('Ada Lindqvist');
  await page.getByPlaceholder('Card number').fill('4242 4242 4242 4242');
  await page.getByPlaceholder('MM / YY').fill('12 / 29');
  await page.getByPlaceholder('CVC').fill('123');
  await page.getByRole('button', { name: 'Review order' }).click();

  await expect(page.getByText('•••• 4242')).toBeVisible();
  await page.getByRole('button', { name: 'Place order' }).click();
  await page.waitForTimeout(300);
  expect(page.url()).toContain('/orders/FH-');
  await expect(page.getByRole('heading', { name: 'Thank you' })).toBeVisible();
});

test('keeps the shipping details when going back', async ({ page }) => {
  await page.getByPlaceholder('Full name').fill('Ada Lindqvist');
  await page.getByPlaceholder('Email').fill('ada@example.com');
  await page.getByPlaceholder('Street address').fill('12 Harbor Lane');
  await page.getByPlaceholder('City').fill('Portland');
  await page.getByPlaceholder('ZIP code').fill('04101');
  await page.getByRole('button', { name: 'Continue to payment' }).click();
  await page.getByRole('button', { name: 'Back' }).click();

  await expect(page.getByPlaceholder('Full name')).toHaveValue('Ada Lindqvist');
});
