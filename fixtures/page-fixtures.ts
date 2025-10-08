// import { Page } from '@playwright/test';
import { CarInsurance } from '../pages/CarInsurance';
import { CarDummy } from '../pages/CarDummy'; // ✅ Correct import path
import { test as baseTest, expect, Page } from '@playwright/test';

export class PageFixture {
  carInsurance: CarInsurance;
  carDummy: CarDummy;

  constructor(page: Page) {
    this.carInsurance = new CarInsurance(page);
    this.carDummy = new CarDummy(page); // ✅ Proper constructor usage
  }
}
type Fixtures = {
  pages: PageFixture;
};
 
export const test = baseTest.extend<Fixtures>({
  pages: async ({ page }, use) => {
    await use(new PageFixture(page));
  },
});
 
export { expect };

