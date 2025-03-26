import { createBdd } from "playwright-bdd";
const { Given, When, Then } = createBdd();
const { expect } = require('@playwright/test');
const { POManager } = require('../PageObject/POManager'); 

let reusablepage;
let classPage;
let programPage;
let paginationAndSorting;
let logOut;
let  nextLink="";

let expectedName = "";
let expectedTopic = "";
let expectedStaffName = "";

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
    const reusablepage = await this.pageManager.getReusablePage();
    classPage = await this.pageManager.getClassPage();
    const selector = await classPage.clickClass();
    await reusablepage.click(selector);
    
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
  await reusablepage.click(selector);
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
//****************Scenario 14
When('Admin clicks date picker', async function({})  {
  const classPage = await this.pageManager.getClassPage();
    await classPage.clickOnCalenderBtn();
    
  });

Then('Admin should see weekends dates are disabled to select', async function({})  {
    const weekendsDateElements = await classPage.weekendsDatePicker(); // Get locator
    const countWeekendDates = await weekendsDateElements.count();
    for (let i = 0; i < countWeekendDates; i++) {
        // Get the class attribute of the weekend date element
        const classNames = await weekendsDateLocator.nth(i).getAttribute('class');
        console.log(`Class of weekend date at index ${i}: ${classNames}`);

        // Assert if the class includes "p-disabled"
        await expect(classNames).toContain('p-disabled');
    }

    console.log('Weekend dates are disabled');
   
  });

//****************Scenario 15
  When('Admin skips to add value in mandatory field and enter only the optional field from {string} and {string}', async function({}, keyoption, sheetname)  {
    const classPage = await this.pageManager.getClassPage();
    classPage.enterOptionalFieldsData(keyoption,sheetname);
    
  });
  
  
  
  Then('Admin should see error message below the test field and the field will be highlighted in red color', async function({})  {
    // Check if error message is visible
     this.errorMessage = this.page.locator("//div//small");
     await classPage.isDisplayedErrorMessage();
     const errorMessageText = await this.errorMessage.allTextContents();
     console.log("$$$$$$$$$$$$"+errorMessageText);
     expect(await errorMessageText).toContain("is required"); 
   

    // Check if the error field is highlighted in red
    const fieldColor = await this.errorMessage.evaluate((el) => getComputedStyle(el).borderColor);
    expect(fieldColor).toBe('rgb(255, 0, 0)'); // Assert that the border color is red (change if needed)

    console.log('Error message is visible, and the field is highlighted in red');
  });

  When('Admin enters invalid data in all of the fields in the form and clicks on save button', async function({})  {
    classPage.clickOnSaveBtn();
    
  });


  Then('Admin gets error message and class is not created', async function({})  {
   
    
  });

  When('Admin clicks on save button without entering data', async function({})  {
    classPage.clickOnSaveBtn();
  });

  Then('class won\'t be created and Admin gets error message', async function({})  { 
    const errorMessageText = await classPage.validateErrorMessage();
    console.log(errorMessageText);
    expect(errorMessageText.some(text => text.includes("is required"))).toBe(true); 
  });


  When('Admin clicks Cancel\\/Close\\(X) Icon on Class Details form', async function({})  {
    await classPage.clickOnCancelBtn();
  });

  Then('Class Details popup window should be closed without saving', async function({})  {
    const isPopupDisappear = await classPage.disappearsClassDetailsForm();
    expect(isPopupDisappear).toBeTruthy();
  });







  //****************************** Class Page Navigation Steps*******************

   //****************Scenario 1
  Given('clicks Class on the navigation bar', async function({}) {
    classPage = await this.pageManager.getClassPage();
    await classPage.clickClass();
    
  });

  When('Admin clicks on Class link on Manage Class page', async function({}) {
    await classPage.over_layer();
    await classPage.clickClass();
    
  });
  Then('Admin is redirected to {string} page', async function({}, expectedPage) {
    const actualPage = await classPage.validatePageClass();
    expect(await actualPage).toBe(expectedPage);
  });

  //****************Scenario 2
  When('Admin clicks on any page link on Manage Class page', async function({})  {
    programPage = this.pageManager.getProgramPage();
    await classPage.over_layer();
    await programPage.clickOnProgram();
    console.log('Admin clicked Program on the navigation bar');
  });

  Then('Admin is redirected to which page link they clicked.', async function({})  {
    const actualTitle = await programPage.getActualProgramPageTitle();
    console.log("Actual Title : "+actualTitle);
    expect(actualTitle).toEqual('Manage Program');
  });

