import { test, expect } from '@playwright/test';

const routes: { url: string; label: string }[] = [
  { url: '/', label: 'Index page' },
  {
    url: '/posts/Make-your-own-custom-URI-scheme-resolver',
    label: 'Post page',
  },
];

test.describe(`Visual snapshots`, () => {
  routes.forEach((route) => {
    test(`${route.label}`, async ({ page, request }, testInfo) => {
      for (const colorScheme of ['light', 'dark'] as const) {
        await page.emulateMedia({ colorScheme });
        await page.goto(route.url);

        expect(
          await page.screenshot({ fullPage: true, animations: 'disabled' }),
        ).toMatchSnapshot(`${route.label}-${colorScheme}-mode.png`);
      }

      if (testInfo.project.name === 'chromium') {
        const ogImage = await page
          .locator('meta[property="og:image"]')
          .getAttribute('content');
        expect(ogImage).not.toBeFalsy();

        const normalizedUrl = ogImage!
          .replace('http://127.0.0.1:3000/', '/')
          .replace('https://kaihao.dev/', '/');
        const response = await request.get(normalizedUrl);
        const image = await response.body();

        expect(image).toMatchSnapshot(`${route.label}-OG-image.png`);
      }
    });
  });
});
