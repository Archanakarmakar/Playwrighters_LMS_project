const { expect } = require('@playwright/test');
const { ReusablePage } = require('./ReusablePage');
const { getDataByKeyOption } = require('../Utilities/ExcelUtils'); 
const filepath = 'tests/TestData/PlayWright_Group5_Data.xlsx';


class ClassPage{
    constructor(page){
        this.page = page;
        this.class_btn = page.getByRole('button', { name: 'Class' });
        this.headerClass = page.getByText('Manage Class');
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
        this.listOfBatchesFromDropdown = page.locator("//p-dropdownitem");
        this.classTopicInputField = page.locator("//label[text()='Class Topic ']");
        this.classTopic = page.locator("//input[@id='classTopic']");
        this.classDescriptionInputField = page.locator("//label[text()='Class Description']");
        this.classDescription = page.locator("//input[@id='classDescription']");
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


    }

    async clickClass(){
        return this.class_btn;
    }
    
    async validatePageClass(){
       const actualtext =  await this.headerClass.textContent();
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

}

module.exports = {ClassPage}