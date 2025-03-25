@searchClass
Feature: Class Search box 

Background: Admin is on the Manage Class page after login
Given Admin is on the Manage class page after login

@SearchClassValidation @ClassTC_042
Scenario: Search class by Batch Name
Given Admin is on the Manage class page
When Admin enter the Batch Name in search textbox
Then Admin should see Class details are searched by Batch Name

@SearchClassValidation @ClassTC_043
Scenario: Search class by Class topic
Given Admin is on the Manage class page
When Admin enter the Class topic in search textbox
Then Admin should see Class details are searched by Class topic

@SearchClassValidation @ClassTC_044
Scenario: Search class by Staff Name
Given Admin is on the Manage class page
When Admin enter the Staff Name in search textbox
Then Admin should see Class details are searched by Staff name