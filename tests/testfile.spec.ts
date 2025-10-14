import { test } from '../fixtures/page-fixtures';
 
test('Car Insurance: Dummy details and error message', async ({ pages }) => {
  await pages.carInsurance.navigateHome();
  const popup = await pages.carInsurance.selectCarDetails();
  await pages.carDummy.fillDummyDetails(popup);
  const errorMessage = await pages.carDummy.getErrorMessage(popup);
  console.log('Error Message:', errorMessage);
});