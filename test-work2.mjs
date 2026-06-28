import { chromium } from 'playwright';

const executablePath = '/Users/gaiadigregorio/Library/Caches/ms-playwright/chromium-1223/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const browser = await chromium.launch({ headless: true, executablePath });
const page = await browser.newPage();
await page.setViewportSize({ width: 1280, height: 800 });

await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);

const scratchpad = '/private/tmp/claude-501/-Users-gaiadigregorio-pf25/a5b2d8f9-c2c7-43d5-9a79-f57314741022/scratchpad';

const scroll = async () => {
  await page.mouse.move(640, 400);
  await page.mouse.wheel(0, 400);
  await page.waitForTimeout(1500); // wait for settle
};

// Capture each slide
for (let i = 0; i < 7; i++) {
  const title = await page.locator('h1,h2').first().textContent().catch(() => '?');
  const workTitle = await page.locator('h2').first().textContent().catch(() => '');
  console.log(`Slide ${i}: h1/h2 = "${title?.trim()}"`);
  await page.screenshot({ path: `${scratchpad}/full-slide-${i}.png` });
  await scroll();
}

await browser.close();
console.log('Done');
