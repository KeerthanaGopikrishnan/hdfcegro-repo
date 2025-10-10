import { BasePage } from './BasePage';
import locators from '../locators/locators.json';
import { TravelData } from '../utils/types';

export class TravelDetailsPage extends BasePage {
  async fillTravelDetails(data: TravelData) {
    // Select traveller type
    await this.page.locator(locators.TravelDetailsPage.travellerTypeLabel).nth(1).click();

    // Click BUY NOW
    await this.page.getByText(locators.TravelDetailsPage.buyNowButton).first().click();
    await this.page.waitForTimeout(5000);

    // Click Select Traveller
    await this.page.getByText(locators.TravelDetailsPage.selectTravellerText).click();
    await this.page.waitForTimeout(5000);

    // Fill Age
    await this.page.locator(locators.TravelDetailsPage.ageInput).fill(data.age);

    // Click Continue
    await this.page.getByRole('button', {
      name: locators.TravelDetailsPage.continueButton
    }).click();

    // Fill Country
    const countryInput = this.page.getByRole('textbox', {
      name: locators.TravelDetailsPage.countryInput
    });
    await countryInput.fill(data.country);

    // Wait for dropdown to populate and click country option
    await this.page.waitForTimeout(3000);
    await this.page.getByRole('treeitem', {
      name: locators.TravelDetailsPage.countryOption
    }).click();

    // Fill Departure Date
    await this.page.locator(locators.TravelDetailsPage.departureDate).click();
    await this.page.getByRole('textbox', {
      name: locators.TravelDetailsPage.dateInput
    }).fill(data.departureDate);
    await this.page.keyboard.press('Enter');

    // Fill Return Date
    await this.page.locator(locators.TravelDetailsPage.returnDate).click();
    await this.page.getByRole('textbox', {
      name: locators.TravelDetailsPage.dateInput
    }).fill(data.returnDate);
    await this.page.keyboard.press('Enter');

    // Click View Quote
    // await this.page.getByRole('link', {
    //   name: locators.TravelDetailsPage.viewQuoteLink,
    //   exact: true
    // }).click();
    //     await this.page.waitForTimeout(3000);

  }
}