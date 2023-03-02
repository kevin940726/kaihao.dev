import { test, expect } from '@playwright/test';

test.describe('Dark mode', async () => {
  test('toggle dark mode', async ({ page }) => {
    await page.goto('/');

    const toggleDarkMode = page.getByRole('switch', {
      name: 'Toggle dark mode',
    });

    await expect(
      toggleDarkMode,
      'Should default to light mode'
    ).toHaveAttribute('aria-checked', 'false');

    await toggleDarkMode.click();

    await expect(toggleDarkMode, 'Should switch to dark mode').toHaveAttribute(
      'aria-checked',
      'true'
    );
  });

  test('Should match prefers-color-scheme', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });

    await page.goto('/');

    const toggleDarkMode = page.getByRole('switch', {
      name: 'Toggle dark mode',
    });

    await expect(toggleDarkMode, 'Should default to dark mode').toHaveAttribute(
      'aria-checked',
      'true'
    );

    await toggleDarkMode.click();

    await expect(toggleDarkMode, 'Should switch to light mode').toHaveAttribute(
      'aria-checked',
      'false'
    );
  });

  test('Should respect user preference', async ({ page }) => {
    await page.goto('/');

    const toggleDarkMode = page.getByRole('switch', {
      name: 'Toggle dark mode',
    });

    await toggleDarkMode.click();

    await expect(toggleDarkMode, 'Should switch to dark mode').toHaveAttribute(
      'aria-checked',
      'true'
    );

    await page.reload();

    await expect(toggleDarkMode, 'Should remain dark mode').toHaveAttribute(
      'aria-checked',
      'true'
    );
  });

  test('User preference should override prefers-color-scheme', async ({
    page,
  }) => {
    await page.goto('/');

    const toggleDarkMode = page.getByRole('switch', {
      name: 'Toggle dark mode',
    });

    await expect(
      toggleDarkMode,
      'Should default to light mode'
    ).toHaveAttribute('aria-checked', 'false');

    await page.emulateMedia({ colorScheme: 'dark' });
    await expect(toggleDarkMode, 'Should switch to dark mode').toHaveAttribute(
      'aria-checked',
      'true'
    );

    await toggleDarkMode.click();
    await expect(toggleDarkMode, 'Should switch to light mode').toHaveAttribute(
      'aria-checked',
      'false'
    );

    await toggleDarkMode.click();
    await expect(toggleDarkMode, 'Should switch to dark mode').toHaveAttribute(
      'aria-checked',
      'true'
    );

    await page.emulateMedia({ colorScheme: 'light' });
    await expect(toggleDarkMode, 'Should remain dark mode').toHaveAttribute(
      'aria-checked',
      'true'
    );

    await page.reload();
    await expect(toggleDarkMode, 'Should remain dark mode').toHaveAttribute(
      'aria-checked',
      'true'
    );
  });
});
