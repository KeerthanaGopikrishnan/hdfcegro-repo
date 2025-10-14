import { BasePage } from './BasePage';
import locators from '../locators/locators.json';
import { TravelData } from '../utils/types';
 
export class QuotePage extends BasePage {
  async fillPersonalDetails(data: TravelData) {
    await this.page.getByRole('textbox', { name: locators.QuotePage.nameField }).fill(data.name);
    await this.page.getByRole('textbox', { name: locators.QuotePage.emailField }).fill(data.email);
    await this.page.getByRole('spinbutton', { name: locators.QuotePage.mobileField }).fill(data.mobile);
    await this.page.getByRole('link', { name: locators.TravelDetailsPage.viewQuoteLink, exact: true }).click();
    await this.page.waitForTimeout(0); // Optional: allow quote page to load
  }
 
  async extractPlans() {
    // Wait for plan list to be visible
    await this.page.waitForSelector(locators.QuotePage.planList, { state: 'visible', timeout: 10000 });
 
    const planElements = await this.page.locator(locators.QuotePage.planList).all();
 
    const plans = await Promise.all(planElements.map(async (planEl, index) => {
      try {
        const name = await planEl.locator(locators.QuotePage.planName).innerText();
        const premiumText = await planEl.locator(locators.QuotePage.premiumText).innerText();
        const sumInsured = await planEl.getAttribute('plan-suminsured') || 'N/A';
        const premium = parseInt(premiumText.replace(/\D/g, ''), 10) || 0;
        return { name, premium, sumInsured };
      } catch (err) {
        console.error(`Error parsing plan ${index}:`, err);
        return null;
      }
    }));
 
    const validPlans = plans.filter(p => p !== null);
    const sortedPlans = validPlans.sort((a, b) => a.premium - b.premium).slice(0, 3);
 
    console.log('\n3 Lowest International Travel Insurance Plans:\n');
    sortedPlans.forEach((plan, i) => {
      console.log(`${i + 1}. ${plan.name} — ₹${plan.premium} — Coverage: ${plan.sumInsured}`);
    });
  }
}
 