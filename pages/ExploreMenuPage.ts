import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage'; 
import locators from '../locators/locators.json';

export class ExploreMenuPage extends BasePage {
  readonly exploreMenu: Locator;
  readonly dropdown: Locator;

  constructor(page: Page) {
    super(page); 
    this.exploreMenu = this.page.locator(locators.HealthInsurance.exploreMenu);
    this.dropdown = this.page.locator(locators.HealthInsurance.dropdown).first(); 
  }

  async navigateToSite(): Promise<void> {
    await this.page.setViewportSize({ width: 1920, height: 1080 });
    await this.navigateTo(locators.HealthInsurance.Url); 

  
    if (this.page.context().browser()?.browserType().name() === 'webkit') {
      await this.page.evaluate(() => {
        document.body.style.zoom = '80%';
      });
    }
  }


  async openExploreMenu(): Promise<void> {
    try {
      // Ensure the Explore menu is visible and interactive
      await expect(this.exploreMenu).toBeVisible({ timeout: 10000 });
      await expect(this.exploreMenu).toBeEnabled();

      // Explicit wait for selector to appear
      await this.page.waitForSelector(locators.HealthInsurance.exploreMenu, {
        state: 'visible',
        timeout: 10000
      });

      // Scroll into view and hover to trigger dropdown
      await this.exploreMenu.scrollIntoViewIfNeeded();
      await this.exploreMenu.hover({ timeout: 60000 });
    } catch (error) {
      console.warn('Explore menu hover failed, falling back to JS dispatch...');

      // Fallback: simulate hover using JavaScript
      await this.page.evaluate(() => {
        // Find the Explore menu element using a CSS selector
        const el = document.querySelector("a[title='Explore']");
        if (el) {
          // Dispatch a synthetic mouseover event
          el.dispatchEvent(new MouseEvent('mouseover', {
            bubbles: true 
          }));
        }
      });
    }
  }

  async waitForDropdownVisible(): Promise<void> {
    await this.dropdown.waitFor({ state: 'visible', timeout: 50000 });
  }

  
  async extractHealthInsuranceSubmenu(): Promise<string[]> {
    const sectionLocator = this.dropdown.locator(locators.HealthInsurance.healthInsuranceSection, {
      has: this.page.getByRole('link', { name: locators.HealthInsurance.healthInsuranceLinkText })
    });

    const submenuItemsLocator = sectionLocator.locator(locators.HealthInsurance.submenuItem);
    const count = await submenuItemsLocator.count();
    const items: string[] = [];

    // Loop through each item and collect trimmed text
    for (let i = 0; i < count; i++) {
      const itemText = await submenuItemsLocator.nth(i).textContent();
      if (itemText) {
        items.push(itemText.trim());
      }
    }

    return items;
  }

  
}
