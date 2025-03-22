import { createBdd } from "playwright-bdd";
const {Given, When, Then} = createBdd();
const { expect } = require('@playwright/test');
const { POManager} = require('../PageObject/POManager');

let loginPage;
let homePage;
let programPage;
let reusablePage;

//001_ProgramNavigationMenuBar scenarios
  Given('Admin is logged in to LMS Portal', async ({page}) => {
    // const pageManager = new POManager(page);
    // loginPage = pageManager.getLoginPage();
    // await loginPage.goTo();
    // await  loginPage.validLogin('ValidCredential');
    console.log('Admin is logged in to LMS Portal');
  });
  
  Given('Admin is on home page after Login', async ({page}) => {
    const pageManager = new POManager(page);
    //----remove code for login after merging--------------->
    reusablePage = pageManager.getCommonUtilPage();
    await reusablePage.navigate();
    await reusablePage.login();
    console.log('Admin is on home page after Login');
  });
  
  When('Admin clicks Program on the navigation bar', async ({ page }) => {
    const pageManager = new POManager(page);
    programPage = pageManager.getProgramPage();
    await programPage.clickOnProgram();
    console.log('Admin clicked Program on the navigation bar');
  });
  
  // From: tests/Features/001_ProgramNavigationMenuBar.feature:10:9
  Then('Admin should be navigated to Program module', async ({ page }) => {
    const pageManager = new POManager(page);
    programPage = pageManager.getProgramPage();
    const actualTitle = await programPage.getActualProgramPageTitle();
    console.log("Actual Title : "+actualTitle);
    console.log("Expected Title : Manage Program");

    expect(actualTitle).toEqual('Manage Program');
    console.log('Admin is navigated to Program module');
  });
  
  // From: tests/Features/001_ProgramNavigationMenuBar.feature:15:9
  Then('Admin should see Logout in menu bar', async ({page}) => {
    const pageManager = new POManager(page);
    programPage = pageManager.getProgramPage();
    await expect(programPage.logout_btn).toBeVisible();
    console.log('Admin saw Logout in menu bar');
  });
  
  // From: tests/Features/001_ProgramNavigationMenuBar.feature:20:9
  Then('Admin should see the heading {string}', async ({page}, expectedLmsHeading) => {
    const pageManager = new POManager(page);
    programPage = pageManager.getProgramPage();
    const actualTitle = await programPage.getLMSTitle();
    await expect(actualTitle).toBe(expectedLmsHeading);
    console.log('Admin saw the heading LMS - Learning Management System');
  });
  
  // From: tests/Features/001_ProgramNavigationMenuBar.feature:25:9
  Then('Admin should see the page names as in order {string}', async ({page}, expectedOrderOfPageSelector) => {
    const pageManager = new POManager(page);
    programPage = pageManager.getProgramPage();
    const expectedOrder = expectedOrderOfPageSelector.split(' '); // Convert string parameter to array
    const actualOrder = await programPage.getActualOrderOfPageSelector();  // Get actual values as array
    expect(actualOrder).toEqual(expectedOrder);
    console.log('Admin saw the page names in expected order');
  });
  
  // From: tests/Features/001_ProgramNavigationMenuBar.feature:28:9
  Given('Admin is on program page', async ({page}) => {
    const pageManager = new POManager(page);
    reusablePage = pageManager.getCommonUtilPage();
    await reusablePage.navigate();
    await reusablePage.login();
    console.log('Admin is on program page');
  });
  
  // From: tests/Features/001_ProgramNavigationMenuBar.feature:30:9
  Then('Admin should see sub menu in menu bar as {string}', async ({page}, expectedSubMenuAddNewProgram) => {
    // Step: Then Admin should see sub menu in menu bar as "Add New Program"
    const pageManager = new POManager(page);
    programPage = pageManager.getProgramPage();
    const actualOverLayText = await programPage.isOverlayDisplayed();
    expect(actualOverLayText).toEqual(expectedSubMenuAddNewProgram);
    console.log("Admin saw Add New Program as sub menu in menu bar: "+actualOverLayText);
  });

//----------004_AddNewProgramFeature Scenarios start here----------->

