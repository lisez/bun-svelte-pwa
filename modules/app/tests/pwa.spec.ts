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

  test('service worker is registered', async ({ page }) => {
    await page.goto('/');
    
    // Wait for service worker registration
    await page.waitForTimeout(1000);
    
    // Check if service worker is supported and registered
    const swRegistered = await page.evaluate(async () => {
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.getRegistration();
        return registration !== undefined;
      }
      return false;
    });
    
    expect(swRegistered).toBeTruthy();
  });

  test('manifest is available', async ({ page }) => {
    await page.goto('/');
    
    // Check for manifest link
    const manifestLink = page.locator('link[rel="manifest"]');
    const hasManifest = await manifestLink.count() > 0 || 
                        await page.evaluate(() => 
                          document.querySelector('script[type="module"]')?.textContent?.includes('manifest')
                        );
    
    // Manifest might be injected by Vite PWA plugin
    expect(hasManifest).toBeTruthy();
  });
});
