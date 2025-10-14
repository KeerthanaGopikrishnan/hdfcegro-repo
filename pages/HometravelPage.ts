import { BasePage } from './BasePage';
import locators from '../locators/locators.json';
 
export class HomeTravelPage extends BasePage {
  async navigate() {
    await this.page.goto('https://www.hdfcergo.com/');
  }
 
  async openTravelInsurancePopup() {
    const popupPromise = this.page.waitForEvent('popup');
    await this.page.getByRole('link', { name: locators.HometravelPage.travelInsuranceLink }).click();
    return await popupPromise;
  }
}