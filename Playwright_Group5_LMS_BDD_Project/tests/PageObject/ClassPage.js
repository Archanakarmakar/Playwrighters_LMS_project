const { expect } = require('@playwright/test');
const { ReusablePage } = require('./ReusablePage');
const { getDataByKeyOption } = require('../Utilities/ExcelUtils'); 
const filepath = 'tests/TestData/PlayWright_Group5_Data.xlsx';


class ClassPage{
    constructor(page){
        this.page = page;
        this.program_btn = page.getByRole('button', { name: 'Program' });
        this.class_btn = page.getByRole('button', { name: 'Class' });
        this.headerClass = page.getByText('Manage Class');
        this.headerProgram = page.getByText('Manage Program');
        this.titleClass = page.getByText(' LMS - Learning Management System ');
        this.searchBar = page.getByPlaceholder('Search...');
        this.tableColumnHeaders = page.locator("//thead[@class='p-datatable-thead']/tr/th");
        this.footerText = page.locator("//div[@class='p-d-flex p-ai-center p-jc-between ng-star-inserted']");
        this.paginationText = page.locator("//span[@class='p-paginator-current ng-star-inserted']");
        this.headerColumnSortIcon =page.locator("//*[@psortablecolumn]//i");
        this.deleteAllBtn = page.locator("//button[@class='p-button-danger p-button p-component p-button-icon-only']");
        this.addNewClassBtn = page.locator("//button[@role='menuitem']");
        this.classDetails = page.locator("//span[contains(text(),'Class Details')]");
        this.cancelBtn = page.locator("//span[text()='Cancel']");
        this.saveBtn =page.locator("//span[text()='Save']");
        this.closeIcon = page.locator(".p-dialog-header-close");
        this.overlayer = page.locator('.cdk-overlay-backdrop');
        this.batchNameInputField = page.locator("//label[text()='Batch Name']");
        this.batchNameDropDown = page.locator("//p-dropdown[@id='batchName']//div[@role='button']");
        this.batchNameDropDownEdit =page.locator("//input[@placeholder='Select a Batch Name']");
        this.listOfBatchesFromDropdown = page.locator("//p-dropdownitem");
        this.classTopicInputField = page.locator("//label[text()='Class Topic ']");
        this.classTopic = page.locator("//input[@id='classTopic']");
        this.classDescriptionInputField = page.locator("//label[text()='Class Description']");
        this.classDescriptionField = page.locator('#classDescription');
        this.selectClassDatesInputField = page.locator("//label[text()=' Select Class Dates ']");
        this.calenderBtn = page.locator("//p-calendar//button");
        this.selectClassDate = page.locator("//table[contains(@class, 'p-datepicker-calendar')]//tbody//span[not(contains(@class, 'p-disabled'))]");
        this.dialogbox = page.locator("//div[@role='dialog']");
        this.noOfClassesInputField = page.locator("//label[text()='No of Classes']");
        this.noOfClasses = page.locator("//input[@id ='classNo']");
        this.staffNameInputField = page.locator("//label[text()='Staff Name']");
        this.staffName =page.locator("//p-dropdown[@id='staffId']//div[@role='button']");
        this.selectStaffNameFromDropdown = page.locator("//ul//p-dropdownitem");
        this.statusInputField = page.locator("//lable[text()='Status']");
        this.activeStatus = page.locator("//p-radiobutton[@ng-reflect-input-id='Active']");
        this.createSuccesMessage= page.getByRole('alert');
        this.weekendsDate = page.locator("//table[contains(@class, 'p-datepicker-calendar')]//tr//td[(position()=1 or position()=7) and contains(@class, 'p-disabled')]");
        this.commentsField = page.locator("#classComments");
        this.classNotesField = page.locator("#classNotes");
        this.classRecordingField = page.locator("#classRecordingPath");
        this.errorMessage = page.locator("//div//small");
        this.saveClassBtn = page.getByRole('button', { name: 'Save'});

        this.classDetailsForm =page.locator("//div[@role='dialog']");

        this.searchBox = page.locator("//input[@id='filterGlobal']");
        this.searchBatchName =page.locator("//tbody/tr[1]/td[2]");
        this.searchClassTopic =page.locator("//tbody/tr[1]/td[3]");
        this.searchStaffName =page.locator("//tbody/tr[1]/td[7]");
        this.batchNameList = page.locator("//tbody/tr/td[2]");
        this.classTopicList = page.locator("//tbody/tr/td[3]");

        this.editIcon = page.locator("//tbody//tr[1]//button[@ng-reflect-icon='pi pi-pencil']");
        this.staffNameClearIcon = page.locator("//p-dropdown[@placeholder='Select a Staff Name']//i");
        this.editStaffNameDropDown = page.locator("//input[@placeholder='Select a Staff Name']");

        this.searchClassDesc =page.locator("//tbody/tr[1]/td[4]");

    }

