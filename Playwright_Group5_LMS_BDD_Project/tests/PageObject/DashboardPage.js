const { expect } = require('@playwright/test');
const { getDataByKeyOption } = require('../Utilities/ExcelUtils'); 
const filepath = 'tests/TestData/PlayWright_Group5_Data.xlsx';
const { ReusablePage } = require('../PageObject/ReusablePage');
const sheetName = 'Dashboard';

class DashboardPage {
    constructor(page)
    {
        this.page = page;
        this.title_allignment = page.locator('//span[text()=" LMS - Learning Management System "]');
        this.dashboard_title = page.getByText(' LMS - Learning Management System ');
        this.navigation_bar = page.locator('//mat-toolbar');
        this.navigation_bar_order = page.locator('//mat-toolbar//div//button//span[1]');
        this.logout = page.getByText('Logout');
    }
    async getLogouttext(){
        return this.logout
    }
    
    async title(KeyOption,sheetName){
        
        const testData = getDataByKeyOption(filepath,sheetName,KeyOption);
        const expectedtitle = testData['expectedValue'];
        console.log(expectedtitle);
        const actual_title = await this.dashboard_title.textContent();
        console.log(actual_title)
        return {actual_title,expectedtitle};
         

    }

    async getHeadertitle(){

         return this.dashboard_title;
    }

    

    async allignment() {
        const pageTitle = await this.page.title();
        expect(pageTitle).toBe('LMS');
    
        // Ensure the title element is visible and get its bounding box
        await expect(this.title_allignment).toBeVisible();
        const boundingBox = await this.title_allignment.boundingBox();
        expect(boundingBox).not.toBeNull();
    
        if (boundingBox) {
            expect(boundingBox.x).toBeLessThanOrEqual(20); // Adjust as needed for the top-left alignment check
            expect(boundingBox.y).toBeLessThanOrEqual(20); // Adjust as needed
        }
    }
    
         
    

    async getNavbarText(){
        return this.navigation_bar;
        
    }

    async getnavorderlocator() {
         return this.navigation_bar_order;
          
    }

     

    
}
module.exports = { DashboardPage};