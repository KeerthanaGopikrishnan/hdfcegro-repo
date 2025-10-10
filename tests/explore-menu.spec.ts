import { test, expect } from '../fixtures/page-fixtures';

test('Print submenu items under Health Insurance Health', async ({
  healthInsuranceItems
}: {
  healthInsuranceItems: string[];
}) => {
  console.log(' Submenu items under "Health Insurance Health":\n');

  healthInsuranceItems.forEach((item: string, index: number) => {
    console.log(`   ${index + 1}. ${item}`);
  });

  expect(healthInsuranceItems.length).toBeGreaterThan(0);
});