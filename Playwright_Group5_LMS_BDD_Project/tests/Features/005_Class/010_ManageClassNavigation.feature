@classNavigation
Feature: Navigation Validation from Manage Class to other Pages

Background: Admin is on home page after Login and clicks Class on the navigation bar
Given Admin is on the home page after login 
And clicks Class on the navigation bar

@ManageClassNavigationValidation @ClassTC_049
Scenario: Class link on navigation bar
Given Admin is on the Manage class page
When Admin clicks on Class link on Manage Class page
Then Admin is redirected to " Manage Class" page

@ManageClassNavigationValidation @ClassTC_050
Scenario: Class link to other page on navigation bar
Given Admin is on the Manage class page
When Admin clicks on any page link on Manage Class page
Then Admin is redirected to which page link they clicked.

@ManageClassNavigationValidation @ClassTC_051
Scenario: Logout link on navigation bar
Given Admin is on the Manage class page
When Admin clicks on Logout link on Manage class page
Then Admin is redirected to Login page