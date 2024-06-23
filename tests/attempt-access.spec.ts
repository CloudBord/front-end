import { test, expect } from '@playwright/test';

test('navigate to /boards url and ask user to log in', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.goto('http://localhost:3000/boards');
  await expect(page.getByRole('main')).toContainText('Log in to view boards!');
});

test('navigate to /boards url and login', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.goto('http://localhost:3000/boards');
  await expect(page.getByRole('main')).toContainText('Log in to view boards!');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByLabel('Username or email').click();
  await page.getByLabel('Username or email').fill('test');
  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill('test');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByText('No whiteboard? Click the button to create one!Create New Whiteboard')).toBeVisible();
});