// From: tests/Features/004_AddNewProgramFeature.feature:4:5
  Given('Admin is on program module after reaching home', async ({page}) => {
    const pageManager = new POManager(page);
    reusablePage = pageManager.getCommonUtilPage();
    await reusablePage.navigate();
    await reusablePage.login();
    console.log('Admin is on program page');
  });
  
  // From: tests/Features/004_AddNewProgramFeature.feature:7:5
  Given('Admin is on Program module', async ({page}) => {
    const pageManager = new POManager(page);
    reusablePage = pageManager.getCommonUtilPage();
    await reusablePage.navigate();
    await reusablePage.login();
    console.log('Admin is on program module');
    
  });

  // From: tests/Features/004_AddNewProgramFeature.feature:8:5
  When('Admin clicks on New Program under the Program menu bar', async ({page}) => {
    const pageManager = new POManager(page);
    programPage = pageManager.getProgramPage();
    await programPage.clickOnProgram();
    await programPage.clickOnAddNewProgram();
  });
  
  // From: tests/Features/004_AddNewProgramFeature.feature:9:5
  Then('Admin should see pop up window for program details', async ({page}) => {
    const pageManager = new POManager(page);
    programPage = pageManager.getProgramPage();
    expect(await programPage.isProgramDetailsPopUpDisplayed()).toBe(true);   
  });
  
  // From: tests/Features/004_AddNewProgramFeature.feature:14:5
  Then('Admin should see window title as {string}', async ({page}, programPopUpTitle) => {
    const pageManager = new POManager(page);
    programPage = pageManager.getProgramPage();
    reusablePage = pageManager.getCommonUtilPage();
    const actualHeaderText = await reusablePage.getHeaderText(programPage.programDetailsPopUpHeader);
    expect(actualHeaderText).toEqual(programPopUpTitle);
    // Step: Then Admin should see window title as "Program Details"
    
  });
  
  // From: tests/Features/004_AddNewProgramFeature.feature:19:5
  Then('Admin should see red asterik mark beside mandatory field {string}', async ({page}, mandatoryField) => {
    // Step: Then Admin should see red asterik mark beside mandatory field "Name"
    const pageManager = new POManager(page);
    programPage = pageManager.getProgramPage();
    const validateField = programPage.validateMandatoryFieldAndRedAsterik.bind(programPage); // ✅ Bind context
    validateField(mandatoryField);
  });
  
  // From: tests/Features/004_AddNewProgramFeature.feature:22:5
  Given('Admin is on Program details form', async ({page}) => {
    const pageManager = new POManager(page);
    programPage = pageManager.getProgramPage();
    await programPage.clickOnProgram();
    await programPage.clickOnAddNewProgram();
    
  });
  
  // From: tests/Features/004_AddNewProgramFeature.feature:23:5
  When('Admin clicks save button without entering mandatory', async ({page}) => {
    // Step: When Admin clicks save button without entering mandatory
    const pageManager = new POManager(page);
    programPage = pageManager.getProgramPage();
    reusablePage = pageManager.getCommonUtilPage();
    await reusablePage.click(programPage.programDetailsPopUp_Save);
  });
  
  // From: tests/Features/004_AddNewProgramFeature.feature:24:5
  Then('Admin gets message field is required', async ({page}) => {
    const pageManager = new POManager(page);
    programPage = pageManager.getProgramPage();
    reusablePage = pageManager.getCommonUtilPage();
    await reusablePage.assertLocatorContainsText(programPage.programNameError,"Program name is required.");
    await reusablePage.assertLocatorContainsText(programPage.programDescriptionError,"Description is required.");
    await reusablePage.assertLocatorContainsText(programPage.programStatusError,"Status is required.");

  });
  
   // From: tests/Features/004_AddNewProgramFeature.feature:28:5
  When('Admin clicks Cancel button', async ({page}) => {
    const pageManager = new POManager(page);
    programPage = pageManager.getProgramPage();
    reusablePage = pageManager.getCommonUtilPage()
    await reusablePage.click(programPage.programDetailsPopUp_CancelBtn);  
  });

  // From: tests/Features/004_AddNewProgramFeature.feature:29:5
  Then('Admin can see Program Details form disappears', async ({page}) => {
    // Step: Then Admin can see Program Details form disappears
    const pageManager = new POManager(page);
    programPage = pageManager.getProgramPage();
    reusablePage = pageManager.getCommonUtilPage()
    const programDetailsPopUpPresent = await programPage.isProgramDetailsPopUpPresent();
    expect(programDetailsPopUpPresent).toBeFalsy();  
  });
  
  When('Admin enters the Name in the text box from {string} and {string}', async ({page}, arg, arg1) => {
    // Step: When Admin enters the Name in the text box from "validatetextbox" and "Program"
    // From: tests/Features/004_AddNewProgramFeature.feature:33:5
  });
  
  Then('Admin can see the text entered', async ({page}) => {
    // Step: Then Admin can see the text entered
    // From: tests/Features/004_AddNewProgramFeature.feature:34:5
  });
  
  When('Admin enters the Description in text box from {string} and {string}', async ({page}, arg, arg1) => {
    // Step: When Admin enters the Description in text box from "validatetextbox" and "Program"
    // From: tests/Features/004_AddNewProgramFeature.feature:42:5
  });
  
  Then('Admin can see the text entered in description box', async ({page}) => {
    // Step: Then Admin can see the text entered in description box
    // From: tests/Features/004_AddNewProgramFeature.feature:43:5
  });
  
  When('Admin selects the status of the program by clicking on the radio button {string}', async ({page}, arg) => {
    // Step: When Admin selects the status of the program by clicking on the radio button "(Active/InActive)"
    // From: tests/Features/004_AddNewProgramFeature.feature:51:5
  });
  
  Then('Admin can see {string} status selected', async ({page}, arg) => {
    // Step: Then Admin can see 'Active/Inactive' status selected
    // From: tests/Features/004_AddNewProgramFeature.feature:52:5
  });
  
  When('Admin enter valid details for mandatory fields from {string} and {string} and Click on save button', async ({page}, arg, arg1) => {
    // Step: When Admin enter valid details for mandatory fields from "validInput" and "Program" and Click on save button
    // From: tests/Features/004_AddNewProgramFeature.feature:56:5
  });
  
  Then('Admin gets a message {string}', async ({page}, arg) => {
    // Step: Then Admin gets a message 'Successful Program created'
    // From: tests/Features/004_AddNewProgramFeature.feature:57:5
  });
  
  // From: tests/Features/004_AddNewProgramFeature.feature:70:5
  When('Admin Click on X button', async ({page}) => {
    // Step: When Admin Click on X button
    
  });

  When('Admin searches with newly created Program Name sent from {string} and {string}', async ({page}, arg, arg1) => {
    // Step: When Admin searches with newly created Program Name sent from "validInput" and "Program"
    // From: tests/Features/004_AddNewProgramFeature.feature:75:5
  });
  
  Then('Records of the newly created  Program Name is displayed and match the data entered from {string} and {string}', async ({page}, arg, arg1) => {
    // Step: Then Records of the newly created  Program Name is displayed and match the data entered from "validInput" and "Program"
    // From: tests/Features/004_AddNewProgramFeature.feature:76:5
  });