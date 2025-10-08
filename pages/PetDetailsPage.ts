// import { Page } from '@playwright/test';
// import { BasePage } from './BasePage';

// import { PetData } from '../utils/types';
// import locators from '../Locators/locators.json';



// export class PetDetailsPage extends BasePage {
//   async fillPetDetailsFromData(data: PetData) {
//     await this.page.getByText(locators.PetDetailsPage.petTypeLabel).click();
//     await this.page.getByRole('option', { name: data.petType }).click();
//     await this.page.getByText(locators.PetDetailsPage.enterPetDetails).click();
//     await this.page.getByLabel('', { exact: true }).click();
//     await this.page.locator('div').filter({ hasText: new RegExp(`^${data.breed}$`) }).first().click();
//     await this.page.locator(locators.PetDetailsPage.ageDropdown).selectOption(data.age);
//     await this.page.getByRole('button', { name: locators.PetDetailsPage.nextButton }).click();
//   }

//   async fillLocationAndQuoteFromData(data: PetData) {
//     await this.page.getByRole('textbox', { name: locators.PetDetailsPage.pincodeField }).fill(data.pincode);
//     await this.page.getByText('123401').click({ timeout: 60000 });
//     await this.page.getByRole('button', { name: locators.PetDetailsPage.getQuoteButton }).click();
//   }

//   async answerQuestionsAndScreenshot() {
//     await this.page.getByText(locators.PetDetailsPage.skipButton).click();
//     await this.page.getByText('Yes').first().click();
//     await this.page.getByText('No').nth(3).click();
//     await this.page.getByAltText(locators.PetDetailsPage.nextIconAlt).click();
//     await this.page.screenshot({ path: 'page.png' });
//   }
// }

import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { PetData } from '../utils/types';
import locators from '../Locators/locators.json';

export class PetDetailsPage extends BasePage {
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

    const pincodeOption = this.page.getByText('123401');

    // Strategy 1: Wait for the element to be visible and enabled
    await expect(pincodeOption).toBeVisible({ timeout: 10000 });
    await expect(pincodeOption).toBeEnabled();

    // Strategy 2: Wait for selector explicitly
    await this.page.waitForSelector('text=123401', { state: 'visible', timeout: 10000 });

    // Strategy 3: Add a short wait for dropdown animation or rendering
    await this.page.waitForTimeout(1000);

    // Strategy 4: Click with timeout
    await pincodeOption.click({ timeout: 60000 });

    await this.page.getByRole('button', { name: locators.PetDetailsPage.getQuoteButton }).click();
  }

  async answerQuestionsAndScreenshot() {
    await this.page.getByText(locators.PetDetailsPage.skipButton).click();
    await this.page.getByText('Yes').first().click();
    await this.page.getByText('No').nth(3).click();
    await this.page.getByAltText(locators.PetDetailsPage.nextIconAlt).click();
    await this.page.screenshot({ path: 'page.png' });
  }
}