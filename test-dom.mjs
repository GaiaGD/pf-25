import { chromium } from 'playwright';

const executablePath = '/Users/gaiadigregorio/Library/Caches/ms-playwright/chromium-1223/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const browser = await chromium.launch({ headless: true, executablePath });
const page = await browser.newPage();
await page.setViewportSize({ width: 1280, height: 800 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);

const info = await page.evaluate(() => {
  const container = document.querySelector('[class*="container"]');
  const slides = container ? container.children : [];
  return {
    slideCount: slides.length,
    slideHeights: Array.from(slides).map(s => ({
      h: s.getBoundingClientRect().height,
      innerText: s.querySelector('h1,h2')?.textContent?.substring(0, 30) || s.querySelector('[class*="title"]')?.textContent?.substring(0, 30) || '?',
    })),
    emblaTransform: container?.style.transform
  };
});

console.log(JSON.stringify(info, null, 2));
await browser.close();
