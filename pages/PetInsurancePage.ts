import { BasePage } from './BasePage';  

export class PetInsurancePage extends BasePage { 

async clickBuyNow() { 

const popupPromise = this.page.waitForEvent('popup'); 

await this.page.getByRole('link', { name: 'BUY NOW', exact: true }).first().click(); 

 return await popupPromise; 

 } 

} 
 