import { chromium } from 'playwright';
import fs from 'node:fs';

const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/chromium', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1024, height: 1536 }, deviceScaleFactor: 1 });
const errors = [];
page.on('console', (msg) => { if (msg.type() === 'error') errors.push(`console: ${msg.text()}`); });
page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`));
await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });

const tests = [];
async function run(name, fn) {
  try { await fn(); tests.push({ name, passed: true }); }
  catch (error) { tests.push({ name, passed: false, error: error.message }); }
}

await run('Dashboard renders', async () => {
  await page.getByRole('heading', { name: /Hello, John/i }).waitFor();
  await page.getByText('Health Summary', { exact: true }).waitFor();
});
await run('Fluid log updates dashboard', async () => {
  await page.getByRole('button', { name: 'Add Fluid Intake' }).click();
  await page.getByRole('button', { name: 'Add to Log' }).click();
  await page.getByText('1440 ml', { exact: true }).first().waitFor();
});
await run('Medication completion updates state', async () => {
  await page.locator('.sidebar .nav-item').filter({ hasText: 'Medications' }).click();
  await page.getByRole('button', { name: 'Mark taken' }).first().click();
  await page.getByText('Medication status updated.').waitFor();
});
await run('Message can be sent', async () => {
  await page.locator('.sidebar .nav-item').filter({ hasText: 'Messages' }).click();
  await page.getByRole('textbox', { name: 'Message' }).fill('Thank you. I will follow the phosphorus plan.');
  await page.getByRole('button', { name: 'Send message' }).click();
  await page.getByText('Thank you. I will follow the phosphorus plan.').waitFor();
});

const routes = [
  ['home','Home'], ['health','My Health'], ['treatments','Treatments'], ['medications','Medications'],
  ['diet','Diet & Nutrition'], ['fluid','Fluid Tracker'], ['appointments','Appointments'], ['labs','Lab Results'],
  ['education','Education'], ['messages','Messages'], ['support','Support'], ['settings','Settings'],
];
for (const [id, label] of routes) {
  await run(`Route ${label} renders without page overflow`, async () => {
    await page.locator('.sidebar .nav-item').filter({ hasText: label }).click();
    await page.waitForFunction((route) => document.querySelector('.page-content')?.dataset.page === route, id);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    if (overflow) throw new Error(`Horizontal page overflow on ${label}`);
  });
}

await page.reload({ waitUntil: 'networkidle' });
await page.mouse.move(500, 20);
await page.screenshot({ path: '/mnt/data/KidneyInsightsTool/prototype-1024x1536.png' });
await page.screenshot({ path: '/mnt/data/KidneyInsightsTool/prototype-fullpage.png', fullPage: true });

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
mobile.on('console', (msg) => { if (msg.type() === 'error') errors.push(`mobile console: ${msg.text()}`); });
mobile.on('pageerror', (err) => errors.push(`mobile pageerror: ${err.message}`));
await mobile.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
await mobile.screenshot({ path: '/mnt/data/KidneyInsightsTool/prototype-mobile-390x844.png' });
await run('Mobile drawer navigation works', async () => {
  await mobile.getByRole('button', { name: 'Open navigation' }).click();
  await mobile.locator('.sidebar .nav-item').filter({ hasText: 'Lab Results' }).click();
  await mobile.waitForFunction(() => document.querySelector('.page-content')?.dataset.page === 'labs');
});
await run('Mobile viewport has no horizontal overflow', async () => {
  const overflow = await mobile.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  if (overflow) throw new Error('Horizontal overflow detected');
});

const result = { timestamp: new Date().toISOString(), viewport: '1024x1536 + 390x844', tests, consoleErrors: errors };
fs.writeFileSync('/mnt/data/KidneyInsightsTool/verification.json', JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
await browser.close();
