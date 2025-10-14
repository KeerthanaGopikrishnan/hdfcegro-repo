import { test, expect } from '../fixtures/page-fixtures'; 

import { readTestData } from '../utils/readCSV'; 

import { PetData } from '../utils/types'; 

const testData: PetData[] = readTestData('testdata2.csv'); 

test('Pet Insurance Flow', async ({ pages }) => { 

const data: PetData = testData[0]; 

// Navigate to home 

 await pages.petHome.navigate(); 

// Handle first popup 
 const petInsurancePopup = await pages.petHome.clickPetInsurance(); 

const petInsurance = pages.createPetInsurancePage(petInsurancePopup); 

// Handle second popup 

const petDetailsPopup = await petInsurance.clickBuyNow(); 

const petDetails = pages.createPetDetailsPage(petDetailsPopup); 

// Fill details 

await petDetails.fillPetDetailsFromData(data); 
 await petDetails.fillLocationAndQuoteFromData(data); 

await petDetails.answerQuestionsAndScreenshot(); 

}); 
 