import { expect, test } from '@playwright/test';

test('should generate snapshots', async ({ page }) => {
  await page.goto('http://localhost:3417/');
  await expect(page).toHaveTitle('🍌 Banan 🍌');
  await expect(page).toHaveScreenshot();
});
