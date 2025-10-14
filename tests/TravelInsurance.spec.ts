import { test } from '../fixtures/page-fixtures';
import { readTravelData } from '../utils/readCSV';
import { TravelData } from '../utils/types';
 
const testData: TravelData[] = readTravelData('traveldata.csv');
 
test('Travel Insurance Flow', async ({ pages }) => {
  const data: TravelData = testData[0];
 
  // Navigate to home
  await pages.homeTravel.navigate();
 
  // Open Travel Insurance popup
  const popup = await pages.homeTravel.openTravelInsurancePopup();
 
  // Create page objects for popup
  const travelDetails = pages.createTravelDetailsPage(popup);
  const quote = pages.createQuotePage(popup);
 
  // Fill details
  await travelDetails.fillTravelDetails(data);
  await quote.fillPersonalDetails(data);
  await quote.extractPlans();
});
 