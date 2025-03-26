const { expect } = require('@playwright/test');
const filepath = 'tests/TestData/PlayWright_Group5_Data.xlsx';
const { getDataByKeyOption } = require('../Utilities/ExcelUtils');
const { equal } = require('assert');
require('dotenv').config();

class ReusablePage{
constructor(page){
    this.page = page;
          this.url = process.env.LMS_URL;   
          this.username = page.locator('#username');
        this.password = page.locator('#password');
        this.login_btn = page.locator('#login');
        this.loginPageHeader = process.env.LOGIN_PAGEHEADER;
        this.editProgramName = process.env.EDIT_PROGRAM;
        this.editProgramDesc = process.env.EDIT_PROGRAMDES;
        this.invalidProgramName = process.env.INVALID_PROGRAMNAME;
        this.partialProgramName = process.env.PARTIAL_PROGRAMNAME;
        this.logout = page.getByText('Logout');
        this.classTopicValue = process.env.TOPIC;
}
async navigate() { 
    await this.page.goto(this.url);
  }

  async login() {
    await this.username.fill(process.env.USEREMAIL);  // Use the username stored in .env
    await  this.password.fill(process.env.PASSWORD);  // Use the password stored in .env
    await this.login_btn.click();
  }

  async click(locator){
    await locator.click();
  }
  async getHeaderText(locator){
    const headerText =  await locator.innerText();
    return headerText.trim();
    }
  
  async isVisible(locator){
    return locator.isVisible();
  }

  async getAttribute(locator,attribute){
    const attributeValue = await locator.getAttribute(attribute);
    // Log the value
    console.log('Attribute value:', attributeValue);
  }
/**
 * Asserts that a locator contains the expected text.
 * @param {Locator} locator - The Playwright locator to check.
 * @param {string} expectedText - The expected text to validate.
 */

  async assertLocatorContainsText(locator, expectedText) {
    const actualText = await locator.textContent();
    console.log(`Actual text: "${actualText}"`);
    console.log(`Expected text: "${expectedText}"`);
    await expect(locator).toContainText(expectedText);
  }
//    getEditProgramName(){
//     return String(process.env.EDIT_PROGRAM);
//   }
//   async getEditProgramDesc(){
//     return String(this.editProgramDesc);
//   }

//   async getInvalidProgramName(){
//     return String(this.invalidProgramName);
//   }

//    getPartialProgramName(){
//     return this.partialProgramName;
//   }

//  getClassTopicValue(){
//     return String(process.env.TOPIC);
//   }
//   getNewClassDescValue(){
//     return String(process.env.CLASSDESC)
//   }

  async validLogin(KeyOption,sheetname){
    const filepath = 'tests/TestData/PlayWright_Group5_Data.xlsx';
    const testData = getDataByKeyOption(filepath,sheetname,KeyOption);
    let userName = testData['UserNameData'];
    let password = testData['PasswordData']
    await this.username.fill(userName);
    await this.password.fill(password);
    await this.login_btn.click();
    
}
async validate(){
  const text = await this.logout.textContent();
  return text;
}

async isVisible(selector){
  
  const element = await (selector);
  return element !== null && await element.isVisible();
}
 

async notVisible(selector){
  
  const element = await (selector);
  return element !== null && await element.isVisible();
}
async navbar_order(name, selector) {
  await selector.first().waitFor({ state: 'visible' });
  const count = await selector.count();
 
  for (let i = 0; i < count; i++) {
    const element = selector.nth(i);
    const element_name = await element.textContent();
 
    if (element_name === name) {
      await expect(element).toBeVisible();
      console.log(name + " is in the " + (i+1) + " position");
      return; // Exit once the item is found and validated
    }
  }
  console.log(name + " was not found in the navbar");
}
async click(selector){
await selector.click();
}

async getHeaderText(locator){
  const headerText =  await locator.innerText();
  return headerText.trim();
  }


}
module.exports= {ReusablePage}