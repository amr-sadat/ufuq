import { expect, test } from '@playwright/test';

test('loads the shell and connects to the API', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', {
      name: 'Learning, grounded in your source.',
    }),
  ).toBeVisible();
  await expect(page.getByRole('status')).toContainText('API connected', {
    timeout: 15_000,
  });
});

test('declares English LTR by default', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
});

test('switches to Arabic RTL', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Language' }).click();

  await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(
    page.getByRole('heading', { name: 'تعلّمٌ متجذّر في مصدره.' }),
  ).toBeVisible();
});