    async clickClass(){
        return await this.class_btn;
    }

    async clickProgram(){
        return await this.program_btn;
    }
    
    async validatePageClass(){
       const actualtext =  await this.headerClass.textContent();
        return actualtext;
    }
    async validatePageProgram(){
        const actualtext =  await this.headerProgram.textContent();
         return actualtext;
     }

    async validateTitleClass(){
        const actualTitle = await this.titleClass.textContent();
        return actualTitle;
    }

    async validateHeaderClass(){
        const actualHeader =  await this.headerClass.textContent();
        return actualHeader;

    }

    async validateSearchBar(){
        return this.searchBar;
          
    }

    async validateTableColumnHeaders(){

        let headers = await this.tableColumnHeaders.allTextContents(); 
        headers = headers.map(header => header.trim()).filter(header => header !== "");
        console.log("Extracted Headers:", headers);
        return headers;  
       
        // const headers = await this.tableColumnHeaders.all(); 
        // for (const header of headers) {
        //     console.log(await header.textContent());
        // }
    }

    async getClassPaginationText(){
        await this.page.waitForSelector('table tbody tr', { state: 'attached' });
       // await this.page.waitForTimeout(2000);
        const actualPaginationText =  await this.paginationText.textContent();
        return actualPaginationText;

    }

    async getFooterTextMessage(){
        await this.page.waitForSelector('table tbody tr', { state: 'attached' });     
        const actualFooterText =  await this.footerText.textContent();
        return actualFooterText;


    }
    async calculateTotalNoOfClasses(){          
        const actualFooterText = await this.footerText.textContent();
        console.log("Footer Text:", actualFooterText); // Debugging log
    
        // Extract the total number from the footer text
        const matches = actualFooterText.match(/\d+/g);
        if (!matches || matches.length === 0) {
            console.error("Error: Could not extract total classes from footer text");
            return 0; // Default to 0 if extraction fails
        }

        const totalClasses = parseInt(matches[matches.length - 1], 10);
        console.log("Extracted Total Classes:", totalClasses);
        return totalClasses;
       

    }

    async isHeaderSortIconListVisible() {
        let state = true;
        const sortIcons = await this.headerColumnSortIcon; 
        const count = await sortIcons.count();
    
        for (let i = 0; i < count; i++) {
            const sortIcon = sortIcons.nth(i);
            const isVisible = await sortIcon.isVisible();
            if (!isVisible) {
                state = false;
                break; 
            }
        }
        return state;
    }

    async isDeleteAllBtnDisplayed(){       
        return await this.deleteAllBtn.isVisible();
    }
    
    async over_layer() {
        const overlayVisible = await this.overlayer.isVisible();
        if (overlayVisible) {
          await this.overlayer.click();
        }
      }

    async clickAddNewClassBtn(){
        const subMenuClass = await this.addNewClassBtn;
        await subMenuClass.click();
    }
    async isClassDetailsDisplayed(){
        return await this.classDetails.isVisible();

    }

    async isCancelBtnDisplayed(){
        return await this.cancelBtn.isVisible();

    }

    async isSaveBtnDisplayed(){
        return await this.saveBtn.isVisible();
    }

    async isCloseIconDisplayed(){
        return await this.closeIcon.isVisible();
    }

    async isInputFieldAndTextBatchNameDisplayed(){
        return await this.batchNameInputField.isVisible();
    }
    async isInputFieldAndTextClassTopicDisplayed(){
        return await this.classTopicInputField.isVisible();
        return await this.classTopic.isVisible();
    }

