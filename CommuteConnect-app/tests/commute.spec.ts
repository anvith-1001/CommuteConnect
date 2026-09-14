import { test, expect, Page } from '@playwright/test';

async function layouts(page: Page, name: string) {
  const viewports = [
    { name: 'android-small', width: 360, height: 800 },
    { name: 'iphone', width: 375, height: 812 },
    { name: 'iphone-large', width: 390, height: 844 },
    { name: 'android-large', width: 412, height: 915 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1280, height: 900 },
  ];

  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      `${name} overflows at ${viewport.name}`,
    ).toBe(true);
    expect(
      await page.evaluate(() => {
        const root = document.scrollingElement;

        return !!root && root.scrollHeight <= root.clientHeight;
      }),
      `${name} scrolls the browser page at ${viewport.name}`,
    ).toBe(true);
    const mainLayout = await page.locator('main').evaluate((main) => ({
      fits: main.scrollWidth <= main.clientWidth,
      clientWidth: main.clientWidth,
      scrollWidth: main.scrollWidth,
      offenders: Array.from(main.querySelectorAll<HTMLElement>('*'))
        .filter(
          (element) =>
            element.getBoundingClientRect().right >
            main.getBoundingClientRect().right + 1,
        )
        .slice(0, 5)
        .map((element) => `${element.tagName.toLowerCase()}.${element.className}`),
    }));

    expect(
      mainLayout.fits,
      `${name} content overflows at ${viewport.name}: ${JSON.stringify(mainLayout)}`,
    ).toBe(true);

    if (viewport.width <= 760) {
      const formControlFontSizes = await page
        .locator('input:visible, textarea:visible, select:visible')
        .evaluateAll((controls) =>
          controls.map((control) =>
            Number.parseFloat(getComputedStyle(control).fontSize),
          ),
        );

      expect(
        formControlFontSizes.every((fontSize) => fontSize >= 16),
        `${name} contains a form control that can trigger iOS zoom at ${viewport.name}`,
      ).toBe(true);
    }

    await page.screenshot({
      path: `test-results/${name}-${viewport.name}.png`,
      fullPage: true,
    });
  }
}

async function register(page: Page, name: string, email: string) {
  await page.goto('/register');
  await page.getByLabel('Full name', { exact: true }).fill(name);
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByLabel('Email', { exact: true }).fill(email);
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill('a-long-browser-passphrase');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByLabel('Date of birth', { exact: true }).fill('1995-06-15');
  await page.getByLabel('Date of birth', { exact: true }).press('Tab');
  await expect(page.locator('.flatpickr-calendar.open')).toBeHidden();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('combobox', { name: 'Sex', exact: true }).click();
  await page.getByRole('option', { name: 'Prefer not to say', exact: true }).click();
  await page.getByRole('button', { name: 'Create account', exact: true }).click();
  await expect(
    page.getByRole('heading', {
      name: `Welcome, ${name.split(' ')[0]}.`,
      exact: true,
    }),
  ).toBeVisible();
  expect(
    await page.locator('main').evaluate((main) => getComputedStyle(main).overflowY),
    'home content region should not scroll',
  ).toBe('hidden');
}

