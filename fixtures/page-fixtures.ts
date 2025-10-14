// 


// Surabhi

import { test as baseTest, expect, Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { PetInsurancePage } from '../pages/PetInsurancePage';
import { PetDetailsPage } from '../pages/PetDetailsPage';
import { CarInsurance } from '../pages/CarInsurancePage';
import { CarDummy } from '../pages/CarPage';
import { ExploreMenuPage } from '../pages/ExploreMenuPage';
import { HomeTravelPage } from '../pages/HometravelPage'; // ✅ Corrected import
import { TravelDetailsPage } from '../pages/TravelDetailsPage';
import { QuotePage } from '../pages/QuotePage';

class PageFixture {
  homePage: HomePage;
  carInsurance: CarInsurance;
  carDummy: CarDummy;
  petHome: HomePage;
  petInsurance: PetInsurancePage;
  petDetails: PetDetailsPage;
  homeTravel: HomeTravelPage;
  travelDetails: TravelDetailsPage;
  quotePage: QuotePage;

  constructor(private page: Page) {
    this.homePage = new HomePage(page);
    this.carInsurance = new CarInsurance(page);
    this.carDummy = new CarDummy(page);
    this.petHome = new HomePage(page);
    this.petInsurance = new PetInsurancePage(page);
    this.petDetails = new PetDetailsPage(page);
    this.homeTravel = new HomeTravelPage(page); // ✅ Corrected usage
    this.travelDetails = new TravelDetailsPage(page);
    this.quotePage = new QuotePage(page);
  }

  createPetInsurancePage(popup: Page) {
    return new PetInsurancePage(popup);
  }

  createPetDetailsPage(popup: Page) {
    return new PetDetailsPage(popup);
  }

  createTravelDetailsPage(popup: Page) {
    return new TravelDetailsPage(popup);
  }

  createQuotePage(popup: Page) {
    return new QuotePage(popup);
  }
}

type CombinedFixtures = {
  pages: PageFixture;
  explorePage: ExploreMenuPage;
  healthInsuranceItems: string[];
};

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
