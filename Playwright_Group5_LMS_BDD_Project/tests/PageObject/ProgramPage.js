const { getDataByKeyOption } = require('../Utilities/ExcelUtils');  
const { expect } = require('playwright/test');

class ProgramPage {

    constructor(page){
        this.page = page;
        //Navigation Locators
        this.lmsTitle = page.locator('span:has-text("LMS - Learning Management System")');
        this.pageSelectorTitles = page.locator('button.mat-button span.mat-button-wrapper')
        this.program_btn = page.locator('#program');
        this.addNewProgramPane = page.locator('button:has-text("Add New Program")');
        this.logout_btn = page.locator('#logout');
        this.addNewProgram_btn = page.getByText('Add New Program');  
        this.overlay = page.locator('.cdk-overlay-pane');
        this.manageProgramHeader = page.getByText(' Manage Program');
        this.search_txtBox = page.locator('#filterGlobal');
        this.programDetailsPopUp = page.locator('//div[contains(@class,"p-dialog-mask-scrollblocker")]');
        this.programDetailsPopUpHeader = page.locator('span:has-text("Program Details")');
        this.programDetailsPopUpCloseBtn = page.locator('button.p-dialog-header-close');
        this.programDetailsPopUp_CancelBtn = page.locator('//span[text()="Cancel"]');
        this.programDetailsPopUp_Save = page.locator('//span[text()="Save"]');
        this.programNameError = page.locator('(//../small)[1]');
        this.programDescriptionError = page.locator('(//../small)[2]');
        this.programStatusError = page.locator('(//../small)[3]');
        this.add_programname = page.locator('#programName');
        // Define the mandatory fields and their associated label and asterisk selectors
        this.programPageMandatoryFields = [
        { label: 'Name', labelSelector: 'label[for="programName"]', asteriskSelector: '(//../span[text()="*"])[1]' },
        { label: 'Description', labelSelector: 'label[for="programDescription"]', asteriskSelector: '(//../span[text()="*"])[2]' },
        { label: 'Status', labelSelector: 'label[for="online"]', asteriskSelector: '(//../span[text()="*"])[3]' },
      ];
        //this.programBtn = page.getByRole('button', { name: 'Program' });
        //this .addNewProgramBtn =page.getByRole('menuitem', { name: 'Add New Program' });
    }

    async goTo(){
        return this.page.goto('https://playwright-frontend-app-a9ea85794ad9.herokuapp.com/program');
    }

    async getActualProgramPageTitle(){
        const overlayScreen = await this.overlay.isVisible();
        if(overlayScreen){
            this.overlay.click();
        }
        const actualTitle = await this.manageProgramHeader.innerText();
        console.log('Title displayed : '+actualTitle.trim());
        return actualTitle.trim();
    }

    async getLMSTitle(){
        const actualTitle = await this.lmsTitle.innerText();
        return actualTitle.trim();;
    }
    async clickOnProgram(){
        const isProgramButtonDisplayed = await this.program_btn.isVisible();
        if(isProgramButtonDisplayed){
            await this.program_btn.click();
            console.log('clicked on program button');
        }  else{
            await this.page.waitForTimeout(2000);
            await this.program_btn.click();
        }
    }

    async clickOnAddNewProgram(){
        const addNewProgramDisplayed = await this.addNewProgram_btn.isVisible();
        if(addNewProgramDisplayed){
            await this.addNewProgram_btn.click();
        }
    }

    async getActualOrderOfPageSelector(){
        const actualOrderOfPageSelectors = await this.pageSelectorTitles.allTextContents();
        console.log("Actual order og page selectors on page is : "+actualOrderOfPageSelectors);
        return actualOrderOfPageSelectors;
    }

    async isOverlayDisplayed(){
        const overlayScreen = await this.overlay.isVisible();
        if(overlayScreen){
            console.log("Add new program overlay is displayed");
            this.overlay.click();
            const subMenuText = await this.addNewProgramPane.innerText();
            return subMenuText.trim();
        }
        else{
            console.log("Add new program overlay is not displayed");
        }
    }

    async isProgramDetailsPopUpPresent(){

        await this.page.waitForTimeout(1000);
        const programDetailsPopUp = await this.programDetailsPopUp.isVisible();
        if(programDetailsPopUp){
            console.log("Program Details PopUp window is displayed and present");
            return true;      
        } else {
            console.log("Program Details PopUp window disappeared");
            return false; 
        }
    }

     // Method to validate a specific mandatory field
  async validateMandatoryFieldAndRedAsterik(fieldName) {

    // Find the field object in the mandatoryFields array
    console.log("validating asterik for madatory field :"+fieldName);
    const field = this.programPageMandatoryFields.find((f) => f.label === fieldName);
    if (!field) {
      throw new Error(`Field "${fieldName}" not found in mandatoryFields.`);
    }

    // Create locators for the label and asterisk
    const labelLocator = this.page.locator(field.labelSelector);
    const asteriskLocator = this.page.locator(field.asteriskSelector);

    // Check if the label exists and has the correct text
    await expect(labelLocator).toContainText(field.label);
    
    // Check if the asterisk exists and has the correct text
    await expect(asteriskLocator).toContainText('*');

    // Check if the asterisk color is red
    await expect(asteriskLocator).toHaveCSS('color', 'rgb(255, 0, 0)'); // RGB value for red
  }
    
  async enter_programname(Keyoption,sheetname){
    const testData = getDataByKeyOption(filepath,sheetname,Keyoption);
    const program_name = testData['Input_name'];
    console.log("program_name to enter is :"+program_name);
    await this.add_programname.fill(program_name);
    
  }
  async enteredText(){
   return this.add_programname;
  }
    
}
module.exports = {ProgramPage};