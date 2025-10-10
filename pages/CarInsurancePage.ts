import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import locators from '../locators/locators.json';

export class CarInsurance extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateHome() {
    await this.navigateTo(locators.carInsurance.homeUrl);
  }

  async selectCarDetails() {
    const popupPromise = this.page.waitForEvent('popup');
    await this.page.locator(locators.carInsurance.filtersTab)
      .getByRole('link', { name: locators.carInsurance.carInsuranceLinkLabel })
      .click();
    return await popupPromise;
  }
}
