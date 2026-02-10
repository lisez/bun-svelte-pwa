import { test, expect } from '@playwright/test';

test.describe('App', () => {
  test('has title', async ({ page }) => {
    await page.goto('/');
    
    // Expect a title containing "Bun Svelte PWA"
    await expect(page).toHaveTitle(/Bun Svelte PWA/);
  });

  test('displays main heading', async ({ page }) => {
    await page.goto('/');
    
    // Expect the main heading to be visible
    const heading = page.getByRole('heading', { name: /Bun \+ Svelte PWA/i });
    await expect(heading).toBeVisible();
  });

  test('displays environment and date info', async ({ page }) => {
    await page.goto('/');
    
    // Check that environment info is displayed
    const envText = page.getByText(/Environment:/);
    await expect(envText).toBeVisible();
  });

  test('shows logos with correct links', async ({ page }) => {
    await page.goto('/');
    
    // Check Bun logo link
    const bunLink = page.getByRole('link', { name: /Bun Logo/i });
    await expect(bunLink).toHaveAttribute('href', 'https://bun.sh');
    
    // Check Svelte logo link
    const svelteLink = page.getByRole('link', { name: /Svelte Logo/i });
    await expect(svelteLink).toHaveAttribute('href', 'https://svelte.dev');
  });
});
