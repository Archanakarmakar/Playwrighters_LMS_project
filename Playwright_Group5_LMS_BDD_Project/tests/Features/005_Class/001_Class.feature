@class
Feature: Class Page Validation

Background: Admin logged on the home page
Given Admin is on the home page after login 

@ClassPageValidation @ClassTC_001
Scenario: Validating the class manage page
Given Admin is on the home page after login
When Admin clicks the Class Navigation bar in the Header
Then Admin should land on the " Manage Class" page

@ClassPageValidation @ClassTC_002
Scenario: Validating the Title in the Manage class page
Given Admin is on the home page after login
When Admin clicks the Class Navigation bar in the Header
Then Admin should see the " LMS - Learning Management System " Title

@ClassPageValidation @ClassTC_003
Scenario: Validating the Header in the Manage class page
Given Admin is on the home page after login
When Admin clicks the Class Navigation bar in the Header
Then Admin should see the " Manage Class" Header

@ClassPageValidation @ClassTC_004
Scenario: Validating Search bar in class page
Given Admin is on the home page after login
When Admin clicks the Class Navigation bar in the Header
Then Admin should see the Search Bar in Manage class page

@ClassPageValidation @ClassTC_005
Scenario Outline: Validating the data table headers in the class page
Given Admin is on the home page after login
When Admin clicks the Class Navigation bar in the Header
Then Admin should see the datatable heading like "<ExpectedColumnHeaders>" 

Examples:
	|ExpectedColumnHeaders                           |
	| Batch Name, Class Topic, Class Description, Status, Class Date, Staff Name, Edit / Delete  |

@ClassPageValidation @ClassTC_006
Scenario: Validating the text and pagination icon in the classpage
Given Admin is on the home page after login
When Admin clicks the Class Navigation bar in the Header
Then Admin should see the  showing x to y of  z entries and enabled pagination controls under the data table

@ClassPageValidation @ClassTC_007
Scenario: Validate the sort icon of all the field in datatable
Given Admin is on the home page after login
When Admin clicks the Class Navigation bar in the Header
Then Admin should see the Sort icon of all the field in the datatable.

@ClassPageValidation @ClassTC_008
Scenario: Validating the Delete button under the Manage class 
Given Admin is on the home page after login
When Admin clicks the Class Navigation bar in the Header
Then Admin should see the Delete button under the Manage class page header.

@ClassPageValidation @ClassTC_009
Scenario: Validate the total no of classes in manage class page
Given Admin is on the home page after login
When Admin clicks the Class Navigation bar in the Header
Then Admin should see Total no of classes in below of the data table.
