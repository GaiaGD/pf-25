import { chromium } from 'playwright';

const executablePath = '/Users/gaiadigregorio/Library/Caches/ms-playwright/chromium-1223/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const browser = await chromium.launch({ headless: true, executablePath });
const page = await browser.newPage();
await page.setViewportSize({ width: 1280, height: 800 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);

const info = await page.evaluate(() => {
  // Get all divs that are direct children of the embla container
  const allDivs = document.querySelectorAll('div > div > div');
  const containers = Array.from(allDivs).filter(d => d.children.length > 2);
  const result = containers.map(c => ({
    children: c.children.length,
    class: c.className.substring(0, 50),
    firstChildClass: c.children[0]?.className.substring(0, 50)
  }));
  
  // Also count all slide-like elements
  const slideDivs = document.querySelectorAll('[class*="slide"]');
  return {
    possibleContainers: result.slice(0, 5),
    slideDivCount: slideDivs.length,
    slideTexts: Array.from(slideDivs).slice(0, 10).map(s => s.className.substring(0,30) + ' | ' + (s.querySelector('h1,h2')?.textContent?.substring(0,20) || ''))
  };
});

console.log(JSON.stringify(info, null, 2));
await browser.close();