    async isInputFieldAndTextClassDescriptionDisplayed(){
        return await this.classDescriptionInputField.isVisible();
        return await this.classDescription.isVisible();
    }
   
    async isInputFieldSelectClassDatesDisplayed(){
        return await this.selectClassDatesInputField.isVisible();
    }
    async isInputFields_NoOfClasses_StaffName_StatusDisplayed(){
        return await this.noOfClassesInputField.isVisible();
        return await this.staffNameInputField.isVisible();
        return await this.statusInputField.isVisible();
    }

    async add_NewClass(keyoption,sheetname){
        const filepath = 'tests/TestData/PlayWright_Group5_Data.xlsx';
        const testdata = getDataByKeyOption(filepath,sheetname,keyoption);
        let batchname = testdata['batchName'];
        let classtopic = testdata['classTopic'];
        let staffname = testdata['staffName'];
        let choose_date = testdata['chooseDate'];
        await this.classTopic.fill(classtopic);
        await this.batchNameDropDown.click();

       const listCount =  await this.listOfBatchesFromDropdown.count();
       console.log('Total batch from List Count: ' +listCount);
       for(let i = 0; i < listCount; i++)
       {
        const currentElement = this.listOfBatchesFromDropdown.nth(i);
        await currentElement.scrollIntoViewIfNeeded();
        if ((await currentElement.textContent()) === batchname) {
            await currentElement.click();
            break;  
        }
    }
    console.log("Admin select batch name " + batchname);

    await this.calenderBtn.click();
        const select_Date = []
        const list_dates = await this.selectClassDate.count();
        for( let i = 0; i< list_dates; i++)
        {
            const date  = await this.selectClassDate.nth(i).textContent();
            select_Date.push(date);
            
        }
        const date_count =  select_Date.length;
        let num = date_count;
         
         console.log("Total available dates to select : "+date_count) //5
         
        for (let i = 0; i < date_count; i++) {
            while(i <= date_count-1){
                const date = await this.selectClassDate.nth(i).textContent();
                await this.selectClassDate.nth(i).click();  
                console.log('Date selected:', date);               
                // await this.page.pause();
                break;
               
            }
        }
       
        await this.staffName.click();
        const staff_count = await this.selectStaffNameFromDropdown.count();
        for(let i = 0; i< staff_count ; i++)
        {
            if(await this.selectStaffNameFromDropdown.nth(i).textContent()=== staffname)
            {
                await this.selectStaffNameFromDropdown.nth(i).click();
                break;
            }
        }
        console.log("Selected staff name is "+staffname);
        await this.activeStatus.click();
        //await this.page.pause();

        await this.saveBtn.click();
    }

    async validateCreateSuccessMessage(){
        return await this.createSuccesMessage.textContent();
    }

    async getNoOfClasses(){
        await this.calenderBtn.scrollIntoViewIfNeeded();
        await this.calenderBtn.click();
        const select_Date = []
        const list_dates = await this.selectClassDate.count();
         
        for( let i = 0; i< list_dates; i++)
        {
            const date  = await this.selectClassDate.nth(i).textContent();
            select_Date.push(date);
            
        }
        const date_count =  select_Date.length;
        let num = date_count;
        
        const total_no_of_classes = num.toString();
        
        for (let i = 0; i < date_count; i++) {
            while(i <= date_count-1){
                const date = await this.selectClassDate.nth(i).textContent();
                await this.selectClassDate.nth(i).click();             
                break;
            }
        }
        await this.staffName.click();
        return total_no_of_classes;

    }  
    async clickOnCalenderBtn(){
        await this.calenderBtn.scrollIntoViewIfNeeded();
        await this.calenderBtn.click();

    }  

    async weekendsDatePicker(){
        return this.weekendsDate;
    }

    async enterOptionalFieldsData(keyoption,sheetname){
        const filepath = 'tests/TestData/PlayWright_Group5_Data.xlsx';
        const testdata = getDataByKeyOption(filepath,sheetname,keyoption);
        
        let classDescription = testdata['classDesc'];
        let comments = testdata['Comments'];
        let classNotes = testdata['Notes'];
        let classRecordings =testdata['Recordings'];
        await this.page.waitForSelector('#classDescription', { timeout: 30000 });
        await this.classDescriptionField.fill(classDescription);
        await this.commentsField.scrollIntoViewIfNeeded();
        await this.commentsField.fill(comments);
        await this.classNotesField.fill(classNotes);
        await this.classRecordingField.fill(classRecordings);
             
        await this.page.waitForLoadState('networkidle'); // Ensure page is stable
        await this.saveClassBtn.waitFor({ state: 'visible' });      
        await this.saveClassBtn.click();
         
    }


