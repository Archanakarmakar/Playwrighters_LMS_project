import { createBdd } from "playwright-bdd";
const { Given, When, Then } = createBdd();
const { POManager } = require('../PageObject/POManager'); 
const { expect } = require('@playwright/test');
let logout;
 
   
  When('Admin clicks on the logout in the menu bar', async function({}) {
           logout = await this.pageManager.getLogoutPage();     
           await logout.logoutbtn();
  });
  
   
  Then('Admin should be redirected to login page', async function({})  {
     const selector = await logout.loginPage_validation();
     const reusablepage = await  getReusablePage();
     await reusablepage.isVisible(selector);
     console.log("Admin redirected to login page")
  });
  
  Given('Admin is logged out of the application', async function({}) {
       const reusablepage = await this.pageManager.getReusablePage();
       await reusablepage.navigate();
       await reusablepage.login();
       logout = await this.pageManager.getLogoutPage();     
      await logout.logoutbtn();

  });
   
  When('Admin clicks  browser back button', async function({})  {
    logout = await this.pageManager.getLogoutPage();     
    await logout.navigate_back();
  });
  
   
  Then('Admin should receive error message', async function({}){
    const selector = await logout.loginPage_validation();
    const reusablepage = await this.pageManager.getReusablePage();
    const visibility= await reusablepage.notVisible(selector);
    console.log(visibility);
    expect(visibility).toBeFalsy();
     
  });
  