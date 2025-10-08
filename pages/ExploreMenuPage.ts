// import { Page, Locator } from '@playwright/test';
// import locators from '../Locators/locators.json'; // adjust path as needed

// export class ExploreMenuPage {
//   readonly page: Page;
//   readonly exploreMenu: Locator;
//   readonly dropdown: Locator;

//   constructor(page: Page) {
//     this.page = page;
//     this.exploreMenu = page.locator(locators.HealthInsurance.exploreMenu);
//     this.dropdown = page.locator(locators.HealthInsurance.dropdown).first();
//   }

//   async navigateToSite(): Promise<void> {
//     await this.page.goto('https://www.hdfcergo.com', {
//       waitUntil: 'domcontentloaded',
//       timeout: 60000
//     });
//   }

//   async openExploreMenu(): Promise<void> {
//     try {
//       // Wait for the element to be visible before interacting
//       await this.exploreMenu.waitFor({ state: 'visible', timeout: 100000 });
//       await this.exploreMenu.scrollIntoViewIfNeeded();
//       await this.exploreMenu.hover();
//     } catch (error) {
//       console.warn('Explore menu not interactable via Playwright hover. Falling back to JS dispatch.');
//       await this.page.evaluate(() => {
//         const el = document.querySelector("a[title='Explore']");
//         if (el) {
//           el.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
//         }
//       });
//     }

//     await this.page.waitForTimeout(1500); // Allow dropdown to appear
//   }

//   async waitForDropdownVisible(): Promise<void> {
//     await this.dropdown.waitFor({ state: 'visible', timeout: 10000 });
//   }

//   async extractHealthInsuranceSubmenu(): Promise<string[]> {
//     const sectionLocator = this.dropdown.locator(locators.HealthInsurance.healthInsuranceSection, {
//       has: this.page.getByRole('link', { name: locators.HealthInsurance.healthInsuranceLinkText })
//     });

//     const submenuItemsLocator = sectionLocator.locator(locators.HealthInsurance.submenuItem);
//     const count = await submenuItemsLocator.count();
//     const items: string[] = [];

//     for (let i = 0; i < count; i++) {
//       const itemText = await submenuItemsLocator.nth(i).textContent();
//       if (itemText) {
//         items.push(itemText.trim());
//       }
//     }

//     return items;
//   }
// }


import { expect } from '@playwright/test';

async openExploreMenu(): Promise<void> {
  const exploreMenuLocator = this.exploreMenu;

  try {
    // 1. Ensure element is visible and enabled
    await expect(exploreMenuLocator).toBeVisible({ timeout: 10000 });
    await expect(exploreMenuLocator).toBeEnabled();

    // 2. Explicit wait for selector
    await this.page.waitForSelector(locators.HealthInsurance.exploreMenu, { state: 'visible', timeout: 10000 });

    // 3. Add short timeout for rendering/animation
    await this.page.waitForTimeout(1000);

    // 4. Click or hover with timeout
    await exploreMenuLocator.hover({ timeout: 60000 });
  } catch (error) {
    console.warn('Explore menu hover failed, falling back to JS dispatch...');
    await this.page.evaluate(() => {
      const el = document.querySelector("a[title='Explore']");
      if (el) {
        el.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
      }
    });
  }

  await this.page.waitForTimeout(1500); // Allow dropdown to appear
}