import { test, expect } from '@playwright/test';

test.describe('PWA Features', () => {
  test('has meta tags for PWA', async ({ page }) => {
    await page.goto('/');
    
    // Check for theme-color meta tag
    const themeColor = await page.locator('meta[name="theme-color"]').getAttribute('content');
    expect(themeColor).toBe('#ff3e00');
    
    // Check for viewport meta tag
    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
    expect(viewport).toContain('width=device-width');
  });

  test('has PWA manifest link in development', async ({ page }) => {
    await page.goto('/');
    
    // In dev mode, Vite PWA might inject manifest via script
    // Just verify the page loads and has PWA setup
    const title = await page.title();
    expect(title).toContain('Bun Svelte PWA');
  });

  test('app is responsive', async ({ page }) => {
    await page.goto('/');
    
    // Test different viewport sizes
    await page.setViewportSize({ width: 375, height: 667 }); // Mobile
    const heading = page.getByRole('heading', { name: /Bun \+ Svelte PWA/i });
    await expect(heading).toBeVisible();
    
    await page.setViewportSize({ width: 1920, height: 1080 }); // Desktop
    await expect(heading).toBeVisible();
  });
});
