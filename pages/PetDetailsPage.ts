import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { PetData } from '../utils/types';
import locators from '../locators/locators.json';

export class PetDetailsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async fillPetDetailsFromData(data: PetData) {
    await this.page.getByText(locators.PetDetailsPage.petTypeLabel).click();
    await this.page.getByRole('option', { name: data.petType }).click();
    await this.page.getByText(locators.PetDetailsPage.enterPetDetails).click();
    await this.page.getByLabel('', { exact: true }).click();
    await this.page.locator('div').filter({ hasText: new RegExp(`^${data.breed}$`) }).first().click();
    await this.page.locator(locators.PetDetailsPage.ageDropdown).selectOption(data.age);
    await this.page.getByRole('button', { name: locators.PetDetailsPage.nextButton }).click();
  }

  async fillLocationAndQuoteFromData(data: PetData) {
    await this.page.getByRole('textbox', { name: locators.PetDetailsPage.pincodeField }).fill(data.pincode);
    await this.page.getByText('123401').click(),{timeout:80000};
    await this.page.getByRole('button', { name: locators.PetDetailsPage.getQuoteButton }).click();
  }

  async answerQuestionsAndScreenshot() {
    // Wait for 'SKIP FOR NOW' button to be visible before clicking
    await this.page.waitForSelector('text=SKIP FOR NOW', { state: 'visible', timeout: 10000 });
    await this.page.getByText('SKIP FOR NOW').click();

    await this.page.getByText('Yes').first().click();
    await this.page.getByText('No').nth(3).click();
    await this.page.getByAltText(locators.PetDetailsPage.nextIconAlt).click();

    await this.page.screenshot({ path: 'page.png' });
  }
}