import { chromium } from 'playwright';

const executablePath = '/Users/gaiadigregorio/Library/Caches/ms-playwright/chromium-1223/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const browser = await chromium.launch({ headless: true, executablePath });
const page = await browser.newPage();
await page.setViewportSize({ width: 1280, height: 800 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);
await page.click('body');

const s = '/private/tmp/claude-501/-Users-gaiadigregorio-pf25/a5b2d8f9-c2c7-43d5-9a79-f57314741022/scratchpad';

for (let i = 0; i < 7; i++) {
  await page.screenshot({ path: `${s}/slide${i}.png` });
  await page.keyboard.press('ArrowDown');
  await page.waitForTimeout(1400);
}
await browser.close();
console.log('Done');
