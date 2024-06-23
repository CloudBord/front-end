import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByLabel('Username or email').click();
    await page.getByLabel('Username or email').fill('test');
    await page.getByLabel('Password', { exact: true }).click();
    await page.getByLabel('Password', { exact: true }).fill('test');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'My Boards' }).click();
});

test('go to boards and create new board', async ({ page }) => {
    await expect(page.getByText('No whiteboard? Click the')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Create New Whiteboard' })).toBeVisible();
    await page.getByRole('button', { name: 'Create New Whiteboard' }).click();
    await expect(page.getByRole('heading', { name: 'Create new whiteboard' })).toBeVisible();
    await page.getByPlaceholder('Whiteboard').click();
    await page.getByPlaceholder('Whiteboard').fill('My Whiteboard');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('My WhiteboardOpen')).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^My WhiteboardOpen WhiteboardDelete Whiteboard$/ }).getByRole('button')).toBeVisible();
});

test('go to boards and create and delete new board', async ({ page }) => {
    await expect(page.getByText('No whiteboard? Click the')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Create New Whiteboard' })).toBeVisible();
    await page.getByRole('button', { name: 'Create New Whiteboard' }).click();
    await expect(page.getByRole('heading', { name: 'Create new whiteboard' })).toBeVisible();
    await page.getByPlaceholder('Whiteboard').click();
    await page.getByPlaceholder('Whiteboard').fill('Whiteboard To Delete');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Whiteboard To DeleteOpen')).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^Whiteboard To DeleteOpen WhiteboardDelete Whiteboard$/ }).getByRole('button')).toBeVisible();
    await page.locator('div').filter({ hasText: /^Whiteboard To DeleteOpen WhiteboardDelete Whiteboard$/ }).getByRole('button').click();
});

test('go to boards and attempt to create board with no title', async ({ page }) => {
  await expect(page.getByText('No whiteboard? Click the')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Create New Whiteboard' })).toBeVisible();
  await page.getByRole('button', { name: 'Create New Whiteboard' }).click();
  await expect(page.getByRole('heading', { name: 'Create new whiteboard' })).toBeVisible();
  await page.getByPlaceholder('Whiteboard').click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Whiteboard Title')).toBeVisible();
  await expect(page.getByText('Username must be at least 2 characters.')).toBeVisible();
});