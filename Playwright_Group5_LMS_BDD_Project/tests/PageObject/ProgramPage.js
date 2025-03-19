const { getDataByKeyOption } = require('../Utilities/ExcelUtils');  
const { expect } = require('playwright/test');

class ProgramPage {

    constructor(page){
        this.page = page;
        //Navigation Locators
        // this.lmsTitle = page.getByText(' LMS - Learning Management System ');
        this.lmsTitle = page.locator('span:has-text("LMS - Learning Management System")');
        this.pageSelectorTitles = page.locator('button.mat-button span.mat-button-wrapper')
        this.program_btn = page.locator('#program');
        //this.addNewProgramPane = page.getByRole('button',{name: 'Add New Program'});
        this.addNewProgramPane = page.locator('button:has-text("Add New Program")');
        this.logout_btn = page.locator('#logout');
        this.addNewProgram_btn = page.getByText('Add New Program');  
        this.overlay = page.locator('.cdk-overlay-pane');
        this.manageProgramHeader = page.getByText(' Manage Program');
        this.search_txtBox = page.locator('#filterGlobal');
        this.programDetailsPopUpHeader = page.locator('span:has-text("Program Details")');
        this.programDetailsPopUpCloseBtn = page.locator('button.p-dialog-header-close');
        this.programDetailsPopUp_CancelBtn = page.locator('//span[text()="Cancel"]');
        this.programDetailsPopUp_Save = page.locator('//span[text()="Save"]');
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
        // console.log('App Title displayed : '+actualTitle);
        return actualTitle.trim();;
    }
    async clickOnProgram(){
        await this.program_btn.click();
        console.log('clicked on program button');
        //await this.page.waitForTimeout(2000);
    }

    async clickOnAddNewProgram(){
        await this.addNewProgram_btn.click();
    }

    async getActualOrderOfPageSelector(){
        //const expectedOrder = ['Home', 'Program', 'Batch', 'Class', 'Logout']; // Add 'Home' if present in similar structure
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
    
}
module.exports = {ProgramPage};