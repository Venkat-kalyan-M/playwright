// @ts-check
import { test, expect } from '@playwright/test';
import { log } from 'node:console';

test('has title', async ({ page }) => {
  await page.goto('https://sitpilot-wesco.crm.dynamics.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Sign in to your account/);
});

test('Sign In', async ({ page }) => {
  await page.goto('https://uat-wesco.crm.dynamics.com/');
  log("navigated to Url");

  await page.locator('xpath=//input[@name="loginfmt"]').fill("USD9Test@wescodist.com");
  await page.locator('xpath=//input[@type="submit"]').click();
  log("entered username and clicked on next");
  await expect(page.locator('xpath=//div[text()="Enter password"]')).toBeVisible();
  

  await page.locator('xpath=//input[@name="passwd"]').fill("W3sc0@usd@new");
  await page.locator('xpath=//input[@value="Sign in"]').click();
  log("entered password and clicked on Signin");
  await expect(page).toHaveTitle(/Apps - Dynamics 365/, {timeout: 30000});

  const cpqTile = page.locator('xpath=//a[@title="Configure Price Quote (CPQ)"]');

  await expect(cpqTile).toBeVisible({ timeout: 20000 });
  await cpqTile.click();
  await expect(page).toHaveTitle(/Configure Price Quote(CPQ) - Dynamics 365/, {timeout: 30000});


  // // Click the get started link.
  // await page.getByRole('link', { name: 'Get started' }).click();

  // // Expects page to have a heading with the name of Installation.
  // await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
