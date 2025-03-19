import { createBdd } from "playwright-bdd";
const {Given, When, Then} = createBdd();
const { expect } = require('@playwright/test');
const { POManager} = require('../PageObjects/POManager');

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
    //-----------------remove till here--------------------->
    //  homePage = pageManager.getHomePage();
    //  await homePage.goTo();
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
    //console.log('Admin is navigated to Program module');
  });
  
  // From: tests/Features/001_ProgramNavigationMenuBar.feature:15:9
  Then('Admin should see Logout in menu bar', async ({page}) => {
    const pageManager = new POManager(page);
    programPage = pageManager.getProgramPage();
    await expect(programPage.logout_btn).toBeVisible();
    console.log('Admin saw Logout in menu bar');
  });