    async isDisplayedErrorMessage(){  
        const countErrorMessages =  await this.errorMessage.count();
        for (let i = 0; i < countErrorMessages; i++) {
           console.log(await expect (this.errorMessage.nth(i)).toBeVisible());
        } 

        // const countErrorMessages = await this.errorMessage.count();
        // console.log("countErrorMessages-------------"+countErrorMessages)
        // for (let i = 0; i < countErrorMessages; i++) {
        //     const isVisible = await this.errorMessage.nth(i).isVisible();
        //     console.log("Error Message" +isVisible);
        //     if (isVisible) {
        //         return true;
        //     }
        // }
        // return false;
   }
   async validateErrorMessage(){
    await this.page.waitForSelector("//small[contains(text(), 'Batch Name is required.')]", { timeout: 5000 });
    const errorMessages = await this.page.locator("//div//small");
    const errorMessageText = await errorMessages.allTextContents();
    return errorMessageText;

   }


   async clickOnSaveBtn(){
    await this.saveClassBtn.scrollIntoViewIfNeeded();
    await this.saveClassBtn.click();
   }

   async clickOnCancelBtn(){
    await this.cancelBtn.click();

   }

   async disappearsClassDetailsForm() {
    const isPopupDisappeared = await this.page.waitForSelector("//div[@role='dialog']", { state: 'hidden' }).then(() => true).catch(() => false);
    console.log(isPopupDisappeared);
    return isPopupDisappeared;
   }