//****************Scenario 3
  When('Admin clicks on Logout link on Manage class page', async function({})  {
    logOut = await this.pageManager.getLogoutPage(); 
    await classPage.over_layer();    
    await logOut.logoutbtn();
  });

  Then('Admin is redirected to Login page', async function({})  {
    const selector = await logOut.loginPage_validation();
    const reusablepage = await this.pageManager.getReusablePage();
    await reusablepage.isVisible(selector);
    console.log("Admin redirected to login page")
    
  });

  //***************Sort class ****************/
//Scenario 1
  When('Admin clicks on the Batchname sort icon', async function({})  {
    paginationAndSorting = await this.pageManager.getPaginationAndSorting();
    const sorticon = await paginationAndSorting.getBatchNameCol();
    await paginationAndSorting.clickSortIcon(sorticon);
  });

  Then('Admin should see Class details are sorted by Batch Name', async function({})  {
    const sortingBatchNameCells = await paginationAndSorting.getBatchNameCell();
    await paginationAndSorting.pagination_Asc_Sorting(sortingBatchNameCells);
  });
  
//Scenario 2
  When('Admin clicks on the Class topic sort icon', async function({}) {
    paginationAndSorting = await this.pageManager.getPaginationAndSorting();
    const sorticon = await paginationAndSorting.getClassTopicCol();
    await paginationAndSorting.clickSortIcon(sorticon);
  });

  Then('Admin should see Class details are sorted by Class Topic', async function({}) {
    const sortingTopicCells = await paginationAndSorting.getClassTopicCell();
    await paginationAndSorting.pagination_Asc_Sorting(sortingTopicCells);
  });

//Scenario 3
  When('Admin clicks on the Class description sort icon', async function({})  {
    paginationAndSorting = await this.pageManager.getPaginationAndSorting();
    const sorticon = await paginationAndSorting.getClassDescCol();
    await paginationAndSorting.clickSortIcon(sorticon);
  });

  Then('Admin should see Class details are sorted by Class Description', async function({})  {
    const sortingDescCells = await paginationAndSorting.getClassDescCell();
    await paginationAndSorting.pagination_Asc_Sorting(sortingDescCells);
  });

 //Scenario 4
  When('Admin clicks on the Status sort icon', async function({})  {
    paginationAndSorting = await this.pageManager.getPaginationAndSorting();
    const sorticon = await paginationAndSorting.getClassStatusCol();
    await paginationAndSorting.clickSortIcon(sorticon);
  });

  Then('Admin should see Class details are sorted by Status', async function({})  {
    const sortingStatusCells = await paginationAndSorting.getClassStatusCell();
    await paginationAndSorting.pagination_Asc_Sorting(sortingStatusCells);
  });

 //Scenario 5
  When('Admin clicks on the Class Date sort icon', async function({})  {
    paginationAndSorting = await this.pageManager.getPaginationAndSorting();
    const sorticon = await paginationAndSorting.getClassDateCol();
    await paginationAndSorting.clickSortIcon(sorticon);
  });
  
  Then('Admin should see Class details are sorted by Class Date', async function({})  {
    const sortingDescCells = await paginationAndSorting.getClassDateCell();
    await paginationAndSorting.pagination_Asc_Sorting(sortingDescCells);
  });

   //Scenario 6
  When('Admin clicks on the Staff Name sort icon', async function({}) {
    paginationAndSorting = await this.pageManager.getPaginationAndSorting();
    const sorticon = await paginationAndSorting.getStaffNameCol();
    await paginationAndSorting.clickSortIcon(sorticon);
  });
  
  Then('Admin should see Class details are sorted by Staff name', async function({}) {
    const sortingStaffNameCells = await paginationAndSorting.getClassStatusCell();
    await paginationAndSorting.pagination_Asc_Sorting(sortingStaffNameCells);
  });

  //********************* Class Pagination **************************/

  // Given('Admin is on the Manage program page after login', async function({})  {
  //   const reusablepage = await this.pageManager.getReusablePage();
  // await reusablepage.navigate();
  // await reusablepage.login();
  // programPage = await this.pageManager.getProgramPage();
  // await programPage.clickOnProgram();
  
  // });
  
  // // 2. Missing step definition for "tests\Features\005_Class\009_PaginationClass.feature:11:1"
  // Given('Admin is on the Manage program page', async function({})  {
  //   classPage = await this.pageManager.getClassPage();
  //   const actualtext = await classPage.validatePageProgram();
  // expect(await actualtext).toBe(' Manage Program')
  // });

  When('Admin clicks Next page link on the class table', async function({})  {
    paginationAndSorting = await this.pageManager.getPaginationAndSorting();
    await classPage.over_layer();  
    nextLink = await paginationAndSorting.getNextLink(); // Get the Next Page link  

    expect(nextLink).not.toBeNull(); // Ensure the element exists

    if (await nextLink.isEnabled()) {
      await nextLink.click(); // Click only once
      await this.page.waitForTimeout(1000);
    } else {
        console.log("Next link is already disabled, staying on the last page.");
    }
    
  });

  Then('Admin should see the next page record on the table with Pagination has next active link enabled', async function({})  {
    await this.page.waitForTimeout(1000);
    expect(nextLink).not.toBeNull(); // Ensure the element is found
    expect(await nextLink.isEnabled()).toBeTruthy(); 
  });

