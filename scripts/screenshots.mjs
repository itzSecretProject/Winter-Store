import { chromium } from "playwright-core";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const shotsDir = join(root, "screenshots");
const target = process.env.URL ?? "http://localhost:5173/";

const settle = async (page, ms = 1600) => {
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(ms);
};

async function main() {
  await mkdir(shotsDir, { recursive: true });

  const browser = await chromium.launch({
    channel: "chrome",
    args: ["--enable-unsafe-swiftshader", "--hide-scrollbars"],
  });

  const desktop = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    locale: "en-US",
  });
  const page = await desktop.newPage();

  await page.goto(target, { waitUntil: "domcontentloaded" });
  await settle(page);
  await page.screenshot({ path: join(shotsDir, "01-hero.png") });

  await page.screenshot({ path: join(shotsDir, "02-overview.png"), fullPage: true });

  await page.locator(".grid-row").scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  for (const nth of [0, 2]) {
    const card = page.locator(".grid-row .card").nth(nth);
    await card.hover();
    await card.locator(".card-add").click();
    await page.keyboard.press("Escape");
    await page.waitForTimeout(250);
  }

  await page.evaluate(() => window.scrollTo({ top: 0 }));
  await page.waitForTimeout(500);
  await page.locator(".buy-meta").click();
  await page.waitForTimeout(700);
  await page.screenshot({ path: join(shotsDir, "03-cart.png") });

  await desktop.close();

  const phone = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    locale: "es-ES",
  });
  const mobile = await phone.newPage();
  await mobile.goto(target, { waitUntil: "domcontentloaded" });
  await settle(mobile);
  await mobile.screenshot({ path: join(shotsDir, "04-mobile.png") });

  await mobile.locator(".buy-meta").click();
  await mobile.waitForTimeout(700);
  await mobile.screenshot({ path: join(shotsDir, "05-mobile-cart.png") });

  await phone.close();
  await browser.close();
  console.log("screenshots saved to", shotsDir);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
