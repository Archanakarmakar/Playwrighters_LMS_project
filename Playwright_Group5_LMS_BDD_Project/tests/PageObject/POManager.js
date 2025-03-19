const {LoginPage} = require('./LoginPage');
const { HomePage} = require('./HomePage');
const { ProgramPage } = require('./ProgramPage');
const { ReusablePage } = require('./ReusablePage');
const {PaginationAndSorting} = require('./PaginationAndSorting')
const { LogoutPage } = require('./LogoutPage');
const { ClassPage } = require('./ClassPage');
class POManager
{
constructor(page)
{
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.homePage = new HomePage(this.page);
    this.program = new ProgramPage(this.page);
    this.reusablePage = new ReusablePage(this.page);
    this.paginationAndSorting = new PaginationAndSorting(this.page)
    this.logoutPage = new LogoutPage(this.page);
    this.classPage = new ClassPage(this.page);
}

getLoginPage()
{
    return this.loginPage;
}
getHomePage()
{
    return this.homePage;
}
getProgramPage(){
    return this.program;
}
getReusablePage(){
    return this.reusablePage;
}

getPaginationAndSorting(){
    return this.paginationAndSorting;
}
getLogoutPage(){
    return this.logoutPage;
}
getClassPage(){
    return this.classPage;
}
}

module.exports = {POManager};