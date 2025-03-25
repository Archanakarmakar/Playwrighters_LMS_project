const { expect } = require('@playwright/test');
const exp = require('constants');
const { ReusablePage } = require('./ReusablePage');
const { TIMEOUT } = require('dns');
require('dotenv').config();

class PaginationAndSorting {
    constructor(page){
        this.page = page;
        this.table = page.locator('.p-datatable-wrapper ng-star-inserted');
        this.ProgramNameCol =  page.locator('//th[2]')
        // this.sortType =  this.ProgramNameCol.getAttribute('aria-sort');
        this.cells = page.locator('//tr//td[2]');
        this.overlayer = page.locator('.cdk-overlay-backdrop');
        this.paginationFooter = page.locator('//span[@class = "p-paginator-pages ng-star-inserted"]//button');
        this.ProgramDescCol =  page.locator('//th[3]')
        this.ProgramStatus =  page.locator('//th[4]')
        this.ProgDes_cells = page.locator('//tr//td[3]');
        this.ProgStatus_cells = page.locator('//tr//td[4]');
        this.nextLink = page.locator("//button[contains(@class, 'p-paginator-next')]");
        this.lastLink = page.locator("//button[contains(@class, 'p-paginator-last')]");
        this.previousLink = page.locator("//button[contains(@class, 'p-paginator-prev')]");
        this.firstLink = page.locator("//button[contains(@class, 'p-paginator-first')]");
        this.classByBatchNameSort =page.locator("//thead/tr/th[2]/p-sorticon/i");
        this.classByTopicSort =page.locator("//thead/tr/th[3]/p-sorticon/i");
        this.classByDescSort =page.locator("//thead/tr/th[4]/p-sorticon/i");
        this.classByStatusSort = page.locator("//thead/tr/th[5]/p-sorticon/i");
        this.classByDateSort = page.locator("//thead/tr/th[6]/p-sorticon/i");
        this.classByStaffNameSort = page.locator("//thead/tr/th[7]/p-sorticon/i");
        this.batchNameList = page.locator('//tr//td[2]');
        this.classTopicList = page.locator('//tr//td[3]');
        this.classDescList = page.locator('//tr//td[4]');
        this.classStatusList = page.locator('//tr//td[5]')
        this.classDateList = page.locator('//tr//td[6]')
        this.staffNameList = page.locator('//tr//td[7]')
    }

    async getBatchNameCol(){
        return this.classByBatchNameSort;
    }

    async getClassTopicCol(){
        return this.classByTopicSort;
    }

    async getClassDescCol(){
        return this.classByDescSort;

    } 

    async getClassStatusCol(){
        return this.classByStatusSort;
    }

    async getClassDateCol(){
        return this.classByDateSort;
    }

    async getStaffNameCol(){
        return this.classByStaffNameSort;
    }

    async getBatchNameCell(){
        return this.batchNameList;
    }
    
    async getClassTopicCell(){
        return this.classTopicList;
    }

    async getClassDescCell(){
        return this.classDescList;
    }

    async getClassStatusCell(){
        return this.classStatusList;
    }

    async getClassDateCell(){
        return this.classDateList;
    }

    async getStaffNameCell(){
        return this.staffNameList;
    }


    async sortingAscending(ele){
        await this.page.waitForLoadState();
        let originalData = await (ele).allTextContents();
        console.log('Ascending Order actual List: ' +originalData)
        let expectedList = originalData.slice().sort((a, b) => a.localeCompare(b));
        // let sortedList = await (ele).allTextContents();
        console.log('Ascending Order expected: ' +expectedList)
        expect(originalData).toEqual(expectedList);
    }

 
    

    async sortingDescending(ele){
        // await this.ProgramNameCol.click();
        const originalData = await (ele).allTextContents();
        console.log('Ascending Order ' +originalData)
        const expectedList = originalData.sort((a,b) => b.localeCompare(a));
        const sortedList = await (ele).allTextContents();
        console.log('Descending Order' +expectedList)
        expect(originalData).toEqual(expectedList);
    }

    async clickSortIcon(ele){
        await this.overlayer.click();
        await ele.click();
    }

    async getOverLayer(){
        return this.overlayer;
    }

    async dblClickSortIcon(ele){
        await this.overlayer.click();
        await ele.dblclick();
    }

    async getProgramNameCol(){
        return this.ProgramNameCol;
    }

    async getProgramDescCol(){
        return this.ProgramDescCol;
    }

    async getProgramStatus(){
        return this.ProgramStatus;
    }

    async getCells(){
        return this.cells;
    }

    async getProgDes_cells(){
        return this.ProgDes_cells;
    }
    
    async click(ele){
        await ele.click();
    }

  
    async getNextLink(){
 
        return this.nextLink;
    }

    async validateNextPageLink(){
        await this.nextLink.scrollIntoViewIfNeeded();
        while (await this.nextLink.isEnabled()) { 
            await this.nextLink.click();
            await this.page.waitForTimeout(1000); 
        }
        console.log('This is the last page');

    }

    async getPaginationNextLink() {
        return this.nextLink; 
    }
    

    async validatePreviousPageLink(){
        const count = await this.paginationFooter.count();
        for (let i = count-1; i > 0; i--){
            await this.previousLink.click();
            if(expect (await this.previousLink).toBeDisabled()){
                console.log('This is the last page'); 
            }
            else{
                    continue;
            }
         }
    }

    async validateLastPageLink() {
        await this.lastLink.scrollIntoViewIfNeeded();
        await this.lastLink.click(); 
        await this.page.waitForTimeout(1000); 
    
        // Verify that the Next Page link is disabled (meaning we're on the last page)
        const isNextDisabled = !(await this.nextLink.isEnabled());
        
        if (isNextDisabled) {
            console.log('This is the last page');
        } else {
            console.log('Error: Next Page link is still enabled');
        }
    
        return isNextDisabled; // Return the validation result
    }

    async getProgStatus_cells(){
        return this.ProgStatus_cells;
    }

    async getLastLink(){
        return this.lastLink;
    }

    async getPaginationPreviousLink(){
        if((await this.previousLink).isDisabled()){
            
            console.log('Previous Link disabled')
        }
       else{
        this.previousLink.click();
       }
    }

    async getPreviousPageLink(){
        return this.previousLink;
    }

    async isOnLastPage() {
        return !(await this.nextLink.isEnabled());
    }

    async navigateToPreviousPage() {
        await this.previousLink.click(); 
        await this.page.waitForTimeout(1000); 
    }
    
    async isPreviousPageEnabled() {
        return await this.previousLink.isEnabled();
    }

    async getFirstPageLink(){
        return this.firstLink;
    }
    async navigateToFirstPage() {
        await this.firstLink.click(); 
        await this.page.waitForTimeout(1000); 
    }

    async isOnFirstPage() {
        return !(await this.previousLink.isEnabled());
    }
   
    async pagination_Asc_Sorting(ele){
        
        const count = await this.paginationFooter.count();
        console.log('Number of pages' + count)
        for (let i = 0; i <count; i++){
            if(i>0){
                
                await this.sortingAscending(ele);
                await this.paginationFooter.nth(i).click();
            }
        }
    }
    async pagination_Des_Sorting(ele){
        const count = await this.paginationFooter.count();
        for (let i = 0; i <count; i++){
            if(i>0){
               await this.sortingDescending(ele);
                await this.page.waitForLoadState();
                await this.paginationFooter.nth(i).click();
            }
        }
    }

}
module.exports ={PaginationAndSorting}