import { createBdd } from "playwright-bdd";
const { Given, When, Then } = createBdd();
const { expect } = require('@playwright/test');
const { POManager } = require('../PageObject/POManager'); 

let reusablepage;
let classPage;
//**************Scenario 1
  Given('Admin is on the home page after login', async function({})  {   
    const reusablepage = await this.pageManager.getReusablePage();
    await reusablepage.navigate();
    await reusablepage.login();
    const home_Page = await this.pageManager.getHomePage();
    const title_locator = await home_Page.getHeadertitle();   
    await reusablepage.isVisible(title_locator);
  });
  
  When('Admin clicks the Class Navigation bar in the Header', async function ({}) {
    classPage = await this.pageManager.getClassPage();
    const selector = await classPage.clickClass();
    const reusablepage = await this.pageManager.getReusablePage();
    await reusablepage.click(selector)
  });
  
  Then('Admin should land on the {string} page', async function({}, expectedPage) {
    const actualPage = await classPage.validatePageClass();
        expect(await actualPage).toBe(expectedPage);
  });

//****************Scenario 2
  Then('Admin should see the {string} Title', async function({}, expectedTitle) {
    const actualTitle = await classPage.validateTitleClass();
    console.log("Title : "+actualTitle);
    expect(await actualTitle).toBe(expectedTitle);
    
  });

  //****************Scenario 3
  Then('Admin should see the {string} Header', async function({}, expectedHeader)  {
    const actualHeader= await classPage.validateHeaderClass();
    console.log("Header  : "+actualHeader);
    expect(await actualHeader).toBe(expectedHeader);
    
  });
  
  //****************Scenario 4
  Then('Admin should see the Search Bar in Manage class page', async function({})  {
    const selector = await classPage.validateSearchBar();
    console.log("Search :" +selector);
    const reusablepage = this.pageManager.getReusablePage();
    await reusablepage.isVisible(selector);
   
  });
  //****************Scenario 5
  Then('Admin should see the datatable heading like {string}', async function({}, expectedColumnHeaders)  {
    const actualColumnHeadersList = await classPage.validateTableColumnHeaders();
    console.log("actualColumnHeadersList : "+actualColumnHeadersList)
    const expectedColumnHeadersList = expectedColumnHeaders.split(", ");
    console.log("expectedColumnHeadersList :-- "+expectedColumnHeadersList);
    expect(await actualColumnHeadersList).toStrictEqual(expectedColumnHeadersList);

  });

  //****************Scenario 6
  Then('Admin should see the  showing x to y of  z entries and enabled pagination controls under the data table', async function({}) {
    const actualFooterText = await classPage.getFooterTextMessage();	
		const paginationText = await classPage.getClassPaginationText();	
		const totalClasses = await classPage.calculateTotalNoOfClasses();		
    console.log("Pagination Text:", paginationText);
    console.log("Footer Text:", actualFooterText);
    console.log("Extracted Total Classes:", totalClasses);

    if (isNaN(totalClasses)) {
        console.error("Error: Total classes is NaN, check the footer text format!");
    }

    const sub = `of ${totalClasses} entries`;
    console.log("Sub Text =", sub);

    expect(paginationText).toContain(sub); 
   
  });

  //****************Scenario 7
  Then('Admin should see the Sort icon of all the field in the datatable.', async function ({}) {
    const headerSortIconListState = await classPage.isHeaderSortIconListVisible();
    console.log("headerSortIconListState is displayed : " + headerSortIconListState);
    expect(await headerSortIconListState).toBe(true);
    
  });

  //****************Scenario 8
  Then('Admin should see the Delete button under the Manage class page header.', async function({})  {
    const isDeleteAllBtnVisible = await classPage.isDeleteAllBtnDisplayed();
    console.log("DeleteAllBtn is displayed : " + isDeleteAllBtnVisible);
    expect(await isDeleteAllBtnVisible).toBe(true);
    
  });
  
  //****************Scenario 9
  Then('Admin should see Total no of classes in below of the data table.', async function({})  {
    const actualFooterText = await classPage.getFooterTextMessage();	
    const totalClasses = await classPage.calculateTotalNoOfClasses();	
    console.log("Footer Text:", actualFooterText);
    const sub = `are ${totalClasses} classes.`;	
    console.log("Sub Text =", sub);
    expect(actualFooterText).toContain(sub);
    
  });

