import { chromium } from 'playwright';

const executablePath = '/Users/gaiadigregorio/Library/Caches/ms-playwright/chromium-1223/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const browser = await chromium.launch({ headless: true, executablePath });
const page = await browser.newPage();
await page.setViewportSize({ width: 1280, height: 800 });

page.on('pageerror', err => console.log('[error]', err.message));

await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);

const scratchpad = '/private/tmp/claude-501/-Users-gaiadigregorio-pf25/a5b2d8f9-c2c7-43d5-9a79-f57314741022/scratchpad';

await page.screenshot({ path: `${scratchpad}/slide-hello.png` });

await page.mouse.move(640, 400);
await page.mouse.wheel(0, 300);
await page.waitForTimeout(1000);
await page.screenshot({ path: `${scratchpad}/slide-work1.png` });

await page.mouse.wheel(0, 300);
await page.waitForTimeout(1000);
await page.screenshot({ path: `${scratchpad}/slide-work2.png` });

await browser.close();
console.log('Done');
