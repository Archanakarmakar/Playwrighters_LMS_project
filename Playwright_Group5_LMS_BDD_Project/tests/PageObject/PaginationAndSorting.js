const { expect } = require('@playwright/test');
const exp = require('constants');
const { ReusablePage } = require('./ReusablePage');
const { TIMEOUT } = require('dns');
require('dotenv').config();

class PaginationAndSorting {
    constructor(page){
        this.page = page;
        this.nextLink = page.locator('//span[@class ="p-paginator-icon pi pi-angle-right"]');
        this.lastLink = page.locator('//span[@class ="p-paginator-icon pi pi-angle-double-right"]');
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
        this.previousLink = page.locator('//span[@class ="p-paginator-icon pi pi-angle-left"]');
        this.firstLink = page.locator('//span[@class ="p-paginator-icon pi pi-angle-double-left"]')
        this.batchNamecol = page.locator('//th[2]')
        this.classTopicCol = page.locator('//th[3]')
        this.classDesCol = page.locator('//th[4]')
        this.class_statusCol = page.locator('//th[5]')
        this.class_DateCol = page.locator('//th[6]')
        this.staffNameCol = page.locator('//th[7]')
        this.batchNameCell = page.locator('//tr//td[2]');
        this.classTopicCell = page.locator('//tr//td[3]');
        this.classDesCell = page.locator('//tr//td[4]');
        this.class_statusCell = page.locator('//tr//td[5]')
        this.class_DateCell = page.locator('//tr//td[6]')
        this.staffNameCell = page.locator('//tr//td[7]')
    }

    async getbatchNamecol(){
        return this.batchNamecol;
    }

    async getclassTopicCol(){
        return this.classTopicCol;
    }

    async getclassDesCol(){
        return this.classDesCol;

    } 

    async getclass_statusCol(){
        return this.class_statusCol;
    }

    async getclass_DateCol(){
        return this.class_DateCol;
    }

    async getstaffNameCol(){
        return this.staffNameCol;
    }

    async getbatchNameCell(){
        return this.batchNameCell;
    }
    
    async getclassTopicCell(){
        return this.classTopicCell;
    }

    async getclassDesCell(){
        return this.classDesCell;
    }

    async getclass_statusCell(){
        return this.class_statusCell;
    }

    async getclass_DateCell(){
        return this.class_DateCell;
    }

    async getstaffNameCell(){
        return this.staffNameCell;
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
        await ele.click();;
    }

    async getNextLink(){
        
 
 
        if(expect(await this.nextLink).toBeDisabled()){
            
            console.log('Next Link disabled')
        }
       else{
        this.nextLink.click();
       }
    }

    async getNextLink1(){
 
        return this.nextLink;
    }

    async validateNextPageLink(){
        const count = await this.paginationFooter.count();
        for (let i = 0; i < count; i++){
            await this.nextLink.click();
            if(expect (await this.nextLink).toBeDisabled()){
                console.log('This is the last page'); 
            }
            else{
                continue;
            }
        }

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

    async getProgStatus_cells(){
        return this.ProgStatus_cells;
    }

    async getLastLink(){
        return this.lastLink;
    }

    async getPreviousLink(){
        if((await this.previousLink).isDisabled()){
            
            console.log('Previous Link disabled')
        }
       else{
        this.previousLink.click();
       }
    }

    async getPreviousLink1(){
        return this.previousLink;
    }

    async getFirstLink(){
        return this.firstLink;
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