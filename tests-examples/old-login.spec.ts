import { test, expect, type Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
});

test.describe('Login as User', () => {
    test('should allow me to login', async({ page }) => {
        await page.getByRole("button", { name: "Login" }).click();

        await expect(page).toHaveURL(/localhost:7290/);

        await expect(page.locator('h1')).toContainText('Sign in to your account');

        await page.locator('#username').fill('test');
        await page.locator('#password').fill('test');
        await page.getByRole("button", { name: "Sign In" }).click();

        await expect(page).toHaveURL('http://localhost:3000');

        await expect(page.locator('button')).toContainText('Logout');
    });
});