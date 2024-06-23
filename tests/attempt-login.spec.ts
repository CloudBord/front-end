import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.getByRole('button', { name: 'Login' }).click();
});

test('attempt to login with incorrect password', async ({ page }) => {
  await page.getByLabel('Username or email').click();
  await page.getByLabel('Username or email').fill('test');
  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill('incorrect');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.locator('#input-error')).toContainText('Invalid username or password.');
});

test('attempt to login with incorrect username', async ({ page }) => {
  await page.getByLabel('Username or email').click();
  await page.getByLabel('Username or email').fill('incorrect');
  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill('test');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.locator('#input-error')).toContainText('Invalid username or password.');
});

test('attempt to login without username and password', async ({ page }) => {
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.locator('#input-error')).toContainText('Invalid username or password.');
});

test('attempt to login without password', async ({ page }) => {
  await page.getByLabel('Username or email').click();
  await page.getByLabel('Username or email').fill('test');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.locator('#input-error')).toContainText('Invalid username or password.');
});

test('attempt to login without username', async ({ page }) => {
  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill('test');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.locator('#input-error')).toContainText('Invalid username or password.');
});