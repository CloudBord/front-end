import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000');
});

test('login and go to main page', async ({ page }) => {
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByLabel('Username or email').click();
  await page.getByLabel('Username or email').fill('test');
  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill('test');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.goto('http://localhost:3000/');
  await expect(page.getByRole('button')).toContainText('Logout');
});

test('login and go to /boards', async ({ page }) => {
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByLabel('Username or email').click();
  await page.getByLabel('Username or email').press('Shift+ArrowLeft');
  await page.getByLabel('Username or email').fill('test');
  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill('test');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'My Boards' }).click();
  await expect(page.getByRole('main')).toContainText('No whiteboard? Click the button to create one!');
});

test('login and logout', async ({ page }) => {
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByLabel('Username or email').click();
  await page.getByLabel('Username or email').fill('test');
  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill('test');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.waitForURL('http://localhost:3000')
  await expect(page.getByRole('button')).toContainText('Logout');
  await expect(page.getByRole('list')).toContainText('My Boards');
  await page.getByRole('button', { name: 'Logout' }).click();
  await page.waitForURL('http://localhost:3000')
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});