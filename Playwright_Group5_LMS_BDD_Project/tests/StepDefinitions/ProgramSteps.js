import { createBdd } from "playwright-bdd";
const {Given, When, Then} = createBdd();
const { expect } = require('@playwright/test');
const { POManager} = require('../PageObject/POManager');
const DataBuilder = require('../Utilities/DataBuilder');
const builder = new DataBuilder();
const fs = require('fs');

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

//----------002_AddNewProgramFeature Scenarios start here----------->

// From: tests/Features/002_AddNewProgramFeature.feature:4:5
  Given('Admin is on program module after reaching home', async ({page}) => {
    const pageManager = new POManager(page);
    reusablePage = pageManager.getCommonUtilPage();
    await reusablePage.navigate();
    await reusablePage.login();
    console.log('Admin is on program page');
  });
  
  // From: tests/Features/002_AddNewProgramFeature.feature:7:5
  Given('Admin is on Program module', async ({page}) => {
    const pageManager = new POManager(page);
    reusablePage = pageManager.getCommonUtilPage();
    await reusablePage.navigate();
    await reusablePage.login();
    console.log('Admin is on program module');
    
  });

  // From: tests/Features/002_AddNewProgramFeature.feature:8:5
  When('Admin clicks on New Program under the Program menu bar', async ({page}) => {
    const pageManager = new POManager(page);
    programPage = pageManager.getProgramPage();
    await programPage.clickOnProgram();
    await programPage.clickOnAddNewProgram();
  });
  
  // From: tests/Features/002_AddNewProgramFeature.feature:9:5
  Then('Admin should see pop up window for program details', async ({page}) => {
    const pageManager = new POManager(page);
    programPage = pageManager.getProgramPage();
    expect(await programPage.isProgramDetailsPopUpDisplayed()).toBe(true);   
  });
  
  // From: tests/Features/002_AddNewProgramFeature.feature:14:5
  Then('Admin should see window title as {string}', async ({page}, programPopUpTitle) => {
    const pageManager = new POManager(page);
    programPage = pageManager.getProgramPage();
    reusablePage = pageManager.getCommonUtilPage();
    const actualHeaderText = await reusablePage.getHeaderText(programPage.programDetailsPopUpHeader);
    expect(actualHeaderText).toEqual(programPopUpTitle);
  });
  
  // From: tests/Features/002_AddNewProgramFeature.feature:19:5
  Then('Admin should see red asterik mark beside mandatory field {string}', async ({page}, mandatoryField) => {
    const pageManager = new POManager(page);
    programPage = pageManager.getProgramPage();
    const validateField = programPage.validateMandatoryFieldAndRedAsterik.bind(programPage); // ✅ Bind context
    validateField(mandatoryField);
  });
  
  // From: tests/Features/002_AddNewProgramFeature.feature:22:5
  Given('Admin is on Program details form', async ({page}) => {
    const pageManager = new POManager(page);
    programPage = pageManager.getProgramPage();
    await programPage.clickOnProgram();
    await programPage.clickOnAddNewProgram();
    
  });
  
  // From: tests/Features/002_AddNewProgramFeature.feature:23:5
  When('Admin clicks save button without entering mandatory', async ({page}) => {
    // Step: When Admin clicks save button without entering mandatory
    const pageManager = new POManager(page);
    programPage = pageManager.getProgramPage();
    reusablePage = pageManager.getCommonUtilPage();
    await reusablePage.click(programPage.programDetailsPopUp_Save);
  });
  
  // From: tests/Features/002_AddNewProgramFeature.feature:24:5
  Then('Admin gets message field is required', async ({page}) => {
    const pageManager = new POManager(page);
    programPage = pageManager.getProgramPage();
    reusablePage = pageManager.getCommonUtilPage();
    await reusablePage.assertLocatorContainsText(programPage.programNameError,"Program name is required.");
    await reusablePage.assertLocatorContainsText(programPage.programDescriptionError,"Description is required.");
    await reusablePage.assertLocatorContainsText(programPage.programStatusError,"Status is required.");

  });
  
   // From: tests/Features/002_AddNewProgramFeature.feature:28:5
  When('Admin clicks Cancel button', async ({page}) => {
    const pageManager = new POManager(page);
    programPage = pageManager.getProgramPage();
    reusablePage = pageManager.getCommonUtilPage()
    await reusablePage.click(programPage.programDetailsPopUp_CancelBtn);  
  });

  // From: tests/Features/002_AddNewProgramFeature.feature:29:5
  Then('Admin can see Program Details form disappears', async ({page}) => {
    // Step: Then Admin can see Program Details form disappears
    const pageManager = new POManager(page);
    programPage = pageManager.getProgramPage();
    reusablePage = pageManager.getCommonUtilPage()
    const programDetailsPopUpPresent = await programPage.isProgramDetailsPopUpPresent();
    expect(programDetailsPopUpPresent).toBeFalsy();  
  });
  
  // From: tests/Features/002_AddNewProgramFeature.feature:33:5
  When('Admin enters the Name in the text box from {string} and {string}', async ({page}, keyoption, sheetname) => {
    // Step: When Admin enters the Name in the text box from "validatetextbox" and "Program"
    await program.enter_programname(keyoption,sheetname);
  });
  
  // From: tests/Features/002_AddNewProgramFeature.feature:34:5
  Then('Admin can see the text entered', async ({page}) => {
    const actual_Text = await program.enteredText();
     expect(actual_Text).toBeVisible();
    
  });
  
  // From: tests/Features/002_AddNewProgramFeature.feature:42:5
  When('Admin enters the Description in text box from {string} and {string}', async ({page}, validtextbox, Program) => {
    // Step: When Admin enters the Description in text box from "validatetextbox" and "Program"
    const pageManager = new POManager(page);
    programPage = pageManager.getProgramPage();
    await programPage.enter_programDescription(validtextbox,Program);
  });
  
  // From: tests/Features/002_AddNewProgramFeature.feature:43:5
  Then('Admin can see the text entered in description box', async ({page}) => {
    const pageManager = new POManager(page);
    programPage = pageManager.getProgramPage();
    const actual_Text = await programPage.enteredProgramDesc();
    expect(actual_Text).toBeVisible();
  });
  
  // From: tests/Features/002_AddNewProgramFeature.feature:51:5
  When('Admin selects the status of the program by clicking on the radio button {string}', async ({page}, arg) => {
    const pageManager = new POManager(page);
    programPage = pageManager.getProgramPage();
    await programPage.clickActiveStatus();
  });
  
  // From: tests/Features/002_AddNewProgramFeature.feature:52:5
  Then('Admin can see {string} status selected', async ({page}, arg) => {
    const pageManager = new POManager(page);
    programPage = pageManager.getProgramPage();
    await programPage.validateActiveStatus();   
  });
  
  // From: tests/Features/002_AddNewProgramFeature.feature:56:5
  When('Admin enter valid details for mandatory fields and Click on save button', async ({page}) => {
    const pageManager = new POManager(page);
    programPage = pageManager.getProgramPage();
    await programPage.enterValidProgramName();
    await programPage.enterProgramDesc(programPage,"valid_programdesc_one");
    await programPage.clickActiveStatus();
    await programPage.clickSaveProgram();
  });
  
  // From: tests/Features/002_AddNewProgramFeature.feature:57:5
  Then('Admin gets a message {string}', async ({page}, arg) => {
    const pageManager = new POManager(page);
    programPage = pageManager.getProgramPage();
    await expect(programPage.programSuccessMsg).toBeVisible();
    
  });
  
  // From: tests/Features/002_AddNewProgramFeature.feature:70:5
  When('Admin Click on X button', async ({page}) => {
    const pageManager = new POManager(page);
    programPage = pageManager.getProgramPage();
    await programPage.clickXProgram();
  });

  // From: tests/Features/002_AddNewProgramFeature.feature:75:5
  When('Admin searches with newly created Program Name', async ({page}) => {
    const pageManager = new POManager(page);
    programPage = pageManager.getProgramPage();
    await programPage.clickOnProgram();
    const currentProgramName = builder.loadCurrentProgramName().trim();
    await programPage.searchRecord("Program Name",currentProgramName);

  });
  
  // From: tests/Features/002_AddNewProgramFeature.feature:76:5
  Then('Records of the newly created  Program Name is displayed and match the data entered', async ({page}) => {
    const pageManager = new POManager(page);
    programPage = pageManager.getProgramPage();
    const currentProgramName = builder.loadCurrentProgramName().trim();
    const foundValue = await programPage.searchRecord("Program Name",currentProgramName);
    expect(foundValue).toEqual(currentProgramName);
  });

  //------------004_DeleteProgram Scenarios start here ---------------------------------->
  When('Admin clicks on program in home page and admin lands on Manage program Page', async ({}) => {
    // Step: When Admin clicks on program in home page and admin lands on Manage program Page
    // From: tests/Features/004_DeleteProgram.feature:5:1
  });
  
  When('Admin clicks on delete button for a program', async ({}) => {
    // Step: When Admin clicks on delete button for a program
    // From: tests/Features/004_DeleteProgram.feature:10:1
  });
  
  Then('Admin will get confirm deletion popup', async ({}) => {
    // Step: Then Admin will get confirm deletion popup
    // From: tests/Features/004_DeleteProgram.feature:11:1
  });
  
  Given('Admin is on Confirm deletion form', async ({}) => {
    // Step: Given Admin is on Confirm deletion form
    // From: tests/Features/004_DeleteProgram.feature:15:1
  });
  
  When('Admin clicks on {string} button', async ({}, arg) => {
    // Step: When Admin clicks on "Yes" button
    // From: tests/Features/004_DeleteProgram.feature:16:1
  });
  
  Then('Admin can see {string} message', async ({}, arg) => {
    // Step: Then Admin can see 'Successful Program Deleted' message
    // From: tests/Features/004_DeleteProgram.feature:17:1
  });
  
  When('Admin Searches for {string}', async ({}, arg) => {
    // Step: When Admin Searches for "Deleted Program name"
    // From: tests/Features/004_DeleteProgram.feature:22:1
  });
  
  Then('There should be zero results.', async ({}) => {
    // Step: Then There should be zero results.
    // From: tests/Features/004_DeleteProgram.feature:23:1
  });
  
  Given('Admin is on Program Confirm Deletion Page after selecting a program to delete', async ({}) => {
    // Step: Given Admin is on Program Confirm Deletion Page after selecting a program to delete
    // From: tests/Features/004_DeleteProgram.feature:27:1
  });
  
  When('Admin clicks on No button', async ({}) => {
    // Step: When Admin clicks on No button
    // From: tests/Features/004_DeleteProgram.feature:28:1
  });

  Then('Admin can see Confirmation form disappears', async ({}) => {
    // Step: Then Admin can see Confirmation form disappears
    // From: tests/Features/004_DeleteProgram.feature:29:1
  });
  
  Then('Admin can see Confirm Deletion form disappear', async ({}) => {
    // Step: Then Admin can see Confirm Deletion form disappear
    // From: tests/Features/004_DeleteProgram.feature:35:1
  });