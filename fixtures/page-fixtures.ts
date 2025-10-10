import { test as baseTest, expect, Page } from '@playwright/test';
import { CarInsurance } from '../pages/CarInsurancePage';
import { CarDummy } from '../pages/CarPage';
import { ExploreMenuPage } from '../pages/ExploreMenuPage';

// Page fixture combining CarInsurance and CarDummy
export class PageFixture {
  carInsurance: CarInsurance;
  carDummy: CarDummy;

  constructor(page: Page) {
    this.carInsurance = new CarInsurance(page);
    this.carDummy = new CarDummy(page);
  }
}

// Fixture types
type CombinedFixtures = {
  pages: PageFixture;
  explorePage: ExploreMenuPage;
  healthInsuranceItems: string[];
};

// Unified fixture
export const test = baseTest.extend<CombinedFixtures>({
  pages: async ({ page }, use) => {
    await use(new PageFixture(page));
  },

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

export { expect };

