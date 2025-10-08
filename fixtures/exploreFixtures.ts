import { test as base } from '@playwright/test';
import { ExploreMenuPage } from '../pages/ExploreMenuPage';

type ExploreFixtures = {
  explorePage: ExploreMenuPage;
  healthInsuranceItems: string[];
};

export const test = base.extend<ExploreFixtures>({
  explorePage: async ({ page }, use) => {
    const explorePage = new ExploreMenuPage(page);
    await explorePage.navigateToSite();
    await explorePage.openExploreMenu();
    await explorePage.waitForDropdownVisible();
    await use(explorePage);
  },

  healthInsuranceItems: async ({ explorePage }, use) => {
    const items: string[] = await explorePage.extractHealthInsuranceSubmenu();
    await use(items);
  }
});

export { expect } from '@playwright/test';