
const { getDataByKeyOption } = require('../Utilities/ExcelUtils');  
const { expect } = require('playwright/test');
const Tesseract = require('tesseract.js');
const sharp = require('sharp')



 class LoginPage {
    constructor(page) {
        this.page = page;
        this.loginpage = page.getByText('Please login to LMS application');
        this.username = page.locator('#username');
        this.password = page.locator('#password');
        this.login_btn = page.locator('#login');
       this.logout = page.getByText('Logout');
       this.errorMessage = page.locator('#errormessage');
       this.signInPage = page.locator('#signin-content');
       this.signinPage = page.getByText('Please login to LMS application');
       this.userErrorMessage = page.getByText(' Please enter your user name ');
       this.passErrorMessage = page.getByText(' Please enter your password ');
       this.formPage = page.locator('.ng-untouched ng-pristine ng-invalid');
       this.links = page.locator('link');
       this.Home_image = page.locator('.image-container'); 
    }

    async goTo() {
        await this.page.goto('https://playwright-frontend-app-a9ea85794ad9.herokuapp.com/login');
         
    }
    // async InvaligoTo() {
    //     await this.page.goto('https://playwright-frontend-app-a9ea8579ad9.herokuapp.com/logi');
    // }
    async validate_loginpage(){
        const text = await this.loginpage.textContent();
        return text;
    }



    async loginPage() {

        await this.username.fill(userName);
        await this.password.fill(password);
        await this.login_btn.click();
    }

    async validate(){
        const text = await this.logout.textContent();
        console.log(text)
        return text;
    }

    async validLogin(keyOption){
        const filepath = 'tests/TestData/PlayWright_Group2_Data.xlsx';
        const sheetName = 'Login';
        // const keyOption = 'ValidCredential';
        
        const testData = getDataByKeyOption(filepath,sheetName,keyOption);
        let userName = testData['UserNameData'];
        
        let password = testData['PasswordData']
        
     

        if(userName === undefined || password === undefined){
            userName = '';
            password = '';
        }
        
        await this.username.fill(userName);
        await this.password.fill(password);
        await this.login_btn.click();
        
    }
    

    async InvalidloginAssertion(){
        const filepath = 'tests/TestData/PlayWright_Group2_Data.xlsx';
        const sheetName = 'Login';
        const keyOption = 'InvalidCredential';
        const testData = getDataByKeyOption(filepath,sheetName,keyOption);
        const expErrorMsg = testData['ErrorMessage']
        await expect (this.errorMessage).toContainText(expErrorMsg);

    }
    async nullUserErrorMessage(){
        const filepath = 'tests/TestData/PlayWright_Group2_Data.xlsx';
        const sheetName = 'Login';
        const keyOption = 'InValidNullUsername'
        const testData = getDataByKeyOption(filepath,sheetName,keyOption);
        const expErrorMsg = testData['ErrorMessage']
        await expect(this.userErrorMessage).toContainText(expErrorMsg);
    
    }
    async nullPasswordErrorMsg(){
        const filepath = 'tests/TestData/PlayWright_Group2_Data.xlsx';
        const sheetName = 'Login';
        const keyOption = 'InValidNullPassword'
        const testData = getDataByKeyOption(filepath,sheetName,keyOption);
        const expErrorMsg = testData['ErrorMessage']
        await expect(this.passErrorMessage).toContainText(expErrorMsg);
    }
    async signInPageValidation(){
        await expect(this.signinPage).toBeVisible();
    }
    async getuserErrorMessage(){
        return userErrorMessage;
    }
    async getpassErrorMessage(){
        return passErrorMessage;
    }
    
    async geterrorMessage(){
        return errorMessage;
    }
    async AssertSigninPage(expText){   
        expect(await this.signinPage.textContent()).toEqual(expText);
    }

    async verifyURL(){
        try {
            await this.page
       const response =  await this.page.goto('https://playwright-frontend-app-a9ea8579ad9.herokuapp.com/logi', {
            timeout: 60000, // Set a longer timeout if needed
            waitUntil: 'load'
          });
          await this.page.pause();
        
        if (response){
            const status = response.status();
            if(status >= 400){
                console.log(`This is a Broken URL ${status}`);
            }
        }
        else{
            console.log('No response from the URL')
        }
    }
    catch(error){
        console.error('Navigation error:', error);

    }

}

  async verifySpellingofFields(){
     expect(this.signinPage).toHaveText('Please login to LMS application');
     expect(this.username).toHaveText('User');
     expect(this.password).toHaveText('Password')
  }

  

  async verifyBrokenLink(){
    const linksCount = await this.links.count();
    for (let i = 0; i < linksCount; i++ ){
        const url = await (this.links).nth(i).getAttribute('href');
        if(url){
            try {
        // Verify the URL using axios to make an HTTP request
        const response = await axios.get(url);
        console.log(`URL: ${url} - Status: ${response.status}`);
      } catch (error) {
        console.error(`Error with URL: ${url} - ${error.message}`);
      }
    } else {
      console.warn('Link without href found');
    }
  }
        }

        async ExtractTextFromImage(){
           
            await this.Home_image.screenshot({path: 'homepage.png'})
            await sharp('homepage.png')
                .grayscale()
                .threshold(150) 
                // .normalize()
                .toFile('processed_image.png')
           let image_text = Tesseract.recognize(
                'processed_image.png',
                'eng',
                
                {
                    psm: 6, 
                    oem: 1 ,
                    tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz -',
                    logger: m => console.log(m), 
                }
            )
            
            const extractedText = (await image_text).data.text;
            console.log(extractedText)
            // return extractedText;
            
        }

        async verifyTextField(){
            expect(await this.username).toHaveAttribute('data-placeholder')
            expect (await this.password).toHaveAttribute('data-placeholder')
        }

       async userTextFieldAssetion(){
        
        expect(await this.username).toHaveAttribute('data-placeholder', 'User')
       }

       async passwordTextFieldAssertion(){
        expect (await this.password).toHaveAttribute('data-placeholder', 'Password')
       }

       async loginBtnVisibility(){
        expect (await this.login_btn).toBeVisible();
       }

       async AssertPlaceHolderColor(){
        var styles = window.getComputedStyle(this.username, '::data-placeholder');
        expect(styles.getPropertyValue('color')).toBe('grey');
       }
    }
  

 

module.exports = {LoginPage}