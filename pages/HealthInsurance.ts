import { Page } from '@playwright/test';

export class InsurancePlan {
  constructor(private page: Page) {}

  async extractPlans(popup: Page): Promise<{ name: string; premium: number; sumInsured: string }[]> {
    await popup.getByRole('link', { name: 'view quote', exact: true }).click();
    await popup.waitForTimeout(5000);

    const planElements = await popup.locator('li.plan-details').all();
    const plans: { name: string; premium: number; sumInsured: string }[] = [];

    for (const planEl of planElements) {
      try {
        const name = await planEl.locator('h2.plan-name').innerText();
        const premiumText = await planEl.locator('span.text-amount').innerText();
        const sumInsured = await planEl.getAttribute('plan-suminsured') || 'N/A';

        const premiumMatch = premiumText.match(/\d+/);
        const premium = premiumMatch ? parseInt(premiumMatch[0], 10) : Number.MAX_VALUE;

        plans.push({ name, premium, sumInsured });
      } catch (error) {
        console.warn('Failed to extract plan details:', error);
      }
    }

    return plans;
  }

  async sortPlansByPremium(plans: { name: string; premium: number; sumInsured: string }[]): Promise<{ name: string; premium: number; sumInsured: string }[]> {
    return plans.sort((a, b) => a.premium - b.premium).slice(0, 3);
  }
}