import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import locators from '../locators/locators.json';
import * as fs from 'fs';

export class CarDummy extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async fillDummyDetails(popup: Page) {
    const raw = fs.readFileSync('data/car_dummy_data.csv', 'utf8');
    const [_, row] = raw.trim().split('\n');
    const [name, mobile, city] = row.split(',');

    await this.typeTextbox(popup, locators.carDummy.nameTextboxLabel, name);
    await this.typeTextbox(popup, locators.carDummy.mobileTextboxLabel, mobile);
    await this.selectCity(popup, city);
    await this.clickButton(popup, locators.carDummy.quoteButtonLabel);
  }

  async getErrorMessage(popup: Page) {
    const errorLocator = popup.locator(locators.carDummy.errorMessage);
    await errorLocator.waitFor({ state: 'visible', timeout: 5000 });
    const errorText = await errorLocator.textContent();
    await errorLocator.screenshot({ path: 'error-element.png' });
    await popup.screenshot({ path: 'popup-page.png' });
    return errorText?.trim();
  }

  private async typeTextbox(popup: Page, label: string, value: string) {
    await popup.getByRole('textbox', { name: label }).fill(value);
  }

  private async selectCity(popup: Page, city: string) {
    await popup.locator(locators.carDummy.cityDropdown).getByRole('combobox').selectOption({ label: city });
  }

  private async clickButton(popup: Page, label: string) {
    await popup.locator(locators.carDummy.cityDropdown).getByRole('button', { name: label }).click();
  }
}

