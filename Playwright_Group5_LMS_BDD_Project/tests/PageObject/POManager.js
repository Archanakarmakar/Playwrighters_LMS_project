const {LoginPage} = require('./LoginPage');
const { DashboardPage} = require('./DashboardPage');
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
    this.dashboardpage = new DashboardPage(this.page);
    this.program = new ProgramPage(this.page);
    this.reusablepage = new ReusablePage(this.page);
    this.paginationAndSorting = new PaginationAndSorting(this.page)
    this.logoutpage = new LogoutPage(this.page);
    this.classpage = new ClassPage(this.page);
}

getLoginPage()
{
    return this.loginPage;
}
getDashboardPage()
{
    return this.dashboardpage;
}
getProgramPage(){
    return this.program;
}
getReusablePage(){
    return this.reusablepage;
}

getPaginationAndSorting(){
    return this.paginationAndSorting;
}
getLogoutPage(){
    return this.logoutpage;
}
getClassPage(){
    return this.classpage;
}
}

module.exports = {POManager};