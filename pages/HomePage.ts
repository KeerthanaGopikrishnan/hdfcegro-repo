import { Page } from '@playwright/test'; 

import { BasePage } from './BasePage'; 

export class HomePage extends BasePage { 

constructor(page: Page) { 

super(page); 

} 

async navigate() { 
await this.navigateTo('https://www.hdfcergo.com/'); 

} 

async clickPetInsurance(): Promise<Page> { 

const popupPromise = this.page.waitForEvent('popup'); 

await this.click(`role=link[name="cat Pet Insurance"]`); 

return await popupPromise; 
 } 

} 