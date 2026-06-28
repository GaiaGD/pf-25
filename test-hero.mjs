import { chromium } from 'playwright';
const exe = '/Users/gaiadigregorio/Library/Caches/ms-playwright/chromium-1223/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const browser = await chromium.launch({ headless: true, executablePath: exe });
const page = await browser.newPage();
await page.setViewportSize({ width: 1280, height: 800 });
page.on('pageerror', e => console.log('[err]', e.message));
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);
await page.click('body');
const s = '/private/tmp/claude-501/-Users-gaiadigregorio-pf25/a5b2d8f9-c2c7-43d5-9a79-f57314741022/scratchpad';
// Slide 0: hero visible
await page.screenshot({ path: `${s}/hero-slide0.png` });
// Slide 1: first work covering hero
await page.keyboard.press('ArrowDown');
await page.waitForTimeout(1400);
await page.screenshot({ path: `${s}/hero-slide1.png` });
// Slide 5: misc (hero hidden)
for (let i = 0; i < 4; i++) { await page.keyboard.press('ArrowDown'); await page.waitForTimeout(1400); }
await page.screenshot({ path: `${s}/hero-slide5.png` });
await browser.close();
console.log('Done');
