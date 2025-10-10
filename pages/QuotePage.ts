import { BasePage } from './BasePage';
import locators from '../locators/locators.json';
import { TravelData } from '../utils/types';

export class QuotePage extends BasePage {
  async fillPersonalDetails(data: TravelData) {
    await this.page.getByRole('textbox', { name: locators.QuotePage.nameField }).fill(data.name);
    await this.page.getByRole('textbox', { name: locators.QuotePage.emailField }).fill(data.email);
    await this.page.getByRole('spinbutton', { name: locators.QuotePage.mobileField }).fill(data.mobile);
    await this.page.getByRole('link', { name: locators.TravelDetailsPage.viewQuoteLink, exact: true }).click();
    await this.page.waitForTimeout(1000); // Allow quote page to load
  }

  async handlePopupIfPresent() {
  const browserName = this.page.context().browser()?.browserType().name();

  if (browserName === 'firefox') {
    const popupImage = this.page.locator('//html/body/div/div[2]/div/img');
    const closeButton = this.page.locator('//html/body/div/div[2]/div/div[2]');

    try {
      // Wait for the popup image to appear
      await popupImage.waitFor({ state: 'visible', timeout: 7000 });

      // Ensure the close button is visible and stable
      await closeButton.waitFor({ state: 'visible', timeout: 3000 });

      // Scroll into view and click forcefully
      await closeButton.scrollIntoViewIfNeeded();
      await closeButton.click({ force: true });

      console.log('Firefox: Popup detected and closed successfully.');
    } catch (err) {
      console.log('Firefox: Popup not detected or could not be closed.');
    }
  }
}

  async extractPlans() {
    // Handle popup only in Firefox
    await this.handlePopupIfPresent();

    // Optional screenshot for debugging
    await this.page.screenshot({ path: 'quote-page-before-planlist.png' });

    const planListLocator = this.page.locator(locators.QuotePage.planList);

    // Check if element exists before waiting for visibility
    const isPresent = await planListLocator.count();
    if (isPresent === 0) {
      console.error('Plan list element not found in DOM.');
      return;
    }

    // Try waiting for visibility
    try {
      await planListLocator.first().waitFor({ state: 'visible', timeout: 10000 });
    } catch (e) {
      console.warn('Plan list not visible within 10s, retrying after 3s...');
      await this.page.waitForTimeout(3000);
      try {
        await planListLocator.first().waitFor({ state: 'visible', timeout: 5000 });
      } catch (err) {
        console.error('Plan list still not visible. Aborting plan extraction.');
        return;
      }
    }

    const planElements = await planListLocator.all();

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