//scenario 2 
  When('Admin clicks Last page link', async function({})  {
    
    paginationAndSorting = await this.pageManager.getPaginationAndSorting();
    const lastLink = await paginationAndSorting.getLastLink(); // Get Last Page Link
    expect(lastLink).not.toBeNull(); // Ensure Last Page Link exists

    if (await lastLink.isEnabled()) {
      await lastLink.click(); // Click only once
      await this.page.waitForTimeout(1000);
    } 
   
  });

  Then('Admin should see the last page record on the table with Next page link are disabled', async function({})  {
    await this.page.waitForSelector(".p-paginator", { state: "visible" });
    await this.page.waitForTimeout(1000);
    const nextLink = await paginationAndSorting.getNextLink(); // Get the Next button

    if (nextLink) {
        console.log("Next button exists. Checking if it's disabled...");
        expect(await nextLink.isEnabled()).toBeFalsy(); // Check if disabled
    } else {
        console.log("Next button is not visible, assuming pagination is at the last page.");
    }
    
  });

//Scenario 3
Given('Admin is on the Manage class page and clicks on last page link', async function({}) {

  await classPage.validatePageClass();

  const lastLink = await this.page.$("//button[contains(@class, 'p-paginator-last')]"); // Get the button
    expect(lastLink).not.toBeNull(); // Ensure button exists
    if (await lastLink.isEnabled()) {
        await lastLink.scrollIntoViewIfNeeded(); // Ensure it's visible on screen
        await lastLink.click({ force: true }); // Click once, even if hidden
        await this.page.waitForTimeout(1000); // Allow UI to update
    } else {
        console.log("Last page button is disabled or already clicked.");
    }
 
  });

  Given('Admin is on last page of class table', async function({}) {
    paginationAndSorting = await this.pageManager.getPaginationAndSorting();
    await this.page.waitForSelector(".p-paginator", { state: "visible" });    
    const paginationFooter = await this.page.$(".p-paginator");
    await paginationFooter.scrollIntoViewIfNeeded();

    // Validate if on last page by checking if Next button is disabled
    const isLastPage = await paginationAndSorting.isOnLastPage();
    expect(isLastPage).toBeTruthy();

    
  });
 
  When('Admin clicks Previous page link', async function({})  {
    paginationAndSorting = await this.pageManager.getPaginationAndSorting();   
    const previousPageLink = await paginationAndSorting.getPreviousPageLink(); // Get Previous Page Link   
    expect(previousPageLink).not.toBeNull(); // Ensure Previous Page Link exists
    if (await previousPageLink.isEnabled()) {
      await paginationAndSorting.navigateToPreviousPage(); // Click only once
      await this.page.waitForTimeout(1000);
    } 
   
    
  });
  
  Then('Admin should see the previous page record on the table with pagination has previous page link enabled', async function({}) {
    await this.page.waitForSelector(".p-paginator", { state: "visible" });
    const isPreviousPageEnabled = await paginationAndSorting.isPreviousPageEnabled(); 
    await this.page.waitForTimeout(1000);   
    expect(isPreviousPageEnabled).toBeTruthy(); // Assert that Previous Page Link is enabled
  });

