import { test, expect } from '@playwright/test';

test.describe('Counter Component', () => {
  test('displays initial count of 0', async ({ page }) => {
    await page.goto('/');
    
    // Find the counter button
    const counterButton = page.getByRole('button', { name: /count is/i });
    await expect(counterButton).toBeVisible();
    await expect(counterButton).toHaveText('count is 0');
  });

  test('increments count when clicked', async ({ page }) => {
    await page.goto('/');
    
    const counterButton = page.getByRole('button', { name: /count is/i });
    
    // Click the button
    await counterButton.click();
    await expect(counterButton).toHaveText('count is 1');
    
    // Click again
    await counterButton.click();
    await expect(counterButton).toHaveText('count is 2');
    
    // Click multiple times
    await counterButton.click();
    await counterButton.click();
    await counterButton.click();
    await expect(counterButton).toHaveText('count is 5');
  });

  test('counter state is independent per session', async ({ page, context }) => {
    await page.goto('/');
    
    const counterButton = page.getByRole('button', { name: /count is/i });
    await counterButton.click();
    await counterButton.click();
    await expect(counterButton).toHaveText('count is 2');
    
    // Open a new page in the same context
    const newPage = await context.newPage();
    await newPage.goto('/');
    
    const newCounterButton = newPage.getByRole('button', { name: /count is/i });
    // Should start at 0 in the new page
    await expect(newCounterButton).toHaveText('count is 0');
    
    await newPage.close();
  });
});
