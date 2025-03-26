import { createBdd } from "playwright-bdd";
const { Given, When, Then } = createBdd();
const { expect } = require('@playwright/test');
const { POManager } = require('../PageObject/POManager');

let classPage;


//Scenario 
When('Admin clicks on the edit icon', async function({})  {
  classPage = await this.pageManager.getClassPage();
  await this.page.waitForTimeout(1000);
  classPage.clickEditIcon();
   
  });
  
Then('A new pop up with class details appears', async function({})  {
  await this.page.waitForTimeout(1000);
  expect(await classPage.isEditPopUpDisplayed()).toBeTruthy();
  
});

//Scenario 
Then('Admin should see batch name field is disabled', async function({})  {
  const isBatchNameDisable = await classPage.isBatchNameDrpdwnDisabled();
  expect(isBatchNameDisable).toBeTruthy();
  
});

//Scenario 
Then('Admin should see class topic field is disabled', async function({})  {
  const isClassTopicDisable = await classPage.isClassTopicDisabled();
  expect(isClassTopicDisable).toBeTruthy();
  
});

//Scenario 
Given('Admin is on the Edit Class Popup window', async function({}) {
  classPage = await this.pageManager.getClassPage();
  await classPage.validatePageClass();
  await this.page.waitForTimeout(1000);
  await classPage.clickEditIcon();
  
  expect(await classPage.isEditPopUpDisplayed()).toBeTruthy();
});

When('Update the fields with valid {string} data from excel {string}  and click save', async function({}, KeyOption, SheetName)  {
  await classPage.validEditClass(KeyOption,SheetName);
});

Then('Admin gets message {string} and see the updated values in data table', async function({}, expectedSuccessMsg)  {
  const actualSuccessMessage = await classPage.validateCreateSuccessMessage();
  console.log("actualSuccessMessage------"+actualSuccessMessage);
  expect(await actualSuccessMessage).toContain(expectedSuccessMsg);
  
});

//Scenario 
When('Update the mandatory fields with valid {string} data from excel "Class"and click save', async function({}, arg) {
  
});

//Scenario 
When('Update the optional fields with valid {string} data from excel {string} and click save', async function({}, KeyOption, SheetName)  {
  await classPage.optionalTextFieldsValidDataEdit(KeyOption,SheetName);
});

Then('Admin gets message {string}  and see {string} and {string} the updated values in data table', async function({}, expectedSuccessMsg, KeyOption, SheetName)  {
  const actualSuccessMessage = await classPage.validateCreateSuccessMessage();
  console.log("actualSuccessMessage------"+actualSuccessMessage);
  expect(await actualSuccessMessage).toContain(expectedSuccessMsg);

  await classPage.editAssertion(KeyOption,SheetName);
});

//Scenario 
When('Admin enters only numbers or special char in the text fields for {string} data from excel {string}', async function({}, KeyOption, SheetName)  {
   await classPage.optionalTextFieldsEdit(KeyOption,SheetName);
});

// 2. Missing step definition for "tests\Features\005_Class\004_EditNewClass.feature:44:1"
Then('Admin should get Error message', async function({})  {
  const errorMessageText = await classPage.validateErrorMessage();
  console.log(errorMessageText);
  expect(errorMessageText.some(text => text.includes("is required"))).toBe(true); 
  
});

//Scenario 
When('Admin clicks Cancel button on edit popup', async function({})  {
  await classPage.clickOnCancelBtn();
  
});

// 2. Missing step definition for "tests\Features\005_Class\004_EditNewClass.feature:44:1"
Then('Admin can see the class details popup disappears and can see nothing changed for particular Class', async function({})  {
  const isPopupDisappear = await classPage.disappearsClassDetailsForm();
  expect(isPopupDisappear).toBeTruthy();

});