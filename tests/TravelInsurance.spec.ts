import { test } from '@playwright/test';
import { HomePage } from '../pages/HometravelPage';
import { TravelDetailsPage } from '../pages/TravelDetailsPage';
import { QuotePage } from '../pages/QuotePage';
import { readTravelData } from '../utils/readCSV';
import { TravelData } from '../utils/types';

const testData1: TravelData[] = readTravelData('traveldata.csv');

test('Travel Insurance Flow', async ({ browser }) => {
  // ✅ Create a new context with notification permission granted
  const context = await browser.newContext({
    permissions: ['notifications'],
  });

  const page = await context.newPage();

  const home = new HomePage(page);
  await home.navigate();
  const popup = await home.openTravelInsurancePopup();

  const travelDetails = new TravelDetailsPage(popup);
  const quote = new QuotePage(popup);
  const data: TravelData = testData1[0];

  await travelDetails.fillTravelDetails(data);
  await quote.fillPersonalDetails(data);
  await quote.extractPlans();
});