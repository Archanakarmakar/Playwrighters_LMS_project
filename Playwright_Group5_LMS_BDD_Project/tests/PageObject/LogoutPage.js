const { expect } = require('playwright/test');

class LogoutPage{
    constructor(page){
        this.page = page;
        this.logout_btn = page.getByRole('button', { name : 'Logout'});
        this.loginpage_text = page.getByText('Please login to LMS application');
    }

    async logoutbtn(){
        await this.logout_btn.click();
    }

    async loginPage_validation(){
        return this.loginpage_text;
    }
    async navigate_back(){
         await this.page.goBack();
    }
}

module.exports = {LogoutPage}