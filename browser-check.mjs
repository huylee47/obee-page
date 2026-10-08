import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
import { chromium } from '@playwright/test';

const base = process.env.OBEE_PREVIEW_URL || 'http://127.0.0.1:4173';
const executablePath = process.env.OBEE_CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const browser = await chromium.launch({ executablePath, headless: true });
mkdirSync('test-results', { recursive: true });
const errors = [];
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
page.on('pageerror', error => errors.push(error.message));
page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
async function ready(target = page) {
  await target.evaluate(async () => { await document.fonts.ready; document.documentElement.style.scrollBehavior = 'auto'; });
  await target.waitForTimeout(1200);
}
async function noOverflow(target = page) {
  assert(await target.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'Horizontal overflow');
}
try {
  for (const prefix of ['', '/en']) {
    for (const slug of ['', 'privacy-policy', 'support', 'terms']) {
      const path = `${prefix}/${slug ? slug + '/' : ''}`;
      const response = await page.goto(base + path);
      assert.equal(response.status(), 200, path);
      assert.equal(await page.locator('html').getAttribute('lang'), prefix ? 'en' : 'vi');
      for (const legal of ['privacy-policy', 'support', 'terms']) {
        assert.equal(await page.locator(`.desktop-nav a[href="${prefix}/${legal}/"]`).count(), 1);
      }
      const viPath = `/${slug ? slug + '/' : ''}`;
      assert.equal(await page.locator('.locale-switch a[lang="vi"]').getAttribute('href'), viPath);
      assert.equal(await page.locator('.locale-switch a[lang="en"]').getAttribute('href'), '/en' + viPath);
      await noOverflow();
      console.log(`${path}: route, language and navigation OK`);
    }
  }
  await page.goto(base + '/support/');
  await page.locator('.locale-switch a[lang="en"]').click();
  await page.waitForURL('**/en/support/');
  await page.locator('.locale-switch a[lang="vi"]').click();
  await page.waitForURL('**/support/');

  // Locale changes must update real content without a new browser document.
  for (const slug of ['', 'privacy-policy', 'support', 'terms']) {
    const vi = `/${slug ? slug + '/' : ''}`;
    const en = '/en' + vi;
    await page.goto(base + vi);
    await ready();
    const marker = `locale-${slug}-${Date.now()}`;
    await page.evaluate(value => { window.__localeDocument = value; }, marker);
    const viHeading = await page.locator('main h1').textContent();
    const requests = [];
    const record = request => { if (request.resourceType() === 'document') requests.push(request.url()); };
    page.on('request', record);
    try {
      await page.locator('.locale-switch a[lang="en"]').click();
      await page.waitForURL(base + en);
      await page.waitForFunction(() => document.documentElement.lang === 'en');
      await page.waitForFunction(() => document.querySelector('.locale-switch').getAttribute('aria-busy') === 'false');
      assert.equal(await page.evaluate(() => window.__localeDocument), marker, 'EN switch reloaded the document');
      assert.notEqual(await page.locator('main h1').textContent(), viHeading, 'Main content was not translated');
      assert.equal(await page.locator('.desktop-nav a[href="/en/privacy-policy/"]').textContent(), 'Privacy Policy');
      assert.equal(await page.locator('.skip-link').textContent(), 'Skip to content');
      const enTitle = await page.title();
      await page.goBack();
      await page.waitForURL(base + vi);
      await page.waitForFunction(() => document.documentElement.lang === 'vi');
      assert.equal(await page.locator('main h1').textContent(), viHeading);
      assert.equal(await page.evaluate(() => window.__localeDocument), marker);
      assert.notEqual(await page.title(), enTitle);
      await page.goForward();
      await page.waitForURL(base + en);
      await page.waitForFunction(() => document.documentElement.lang === 'en');
      await page.locator('.locale-switch a[lang="vi"]').click();
      await page.waitForURL(base + vi);
      await page.waitForFunction(() => document.documentElement.lang === 'vi');
      await page.waitForFunction(() => document.querySelector('.locale-switch').getAttribute('aria-busy') === 'false');
      assert.equal(await page.evaluate(() => window.__localeDocument), marker, 'VI switch reloaded the document');
      assert.deepEqual(requests, [], 'Locale switching requested a new HTML document');
      console.log(`${vi}: in-place translations, metadata and history OK`);
    } finally {
      page.off('request', record);
    }
  }
  await page.goto(base + '/support/?source=locale-test#dang-nhap');
  await ready();
  const previousScroll = await page.evaluate(() => scrollY);
  const previousSectionTop = await page.locator('#dang-nhap').evaluate(node => node.getBoundingClientRect().top);
  const switchBox = await page.locator('.locale-switch').boundingBox();
  const enBox = await page.locator('.locale-switch a[lang="en"]').boundingBox();
  assert(switchBox && enBox, 'Language switch should remain visible while reading');
  // Click the visible sticky control as a user would. Locator.click may call
  // scrollIntoView on the sticky header and change scroll before our handler.
  await page.mouse.click(enBox.x + enBox.width / 2, enBox.y + enBox.height / 2);
  await page.waitForURL(base + '/en/support/?source=locale-test#dang-nhap');
  await page.waitForFunction(() => document.querySelector('.locale-switch').getAttribute('aria-busy') === 'false');
  assert.equal(await page.evaluate(() => location.search), '?source=locale-test');
  assert.equal(await page.evaluate(() => location.hash), '#dang-nhap');
  const scrollState = await page.evaluate(() => ({ y: scrollY, max: document.documentElement.scrollHeight - innerHeight, section: document.querySelector('#dang-nhap').getBoundingClientRect().top }));
  assert(Math.abs(scrollState.section - previousSectionTop) < 8, `Locale lost reading position: before=${previousSectionTop}, after=${scrollState.section}`);
  assert(scrollState.y > 0 && previousScroll > 0, 'Locale switch reset scroll to the top');

  // Older browsers get a CSS fade, without relying on View Transitions.
  await page.evaluate(() => { document.startViewTransition = undefined; });
  await page.locator('.locale-switch a[lang="vi"]').click();
  await page.waitForURL(base + '/support/?source=locale-test#dang-nhap');
  await page.waitForFunction(() => document.documentElement.lang === 'vi' && document.querySelector('.locale-switch').getAttribute('aria-busy') === 'false');
  assert.equal(await page.evaluate(() => document.documentElement.dataset.localeFading), undefined);

  await page.goto(base + '/');
  await ready();
  assert(await page.locator('.hero-media img').evaluate(img => img.complete && img.naturalWidth > 0));
  assert.equal(await page.locator('.workflow-stack.is-stacked').count(), 1);
  await page.screenshot({ path: 'test-results/parallax-hero-desktop.png' });
  await page.locator('#tinh-nang').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  await page.screenshot({ path: 'test-results/parallax-features.png' });
  const pinStart = await page.locator('.workflow-inner').evaluate(node => node.getBoundingClientRect().top + scrollY - 130);
  await page.evaluate(y => scrollTo(0, y), pinStart + 700);
  await page.waitForTimeout(1000);
  assert.equal(await page.locator('.pin-spacer').count(), 1);
  await page.screenshot({ path: 'test-results/parallax-workflow.png' });
  await noOverflow();
  await page.locator('.closing-section').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  await page.screenshot({ path: 'test-results/parallax-closing.png' });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(500);
  assert.equal(await page.locator('.workflow-stack.is-stacked').count(), 0, 'Pinning should revert on resize');
  assert.equal(await page.locator('.pin-spacer').count(), 0);
  const heroLines = await page.locator('.hero h1').evaluate(node => node.getBoundingClientRect().height / parseFloat(getComputedStyle(node).lineHeight));
  assert(heroLines <= 3.05, `Mobile hero has ${heroLines} lines`);
  await noOverflow();
  await page.screenshot({ path: 'test-results/parallax-hero-mobile.png' });
  await page.locator('.mobile-menu summary').click();
  assert.equal(await page.locator('.mobile-menu[open]').count(), 1);
  await page.screenshot({ path: 'test-results/parallax-mobile-menu.png' });
  await page.locator('.mobile-menu a[href="/terms/"]').click();
  await page.waitForURL('**/terms/');
  await noOverflow();

  for (const width of [320, 768, 1024]) {
    await page.setViewportSize({ width, height: 800 });
    await page.goto(base + '/');
    await ready();
    await noOverflow();
    const lines = await page.locator('.hero h1').evaluate(node => node.getBoundingClientRect().height / parseFloat(getComputedStyle(node).lineHeight));
    assert(lines <= 3.05, `Hero at ${width}px has ${lines} lines`);
  }
  await page.setViewportSize({ width: 1440, height: 620 });
  await page.waitForTimeout(300);
  assert.equal(await page.locator('.pin-spacer').count(), 0, 'Short laptop viewport should not pin');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(300);
  assert.equal(await page.locator('.pin-spacer').count(), 1);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForTimeout(300);
  assert.equal(await page.locator('.pin-spacer').count(), 0, 'Live preference change should remove pinning');

  const reduced = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const staticPage = await reduced.newPage();
  staticPage.on('pageerror', error => errors.push(error.message));
  await staticPage.goto(base + '/en/');
  await ready(staticPage);
  assert.equal(await staticPage.locator('.pin-spacer').count(), 0);
  assert.equal(await staticPage.locator('.workflow-card').count(), 4);
  assert.equal(await staticPage.locator('.hero-image-depth').evaluate(node => getComputedStyle(node).transform), 'none');
  assert.equal(await staticPage.locator('.capability-track').evaluate(node => getComputedStyle(node).animationName), 'none');
  await noOverflow(staticPage);
  await staticPage.screenshot({ path: 'test-results/parallax-reduced-motion.png' });
  await staticPage.evaluate(() => { window.__localeDocument = 'reduced-motion'; });
  await staticPage.locator('.locale-switch a[lang="vi"]').click();
  await staticPage.waitForFunction(() => document.documentElement.lang === 'vi');
  assert.equal(await staticPage.evaluate(() => window.__localeDocument), 'reduced-motion');
  assert.equal(await staticPage.locator('.pin-spacer').count(), 0);

  const noJs = await browser.newContext({ javaScriptEnabled: false });
  const fallbackPage = await noJs.newPage();
  await fallbackPage.goto(base + '/en/privacy-policy/');
  assert.equal(await fallbackPage.locator('html').getAttribute('lang'), 'en');
  assert.equal(await fallbackPage.locator('main h1').textContent(), 'Privacy Policy');
  await fallbackPage.locator('.locale-switch a[lang="vi"]').click();
  await fallbackPage.waitForURL('**/privacy-policy/');
  assert.equal(await fallbackPage.locator('html').getAttribute('lang'), 'vi');
  assert.deepEqual(errors, [], 'Browser errors or missing assets');
  console.log('Locale switching, desktop pinning, mobile resize/menu and reduced motion: OK');
} finally {
  await browser.close();
}
