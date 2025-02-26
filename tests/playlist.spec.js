import { test, expect } from '@playwright/test';

test.describe('Check core features functionality', () => {
  const baseURL = 'https://vite-react-alpha-lemon.vercel.app/';

  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
  });

  test('Search tracks by name', async ({ page }) => {
    const searchField = page.getByRole('textbox', { name: 'Search' });
    const trackList = page.locator('#tracklist');
    await expect(trackList).toBeVisible();

    const trackItems = trackList.locator('div').nth(0);
    const visibleTracks = [];

    await searchField.fill('autumn');

    const allTracks = await trackItems.count();
    for (let i = 0; i < allTracks; i++) {
      const track = trackItems.nth(i);
      if (await track.isVisible()) {
        visibleTracks.push(track);
      }
    }

    await expect(visibleTracks).toHaveLength(1);
    await expect(visibleTracks[0]).toContainText('Autumn Leaves03:00+');
  });

  test('Add track using "+" button', async ({ page }) => {
    const playlist = page.locator('#playlist');
    await expect(playlist.locator('div').nth(1)).toHaveCount(0);

    const addFirstTrackButton = page.locator('div')
        .filter({ hasText: /^Summer Breeze03:35\+$/ })
        .getByRole('button');

    await addFirstTrackButton.click();

    const playlistItems = playlist.locator('div').nth(1);

    await expect(playlistItems).toHaveCount(1);
    await expect(playlistItems.first()).toContainText('Summer Breeze03:35-');
  });

  test('Verify total duration of the playlist', async ({ page }) => {
    const addFirstTrackButton = page.locator('div')
        .filter({ hasText: /^Summer Breeze03:35\+$/ })
        .getByRole('button');
    await addFirstTrackButton.click();

    const addSecondTrackButton = page.locator('div')
        .filter({ hasText: /^Autumn Leaves03:00\+$/ })
        .getByRole('button');
    await addSecondTrackButton.click();

    const expectedDurationSeconds = (3 * 60 + 35) + (3 * 60);
    const displayedDurationSeconds = await page.locator('#playlist-duration').textContent();

    await expect(+displayedDurationSeconds).toBe(expectedDurationSeconds);
  });
});
