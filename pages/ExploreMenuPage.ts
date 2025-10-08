import { Page, Locator } from '@playwright/test';
import locators from '../locators/locators.json'; // adjust path as needed

export class ExploreMenuPage {
  readonly page: Page;
  readonly exploreMenu: Locator;
  readonly dropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.exploreMenu = page.locator(locators.HealthInsurance.exploreMenu);
    this.dropdown = page.locator(locators.HealthInsurance.dropdown).first();
  }

  async navigateToSite(): Promise<void> {
    await this.page.goto('https://www.hdfcergo.com', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
  }

  async openExploreMenu(): Promise<void> {
    await this.exploreMenu.scrollIntoViewIfNeeded();
    try {
      await this.exploreMenu.hover();
    } catch {
      await this.page.evaluate(() => {
        const el = document.querySelector("a[title='Explore']");
        if (el) {
          el.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
        }
      });
    }
    await this.page.waitForTimeout(1500);
  }

  async waitForDropdownVisible(): Promise<void> {
    await this.dropdown.waitFor({ state: 'visible', timeout: 10000 });
  }

  async extractHealthInsuranceSubmenu(): Promise<string[]> {
    const sectionLocator = this.dropdown.locator(locators.HealthInsurance.healthInsuranceSection, {
      has: this.page.getByRole('link', { name: locators.HealthInsurance.healthInsuranceLinkText })
    });

    const submenuItemsLocator = sectionLocator.locator(locators.HealthInsurance.submenuItem);
    const count = await submenuItemsLocator.count();
    const items: string[] = [];

    for (let i = 0; i < count; i++) {
      const itemText = await submenuItemsLocator.nth(i).textContent();
      if (itemText) {
        items.push(itemText.trim());
      }
    }

    return items;
  }
}




























































































// import { Page } from '@playwright/test';

// export class InsurancePlan {
//   constructor(private page: Page) {}

//   async extractPlans(popup: Page) {
//     await popup.getByRole('link', { name: 'view quote', exact: true }).click();
//     await popup.waitForTimeout(5000);

//     const planElements = await popup.locator('li.plan-details').all();
//     const plans: { name: string; premium: number; sumInsured: string }[] = [];

//     for (const planEl of planElements) {
//       const name = await planEl.locator('h2.plan-name').innerText();
//       const premiumText = await planEl.locator('span.text-amount').innerText();
//       const sumInsured = await planEl.getAttribute('plan-suminsured') || 'N/A';

//       const premiumMatch = premiumText.match(/\d+/);
//       const premium = premiumMatch ? parseInt(premiumMatch[0], 10) : Number.MAX_VALUE;

//       plans.push({ name, premium, sumInsured });
//     }

//     return plans;
//   }

//   async sortPlansByPremium(plans: { name: string; premium: number; sumInsured: string }[]) {
//     return plans.sort((a, b) => a.premium - b.premium).slice(0, 3);
//   }
// }
