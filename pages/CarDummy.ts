import { Page } from '@playwright/test';
import locators from '../Locators/locators.json';
import * as fs from 'fs';

export class CarDummy {
  constructor(private page: Page) {}

  async fillDummyDetails(popup: Page) {
    const raw = fs.readFileSync('data/car_dummy_data.csv', 'utf8');
    const [_, row] = raw.trim().split('\n');
    const [name, mobile, city] = row.split(',');

    await popup.getByRole("textbox", { name: locators.carDummy.nameTextboxLabel }).fill(name);
    await popup.getByRole("textbox", { name: locators.carDummy.mobileTextboxLabel }).fill(mobile);
    await popup.locator(locators.carDummy.cityDropdown).getByRole('combobox').selectOption({ label: city });
    await popup.locator(locators.carDummy.cityDropdown).getByRole("button", { name: locators.carDummy.quoteButtonLabel }).click();
  }

  async getErrorMessage(popup: Page) {
    const errorLocator = popup.locator(locators.carDummy.errorMessage);
    await errorLocator.waitFor({ state: 'visible', timeout: 50000 });
    const errorText = await errorLocator.textContent();
    await errorLocator.screenshot({ path: 'error-element.png' });
    await popup.screenshot({ path: 'popup-page.png' });
    return errorText?.trim();
  }
}