//****************Scenario 10       Add New Class
Given('Admin is on the Manage class page after login', async function({})  {
  const reusablepage = await this.pageManager.getReusablePage();
  await reusablepage.navigate();
  await reusablepage.login();
  classPage = await this.pageManager.getClassPage();
  const selector = await classPage.clickClass();
  await reusablepage.click(selector)
});

 
Given('Admin is on the Manage class page', async function({}) {
  const actualtext = await classPage.validatePageClass();
  expect(await actualtext).toBe(' Manage Class')
  
});

When('Admin clicks a add new class under the class menu bar.', async function({})  { 
  classPage = await this.pageManager.getClassPage();
  await classPage.over_layer();
  const selector = await classPage.clickClass();
  const reusablepage = this.pageManager.getReusablePage();
  await reusablepage.click(selector);
  await classPage.clickAddNewClassBtn();

});

Then('Admin should see a popup open for class details with empty form along with SAVE and CANCEL button and Close\\(X) Icon on the top right corner of the window', async function({})  {
  expect(await classPage.isClassDetailsDisplayed()).toBeTruthy();
  expect(await classPage.isCancelBtnDisplayed()).toBeTruthy();
  expect(await classPage.isSaveBtnDisplayed()).toBeTruthy();
  expect(await classPage.isCloseIconDisplayed()).toBeTruthy();
 
});

//****************Scenario 11
Then('Admin should see few input fields and their respective text boxes in the class details window', async function({})  {
  expect(await classPage.isInputFieldAndTextBatchNameDisplayed()).toBeTruthy();
  expect(await classPage.isInputFieldAndTextClassTopicDisplayed()).toBeTruthy();
  expect(await classPage.isInputFieldAndTextClassDescriptionDisplayed()).toBeTruthy();
  expect(await classPage.isInputFieldSelectClassDatesDisplayed()).toBeTruthy();
  expect(await classPage.isInputFields_NoOfClasses_StaffName_StatusDisplayed()).toBeTruthy();
 
  
});

//****************Scenario 12    Add New Class Popup
Given('Admin is on the Class Popup window', async function({})  {
  classPage = await this.pageManager.getClassPage();
  await classPage.over_layer();
  const selector = await classPage.clickClass();
  const reusablepage = this.pageManager.getReusablePage();
  await reusablepage.click(selector);
  await classPage.clickAddNewClassBtn();
 
});

When('Admin enters mandatory fields in the form and clicks on save button from {string} and {string}', async function({}, keyoption, sheetname)  {
  const classPage = await this.pageManager.getClassPage();
  await classPage.add_NewClass(keyoption,sheetname);

});

Then('Admin gets message Class added Successfully', async function({})  {
  const actualSuccessMessage = await classPage.validateCreateSuccessMessage();
  const expectedSuccessMessage ='SuccessfulClass Created';
  expect(await actualSuccessMessage).toContain(expectedSuccessMessage);

});

When('Admin selects class date in date picker', async function({})  {
  const classPage = await this.pageManager.getClassPage();
  await classPage.getNoOfClasses();

  
});


Then('Admin should see no of class value is added automatically', async function({}) {
  const actualNumberOfClasses = await classPage.getNoOfClasses(); // Await the function
  const expectedNoOfClassesLocator = this.page.locator('[ng-reflect-model]'); // Correctly locate the element
  await expect(expectedNoOfClassesLocator).toHaveAttribute('ng-reflect-model', actualNumberOfClasses);
  
});