test('driver and passenger journey; responsive layouts and no console errors', async ({
  browser,
}) => {
  test.setTimeout(180_000);

  const driverContext = await browser.newContext();
  const passengerContext = await browser.newContext();
  const driver = await driverContext.newPage();
  const passenger = await passengerContext.newPage();
  const errors: string[] = [];

  for (const page of [driver, passenger]) {
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => {
      if (
        m.type() === 'error' &&
        !m.text().includes('RefererNotAllowedMapError')
      ) {
        errors.push(m.text());
      }
    });
  }

  await driver.goto('/register');
  await expect(
    driver.getByRole('heading', { name: 'What should we call you?' }),
  ).toBeVisible();
  await driver.getByRole('button', { name: 'Continue', exact: true }).click();
  await expect(driver.getByText('Please enter full name.')).toBeVisible();
  await layouts(driver, 'registration');
  await register(driver, 'Driver Alex', 'driver@example.test');
  await expect(driver.getByRole('heading', { name: 'Welcome, Driver.' })).toBeVisible();
  await driver.getByRole('link', { name: 'Offer a commute', exact: true }).click();
  await driver.getByLabel('Origin', { exact: true }).fill('Indiranagar');
  await driver.getByRole('button', { name: 'Continue', exact: true }).click();
  await driver.getByLabel('Destination', { exact: true }).fill('Whitefield');
  await driver.getByRole('button', { name: 'Continue', exact: true }).click();
  await driver.getByRole('button', { name: 'Continue', exact: true }).click();
  await driver.setViewportSize({ width: 375, height: 600 });
  await driver.getByRole('button', { name: 'Pin on map', exact: true }).click();
  await expect(driver.getByRole('button', { name: 'Done', exact: true })).toBeVisible();
  await expect(driver.locator('.map-status')).toBeHidden({ timeout: 10000 });
  const mapDialogLayout = await driver.locator('.map-dialog').evaluate((dialog) => ({
    clientHeight: dialog.clientHeight,
    scrollHeight: dialog.scrollHeight,
    viewportHeight: window.innerHeight,
  }));
  expect(mapDialogLayout.clientHeight).toBeLessThanOrEqual(
    mapDialogLayout.viewportHeight,
  );
  expect(mapDialogLayout.scrollHeight).toBeGreaterThanOrEqual(
    mapDialogLayout.clientHeight,
  );
  await driver.screenshot({ path: 'test-results/map-iphone-short.png' });
  const map = driver.locator('.gm-style, .leaflet-container').first();
  const mapBox = await map.boundingBox();

  if (!mapBox) {
    throw new Error('Map canvas did not render.');
  }

  await map.click({ position: { x: mapBox.width * 0.35, y: mapBox.height * 0.5 } });
  await driver.getByRole('button', { name: 'Done', exact: true }).scrollIntoViewIfNeeded();
  await driver.getByRole('button', { name: 'Done', exact: true }).click();
  await driver.setViewportSize({ width: 1280, height: 900 });
  await driver.getByRole('button', { name: 'Continue', exact: true }).click();
  await driver.getByLabel('Departure date and time', { exact: true }).click();
  await expect(driver.locator('.flatpickr-calendar.open')).toBeVisible();
  const calendarSize = await driver
    .locator('.flatpickr-calendar.open')
    .evaluate((item) => ({
      width: item.getBoundingClientRect().width,
      scrollWidth: item.scrollWidth,
    }));
  expect(calendarSize.width).toBeLessThanOrEqual(340);
  expect(calendarSize.scrollWidth).toBeLessThanOrEqual(340);
  await driver.keyboard.press('Escape');
  const tomorrow = new Date(Date.now() + 86400000);
  const local = new Date(tomorrow.getTime() - tomorrow.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
  await driver.getByLabel('Departure date and time', { exact: true }).fill(local);
  await driver.getByRole('button', { name: 'Continue', exact: true }).click();
  await driver.getByLabel('Vehicle number', { exact: true }).fill('KA01AB1234');
  await driver.getByRole('button', { name: 'Continue', exact: true }).click();
  await driver.getByLabel('Passenger seats', { exact: true }).fill('3');
  await driver.getByRole('button', { name: 'Continue', exact: true }).click();
  await driver
    .getByLabel('Notes (optional)', { exact: true })
    .fill('Meet at the metro station.');
  await layouts(driver, 'editor');
  await driver.getByRole('button', { name: 'Post commute', exact: true }).click();
  await expect(
    driver.getByRole('heading', { name: 'Indiranagar → Whitefield' }),
  ).toBeVisible();
  await expect(driver.getByText('KA01AB1234', { exact: true })).toBeVisible();
  const detailUrl = driver.url();
  const postId = detailUrl.split('/').pop()!;
  await layouts(driver, 'owner-detail');
  await register(passenger, 'Passenger Sam', 'passenger@example.test');
  await passenger.getByLabel('From', { exact: true }).fill('indira');
  await passenger.getByRole('button', { name: 'Search', exact: true }).click();
  await expect(passenger.getByRole('link', { name: 'View commute' })).toBeVisible();
  await layouts(passenger, 'browse');
  await passenger.getByRole('link', { name: 'View commute' }).click();
  await expect(passenger.getByText('KA01AB1234', { exact: true })).toHaveCount(0);
  await passenger.getByRole('button', { name: 'I’m interested', exact: true }).click();
  await expect(
    passenger.getByRole('button', { name: 'Withdraw interest', exact: true }),
  ).toBeVisible();
  await driver.reload();
  await expect(driver.getByText('Passenger Sam', { exact: true })).toBeVisible();
  await driver.getByRole('button', { name: 'Accept', exact: true }).click();
  await expect(
    driver.getByText('Passenger accepted. A seat has been reserved.'),
  ).toBeVisible();
  await passenger.reload();
  await expect(passenger.getByText('KA01AB1234', { exact: true })).toBeVisible();
  await passenger.setViewportSize({ width: 375, height: 812 });
  await passenger.getByRole('button', { name: 'View ride code' }).click();
  await expect(passenger.getByRole('dialog', { name: 'Your pickup code' })).toBeVisible();
  await passenger.screenshot({ path: 'test-results/ride-code-iphone.png' });
  await passenger.getByRole('button', { name: 'Close ride code' }).click();
  await driver.setViewportSize({ width: 375, height: 812 });
  await driver.getByRole('button', { name: 'Start ride', exact: true }).click();
  await expect(driver.getByRole('dialog', { name: 'Verify Passenger Sam' })).toBeVisible();
  await driver.screenshot({ path: 'test-results/otp-iphone.png' });
  await driver.getByRole('button', { name: 'Close OTP verification' }).click();
  const acceptedInterestId = await passenger.evaluate(async (id) => {
    const session = await (await fetch('/api/auth/refresh', { method: 'POST' })).json();
    const response = await fetch(`/api/posts/${id}`, {
      headers: { Authorization: `Bearer ${session.accessToken}` },
    });
    const post = await response.json();

    return post.myInterest.id as string;
  }, postId);
  const observerContext = await browser.newContext();
  const observer = await observerContext.newPage();
  await register(observer, 'Observer Jo', 'observer@example.test');
  await observer.getByLabel('From', { exact: true }).fill('Indiranagar');
  await observer.getByRole('button', { name: 'Search', exact: true }).click();
  await expect(observer.getByRole('link', { name: 'View commute' })).toBeVisible();
  await observer.getByRole('link', { name: 'View commute' }).click();
  await expect(observer.getByText('KA01AB1234', { exact: true })).toHaveCount(0);
  expect(await observer.evaluate(() => sessionStorage.length)).toBe(0);
  expect(
    await observer.evaluate(async (interestId) => {
      const session = await (await fetch('/api/auth/refresh', { method: 'POST' })).json();

      return (
        await fetch(`/api/interests/${interestId}/messages`, {
          headers: { Authorization: `Bearer ${session.accessToken}` },
        })
      ).status;
    }, acceptedInterestId),
  ).toBe(403);
  await observerContext.close();
  await passenger.getByRole('button', { name: 'Chat with Driver Alex' }).click();
  await passenger.screenshot({ path: 'test-results/passenger-chat-iphone.png' });
  await passenger
    .getByLabel('Message', { exact: true })
    .fill('I can meet beside the metro entrance.');
  await passenger.getByRole('button', { name: 'Send', exact: true }).click();
  await passenger.getByRole('button', { name: 'Close conversation' }).click();
  await driver.getByRole('button', { name: 'Open conversations' }).click();
  await expect(
    driver.getByText('Select a passenger to open your private conversation.'),
  ).toBeVisible();
  await driver.getByRole('button', { name: 'Passenger Sam', exact: true }).click();
  await driver.screenshot({ path: 'test-results/driver-chat-iphone.png' });
  await expect(
    driver.getByText('I can meet beside the metro entrance.', { exact: true }),
  ).toBeVisible();
  await passenger.getByRole('button', { name: 'Withdraw interest', exact: true }).click();
  await expect(passenger.getByText('Your interest has been withdrawn.')).toBeVisible();
  await passenger.getByRole('link', { name: 'My dashboard', exact: true }).click();
  await expect(
    passenger.getByRole('heading', { name: 'No upcoming commutes' }),
  ).toBeVisible();
  await passenger.getByRole('link', { name: 'Profile', exact: true }).click();
  await expect(
    passenger.getByRole('heading', { name: 'Account & privacy' }),
  ).toBeVisible();
  await passenger.getByRole('link', { name: 'View history', exact: true }).click();
  await passenger.getByRole('button', { name: 'My interests', exact: true }).click();
  await expect(passenger.getByRole('link', { name: 'View commute' })).toBeVisible();
  await layouts(passenger, 'history');
  await passenger.getByRole('link', { name: 'Profile', exact: true }).click();
  await passenger.getByRole('button', { name: 'Edit profile', exact: true }).click();
  await passenger.getByLabel('Full name', { exact: true }).fill('Passenger Samantha');
  await passenger.getByRole('button', { name: 'Save profile' }).click();
  await expect(passenger.getByText('Your profile has been updated.')).toBeVisible();
  await layouts(passenger, 'profile');
  await passenger.reload();
  await expect(
    passenger.getByRole('heading', { name: 'Account & privacy' }),
  ).toBeVisible();
  await passenger.getByRole('link', { name: 'My dashboard', exact: true }).click();
  await passenger.goBack();
  await expect(passenger.getByRole('button', { name: 'Sign out' })).toBeVisible();
  await expect(passenger).not.toHaveURL(/\/login/);
  await driver.goto(detailUrl);
  await driver.getByRole('button', { name: 'Delete commute', exact: true }).click();
  await driver.getByRole('button', { name: 'Yes, cancel commute', exact: true }).click();
  await expect(
    driver.getByText('Commute cancelled. It is now in your history.'),
  ).toBeVisible();
  await driver.getByRole('link', { name: 'Profile', exact: true }).click();
  await driver.getByRole('link', { name: 'View history', exact: true }).click();
  await expect(driver.getByText('Cancelled', { exact: true })).toBeVisible();
  await driver.getByRole('button', { name: 'Sign out', exact: true }).click();
  const signOutDialog = driver.getByRole('dialog', {
    name: 'Sign out of CommuteConnect?',
  });
  await expect(signOutDialog).toBeVisible();
  await signOutDialog.getByRole('button', { name: 'Sign out', exact: true }).click();
  await expect(driver.getByRole('heading', { name: 'Welcome back' })).toBeVisible();
  await expect(
    driver.getByRole('link', { name: 'Create an account', exact: true }),
  ).toBeVisible();
  expect(errors).toEqual([]);
  await driverContext.close();
  await passengerContext.close();
});