   /**************** Search **********/
   async enterBatchNameInSearchTextBox() {
    if (this.page.isClosed()) {
        throw new Error("Page is closed. Cannot interact with search box.");
    }

    // Wait up to 10 seconds for the overlay to disappear
    try {
        await this.page.waitForSelector('.cdk-overlay-backdrop', { state: 'detached', timeout: 10000 });
    } catch (error) {
        console.warn("Overlay did not disappear within 10 seconds, proceeding anyway...");
    }

    // Extract batch name safely
    const batchElement = await this.page.locator("//tbody/tr/td[2]").first();
    await batchElement.waitFor({ state: 'visible', timeout: 5000 });
    const batchName = await batchElement.textContent();

    if (!batchName) {
        throw new Error("Batch name is empty or not found in the table.");
    }
    console.log("Batch Name: " + batchName);
    const searchBox = this.page.locator('xpath=//input[@id="filterGlobal"]');

    // Ensure the search box is visible and enabled
    await searchBox.waitFor({ state: 'visible', timeout: 5000 });

    // Try clicking outside to close overlay before interacting
    await this.page.mouse.click(0, 0);

    // Click, clear, and enter the batch name
    await searchBox.click();
    await this.page.waitForTimeout(500); // Small delay for stability
    await searchBox.fill(batchName);

    console.log(`Batch Name entered: ${batchName}`);
    return batchName;
}

async enterClassTopicInSearchTextBox(){
    const firstClassTopicElement =await this.searchClassTopic.first(); // Use a proper selector here
    await firstClassTopicElement.waitFor({ state: 'visible', timeout: 5000 });
    const classTopic = await firstClassTopicElement.textContent();
    console.log("Class Topic: " + classTopic);

    const searchBox = await this.searchBox; // Use a proper selector here

    await searchBox.waitFor({ state: 'visible', timeout: 5000 });
    await this.page.mouse.click(0, 0);
    await searchBox.click(); 
    await searchBox.fill(classTopic); 

    console.log(`Class Topic entered: ${classTopic}`);

    return classTopic;

}
async enterStaffNameInSearchTextBox(){
    const firstStaffNameElement =await this.searchStaffName.first(); // Use a proper selector here
    await firstStaffNameElement.waitFor({ state: 'visible', timeout: 5000 });
    const staffName = await firstStaffNameElement.textContent();
    console.log("Staff Name: " + staffName);

    const searchBox = await this.searchBox; // Use a proper selector here

    await searchBox.waitFor({ state: 'visible', timeout: 5000 });
    await this.page.mouse.click(0, 0);
    await searchBox.click(); 
    await searchBox.fill(staffName); 

    console.log(`Staff Name entered: ${staffName}`);

    return staffName;


}



async getBatchNamesFromTable() {
    const batchNameElements = await this.page.$$('//tbody/tr/td[2]'); // Using $$ to get all matching elements

    const batchNames = [];

    // Iterate over each batch name element and extract the text
    for (const batchElement of batchNameElements) {
        const text = await batchElement.textContent(); 
        batchNames.push(text.trim()); // Trim and add the text to the batchNames array
    }

    return batchNames;
}

async getClassTopicsFromTable() {
    const classTopicElements = await this.page.$$('//tbody/tr/td[3]'); 

    const classTopics = [];
    for (const classTopicEle of classTopicElements) {
        const text = await classTopicEle.textContent(); 
        classTopics.push(text.trim()); 
    }

    return classTopics;
}

async getStaffNamesFromTable() {
    const staffNameElements = await this.page.$$('//tbody/tr/td[7]'); 

    const staffNames = [];
    for (const staffNameEle of staffNameElements) {
        const text = await staffNameEle.textContent(); 
        staffNames.push(text.trim()); 
    }

    return staffNames;
}

async clickEditIcon(){
    await this.overlayer.click();
    await this.editIcon.click();
 }
 async isEditPopUpDisplayed() {
    const editPopUp = await this.classDetails;
    return await editPopUp.isVisible();
}

async isBatchNameDrpdwnDisabled(){
    //await this.batchNameDropDownEdit.waitFor({ state: "visible" });
    return !(await this.batchNameDropDownEdit.isEnabled());
}
async isClassTopicDisabled(){
    return !(await this.classTopic.isEnabled());
}

async validEditClass(Keyoption,Sheetname){
    const testData = getDataByKeyOption(filepath,Sheetname,Keyoption)
    const staffname = testData['staffName'];
    await this.staffNameClearIcon.click();
    await this.staffName.click();
    await this.editStaffNameDropDown.fill(staffname);   
    await this.saveBtn.click();
    return staffname;
}

async optionalTextFieldsEdit(KeyOption,SheetName){
    const testData = getDataByKeyOption(filepath,SheetName,KeyOption)
    let value_comments = (testData['Comments']).toString();
    let value_ClassDesc = (testData['classDesc']).toString();;
    let Notes_Value = (testData['Notes']).toString();;
    let Recording_Value = (testData['Recordings']).toString();;
    console.log(value_comments,value_ClassDesc,Notes_Value,Recording_Value)
    await (this.commentsField).fill(value_comments);
    await (this.classDescriptionField).fill(value_ClassDesc);
    await (this.classNotesField).fill(Notes_Value);
    await (this.classRecordingField).fill(Recording_Value);
    await (this.saveBtn).click();
    return value_ClassDesc;
 }

 async optionalTextFieldsValidDataEdit(KeyOption,SheetName){
    const testData = getDataByKeyOption(filepath,SheetName,KeyOption)
    let value_comments = (testData['Comments']);
    let value_ClassDesc = (testData['classDesc']);
    let Notes_Value = (testData['Notes']);
    let Recording_Value = (testData['Recordings']);
    console.log(value_comments,value_ClassDesc,Notes_Value,Recording_Value)
    await (this.commentsField).fill(value_comments);
    await (this.classDescriptionField).fill(value_ClassDesc);
    await (this.classNotesField).fill(Notes_Value);
    await (this.classRecordingField).fill(Recording_Value);
    await (this.saveBtn).click();
    return value_ClassDesc;
 }
 async editAssertion(KeyOption,SheetName){
    const testData = getDataByKeyOption(filepath,SheetName,KeyOption)
    let value_comments = (testData['Comments']);
    let value_ClassDesc = (testData['classDesc']);
    let Notes_Value = (testData['Notes']);
    let Recording_Value = (testData['Recordings']);
    await this.searchBar.fill(value_ClassDesc);
    expect (await this.searchClassDesc.textContent()).toEqual(value_ClassDesc);
    
}
        

}

module.exports = {ClassPage}