//scenario 4 

  Given('Admin is on the Manage class page and clicks on Previous page link', async function({})  {
    await classPage.validatePageClass();

    const previousLink = await this.page.$("//button[contains(@class, 'p-paginator-prev')]"); // Get the button
      expect(lastLink).not.toBeNull(); // Ensure button exists
      if (await previousLink.isEnabled()) {
          await previousLink.scrollIntoViewIfNeeded(); // Ensure it's visible on screen
          await previousLink.click({ force: true }); // Click once, even if hidden
          await this.page.waitForTimeout(1000); // Allow UI to update
      } else {
          console.log("Previous page button is disabled or already clicked.");
      }
  });
  Given('Admin is on Previous class page', async function({}) {
    paginationAndSorting = await this.pageManager.getPaginationAndSorting();
    await this.page.waitForSelector(".p-paginator", { state: "visible" });    
    const paginationFooter = await this.page.$(".p-paginator");
    await paginationFooter.scrollIntoViewIfNeeded();
    expect(await paginationAndSorting.isOnFirstPage()).toBeFalsy();
  });

  When('Admin clicks First page link', async function({})  {
    paginationAndSorting = await this.pageManager.getPaginationAndSorting();    
    const firstPageLink = await paginationAndSorting.getFirstPageLink(); // Get First Page Link    
    expect(firstPageLink).not.toBeNull(); // Ensure First Page Link exists
    expect(await firstPageLink.isEnabled()).toBeTruthy(); // Ensure it is clickable  
    await paginationAndSorting.navigateToFirstPage();
  });
    
  // 3. Missing step definition for "tests\Features\005_Class\009_PaginationClass.feature:25:1"
  Then('Admin should see the very first page record on the table with Previous page link are disabled', async function({}) {
    const isFirstPage = await paginationAndSorting.isOnFirstPage(); // Check if Admin is on the first page    
    expect(isFirstPage).toBeTruthy();
  });

   //********************* Class Search **************************/

  When('Admin enter the Batch Name in search textbox', async function({})  {
    expectedName = await classPage.enterBatchNameInSearchTextBox();
  });

  Then('Admin should see Class details are searched by Batch Name', async function({})  {
    await this.page.waitForTimeout(2000); 
    const batchNames = await classPage.getBatchNamesFromTable(); 
    console.log("Batch names retrieved from the table:", batchNames); 
    batchNames.forEach(batch => {  
      expect(batch).toBe(expectedName);
  });

});

When('Admin enter the Class topic in search textbox', async function({})  {
  expectedTopic = await classPage.enterClassTopicInSearchTextBox();
  
});

Then('Admin should see Class details are searched by Class topic', async function({})  {
  await this.page.waitForTimeout(2000); 
  const classTopics = await classPage.getClassTopicsFromTable(); 
    classTopics.forEach(topic => {  
      expect(topic).toBe(expectedTopic);
  });
  
});

When('Admin enter the Staff Name in search textbox', async function({})  {
  expectedStaffName = await classPage.enterStaffNameInSearchTextBox();
});

Then('Admin should see Class details are searched by Staff name', async function({})  {
  await this.page.waitForTimeout(2000); 
  const staffNames = await classPage.getStaffNamesFromTable(); 
  staffNames.forEach(staff => {  
      expect(staff).toBe(expectedStaffName);
  });
  
});

  