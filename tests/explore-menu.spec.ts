import { test, expect } from '../fixtures/page-fixtures';

test.describe('Explore Menu Page Tests', () => {
  test('should open Explore menu and display dropdown', async ({ explorePage }) => {
    const isVisible = await explorePage.dropdown.isVisible();
    expect(isVisible).toBe(true);
  });

  test('should extract Health Insurance submenu items', async ({ healthInsuranceItems }) => {
    expect(healthInsuranceItems.length).toBeGreaterThan(0);
    for (const item of healthInsuranceItems) {
      expect(item).toMatch(/\w+/);
    }
    console.log('Extracted submenu items:', healthInsuranceItems);
  });
  
});
